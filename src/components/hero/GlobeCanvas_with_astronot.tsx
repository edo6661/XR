import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeCanvasWithAstronot = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── 1. Setup Scene & Camera ──────────────────────────────────────────
    const scene = new THREE.Scene();

    // FOV lebih lebar (60) untuk memberikan kesan ruang/kokpit yang luas
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // ── 2. Cinematic 2D Background (Astronaut Image) ───────────────────
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/hero/astronaut.png');

    // Pastikan warna gambar tidak pudar (sesuai standar Three.js terbaru)
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    // Membuat plane raksasa di belakang (asumsi rasio gambar ~16:9)
    // Dibuat lebih besar dari layar agar kamera punya ruang untuk panning (geser)
    const planeHeight = 45;
    const planeWidth = planeHeight * (16 / 9);
    const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight);

    // Kita gunakan MeshBasicMaterial agar warnanya persis seperti gambar asli tanpa butuh pencahayaan
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      depthWrite: false // Pastikan tidak menutupi partikel di depannya
    });
    const bgMesh = new THREE.Mesh(planeGeo, planeMat);
    bgMesh.position.z = -20; // Dorong jauh ke belakang
    scene.add(bgMesh);

    // ── 3. Metaverse Data Dust (Foreground 3D Particles) ───────────────
    // Partikel ini memberikan ilusi bahwa kita berada di RUANGAN yang sama dengan astronot
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Sebarkan partikel di depan gambar astronot (z antara -10 hingga +4)
      positions[i3] = (Math.random() - 0.5) * 40;     // X
      positions[i3 + 1] = (Math.random() - 0.5) * 30; // Y
      positions[i3 + 2] = (Math.random() - 0.5) * 14 - 3; // Z

      opacities[i] = Math.random();
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    // Custom Shader untuk efek kelap-kelip digital
    const particlesMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#22d3ee') } // Warna cyan khas antarmuka HUD/Hologram
      },
      vertexShader: `
        attribute float aOpacity;
        varying float vOpacity;
        uniform float uTime;
        void main() {
          vOpacity = aOpacity;
          vec3 pos = position;
          // Partikel bergerak naik pelan-pelan
          pos.y += sin(uTime * 0.2 + pos.x) * 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (12.0 / -mvPosition.z); // Ukuran membesar jika dekat kamera
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;
        uniform float uTime;
        void main() {
          // Bentuk partikel membulat
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Efek denyut (pulsing)
          float pulse = (sin(uTime * 2.0 + vOpacity * 10.0) + 1.0) * 0.5;
          gl_FragColor = vec4(uColor, vOpacity * pulse * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // ── 4. Mouse Parallax (The 3D Illusion Engine) ─────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Normalisasi koordinat mouse dari -1 ke 1
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── 5. Animation Loop ──────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update partikel
      particlesMat.uniforms.uTime.value = elapsedTime;
      // Rotasi pelan keseluruhan partikel seperti debu angkasa
      particles.rotation.y = elapsedTime * 0.02;

      // Efek bernapas (breathing) pelan pada gambar belakang
      bgMesh.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.015);

      // Lerp Camera Parallax (Gerakan mulus mengikuti mouse)
      // Kamera bergerak, memberikan perspektif berbeda pada partikel dan background
      targetX = mouseX * 2.5; // Rentang geser horizontal
      targetY = mouseY * 1.5; // Rentang geser vertikal

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;

      // Agar kamera selalu sedikit mengarah ke tengah
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
    };
    animate();

    // ── 6. Resize Handler ──────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Memory cleanup
      planeGeo.dispose();
      planeMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      texture.dispose();
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

export default GlobeCanvasWithAstronot;