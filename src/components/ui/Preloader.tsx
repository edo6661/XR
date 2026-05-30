import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  'Initialising spatial engine',
  'Loading immersive assets',
  'Calibrating XR environment',
  'Ready',
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const totalDuration = 2200;
    const interval = 18;
    const stepSize = 100 / (totalDuration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += stepSize;
      const clamped = Math.min(Math.floor(current), 100);
      setProgress(clamped);

      // Update step label at 25 / 55 / 80 / 100
      if (clamped >= 100) setStepIndex(3);
      else if (clamped >= 80) setStepIndex(2);
      else if (clamped >= 55) setStepIndex(1);
      else if (clamped >= 25) setStepIndex(0);

      if (clamped >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 900);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Animate bar width
  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        duration: 0.15,
        ease: 'none',
      });
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#050b18' }}
          exit={{
            clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Atmospheric glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(251,146,60,0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
            aria-hidden="true"
          />

          {/* Top-left meta */}
          <div
            className="absolute top-8 left-8 flex flex-col gap-1"
            aria-hidden="true"
          >
            <span
              className="font-mono tracking-[0.35em] uppercase"
              style={{ fontSize: '0.48rem', color: 'rgba(107,127,163,0.4)' }}
            >
              XRAS · 2026
            </span>
            <span
              className="font-mono tracking-[0.35em] uppercase"
              style={{ fontSize: '0.48rem', color: 'rgba(107,127,163,0.25)' }}
            >
              KUL · 03°08′N
            </span>
          </div>

          {/* Bottom-right version */}
          <div className="absolute bottom-8 right-8" aria-hidden="true">
            <span
              className="font-mono tracking-[0.35em] uppercase"
              style={{ fontSize: '0.48rem', color: 'rgba(107,127,163,0.3)' }}
            >
              v4.0
            </span>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs px-8">

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="absolute inset-[-12px] rounded-full opacity-30 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(251,146,60,0.5) 0%, transparent 65%)',
                  animationDuration: '2.5s',
                }}
                aria-hidden="true"
              />
              <img
                src="/logo-278x262-removebg.png"
                alt="XR Summits"
                className="relative h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(251,146,60,0.45))' }}
              />
            </motion.div>

            {/* Counter */}
            <div className="flex flex-col items-center gap-1 w-full">
              <div className="flex items-end justify-center gap-1.5">
                <span
                  ref={counterRef}
                  className="font-heading font-black tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(4.5rem, 16vw, 7rem)',
                    background: 'linear-gradient(135deg, #f0f4ff 30%, #fb923c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    minWidth: '3.2ch',
                    textAlign: 'right',
                  }}
                  aria-live="polite"
                  aria-label={`Loading ${progress}%`}
                >
                  {progress}
                </span>
                <span
                  className="font-heading font-bold mb-2"
                  style={{ fontSize: '1.4rem', color: 'rgba(251,146,60,0.7)' }}
                  aria-hidden="true"
                >
                  %
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full flex flex-col gap-3">
              <div
                className="relative w-full h-[1px] overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.07)' }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  ref={barRef}
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #fb923c, #f0f4ff)',
                    boxShadow: '0 0 8px rgba(251,146,60,0.6)',
                  }}
                />
              </div>

              {/* Step label */}
              <div className="h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="font-mono tracking-[0.3em] uppercase text-center"
                    style={{ fontSize: '0.5rem', color: 'rgba(107,127,163,0.55)' }}
                    aria-hidden="true"
                  >
                    {LOADING_STEPS[stepIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;