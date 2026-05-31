import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StackedSectionProps {
  children: ReactNode;
  zIndex: number;
  isLast?: boolean;
}

const StackedSection = ({ children, zIndex, isLast = false }: StackedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || isLast) return;

    const ctx = gsap.context(() => {
      // Fungsi untuk menentukan titik pusat animasi (transform-origin)
      const handleResize = () => {
        const isTall = section.offsetHeight > window.innerHeight;
        // Jika elemen tinggi, animasi mengecil ke bawah agar tidak ada gap
        // Jika elemen pendek, animasi mengecil ke atas
        gsap.set(content, { transformOrigin: isTall ? 'center bottom' : 'center top' });
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      gsap.to(content, {
        scale: 0.92,
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          // BEST PRACTICE: Handle section tinggi vs pendek
          start: () =>
            section.offsetHeight > window.innerHeight
              ? 'bottom bottom'
              : 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5, // Smooth scrubbing
          pin: true,
          pinSpacing: false, // Membiarkan section di bawahnya menimpa (stacking)
          invalidateOnRefresh: true,
        },
      });

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isLast]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-background will-change-transform"
      style={{ zIndex }}
    >
      <div ref={contentRef} className="w-full h-full relative">
        {children}
      </div>
    </div>
  );
};

export default StackedSection;