import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulasi loading progress (bisa dihubungkan dengan asset loading di masa depan)
    const duration = 2400; // 2.4 detik
    const interval = 24;
    let current = 0;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Beri sedikit jeda setelah 100% sebelum trigger onComplete
        setTimeout(onComplete, 400);
      } else {
        setProgress(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Brand/Logo Element */}
        <div className="overflow-hidden mb-6">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="block font-heading text-sm font-bold tracking-[0.4em] text-accent uppercase"
          >
            XR Summits
          </motion.span>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-1 overflow-hidden">
          <span className="font-heading font-black text-7xl md:text-8xl text-foreground w-48 text-right">
            {progress}
          </span>
          <span className="font-heading font-bold text-2xl text-accent">%</span>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-[1px] bg-border mt-8 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-[0.55rem] font-mono tracking-widest text-foreground-muted uppercase"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;