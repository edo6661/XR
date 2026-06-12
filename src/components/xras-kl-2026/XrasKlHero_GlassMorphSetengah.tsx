import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XRAS_KL_ACCENT, XRAS_KL_META } from '../../core/content/xrasKl2026';

const XRAS_HERO_IMAGE = '/3-gateway-images/XR AI Summit 2026_Main Image.jpeg';

const glassLight = {
  background: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.22)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
} as const;

const glassDark = {
  background: 'rgba(5,11,24,0.58)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)',
} as const;

type XrasKlHeroProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const XrasKlHero = ({ onDownloadBrochure, onRegister }: XrasKlHeroProps) => (
  <section
    className="relative w-full overflow-hidden pt-32 pb-16 md:pb-20 px-6 min-h-[min(75vh,800px)] flex items-end md:items-center"
    aria-labelledby="xras-hero-heading"
  >
    {/* Background image */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img
        src={XRAS_HERO_IMAGE}
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
            'linear-gradient(175deg, rgba(5,11,24,0.1) 0%, rgba(5,11,24,0.22) 50%, rgba(5,11,24,0.55) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,146,60,0.1) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(56,189,248,0.05) 0%, transparent 50%)',
        }}
      />
    </div>

    <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center justify-center gap-3 mb-8 px-5 py-2.5 rounded-full"
        style={glassDark}
      >
        <Link
          to="/"
          className="font-mono text-[0.5rem] tracking-[0.35em] uppercase text-foreground hover:text-accent transition-colors"
        >
          XR Summits
        </Link>
        <span className="w-1 h-1 rounded-full bg-accent/70" aria-hidden="true" />
        <span
          className="font-bold tracking-[0.4em] uppercase"
          style={{ fontSize: '0.5rem', color: XRAS_KL_ACCENT }}
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
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.25rem)',
          textShadow: '0 2px 24px rgba(5,11,24,0.65), 0 1px 3px rgba(5,11,24,0.4)',
        }}
      >
        XR Asia{' '}
        <span style={{ color: XRAS_KL_ACCENT }}>Summits</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-semibold tracking-[0.12em] mb-4"
        style={{
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          color: 'rgba(240,244,255,0.92)',
          lineHeight: 1.6,
          textShadow: '0 1px 16px rgba(5,11,24,0.5)',
        }}
      >
        3 Days. 7 Experiences.{' '}
        <span style={{ color: XRAS_KL_ACCENT }}>One Ecosystem.</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block max-w-2xl mx-auto mb-10 px-5 py-3.5 rounded-xl"
        style={glassDark}
      >
        <p
          className="font-medium leading-relaxed"
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.85,
            color: 'rgba(240,244,255,0.94)',
          }}
        >
          1–3 December 2026 · Malaysia International Trade and Exhibition Centre (MITEC, Kuala Lumpur)
        </p>
      </motion.div>

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
            ...glassLight,
            borderRadius: '3px',
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
