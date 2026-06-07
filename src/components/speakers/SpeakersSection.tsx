import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionEyebrow from '../ui/SectionEyebrow';
import GatewayModal from '../gateway/GatewayModal';

type Speaker = {
  name: string;
  role: string;
  company: string;
  photo?: string;
  accentColor?: string;
  // Tambahan field untuk Masterclass/Coaching sesuai request klien
  bio?: string;
  syllabus?: string[];
  cost?: string;
  stripeLink?: string;
};

const SPEAKERS: Speaker[] = [
  {
    name: "Dato' Kamil Othman",
    role: "CEO",
    company: "FINAS",
    accentColor: '#ef783d',
    bio: "Dato' Kamil Othman is a visionary leader driving the digital and immersive transformation of the Malaysian film and broadcast industry.",
    syllabus: ["The Future of Asian Cinema", "Integrating XR in National Broadcasting", "Funding and Grants for Immersive Tech"],
    cost: "MYR 1,500 / Session",
    stripeLink: "#"
  },
  {
    name: "Nick CG Tan",
    role: "Managing Director",
    company: "Oceanus Media Global",
    accentColor: '#3953a3',
    bio: "Pioneer in Virtual Production and mixed reality broadcasting, bridging the gap between traditional media and spatial computing.",
    syllabus: ["Virtual Production Pipelines", "Real-time Rendering with Unreal Engine", "Case Study: Live AR Broadcasting"],
    cost: "MYR 2,200 / Masterclass",
    stripeLink: "#"
  },
  { name: "Thi Thu Hien Hoang", role: "Director", company: "Mirabo", accentColor: '#fedb21' },
  { name: "Alex David", role: "Founder", company: "Tactician", accentColor: '#ef783d' },
  { name: "Carl Loo", role: "Director", company: "Solid Water", accentColor: '#3953a3' },
  { name: "Kei Choong", role: "Founder", company: "Aux Media", accentColor: '#fedb21' },
  { name: "Fariz Hanapiah", role: "CEO", company: "EDT", accentColor: '#ef783d' },
  { name: "Justin Wong", role: "Founder", company: "TrueXR", accentColor: '#3953a3' },
  { name: "Havene Liew", role: "Director", company: "XRA", accentColor: '#fedb21' },
  { name: "Ts. Dr. Mohd Zaliman", role: "Director", company: "TDC", accentColor: '#ef783d' },
  { name: "Jason Yim", role: "CEO", company: "Trigger XR", accentColor: '#3953a3' },
  { name: "Dr. Ike Tan", role: "Academic Lead", company: "APU/APIIT", accentColor: '#fedb21' },
  { name: "Dr. Andrew Yew", role: "Director", company: "Ministry XR", accentColor: '#ef783d' },
  { name: "Hussin Khan", role: "Founder", company: "EFXCO", accentColor: '#3953a3' },
  { name: "Thomas Desmeules", role: "VP", company: "Solotech", accentColor: '#fedb21' },
  { name: "Kian Chai Ng", role: "Director", company: "Microsoft", accentColor: '#ef783d' },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((p) => !p.startsWith("'") && p.length > 1 && !p.startsWith('Dr') && !p.startsWith('Ts'))
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

const SpeakerCard = ({
  speaker,
  index,
  onClick,
}: {
  speaker: Speaker;
  index: number;
  onClick: () => void;
}) => {
  const accent = speaker.accentColor ?? '#ef783d';
  const initials = getInitials(speaker.name);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 8) * 0.055, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-xl overflow-hidden text-left w-full h-full cursor-pointer"
      style={{
        background: 'rgba(10,10,10,0.65)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
      }}
      whileHover={{ y: -3 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accent}35`;
        el.style.boxShadow = `0 0 32px ${accent}0d, 0 18px 36px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.06)';
        el.style.boxShadow = 'none';
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[1.5px]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${accent}55, transparent)`,
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      <div
        className="relative flex items-center justify-center w-full"
        style={{
          aspectRatio: '1/1',
          background: `linear-gradient(145deg, ${accent}10 0%, rgba(5,5,5,0.5) 100%)`,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {speaker.photo ? (
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'grayscale(20%) brightness(0.85)' }}
            loading="lazy"
          />
        ) : (
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full font-heading font-black text-foreground transition-transform duration-500 group-hover:scale-110"
            style={{
              fontSize: '1.35rem',
              background: `${accent}14`,
              border: `1px solid ${accent}28`,
              color: accent,
            }}
          >
            {initials}
          </div>
        )}

        <span
          className="absolute top-2.5 right-2.5 font-heading font-black"
          style={{ fontSize: '0.52rem', letterSpacing: '0.25em', color: `${accent}38` }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <h3
          className="font-heading font-bold text-foreground leading-snug group-hover:text-white transition-colors"
          style={{ fontSize: '0.82rem' }}
        >
          {speaker.name}
        </h3>
        <p style={{ fontSize: '0.65rem', color: `${accent}99` }}>{speaker.role}</p>
        <p style={{ fontSize: '0.62rem', color: 'rgba(240,244,255,0.5)' }}>{speaker.company}</p>
      </div>
    </motion.button>
  );
};

const SpeakersSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
      aria-labelledby="speakers-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(57,83,163,0.04) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionEyebrow>Visionary Minds</SectionEyebrow>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.h2
            id="speakers-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-foreground"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', letterSpacing: '0.03em' }}
          >
            Keynote{' '}
            <span
              style={{
                background: 'linear-gradient(130deg, #ef783d 0%, #f0f4ff 85%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Speakers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="pb-1 text-right"
            style={{ fontSize: '0.72rem', color: 'rgba(139,155,180,0.55)' }}
          >
            Schedules & Masterclasses
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
          {SPEAKERS.map((speaker, i) => (
            <SpeakerCard
              key={speaker.name}
              speaker={speaker}
              index={i}
              onClick={() => setSelectedSpeaker(speaker)}
            />
          ))}

          {/* Kartu Kosong: Indikator "More to come" sesuai request klien */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col items-center justify-center rounded-xl overflow-hidden text-center w-full h-full min-h-[160px]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed rgba(255,255,255,0.1)',
            }}
          >
            <span className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/40">
              More Speakers<br />To Be Announced
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p style={{ fontSize: '0.78rem', color: 'rgba(139,155,180,0.6)' }}>
            Are you a practitioner, researcher, or industry leader in XR, AI, or spatial media?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300"
            style={{
              fontSize: '0.62rem',
              border: '1px solid rgba(239,120,61,0.4)',
              color: '#ef783d',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(239,120,61,0.08)';
              el.style.borderColor = 'rgba(239,120,61,0.65)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(239,120,61,0.4)';
            }}
          >
            Apply to Speak
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* MODAL PROFIL & PAYMENT (STRIPE) */}
      <GatewayModal
        open={!!selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
        title="Speaker & Masterclass Profile"
        accentColor={selectedSpeaker?.accentColor || '#ef783d'}
      >
        {selectedSpeaker && (
          <div className="flex flex-col gap-6 text-foreground">
            {/* Header: Avatar & Title */}
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-black text-xl flex-shrink-0"
                style={{
                  background: `${selectedSpeaker.accentColor}15`,
                  border: `1px solid ${selectedSpeaker.accentColor}40`,
                  color: selectedSpeaker.accentColor
                }}
              >
                {getInitials(selectedSpeaker.name)}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading font-bold text-lg">{selectedSpeaker.name}</h3>
                <p className="text-sm text-foreground-muted">{selectedSpeaker.role} at <span style={{ color: selectedSpeaker.accentColor }}>{selectedSpeaker.company}</span></p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-foreground-muted/60">Biography</span>
              <p className="text-sm leading-relaxed text-foreground-muted">
                {selectedSpeaker.bio || "Full biography and session details will be updated shortly by the XR Summits content team."}
              </p>
            </div>

            {/* Syllabus */}
            {selectedSpeaker.syllabus && selectedSpeaker.syllabus.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-foreground-muted/60">Masterclass Syllabus</span>
                <ul className="flex flex-col gap-2">
                  {selectedSpeaker.syllabus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground-muted">
                      <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: selectedSpeaker.accentColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer / Stripe Action */}
            <div className="mt-4 pt-5 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-foreground-muted/60">Session Cost</span>
                <span className="font-heading font-bold" style={{ color: selectedSpeaker.accentColor }}>
                  {selectedSpeaker.cost || "TBA"}
                </span>
              </div>

              <a
                href={selectedSpeaker.stripeLink || "#"}
                target={selectedSpeaker.stripeLink !== "#" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-center transition-all duration-300"
                style={{
                  background: selectedSpeaker.stripeLink !== "#"
                    ? `linear-gradient(135deg, ${selectedSpeaker.accentColor} 0%, ${selectedSpeaker.accentColor}cc 100%)`
                    : 'rgba(255,255,255,0.05)',
                  color: selectedSpeaker.stripeLink !== "#" ? '#050505' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${selectedSpeaker.stripeLink !== "#" ? selectedSpeaker.accentColor : 'rgba(255,255,255,0.1)'}`,
                  pointerEvents: selectedSpeaker.stripeLink !== "#" ? 'auto' : 'none'
                }}
              >
                {selectedSpeaker.stripeLink !== "#" ? "Pay with Stripe" : "Stripe Link Coming Soon"}
              </a>
            </div>
          </div>
        )}
      </GatewayModal>
    </section>
  );
};

export default SpeakersSection;