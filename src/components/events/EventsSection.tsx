import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import PastEventCard from './PastEventCard';
import SectionEyebrow from '../ui/SectionEyebrow';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);


const UPCOMING_EVENTS = [
  {
    title: '4th XR Asia Summits 2026',
    date: '1 – 3 Dec 2026',
    location: 'Malaysia International Trade and Exhibition Centre (MITEC), Kuala Lumpur',
    description:
      "One platform, six activations – Conference • Expo • Workshops • Masterclasses • Hackathon Grandfinals • Esports Tournament • Awards & Gala.",
    accentColor: '#fb923c',
    tag: 'Flagship',
    to: '/xras-kl-2026',
    imageSrc: '/3-gateway-images/XR AI Summit 2026_Main Image.jpeg',
    isFeatured: true,
  },
  {
    title: "AI-XR Cultural Innovation Forum",
    date: '16 – 17 Oct 2026',
    location: 'Borneo Convention Centre Kuching (BCCK), Kuching, Sarawak',
    description: 'A prelude to XR Asia Summits – Innovation • Culture • Technology • Future Talent',
    accentColor: '#22d3ee',
    tag: 'Regional',
    to: '/aixr-2026-sarawak',
    imageSrc: '/3-gateway-images/AI-XR Cultural Forum_Main Image-edited.jpeg',
    imagePosition: 'center',
    imageDark: false,
    isFeatured: false,
    imageTransform: 'scale(1.15) translateY(-10%)',
  },
  {
    title: 'AI Filmmaking Hackathon',
    description:
      '4 Universities from Malaysia, 1 University from Singapore, 1 University from Indonesia •	72-hour run of show – Hands-on challenges, mentorship from industry leaders, pressure-tested workflows.',
    accentColor: '#a78bfa',
    tag: 'Hackathon',
    to: '#',
    imageSrc: '/3-gateway-images/AI Filmmaking Hackathon.png',
    isFeatured: false,
  },
];

const PAST_EVENTS = [
  {
    year: '2021',
    title: 'XR Asia Summits',
    attendees: '100+',
    speakers: '25+',
    highlight:
      '',
    imageSrc: '/event-highlight-images/XRAS22 (a).png',
    accentColor: '#a78bfa',
  },
  {
    year: '2022',
    title: '2nd XR Asia Summits',
    attendees: '200+',
    speakers: '30+',
    highlight:
      'The 2nd XR Asia Summits was a dynamic gathering that brought together leading minds and influencers in the Extended Reality industry, featuring an innovative XR solutions showcase, hands-on workshops, and engaging sessions that provided participants with the opportunity to explore cutting-edge technologies, exchange insights, and expand their professional network — leaving attendees inspired and eager to embrace the future of XR. ',
    imageSrc: '/event-highlight-images/XRAS22 (b).png',
    accentColor: '#22d3ee',
  },
  {
    year: '2023',
    title: '3rd XR Asia Summits',
    attendees: '500+',
    speakers: '40+',
    highlight:
      "The 3rd XR Asia Summits brought together leading experts and visionaries across Virtual Production, XR technology, and immersive tech. Held as part of the Malaysia Digital Content Festival 2023, the Summit's Conference, Workshops, and Expo was a joint collaboration between Broadcast Elements Sdn Bhd and the Malaysia Digital Economy Corporation(MDEC), reinforcing its position as a premier platform for driving innovation and industry collaboration within the XR ecosystem.",
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
            Entry Point
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


        {/* ══ PAST EVENTS ════════════════════════════════════════════════ */}
        <SectionEyebrow>Track Record</SectionEyebrow>

        <div className="flex flex-col mb-16">
          <h2
            ref={pastHeadRef}
            className="font-heading font-black text-foreground opacity-0"
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              letterSpacing: '0.03em',
            }}
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
        </div>

        {/* ── Timeline Container ── */}
        <div className="relative w-full pb-10">
          {/* Garis vertikal timeline tengah (Desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 5%, rgba(255,255,255,0.08) 95%, transparent)',
            }}
          />

          {/* Garis vertikal timeline kiri (Mobile) */}
          <div
            className="md:hidden absolute left-[19px] top-0 bottom-0 w-[2px]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 5%, rgba(255,255,255,0.08) 95%, transparent)',
            }}
          />

          {/* Render event secara vertikal */}
          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {PAST_EVENTS.map((ev, i) => (
              <PastEventCard key={`${ev.year}-${ev.title}`} index={i} {...ev} />
            ))}
          </div>
        </div>
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
      </div>

    </section>
  );
};

export default EventsSection;
