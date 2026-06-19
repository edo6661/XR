import { motion } from 'framer-motion';
import {
  HACKATHON_ACCENT,
  HACKATHON_HERO,
  HACKATHON_META,
} from '../../core/content/aiFilmmakingHackathon';

const HACKATHON_HERO_IMAGE = '/programme-highlights/AI Filmmaking Hackathon.png';

const neoShadow = `
  10px 10px 28px rgba(180,190,208,0.58),
  -7px -7px 20px rgba(255,255,255,1),
  inset 0 1px 0 rgba(255,255,255,0.9)
`;

type HackathonHeroProps = {
  onRegister: () => void;
};

const HackathonHero = ({ onRegister }: HackathonHeroProps) => (
  <section
    className="relative w-full overflow-hidden pt-28 pb-16 md:pb-24 px-6 min-h-[min(88vh,920px)] flex items-center"
    aria-labelledby="hackathon-hero-heading"
  >
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img
        src={HACKATHON_HERO_IMAGE}
        alt=""
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center 35%' }}
        loading="eager"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(175deg, rgba(5,11,24,0.2) 0%, rgba(5,11,24,0.35) 45%, rgba(5,11,24,0.55) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,146,60,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(56,189,248,0.06) 0%, transparent 50%)',
        }}
      />
    </div>

    <div className="relative z-10 w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl px-6 py-10 md:px-10 md:py-12 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(252,253,255,0.92), rgba(236,242,252,0.86))',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: neoShadow,
          border: '1px solid rgba(255,255,255,0.88)',
        }}
      >
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 8%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, transparent 92%)',
          }}
          aria-hidden="true"
        />

        <div
          className="absolute top-8 bottom-8 left-0 w-[3px] rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${HACKATHON_ACCENT}ee, ${HACKATHON_ACCENT}30)`,
            boxShadow: `3px 0 14px ${HACKATHON_ACCENT}30`,
            borderRadius: '0 3px 3px 0',
          }}
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold tracking-[0.22em] uppercase mb-4"
          style={{ fontSize: '0.68rem', color: 'rgba(22,36,62,0.55)' }}
        >
          {HACKATHON_HERO.eyebrow}
        </motion.p>

        <motion.h1
          id="hackathon-hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-brand font-black leading-[0.95] mb-5"
          style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)', color: '#0f1b30' }}
        >
          {HACKATHON_HERO.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-6"
          style={{ fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)', color: '#1a2840', lineHeight: 1.75 }}
        >
          {HACKATHON_HERO.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8 text-[0.68rem] font-semibold tracking-[0.18em] uppercase"
          style={{ color: 'rgba(22,36,62,0.55)' }}
        >
          <span>{HACKATHON_META.dates}</span>
          <span aria-hidden="true">·</span>
          <span>{HACKATHON_META.location}</span>
          <span aria-hidden="true">·</span>
          <span style={{ color: HACKATHON_ACCENT }}>RM 25K Prize Pool</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={onRegister}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18] transition-shadow hover:shadow-[0_0_32px_rgba(251,146,60,0.35)]"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              border: '1px solid rgba(251,146,60,0.5)',
            }}
          >
            Register Your Team
          </button>
          <a
            href={`tel:${HACKATHON_META.contactPhone.replace(/-/g, '')}`}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-center transition-all duration-300"
            style={{
              color: HACKATHON_ACCENT,
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: `1px solid ${HACKATHON_ACCENT}55`,
              boxShadow: '0 2px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            Contact: {HACKATHON_META.contactPhone}
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HackathonHero;
