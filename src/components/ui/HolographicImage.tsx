import { useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicImageProps {
  src: string;
  alt: string;
  className?: string;
}

const HolographicImage = ({ src, alt, className = '' }: HolographicImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-surface ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Base Image (Hitam Putih secara default, berwarna saat di-hover) */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover relative z-10 transition-all duration-700
          ${isHovered ? 'grayscale-0 scale-105' : 'grayscale scale-100'}`}
      />

      {/* 2. Channel Cyan (Bergeser ke kiri) */}
      <motion.div
        className="absolute inset-0 z-20 mix-blend-screen pointer-events-none"
        animate={{
          x: isHovered ? -6 : 0,
          opacity: isHovered ? 0.7 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(1.2) sepia(1) hue-rotate(140deg) saturate(3)' }} />
      </motion.div>

      {/* 3. Channel Red (Bergeser ke kanan) */}
      <motion.div
        className="absolute inset-0 z-20 mix-blend-screen pointer-events-none"
        animate={{
          x: isHovered ? 6 : 0,
          opacity: isHovered ? 0.7 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(1.2) sepia(1) hue-rotate(-50deg) saturate(3)' }} />
      </motion.div>

      {/* 4. Scanline Digital Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}
      />
    </div>
  );
};

export default HolographicImage;