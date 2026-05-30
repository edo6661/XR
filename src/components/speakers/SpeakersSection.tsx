import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// ── Speaker data ───────────────────────────────────────────────────────────
// Placeholder yang lebih realistis untuk event XR Asia
const SPEAKERS = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief AI Scientist',
    company: 'Nexus Labs',
    topic: 'Neural Rendering & AI-Driven XR',
    image: 'https://i.pravatar.cc/400?img=1',
    accentColor: '#fb923c',
  },
  {
    name: 'Marcus Vidal',
    role: 'Head of Spatial Computing',
    company: 'MetaXR Asia',
    topic: 'The Enterprise Metaverse Roadmap',
    image: 'https://i.pravatar.cc/400?img=11',
    accentColor: '#22d3ee',
  },
  {
    name: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'NeuralNet Systems',
    topic: 'Volumetric Video at Scale',
    image: 'https://i.pravatar.cc/400?img=5',
    accentColor: '#4ade80',
  },
  {
    name: 'David Kim',
    role: 'Founder & CEO',
    company: 'XR Esports Arena',
    topic: 'Competitive XR: The Next Frontier',
    image: 'https://i.pravatar.cc/400?img=8',
    accentColor: '#a78bfa',
  },
];

// ── Speaker card ───────────────────────────────────────────────────────────
const SpeakerCard = ({
  name,
  role,
  company,
  topic,
  image,
  accentColor,
  index,
}: typeof SPEAKERS[0] & { index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
    e.currentTarget.style.borderColor = `${accentColor}30`;
    e.currentTarget.style.boxShadow = `0 0 40px ${accentColor}0d`;
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    }
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.055)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative rounded-xl overflow-hidden cursor-default"
        style={{
          background: 'rgba(10,20,36,0.6)',
          border: `1px solid rgba(255,255,255,0.055)`,
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: `linear-gradient(to bottom, transparent, ${accentColor}60, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Image area */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
          {/* Grayscale → color on hover */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top transition-all duration-700"
            style={{ filter: 'grayscale(85%) brightness(0.75)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%) brightness(0.9)';
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(85%) brightness(0.75)';
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
            loading="lazy"
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(10,20,36,1) 0%, rgba(10,20,36,0.4) 50%, transparent 100%)`,
            }}
            aria-hidden="true"
          />

          {/* Topic badge — top right */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}35`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="font-bold tracking-[0.18em] uppercase"
              style={{ fontSize: '0.52rem', color: accentColor }}
            >
              Speaking On
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          {/* Name + role */}
          <div>
            <h3
              className="font-heading font-bold text-foreground leading-tight mb-1"
              style={{ fontSize: '0.95rem' }}
            >
              {name}
            </h3>
            <p style={{ fontSize: '0.72rem', color: `${accentColor}90` }}>
              {role}
            </p>
            <p style={{ fontSize: '0.68rem', color: 'rgba(107,127,163,0.65)' }}>
              {company}
            </p>
          </div>

          {/* Topic */}
          <div
            className="pt-3 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.055)' }}
          >
            <p
              className="leading-snug"
              style={{ fontSize: '0.72rem', color: 'rgba(240,244,255,0.6)', fontStyle: 'italic' }}
            >
              "{topic}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main section ───────────────────────────────────────────────────────────
const SpeakersSection = () => {
  return (
    <section
      className="relative w-full bg-background overflow-hidden"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-5 h-px" style={{ background: 'rgba(251,146,60,0.55)' }} aria-hidden="true" />
          <span
            className="font-bold tracking-[0.52em] uppercase"
            style={{ fontSize: '0.57rem', color: 'rgba(251,146,60,0.72)' }}
          >
            Visionary Minds
          </span>
        </motion.div>

        {/* Heading + CTA row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-foreground"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            Keynote{' '}
            <span
              style={{
                background: 'linear-gradient(130deg, #fb923c 0%, #f0f4ff 85%)',
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
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="pb-1"
            style={{ fontSize: '0.75rem', color: 'rgba(107,127,163,0.6)' }}
          >
            Full lineup announced soon
          </motion.p>
        </div>

        {/* Speaker cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SPEAKERS.map((speaker, i) => (
            <SpeakerCard key={speaker.name} index={i} {...speaker} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-10"
        >
          <a
            href="#tickets"
            className="group inline-flex items-center gap-2 transition-colors duration-300"
            style={{ color: 'rgba(107,127,163,0.5)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(251,146,60,0.8)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(107,127,163,0.5)'; }}
          >
            <span className="font-bold tracking-[0.25em] uppercase" style={{ fontSize: '0.62rem' }}>
              Apply to Speak
            </span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;