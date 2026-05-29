import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticWrapper = ({ children, strength = 0.3, className = "" }: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Gunakan useMotionValue, bukan useState
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Wrap dengan useSpring
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // 3. Mutasi value langsung ke DOM
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // 4. Masukkan value spring langsung ke properti style
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;