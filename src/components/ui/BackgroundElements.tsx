import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Subtle global parallax orbs — intentionally recessive.
 * Should support, not compete with, section content.
 */
const BackgroundElements = () => {
  const { scrollY } = useScroll();
  const [pageH, setPageH] = useState(4000);

  useEffect(() => {
    const update = () =>
      setPageH(document.documentElement.scrollHeight - window.innerHeight || 4000);

    update();
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => { window.removeEventListener('resize', update); ro.disconnect(); };
  }, []);

  const smooth = useSpring(scrollY, { damping: 35, stiffness: 90, mass: 0.6 });
  const end = pageH;

  // Three orbs at different depths (slow / medium / fast)
  const y1 = useTransform(smooth, [0, end], [0, -300]);
  const y2 = useTransform(smooth, [0, end], [0, 250]);
  const y3 = useTransform(smooth, [0, end], [0, -480]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[0] overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb 1 — top right, orange tint */}
      <motion.div
        style={{ y: y1 }}
        className="absolute rounded-full"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        css-debug="orb-1"
      >
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '-8%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,146,60,1) 0%, transparent 68%)',
            opacity: 0.04,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Orb 2 — mid left, cyan tint */}
      <motion.div
        style={{ y: y2 }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '-10%',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,1) 0%, transparent 68%)',
            opacity: 0.035,
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Orb 3 — lower right, purple tint */}
      <motion.div
        style={{ y: y3 }}
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      >
        <div
          style={{
            position: 'absolute',
            top: '72%',
            right: '2%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(126,34,206,1) 0%, rgba(30,58,138,1) 60%, transparent 100%)',
            opacity: 0.045,
            filter: 'blur(70px)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default BackgroundElements;