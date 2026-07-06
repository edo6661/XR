import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { CSSProperties } from 'react';


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

const INTRO_WORDS = ['IMAGINE', 'GENERATE', 'IMMERSE'] as const;
const MOVING_BOY_WORLD_VIDEO = '/hero/XRAS26 - Keyart Moving Landscape.mp4';

const INTRO_DROP_SHADOW =
  '0 4px 28px rgba(0,0,0,0.92), 0 2px 12px rgba(0,0,0,0.78), 0 0 56px rgba(0,0,0,0.55)';

const wordStyle = (index: number): CSSProperties => {
  if (index === 1) {
    return { color: '#fb923c', textShadow: INTRO_DROP_SHADOW };
  }
  return { color: '#f0f4ff', textShadow: INTRO_DROP_SHADOW };
};

const HeroIntroOverlay = ({ step }: HeroIntroOverlayProps) => {
  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          key="intro"
          className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          {step < 3 && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={MOVING_BOY_WORLD_VIDEO}
              style={{ objectPosition: '50% center' }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-hidden="true"
            />
          )}

          {/* Lines */}
          <div className="relative z-10 px-6 text-center">
            <AnimatePresence mode="wait">
              {step < 3 && (
                <motion.h2
                  key={INTRO_WORDS[step]}
                  variants={lineVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="font-heading font-black leading-tight tracking-[0.18em] uppercase"
                  style={{
                    fontSize: 'clamp(1.8rem, 5.5vw, 3.6rem)',
                    ...wordStyle(step),
                  }}
                >
                  {INTRO_WORDS[step]}
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          {/* ZAP flash */}
          {step === 3 && (
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
