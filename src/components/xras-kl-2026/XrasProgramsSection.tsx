import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Box,
  Wrench,
  Lightbulb,
  GraduationCap,
  Trophy,
  Star,
  ArrowUpRight,
  X
} from 'lucide-react';
import SectionEyebrow from '../ui/SectionEyebrow';
import { XRAS_KL_ACCENT, XRAS_KL_PROGRAMS, type XrasProgram } from '../../core/content/xrasKl2026';

// ── Helper untuk Icon Kategori ──────────────────────────────────────────
const getCategoryIcon = (category: string, className: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('conference')) return <Mic className={className} />;
  if (cat.includes('expo')) return <Box className={className} />;
  if (cat.includes('workshop')) return <Wrench className={className} />;
  if (cat.includes('coaching')) return <Lightbulb className={className} />;
  if (cat.includes('masterclass')) return <GraduationCap className={className} />;
  if (cat.includes('finals')) return <Trophy className={className} />;
  if (cat.includes('gala')) return <Star className={className} />;
  return <Box className={className} />;
};

// ── Komponen Program Card ───────────────────────────────────────────────
const ProgramCard = ({
  program,
  index,
  onClick,
}: {
  program: XrasProgram;
  index: number;
  onClick: () => void;
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: (index % 4) * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative flex flex-col h-full rounded-xl overflow-hidden transition-all duration-500 text-left cursor-none ${program.featured ? 'md:col-span-1' : ''
      }`}
    style={{
      background: program.featured
        ? 'linear-gradient(155deg, rgba(22,38,62,0.6) 0%, rgba(13,27,46,0.8) 100%)'
        : 'rgba(10, 20, 36, 0.4)',
      border: `1px solid ${program.featured ? `${XRAS_KL_ACCENT}25` : 'rgba(255,255,255,0.05)'}`,
      boxShadow: program.featured ? `0 0 30px ${XRAS_KL_ACCENT}05` : 'none',
    }}
  >
    {/* Hover Glow Effect */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, ${XRAS_KL_ACCENT}15 0%, transparent 70%)`,
      }}
    />

    <div
      className="absolute top-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      style={{
        background: `linear-gradient(90deg, transparent, ${XRAS_KL_ACCENT}, transparent)`,
      }}
      aria-hidden="true"
    />

    <div className="p-6 md:p-8 flex flex-col flex-1 gap-6 relative z-10">
      <div className="flex items-start justify-between gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
          style={{
            background: program.featured ? `${XRAS_KL_ACCENT}15` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${program.featured ? `${XRAS_KL_ACCENT}30` : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {getCategoryIcon(
            program.category,
            `w-6 h-6 transition-colors duration-500 ${program.featured ? 'text-accent' : 'text-foreground-muted group-hover:text-accent'
            }`
          )}
        </div>
        <span
          className="font-mono text-[0.55rem] tracking-[0.25em]"
          style={{ color: 'rgba(107,127,163,0.4)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-auto">
        <span
          className="inline-block font-bold tracking-[0.32em] uppercase mb-3 transition-colors duration-300"
          style={{
            fontSize: '0.55rem',
            color: program.featured ? XRAS_KL_ACCENT : 'rgba(139, 155, 180, 0.8)',
          }}
        >
          {program.category}
        </span>
        <h3
          className="font-heading font-bold text-foreground leading-snug transition-colors duration-300 group-hover:text-white"
          style={{ fontSize: program.featured ? '1.3rem' : '1.1rem' }}
        >
          {program.title}
        </h3>
      </div>
    </div>

    {/* Indikator klik */}
    <div className="absolute bottom-6 right-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
      <ArrowUpRight size={20} color={XRAS_KL_ACCENT} />
    </div>
  </motion.button>
);

// ── Komponen Modal Detail Program ───────────────────────────────────────
const ProgramDetailModal = ({
  program,
  onClose,
}: {
  program: XrasProgram;
  onClose: () => void;
}) => {
  // Lock body scroll saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border cursor-auto"
        style={{
          background: '#0a101d', // Charcoal gelap sesuai root design tokens
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ background: `linear-gradient(90deg, #fb923c, #f97316)` }}
        />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-foreground-muted hover:text-white transition-colors cursor-none bg-white/5 p-1.5 rounded-full hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `${XRAS_KL_ACCENT}15`,
                border: `1px solid ${XRAS_KL_ACCENT}30`,
              }}
            >
              {getCategoryIcon(program.category, `w-7 h-7 text-accent`)}
            </div>
            <div>
              <span
                className="font-bold tracking-[0.25em] uppercase text-accent mb-1 block"
                style={{ fontSize: '0.6rem' }}
              >
                {program.category}
              </span>
              <span className="font-mono text-[0.6rem] text-foreground-muted">
                XRAS KL 26'
              </span>
            </div>
          </div>

          <h2 className="font-heading font-bold text-foreground text-2xl md:text-3xl mb-4 leading-tight">
            {program.title}
          </h2>

          <div className="w-10 h-px bg-white/10 mb-6" />

          <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.95rem' }}>
            {program.description}
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.7rem] transition-colors duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid rgba(255,255,255,0.1)`,
                color: 'white'
              }}
            >
              Close Details
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Main Section ────────────────────────────────────────────────────────
type XrasProgramsSectionProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const XrasProgramsSection = ({ onDownloadBrochure, onRegister }: XrasProgramsSectionProps) => {
  const [selectedProgram, setSelectedProgram] = useState<XrasProgram | null>(null);

  return (
    <section
      className="relative w-full overflow-hidden px-6"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-labelledby="xras-programs-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionEyebrow>Programme</SectionEyebrow>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl"
        >
          <h2
            id="xras-programs-heading"
            className="font-heading font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}
          >
            Summit programme
          </h2>
          <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
            Explore the full XRAS KL 2026 experience — from mainstage conference and expo floor to workshops, startup
            coaching, masterclasses, championship finals, and the awards gala. Click on any program to view details.
          </p>
        </motion.div>

        {/* Grid Diperbesar untuk menyesuaikan style baru */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {XRAS_KL_PROGRAMS.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              onClick={() => setSelectedProgram(program)}
            />
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-accent transition-colors duration-300 hover:text-foreground cursor-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${XRAS_KL_ACCENT}45`,
            }}
          >
            Download Brochure
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18] transition-shadow hover:shadow-[0_0_28px_rgba(251,146,60,0.35)] cursor-none"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              border: '1px solid rgba(251,146,60,0.5)',
            }}
          >
            Register / Enquiry
          </button>
        </motion.div>
      </div>

      {/* Render Modal Detail saat ada program yang di-klik */}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramDetailModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default XrasProgramsSection;