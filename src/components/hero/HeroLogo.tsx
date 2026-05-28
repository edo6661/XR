import { motion } from 'framer-motion';

const logoLines = ['XR', 'SUMMITS'];
const tagline = 'Asia\'s Premier Immersive Technology Event';

const HeroLogo = () => {
  return (
    <div className="flex flex-col items-center gap-4 select-none">

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <span className="w-8 h-px bg-accent/60" />
        <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-accent/80">
          Est. 2021 · Kuala Lumpur
        </span>
        <span className="w-8 h-px bg-accent/60" />
      </motion.div>

      {/* Logo image + wordmark */}
      <div className="flex flex-col items-center gap-3">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.35) 0%, transparent 70%)' }}
          />
          <img
            src="/logo-278x262-removebg.png"
            alt="XR Summits Logo"
            className="relative h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(251,146,60,0.5)]"
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
        </motion.div>

        {/* Wordmark */}
        <div className="overflow-hidden flex flex-col items-center">
          {logoLines.map((word, wi) => (
            <motion.h1
              key={word}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                delay: 0.7 + wi * 0.12,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-heading font-black leading-[0.9] text-center"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                letterSpacing: '0.15em',
                background: wi === 0
                  ? 'linear-gradient(135deg, #f0f4ff 30%, #fb923c 100%)'
                  : 'linear-gradient(135deg, #93c5fd 0%, #f0f4ff 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
              }}
            >
              {word}
            </motion.h1>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.8, ease: 'easeOut' }}
        className="text-foreground-muted text-center text-sm tracking-[0.15em] uppercase max-w-sm"
      >
        {tagline}
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-32 h-px origin-center"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.6), transparent)' }}
      />
    </div>
  );
};

export default HeroLogo;