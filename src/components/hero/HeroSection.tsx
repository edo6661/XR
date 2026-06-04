import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';
import GlobeCanvas from './GlobeCanvas';
import HeroVideoBackdrop, { type HeroVideoConfig } from './HeroVideoBackdrop';
import SplatField from './SplatField';
import HeroLogo from './HeroLogo';

/**
 * ── Hero backdrop switch ─────────────────────────────────────────────────
 * The client asked us to trial three cinematic clips one by one. Each entry
 * below is pre-graded toward the brand palette; flip ACTIVE_BACKDROP to
 * preview a different one (or 'globe' to compare with the original 3D canvas).
 *
 *   'globe-3d'  → /hero/videos/3d_digital_globe.mp4  (recommended Stage-1 fit:
 *                 matches the brief's "Animatic 3D Globe" background)
 *   'spatial'   → spatial_computing_businessman…     (most overtly B2B / human;
 *                 great "Corporate + Metaverse" read, heaviest file)
 *   'network'   → digital_technology_network…        (abstract data-network;
 *                 cleanest, lightest, very "next-worldly")
 *   'globe'     → original three.js GlobeCanvas      (the current build)
 */
type BackdropId = 'globe-3d' | 'spatial' | 'network' | 'globe';

const VIDEO_BACKDROPS: Record<Exclude<BackdropId, 'globe'>, HeroVideoConfig> = {
  'globe-3d': {
    src: '/hero/videos/3d_digital_globe.mp4',
    poster: '/hero/earth-dark.jpg',
    objectPosition: '50% 50%',
    filter: 'brightness(0.92) contrast(1.05) saturate(1.06)',
  },
  spatial: {
    src: '/hero/videos/spatial_computing_businessman_working_with_virtual.mp4',
    objectPosition: '50% 38%',
    filter: 'brightness(0.8) contrast(1.08) saturate(0.92)',
  },
  network: {
    src: '/hero/videos/digital_technology_network_word_work_cloud_backgrounds.mp4',
    objectPosition: '50% 50%',
    filter: 'brightness(0.88) contrast(1.06) saturate(1.02)',
  },
};

const ACTIVE_BACKDROP = 'spatial' as BackdropId;

const HERO_CTAS = [
  { label: 'Explore XRAS26', to: '/xras-kl-2026', variant: 'primary' as const },
  { label: 'Explore AIXR Sarawak', to: '/aixr-2026-sarawak', variant: 'primary' as const },
  { label: 'Become Exhibitor', to: '/contact', variant: 'secondary' as const },
  { label: 'Register Interest', to: '/contact', variant: 'secondary' as const },
] as const;

type Phase = 'globe' | 'boot' | 'reveal';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [phase, setPhase] = useState<Phase>(prefersReducedMotion ? 'reveal' : 'globe');

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('boot'), 1100));
    timers.push(setTimeout(() => setPhase('reveal'), 2250));

    let advanced = false;
    const fastForward = () => {
      if (advanced) return;
      advanced = true;
      timers.forEach(clearTimeout);
      setPhase('boot');
      timers.push(setTimeout(() => setPhase('reveal'), 760));
      removeListeners();
    };

    const events: (keyof WindowEventMap)[] = ['wheel', 'touchmove', 'scroll', 'pointerdown', 'keydown'];
    const removeListeners = () => events.forEach((ev) => window.removeEventListener(ev, fastForward));
    events.forEach((ev) => window.addEventListener(ev, fastForward, { passive: true }));

    return () => {
      timers.forEach(clearTimeout);
      removeListeners();
    };
  }, [prefersReducedMotion]);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const pX = useSpring(mvX, { stiffness: 50, damping: 18, mass: 0.7 });
  const pY = useSpring(mvY, { stiffness: 50, damping: 18, mass: 0.7 });
  const globeX = useTransform(pX, (v) => v * -14);
  const globeY = useTransform(pY, (v) => v * -10);

  const onSectionMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return;
      mvX.set((e.clientX / window.innerWidth) * 2 - 1);
      mvY.set((e.clientY / window.innerHeight) * 2 - 1);
    },
    [mvX, mvY, prefersReducedMotion],
  );

  const handleScrollDown = () => {
    document.getElementById('choose-experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const showReveal = phase === 'reveal';
  const globeBlur = phase === 'globe' ? 0 : phase === 'boot' ? 7 : 1.4;
  const globeBrightness = phase === 'globe' ? 1 : phase === 'boot' ? 0.78 : 0.82;

  return (
    <section
      ref={heroRef}
      onMouseMove={onSectionMouseMove}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        animate={{
          filter: prefersReducedMotion ? 'none' : `blur(${globeBlur}px) brightness(${globeBrightness})`,
          scale: showReveal && !prefersReducedMotion ? 1.06 : 1,
        }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: prefersReducedMotion ? 0 : globeX, y: prefersReducedMotion ? 0 : globeY }}
      >
        {ACTIVE_BACKDROP === 'globe' ? (
          <GlobeCanvas />
        ) : (
          <HeroVideoBackdrop {...VIDEO_BACKDROPS[ACTIVE_BACKDROP]} />
        )}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-1 pointer-events-none"
        animate={{ opacity: showReveal ? 1 : 0.7 }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            'radial-gradient(ellipse 78% 62% at 50% 42%, transparent 0%, rgba(5,11,24,0.5) 48%, rgba(5,11,24,0.94) 80%, #050b18 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-2 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(5,11,24,0.7) 50%, #050b18 100%)',
        }}
        aria-hidden="true"
      />

      {ACTIVE_BACKDROP !== 'globe' && (
        <motion.div
          className="absolute inset-0 z-3 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'boot' ? 0.95 : showReveal ? 0.7 : 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <SplatField />
        </motion.div>
      )}

      <BootOverlay phase={phase} reduced={prefersReducedMotion} mvX={pX} mvY={pY} />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-12 gap-6">
        <HeroLogo />

        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: showReveal ? 1 : 0, y: showReveal ? 0 : 16 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Primary calls to action"
          className="relative z-20 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
        >
          {HERO_CTAS.map(({ label, to, variant }) => (
            <Link
              key={label}
              to={to}
              className={`group relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] transition-all duration-300 cursor-none ${variant === 'primary'
                ? 'text-[#050b18] hover:shadow-[0_0_32px_rgba(251,146,60,0.35)]'
                : 'text-accent hover:text-foreground'
                }`}
              style={
                variant === 'primary'
                  ? {
                    background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                    border: '1px solid rgba(251,146,60,0.5)',
                  }
                  : {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(251,146,60,0.35)',
                  }
              }
            >
              <span>{label}</span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </motion.nav>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showReveal ? 1 : 0, y: showReveal ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2.5 cursor-pointer mt-2"
          aria-label="Scroll to Choose Your Experience"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full"
            style={{ background: 'rgba(251,146,60,0.6)' }}
            aria-hidden="true"
          />
          <span
            className="font-bold tracking-[0.55em] uppercase transition-colors duration-300 group-hover:text-accent"
            style={{ fontSize: '0.5rem', color: 'rgba(107,127,163,0.4)' }}
          >
            Discover
          </span>
          <div className="relative w-px h-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <motion.div
              className="absolute top-0 w-full"
              style={{
                height: '45%',
                background: 'linear-gradient(to bottom, transparent, rgba(251,146,60,0.8), transparent)',
              }}
              animate={{ y: ['-100%', '320%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

const BootOverlay = ({
  phase,
  reduced,
  mvX,
  mvY,
}: {
  phase: Phase;
  reduced: boolean;
  mvX: MotionValue<number>;
  mvY: MotionValue<number>;
}) => {
  const active = phase !== 'globe';
  const booting = phase === 'boot';
  const glassX = useTransform(mvX, (v) => v * -20);
  const glassY = useTransform(mvY, (v) => v * -16);

  const corners = [
    { c: 'top-6 left-6 border-t border-l', label: 'CALIBRATING', align: 'items-start' },
    { c: 'top-6 right-6 border-t border-r', label: 'DEPTH · LOCK', align: 'items-end' },
    { c: 'bottom-6 left-6 border-b border-l', label: '03°08′N 101°41′E', align: 'items-start' },
    { c: 'bottom-6 right-6 border-b border-r', label: 'XR · OS 4.0', align: 'items-end' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-5 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced ? 0 : glassX,
          y: reduced ? 0 : glassY,
          background:
            'radial-gradient(120% 120% at 50% 45%, transparent 50%, rgba(56,189,248,0.05) 70%, rgba(5,11,24,0.55) 88%, rgba(5,11,24,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            'inset 0 0 130px 8px rgba(56,189,248,0.05), inset 2px 0 64px -20px rgba(125,211,252,0.2), inset -2px 0 64px -20px rgba(251,146,60,0.12)',
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: active ? 0.5 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(125,211,252,0.05) 0px, rgba(125,211,252,0.05) 1px, transparent 1px, transparent 3px)',
          maskImage: 'radial-gradient(circle at 50% 45%, black 55%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 55%, transparent 92%)',
        }}
      />
      <AnimatePresence>
        {booting && !reduced && (
          <motion.div
            initial={{ top: '-10%', opacity: 0 }}
            animate={{ top: ['-10%', '110%'], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], times: [0, 0.12, 0.85, 1] }}
            className="absolute inset-x-0 h-[40%]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(125,211,252,0.04) 60%, rgba(125,211,252,0.22) 88%, rgba(255,255,255,0.5) 100%)',
            }}
          />
        )}
      </AnimatePresence>
      {corners.map(({ c, label, align }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.7 }}
          transition={{ duration: 0.7, delay: active ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute hidden md:flex flex-col gap-1.5 ${align} ${c.split(' ')[0]} ${c.split(' ')[1]}`}
        >
          <span
            className={`block w-7 h-7 rounded-[2px] ${c.split(' ').slice(2).join(' ')}`}
            style={{ borderColor: 'rgba(125,211,252,0.3)' }}
          />
          <motion.span
            animate={{ opacity: booting ? [0.3, 0.8, 0.3] : 0.32 }}
            transition={booting ? { duration: 1.4, repeat: Infinity } : { duration: 0.4 }}
            className="font-mono uppercase"
            style={{ fontSize: '0.42rem', letterSpacing: '0.28em', color: 'rgba(125,211,252,0.55)' }}
          >
            {label}
          </motion.span>
        </motion.div>
      ))}
      <AnimatePresence>
        {booting && !reduced && (
          <motion.div
            initial={{ opacity: 0, scale: 1.35, rotate: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [1.35, 1, 0.94], rotate: 90 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
          >
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
              <circle cx="75" cy="75" r="58" stroke="rgba(125,211,252,0.25)" strokeWidth="0.75" strokeDasharray="2 9" />
              <circle cx="75" cy="75" r="44" stroke="rgba(125,211,252,0.18)" strokeWidth="0.5" />
              <path d="M75 8 v14 M75 128 v14 M8 75 h14 M128 75 h14" stroke="rgba(125,211,252,0.35)" strokeWidth="0.75" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HeroSection;
