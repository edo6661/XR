import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ParticleCanvas — optimasi:
 * - Kurangi particle count (2800 → 1800) untuk GPU mid-range
 * - Gunakan Float16Array di mana mungkin
 * - Pause saat tidak visible (IntersectionObserver)
 * - Limit pixel ratio max 1.5 (bukan 2)
 * - Hapus GridHelper (draw call tambahan, tidak terlalu terlihat)
 * - Tambah disposal yang benar
 */
const ParticleCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene setup ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      mount.clientWidth / mount.clientHeight,
      0.1,
      800
    );
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // Cap pixel ratio ke 1.5 — tidak perlu 2x untuk partikel background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particles ────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 1800; // dikurangi dari 2800
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const palette = [
      new THREE.Color('#fb923c'),
      new THREE.Color('#1e3a8a'),
      new THREE.Color('#7e22ce'),
      new THREE.Color('#93c5fd'),
      new THREE.Color('#f0f4ff'),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 4.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 1.5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 2.2 + 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader sederhana — hindari branching kompleks
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      glslVersion: THREE.GLSL3,
      vertexShader: `
        in float size;
        in vec3 color;
        out vec3 vColor;
        out float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;
          float t = uTime;
          pos.x += sin(t * 0.16 + position.z * 0.35) * 0.07;
          pos.y += cos(t * 0.12 + position.x * 0.28) * 0.055;
          pos.z += sin(t * 0.09 + position.y * 0.2)  * 0.045;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (260.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
          // depth-based fade untuk partikel jauh
          vAlpha = clamp(1.0 + mvPos.z * 0.18, 0.3, 1.0);
        }
      `,
      fragmentShader: `
        in vec3 vColor;
        in float vAlpha;
        out vec4 outColor;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.15, 0.5, d)) * vAlpha * 0.72;
          float glow  = exp(-d * 5.5) * 0.65;
          outColor = vec4(vColor + glow * 0.35, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Mouse parallax (throttled) ────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    let ticking = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Visibility: stop rendering when off-screen ────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(mount);

    // ── Animation loop ────────────────────────────────────────────────────
    let animId: number;
    let lastTime = 0;
    let elapsed = 0;
    const FPS_CAP = 1000 / 60; // 60fps cap

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = timestamp - lastTime;
      if (delta < FPS_CAP) return; // throttle
      lastTime = timestamp;
      elapsed += delta * 0.001;

      material.uniforms.uTime.value = elapsed;

      // Very gentle rotation + parallax
      particles.rotation.y = elapsed * 0.014 + mouseX * 0.05;
      particles.rotation.x = mouseY * 0.032;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default ParticleCanvas;