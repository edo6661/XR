import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import SectionEyebrow from '../ui/SectionEyebrow';

// ── Types ────────────────────────────────────────────────────────────────────
type Speaker = {
  name: string;
  role: string;
  company: string;
  photo?: string;
  accentColor?: string;
};

// ── Data ─────────────────────────────────────────────────────────────────────
const SPEAKERS: Speaker[] = [
  { name: "Dato' Kamil Othman", role: "CEO", company: "FINAS", accentColor: '#ef783d' },
  { name: "Nick CG Tan", role: "Managing Director", company: "Oceanus Media Global", accentColor: '#3953a3' },
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

// ── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name: string) =>
  name
    .split(' ')
    .filter((p) => !p.startsWith("'") && p.length > 1 && !p.startsWith('Dr') && !p.startsWith('Ts'))
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

const getSlidesPerView = (): number => {
  if (typeof window === 'undefined') return 2;
  if (window.innerWidth >= 1280) return 6;
  if (window.innerWidth >= 1024) return 5;
  if (window.innerWidth >= 768) return 4;
  if (window.innerWidth >= 640) return 3;
  return 2;
};

// ── SpeakerCard ──────────────────────────────────────────────────────────────
const SpeakerCard = ({ speaker, index }: { speaker: Speaker; index: number }) => {
  const accent = speaker.accentColor ?? '#ef783d';
  const initials = getInitials(speaker.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 6) * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-xl overflow-hidden text-left w-full h-full select-none"
      style={{
        background: 'rgba(10,10,10,0.65)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
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
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[1.5px]"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}55, transparent)`, opacity: 0.7 }}
        aria-hidden="true"
      />

      {/* Photo / initials */}
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
            className="flex items-center justify-center w-16 h-16 rounded-full font-heading font-black transition-transform duration-500 group-hover:scale-110"
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

      {/* Info */}
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
    </motion.div>
  );
};

// ── ArrowButton ──────────────────────────────────────────────────────────────
const ArrowButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === 'prev' ? 'Previous speakers' : 'Next speakers'}
    className="relative flex items-center justify-center rounded-sm transition-all duration-300 focus-visible:outline-none"
    style={{
      width: '2.4rem',
      height: '2.4rem',
      border: `1px solid ${disabled ? 'rgba(255,255,255,0.07)' : 'rgba(239,120,61,0.35)'}`,
      background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(239,120,61,0.05)',
      color: disabled ? 'rgba(255,255,255,0.18)' : '#ef783d',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}
    onMouseEnter={(e) => {
      if (disabled) return;
      const el = e.currentTarget as HTMLButtonElement;
      el.style.background = 'rgba(239,120,61,0.12)';
      el.style.borderColor = 'rgba(239,120,61,0.65)';
    }}
    onMouseLeave={(e) => {
      if (disabled) return;
      const el = e.currentTarget as HTMLButtonElement;
      el.style.background = 'rgba(239,120,61,0.05)';
      el.style.borderColor = 'rgba(239,120,61,0.35)';
    }}
  >
    {direction === 'prev' ? (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

// ── SpeakersSection ──────────────────────────────────────────────────────────
const SpeakersSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
  });

  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);

  // Responsive slides-per-view
  useEffect(() => {
    const onResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Sync Embla state via event subscriptions (initial sync deferred to avoid setState in effect)
  useEffect(() => {
    if (!emblaApi) return;

    const syncSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    const syncScroll = () => {
      setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    };

    emblaApi.on('select', syncSelect);
    emblaApi.on('scroll', syncScroll);
    emblaApi.on('reInit', syncSelect);

    const frame = requestAnimationFrame(() => {
      syncSelect();
      syncScroll();
    });

    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off('select', syncSelect);
      emblaApi.off('scroll', syncScroll);
      emblaApi.off('reInit', syncSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const cur = emblaApi.selectedScrollSnap();
    emblaApi.scrollTo(Math.max(0, cur - slidesPerView));
  }, [emblaApi, slidesPerView]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const cur = emblaApi.selectedScrollSnap();
    const total = emblaApi.scrollSnapList().length;
    emblaApi.scrollTo(Math.min(total - 1, cur + slidesPerView));
  }, [emblaApi, slidesPerView]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
      aria-labelledby="speakers-heading"
    >
      {/* Responsive slide widths — one stylesheet, scoped to this section */}
      <style>{`
        .spk-slide {
          flex-shrink: 0;
          width: calc(50% - 0.375rem);
        }
        @media (min-width: 640px)  { .spk-slide { width: calc(33.333% - 0.5rem);   } }
        @media (min-width: 768px)  { .spk-slide { width: calc(25% - 0.5625rem);    } }
        @media (min-width: 1024px) { .spk-slide { width: calc(20% - 0.6rem);       } }
        @media (min-width: 1280px) { .spk-slide { width: calc(16.666% - 0.625rem); } }
      `}</style>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(57,83,163,0.04) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="px-6">
          <SectionEyebrow>Visionary Minds</SectionEyebrow>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
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

            {/* Controls cluster */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center gap-3 pb-1"
            >
              <span
                className="font-mono"
                style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(139,155,180,0.4)' }}
              >
                {String(SPEAKERS.length).padStart(2, '0')} SPEAKERS
              </span>
              <div
                style={{ width: '1px', height: '1rem', background: 'rgba(255,255,255,0.08)' }}
                aria-hidden="true"
              />
              <ArrowButton direction="prev" onClick={scrollPrev} disabled={!canPrev} />
              <ArrowButton direction="next" onClick={scrollNext} disabled={!canNext} />
            </motion.div>
          </div>
        </div>

        {/* ── Embla carousel ── */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className="flex"
            style={{ gap: '0.75rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          >
            {/* Speaker cards */}
            {SPEAKERS.map((speaker, i) => (
              <div key={speaker.name} className="spk-slide">
                <SpeakerCard speaker={speaker} index={i} />
              </div>
            ))}

            {/* TBA card */}
            <div className="spk-slide">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center rounded-xl overflow-hidden text-center w-full"
                style={{
                  aspectRatio: '3/4',
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px dashed rgba(255,255,255,0.08)',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.48rem',
                    letterSpacing: '0.28em',
                    lineHeight: 2,
                    color: 'rgba(240,244,255,0.22)',
                    textTransform: 'uppercase',
                  }}
                >
                  More Speakers<br />To Be Announced
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="px-6 mt-5">
          <div
            className="relative w-full rounded-full overflow-hidden"
            style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
            aria-hidden="true"
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #3953a3 0%, #ef783d 100%)',
                width: `${progress * 100}%`,
                transition: 'width 0.1s ease',
              }}
            />
          </div>
          <div
            className="flex justify-between mt-2"
            style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(139,155,180,0.28)' }}
          >
            <span className="font-mono">DRAG TO EXPLORE</span>
            <span className="font-mono">{Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* ── CTA footer ── */}
        <div className="px-6">
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

      </div>
    </section>
  );
};

export default SpeakersSection;