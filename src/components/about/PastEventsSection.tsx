import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PastEventCard from '../events/PastEventCard';
import SilverBlobBackground from '../events/SilverBlobBackground';
import SectionEyebrow from '../ui/SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

const PAST_EVENTS = [
  {
    year: '2021',
    title: 'XR ASIA SUMMIT 2021',
    date: '25 – 27 November 2021',
    location: 'Virtual Experience',
    attendees: '100+',
    highlight:
      'XR ASIA SUMMIT launched in 2021 as a focused webinar-led conference — modest in scale but deliberate in vision. It brought together XR practitioners, technology enthusiasts, and industry voices to explore the emerging XR landscape, establishing community building that would define every edition to come.',
    imageSrc: '/event-highlight-images/XRAS22 (a).png',
    accentColor: '#7c3aed',
  },
  {
    year: '2022',
    title: 'XR ASIA SUMMIT 2022',
    date: '11 – 13 November 2022',
    location: 'FINAS Studio Sound Stage UK (Ulu Klang), Malaysia',
    attendees: '200+',
    highlight:
      'The 2022 edition moved beyond the virtual space into a full in-person experience. Over three days, more than 200 attendees gathered for an XR solutions showcase, hands-on workshops, and curated industry sessions — signaling a clear and growing appetite for a dedicated XR platform in Asia.',
    imageSrc: '/past-event-pics/Conference2_revision.png',
    accentColor: '#0e7490',
  },
  {
    year: '2023',
    title: 'XR ASIA SUMMIT 2023',
    date: '27 – 29 September 2023',
    location: 'Kuala Lumpur City Centre (KLCC), Malaysia',
    attendees: '500+',
    highlight:
      "By 2023, the Summit had reached a new scale entirely. Held in collaboration with MDEC and Broadcast Elements as part of the Malaysia Digital Content Festival, the edition welcomed over 500 attendees across a multi-track Conference, Expo, and hands-on Workshops — cementing XR ASIA SUMMIT's position as the region's leading platform for immersive technology and cross-sector collaboration.",
    imageSrc: '/past-event-pics/Conference3_revision.png',
    accentColor: '#ea580c',
  },
] as const;

const PastEventsSection = () => {
  const pastHeadRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!pastHeadRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pastHeadRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pastHeadRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="relative z-10 w-full overflow-hidden pt-12 md:pt-16 pb-10 md:pb-14"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.65)',
          boxShadow:
            '0 -1px 0 rgba(255,255,255,0.5), 0 40px 100px -40px rgba(60,80,120,0.32), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        <SilverBlobBackground idPrefix="about-past-events" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <SectionEyebrow tone="light">Track Record</SectionEyebrow>
          <div className="flex flex-col mb-10 md:mb-12">
            <h2
              ref={pastHeadRef}
              className="font-heading font-black opacity-0 text-on-light-heading"
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.15rem)',
                letterSpacing: '0.03em',
              }}
            >
              Past{' '}
              <span className="text-accent">Events Highlights</span>
            </h2>
          </div>

          <div className="relative w-full pb-6">
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{
                background: 'transparent',
                boxShadow:
                  '-0.5px 0 0 rgba(255,255,255,0.8), 0.5px 0 0 rgba(150,170,200,0.35)',
              }}
            />
            <div
              className="md:hidden absolute left-[17px] top-0 bottom-0 w-px"
              style={{
                background: 'transparent',
                boxShadow:
                  '-0.5px 0 0 rgba(255,255,255,0.8), 0.5px 0 0 rgba(150,170,200,0.35)',
              }}
            />

            <div className="flex flex-col gap-10 md:gap-14 relative z-10">
              {PAST_EVENTS.map((ev, i) => (
                <PastEventCard key={`${ev.year}-${ev.title}`} index={i} compact {...ev} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-xl overflow-hidden mt-10 md:mt-12"
            style={{
              border: '1px solid rgba(255,255,255,0.88)',
              boxShadow: '0 16px 48px rgba(60,80,120,0.18), inset 0 1px 0 rgba(255,255,255,1)',
            }}
          >
            <img
              src="/random/events.jpeg"
              alt="XR Asia Summit community on stage at IMMERSE KL"
              className="w-full aspect-21/9 object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(18,28,48,0.72) 0%, rgba(18,28,48,0.12) 45%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <p
              className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-6 font-mono uppercase tracking-[0.14em]"
              style={{ fontSize: '0.62rem', color: 'rgba(240,244,255,0.92)' }}
            >
              Community in action · IMMERSE KL
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-xl overflow-hidden mt-10"
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
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent 8%, rgba(255,255,255,1) 38%, rgba(255,255,255,1) 62%, transparent 92%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-0 inset-x-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 8%, rgba(239,120,61,0.55) 32%, rgba(239,120,61,0.55) 68%, transparent 92%)',
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 py-1">
              {[
                { value: '1,430+', label: 'Total Attendees' },
                { value: '40+', label: 'Total Workshops' },
                { value: '75+', label: 'Partners' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center py-6 px-5 text-center gap-1"
                >
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
                      fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                      filter: 'drop-shadow(0 1.5px 0 rgba(255,255,255,0.9))',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PastEventsSection;
