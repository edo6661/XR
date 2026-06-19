import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import SectionEyebrow from '../ui/SectionEyebrow';
gsap.registerPlugin(ScrollTrigger);
const FLAGSHIP_EVENTS = [

  {
    title: "AI-XR Cultural Innovation Forum",
    date: '16 – 17 Oct 2026',
    location: 'Borneo Convention Centre Kuching (BCCK), Kuching, Sarawak',
    description: 'A prelude to XR ASIA SUMMIT – Innovation • Culture • Technology • Future Talent',
    accentColor: '#22d3ee',
    tag: 'AIXR',
    to: '/aixr-2026-sarawak',
    imageSrc: '/3-gateway-images/AI-XR Cultural Forum_Main Image-edited.jpeg',
    imagePosition: 'center',
    imageDark: false,
    isFeatured: true,
  },
  {
    title: 'XR ASIA SUMMIT 2026',
    date: '1 – 3 Dec 2026',
    location: 'Malaysia International Trade and Exhibition Centre (MITEC), Kuala Lumpur',
    description:
      "One platform, 7 Experiences – Conference • Expo • Workshops • Masterclasses • Hackathon Grandfinals • Esports Tournament • Awards & Gala.",
    accentColor: '#fb923c',
    tag: 'XRAS',
    to: '/xras-kl-2026',
    imageSrc: '/hero/new_hero_from_louis.jpeg',
    isFeatured: true,
  },
] as const;

const PROGRAMME_HIGHLIGHTS = [
  {
    title: 'AI Filmmaking Hackathon',
    description:
      '',
    accentColor: '#fb923c',
    tag: 'Hackathon',
    to: '/ai-filmmaking-hackathon',
    imageSrc: '/programme-highlights/AI Filmmaking Hackathon.png',
    imageFit: 'contain' as const,
    isFeatured: false,
  },
  {
    title: 'Esports Tournament',
    description:
      '',
    accentColor: '#34d399',
    tag: 'Esports',
    to: '/xras-kl-2026',
    imageSrc: '/programme-highlights/Esports.png',
    imageFit: 'contain' as const,
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
    imageFit: 'contain' as const,
    isFeatured: false,
  },
] as const;
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
        {/* ── Entry points: XRAS + AIXR ── */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FLAGSHIP_EVENTS.map((ev, i) => (
            <SpotlightCard key={ev.title} index={i} {...ev} />
          ))}
        </div>

        {/* ── Programme highlights (sub-events under XRAS) ── */}
        <div className="mt-14 md:mt-16 pt-10 border-t border-white/[0.06]">
          <SectionEyebrow className="mb-8">Programme Highlights</SectionEyebrow>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PROGRAMME_HIGHLIGHTS.map((ev, i) => (
              <SpotlightCard key={ev.title} index={i + FLAGSHIP_EVENTS.length} {...ev} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default EventsSection;