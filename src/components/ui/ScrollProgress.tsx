// src/components/ui/ScrollProgress.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skala dari 0 (X) ke 1 sesuai ukuran scroll keseluruhan document
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement, // Memantau seluruh body
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2, // Nilai kecil untuk memberian sedikit efek delay/smooth (seperti useSpring)
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9999] will-change-transform"
      style={{
        transform: 'scaleX(0)', // Inisialisasi awal 0
        boxShadow: '0 0 12px rgba(251,146,60,0.8)'
      }}
    />
  );
};

export default ScrollProgress;