import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import {
  AIIcon,
  BuildingIcon,
  GlobeIcon,
  SpatialIcon,
  TalentIcon,
} from './page/aboutIcons';

gsap.registerPlugin(ScrollTrigger);

const OPENING_KEYART = '/random/opening-page-for-all-louis-said.jpeg';

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

const DELIVERABLES = [
  'A high-impact conference programme packed with industry insights and technical deep-dives.',
  'A curated technology expo showcasing breakthrough solutions.',
  'Hands-on workshops and coaching sessions for real-world skills.',
  'Live esports tournaments redefining broadcast XR.',
];

const PILLARS = [
  {
    icon: <SpatialIcon />,
    label: 'Immersive Tech Mastery',
    accentColor: '#fb923c',
  },
  {
    icon: <TalentIcon />,
    label: 'Fueling Industry, Driving Growth. Building Talent',
    accentColor: '#22d3ee',
  },
  {
    icon: <AIIcon />,
    label: 'Driving Industry Evolution, Cultivating New Capabilities',
    accentColor: '#a78bfa',
  },
  {
    icon: <GlobeIcon />,
    label: 'Empowering Industry Through Shared Innovation',
    accentColor: '#38bdf8',
  },
  {
    icon: <BuildingIcon />,
    label: 'A Launchpad for XR Partnerships in Malaysia',
    accentColor: '#fbbf24',
  },
];

const IntroBar = ({ children }: { children: React.ReactNode }) => (
  <div
    className="inline-flex items-center px-4 py-2 rounded-sm"
    style={{
      border: '1px solid rgba(251, 191, 36, 0.45)',
      background: 'rgba(8, 12, 24, 0.72)',
      boxShadow: 'inset 0 0 24px rgba(251, 146, 60, 0.06)',
    }}
  >
    <span
      className="font-heading font-bold uppercase tracking-[0.22em]"
      style={{ fontSize: '0.62rem', color: 'rgba(251, 191, 36, 0.92)' }}
    >
      {children}
    </span>
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (taglineRef.current) {
        const lines = taglineRef.current.querySelectorAll('[data-line]');
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
              trigger: taglineRef.current,
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
      }}
    >
      {/* Louis opening keyart — atmospheric backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={OPENING_KEYART}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
          style={{ objectPosition: '50% 20%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,11,24,0.55) 0%, rgba(5,11,24,0.88) 45%, rgba(5,11,24,0.96) 100%)',
          }}
        />
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 68%)' }}
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
        {/* ══ OPENING HEADER ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p
            className="font-heading font-black uppercase tracking-[0.12em] mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#f0f4ff',
              lineHeight: 1,
            }}
          >
            Welcome
          </p>
          <IntroBar>XR ASIA SUMMIT &apos;26 — INTRODUCTION</IntroBar>
        </motion.div>

        {/* Two-column: tagline top-left, introduction body right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          {/* LEFT — client: tagline top left */}
          <div ref={taglineRef} style={{ perspective: '900px' }}>
            {[
              { text: 'INNOVATION IN ACTION .', accent: false },
              { text: 'REALITY REDEFINED.', accent: true },
            ].map((line) => (
              <div key={line.text} className="overflow-hidden">
                <h2
                  data-line
                  className={`font-heading font-black leading-[0.93] uppercase${line.accent ? ' gradient-text-accent' : ''}`}
                  style={{
                    fontSize: 'clamp(2rem, 4.8vw, 3.6rem)',
                    letterSpacing: '0.04em',
                    ...(!line.accent ? { color: '#f0f4ff' } : {}),
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

          {/* RIGHT — introduction copy from Louis opening page */}
          <div ref={bodyRef} className="flex flex-col justify-start gap-6">
            <h3
              data-para
              className="font-heading font-bold text-foreground"
              style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.55rem)', lineHeight: 1.25 }}
            >
              XR Asia Summit 2026: From Disruption to Deployment
            </h3>

            <p data-para className="text-base text-foreground leading-[1.75]">
              What began as a response to disruption has become the Launchpad for execution.{' '}
              <span className="text-accent font-semibold">XR Asia Summit 2026</span> unites the
              visionaries, builders, and decision-makers driving the future of{' '}
              <span className="font-semibold text-foreground">AI, Extended Reality, and Spatial Media</span>
              {' '}— not as prototypes, but as production-ready systems transforming enterprise,
              broadcast, and competitive media.
            </p>

            <p data-para className="text-copy-bright text-base leading-[1.75]">
              Over three electrifying days, XRAS2026 delivers:
            </p>

            <ul data-para className="flex flex-col gap-3.5 text-copy-bright text-base leading-[1.75] list-none pl-0">
              {DELIVERABLES.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-[0.55em] shrink-0 w-1.5 h-1.5 rounded-full bg-accent/80"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p data-para className="text-base text-foreground leading-[1.75]">
              The prestigious{' '}
              <span className="text-accent font-semibold">AiXR Awards Night</span>, celebrating
              excellence across the region.
            </p>

            <p
              data-para
              className="font-semibold"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(251,146,60,0.85)',
                lineHeight: 1.65,
                letterSpacing: '0.01em',
              }}
            >
              From immersive demos to competitive arenas, XR Asia Summit 2026 is where innovation
              meets implementation — and where immersive technology moves boldly.
            </p>
          </div>
        </div>

        {/* ══ PILLARS ══════════════════════════════════════════════════ */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <IntroBar>XR ASIA SUMMIT &apos;26 — PILLARS</IntroBar>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '72px',
                    height: '72px',
                    background: `radial-gradient(circle at 35% 30%, ${pillar.accentColor}18 0%, rgba(8,14,28,0.85) 70%)`,
                    border: `1.5px solid ${pillar.accentColor}55`,
                    boxShadow: `0 0 28px ${pillar.accentColor}22, inset 0 0 20px ${pillar.accentColor}0a`,
                    color: pillar.accentColor,
                  }}
                >
                  {pillar.icon}
                </div>
                <p
                  className="font-heading font-semibold leading-snug"
                  style={{ fontSize: '0.72rem', color: 'rgba(240,244,255,0.88)', letterSpacing: '0.02em' }}
                >
                  {pillar.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-12 text-center font-heading font-bold max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.5 }}
          >
            This is the next phase where{' '}
            <span className="gradient-text-accent">Asia builds its spatial future.</span>
          </motion.p>
        </div>

        {/* ══ STATS ROW ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
      </div>
    </section>
  );
};

export default AboutSection;
