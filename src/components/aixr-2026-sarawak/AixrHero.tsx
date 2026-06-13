import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AIXR_SARAWAK_ACCENT,
  AIXR_SARAWAK_META,
  AIXR_SARAWAK_POSITIONING,
} from '../../core/content/aixr2026Sarawak';

const AIXR_HERO_IMAGE = '/3-gateway-images/AI-XR Cultural Forum_Main Image.jpeg';

const neoShadow = `
  10px 10px 28px rgba(180,190,208,0.58),
  -7px -7px 20px rgba(255,255,255,1),
  inset 0 1px 0 rgba(255,255,255,0.9)
`;

type AixrHeroProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const AixrHero = ({ onDownloadBrochure, onRegister }: AixrHeroProps) => (
  <section
    className="relative w-full overflow-hidden pt-28 pb-16 md:pb-24 px-6 min-h-[min(88vh,920px)] flex items-center"
    aria-labelledby="aixr-hero-heading"
  >
    {/* Background image */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img
        src={AIXR_HERO_IMAGE}
        alt=""
        className="w-full h-full object-cover"
        style={{ objectPosition: 'left center' }}
        loading="eager"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(175deg, rgba(5,11,24,0.15) 0%, rgba(5,11,24,0.28) 45%, rgba(5,11,24,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.1) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(251,146,60,0.06) 0%, transparent 50%)',
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
            background: `linear-gradient(to bottom, ${AIXR_SARAWAK_ACCENT}ee, ${AIXR_SARAWAK_ACCENT}30)`,
            boxShadow: `3px 0 14px ${AIXR_SARAWAK_ACCENT}30`,
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
          <Link to="/" className="hero-breadcrumb">
            XR Summits
          </Link>
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent/40"
            aria-hidden="true"
          />
          <span className="hero-edition">
            {AIXR_SARAWAK_META.edition}
          </span>
        </motion.div>

        <motion.h1
          id="aixr-hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-black leading-[0.95] mb-5"
          style={{ fontSize: 'clamp(2.25rem, 7vw, 3.75rem)', color: '#0f1b30' }}
        >
          AIXR{' '}
          <span style={{ color: AIXR_SARAWAK_ACCENT }}>26&apos; Sarawak</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold tracking-[0.12em] mb-6 max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(0.78rem, 2vw, 0.95rem)',
            color: '#1a2840',
            lineHeight: 1.7,
          }}
        >
          {AIXR_SARAWAK_POSITIONING}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold tracking-[0.22em] uppercase mb-4"
          style={{ fontSize: '0.68rem', color: 'rgba(22,36,62,0.55)' }}
        >
          {AIXR_SARAWAK_META.location}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.85, color: 'rgba(15,27,48,0.88)' }}
        >
          Sarawak regional gateway — conference, expo, workshops, masterclasses, and championship semi-finals on the
          path to XRAS KL grand finals. No gala dinner at this stage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={onDownloadBrochure}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] transition-all duration-300"
            style={{
              color: AIXR_SARAWAK_ACCENT,
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: `1px solid ${AIXR_SARAWAK_ACCENT}55`,
              boxShadow: '0 2px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            Download Brochure
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18] transition-shadow hover:shadow-[0_0_32px_rgba(251,146,60,0.35)]"
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

export default AixrHero;
