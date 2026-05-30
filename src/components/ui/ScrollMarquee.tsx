import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

// ── Text block ─────────────────────────────────────────────────────────────
const Word = ({ text, outline = false }: { text: string; outline?: boolean }) => (
  <span
    className="font-heading font-black tracking-[0.06em] uppercase flex-shrink-0"
    style={{
      fontSize: 'clamp(2.2rem, 6vw, 5rem)',
      ...(outline
        ? {
          color: 'transparent',
          WebkitTextStroke: '1px rgba(251,146,60,0.22)',
        }
        : {
          color: 'rgba(240,244,255,0.07)',
        }),
    }}
    aria-hidden="true"
  >
    {text}
  </span>
);

// ── Separator diamond ──────────────────────────────────────────────────────
const Diamond = ({ color = 'rgba(251,146,60,0.3)' }: { color?: string }) => (
  <span
    className="flex-shrink-0 mx-8"
    style={{
      width: '5px',
      height: '5px',
      background: color,
      transform: 'rotate(45deg)',
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
    aria-hidden="true"
  />
);

// ── ScrollMarquee ──────────────────────────────────────────────────────────
const ScrollMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 300, damping: 45 });

  // Row 1 moves left, Row 2 moves right — reduced range for subtlety
  const x1 = useTransform(spring, [0, 1], ['0px', '-320px']);
  const x2 = useTransform(spring, [0, 1], ['-320px', '0px']);

  const row1Words = ['Future', 'Immersive', 'Spatial', 'Computing'];
  const row2Words = ['AI', '×', 'XR', 'Innovation'];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
      aria-hidden="true"
    >
      {/* Subtle center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none"
        style={{
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(251,146,60,0.04) 0%, transparent 68%)',
        }}
      />

      <div
        className="flex flex-col gap-4"
        style={{ transform: 'rotate(-1.5deg) scale(1.06)', transformOrigin: 'center' }}
      >
        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex items-center whitespace-nowrap">
          {[...Array(3)].map((_, gi) =>
            row1Words.map((word, wi) => (
              <div key={`r1-${gi}-${wi}`} className="flex items-center">
                <div className="px-6">
                  <Word text={word} outline={wi % 2 === 0} />
                </div>
                <Diamond color={wi % 2 === 0 ? 'rgba(251,146,60,0.25)' : 'rgba(34,211,238,0.2)'} />
              </div>
            ))
          )}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex items-center whitespace-nowrap">
          {[...Array(3)].map((_, gi) =>
            row2Words.map((word, wi) => (
              <div key={`r2-${gi}-${wi}`} className="flex items-center">
                <div className="px-6">
                  <Word text={word} outline={wi % 2 !== 0} />
                </div>
                <Diamond color={wi % 2 !== 0 ? 'rgba(167,139,250,0.22)' : 'rgba(251,146,60,0.2)'} />
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollMarquee;