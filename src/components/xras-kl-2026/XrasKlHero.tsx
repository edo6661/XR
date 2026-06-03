import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XRAS_KL_ACCENT, XRAS_KL_META } from '../../core/content/xrasKl2026';

type XrasKlHeroProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const XrasKlHero = ({ onDownloadBrochure, onRegister }: XrasKlHeroProps) => (
  <section
    className="relative w-full overflow-hidden pt-32 pb-16 md:pb-20 px-6"
    aria-labelledby="xras-hero-heading"
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
        <span className="w-1 h-1 rounded-full bg-accent/40" aria-hidden="true" />
        <span
          className="font-bold tracking-[0.4em] uppercase"
          style={{ fontSize: '0.5rem', color: `${XRAS_KL_ACCENT}99` }}
        >
          {XRAS_KL_META.edition}
        </span>
      </motion.div>

      <motion.h1
        id="xras-hero-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="font-heading font-black text-foreground leading-[0.95] mb-5"
        style={{ fontSize: 'clamp(2.5rem, 8vw, 4.25rem)' }}
      >
        XRAS KL{' '}
        <span style={{ color: XRAS_KL_ACCENT }}>26&apos;</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-semibold tracking-[0.22em] uppercase mb-4"
        style={{ fontSize: '0.72rem', color: 'rgba(107,127,163,0.75)' }}
      >
        {XRAS_KL_META.location}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-10"
        style={{ fontSize: '0.9rem', lineHeight: 1.85 }}
      >
        Kuala Lumpur flagship — the definitive gateway for conference, expo, workshops, coaching, masterclasses,
        grand finals, and the AI/XR Awards Gala Dinner.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={onDownloadBrochure}
          className="w-full sm:w-auto min-w-[200px] px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-accent transition-all duration-300 hover:text-foreground"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${XRAS_KL_ACCENT}55`,
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

export default XrasKlHero;
