import { motion, AnimatePresence, type Variants } from 'framer-motion';

/**
 * HeroIntroOverlay — cold open sesuai cursorrules brief:
 * Step 0: "The Internet was Flat."
 * Step 1: "The Future is Spatial. Powered by AI."
 * Step 2: ⚡ZAP⚡ — flash veil tears away, reveals spatial video
 */

type HeroIntroOverlayProps = {
  step: number;
};

const lineVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 1.1, filter: 'blur(18px)' },
  enter: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    textShadow: [
      '3px 0 rgba(56,189,248,0.9), -3px 0 rgba(251,146,60,0.9)',
      '1px 0 rgba(56,189,248,0.5), -1px 0 rgba(251,146,60,0.5)',
      '0px 0 rgba(0,0,0,0)',
    ],
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0, y: -16, scale: 0.97, filter: 'blur(12px)',
    transition: { duration: 0.24, ease: [0.4, 0, 1, 1] as const },
  },
};

const HeroIntroOverlay = ({ step }: HeroIntroOverlayProps) => {
  const veilVisible = step < 2;

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          key="intro"
          className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          {/* Veil */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: veilVisible ? 1 : 0, scale: veilVisible ? 1 : 1.08 }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.84, 0] }}
            style={{
              background: 'radial-gradient(ellipse 90% 70% at 50% 50%, #0a1730 0%, #050b18 60%, #02060f 100%)',
            }}
            aria-hidden="true"
          />

          {/* Grid */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: veilVisible ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage:
                'linear-gradient(rgba(125,211,252,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.05) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* Lines */}
          <div className="relative z-10 px-6 text-center">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.h2
                  key="line1"
                  variants={lineVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="font-heading font-semibold leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 5vw, 3.4rem)', color: 'rgba(176,193,224,0.92)', letterSpacing: '0.01em' }}
                >
                  The Internet was{' '}
                  <span style={{ color: 'rgba(107,127,163,0.7)' }}>Flat.</span>
                </motion.h2>
              )}

              {step === 1 && (
                <motion.h2
                  key="line2"
                  variants={lineVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="font-heading font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.8rem, 5.6vw, 3.9rem)', color: '#f0f4ff' }}
                >
                  The Future is{' '}
                  <span style={{
                    background: 'linear-gradient(120deg, #7dd3fc 0%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Spatial.
                  </span>
                  <br />
                  <span style={{ fontSize: '0.62em', fontWeight: 500, color: 'rgba(240,244,255,0.82)' }}>
                    Powered by{' '}
                    <span style={{
                      background: 'linear-gradient(120deg, #fb923c 0%, #f97316 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 800,
                    }}>
                      AI
                    </span>
                  </span>
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          {/* ZAP flash */}
          {step === 2 && (
            <>
              <motion.div
                className="absolute inset-0 z-20 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.05, 0, 0.95, 0] }}
                transition={{ duration: 0.62, times: [0, 0.1, 0.26, 0.4, 0.52, 1], ease: 'easeOut' }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute inset-0 z-20 mix-blend-screen"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: [0, 0.8, 0, 0.7, 0], x: [-18, 14, -10, 8, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.6), transparent 60%)' }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute inset-0 z-20 mix-blend-screen"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: [0, 0.7, 0, 0.6, 0], x: [18, -14, 10, -8, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.55), transparent 60%)' }}
                aria-hidden="true"
              />
              {[18, 42, 63, 81].map((top, i) => (
                <motion.div
                  key={top}
                  className="absolute left-[-10%] right-[-10%] z-20 origin-center"
                  style={{
                    top: `${top}%`,
                    height: i % 2 === 0 ? 2 : 1,
                    rotate: i % 2 === 0 ? -8 : 6,
                    background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.9) 35%, #ffffff 50%, rgba(251,146,60,0.9) 65%, transparent)',
                    boxShadow: '0 0 12px rgba(125,211,252,0.7)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.34, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              ))}
              <motion.div
                className="absolute left-0 right-0 z-20 h-[40%]"
                initial={{ top: '-40%', opacity: 0 }}
                animate={{ top: ['-40%', '110%'], opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(125,211,252,0.25) 70%, rgba(255,255,255,0.9) 100%)' }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ border: '2px solid rgba(125,211,252,0.6)' }}
                initial={{ width: 40, height: 40, opacity: 0 }}
                animate={{ width: [40, 1400], height: [40, 1400], opacity: [0.9, 0] }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroIntroOverlay;
