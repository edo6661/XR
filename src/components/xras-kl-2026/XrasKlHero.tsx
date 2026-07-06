import { motion } from 'framer-motion';
import { XRAS_KL_ACCENT, XRAS_KL_META } from '../../core/content/xrasKl2026';

const HERO_KEYART = '/hero/new_hero_from_louis_2.png';

const neoShadow = `
  10px 10px 28px rgba(180,190,208,0.58),
  -7px -7px 20px rgba(255,255,255,1),
  inset 0 1px 0 rgba(255,255,255,0.9)
`;

type XrasKlHeroProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const XrasKlHero = ({ onDownloadBrochure, onRegister }: XrasKlHeroProps) => (
  <section
    className="relative w-full overflow-hidden pt-28 pb-16 md:pb-24 px-6 min-h-[min(88vh,920px)] flex items-center"
    aria-labelledby="xras-hero-heading"
  >
    <div className="absolute inset-0 pointer-events-none bg-[#050b18]" aria-hidden="true">
      <img
        src={HERO_KEYART}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '50% center' }}
        loading="eager"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 82% 68% at 50% 42%, transparent 0%, rgba(5,11,24,0.28) 52%, rgba(5,11,24,0.72) 82%, rgba(5,11,24,0.92) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(5,11,24,0.55) 70%, #050b18 100%)',
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
        {/* Top shine — PastEventCard / EventsSection glass pattern */}
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 8%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, transparent 92%)',
          }}
          aria-hidden="true"
        />

        {/* Accent bar */}
        <div
          className="absolute top-8 bottom-8 left-0 w-[3px] rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${XRAS_KL_ACCENT}ee, ${XRAS_KL_ACCENT}30)`,
            boxShadow: `3px 0 14px ${XRAS_KL_ACCENT}30`,
            borderRadius: '0 3px 3px 0',
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >

          <span className="hero-edition">
            {XRAS_KL_META.edition}
          </span>
        </motion.div>

        <motion.h1
          id="xras-hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-brand font-black leading-[0.95] mb-5"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.25rem)', color: '#0f1b30' }}
        >
          XR ASIA SUMMIT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold tracking-[0.12em] mb-4"
          style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: '#1a2840', lineHeight: 1.6 }}
        >
          3 Days. 6 Experiences.{' '}
          <span className="text-accent">One Ecosystem.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold tracking-[0.22em] uppercase mb-8"
          style={{ fontSize: '1rem', color: 'rgba(22,36,62,0.55)' }}
        >
          {XRAS_KL_META.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={onDownloadBrochure}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[1rem] transition-all duration-300"
            style={{
              color: XRAS_KL_ACCENT,
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: `1px solid ${XRAS_KL_ACCENT}55`,
              boxShadow: '0 2px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            Download Brochure
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[1rem] text-[#050b18] transition-shadow hover:shadow-[0_0_32px_rgba(251,146,60,0.35)]"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              border: '1px solid rgba(251,146,60,0.5)',
            }}
          >
            Register / Enquiry
          </button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default XrasKlHero;
