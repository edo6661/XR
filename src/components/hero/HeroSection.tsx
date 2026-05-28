import { useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import HeroLogo from './HeroLogo';
import GatewayCard from './GatewayCard';

// ── SVG Icons ──────────────────────────────────────────────────────────────
const XRIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 7.5l10.5-6 10.5 6v9l-10.5 6-10.5-6v-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3M2.25 7.5l9.75 5.5 9.75-5.5" />
  </svg>
);

const EsportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17L6.75 19.5a2.121 2.121 0 01-3-3l4.672-4.853" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 3c3.5 0 6.5 2.5 7 6l-2.5 1.5-4.5-3-4.5 3L5 9c.5-3.5 3.5-6 7-6z" />
  </svg>
);

const HackathonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

// ── Gateway data ───────────────────────────────────────────────────────────
const GATEWAYS = [
  {
    title: 'XR Asia Summit',
    subtitle: '4th Edition · 2026',
    description:
      'The definitive platform where immersive tech visionaries, enterprise leaders, and XR innovators converge to shape the future.',
    to: '/xr-summit',
    accentColor: '#fb923c',
    glowColor: '#f97316',
    tag: 'Flagship Event',
    icon: <XRIcon />,
  },
  {
    title: 'XR Esports',
    subtitle: 'Competitive · Immersive',
    description:
      'Where traditional esports collides with spatial computing. Compete, spectate, and experience gaming in a new dimension.',
    to: '/xr-esports',
    accentColor: '#22d3ee',
    glowColor: '#06b6d4',
    tag: 'Arena',
    icon: <EsportsIcon />,
    isCenter: true,
  },
  {
    title: 'Hackathon',
    subtitle: '48-Hour Build Sprint',
    description:
      'Build the immersive future in 48 hours. AI, XR, spatial media — bring your stack and compete for real prizes.',
    to: '/hackathon',
    accentColor: '#a78bfa',
    glowColor: '#7c3aed',
    tag: 'Build & Compete',
    icon: <HackathonIcon />,
  },
];

// ── HeroSection ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    const next = document.getElementById('about');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">

      {/* ── 3D Particle Background ── */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(5,11,24,0.55) 65%, rgba(5,11,24,0.95) 100%)',
        }}
      />

      {/* ── Bottom fog / section transition ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(5,11,24,0.9) 70%, #050b18 100%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-16 gap-14">

        {/* Logo */}
        <HeroLogo />

        {/* Gateway label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[0.65rem] font-bold tracking-[0.5em] uppercase text-foreground-muted">
            Choose Your Experience
          </p>
        </motion.div>

        {/* Gateway cards */}
        <div
          ref={scrollRef}
          className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-stretch"
        >
          {GATEWAYS.map((g, i) => (
            <GatewayCard key={g.title} index={i} {...g} />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 group cursor-pointer mt-2"
          aria-label="Scroll down"
        >
          <span className="text-[0.55rem] tracking-[0.4em] uppercase text-foreground-muted group-hover:text-accent transition-colors duration-300">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-foreground-muted/40 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 h-4 bg-accent/60"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.button>
      </div>

      {/* ── Horizontal scan line (decorative) ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-0 right-0 h-px z-[3] pointer-events-none origin-left"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.12) 20%, rgba(251,146,60,0.25) 50%, rgba(251,146,60,0.12) 80%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;