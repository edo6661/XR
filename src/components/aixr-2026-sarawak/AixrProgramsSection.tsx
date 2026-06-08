import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';
import {
  AIXR_SARAWAK_ACCENT,
  AIXR_SARAWAK_PROGRAMS,
  AIXR_SARAWAK_POSITIONING,
  type AixrProgram,
} from '../../core/content/aixr2026Sarawak';

const ProgramCard = ({ program, index }: { program: AixrProgram; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: (index % 4) * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex flex-col h-full rounded-xl overflow-hidden"
    style={{
      background: program.featured
        ? 'linear-gradient(155deg, rgba(22,38,62,0.85) 0%, rgba(13,27,46,0.92) 100%)'
        : 'rgba(10, 20, 36, 0.72)',
      border: `1px solid ${program.featured ? `${AIXR_SARAWAK_ACCENT}28` : 'rgba(255,255,255,0.07)'}`,
      boxShadow: program.featured ? `0 0 40px ${AIXR_SARAWAK_ACCENT}08` : 'none',
    }}
  >
    <div
      className="absolute top-0 inset-x-0 h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${AIXR_SARAWAK_ACCENT}${program.featured ? '55' : '25'}, transparent)`,
      }}
      aria-hidden="true"
    />

    <div className="p-6 flex flex-col flex-1 gap-4">
      <div className="flex items-center justify-between gap-2">
        <span
          className="font-bold tracking-[0.32em] uppercase px-2.5 py-1 rounded-sm"
          style={{
            fontSize: '0.5rem',
            color: AIXR_SARAWAK_ACCENT,
            background: `${AIXR_SARAWAK_ACCENT}12`,
            border: `1px solid ${AIXR_SARAWAK_ACCENT}22`,
          }}
        >
          {program.category}
        </span>
        <span className="font-mono text-[0.48rem] tracking-[0.25em]" style={{ color: 'rgba(107,127,163,0.35)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3
        className="font-heading font-bold text-foreground leading-snug"
        style={{ fontSize: program.featured ? '1.15rem' : '1rem' }}
      >
        {program.title}
      </h3>

      <p className="text-foreground-muted flex-1 leading-relaxed" style={{ fontSize: '0.8rem', lineHeight: 1.75 }}>
        {program.description}
      </p>
    </div>
  </motion.article>
);

type AixrProgramsSectionProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const AixrProgramsSection = ({ onDownloadBrochure, onRegister }: AixrProgramsSectionProps) => (
  <section
    className="relative w-full overflow-hidden px-6"
    style={{
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',

    }}
    aria-labelledby="aixr-programs-heading"
  >
    <div className="max-w-6xl mx-auto">
      <SectionEyebrow>Programme</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 max-w-2xl"
      >
        <h2
          id="aixr-programs-heading"
          className="font-heading font-bold text-foreground mb-3"
          style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}
        >
          Regional programme
        </h2>
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
          {AIXR_SARAWAK_POSITIONING} — explore conference, expo, workshops, masterclasses, and semi-finals. Grand
          finals and awards gala take place at XRAS KL.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {AIXR_SARAWAK_PROGRAMS.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14 pt-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          type="button"
          onClick={onDownloadBrochure}
          className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] transition-colors duration-300"
          style={{
            color: AIXR_SARAWAK_ACCENT,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${AIXR_SARAWAK_ACCENT}45`,
          }}
        >
          Download Brochure
        </button>
        <button
          type="button"
          onClick={onRegister}
          className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18] transition-shadow hover:shadow-[0_0_28px_rgba(34,211,238,0.35)]"
          style={{
            background: `linear-gradient(135deg, ${AIXR_SARAWAK_ACCENT} 0%, #06b6d4 100%)`,
            border: `1px solid ${AIXR_SARAWAK_ACCENT}80`,
          }}
        >
          Register / Enquiry
        </button>
      </motion.div>
    </div>
  </section>
);

export default AixrProgramsSection;
