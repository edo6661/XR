// src/components/ui/MagneticWrapper.tsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticWrapper = ({ children, strength = 0.3, className = "" }: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Cache dimensi untuk menghindari Layout Thrashing
  const bounds = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Ambil dimensi HANYA saat mouse mulai masuk
  const handleMouseEnter = () => {
    if (ref.current) {
      bounds.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bounds.current) return;

    const { left, top, width, height } = bounds.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    bounds.current = null; // Reset cache
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;