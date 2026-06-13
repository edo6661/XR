import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import PastEventCard from './PastEventCard';
import SilverBlobBackground from './SilverBlobBackground';
import SectionEyebrow from '../ui/SectionEyebrow';
import { motion } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);
const UPCOMING_EVENTS = [
  {
    title: '4th XR Asia Summits 2026',
    date: '1 – 3 Dec 2026',
    location: 'Malaysia International Trade and Exhibition Centre (MITEC), Kuala Lumpur',
    description:
      "One platform, 7 Experiences – Conference • Expo • Workshops • Masterclasses • Hackathon Grandfinals • Esports Tournament • Awards & Gala.",
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
    description: 'A prelude to XR Asia Summit – Innovation • Culture • Technology • Future Talent',
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
      '4 Universities from Malaysia, 1 University from Singapore, 1 University from Indonesia • 72-hour run of show – Hands-on challenges, mentorship from industry leaders, pressure-tested workflows.',
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
    title: 'XR Asia Summit 2021',
    date: '25 – 27 November 2021',
    attendees: '100+',
    highlight:
      "XR Asia Summit 2021 marked the beginning of what would become Asia's definitive platform for the immersive technology ecosystem. Launched in 2021, the inaugural edition took the form of a focused webinar-led conference, bringing together a curated group of XR practitioners, technology enthusiasts, and industry voices to explore the then-emerging landscape of Extended Reality. Modest in scale but deliberate in vision, the Summit established its core pillars — knowledge sharing, industry dialogue, and community building — laying the groundwork for a growing ecosystem that the XR industry in Asia sorely needed.",
    imageSrc: '/event-highlight-images/XRAS22 (a).png',
    accentColor: '#7c3aed',
  },
  {
    year: '2022',
    title: 'XR Asia Summit 2022',
    date: '11 – 13 November 2022',
    attendees: '200+',
    highlight:
      'Building on the momentum of its inaugural year, XR Asia Summit 2022 expanded beyond the virtual space into a full in-person experience — bringing together leading minds, practitioners, and influencers from across the Extended Reality industry under one roof. The three-day event featured an XR solutions showcase, hands-on workshops, and curated sessions designed to move beyond surface-level conversation into meaningful exchange. With over 200 attendees, the Summit demonstrated a clear appetite for a dedicated XR platform in Asia, and signaled that this was only the beginning.',
    imageSrc: '/past-event-pics/Conference2_revision.png',
    accentColor: '#0e7490',
  },
  {
    year: '2023',
    title: 'XR Asia Summit 2023',
    date: '27 – 29 September 2023',
    attendees: '500+',
    highlight:
      "XR Asia Summit 2023 arrived at a new scale entirely. Held as part of the Malaysia Digital Content Festival 2023 — in collaboration with Broadcast Elements Sdn Bhd and the Malaysia Digital Economy Corporation (MDEC) — the Summit grew to over 500 attendees, more than doubling its previous reach. The expanded programme brought together visionaries across Virtual Production, XR technology, and immersive tech, with a richer lineup of activations spanning a multi-track Conference, hands-on Workshops, and a full-scale Expo floor. What began as a webinar in 2021 had, by 2023, grown into a premier industry event — cementing the XR Asia Summit's position as the region's leading platform for innovation and cross-sector collaboration within the XR ecosystem.",
    imageSrc: '/past-event-pics/Conference3_revision.png',
    accentColor: '#ea580c',
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
          <span className="gradient-text-accent">
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
      </div>

      {/* ══ PAST EVENTS — Silver glass + neomorphism ═══════════════════ */}
      <div className="relative w-full mt-16 md:mt-24">
        <div
          className="relative z-10 w-full overflow-hidden pt-14 md:pt-20 pb-12 md:pb-16"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.92)',
            borderBottom: '1px solid rgba(255,255,255,0.65)',
            boxShadow:
              '0 -1px 0 rgba(255,255,255,0.5), 0 40px 100px -40px rgba(60,80,120,0.32), inset 0 1px 0 rgba(255,255,255,1)',
          }}
        >
          <SilverBlobBackground idPrefix="past-events" />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <SectionEyebrow tone="light">Track Record</SectionEyebrow>
            <div className="flex flex-col mb-16">
              <h2
                ref={pastHeadRef}
                className="font-heading font-black opacity-0"
                style={{
                  fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                  letterSpacing: '0.03em',
                  color: '#101e36',
                }}
              >
                Past{' '}
                <span className="text-accent">
                  Events Highlights
                </span>
              </h2>
            </div>

            {/* ── Timeline Container ── */}
            <div className="relative w-full pb-10">
              {/* Garis vertikal timeline tengah (Desktop) — neomorphic etched line */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
                style={{
                  background: 'transparent',
                  boxShadow:
                    '-0.5px 0 0 rgba(255,255,255,0.8), 0.5px 0 0 rgba(150,170,200,0.35)',
                }}
              />
              {/* Garis vertikal timeline kiri (Mobile) */}
              <div
                className="md:hidden absolute left-[21px] top-0 bottom-0 w-[1px]"
                style={{
                  background: 'transparent',
                  boxShadow:
                    '-0.5px 0 0 rgba(255,255,255,0.8), 0.5px 0 0 rgba(150,170,200,0.35)',
                }}
              />

              <div className="flex flex-col gap-16 md:gap-24 relative z-10">
                {PAST_EVENTS.map((ev, i) => (
                  <PastEventCard key={`${ev.year}-${ev.title}`} index={i} {...ev} />
                ))}
              </div>
            </div>

            {/* ── Stats bar — Silver neomorphic inset (concave) ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden mt-14"
              style={{
                background: 'linear-gradient(145deg, rgba(218,226,240,0.88), rgba(242,246,255,0.85))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.88)',
                boxShadow: `
                  inset 5px 5px 16px rgba(158,174,202,0.44),
                  inset -5px -5px 14px rgba(255,255,255,1),
                  0 1px 0 rgba(255,255,255,1)
                `,
              }}
            >
              {/* Top shine crisp */}
              <div
                className="absolute top-0 inset-x-0 h-[1.5px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 8%, rgba(255,255,255,1) 38%, rgba(255,255,255,1) 62%, transparent 92%)',
                }}
                aria-hidden="true"
              />
              {/* Accent color strip — satu-satunya hint warna di stats bar */}
              <div
                className="absolute top-0 inset-x-0 h-[2.5px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 8%, rgba(239,120,61,0.55) 32%, rgba(239,120,61,0.55) 68%, transparent 92%)',
                }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                {[
                  { value: '1,430+', label: 'Total Attendees', sub: 'Across all editions' },
                  { value: '40+', label: 'Workshops Delivered', sub: 'Expert-led sessions' },
                  { value: '75+', label: 'Partners', sub: 'Government, industry & studios' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-center py-8 px-6 text-center gap-1.5"
                  >
                    {/* Etched vertical divider antar stat */}
                    {i > 0 && (
                      <div
                        className="absolute left-0 top-1/4 bottom-1/4 w-px hidden sm:block"
                        style={{
                          background: 'transparent',
                          boxShadow: '-0.5px 0 0 rgba(255,255,255,0.9), 0.5px 0 0 rgba(148,165,196,0.25)',
                        }}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className="font-heading font-black leading-none text-accent"
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        filter: 'drop-shadow(0 1.5px 0 rgba(255,255,255,0.9))',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-heading font-bold text-sm uppercase tracking-[0.07em]"
                      style={{ color: '#1a2e50' }}
                    >
                      {stat.label}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'rgba(26,46,80,0.82)' }}>
                      {stat.sub}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EventsSection;