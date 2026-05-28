import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number; // Seberapa kuat tarikan magnetnya
  className?: string;
}

const MagneticWrapper = ({ children, strength = 0.3, className = "" }: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Dapatkan posisi dan dimensi elemen
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Hitung titik tengah elemen
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Hitung jarak cursor dari titik tengah, kalikan dengan kekuatan (strength)
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    // Kembalikan ke posisi semula saat cursor pergi
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;