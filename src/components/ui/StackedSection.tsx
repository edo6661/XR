import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { killScrollTriggersIn } from '../../lib/scrollTriggerCleanup';

gsap.registerPlugin(ScrollTrigger);

interface StackedSectionProps {
  children: ReactNode;
  zIndex: number;
  isLast?: boolean;
}

const StackedSection = ({ children, zIndex, isLast = false }: StackedSectionProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || isLast) return;

    const ctx = gsap.context(() => {
      const handleResize = () => {
        const isTall = section.offsetHeight > window.innerHeight;
        gsap.set(content, { transformOrigin: isTall ? 'center bottom' : 'center top' });
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      gsap.to(content, {
        scale: 0.94,         // 1. Skala tidak mengecil terlalu jauh (hanya efek depth halus)
        opacity: 0.3,        // 2. Jangan diturunkan sampai 0, biarkan tersisa sedikit agar seperti tertumpuk bayangan
        ease: 'power3.in',   // 3. KUNCI UTAMA: Animasi ditahan di awal scroll, meredupnya perlahan nanti di akhir
        scrollTrigger: {
          trigger: section,
          start: () =>
            section.offsetHeight > window.innerHeight
              ? 'bottom bottom'
              : 'top top',
          end: () => `+=${window.innerHeight}`, // 4. Set persis 1 tinggi layar agar sinkron dengan section bawah yang naik
          scrub: true,       // 5. Ganti ke true (tanpa delay angka) agar animasinya responsif dan solid menempel dengan posisi jari/mouse
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, outerRef);

    return () => ctx.revert();
  }, [isLast]);

  useLayoutEffect(() => {
    return () => {
      killScrollTriggersIn(outerRef.current);
    };
  }, [isLast]);

  return (
    <div ref={outerRef} className="relative w-full" style={{ zIndex }}>
      <div
        ref={sectionRef}
        className="relative w-full bg-background will-change-transform"
      >
        <div ref={contentRef} className="w-full h-full relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StackedSection;