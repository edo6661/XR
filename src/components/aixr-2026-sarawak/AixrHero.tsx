import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AIXR_SARAWAK_ACCENT,
  AIXR_SARAWAK_META,
  AIXR_SARAWAK_POSITIONING,
} from '../../core/content/aixr2026Sarawak';

type AixrHeroProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const AixrHero = ({ onDownloadBrochure, onRegister }: AixrHeroProps) => (
  <section
    className="relative w-full overflow-hidden pt-32 pb-16 md:pb-20 px-6"
    aria-labelledby="aixr-hero-heading"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,146,60,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(56,189,248,0.04) 0%, transparent 50%)',
      }}
      aria-hidden="true"
    />

    <div
      className="absolute inset-0 opacity-[0.015] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-3 mb-8"
      >
        <Link
          to="/"
          className="font-mono text-[0.5rem] tracking-[0.35em] uppercase text-foreground-muted/50 hover:text-accent transition-colors"
        >
          XR Summits
        </Link>
        <span className="w-1 h-1 rounded-full" style={{ background: `${AIXR_SARAWAK_ACCENT}66` }} aria-hidden="true" />
        <span
          className="font-bold tracking-[0.4em] uppercase"
          style={{ fontSize: '0.5rem', color: `${AIXR_SARAWAK_ACCENT}99` }}
        >
          {AIXR_SARAWAK_META.edition}
        </span>
      </motion.div>

      <motion.h1
        id="aixr-hero-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="font-heading font-black text-foreground leading-[0.95] mb-5"
        style={{ fontSize: 'clamp(2.25rem, 7vw, 3.75rem)' }}
      >
        AIXR{' '}
        <span style={{ color: AIXR_SARAWAK_ACCENT }}>26&apos; Sarawak</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-semibold tracking-[0.12em] mb-6 max-w-2xl mx-auto"
        style={{
          fontSize: 'clamp(0.78rem, 2vw, 0.95rem)',
          color: 'rgba(240,244,255,0.82)',
          lineHeight: 1.7,
        }}
      >
        {AIXR_SARAWAK_POSITIONING}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-semibold tracking-[0.22em] uppercase mb-4"
        style={{ fontSize: '0.68rem', color: 'rgba(107,127,163,0.75)' }}
      >
        {AIXR_SARAWAK_META.location}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-10"
        style={{ fontSize: '0.9rem', lineHeight: 1.85 }}
      >
        Sarawak regional gateway — conference, expo, workshops, masterclasses, and championship semi-finals on the
        path to XRAS KL grand finals. No gala dinner at this stage.
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
          className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] transition-all duration-300"
          style={{
            color: AIXR_SARAWAK_ACCENT,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${AIXR_SARAWAK_ACCENT}55`,
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
    </div>
  </section>
);

export default AixrHero;