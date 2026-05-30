// src/components/ui/BackgroundElements.tsx
import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BackgroundElements = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Parallax Scroll Animasi
      const createParallax = (ref: RefObject<HTMLDivElement | null>, yValue: number) => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
          y: yValue,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      };

      createParallax(orb1Ref, -300);
      createParallax(orb2Ref, 250);
      createParallax(orb3Ref, -480);

      // 2. Idle Floating Animasi (menggantikan Framer Motion repeat/yoyo)
      gsap.to(orb1Ref.current, { scale: 1.08, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(orb2Ref.current, { scale: 1.12, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
      gsap.to(orb3Ref.current, { scale: 1.1, x: -30, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden" aria-hidden="true">
      {/* Orb 1 */}
      <div ref={orb1Ref} className="absolute rounded-full will-change-transform">
        <div style={{
          position: 'absolute', top: '8%', right: '-8%', width: '480px', height: '480px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,1) 0%, transparent 68%)',
          opacity: 0.04, filter: 'blur(60px)',
        }} />
      </div>

      {/* Orb 2 */}
      <div ref={orb2Ref} className="absolute rounded-full will-change-transform">
        <div style={{
          position: 'absolute', top: '42%', left: '-10%', width: '560px', height: '560px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,1) 0%, transparent 68%)',
          opacity: 0.035, filter: 'blur(80px)',
        }} />
      </div>

      {/* Orb 3 */}
      <div ref={orb3Ref} className="absolute rounded-full will-change-transform">
        <div style={{
          position: 'absolute', top: '72%', right: '2%', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,34,206,1) 0%, rgba(30,58,138,1) 60%, transparent 100%)',
          opacity: 0.045, filter: 'blur(70px)',
        }} />
      </div>
    </div>
  );
};

export default BackgroundElements;