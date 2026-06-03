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
        scale: 0.92,
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: () =>
            section.offsetHeight > window.innerHeight
              ? 'bottom bottom'
              : 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
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
