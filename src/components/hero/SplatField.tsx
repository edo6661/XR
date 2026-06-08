import { useEffect, useRef } from 'react';
import * as THREE from 'three';


const SplatField = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const isMobile = window.innerWidth < 768;
    const PIXEL = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.25);

    // ── Scene · Camera · Renderer ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true, // transparent — the video shows through behind the splats
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(PIXEL);
    mount.appendChild(renderer.domElement);

    // Brand-aligned palette (deep navy world, cyan + warm-orange highlights)
    const COL_CYAN = new THREE.Color('#7dd3fc');
    const COL_ATMO = new THREE.Color('#38bdf8');
    const COL_ACCENT = new THREE.Color('#fb923c');
    const COL_PALE = new THREE.Color('#e7f2ff');

    const cloud = new THREE.Group();
    scene.add(cloud);

    const disposables: { dispose: () => void }[] = [];

    // ── Volumetric splat cloud ─────────────────────────────────────────────
    // Points are biased toward clustered "filaments" rather than uniform noise
    // so it reads as a captured structure, not TV static.
    const COUNT = isMobile ? 1600 : 3200;
    const HALF_X = 11;
    const HALF_Y = 6.5;
    const Z_NEAR = 3.0; // closest splats (in front of camera focal plane)
    const Z_FAR = -22.0; // deep background splats

    const pos = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    const size = new Float32Array(COUNT);
    const colorMix = new Float32Array(COUNT); // 0..1 → palette lerp key
    const tmpColor = new THREE.Color();
    const colors = new Float32Array(COUNT * 3);

    const cluster = new THREE.Vector3();
    let clusterLife = 0;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // Occasionally reseed a cluster centre; nearby points share it → filaments
      if (clusterLife <= 0) {
        cluster.set(
          (Math.random() - 0.5) * 2 * HALF_X,
          (Math.random() - 0.5) * 2 * HALF_Y,
          Z_FAR + Math.random() * (Z_NEAR - Z_FAR),
        );
        clusterLife = 6 + Math.floor(Math.random() * 22);
      }
      clusterLife--;

      const spread = 1.6 + Math.random() * 2.4;
      pos[i3] = cluster.x + (Math.random() - 0.5) * spread;
      pos[i3 + 1] = cluster.y + (Math.random() - 0.5) * spread * 0.7;
      pos[i3 + 2] = cluster.z + (Math.random() - 0.5) * spread * 1.4;

      rand[i] = Math.random();
      // A few large, very soft "bokeh" splats; most are small grains.
      size[i] = Math.random() > 0.9 ? 2.2 + Math.random() * 2.6 : 0.7 + Math.random() * 1.1;

      // Colour: mostly cool cyan, a cool-bright minority, sparse warm accents.
      const r = Math.random();
      let key: number;
      if (r > 0.93) {
        tmpColor.copy(COL_ACCENT);
        key = 1.0;
      } else if (r > 0.7) {
        tmpColor.copy(COL_PALE);
        key = 0.6;
      } else if (r > 0.4) {
        tmpColor.copy(COL_CYAN);
        key = 0.35;
      } else {
        tmpColor.copy(COL_ATMO);
        key = 0.15;
      }
      colorMix[i] = key;
      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aMix', new THREE.BufferAttribute(colorMix, 1));
    disposables.push(geo);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 26.0 * PIXEL },
        uDrift: { value: prefersReducedMotion ? 0.0 : 1.0 },
        uZNear: { value: Z_NEAR },
        uZFar: { value: Z_FAR },
      },
      vertexShader: `
        attribute float aRand;
        attribute float aSize;
        attribute vec3 aColor;
        attribute float aMix;
        uniform float uTime;
        uniform float uSize;
        uniform float uDrift;
        varying float vTwinkle;
        varying float vFog;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          float ph = aRand * 6.2831853;

          // Gentle volumetric drift — GPU-side so it costs ~nothing.
          vec3 p = position;
          p.x += sin(uTime * 0.16 + ph) * 0.9 * uDrift;
          p.y += cos(uTime * 0.13 + ph * 1.3) * 0.6 * uDrift;
          p.z += sin(uTime * 0.10 + ph * 0.7) * 1.1 * uDrift;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float depth = -mv.z;

          // Near splats bigger & brighter; far ones fade into the navy fog.
          vTwinkle = 0.55 + 0.45 * sin(uTime * 1.1 + ph * 4.0);
          vFog = clamp((depth - 3.0) / 24.0, 0.0, 1.0); // 0 near → 1 far

          gl_PointSize = uSize * aSize * (0.6 + 0.4 * vTwinkle) / depth;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vTwinkle;
        varying float vFog;
        varying vec3 vColor;
        void main() {
          // Soft gaussian falloff = the "splat".
          float d = length(gl_PointCoord - vec2(0.5));
          float a = exp(-d * d * 7.0);
          if (a < 0.01) discard;

          // Fade far splats out (depth fog) and dim with twinkle.
          float fog = 1.0 - vFog;
          float alpha = a * fog * (0.32 + 0.5 * vTwinkle) * 0.9;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(mat);

    const splats = new THREE.Points(geo, mat);
    cloud.add(splats);

    // ── Animation loop ──────────────────────────────────────────────────────
    let animId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;

      // Slow cloud roll only — mouse parallax removed (was doubling work with hero layer).
      if (!prefersReducedMotion) {
        cloud.rotation.y = Math.sin(t * 0.05) * 0.06;
        cloud.rotation.x = Math.cos(t * 0.04) * 0.04;
      }

      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, -6);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta(); // swallow paused gap
      animId = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    start();

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default SplatField;
