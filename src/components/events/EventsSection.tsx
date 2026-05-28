import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import PastEventCard from './PastEventCard';

gsap.registerPlugin(ScrollTrigger);

// ── Upcoming events data ───────────────────────────────────────────────────
const UPCOMING_EVENTS = [
  {
    title: '4th XR Asia Summit 2026',
    subtitle: 'Flagship · XRAS26',
    date: 'TBC 2026',
    location: 'Kuala Lumpur, MY',
    description:
      'The fourth edition of Asia\'s premier XR event. Bigger keynotes, deeper workshops, and the most ambitious immersive showcase yet.',
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
      'The world\'s leading conference and exhibition on computer graphics, interactive techniques, and immersive experiences.',
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
      'Augmented World Expo — the world\'s largest XR industry event returns to Asia with cutting-edge AR/VR showcases.',
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
      'Asia\'s premier broadcast and media technology show, featuring immersive production and spatial media tracks.',
    accentColor: '#f472b6',
    tag: 'Partner',
    isFeatured: false,
  },
];

// ── Past events data ────────────────────────────────────────────────────────
const PAST_EVENTS = [
  {
    year: '2023',
    title: 'XR Asia Summit 2023',
    attendees: '300+',
    speakers: '35+',
    highlight:
      'Third edition brought together Southeast Asia\'s largest gathering of XR professionals with live metaverse demos and enterprise case studies.',
    imageSrc: '/xr-asia-summit-2023.jpeg',
    accentColor: '#fb923c',
  },
  {
    year: '2022',
    title: 'XR Asia Summit 2022',
    attendees: '250+',
    speakers: '30+',
    highlight:
      'Landmark edition featuring the first-ever XR × Sports track and the Broadcast Digital Awards ceremony recognising Asia\'s innovators.',
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

// ── Section label component ────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-14">
    <span className="w-6 h-px bg-accent/60" />
    <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-accent/80">
      {children}
    </span>
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pastHeadRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Heading reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      [headingRef, pastHeadRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Subtle marquee-like horizontal scroll on the award image row
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split upcoming: 1 featured + 2 rows of 2
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
      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.05] rounded-full"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.05] rounded-full"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ══ UPCOMING EVENTS ════════════════════════════════════════════ */}
        <SectionLabel>Upcoming Events</SectionLabel>

        <h2
          ref={headingRef}
          className="font-heading font-black text-foreground mb-12 opacity-0"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
        >
          Event{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f0f4ff 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Spotlights
          </span>
        </h2>

        {/* Featured + two secondary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <SpotlightCard index={0} {...featured} />
          </div>
          <div className="flex flex-col gap-4">
            {secondary.map((ev, i) => (
              <SpotlightCard key={ev.title} index={i + 1} {...ev} />
            ))}
          </div>
        </div>

        {/* Two tertiary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-28">
          {tertiary.map((ev, i) => (
            <SpotlightCard key={ev.title} index={i + 3} {...ev} />
          ))}
        </div>

        {/* ══ AWARD BANNER ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl overflow-hidden mb-28"
          style={{
            background: 'rgba(13,27,46,0.7)',
            border: '1px solid rgba(251,146,60,0.2)',
            boxShadow: '0 0 60px rgba(251,146,60,0.06)',
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div ref={marqueeRef} className="flex items-center h-full w-[110%]">
              <img
                src="/award-1600x329-removebg-preview.png"
                alt="XR Summits Award"
                className="w-full object-contain opacity-20"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-10">
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-accent/80">
                Industry Recognition
              </p>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Award-Winning Event Series
              </h3>
              <p className="text-sm text-foreground-muted max-w-md">
                Recognised by leading industry bodies for advancing immersive technology adoption across Asia.
              </p>
            </div>
            <img
              src="/award-1600x329-removebg-preview.png"
              alt="Award logo"
              className="h-14 w-auto object-contain flex-shrink-0"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </motion.div>

        {/* ══ PAST EVENTS ═════════════════════════════════════════════════ */}
        <SectionLabel>Track Record</SectionLabel>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2
            ref={pastHeadRef}
            className="font-heading font-black text-foreground opacity-0"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.04em' }}
          >
            Past{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #f0f4ff 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Events
            </span>
          </h2>

          {/* Timeline decoration */}
          <div className="hidden sm:flex items-center gap-2 pb-1">
            {['2021', '2022', '2023', '2026'].map((yr, i, arr) => (
              <div key={yr} className="flex items-center gap-2">
                <span
                  className="text-[0.6rem] font-heading font-bold tracking-widest"
                  style={{ color: i === arr.length - 1 ? '#fb923c' : '#6b7fa3' }}
                >
                  {yr}
                </span>
                {i < arr.length - 1 && (
                  <div className="w-6 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAST_EVENTS.map((ev, i) => (
            <PastEventCard key={`${ev.year}-${ev.title}`} index={i} {...ev} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;