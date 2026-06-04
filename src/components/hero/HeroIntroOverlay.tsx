import { motion, AnimatePresence, type Variants } from 'framer-motion';

/**
 * HeroIntroOverlay — the "zap zap" kinetic-typography cold open.
 *
 * Tamil's beat sheet:
 *   1. "The Internet was flat."
 *   2. "The future is spatial. Powered by AI"
 *   3. ⚡ZAP⚡ — a fast double light-flash that tears the veil away and reveals
 *      the spatial video underneath, cueing the logo + tile finale.
 *
 * It sits above everything (z-40) while the cold open plays, then unmounts so
 * the interactive hero is fully clickable. Pure framer-motion, snappy easings,
 * short durations → energetic but still corporate (no gamer noise).
 */

type HeroIntroOverlayProps = {
  /** 0 = line 1, 1 = line 2, 2 = zap/flash. >=3 → overlay is gone. */
  step: number;
};

const lineVariants: Variants = {
  initial: { opacity: 0, y: 22, scale: 1.08, filter: 'blur(16px)' },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.98,
    filter: 'blur(12px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
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
          {/* Opaque veil that hides the video until the zap. It snaps away on
              the flash with a quick scale-punch. */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: veilVisible ? 1 : 0,
              scale: veilVisible ? 1 : 1.08,
            }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.84, 0] }}
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 50%, #0a1730 0%, #050b18 60%, #02060f 100%)',
            }}
            aria-hidden="true"
          />

          {/* Faint moving grid for depth behind the words */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: veilVisible ? 0.5 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage:
                'linear-gradient(rgba(125,211,252,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.05) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 80%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* ── The lines ── */}
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
                  style={{
                    fontSize: 'clamp(1.6rem, 5vw, 3.4rem)',
                    color: 'rgba(176,193,224,0.92)',
                    letterSpacing: '0.01em',
                  }}
                >
                  The Internet was <span style={{ color: 'rgba(107,127,163,0.7)' }}>flat.</span>
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
                  The future is{' '}
                  <span
                    style={{
                      background: 'linear-gradient(120deg, #7dd3fc 0%, #38bdf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    spatial.
                  </span>
                  <br />
                  <span style={{ fontSize: '0.62em', fontWeight: 500, color: 'rgba(240,244,255,0.82)' }}>
                    Powered by{' '}
                    <span
                      style={{
                        background: 'linear-gradient(120deg, #fb923c 0%, #f97316 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: 800,
                      }}
                    >
                      AI
                    </span>
                  </span>
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          {/* ── ZAP: a fast double light-flash ── */}
          {step === 2 && (
            <>
              <motion.div
                className="absolute inset-0 z-20 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0.15, 0.85, 0] }}
                transition={{ duration: 0.5, times: [0, 0.15, 0.45, 0.6, 1], ease: 'easeOut' }}
                aria-hidden="true"
              />
              {/* horizontal scan streak */}
              <motion.div
                className="absolute left-0 right-0 z-20 h-[40%]"
                initial={{ top: '-40%', opacity: 0 }}
                animate={{ top: ['-40%', '110%'], opacity: [0, 1, 0] }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(125,211,252,0.25) 70%, rgba(255,255,255,0.9) 100%)',
                }}
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
