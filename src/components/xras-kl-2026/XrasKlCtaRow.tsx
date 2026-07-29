import { motion } from 'framer-motion';
import { XRAS_KL_PASS_URL } from '../../core/content/xrasKl2026';

type XrasKlCtaRowProps = {
  onDownloadBrochure: () => void;
};

const XrasKlCtaRow = ({ onDownloadBrochure }: XrasKlCtaRowProps) => (
  <section className="relative w-full px-6" aria-label="Event registration">
    <div
      className="max-w-7xl mx-auto"
      style={{
        paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <button
          type="button"
          onClick={onDownloadBrochure}
          className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[1rem] transition-all duration-300 hover:shadow-[0_0_28px_rgba(239,120,61,0.25)] cursor-none"
          style={{
            color: '#ef783d',
            background: 'rgba(239,120,61,0.08)',
            border: '1px solid rgba(239,120,61,0.45)',
          }}
        >
          Request Brochure
        </button>
        <a
          href={XRAS_KL_PASS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[1rem] text-[#050505] transition-all duration-300 hover:shadow-[0_0_36px_rgba(239,120,61,0.45)] hover:-translate-y-px cursor-none text-center"
          style={{
            background: 'linear-gradient(135deg, #ef783d 0%, #fb923c 100%)',
            border: '1px solid rgba(239,120,61,0.5)',
            boxShadow: '0 0 24px rgba(239,120,61,0.25)',
          }}
        >
          Choose Your Pass
        </a>
      </motion.div>
    </div>
  </section>
);

export default XrasKlCtaRow;
