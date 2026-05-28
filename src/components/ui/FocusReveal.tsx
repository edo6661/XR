import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FocusRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FocusReveal = ({ children, className = '', delay = 0 }: FocusRevealProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        filter: 'blur(10px)',
        clipPath: 'inset(15% 15% 15% 15% round 16px)'
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        clipPath: 'inset(0% 0% 0% 0% round 16px)'
      }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{
        delay,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier untuk pergerakan premium
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FocusReveal;