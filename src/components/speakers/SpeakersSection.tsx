import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionEyebrow from '../ui/SectionEyebrow';
import { XRAS_KL_SPEAKERS, type XrasSpeaker } from '../../core/content/xrasKl2026';

const SPEAKERS: XrasSpeaker[] = [...XRAS_KL_SPEAKERS];
const ROW_SIZE = 5;

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((p) => !p.startsWith("'") && p.length > 1 && !p.startsWith('Dr') && !p.startsWith('Ts'))
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

const speakerRows = Array.from(
  { length: Math.ceil(SPEAKERS.length / ROW_SIZE) },
  (_, i) => SPEAKERS.slice(i * ROW_SIZE, i * ROW_SIZE + ROW_SIZE),
);

const SpeakerCard = ({ speaker, index }: { speaker: XrasSpeaker; index: number }) => {
  const accent = speaker.accentColor ?? '#ef783d';
  const initials = getInitials(speaker.name);
  const rowIndex = Math.floor(index / ROW_SIZE);
  const colIndex = index % ROW_SIZE;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: rowIndex * 0.12 + colIndex * 0.05,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden text-left select-none"
      style={{
        background: 'linear-gradient(165deg, rgba(14,18,32,0.92) 0%, rgba(8,10,18,0.98) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
      }}
    >
      {/* Top accent */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Photo */}
      <div
        className="relative shrink-0 w-full overflow-hidden"
        style={{ aspectRatio: '4/5' }}
      >
        {speaker.photo ? (
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover object-[50%_12%] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ filter: 'grayscale(15%) brightness(0.88)' }}
            loading="lazy"
          />
        ) : (
          <div
            className="flex items-center justify-center w-full h-full"
            style={{
              background: `linear-gradient(145deg, ${accent}18 0%, rgba(5,8,16,0.9) 100%)`,
            }}
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full font-heading font-black transition-transform duration-500 group-hover:scale-110"
              style={{
                fontSize: '1.35rem',
                background: `${accent}14`,
                border: `1px solid ${accent}30`,
                color: accent,
              }}
            >
              {initials}
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background:
              'linear-gradient(to top, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.35) 42%, transparent 72%)',
          }}
          aria-hidden="true"
        />

        <span
          className="absolute top-3 left-3 font-mono font-medium px-2 py-0.5 rounded-sm backdrop-blur-sm"
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.22em',
            color: 'rgba(240,244,255,0.75)',
            background: 'rgba(5,8,16,0.55)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Info */}
      <div className="relative flex flex-col flex-1 gap-1.5 p-4 pt-3">
        <h3
          className="font-heading font-bold text-foreground leading-snug group-hover:text-white transition-colors duration-300"
          style={{ fontSize: '0.8rem' }}
        >
          {speaker.name}
        </h3>
        <p className="font-medium leading-snug" style={{ fontSize: '0.7rem', color: accent }}>
          {speaker.role}
        </p>
        {speaker.company ? (
          <p
            className="line-clamp-2"
            style={{ fontSize: '0.68rem', color: 'rgba(200,212,235,0.72)', lineHeight: 1.45 }}
          >
            {speaker.company}
          </p>
        ) : null}

        {speaker.focusAreas.length > 0 ? (
          <div className="mt-auto pt-3 flex flex-wrap gap-1">
            {speaker.focusAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="inline-flex px-1.5 py-0.5 rounded-sm"
                style={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.04em',
                  color: 'rgba(200,212,235,0.78)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {area}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          boxShadow: `inset 0 0 0 1px ${accent}28, 0 20px 40px ${accent}0a`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
};

const SpeakersSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
      aria-labelledby="speakers-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(57,83,163,0.07) 0%, transparent 62%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionEyebrow>Conference</SectionEyebrow>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-12 lg:mb-14">
          <motion.h2
            id="speakers-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-foreground max-w-2xl"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', letterSpacing: '0.03em' }}
          >
            Conference{' '}
            <span className="gradient-text-accent">Speakers</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.58rem', letterSpacing: '0.22em', color: 'rgba(139,155,180,0.55)' }}
            >
              {String(SPEAKERS.length).padStart(2, '0')} Speakers
            </span>
            <div
              style={{ width: '1px', height: '1rem', background: 'rgba(255,255,255,0.1)' }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.58rem', letterSpacing: '0.22em', color: 'rgba(139,155,180,0.4)' }}
            >
              {speakerRows.length} Rows
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          {speakerRows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {rowIndex > 0 ? (
                <div
                  className="flex items-center gap-4 mb-8 lg:mb-10"
                  aria-hidden="true"
                >
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/8 to-transparent" />
                </div>
              ) : null}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                {row.map((speaker, colIndex) => {
                  const index = rowIndex * ROW_SIZE + colIndex;
                  return (
                    <SpeakerCard key={speaker.name} speaker={speaker} index={index} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ fontSize: '0.9rem', color: 'rgba(180,195,220,0.88)', lineHeight: 1.65 }}>
            Are you a practitioner, researcher, or industry leader in XR, AI, or spatial media?
          </p>
          <Link
            to="/contact#section-speakers"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300"
            style={{
              fontSize: '0.72rem',
              border: '1px solid rgba(57,83,163,0.5)',
              color: '#a8b8e8',
              background: 'rgba(57,83,163,0.1)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(57,83,163,0.2)';
              el.style.borderColor = 'rgba(57,83,163,0.75)';
              el.style.color = '#f0f4ff';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(57,83,163,0.1)';
              el.style.borderColor = 'rgba(57,83,163,0.5)';
              el.style.color = '#a8b8e8';
            }}
          >
            Apply to Speak
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
