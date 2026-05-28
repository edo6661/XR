import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // Menggunakan useSpring agar animasinya lebih smooth dan tidak kaku
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9999]"
      style={{
        scaleX,
        boxShadow: '0 0 12px rgba(251,146,60,0.8)'
      }}
    />
  );
};

export default ScrollProgress;