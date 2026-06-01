import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TracerBorderProps {
  children: ReactNode;
  accentColor: string;
}

const TracerBorder = ({ children, accentColor }: TracerBorderProps) => {
  return (
    // 1. Ubah rounded-lg menjadi rounded-xl (12px)
    <div className="relative w-full h-full rounded-xl p-[1px] overflow-hidden group">

      {/* Rotating Background Glow — slowed + softened for an elegant, non-gamer read */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 w-[200%] h-[200%] origin-center -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.22] group-hover:opacity-60 transition-opacity duration-500 will-change-transform optimize-gpu"
        style={{
          background: `conic-gradient(from 0deg, transparent 80%, ${accentColor} 100%)`,
        }}
      />

      {/* Inner Mask (Content Container) */}
      {/* 2. Ubah rounded-[7px] menjadi rounded-[11px] (12px - 1px padding) */}
      <div className="relative z-10 w-full h-full rounded-[11px] overflow-hidden bg-background">
        {children}
      </div>
    </div>
  );
};

export default TracerBorder;