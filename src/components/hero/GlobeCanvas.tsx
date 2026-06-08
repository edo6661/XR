import { useEffect, useRef } from 'react';
import * as THREE from 'three';


const DEG = Math.PI / 180;
const RADIUS = 2.05;

// Host / partner cities — the "global network" the arcs trace.
const CITIES: { lat: number; lon: number; hub?: boolean }[] = [
  { lat: 3.14, lon: 101.69, hub: true }, // Kuala Lumpur (flagship host)
  { lat: 1.35, lon: 103.82 }, // Singapore
  { lat: 35.68, lon: 139.69 }, // Tokyo
  { lat: 37.57, lon: 126.98 }, // Seoul
  { lat: 31.23, lon: 121.47 }, // Shanghai
  { lat: 19.08, lon: 72.88 }, // Mumbai
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: -33.87, lon: 151.21 }, // Sydney
  { lat: 51.51, lon: -0.13 }, // London
  { lat: 37.77, lon: -122.42 }, // San Francisco
];

// Routes radiate from the KL hub (0) + a couple of cross links.
const ROUTES: [number, number][] = [
  [0, 2],
  [0, 6],
  [0, 8],
  [0, 9],
  [0, 3],
  [1, 5],
  [4, 7],
];

const LAND_THRESHOLD = 0.07; // earth-dark.jpg: solid-black continents read darkest

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = lat * DEG;
  const lambda = lon * DEG;
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.cos(lambda),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.sin(lambda),
  );
}

const GlobeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const isMobile = window.innerWidth < 768;
    const PIXEL = Math.min(window.devicePixelRatio, 1.5);

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
    renderer.setPixelRatio(PIXEL);
    mount.appendChild(renderer.domElement);

    // Brand-aligned palette
    const COL_ATMO = new THREE.Color('#38bdf8'); // cyan atmosphere
    const COL_DOT = new THREE.Color('#7dd3fc'); // light cyan land dots
    const COL_ACCENT = new THREE.Color('#fb923c'); // warm brand orange
    const COL_GRID = new THREE.Color('#2b6f9e');

    // Group lets us tilt + parallax everything together
    const globe = new THREE.Group();
    globe.rotation.z = 0.18; // gentle axial tilt
    globe.position.y = -0.15;
    scene.add(globe);

    const disposables: { dispose: () => void }[] = [];

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
    const bodyGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    globe.add(body);
    disposables.push(bodyGeo, bodyMat);

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
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.16, 64, 64);
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    globe.add(atmosphere);
    disposables.push(atmoGeo, atmoMat);

    // ── 4. Holographic lat/long grid (kept very faint) ─────────────────────
    const gridGeo = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(RADIUS * 1.002, 36, 18),
    );
    const gridMat = new THREE.LineBasicMaterial({
      color: COL_GRID,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    globe.add(grid);
    disposables.push(gridGeo, gridMat);

    // ── 5. Continent dot-field (sampled from a real world map) ─────────────
    // Built async after the land-mask image decodes; falls back to a uniform
    // shimmer if the texture cannot be read.
    const dotMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: COL_DOT },
        uAccent: { value: COL_ACCENT },
        uSize: { value: 7.0 * PIXEL },
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
          vTwinkle = 0.5 + 0.5 * sin(uTime * 1.3 + aRand * 30.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (0.7 + 0.3 * vTwinkle) / -mv.z * 2.0;
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
          gl_FragColor = vec4(c, soft * (0.55 + 0.45 * vTwinkle) * 0.9);
        }
      `,
      transparent: true,
      depthTest: true, // back-side dots are hidden behind the opaque body
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(dotMat);
    let dots: THREE.Points | null = null;

    const buildDots = (isLand: ((lat: number, lon: number) => boolean) | null) => {
      const SAMPLES = isMobile ? 11000 : 22000;
      const goldenPhi = Math.PI * (3 - Math.sqrt(5));
      const pos: number[] = [];
      const rand: number[] = [];
      const accent: number[] = [];

      for (let i = 0; i < SAMPLES; i++) {
        const uy = 1 - (i / (SAMPLES - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - uy * uy));
        const theta = goldenPhi * i;
        const ux = Math.cos(theta) * r;
        const uz = Math.sin(theta) * r;

        if (isLand) {
          const lat = Math.asin(uy) / DEG;
          const lon = Math.atan2(uz, ux) / DEG;
          if (!isLand(lat, lon)) continue;
        }

        pos.push(ux * RADIUS * 1.01, uy * RADIUS * 1.01, uz * RADIUS * 1.01);
        rand.push(Math.random());
        accent.push(Math.random() > 0.94 ? 1 : 0); // sparse warm nodes
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
      geo.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(rand), 1));
      geo.setAttribute('aAccent', new THREE.BufferAttribute(new Float32Array(accent), 1));
      dots = new THREE.Points(geo, dotMat);
      globe.add(dots);
      disposables.push(geo);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const TW = 1024;
        const TH = 512;
        const c = document.createElement('canvas');
        c.width = TW;
        c.height = TH;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          buildDots(null);
          return;
        }
        ctx.drawImage(img, 0, 0, TW, TH);
        const data = ctx.getImageData(0, 0, TW, TH).data;
        const isLand = (lat: number, lon: number) => {
          let u = (lon + 180) / 360;
          u = ((u % 1) + 1) % 1;
          const v = Math.min(0.999, Math.max(0, (90 - lat) / 180));
          const px = Math.min(TW - 1, Math.floor(u * TW));
          const py = Math.min(TH - 1, Math.floor(v * TH));
          const idx = (py * TW + px) * 4;
          const lum =
            (data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114) / 255;
          return lum < LAND_THRESHOLD;
        };
        buildDots(isLand);
      } catch {
        buildDots(null); // tainted canvas / read failure → graceful fallback
      }
    };
    img.onerror = () => buildDots(null);
    img.src = '/hero/earth-dark.jpg';

    // ── 6. City nodes (pulsing pins at each network endpoint) ──────────────
    const cityPos: number[] = [];
    const cityRand: number[] = [];
    const cityHub: number[] = [];
    CITIES.forEach((cty) => {
      const v = latLonToVec3(cty.lat, cty.lon, RADIUS * 1.012);
      cityPos.push(v.x, v.y, v.z);
      cityRand.push(Math.random());
      cityHub.push(cty.hub ? 1 : 0);
    });
    const cityGeo = new THREE.BufferGeometry();
    cityGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(cityPos), 3));
    cityGeo.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(cityRand), 1));
    cityGeo.setAttribute('aHub', new THREE.BufferAttribute(new Float32Array(cityHub), 1));
    const cityMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: COL_DOT },
        uHub: { value: COL_ACCENT },
        uSize: { value: 9.0 * PIXEL },
      },
      vertexShader: `
        attribute float aRand;
        attribute float aHub;
        uniform float uTime;
        uniform float uSize;
        varying float vPulse;
        varying float vHub;
        void main() {
          vHub = aHub;
          vPulse = 0.6 + 0.4 * sin(uTime * 2.2 + aRand * 12.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (aHub > 0.5 ? 1.6 : 1.0) * vPulse / -mv.z * 2.0;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uHub;
        varying float vPulse;
        varying float vHub;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.0, d);
          vec3 c = mix(uColor, uHub, vHub);
          gl_FragColor = vec4(c, core * vPulse);
        }
      `,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cities = new THREE.Points(cityGeo, cityMat);
    globe.add(cities);
    disposables.push(cityGeo, cityMat);

    // ── 7. Glowing great-circle arcs + travelling pulses ───────────────────
    const arcGroup = new THREE.Group();
    globe.add(arcGroup);
    const pulses: {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      speed: number;
      offset: number;
    }[] = [];

    ROUTES.forEach(([a, b], i) => {
      const start = latLonToVec3(CITIES[a].lat, CITIES[a].lon, RADIUS * 1.014);
      const end = latLonToVec3(CITIES[b].lat, CITIES[b].lon, RADIUS * 1.014);
      const dist = start.distanceTo(end);
      const lift = 1 + 0.16 + (dist / (RADIUS * 2)) * 0.4;
      const ctrl = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(RADIUS * lift);
      const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);

      const accentArc = i % 3 === 0;
      const color = accentArc ? COL_ACCENT : COL_DOT;

      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
      const arcMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: accentArc ? 0.26 : 0.16,
        depthWrite: false,
      });
      arcGroup.add(new THREE.Line(arcGeo, arcMat));
      disposables.push(arcGeo, arcMat);

      const pulseGeo = new THREE.SphereGeometry(accentArc ? 0.03 : 0.024, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      arcGroup.add(pulse);
      disposables.push(pulseGeo, pulseMat);

      pulses.push({
        curve,
        mesh: pulse,
        speed: 0.1 + (i % 3) * 0.03,
        offset: (i / ROUTES.length) % 1,
      });
    });

    // ── 8. Inclined orbit rings + travelling satellites ────────────────────
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
      ringGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.x = tilt;
      globe.add(ring);
      disposables.push(ringGeo, ringMat);

      const satGeo = new THREE.SphereGeometry(0.03, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({ color });
      const sat = new THREE.Mesh(satGeo, satMat);
      ring.add(sat);
      disposables.push(satGeo, satMat);
      orbits.push({ mat: ringMat, sat, speed, r });
    });

    // ── 9. Deep starfield ──────────────────────────────────────────────────
    const starCount = isMobile ? 800 : 1400;
    const starPos = new Float32Array(starCount * 3);
    const starRand = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPos[i3] = (Math.random() - 0.5) * 60;
      starPos[i3 + 1] = (Math.random() - 0.5) * 40;
      starPos[i3 + 2] = -10 - Math.random() * 30;
      starRand[i] = Math.random();
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('aRand', new THREE.BufferAttribute(starRand, 1));
    const starMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixel: { value: PIXEL } },
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
    disposables.push(starGeo, starMat);

    // ── 10. Mouse parallax ─────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── 11. Animation loop (pauses when offscreen / tab hidden) ────────────
    let animId = 0;
    let running = false;
    const clock = new THREE.Clock();
    const rotSpeed = prefersReducedMotion ? 0.01 : 0.04;
    const tmp = new THREE.Vector3();

    const animate = () => {
      const t = clock.getElapsedTime();

      dotMat.uniforms.uTime.value = t;
      cityMat.uniforms.uTime.value = t;
      starMat.uniforms.uTime.value = t;

      globe.rotation.y = t * rotSpeed;
      stars.rotation.y = t * 0.006;

      orbits.forEach(({ mat, sat, speed, r }) => {
        const a = t * speed;
        sat.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
        mat.opacity = 0.08 + 0.04 * Math.sin(t * 0.8 + r);
      });

      pulses.forEach(({ curve, mesh, speed, offset }) => {
        const tt = (t * speed + offset) % 1;
        curve.getPointAt(tt, tmp);
        mesh.position.copy(tmp);
        const fade = Math.sin(tt * Math.PI); // dim near the endpoints
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.25 + 0.75 * fade;
        const s = 0.7 + 0.5 * fade;
        mesh.scale.setScalar(s);
      });

      // smooth camera + group parallax (the depth illusion)
      const tx = mouseX * 0.5;
      const ty = mouseY * 0.32;
      camera.position.x += (tx - camera.position.x) * 0.04;
      camera.position.y += (ty + -0.15 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.15, 0);

      globe.rotation.x += (mouseY * 0.12 - globe.rotation.x) * 0.04;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta(); // swallow the paused gap so rotation doesn't jump
      animId = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    // Pause render when the hero scrolls out of view.
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

    // ── 12. Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      img.onload = null;
      img.onerror = null;
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

export default GlobeCanvas;
