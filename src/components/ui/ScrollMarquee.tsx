import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const ScrollMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Deteksi scroll hanya saat elemen ini ada di layar untuk performa yang lebih baik
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring physics agar pergerakan scroll tidak patah-patah
  const springScroll = useSpring(scrollYProgress, { stiffness: 400, damping: 50 });

  // Baris pertama bergerak ke kiri
  const x1 = useTransform(springScroll, [0, 1], [0, -800]);
  // Baris kedua bergerak ke kanan
  const x2 = useTransform(springScroll, [0, 1], [-800, 0]);

  const TextBlock = ({ text, outline = false }: { text: string, outline?: boolean }) => (
    <span
      className={`font-heading font-black text-6xl md:text-8xl tracking-wider uppercase px-4
        ${outline
          ? 'text-transparent'
          : 'text-surface-2'}`}
      style={outline ? { WebkitTextStroke: '2px rgba(251,146,60,0.3)' } : {}}
    >
      {text}
    </span>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden bg-background border-y border-white/5 z-10"
    >
      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-accent/5 blur-[80px] pointer-events-none" />

      <div className="flex flex-col gap-2 md:gap-6 transform -rotate-2 scale-105">

        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <div key={`row1-${i}`} className="flex items-center">
              <TextBlock text="Future" outline={i % 2 !== 0} />
              <span className="w-4 h-4 rounded-full bg-accent mx-6" />
              <TextBlock text="Immersive" outline={i % 2 === 0} />
              <span className="w-4 h-4 rounded-full bg-cyan-400 mx-6" />
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <div key={`row2-${i}`} className="flex items-center">
              <TextBlock text="Spatial Computing" outline={i % 2 === 0} />
              <span className="w-4 h-4 rounded-full bg-cyan-400 mx-6" />
              <TextBlock text="AI x XR" outline={i % 2 !== 0} />
              <span className="w-4 h-4 rounded-full bg-accent mx-6" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ScrollMarquee;