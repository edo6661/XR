import { motion } from 'framer-motion';
import type { MissionItem } from '../../../core/content/aboutPage';
import { ABOUT_ACCENT } from '../../../core/content/aboutPage';

const MISSION_PILLARS = [
  { label: 'Connect', color: '#ef783d' },
  { label: 'Accelerate', color: '#22d3ee' },
  { label: 'Collaborate', color: '#3953a3' },
] as const;

const OurMissionBlock = ({ content }: { content: MissionItem }) => (
  <div className="relative">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[480px] lg:min-h-[520px]"
      style={{
        border: '1px solid rgba(255,255,255,0.11)',
        boxShadow: '0 28px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
      }}
    >
      {/* Full-bleed astronaut background */}
      <motion.img
        src="/hero/astronaut.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Readability overlays — text sits on top of image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(5,10,28,0.94) 0%, rgba(8,16,38,0.82) 38%, rgba(12,22,48,0.45) 62%, rgba(5,10,22,0.25) 100%), linear-gradient(to top, rgba(5,8,18,0.75) 0%, transparent 42%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 18% 50%, rgba(57,83,163,0.22) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 85% 30%, rgba(34,211,238,0.1) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Top shimmer */}
      <div
        className="absolute top-0 inset-x-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(57,83,163,0.6), rgba(34,211,238,0.5), transparent)' }}
        aria-hidden="true"
      />

      {/* Overlapping text content */}
      <div className="relative z-10 flex min-h-[420px] md:min-h-[480px] lg:min-h-[520px] items-center">
        <div className="w-full max-w-2xl p-8 md:p-10 lg:p-12 flex flex-col">
          {/* Mission pillars row */}
          <div className="flex flex-wrap gap-6 mb-8 md:mb-10">
            {MISSION_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-2.5"
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg backdrop-blur-sm"
                  style={{
                    background: `${pillar.color}20`,
                    border: `1px solid ${pillar.color}40`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: pillar.color, boxShadow: `0 0 10px ${pillar.color}80` }}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="font-heading font-bold tracking-wide"
                  style={{ fontSize: '1rem', color: 'rgba(240,244,255,0.92)' }}
                >
                  {pillar.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Large quote mark */}
          <div
            className="font-heading font-black leading-none select-none mb-4"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              background: 'linear-gradient(135deg, rgba(239,120,61,0.45) 0%, rgba(34,211,238,0.25) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            "
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="font-medium leading-relaxed"
            style={{
              fontSize: 'clamp(1.05rem, 2.8vw, 1.22rem)',
              lineHeight: 1.95,
              color: 'rgba(235,242,255,0.95)',
              textShadow: '0 1px 24px rgba(0,0,0,0.45)',
            }}
          >
            <span className="gradient-text-accent font-bold">
              {content.bodyHighlight}.
            </span>
            {' '}
            {content.bodyRest}
          </motion.p>

          {/* Bottom accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 h-px origin-left max-w-xs"
            style={{ background: `linear-gradient(90deg, ${ABOUT_ACCENT}, rgba(34,211,238,0.6), transparent)` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.div>
  </div>
);

export default OurMissionBlock;
