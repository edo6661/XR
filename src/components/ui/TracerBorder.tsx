import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TracerBorderProps {
  children: ReactNode;
  accentColor: string;
}

const TracerBorder = ({ children, accentColor }: TracerBorderProps) => {
  return (
    <div className="relative w-full h-full rounded-lg p-[1px] overflow-hidden group">
      {/* Rotating Background Glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 w-[200%] h-[200%] origin-center -translate-x-1/2 -translate-y-1/2 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, transparent 70%, ${accentColor} 100%)`,
        }}
      />

      {/* Inner Mask (Content Container) */}
      <div className="relative z-10 w-full h-full rounded-[7px] overflow-hidden bg-background">
        {children}
      </div>
    </div>
  );
};

export default TracerBorder;