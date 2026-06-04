import { useRef, useState, useEffect, useCallback } from 'react';
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
import HeroIntroOverlay from './HeroIntroOverlay';
import HeroGatewayTiles from './HeroGatewayTiles';

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

type Phase = 'globe' | 'boot' | 'reveal';

/**
 * ── "Zap zap" intro timeline ─────────────────────────────────────────────
 * step 0  "The Internet was flat."
 * step 1  "The future is spatial. Powered by AI"
 * step 2  ⚡ zap flash — veil tears away, video revealed
 * step 3  XR logo pop + "Join us to the Immersive Spatial Future"
 * step 4  BOOM — 3 glassmorphic tiles fly in
 * step 5  done (scroll hint live; scroll → hero closes → About Us)
 */
const STEP_TIMELINE: { at: number; step: number }[] = [
  { at: 1000, step: 1 },
  { at: 2000, step: 2 },
  { at: 2420, step: 3 },
  { at: 3180, step: 4 },
  { at: 3980, step: 5 },
];
const LAST_STEP = 5;

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // step 0..5 — see STEP_TIMELINE. Reduced motion jumps straight to the finale.
  const [step, setStep] = useState<number>(prefersReducedMotion ? LAST_STEP : 0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    STEP_TIMELINE.forEach(({ at, step: s }) => {
      timers.push(setTimeout(() => setStep(s), at));
    });

    // Let an impatient visitor skip the cold open → snap to the live finale.
    let skipped = false;
    const fastForward = () => {
      if (skipped) return;
      skipped = true;
      timers.forEach(clearTimeout);
      setStep(LAST_STEP);
      removeListeners();
    };
    const events: (keyof WindowEventMap)[] = ['wheel', 'touchmove', 'pointerdown', 'keydown'];
    const removeListeners = () =>
      events.forEach((ev) => window.removeEventListener(ev, fastForward));
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

  // Derived stage flags
  const videoRevealed = step >= 3; // veil has torn away
  const showLogo = step >= 3;
  const showTiles = step >= 4;
  const showHint = step >= LAST_STEP;

  // Background focus-pull: blurred while veiled → punchy boot → settle.
  const hudPhase: Phase = step < 3 ? 'globe' : step === 3 ? 'boot' : 'reveal';
  const bgBlur = step >= 4 ? 1.4 : step === 3 ? 7 : 5;
  const bgBrightness = step >= 4 ? 0.82 : 0.76;

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
          filter: prefersReducedMotion ? 'none' : `blur(${bgBlur}px) brightness(${bgBrightness})`,
          scale: videoRevealed && !prefersReducedMotion ? 1.06 : 1.12,
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
        animate={{ opacity: showTiles ? 1 : 0.7 }}
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
          animate={{ opacity: step === 3 ? 0.95 : step >= 4 ? 0.7 : 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <SplatField />
        </motion.div>
      )}

      <BootOverlay phase={hudPhase} reduced={prefersReducedMotion} mvX={pX} mvY={pY} />

      {/* ── The "zap zap" cold open (sits above everything, then unmounts) ── */}
      {!prefersReducedMotion && <HeroIntroOverlay step={step} />}

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 pt-20 sm:pt-24 pb-12 gap-2 sm:gap-4">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1.3, 0.4, 1] }}
              className="relative flex flex-col items-center"
            >
              {/* WOW — shockwave ring + light burst when the logo lands */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{ zIndex: -1, border: '2px solid rgba(125,211,252,0.55)' }}
                    initial={{ width: 60, height: 60, opacity: 0 }}
                    animate={{ width: [60, 560], height: [60, 560], opacity: [0.7, 0] }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                      zIndex: -1,
                      width: 360,
                      height: 360,
                      background:
                        'radial-gradient(circle, rgba(251,146,60,0.28) 0%, rgba(56,189,248,0.12) 35%, transparent 65%)',
                    }}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: [0.2, 2.3], opacity: [0.55, 0] }}
                    transition={{ duration: 1.05, ease: 'easeOut' }}
                    aria-hidden="true"
                  />
                </>
              )}
              <HeroLogo showText={false} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 14 }}
          transition={{ duration: 0.7, delay: showLogo ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-semibold text-center"
          style={{
            fontSize: 'clamp(0.9rem, 2.4vw, 1.5rem)',
            color: 'rgba(240,244,255,0.94)',
            letterSpacing: '0.01em',
          }}
        >
          Join us to the{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, #fb923c 0%, #fdba74 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Immersive Spatial Future
          </span>
        </motion.h2>

        <HeroGatewayTiles active={showTiles} />
      </div>

      {/* Scroll hint — pulled out of the content flow so it can never push the
          tiles off-screen on short / windowed viewports. */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showHint ? 1 : 0, y: showHint ? 0 : 10 }}
        transition={{ duration: 0.8, delay: showHint ? 0.2 : 0 }}
        onClick={handleScrollDown}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 group hidden sm:flex flex-col items-center gap-2 cursor-pointer"
        aria-label="Scroll to Choose Your Experience"
        style={{ pointerEvents: showHint ? 'auto' : 'none' }}
      >
        <span
          className="font-bold tracking-[0.55em] uppercase transition-colors duration-300 group-hover:text-accent"
          style={{ fontSize: '0.5rem', color: 'rgba(107,127,163,0.4)' }}
        >
          Or scroll to explore
        </span>
        <div className="relative w-px h-8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
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
