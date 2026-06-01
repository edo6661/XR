import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
const HackathonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const GATEWAYS = [
  {
    title: 'XR Esports',
    subtitle: 'Competitive · Immersive',
    description: 'Where traditional esports collides with spatial computing. Compete, spectate, and experience gaming redefined.',
    to: '/xr-esports',
    accentColor: '#22d3ee',
    glowColor: '#06b6d4',
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
    glowColor: '#f97316',
    tag: 'Flagship',
    icon: <XRIcon />,
    isCenter: true,
  },
  {
    title: 'Hackathon',
    subtitle: '48-Hour Build Sprint',
    description: 'Build the immersive future in 48 hours. AI, XR, spatial media — bring your stack and compete for real prizes.',
    to: '/hackathon',
    accentColor: '#a78bfa',
    glowColor: '#7c3aed',
    tag: 'Build',
    icon: <HackathonIcon />,
    isCenter: false,
  },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const [angleOffset, setAngleOffset] = useState(0);

  // Refs untuk mengontrol hover & kecepatan tanpa memicu re-render reaktif dari React
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = useRef(false);
  const speedRef = useRef(1); // 1 = full speed, 0 = stop

  // Engine Animasi Carousel
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // 1. Tentukan target kecepatan (0 jika di-hover, 1 jika dilepas)
      const targetSpeed = isHoveredRef.current ? 0 : 1;

      // 2. Lakukan pengereman/akselerasi mulus (Lerp)
      speedRef.current += (targetSpeed - speedRef.current) * 0.08;

      // 3. Update sudut jika korsel masih memiliki sisa kecepatan
      if (speedRef.current > 0.001) {
        setAngleOffset((prev) => prev + delta * 0.00035 * speedRef.current);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseEnter = () => {
    // Batalkan rencana delay jalan (jika user tiba-tiba hover lagi)
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    isHoveredRef.current = true; // Akan memicu pengereman halus
  };

  const handleMouseLeave = () => {
    // Beri jeda 500ms sebelum mengizinkan kecepatan kembali ke 1
    hoverTimeoutRef.current = setTimeout(() => {
      isHoveredRef.current = false;
    }, 500);
  };

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Cinematic 3D Globe Background ── */}
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

      {/* ── Side vignettes ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,11,24,0.55) 0%, transparent 18%, transparent 82%, rgba(5,11,24,0.55) 100%)',
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

      {/* ── Horizontal scan line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.7, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-[3] pointer-events-none origin-left"
        style={{
          top: '40%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.07) 10%, rgba(251,146,60,0.15) 50%, rgba(251,146,60,0.07) 90%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top-left grid tick marks ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute top-0 left-0 z-[4] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-12 w-px h-16" style={{ background: 'rgba(107,127,163,0.12)' }} />
        <div className="absolute top-20 left-12 h-px w-16" style={{ background: 'rgba(107,127,163,0.12)' }} />
        <div className="absolute top-[79px] left-[47px] w-1 h-1 rounded-full" style={{ background: 'rgba(251,146,60,0.35)' }} />
      </motion.div>

      {/* ── Corner labels ── */}
      {[
        { pos: 'top-[5.5rem] left-14', text: '03°08′N / 101°41′E' },
        { pos: 'top-[5.5rem] right-14', text: 'XRAS26 · KUL' },
        { pos: 'bottom-[4.5rem] left-14', text: 'Spatial · AI · XR' },
        { pos: 'bottom-[4.5rem] right-14', text: '© 2026 XR Summits' },
      ].map(({ pos, text }) => (
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
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
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.95, duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl mx-auto mt-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-8 lg:px-10 pt-5 pb-7"
          style={{
            boxShadow:
              'inset 0 1px 0 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.02), 0 30px 80px -32px rgba(0,0,0,0.65)',
          }}
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

          {/* HUD top status bar */}
          <div className="relative z-10 flex items-center justify-between gap-4 px-1 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span
                className="font-bold uppercase"
                style={{ fontSize: '0.5rem', letterSpacing: '0.4em', color: 'rgba(107,127,163,0.7)' }}
              >
                Choose Your Experience
              </span>
            </div>
            <span
              className="hidden sm:block font-mono uppercase"
              style={{ fontSize: '0.46rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.22)' }}
              aria-hidden="true"
            >
              TRK · 03°08′N 101°41′E · SYS ONLINE
            </span>
          </div>

          {/* ── Penampung 3D Orbit Carousel ── */}
          <div
            className="relative w-full h-[440px] sm:h-[480px] perspective-1000"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {GATEWAYS.map((g, i) => {
              // Kalkulasi posisi elips (Orbit Trigonometri)
              const angle = angleOffset + (i * (Math.PI * 2)) / GATEWAYS.length;

              // Jari-jari elips: responsif agar tidak overlap di mobile
              const radiusX = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 320;
              const radiusZ = 220; // Kedalaman 3D

              const x = Math.cos(angle) * radiusX;
              const z = Math.sin(angle) * radiusZ;

              // Normalisasi Z (-220 sampai 220) menjadi angka 0 sampai 1
              const normalizedZ = (z + radiusZ) / (radiusZ * 2);

              // Logika Ilusi Spasial
              const scale = 0.75 + (normalizedZ * 0.25);
              const opacity = 0.3 + (normalizedZ * 0.7);
              const zIndex = Math.round(normalizedZ * 100);

              // Tandai kartu yang sedang berada di paling depan
              const isFront = normalizedZ > 0.85;

              return (
                <div
                  key={g.title}
                  className="absolute top-1/2 left-1/2 w-full max-w-[300px] lg:max-w-[340px] will-change-transform"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <GatewayCard
                    index={i}
                    {...g}
                    isCenter={isFront}
                  />
                </div>
              );
            })}
          </div>

          {/* HUD bottom status bar */}
          <div className="relative z-10 mt-5 flex items-center justify-between gap-4 px-1">
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.46rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}
              aria-hidden="true"
            >
              // HOLO-INTERFACE · v2.6
            </span>
            <div className="hidden sm:flex items-center gap-[3px]" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="w-px"
                  style={{
                    height: i % 4 === 0 ? '8px' : '4px',
                    background: i % 4 === 0 ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.14)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
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

export default HeroSection;