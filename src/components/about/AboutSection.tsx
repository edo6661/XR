import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import PillarCard from './PillarCard';

gsap.registerPlugin(ScrollTrigger);

// ── Icons ──────────────────────────────────────────────────────────────────
const EventIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);
const MasterclassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);
const CommunityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

// ── Data sesuai cursorrules ────────────────────────────────────────────────
const PILLARS = [
  {
    icon: <EventIcon />,
    title: 'Premier Event Organiser',
    description:
      'XR Summits is the leading platform for immersive XR technology, bringing together visionaries in Virtual Production, XR technology, and Immersive tech.',
    accentColor: '#fb923c',
    isFeatured: true,
  },
  {
    icon: <MasterclassIcon />,
    title: 'World-Class Masterclass',
    description:
      'Learn from industry experts through our comprehensive masterclass programs covering XR & AI, and cutting-edge virtual production techniques.',
    accentColor: '#22d3ee',
    isFeatured: false,
  },
  {
    icon: <CommunityIcon />,
    title: 'Global XR Community',
    description:
      'Connect with brilliant minds and exceptional leaders who share first-hand experiences, invaluable insights, and expert advice on implementing immersive XR programs.',
    accentColor: '#a78bfa',
    isFeatured: false,
  },

];

const STATS = [
  {
    value: 500,
    suffix: '+',
    label: 'Industry Leaders',
    sublabel: 'Connected across editions',
    accentColor: '#fb923c',
  },
  {
    value: 40,
    suffix: '+',
    label: 'Expert Speakers',
    sublabel: 'Global innovators & practitioners',
    accentColor: '#22d3ee',
  },
  {
    value: 4,
    suffix: '',
    label: 'Years of Excellence',
    sublabel: 'Since the inaugural XRAS 2021',
    accentColor: '#a78bfa',
  },
];

// ── Eyebrow label ──────────────────────────────────────────────────────────
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
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('[data-line]');
        gsap.fromTo(
          lines,
          { y: 72, opacity: 0, rotateX: -18 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll('[data-para]');
        gsap.fromTo(
          paras,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #1e3a8a 0%, transparent 68%)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #7e22ce 0%, transparent 68%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ══ INTRO BLOCK ════════════════════════════════════════════════ */}
        <SectionEyebrow>About XR Summits</SectionEyebrow>

        {/* Two-column: heading left, body right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

          {/* LEFT — large heading */}
          <div ref={headingRef} style={{ perspective: '900px' }}>
            {[
              { text: 'The Definitive', accent: false },
              { text: 'Platform', accent: false },
              { text: "Asia's XR", accent: true },
              { text: 'Future.', accent: false },
            ].map((line) => (
              <div key={line.text} className="overflow-hidden">
                <h2
                  data-line
                  className="font-heading font-black leading-[0.93]"
                  style={{
                    fontSize: 'clamp(2.4rem, 5.2vw, 4rem)',
                    letterSpacing: '0.03em',
                    ...(line.accent
                      ? {
                        background: 'linear-gradient(130deg, #fb923c 0%, #f0f4ff 85%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                      : { color: '#f0f4ff' }),
                  }}
                >
                  {line.text}
                </h2>
              </div>
            ))}

            <div
              ref={dividerRef}
              className="mt-6 w-16 h-[2px] origin-left"
              style={{
                background: 'linear-gradient(90deg, #fb923c, transparent)',
                boxShadow: '0 0 12px rgba(251,146,60,0.55)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* RIGHT — body copy sesuai cursorrules */}
          <div ref={bodyRef} className="flex flex-col justify-center gap-7">
            <p data-para className="text-base text-foreground leading-[1.75]">
              <span className="text-accent font-semibold">XR Summits Sdn Bhd</span>{' '}
              is the definitive platform connecting innovators across Extended Reality (XR), Spatial Media,
              AVXR, immersive technologies, and the evolving future of esports.
            </p>
            <p data-para style={{ fontSize: '0.85rem', color: 'rgba(107,127,163,0.9)', lineHeight: 1.8 }}>
              It serves as the region's central hub for showcasing production-ready solutions and forging
              high-value commercial partnerships. XR Summits represents a decisive shift in the immersive industry.
            </p>
            <p
              data-para
              className="font-semibold"
              style={{ fontSize: '0.9rem', color: 'rgba(251,146,60,0.85)', lineHeight: 1.65, letterSpacing: '0.01em' }}
            >
              Deployment Ready. Innovation in Action. Reality Redefined.
            </p>


          </div>
        </div>

        {/* ══ STATS ROW ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-24">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.11, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatCard {...s} index={i} />
            </motion.div>
          ))}
        </div>

        {/* ══ PILLARS DIVIDER ════════════════════════════════════════════ */}
        <div className="flex items-center gap-5 mb-14">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />
          <span
            className="font-bold tracking-[0.5em] uppercase whitespace-nowrap"
            style={{ fontSize: '0.57rem', color: 'rgba(107,127,163,0.55)' }}
          >
            Why XR Summits
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />
        </div>

        {/* ══ PILLARS GRID ═══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} index={i} {...p} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
