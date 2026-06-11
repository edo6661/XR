import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_ACCENT, OUR_MISSION } from '../../../core/content/aboutPage';

const MISSION_PILLARS = [
  { label: 'Connect', color: '#ef783d' },
  { label: 'Accelerate', color: '#22d3ee' },
  { label: 'Collaborate', color: '#3953a3' },
] as const;

const OurMissionBlock = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative max-w-5xl">
      {/* Ambient background */}
      <div className="absolute -inset-x-6 -top-10 -bottom-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(57,83,163,0.14) 0%, transparent 70%)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.11)',
          background: 'linear-gradient(160deg, rgba(30,50,90,0.78) 0%, rgba(22,38,68,0.82) 50%, rgba(18,32,58,0.88) 100%)',
          boxShadow: '0 28px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Earth + hologram layers */}
        <img
          src="/hero/earth-dark.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.22] pointer-events-none"
        />
        <img
          src="/hero/background-7.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.1] pointer-events-none mix-blend-soft-light"
        />

        {/* Cyan-blue wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 75% 30%, rgba(34,211,238,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 70% at 15% 70%, rgba(57,83,163,0.18) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Decorative orbital rings */}
        <svg
          className="absolute right-[-8%] top-[-10%] w-[55%] h-[120%] pointer-events-none opacity-[0.18]"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="200" cy="200" r="160" stroke="rgba(34,211,238,0.5)" strokeWidth="0.75" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="120" stroke="rgba(239,120,61,0.4)" strokeWidth="0.5" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="80" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        </svg>

        {/* Floating astronaut accent */}
        <motion.img
          src="/hero/astronaut.png"
          alt=""
          aria-hidden="true"
          className="absolute right-4 md:right-10 bottom-4 md:bottom-8 w-24 md:w-32 lg:w-36 pointer-events-none mix-blend-screen"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.35, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          animate={reduce ? { opacity: 0.35 } : { opacity: 0.35, y: [0, -8, 0] }}
          {...(reduce ? {} : { transition: { y: { repeat: Infinity, duration: 5, ease: 'easeInOut' } } })}
        />

        {/* Top shimmer */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(57,83,163,0.6), rgba(34,211,238,0.5), transparent)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-14">
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
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    background: `${pillar.color}14`,
                    border: `1px solid ${pillar.color}30`,
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
                  style={{ fontSize: '0.78rem', color: 'rgba(240,244,255,0.85)' }}
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
              background: 'linear-gradient(135deg, rgba(239,120,61,0.35) 0%, rgba(34,211,238,0.2) 100%)',
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
            className="font-medium leading-relaxed max-w-3xl"
            style={{
              fontSize: 'clamp(1.05rem, 2.8vw, 1.22rem)',
              lineHeight: 1.95,
              color: 'rgba(235,242,255,0.92)',
            }}
          >
            <span className="gradient-text-accent font-bold">
              {OUR_MISSION.body.split('. By ')[0]}.
            </span>
            {' '}
            By {OUR_MISSION.body.split('. By ')[1]}
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
      </motion.div>
    </div>
  );
};

export default OurMissionBlock;
