import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import GlobeCanvas from './GlobeCanvas';
import HeroLogo from './HeroLogo';
import GatewayCard from './GatewayCard';

// ── Icons ──────────────────────────────────────────────────────────────────
const XRIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5l10.5-6 10.5 6v9l-10.5 6-10.5-6v-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3M2.25 7.5l9.75 5.5 9.75-5.5" />
  </svg>
);
const EsportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17L6.75 19.5a2.121 2.121 0 01-3-3l4.672-4.853" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c3.5 0 6.5 2.5 7 6l-2.5 1.5-4.5-3-4.5 3L5 9c.5-3.5 3.5-6 7-6z" />
  </svg>
);
const GalaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M9 3h6v3.75a3 3 0 11-6 0V3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5H4.125A1.125 1.125 0 003 5.625v.75A3.375 3.375 0 006.375 9.75M18 4.5h1.875A1.125 1.125 0 0121 5.625v.75A3.375 3.375 0 0117.625 9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v4.5m-3 3.75h6m-4.5 0a1.5 1.5 0 013 0" />
  </svg>
);

// Refined, low-chroma triad anchored to the navy + brand-orange system:
// a cool steel-cyan, the brand orange (flagship), and a champagne gold for the
// black-tie gala. Reads "expensive / corporate" rather than neon / gamer.
const GATEWAYS = [
  {
    title: 'XR Esports',
    subtitle: 'Competitive · Immersive',
    description: 'Where traditional esports collides with spatial computing. Compete, spectate, and experience gaming redefined.',
    to: '/xr-esports',
    accentColor: '#6fb6cf',
    glowColor: '#4f93ad',
    tag: 'Arena',
    icon: <EsportsIcon />,
    isCenter: false,
  },
  {
    title: 'XR Asia Summit',
    subtitle: '4th Edition · XRAS26',
    description: "The definitive platform where immersive tech visionaries, enterprise leaders, and XR innovators converge.",
    to: '/xr-summit',
    accentColor: '#fb923c',
    glowColor: '#e0843a',
    tag: 'Flagship',
    icon: <XRIcon />,
    isCenter: true,
  },
  {
    title: 'XR Gala',
    subtitle: 'Awards · Black Tie',
    description: 'The flagship awards night honouring the visionaries, studios, and breakthroughs defining immersive technology in Asia.',
    to: '/awards',
    accentColor: '#d9b27a',
    glowColor: '#b8915a',
    tag: 'Gala',
    icon: <GalaIcon />,
    isCenter: false,
  },
];

const FLAGSHIP_INDEX = 1; // XR Asia Summit anchors the carousel
const SEG = (Math.PI * 2) / GATEWAYS.length;
const FRONT_ANGLE = Math.PI / 2; // sin(angle) is maximal here → nearest to viewer
const SETTLE = FRONT_ANGLE - FLAGSHIP_INDEX * SEG; // angleOffset that puts flagship in front

// Snap an arbitrary offset to whichever puts a card cleanly in front
const snapAngle = (a: number) => FRONT_ANGLE + Math.round((a - FRONT_ANGLE) / SEG) * SEG;

type Phase = 'globe' | 'visor' | 'reveal';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Staged narrative: globe → visor → reveal ───────────────────────────────
  const [phase, setPhase] = useState<Phase>(prefersReducedMotion ? 'reveal' : 'globe');

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('visor'), 1300));
    timers.push(setTimeout(() => setPhase('reveal'), 2050));

    // Brief: "after ~1s delay OR triggered by scroll." If the user scrolls or
    // interacts early, compress the sequence so they aren't left waiting.
    let advanced = false;
    const fastForward = () => {
      if (advanced) return;
      advanced = true;
      timers.forEach(clearTimeout);
      setPhase('visor');
      timers.push(setTimeout(() => setPhase('reveal'), 620));
      removeListeners();
    };

    const events: (keyof WindowEventMap)[] = [
      'wheel',
      'touchmove',
      'scroll',
      'pointerdown',
      'keydown',
    ];
    const removeListeners = () =>
      events.forEach((ev) => window.removeEventListener(ev, fastForward));
    events.forEach((ev) =>
      window.addEventListener(ev, fastForward, { passive: true }),
    );

    return () => {
      timers.forEach(clearTimeout);
      removeListeners();
    };
  }, [prefersReducedMotion]);

  // ── Viewport width (kept in sync so the orbit radius stays responsive) ──────
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280));
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isMobile = vw < 768;

  // ── Carousel engine: drift-in, settle, drag, snap ──────────────────────────
  const [angleOffset, setAngleOffset] = useState(prefersReducedMotion ? SETTLE : SETTLE - 0.62);
  const angleRef = useRef(angleOffset);
  const targetRef = useRef(SETTLE);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  // Spring the ring toward its target, then *stop* — no idle per-frame renders.
  const tick = useCallback(() => {
    const diff = targetRef.current - angleRef.current;
    angleRef.current += diff * 0.08;
    setAngleOffset(angleRef.current);
    if (!draggingRef.current && Math.abs(diff) < 0.0006) {
      angleRef.current = targetRef.current;
      setAngleOffset(targetRef.current);
      runningRef.current = false;
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const kick = useCallback(() => {
    if (runningRef.current || prefersReducedMotion) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== 'reveal') return;

    if (prefersReducedMotion) {
      angleRef.current = SETTLE;
      targetRef.current = SETTLE;
      setAngleOffset(SETTLE);
      return;
    }

    angleRef.current = SETTLE - 0.62; // start rotated so it "projects" into place
    targetRef.current = SETTLE;
    kick();

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase, prefersReducedMotion, kick]);

  // Pointer drag — feels like physically spinning the holographic ring
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = targetRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    kick();
  }, [prefersReducedMotion, kick]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    targetRef.current = startAngleRef.current + dx * 0.006;
    kick();
  }, [kick]);

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    targetRef.current = snapAngle(targetRef.current);
    kick();
  }, [kick]);

  const goToIndex = useCallback((i: number) => {
    const base = FRONT_ANGLE - i * SEG;
    const k = Math.round((targetRef.current - base) / (Math.PI * 2));
    targetRef.current = base + k * Math.PI * 2;
    if (prefersReducedMotion) {
      angleRef.current = targetRef.current;
      setAngleOffset(targetRef.current);
    } else {
      kick();
    }
  }, [prefersReducedMotion, kick]);

  // Which card currently faces the viewer (drives the nav dots)
  let frontIndex = Math.round((FRONT_ANGLE - angleOffset) / SEG) % GATEWAYS.length;
  if (frontIndex < 0) frontIndex += GATEWAYS.length;

  // ── "Looking through glass" parallax for the HUD panel ─────────────────────
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const pX = useSpring(mvX, { stiffness: 55, damping: 18, mass: 0.6 });
  const pY = useSpring(mvY, { stiffness: 55, damping: 18, mass: 0.6 });
  const panelX = useTransform(pX, (v) => v * 12);
  const panelY = useTransform(pY, (v) => v * 9);
  const panelRotateY = useTransform(pX, (v) => v * 2.4);
  const panelRotateX = useTransform(pY, (v) => v * -2);

  const onSectionMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    mvX.set((e.clientX / window.innerWidth) * 2 - 1);
    mvY.set((e.clientY / window.innerHeight) * 2 + -1);
  }, [mvX, mvY, prefersReducedMotion]);

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const showVisor = phase !== 'globe';
  const showReveal = phase === 'reveal';

  return (
    <section
      ref={heroRef}
      onMouseMove={onSectionMouseMove}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Act 1 · Cinematic 3D Globe Background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <GlobeCanvas />
      </div>

      {/* ── Deep radial vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 35%, transparent 0%, rgba(5,11,24,0.45) 50%, rgba(5,11,24,0.92) 80%, #050b18 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(5,11,24,0.7) 50%, #050b18 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Act 2 · HoloLens visor — curved glass over the whole viewport ── */}
      <VisorOverlay active={showVisor} reduced={prefersReducedMotion} mvX={pX} mvY={pY} />

      {/* ── Two quiet corner labels (toned down for a corporate read) ── */}
      {[
        { pos: 'bottom-[4.5rem] left-14', text: 'Spatial · AI · XR' },
        { pos: 'bottom-[4.5rem] right-14', text: 'Kuala Lumpur · 2026' },
      ].map(({ pos, text }) => (
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: showReveal ? 1 : 0 }}
          transition={{ duration: 1 }}
          className={`absolute z-[4] hidden lg:block font-mono text-[0.44rem] tracking-[0.32em] uppercase pointer-events-none ${pos}`}
          style={{ color: 'rgba(107,127,163,0.22)' }}
          aria-hidden="true"
        >
          {text}
        </motion.span>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-8 gap-10">

        <HeroLogo />

        {/* ── HoloLens HUD Interface ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 26, filter: 'blur(10px)' }}
          animate={
            showVisor
              ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.93, y: 26, filter: 'blur(10px)' }
          }
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            x: prefersReducedMotion ? 0 : panelX,
            y: prefersReducedMotion ? 0 : panelY,
            rotateX: prefersReducedMotion ? 0 : panelRotateX,
            rotateY: prefersReducedMotion ? 0 : panelRotateY,
            transformPerspective: 1400,
            boxShadow:
              'inset 0 1px 0 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.02), 0 30px 80px -32px rgba(0,0,0,0.65)',
          }}
          className="relative w-full max-w-6xl mx-auto mt-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-8 lg:px-10 pt-5 pb-7"
        >
          {/* Top inner sheen */}
          <div
            className="absolute inset-x-6 top-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
            aria-hidden="true"
          />

          {/* AR corner framing brackets */}
          {[
            'top-3 left-3 border-t border-l',
            'top-3 right-3 border-t border-r',
            'bottom-3 left-3 border-b border-l',
            'bottom-3 right-3 border-b border-r',
          ].map((corner) => (
            <span
              key={corner}
              className={`absolute w-5 h-5 rounded-sm border-white/25 ${corner}`}
              aria-hidden="true"
            />
          ))}

          {/* HUD top label — single, elegant */}
          <div className="relative z-10 flex items-center justify-center gap-2.5 px-1 pb-4">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span
              className="font-bold uppercase"
              style={{ fontSize: '0.5rem', letterSpacing: '0.42em', color: 'rgba(107,127,163,0.7)' }}
            >
              Choose Your Experience
            </span>
          </div>

          {/* ── Act 3 · 3D Orbit Carousel ── */}
          <div
            className="relative w-full h-[440px] sm:h-[480px] touch-pan-y select-none"
            style={{ perspective: '1200px', cursor: prefersReducedMotion ? 'default' : 'grab' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
          >
            {/* Holographic projector pool — cards "beam" up from here */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showReveal ? 1 : 0 }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[90%] h-[72%]"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 90% at 50% 100%, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0.04) 40%, transparent 72%)',
                  filter: 'blur(3px)',
                }}
              />
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 bottom-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: '#7dd3fc', boxShadow: '0 0 12px 3px rgba(125,211,252,0.7)' }}
              />
            </motion.div>

            {/* AR lens scan — sweeps once as the gateways resolve */}
            {showReveal && !prefersReducedMotion && (
              <motion.div
                initial={{ y: '-12%', opacity: 0 }}
                animate={{ y: ['-12%', '112%'], opacity: [0, 0.55, 0.55, 0] }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], times: [0, 0.1, 0.85, 1] }}
                className="absolute inset-x-0 z-30 h-24 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(125,211,252,0.07) 45%, rgba(125,211,252,0.32) 50%, rgba(125,211,252,0.07) 55%, transparent)',
                  maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                }}
                aria-hidden="true"
              />
            )}

            {showReveal && GATEWAYS.map((g, i) => {
              const angle = angleOffset + i * SEG;
              const radiusX = isMobile ? 124 : 322;
              // Flatter depth → a "coverflow" read where all three stay legible.
              const radiusZ = isMobile ? 90 : 132;

              const x = Math.cos(angle) * radiusX;
              const z = Math.sin(angle) * radiusZ;
              const normalizedZ = (z + radiusZ) / (radiusZ * 2);

              const scale = 0.84 + normalizedZ * 0.16;
              const opacity = 0.58 + normalizedZ * 0.42;
              const zIndex = Math.round(normalizedZ * 100);
              const isFront = normalizedZ > 0.85;
              // Side cards angle inward toward the viewer (coverflow signature).
              const yaw = -(x / radiusX) * 20;

              return (
                <div
                  key={g.title}
                  className="absolute top-1/2 left-1/2 w-full max-w-[300px] lg:max-w-[340px] will-change-transform"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${yaw}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: draggingRef.current ? 'none' : 'opacity 0.3s ease',
                  }}
                >
                  <GatewayCard index={i} {...g} isCenter={isFront} />
                </div>
              );
            })}
          </div>

          {/* HUD bottom — minimal nav dots instead of gamer chrome */}
          <div className="relative z-10 mt-5 flex items-center justify-center gap-3">
            {GATEWAYS.map((g, i) => {
              const isActive = i === frontIndex;
              return (
                <button
                  key={g.title}
                  onClick={() => goToIndex(i)}
                  aria-label={`Focus ${g.title}`}
                  className="group relative h-6 flex items-center"
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? '22px' : '6px',
                      height: '6px',
                      background: isActive ? g.accentColor : 'rgba(255,255,255,0.18)',
                      boxShadow: isActive ? `0 0 12px ${g.accentColor}66` : 'none',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showReveal ? 1 : 0, y: showReveal ? 0 : 10 }}
          transition={{ duration: 0.8 }}
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2.5 cursor-pointer mt-8"
          aria-label="Scroll to About section"
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
              style={{ height: '45%', background: 'linear-gradient(to bottom, transparent, rgba(251,146,60,0.8), transparent)' }}
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

// ── HoloLens visor: curved glass + chromatic rim + one-shot boot reticle ─────
const VisorOverlay = ({
  active,
  reduced,
  mvX,
  mvY,
}: {
  active: boolean;
  reduced: boolean;
  mvX: MotionValue<number>;
  mvY: MotionValue<number>;
}) => {
  // Glass curvature drifts opposite the head movement → depth illusion
  const glassX = useTransform(mvX, (v) => v * -18);
  const glassY = useTransform(mvY, (v) => v * -14);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    >
      {/* Curved-glass vignette — darker, slightly cyan at the lens edges */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: reduced ? 0 : glassX,
          y: reduced ? 0 : glassY,
          background:
            'radial-gradient(120% 120% at 50% 45%, transparent 52%, rgba(56,189,248,0.05) 70%, rgba(5,11,24,0.55) 88%, rgba(5,11,24,0.85) 100%)',
        }}
      />

      {/* Chromatic aberration rim — twin offset edge glows (kept very subtle) */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            'inset 0 0 120px 8px rgba(56,189,248,0.05), inset 2px 0 60px -20px rgba(125,211,252,0.18), inset -2px 0 60px -20px rgba(251,146,60,0.10)',
        }}
      />

      {/* Faint binocular framing arcs — hint of a worn headset, not a game HUD */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'radial-gradient(closest-side at 50% 50%, transparent 78%, rgba(125,211,252,0.05) 86%, transparent 92%)',
        }}
      />

      {/* One-shot focus ring as the visor engages — a single, quiet pulse */}
      {active && !reduced && (
        <motion.div
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: [0, 0.4, 0], scale: [1.3, 1, 0.95] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="46" stroke="rgba(125,211,252,0.22)" strokeWidth="0.75" strokeDasharray="2 8" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HeroSection;
