import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import PastEventCard from './PastEventCard';

gsap.registerPlugin(ScrollTrigger);

// ── Data ───────────────────────────────────────────────────────────────────
const UPCOMING_EVENTS = [
  {
    title: '4th XR Asia Summit 2026',
    subtitle: 'Flagship · XRAS26',
    date: 'TBC 2026',
    location: 'Kuala Lumpur, MY',
    description:
      "The fourth edition of Asia's premier XR event. Bigger keynotes, deeper workshops, and the most ambitious immersive showcase yet.",
    accentColor: '#fb923c',
    tag: 'Flagship',
    to: '/xr-summit',
    imageSrc: '/xr-asia-summit-4th-coming-soon.png',
    isFeatured: true,
  },
  {
    title: "Mothership 26' AI Bootcamp",
    subtitle: 'Intensive · 3 Days',
    date: 'TBC 2026',
    location: 'Kuala Lumpur, MY',
    description:
      'A hands-on AI × XR intensive bootcamp for builders, artists, and technologists ready to ship immersive AI products.',
    accentColor: '#22d3ee',
    tag: 'Bootcamp',
    to: '/mothership',
    isFeatured: false,
  },
  {
    title: 'Siggraph Asia 2025',
    subtitle: 'Partner Event',
    date: 'Nov 2025',
    location: 'Tokyo, JP',
    description:
      "The world's leading conference on computer graphics, interactive techniques, and immersive experiences.",
    accentColor: '#4ade80',
    tag: 'Partner',
    isFeatured: false,
  },
  {
    title: 'AWE Asia 2026',
    subtitle: 'Partner Event',
    date: 'TBC 2026',
    location: 'Asia Pacific',
    description:
      "Augmented World Expo — the world's largest XR industry event returns to Asia with cutting-edge AR/VR showcases.",
    accentColor: '#a78bfa',
    tag: 'Partner',
    isFeatured: false,
  },
  {
    title: 'Broadcast Asia 2026',
    subtitle: 'Partner Event',
    date: 'TBC 2026',
    location: 'Singapore, SG',
    description:
      "Asia's premier broadcast and media technology show, featuring immersive production and spatial media tracks.",
    accentColor: '#f472b6',
    tag: 'Partner',
    isFeatured: false,
  },
];

const PAST_EVENTS = [
  {
    year: '2023',
    title: 'XR Asia Summit 2023',
    attendees: '300+',
    speakers: '35+',
    highlight:
      "Third edition brought together Southeast Asia's largest gathering of XR professionals with live metaverse demos and enterprise case studies.",
    imageSrc: '/xr-asia-summit-2023.jpeg',
    accentColor: '#fb923c',
  },
  {
    year: '2022',
    title: 'XR Asia Summit 2022',
    attendees: '250+',
    speakers: '30+',
    highlight:
      "Landmark edition featuring the first-ever XR × Sports track and the Broadcast Digital Awards ceremony recognising Asia's innovators.",
    imageSrc: '/xr-asia-summit-2022.jpeg',
    accentColor: '#22d3ee',
  },
  {
    year: '2022',
    title: 'Broadcast Digital Award 2022',
    attendees: '200+',
    speakers: '20+',
    highlight:
      'Celebrating excellence in digital broadcasting and immersive media production across the Asia-Pacific region.',
    imageSrc: '/broadcast-digital-award-2022.jpeg',
    accentColor: '#4ade80',
  },
  {
    year: '2021',
    title: 'XR Asia Summit 2021',
    attendees: '150+',
    speakers: '25+',
    highlight:
      'The inaugural XR Asia Summit — a pioneering hybrid event that set the benchmark for immersive technology conferences in Asia.',
    imageSrc: '/xr-asia-summit-2021.jpeg',
    accentColor: '#a78bfa',
  },
];

// ── Section eyebrow (konsisten dengan AboutSection) ────────────────────────
const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
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
      {children}
    </span>
  </motion.div>
);

// ── Main component ─────────────────────────────────────────────────────────
const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pastHeadRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveals
      [headingRef, pastHeadRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: 44, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.95, ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Award banner parallax
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: '-6%',
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = UPCOMING_EVENTS[0];
  const secondary = UPCOMING_EVENTS.slice(1, 3);
  const tertiary = UPCOMING_EVENTS.slice(3);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
    >
      {/* ── Atmospheric bg ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[650px] h-[650px] opacity-[0.045] rounded-full"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04] rounded-full"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 68%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ══ UPCOMING ═══════════════════════════════════════════════════ */}
        <SectionEyebrow>Upcoming Events</SectionEyebrow>

        <h2
          ref={headingRef}
          className="font-heading font-black text-foreground mb-12 opacity-0"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Event{' '}
          <span
            style={{
              background: 'linear-gradient(130deg, #fb923c 0%, #f0f4ff 85%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Spotlights
          </span>
        </h2>

        {/* Featured 2/3 + secondary stack 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
          <div className="lg:col-span-2">
            <SpotlightCard index={0} {...featured} />
          </div>
          <div className="flex flex-col gap-3">
            {secondary.map((ev, i) => (
              <SpotlightCard key={ev.title} index={i + 1} {...ev} />
            ))}
          </div>
        </div>

        {/* Tertiary row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-28">
          {tertiary.map((ev, i) => (
            <SpotlightCard key={ev.title} index={i + 3} {...ev} />
          ))}
        </div>

        {/* ══ AWARD BANNER ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl overflow-hidden mb-28"
          style={{
            background: 'rgba(13,27,46,0.75)',
            border: '1px solid rgba(251,146,60,0.18)',
            boxShadow: '0 0 60px rgba(251,146,60,0.05)',
          }}
        >
          {/* Parallax image behind */}
          <div className="absolute inset-0 overflow-hidden">
            <div ref={marqueeRef} className="flex items-center h-full w-[112%]">
              <img
                src="/award-1600x329-removebg-preview.png"
                alt=""
                className="w-full object-contain opacity-[0.12]"
                loading="lazy"
                aria-hidden="true"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.6) 40%, rgba(251,146,60,0.6) 60%, transparent)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-10">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p
                className="font-bold tracking-[0.45em] uppercase"
                style={{ fontSize: '0.57rem', color: 'rgba(251,146,60,0.72)' }}
              >
                Industry Recognition
              </p>
              <h3
                className="font-heading font-bold text-foreground"
                style={{ fontSize: '1.2rem' }}
              >
                Award-Winning Event Series
              </h3>
              <p
                className="max-w-md leading-relaxed"
                style={{ fontSize: '0.8rem', color: 'rgba(107,127,163,0.85)' }}
              >
                Recognised by leading industry bodies for advancing immersive technology adoption across Asia.
              </p>
            </div>
            <img
              src="/award-1600x329-removebg-preview.png"
              alt="Award logo"
              className="h-12 w-auto object-contain flex-shrink-0 opacity-80"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </motion.div>

        {/* ══ PAST EVENTS ════════════════════════════════════════════════ */}
        <SectionEyebrow>Track Record</SectionEyebrow>

        {/* Past heading + timeline */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2
            ref={pastHeadRef}
            className="font-heading font-black text-foreground opacity-0"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
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
                    color: i === arr.length - 1 ? '#fb923c' : 'rgba(107,127,163,0.4)',
                  }}
                >
                  {yr}
                </span>
                {i < arr.length - 1 && (
                  <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAST_EVENTS.map((ev, i) => (
            <PastEventCard key={`${ev.year}-${ev.title}`} index={i} {...ev} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;