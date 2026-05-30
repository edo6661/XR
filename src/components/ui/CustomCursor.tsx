// src/components/ui/CustomCursor.tsx
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfigOuter = { stiffness: 600, damping: 30, mass: 0.5 };
  const outerX = useSpring(cursorX, springConfigOuter);
  const outerY = useSpring(cursorY, springConfigOuter);

  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouchDevice) return;

    // Pisahkan logic update dari event listener
    const updateCursor = () => {
      cursorX.set(mousePos.current.x);
      cursorY.set(mousePos.current.y);
      requestRef.current = requestAnimationFrame(updateCursor);
    };
    requestRef.current = requestAnimationFrame(updateCursor);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Gunakan tagName atau class khusus untuk deteksi yang lebih ringan daripada closest()
      const isInteractable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a, button');

      setIsHovering(!!isInteractable);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform'
        }}
        animate={{ opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform'
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