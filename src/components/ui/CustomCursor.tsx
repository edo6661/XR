import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  // Titik inti (Core) melacak 1:1 TANPA delay
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring menggunakan spring untuk efek "trailing" yang smooth
  const springConfigOuter = { stiffness: 600, damping: 30, mass: 0.5 };
  const outerX = useSpring(cursorX, springConfigOuter);
  const outerY = useSpring(cursorY, springConfigOuter);

  useEffect(() => {
    if (isTouchDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Seleksi elemen interaktif yang lebih akurat
      const isInteractable = target.closest('a, button, [role="button"], input, select, textarea');
      setIsHovering(!!isInteractable);
    };

    // Tambahkan { passive: true } agar event listener tidak memblokir UI thread
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Core Dot - 1:1 Instant Tracking Tanpa Spring */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform' // Paksa GPU Acceleration
        }}
        animate={{ opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer Ring - Smooth Trailing */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform' // Paksa GPU Acceleration
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(251, 146, 60, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(251, 146, 60, 0.8)' : 'rgba(251, 146, 60, 0.4)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;