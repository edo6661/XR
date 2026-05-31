import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Setup Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio untuk performa
    mount.appendChild(renderer.domElement);

    // 2. Cinematic Globe (Digital Points)
    const geometry = new THREE.SphereGeometry(1.8, 64, 64);

    // Trik: Buang sebagian titik secara acak untuk efek "hologram digital"
    const count = geometry.attributes.position.count;
    const positions = geometry.attributes.position.array;
    const newPositions = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() > 0.35) { // Hanya gunakan 65% titik
        newPositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      }
    }
    const finalGeometry = new THREE.BufferGeometry();
    finalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x22d3ee, // Cyan accent, bisa diganti ke 0xfb923c (Orange) jika ingin senada
      size: 0.012,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const globe = new THREE.Points(finalGeometry, material);
    scene.add(globe);

    // 3. Inner Core (Bola gelap di dalam agar titik belakang terblokir dengan elegan)
    const coreGeometry = new THREE.SphereGeometry(1.76, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x050b18, // Warna background
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // 4. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      // Rotasi globe perlahan
      globe.rotation.y += 0.0015;
      globe.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    // 5. Handle Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      finalGeometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
};

export default GlobeCanvas;