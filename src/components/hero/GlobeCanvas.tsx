import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * GlobeCanvas — an elegant, fully procedural 3D "digital earth".
 *
 * Built to read as Corporate + Next-Worldly (Metaverse / AI-XR): a solid navy
 * planet with a glowing atmospheric limb, a faint holographic lat/long grid,
 * a dotted surface shimmer, inclined orbiting satellites, and a deep starfield.
 * No bitmap / astronaut — the depth comes from real 3D geometry + parallax.
 */
const GlobeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // ── 1. Scene · Camera · Renderer ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Brand-aligned palette
    const COL_ATMO = new THREE.Color('#38bdf8'); // cyan atmosphere
    const COL_DOT = new THREE.Color('#7dd3fc'); // light cyan surface dots
    const COL_ACCENT = new THREE.Color('#fb923c'); // warm orange accent
    const COL_GRID = new THREE.Color('#2b6f9e');

    const RADIUS = 2.05;

    // Group lets us tilt + parallax everything together
    const globe = new THREE.Group();
    globe.rotation.z = 0.18; // gentle axial tilt
    globe.position.y = -0.15;
    scene.add(globe);

    // ── 2. Solid planet body (dark fill + fresnel limb) ────────────────────
    const bodyMat = new THREE.ShaderMaterial({
      uniforms: {
        uDark: { value: new THREE.Color('#040c1a') },
        uRim: { value: COL_ATMO },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uDark;
        uniform vec3 uRim;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float fres = 1.0 - max(dot(vNormal, vView), 0.0);
          float limb = pow(fres, 2.6);
          vec3 col = mix(uDark, uRim * 0.55, limb);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 64, 64),
      bodyMat,
    );
    globe.add(body);

    // ── 3. Atmospheric glow shell (back-side fresnel, additive) ────────────
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: COL_ATMO } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.2);
          gl_FragColor = vec4(uColor, fres * 0.9);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.16, 64, 64),
      atmoMat,
    );
    globe.add(atmosphere);

    // ── 4. Holographic lat/long grid (front hemisphere only) ───────────────
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(RADIUS * 1.002, 36, 18)),
      new THREE.LineBasicMaterial({
        color: COL_GRID,
        transparent: true,
        opacity: 0.14,
      }),
    );
    globe.add(grid);

    // ── 5. Dotted surface shimmer (Fibonacci sphere) ───────────────────────
    const dotCount = 2200;
    const dotPos = new Float32Array(dotCount * 3);
    const dotRand = new Float32Array(dotCount);
    const dotAccent = new Float32Array(dotCount);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const i3 = i * 3;
      dotPos[i3] = Math.cos(theta) * r * RADIUS * 1.01;
      dotPos[i3 + 1] = y * RADIUS * 1.01;
      dotPos[i3 + 2] = Math.sin(theta) * r * RADIUS * 1.01;
      dotRand[i] = Math.random();
      dotAccent[i] = Math.random() > 0.92 ? 1 : 0; // a few warm accent nodes
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    dotGeo.setAttribute('aRand', new THREE.BufferAttribute(dotRand, 1));
    dotGeo.setAttribute('aAccent', new THREE.BufferAttribute(dotAccent, 1));

    const dotMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: COL_DOT },
        uAccent: { value: COL_ACCENT },
        uSize: { value: 8.0 * Math.min(window.devicePixelRatio, 1.5) },
      },
      vertexShader: `
        attribute float aRand;
        attribute float aAccent;
        uniform float uTime;
        uniform float uSize;
        varying float vTwinkle;
        varying float vAccent;
        void main() {
          vAccent = aAccent;
          vTwinkle = 0.45 + 0.55 * sin(uTime * 1.4 + aRand * 30.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // fade dots facing away (back of globe) for a clean solid read
          gl_PointSize = uSize * vTwinkle / -mv.z * 2.0;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uAccent;
        varying float vTwinkle;
        varying float vAccent;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float soft = smoothstep(0.5, 0.0, d);
          vec3 c = mix(uColor, uAccent, vAccent);
          gl_FragColor = vec4(c, soft * vTwinkle * 0.85);
        }
      `,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globe.add(dots);

    // ── 6. Inclined orbit rings + travelling satellites ────────────────────
    const orbits: { mat: THREE.LineBasicMaterial; sat: THREE.Mesh; speed: number; r: number }[] = [];
    const orbitConfigs = [
      { r: RADIUS * 1.45, tilt: 0.5, speed: 0.32, color: COL_ATMO },
      { r: RADIUS * 1.7, tilt: -0.9, speed: -0.22, color: COL_ACCENT },
      { r: RADIUS * 1.95, tilt: 1.35, speed: 0.16, color: COL_DOT },
    ];
    orbitConfigs.forEach(({ r, tilt, speed, color }) => {
      const segs = 128;
      const pts: number[] = [];
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        pts.push(Math.cos(a) * r, 0, Math.sin(a) * r);
      }
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(pts), 3),
      );
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.16,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = tilt;
      globe.add(ring);

      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color }),
      );
      ring.add(sat);
      orbits.push({ mat: ringMat, sat, speed, r });
    });

    // ── 7. Deep starfield ──────────────────────────────────────────────────
    const starCount = 1400;
    const starPos = new Float32Array(starCount * 3);
    const starRand = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // spread across a wide shell behind / around the globe
      starPos[i3] = (Math.random() - 0.5) * 60;
      starPos[i3 + 1] = (Math.random() - 0.5) * 40;
      starPos[i3 + 2] = -10 - Math.random() * 30;
      starRand[i] = Math.random();
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('aRand', new THREE.BufferAttribute(starRand, 1));
    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixel: { value: Math.min(window.devicePixelRatio, 1.5) },
      },
      vertexShader: `
        attribute float aRand;
        uniform float uTime;
        uniform float uPixel;
        varying float vT;
        void main() {
          vT = 0.4 + 0.6 * sin(uTime * 0.9 + aRand * 25.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (1.0 + aRand * 2.0) * uPixel;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vT;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          gl_FragColor = vec4(0.78, 0.86, 1.0, smoothstep(0.5, 0.0, d) * vT * 0.7);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── 8. Mouse parallax ──────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── 9. Animation loop ──────────────────────────────────────────────────
    let animId = 0;
    const clock = new THREE.Clock();
    const rotSpeed = prefersReducedMotion ? 0.01 : 0.045;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      dotMat.uniforms.uTime.value = t;
      starMat.uniforms.uTime.value = t;

      globe.rotation.y = t * rotSpeed;
      stars.rotation.y = t * 0.006;

      orbits.forEach(({ mat, sat, speed, r }) => {
        const a = t * speed;
        sat.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
        mat.opacity = 0.12 + 0.05 * Math.sin(t * 0.8 + r);
      });

      // smooth camera + group parallax (the depth illusion)
      const tx = mouseX * 0.5;
      const ty = mouseY * 0.32;
      camera.position.x += (tx - camera.position.x) * 0.04;
      camera.position.y += (ty + -0.15 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.15, 0);

      globe.rotation.x += (mouseY * 0.12 - globe.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    // ── 10. Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      scene.traverse((obj) => {
        const m = obj as THREE.Mesh | THREE.Points | THREE.Line;
        if ('geometry' in m && m.geometry) m.geometry.dispose();
        const mat = (m as THREE.Mesh).material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else mat.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
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

export default GlobeCanvas;
