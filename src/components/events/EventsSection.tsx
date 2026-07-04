import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import SectionEyebrow from '../ui/SectionEyebrow';
gsap.registerPlugin(ScrollTrigger);
const FLAGSHIP_EVENTS = [

  // {
  //   title: "AI-XR Cultural Innovation Forum",
  //   date: '16 – 17 Oct 2026',
  //   location: 'Borneo Convention Centre Kuching (BCCK), Kuching, Sarawak',
  //   description: 'A prelude to XR ASIA SUMMIT – Innovation • Culture • Technology • Future Talent',
  //   accentColor: '#22d3ee',
  //   tag: 'AIXR',
  //   to: '/aixr-2026-sarawak',
  //   imageSrc: '/3-gateway-images/AI-XR Cultural Forum_Main Image-edited.jpeg',
  //   imagePosition: 'center',
  //   isFeatured: true,
  // },
  {
    title: 'XR ASIA SUMMIT 2026',
    date: '1 – 3 Dec 2026',
    location: 'Malaysia International Trade and Exhibition Centre (MITEC), Kuala Lumpur',
    description:
      "One platform, 6 Experiences – Conference • Expo • Workshops • Masterclasses • Hackathon Grandfinals • Esports Tournament • Awards & Gala.",
    accentColor: '#fb923c',
    tag: 'XRAS',
    to: '/xras-kl-2026',
    imageSrc: '/hero/new_hero_from_louis_2.png',
    isFeatured: true,
  },
] as const;

const PROGRAMME_HIGHLIGHTS = [
  {
    title: 'AI Filmmaking Hackathon',
    description: '',
    accentColor: '#fb923c',
    tag: 'Hackathon',
    to: '/ai-filmmaking-hackathon',
    imageSrc: '/programme-highlights/AI Filmmaking Hackathon.png',
    imagePosition: '18% center',
    isHero: true,
  },
  {
    title: 'Esports Tournament',
    description:
      '',
    accentColor: '#34d399',
    tag: 'Esports',
    to: '/xras-kl-2026',
    imageSrc: '/programme-highlights/Esports.png',
    imagePosition: 'center',
    isFeatured: false,
  },
  {
    title: 'Gala & Awards',
    description:
      '',
    accentColor: '#f472b6',
    tag: 'Gala',
    to: '/xras-kl-2026',
    imageSrc: '/programme-highlights/Awards & Gala.png',
    imagePosition: 'center',
    isFeatured: false,
  },
] as const;

const [HACKATHON_HIGHLIGHT, ...OTHER_HIGHLIGHTS] = PROGRAMME_HIGHLIGHTS;
// ── Main component ─────────────────────────────────────────────────────────
const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headingRef.current) return;
      gsap.fromTo(
        headingRef.current,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full overflow-hidden isolate"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        backgroundColor: '#6f87a8',
        background:
          'linear-gradient(180deg, #6f87a8 0%, #9fb2cc 46%, #dbe5f2 100%)',
      }}
    >
      {/* Atmospheric bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.16] rounded-full"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[560px] h-[560px] opacity-[0.24] rounded-full"
          style={{ background: 'radial-gradient(circle, #f6f8fc 0%, transparent 68%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ══ UPCOMING ═══════════════════════════════════════════════════ */}
        <SectionEyebrow accent="indigo">Upcoming Events</SectionEyebrow>
        {/* ── Entry points: XRAS + AIXR ── */}
        <h2
          ref={headingRef}
          className="font-heading font-black mb-12 opacity-0"
          style={{
            fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
            color: '#f8faff',
            letterSpacing: '0.03em',
          }}
        >

          <span
            style={{
              background: 'linear-gradient(90deg, #1e3a8a 0%, #3730a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 1px 0 rgba(255,255,255,0.22)',
            }}
          >
            Welcome
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {FLAGSHIP_EVENTS.map((ev, i) => (
            <SpotlightCard key={ev.title} index={i} {...ev} />
          ))}
        </div>

        {/* ── Programme highlights (sub-events under XRAS) ── */}
        <div
          className="mt-14 md:mt-16 pt-10 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.22)' }}
        >
          <SectionEyebrow accent="indigo" className="mb-8">Programme Highlights</SectionEyebrow>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:grid-rows-[repeat(2,minmax(280px,1fr))]">
            <SpotlightCard
              key={HACKATHON_HIGHLIGHT.title}
              index={FLAGSHIP_EVENTS.length}
              {...HACKATHON_HIGHLIGHT}
              className="md:col-span-2 md:row-span-2"
            />
            {OTHER_HIGHLIGHTS.map((ev, i) => (
              <SpotlightCard
                key={ev.title}
                index={i + FLAGSHIP_EVENTS.length + 1}
                {...ev}
                className="md:col-span-1"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default EventsSection;