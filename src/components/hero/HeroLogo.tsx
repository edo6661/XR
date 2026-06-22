import { motion, type Variants } from 'framer-motion';

const logoFloatVariants: Variants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 6.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

const HeroLogo = ({ showText = true }: { showText?: boolean }) => {
  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-5xl mx-auto">
      <div className="relative flex flex-col items-center gap-0 mb-3 w-full">
        <motion.div
          initial={{ scale: 0.88, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center items-center w-full"
        >
          <div
            className="relative flex justify-center items-center w-full"
            style={{ padding: '0 clamp(1rem, 8vw, 5rem)' }}
          >
            <motion.h1
              className="font-brand font-black text-center leading-[0.92] uppercase"
              style={{
                fontSize: 'clamp(2rem, 8.5vw, 4.75rem)',
                letterSpacing: '0.04em',
                color: '#fb923c',
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.28)',
                paintOrder: 'stroke fill',
                filter: 'drop-shadow(0 0 24px rgba(251,146,60,0.35)) drop-shadow(0 2px 32px rgba(251,146,60,0.18))',
              }}
              variants={logoFloatVariants}
              initial="animate"
              animate="animate"
            >
              XR ASIA SUMMIT &apos;26
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {showText && (
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-28 h-px origin-center mt-5 mb-4"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(125,211,252,0.45), rgba(251,146,60,0.5), transparent)',
              boxShadow: '0 0 10px rgba(125,211,252,0.2)',
            }}
            aria-hidden="true"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center leading-relaxed px-4"
            style={{
              fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)',
              color: 'rgba(107,127,163,0.7)',
              lineHeight: 1.75,
              letterSpacing: '0.04em',
            }}
          >
            The future will not be viewed. It will be experienced.
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default HeroLogo;
