import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const coinSpinVariants: Variants = {
  animate: {
    rotateY: [30, -30, 30, -30],
    rotateX: [5, -5, 5, -5],
    y: [-6, 6, -6, 6],
    transition: {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
  landed: {
    rotateY: 0,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const HeroLogo = ({ showText = true }: { showText?: boolean }) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const flyingRef = useRef<HTMLDivElement>(null);
  const glowsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => { });

    const initScrollAnimation = () => {
      const anchor = document.getElementById('nav-logo-anchor');
      if (!placeholderRef.current || !flyingRef.current || !anchor) return;

      ctx.revert();
      setHasLanded(false);

      ctx.add(() => {
        const startRect = placeholderRef.current!.getBoundingClientRect();

        // Kalkulasi posisi final anchor (force max-w-7xl state)
        const navContainer = anchor.closest('.mx-auto') as HTMLElement | null;
        let finalRect: DOMRect;

        if (navContainer) {
          const orig = navContainer.style.transition;
          navContainer.style.transition = 'none';
          navContainer.classList.add('max-w-7xl');
          void navContainer.offsetHeight;
          finalRect = anchor.getBoundingClientRect();

          navContainer.style.transition = orig;
        } else {
          finalRect = anchor.getBoundingClientRect();
        }

        // Setup awal portal
        gsap.set(flyingRef.current, {
          x: startRect.left,
          y: startRect.top,
          width: startRect.width,
          height: startRect.height,
          opacity: 1,
        });
        gsap.set(placeholderRef.current, { opacity: 0 });

        // Animasi terbang
        gsap.to(flyingRef.current, {
          x: finalRect.left,
          y: finalRect.top,
          width: finalRect.width,
          height: finalRect.height,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: () => `+=${window.innerHeight * 0.75}`,
            scrub: true,
            invalidateOnRefresh: true,
            onLeave: () => {
              // Logo sudah landing: stop animasi, aktifkan pointer events
              setHasLanded(true);
              if (flyingRef.current) {
                flyingRef.current.style.pointerEvents = 'auto';
                flyingRef.current.style.cursor = 'pointer';
              }
            },
            onEnterBack: () => {
              // User scroll balik ke hero: aktifkan lagi animasi
              setHasLanded(false);
              if (flyingRef.current) {
                flyingRef.current.style.pointerEvents = 'none';
                flyingRef.current.style.cursor = '';
              }
            },
          },
        });

        // Glow fade
        if (glowsRef.current) {
          gsap.to(glowsRef.current, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: () => `+=${window.innerHeight * 0.3}`,
              scrub: true,
            },
          });
        }

        // Text fade
        if (textRef.current) {
          gsap.to(textRef.current, {
            opacity: 0,
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: () => `+=${window.innerHeight * 0.4}`,
              scrub: true,
            },
          });
        }
      });
    };

    const timer = setTimeout(initScrollAnimation, 1600);
    window.addEventListener('resize', initScrollAnimation);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', initScrollAnimation);
      ctx.revert();
    };
  }, [isMounted]);

  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-4xl mx-auto">
      <div className="relative flex flex-col items-center gap-0 mb-3 w-full" style={{ perspective: '1200px' }}>

        {/* ANIMASI MASUK & PLACEHOLDER */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: 'blur(16px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2 sm:mb-5 flex justify-center items-center w-full"
        >
          <div ref={placeholderRef} className="relative flex justify-center items-center">
            <motion.img
              src="/logo_dark_transparent.png"
              className="relative w-auto object-contain drop-shadow-xl"
              style={{
                height: 'clamp(9rem, 14vw, 11rem)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              alt="XR Summits"
              variants={coinSpinVariants}
              initial="animate"
              animate="animate"
            />
          </div>
        </motion.div>

        {/* LOGO PORTAL */}
        {isMounted && createPortal(
          <div
            ref={flyingRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0 flex justify-center items-center origin-top-left"
            onClick={() => { window.location.href = '/'; }}
          >
            {/* EFEK GLOW — hanya muncul saat di hero, hilang setelah landing */}
            {!hasLanded && (
              <div ref={glowsRef} className="absolute inset-0 pointer-events-none flex justify-center items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute rounded-full"
                  style={{
                    width: '140%', height: '140%',
                    background: 'conic-gradient(from 0deg, transparent 40%, rgba(56,189,248,0.06) 60%, rgba(251,146,60,0.12) 80%, rgba(251,146,60,0.06) 90%, transparent 100%)',
                    filter: 'blur(10px)',
                  }}
                  aria-hidden="true"
                />
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.08, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute rounded-full"
                  style={{
                    width: '120%', height: '120%',
                    background: 'radial-gradient(circle, rgba(251,146,60,0.45) 0%, transparent 75%)'
                  }}
                  aria-hidden="true"
                />
              </div>
            )}

            {/* LOGO FISIK — animasi 3D berhenti setelah landing */}
            <motion.img
              src="/logo_dark_transparent.png"
              alt="XR Summits"
              className="relative w-full h-full object-contain"
              variants={coinSpinVariants}
              animate={hasLanded ? 'landed' : 'animate'}
              style={{
                // Saat di hero: drop shadow + glow orange
                // Saat landing di navbar: filter tipis saja, tanpa blur
                filter: hasLanded
                  ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))'
                  : 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 12px rgba(251, 146, 60, 0.2))',
                transformStyle: 'preserve-3d',
                willChange: hasLanded ? 'auto' : 'transform',
              }}
            />
          </div>,
          document.body
        )}
      </div>

      {/* TEKS PENDUKUNG */}
      {showText && (
        <div ref={textRef} className="flex flex-col items-center w-full">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-px origin-center mt-6 mb-6"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.75), transparent)',
              boxShadow: '0 0 14px rgba(251,146,60,0.45)',
            }}
            aria-hidden="true"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-medium leading-relaxed max-w-2xl px-2"
            style={{ fontSize: 'clamp(0.72rem, 1.5vw, 0.88rem)', color: 'rgba(240,244,255,0.82)', letterSpacing: '0.02em' }}
          >
            {/* {COMPANY.tagline} */}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center leading-relaxed mt-3 px-4"
            style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)', color: 'rgba(107,127,163,0.7)', lineHeight: 1.75 }}
          >
            The future will not be viewed. It will be experienced.
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default HeroLogo;