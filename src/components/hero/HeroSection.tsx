import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroVideoBackdrop, { type HeroVideoConfig } from './HeroVideoBackdrop';
import SplatField from './SplatField';
import HeroLogo from './HeroLogo';
import HeroIntroOverlay from './HeroIntroOverlay';

const GLOBE_VIDEO: HeroVideoConfig = {
  src: '/hero/videos/3d_digital_globe.mp4',
  poster: '/hero/earth-dark.jpg',
  objectPosition: '50% 50%',
  filter: 'brightness(0.92) contrast(1.05) saturate(1.06)',
};

type Phase = 'globe' | 'boot' | 'reveal';

const HERO_INTRO_SEEN_KEY = 'xr-hero-intro-seen';
const INTRO_LINE_ENTER_MS = 420;
const INTRO_LINE_READ_MS = 2000;
const INTRO_ZAP_MS = 700;

const STEP_TIMELINE: { at: number; step: number }[] = [
  { at: INTRO_LINE_ENTER_MS + INTRO_LINE_READ_MS, step: 1 },
  { at: (INTRO_LINE_ENTER_MS + INTRO_LINE_READ_MS) * 2, step: 2 },
  { at: (INTRO_LINE_ENTER_MS + INTRO_LINE_READ_MS) * 3, step: 3 },
  { at: (INTRO_LINE_ENTER_MS + INTRO_LINE_READ_MS) * 3 + INTRO_ZAP_MS, step: 4 },
  { at: (INTRO_LINE_ENTER_MS + INTRO_LINE_READ_MS) * 3 + INTRO_ZAP_MS + 700, step: 5 },
  { at: (INTRO_LINE_ENTER_MS + INTRO_LINE_READ_MS) * 3 + INTRO_ZAP_MS + 1380, step: 6 },
];
const LAST_STEP = 6;

function hasSeenHeroIntro(): boolean {
  try {
    return sessionStorage.getItem(HERO_INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markHeroIntroSeen(): void {
  try {
    sessionStorage.setItem(HERO_INTRO_SEEN_KEY, '1');
  } catch {
    // sessionStorage unavailable
  }
}

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const skipIntro = prefersReducedMotion || hasSeenHeroIntro();

  const [step, setStep] = useState<number>(skipIntro ? LAST_STEP : 0);

  useEffect(() => {
    if (step === LAST_STEP) {
      markHeroIntroSeen();
    }
  }, [step]);

  useEffect(() => {
    if (skipIntro) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    STEP_TIMELINE.forEach(({ at, step: s }) => {
      timers.push(setTimeout(() => setStep(s), at));
    });

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
  }, [skipIntro]);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const videoRevealed = step >= 4;
  const showLogo = step >= 4;
  const showTiles = step >= 5;
  const showHint = step >= LAST_STEP;

  const hudPhase: Phase = step < 4 ? 'globe' : step === 4 ? 'boot' : 'reveal';

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── BACKDROP: globe + particles → text ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050b18]" aria-hidden="true">
        {/* 1. Liquid globe video — sole hero background after intro words */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            scale: videoRevealed && !prefersReducedMotion ? 1.06 : 1.12,
            opacity: videoRevealed ? 1 : 0.92,
          }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVideoBackdrop {...GLOBE_VIDEO} />
        </motion.div>

        {/* 2. Blue static particles — mixed with the animated globe */}
        <motion.div
          className="absolute inset-0 z-1 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 4 ? 0.95 : step >= 5 ? 0.7 : 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ mixBlendMode: 'screen' }}
          aria-hidden="true"
        >
          <SplatField />
        </motion.div>

      </div>

      <BootOverlay phase={hudPhase} reduced={prefersReducedMotion} />
      {!prefersReducedMotion && <HeroIntroOverlay step={step} />}

      {/* ── KONTEN UTAMA ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 pt-20 sm:pt-24 pb-12"
        animate={
          showTiles && !prefersReducedMotion
            ? { x: [0, -7, 6, -4, 3, -1.5, 0], y: [0, 5, -4, 3, -2, 1, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <AnimatePresence>
          {showLogo && (
            <motion.div
              key="logo-block"
              initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1.3, 0.4, 1] }}
              className="relative flex flex-col items-center w-full max-w-4xl"
            >
              {/* Shockwave */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      zIndex: -1,
                      border: '1.5px solid rgba(125,211,252,0.4)',
                      borderRadius: '50%',
                    }}
                    initial={{ width: 80, height: 40, opacity: 0 }}
                    animate={{ width: [80, 800], height: [40, 200], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      zIndex: -1,
                      width: 600,
                      height: 240,
                      background:
                        'radial-gradient(ellipse, rgba(125,211,252,0.16) 0%, rgba(251,146,60,0.08) 45%, transparent 70%)',
                    }}
                    initial={{ scale: 0.25, opacity: 0 }}
                    animate={{ scale: [0.25, 2.2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.3, ease: 'easeOut' }}
                    aria-hidden="true"
                  />
                  {/* Spark burst — disesuaikan untuk logo horizontal */}
                  {Array.from({ length: 10 }).map((_, i) => {
                    const angle = (i / 10) * Math.PI * 2;
                    const distX = (160 + (i % 3) * 50) * Math.cos(angle);
                    const distY = (60 + (i % 3) * 20) * Math.sin(angle);
                    return (
                      <motion.span
                        key={i}
                        className="absolute left-1/2 top-[35%] rounded-full pointer-events-none"
                        style={{
                          zIndex: -1,
                          width: i % 2 === 0 ? 3 : 2,
                          height: i % 2 === 0 ? 3 : 2,
                          background: i % 3 === 0 ? '#fdba74' : '#7dd3fc',
                          boxShadow: `0 0 8px ${i % 3 === 0 ? '#fb923c' : '#38bdf8'}`,
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
                        animate={{
                          x: distX,
                          y: distY,
                          opacity: [0, 1, 0],
                          scale: [1, 0.3],
                        }}
                        transition={{ duration: 0.85, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden="true"
                      />
                    );
                  })}
                </>
              )}



              {/* ── LOGO ── */}
              <HeroLogo showText={false} />

              {/* ── DIVIDER ── */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mt-7 mb-6 w-full max-w-md justify-center"
                aria-hidden="true"
              >
                <div
                  className="h-px flex-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.28))',
                  }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'rgba(125,211,252,0.7)',
                    boxShadow: '0 0 8px rgba(125,211,252,0.9)',
                  }}
                />
                <div
                  className="h-px flex-1"
                  style={{
                    background: 'linear-gradient(90deg, rgba(125,211,252,0.28), transparent)',
                  }}
                />
              </motion.div>

              {/* ── HEADLINE ── */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-center font-heading font-semibold leading-snug max-w-3xl px-4"
                style={{
                  fontSize: 'clamp(1rem, 2.3vw, 1.55rem)',
                  color: '#f0f4ff',
                  letterSpacing: '0.015em',
                }}
              >
                Asia&apos;s Premier Platform for{' '}
                <span
                  style={{
                    background: 'linear-gradient(120deg, #7dd3fc 0%, #38bdf8 55%, #fb923c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  AI · XR · Spatial Media
                </span>{' '}
                &amp; Immersive Technology
              </motion.h2>

              {/* ── SUBTEXT ── */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mt-5 px-4 max-w-2xl font-medium"
                style={{
                  fontSize: 'clamp(0.95rem, 1.85vw, 1.2rem)',
                  lineHeight: 1.65,
                  color: 'rgba(240, 244, 255, 0.92)',
                }}
              >
                Connecting industry leaders, creators, educators, broadcasters,
                governments and technology innovators through deployment-ready
                immersive experiences.
              </motion.p>


            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── SCROLL HINT ── */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showHint ? 1 : 0, y: showHint ? 0 : 10 }}
        transition={{ duration: 0.8, delay: showHint ? 0.2 : 0 }}
        onClick={handleScrollDown}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 group hidden sm:flex flex-col items-center gap-2 cursor-pointer"
        aria-label="Scroll to Choose Your Experience"
        style={{ pointerEvents: showHint ? 'auto' : 'none' }}
      >
        <span className="text-kicker group-hover:text-accent">Experience More</span>
        <div
          className="relative w-px h-8 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          <motion.div
            className="absolute top-0 w-full"
            style={{
              height: '45%',
              background:
                'linear-gradient(to bottom, transparent, rgba(251,146,60,0.8), transparent)',
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

// ── BootOverlay — tidak berubah dari original ──────────────────────────────
const BootOverlay = ({ phase, reduced }: { phase: Phase; reduced: boolean }) => {
  const active = phase !== 'globe';
  const booting = phase === 'boot';

  const corners = [
    { c: 'top-6 left-6 border-t border-l', label: '1506516-A', align: 'items-start' },
    { c: 'top-6 right-6 border-t border-r', label: '3.08695, 101.62442', align: 'items-end' },
    { c: 'bottom-6 left-6 border-b border-l', label: 'XR . 2021', align: 'items-start' },
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
      <div
        className="absolute inset-0"
        style={{
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
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.12, 0.85, 1],
            }}
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
            transition={
              booting ? { duration: 1.4, repeat: Infinity } : { duration: 0.4 }
            }
            className="font-mono uppercase"
            style={{
              fontSize: '1rem',
              letterSpacing: '0.28em',
              color: 'rgba(125,211,252,0.55)',
            }}
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
              <circle
                cx="75"
                cy="75"
                r="58"
                stroke="rgba(125,211,252,0.25)"
                strokeWidth="0.75"
                strokeDasharray="2 9"
              />
              <circle cx="75" cy="75" r="44" stroke="rgba(125,211,252,0.18)" strokeWidth="0.5" />
              <path
                d="M75 8 v14 M75 128 v14 M8 75 h14 M128 75 h14"
                stroke="rgba(125,211,252,0.35)"
                strokeWidth="0.75"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HeroSection;