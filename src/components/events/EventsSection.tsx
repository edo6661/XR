import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import PastEventCard from './PastEventCard';
import SectionEyebrow from '../ui/SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

/**
 * Data from cursorrules — exact content the client provided:
 * Past events: 2021 / 2022 / 2023 with real attendee numbers
 * Global stats: 1,430+ Total Attendees | 40+ Workshops | 75+ Partners
 */
const UPCOMING_EVENTS = [
  {
    title: '4th XR Asia Summit 2026',
    subtitle: 'Flagship · XRAS26',
    date: '1 – 3 Dec 2026',
    location: 'MITEC, Kuala Lumpur',
    description:
      "Asia's definitive immersive technology summit — conference, expo, workshops, masterclasses, hackathon grand finals, esports championship, and AI/XR Awards Gala Dinner.",
    accentColor: '#fb923c',
    tag: 'Flagship',
    to: '/xras-kl-2026',
    imageSrc: '/3-gateway-images/XR AI Summit 2026_Main Image.jpeg',
    isFeatured: true,
  },
  {
    title: "AI-XR Cultural Innovation Forum",
    subtitle: 'Regional · Sarawak',
    date: '16 – 17 Oct 2026',
    location: 'BCCK, Sarawak',
    description:
      'Innovation • Culture • Technology • Future Talent — regional conference, expo, workshops, and semi-finals.',
    accentColor: '#22d3ee',
    tag: 'Regional',
    to: '/aixr-2026-sarawak',
    imageSrc: '/3-gateway-images/AI-XR Cultural Forum_Main Image.jpeg',
    isFeatured: false,
  },
  {
    title: 'AI Filmmaking Hackathon',
    subtitle: 'Grand Finals at XRAS KL',
    date: '1 – 3 Dec 2026',
    location: 'MITEC, Kuala Lumpur',
    description:
      'The culminating AI filmmaking showcase — teams compete with AI-generated films before industry judges and live audiences.',
    accentColor: '#a78bfa',
    tag: 'Hackathon',
    to: '/xras-kl-2026',
    imageSrc: '/3-gateway-images/AI Filmmaking Hackathon.png',
    isFeatured: false,
  },
];

const PAST_EVENTS = [
  {
    year: '2021',
    title: 'Inaugural XR Asia Summit 2021',
    attendees: '100+',
    speakers: '25+',
    highlight:
      'The inaugural XR Asia Summit — a pioneering event that set the benchmark for immersive technology conferences in Asia, held 25–27 Nov.',
    imageSrc: '/event-highlight-images/XRAS22 (a).png',
    accentColor: '#a78bfa',
  },
  {
    year: '2022',
    title: 'XR Asia Summit 2022',
    attendees: '200+',
    speakers: '30+',
    highlight:
      'Dynamic gathering featuring XR solutions showcase and hands-on workshops, 11–13 Nov. First dedicated Broadcast Digital Awards ceremony.',
    imageSrc: '/event-highlight-images/XRAS22 (b).png',
    accentColor: '#22d3ee',
  },
  {
    year: '2023',
    title: 'XR Asia Summit 2023',
    attendees: '500+',
    speakers: '40+',
    highlight:
      'Held as part of Malaysia Digital Content Festival, 27–29 Sep — a landmark collaboration between Broadcast Elements and MDEC that brought together Southeast Asia\'s XR community.',
    imageSrc: '/event-highlight-images/XRAS23 (a).png',
    accentColor: '#fb923c',
  },
];

// ── Main component ─────────────────────────────────────────────────────────
const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pastHeadRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [headingRef, pastHeadRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Atmospheric bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04] rounded-full"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[480px] h-[480px] opacity-[0.035] rounded-full"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 68%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ══ UPCOMING ═══════════════════════════════════════════════════ */}
        <SectionEyebrow>Upcoming Events</SectionEyebrow>

        <h2
          ref={headingRef}
          className="font-heading font-black text-foreground mb-12 opacity-0"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', letterSpacing: '0.03em' }}
        >
          Choose Your{' '}
          <span
            style={{
              background: 'linear-gradient(130deg, #fb923c 0%, #f0f4ff 85%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Gateway
          </span>
        </h2>

        {/* Featured + secondary grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
          <div className="lg:col-span-2">
            <SpotlightCard index={0} {...UPCOMING_EVENTS[0]} />
          </div>
          <div className="flex flex-col gap-3">
            {UPCOMING_EVENTS.slice(1).map((ev, i) => (
              <SpotlightCard key={ev.title} index={i + 1} {...ev} />
            ))}
          </div>
        </div>

        {/* Global stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl overflow-hidden mb-20 mt-12"
          style={{
            background: 'rgba(13,27,46,0.7)',
            border: '1px solid rgba(251,146,60,0.15)',
          }}
        >
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(251,146,60,0.6) 40%, rgba(251,146,60,0.6) 60%, transparent)',
            }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] p-8">
            {[
              { value: '1,430+', label: 'Total Attendees', sub: 'Across all editions' },
              { value: '40+', label: 'Workshops Delivered', sub: 'Expert-led sessions' },
              { value: '75+', label: 'Partners', sub: 'Government, industry & studios' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-4 sm:py-0 text-center gap-1">
                <span
                  className="font-heading font-black"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    background: 'linear-gradient(135deg, #fb923c 0%, #f0f4ff 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-heading font-bold text-foreground"
                  style={{ fontSize: '0.75rem' }}
                >
                  {stat.label}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'rgba(107,127,163,0.6)' }}>
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ══ PAST EVENTS ════════════════════════════════════════════════ */}
        <SectionEyebrow>Track Record</SectionEyebrow>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2
            ref={pastHeadRef}
            className="font-heading font-black text-foreground opacity-0"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', letterSpacing: '0.03em' }}
          >
            Past{' '}
            <span
              style={{
                background: 'linear-gradient(130deg, #22d3ee 0%, #f0f4ff 85%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Events
            </span>
          </h2>

          {/* Timeline decoration */}
          <div className="hidden sm:flex items-center gap-0 pb-1" aria-hidden="true">
            {['2021', '2022', '2023', '2026'].map((yr, i, arr) => (
              <div key={yr} className="flex items-center gap-0">
                <span
                  className="font-heading font-bold tracking-widest px-2"
                  style={{
                    fontSize: '0.6rem',
                    color:
                      i === arr.length - 1 ? '#fb923c' : 'rgba(107,127,163,0.4)',
                  }}
                >
                  {yr}
                </span>
                {i < arr.length - 1 && (
                  <div
                    className="w-8 h-px"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PAST_EVENTS.map((ev, i) => (
            <PastEventCard key={`${ev.year}-${ev.title}`} index={i} {...ev} />
          ))}
        </div>

        {/* Placeholder for XRAS21 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-3 rounded-xl px-6 py-5 flex items-center justify-between gap-4"
          style={{
            border: '1px dashed rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-heading font-black text-foreground-muted/40"
              style={{
                fontSize: '0.85rem',
                border: '1px dashed rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              '21
            </div>
            <div>
              <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.82rem' }}>
                XR Asia Summit 2021
              </p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(107,127,163,0.5)' }}>
                25–27 Nov · 100+ Attendees · Photo archive coming soon
              </p>
            </div>
          </div>
          <span className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-foreground-muted/35">
            Inaugural
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
