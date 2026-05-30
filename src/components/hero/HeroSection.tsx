import { useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import HeroLogo from './HeroLogo';
import GatewayCard from './GatewayCard';

// ── Icons ──────────────────────────────────────────────────────────────────
const XRIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 7.5l10.5-6 10.5 6v9l-10.5 6-10.5-6v-9z" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 21V3M2.25 7.5l9.75 5.5 9.75-5.5" />
  </svg>
);

const EsportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17L6.75 19.5a2.121 2.121 0 01-3-3l4.672-4.853" />
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 3c3.5 0 6.5 2.5 7 6l-2.5 1.5-4.5-3-4.5 3L5 9c.5-3.5 3.5-6 7-6z" />
  </svg>
);

const HackathonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

// ── Gateway data ───────────────────────────────────────────────────────────
const GATEWAYS = [
  {
    title: 'XR Esports',
    subtitle: 'Competitive · Immersive',
    description:
      'Where traditional esports collides with spatial computing. Compete, spectate, and experience gaming redefined.',
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
    description:
      'The definitive platform where immersive tech visionaries, enterprise leaders, and XR innovators converge to shape Asia\'s future.',
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
    description:
      'Build the immersive future in 48 hours. AI, XR, spatial media — bring your stack and compete for real prizes.',
    to: '/hackathon',
    accentColor: '#a78bfa',
    glowColor: '#7c3aed',
    tag: 'Build',
    icon: <HackathonIcon />,
    isCenter: false,
  },
];

// ── HeroSection ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >

      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ParticleCanvas />
      </div>

      {/* ── Radial center vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 38%, transparent 0%, rgba(5,11,24,0.5) 60%, rgba(5,11,24,0.97) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom section bleed ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(5,11,24,0.85) 60%, #050b18 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Subtle horizontal scan line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.9, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-[3] pointer-events-none origin-left"
        style={{
          top: '42%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.08) 15%, rgba(251,146,60,0.18) 50%, rgba(251,146,60,0.08) 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Corner coordinate labels ── */}
      {[
        { corner: 'top-20 left-6', text: '03°08′N / 101°41′E', align: 'left' },
        { corner: 'top-20 right-6', text: 'XRAS26 · KUL', align: 'right' },
        { corner: 'bottom-16 left-6', text: 'Spatial · AI · XR', align: 'left' },
        { corner: 'bottom-16 right-6', text: '© 2026 XR Summits', align: 'right' },
      ].map(({ corner, text, align }) => (
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 1 }}
          className={`absolute z-[4] hidden lg:block font-mono text-[0.46rem] tracking-[0.3em] uppercase pointer-events-none ${corner}`}
          style={{ color: 'rgba(107,127,163,0.3)', textAlign: align as 'left' | 'right' }}
          aria-hidden="true"
        >
          {text}
        </motion.span>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-28 pb-10 gap-12">

        {/* Logo / wordmark */}
        <HeroLogo />

        {/* Choose your experience label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.7 }}
          className="text-[0.6rem] font-bold tracking-[0.55em] uppercase text-center"
          style={{ color: 'rgba(107,127,163,0.6)' }}
          aria-hidden="true"
        >
          — Choose Your Experience —
        </motion.p>

        {/* Gateway cards */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-3 items-stretch">
          {GATEWAYS.map((g, i) => (
            <GatewayCard key={g.title} index={i} {...g} />
          ))}
        </div>

        {/* Scroll cue */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 cursor-pointer mt-2"
          aria-label="Scroll to About section"
        >
          <span
            className="text-[0.52rem] tracking-[0.5em] uppercase transition-colors duration-300 group-hover:text-accent"
            style={{ color: 'rgba(107,127,163,0.45)' }}
          >
            Discover
          </span>
          {/* Animated line */}
          <div className="relative w-px h-9 overflow-hidden" style={{ background: 'rgba(107,127,163,0.15)' }}>
            <motion.div
              className="absolute top-0 w-full"
              style={{ height: '40%', background: 'rgba(251,146,60,0.7)' }}
              animate={{ y: ['−100%', '280%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;