import { motion, type Variants } from 'framer-motion';

const tagline = "Asia's Premier Immersive Technology Summit";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.5 },
  },
};
const wordItem: Variants = {
  hidden: { y: '120%', opacity: 0, rotateX: -25 },
  show: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HeroLogo = () => {
  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-5xl mx-auto">

      {/* ── Edition badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 mb-10"
      >
        {/* Left decorative line with dot */}
        <div className="flex items-center gap-1.5">
          <span className="h-px w-10" style={{ background: 'rgba(251,146,60,0.3)' }} />
          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(251,146,60,0.5)' }} />
        </div>

        <span
          className="font-bold tracking-[0.6em] uppercase"
          style={{ fontSize: '0.54rem', color: 'rgba(251,146,60,0.65)', letterSpacing: '0.58em' }}
        >
          4th Edition · Est. 2021 · Kuala Lumpur
        </span>

        {/* Right decorative line with dot */}
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(251,146,60,0.5)' }} />
          <span className="h-px w-10" style={{ background: 'rgba(251,146,60,0.3)' }} />
        </div>
      </motion.div>

      {/* ── Main logo block ── */}
      <div className="relative flex flex-col items-center gap-0 mb-3 w-full">

        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: 'blur(16px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5"
        >
          {/* Outer halo ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-8 rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 70%, rgba(251,146,60,0.12) 100%)',
            }}
            aria-hidden="true"
          />
          {/* Soft pulse */}
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0.06, 0.18] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-5 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.55) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* Inner ring */}
          <div
            className="absolute -inset-3 rounded-full pointer-events-none"
            style={{ border: '1px solid rgba(251,146,60,0.12)', boxShadow: '0 0 32px rgba(251,146,60,0.1)' }}
            aria-hidden="true"
          />
          <img
            src="/logo-278x262-removebg.png"
            alt="XR Summits"
            className="relative h-[5.5rem] w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 22px rgba(251,146,60,0.5)) drop-shadow(0 0 60px rgba(251,146,60,0.15))' }}
          />
        </motion.div>

        {/* "XR" — hero display */}
        <div className="overflow-hidden -mb-2">
          <motion.div
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 0.52, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-heading font-black text-center leading-none"
              style={{
                fontSize: 'clamp(6rem, 18vw, 13.5rem)',
                letterSpacing: '-0.01em',
                background: 'linear-gradient(175deg, #ffffff 0%, #f0f4ff 25%, #fb923c 62%, rgba(251,146,60,0.4) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.88,
              }}
            >
              XR
            </h1>
          </motion.div>
        </div>

        {/* "SUMMITS" — secondary, spaced */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: 0.68, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 relative"
          >
            {/* Left rule */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-px flex-shrink-0 origin-right"
              style={{ width: 'clamp(28px, 4vw, 52px)', background: 'rgba(255,255,255,0.12)' }}
            />

            <span
              className="font-heading font-extralight text-center tracking-[0.6em]"
              style={{
                fontSize: 'clamp(0.78rem, 2vw, 1.35rem)',
                color: 'rgba(240,244,255,0.55)',
                letterSpacing: '0.6em',
              }}
            >
              SUMMITS
            </span>

            {/* Right rule */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-px flex-shrink-0 origin-left"
              style={{ width: 'clamp(28px, 4vw, 52px)', background: 'rgba(255,255,255,0.12)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Accent divider ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-20 h-px origin-center mt-6 mb-7"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.75), transparent)',
          boxShadow: '0 0 14px rgba(251,146,60,0.45)',
        }}
        aria-hidden="true"
      />

      {/* ── Tagline — staggered word reveal ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-x-[0.45em] gap-y-1 max-w-md"
        aria-label={tagline}
        style={{ perspective: '600px' }}
      >
        {tagline.split(' ').map((word, i) => (
          <div key={i} className="overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            <motion.span
              variants={wordItem}
              className="inline-block tracking-[0.1em]"
              style={{
                fontSize: 'clamp(0.68rem, 1.4vw, 0.82rem)',
                color: 'rgba(107,127,163,0.85)',
                fontWeight: 400,
              }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* ── XRAS26 corner label — top right ── */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute top-0 right-0 hidden xl:flex flex-col items-end gap-1.5"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.46rem] tracking-[0.38em] uppercase" style={{ color: 'rgba(107,127,163,0.3)' }}>
          XRAS · 2026
        </span>
        <span className="font-mono text-[0.44rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(107,127,163,0.18)' }}>
          03°08′N · 101°41′E
        </span>
      </motion.div>
    </div>
  );
};

export default HeroLogo;