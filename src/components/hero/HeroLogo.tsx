import { motion, type Variants } from 'framer-motion';

const tagline = "Asia's Premier Immersive Technology Summit";

// Stagger container
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};
const wordItem: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HeroLogo = () => {
  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-4xl mx-auto">

      {/* ── Edition badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="h-px w-8 bg-accent/50" />
        <span
          className="text-[0.58rem] font-bold tracking-[0.55em] uppercase"
          style={{ color: 'rgba(251,146,60,0.75)' }}
        >
          4th Edition · Est. 2021 · Kuala Lumpur
        </span>
        <span className="h-px w-8 bg-accent/50" />
      </motion.div>

      {/* ── Logo mark + wordmark row ── */}
      <div className="flex flex-col items-center gap-2 mb-4">

        {/* Logo mark with halo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, filter: 'blur(12px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-2"
        >
          {/* Double-ring halo */}
          <div
            className="absolute inset-[-20px] rounded-full opacity-20 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(251,146,60,0.6) 0%, transparent 65%)',
              animationDuration: '3s',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-[-6px] rounded-full"
            style={{
              border: '1px solid rgba(251,146,60,0.18)',
              boxShadow: '0 0 24px rgba(251,146,60,0.15)',
            }}
            aria-hidden="true"
          />
          <img
            src="/logo-278x262-removebg.png"
            alt="XR Summits"
            className="relative h-20 w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 18px rgba(251,146,60,0.55))' }}
          />
        </motion.div>

        {/* "XR" — massive display */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.58, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-center leading-none"
            style={{
              fontSize: 'clamp(5.5rem, 16vw, 12rem)',
              letterSpacing: '0.08em',
              background: 'linear-gradient(160deg, #f0f4ff 0%, #fb923c 55%, #f0f4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            XR
          </motion.h1>
        </div>

        {/* "SUMMITS" — secondary weight */}
        <div className="overflow-hidden -mt-3">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.7, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            {/* Left tick */}
            <span className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(255,255,255,0.15)' }} />

            <span
              className="font-heading font-light text-center tracking-[0.55em]"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
                color: 'rgba(240,244,255,0.65)',
                letterSpacing: '0.55em',
              }}
            >
              SUMMITS
            </span>

            {/* Right tick */}
            <span className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(255,255,255,0.15)' }} />
          </motion.div>
        </div>
      </div>

      {/* ── Tagline ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-4 mb-8 max-w-lg"
        aria-label={tagline}
      >
        {tagline.split(' ').map((word, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              variants={wordItem}
              className="inline-block text-sm tracking-[0.12em]"
              style={{ color: 'rgba(107,127,163,0.9)' }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* ── Accent line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-24 h-px origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.7), transparent)',
          boxShadow: '0 0 12px rgba(251,146,60,0.4)',
        }}
        aria-hidden="true"
      />

      {/* ── Corner meta detail — top right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute top-0 right-0 hidden lg:flex flex-col items-end gap-1"
        aria-hidden="true"
      >
        <span className="text-[0.5rem] font-mono tracking-[0.3em] text-foreground-muted/40 uppercase">
          XRAS · 2026
        </span>
        <span className="text-[0.5rem] font-mono tracking-[0.3em] text-foreground-muted/25 uppercase">
          KUL · 03°08′N
        </span>
      </motion.div>
    </div>
  );
};

export default HeroLogo;