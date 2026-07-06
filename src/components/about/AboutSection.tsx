import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import StatCard from './StatCard';


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
    image: '/about-icons/Mastery.png',
    label: 'Building Immersive Tech Mastery',
    accentColor: '#fb923c',
  },
  {
    image: '/about-icons/Growth.png',
    label: 'Scaling Industry Growth and Talent',
    accentColor: '#22d3ee',
  },
  {
    image: '/about-icons/Capabilities.png',
    label: 'Cultivating New Capability',
    accentColor: '#a78bfa',
  },
  {
    image: '/about-icons/Collaboration.png',
    label: 'Enabling Collaboration',
    accentColor: '#38bdf8',
  },
  {
    image: '/about-icons/Launchpad.png',
    label: "Powering Malaysia's XR Launchpad",
    accentColor: '#fbbf24',
  },
];

const IntroBar = ({ children }: { children: React.ReactNode }) => (
  <div
    className="inline-flex items-center px-4 py-2 rounded-sm"
    style={{
      border: '1px solid rgba(251, 191, 36, 0.42)',
      background: 'rgba(8, 12, 24, 0.68)',
      boxShadow: 'inset 0 0 24px rgba(251, 146, 60, 0.08), 0 12px 34px rgba(0,0,0,0.18)',
    }}
  >
    <span
      className="font-heading font-bold uppercase tracking-[0.22em]"
      style={{ fontSize: '0.95rem', color: 'rgba(251, 191, 36, 0.92)' }}
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
      className="relative w-full overflow-hidden isolate"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        backgroundColor: '#0f1d34',
        background:
          'linear-gradient(180deg, #050b18 0%, #0f1d34 42%, #243c61 78%, #6f87a8 100%)',
      }}
    >
      {/* Louis opening keyart — atmospheric backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={OPENING_KEYART}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
          style={{ objectPosition: '50% 20%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,11,24,0.78) 0%, rgba(15,29,52,0.82) 46%, rgba(36,60,97,0.76) 78%, rgba(111,135,168,0.58) 100%)',
          }}
        />
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 -right-32 w-[680px] h-[680px] rounded-full opacity-[0.22]"
          style={{ background: 'radial-gradient(circle, #c3d2e8 0%, transparent 68%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
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
              color: '#f8faff',
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
              { text: 'INNOVATION IN ACTION.', accent: false },
              { text: 'REALITY REDEFINED.', accent: true },
            ].map((line) => (
              <div key={line.text} className="overflow-hidden">
                <h2
                  data-line
                  className={`font-heading font-black leading-[0.93] uppercase${line.accent ? ' gradient-text-accent' : ''}`}
                  style={{
                    fontSize: 'clamp(2rem, 4.8vw, 3.6rem)',
                    letterSpacing: '0.04em',
                    ...(!line.accent ? { color: '#f8faff' } : {}),
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
              className="font-heading font-bold"
              style={{
                fontSize: 'clamp(1.15rem, 2.4vw, 1.55rem)',
                color: '#f8faff',
                lineHeight: 1.25,
              }}
            >
              XR Asia Summit 2026: FROM VISION TO DEPLOYMENT
            </h3>

            <p
              data-para
              className="text-base leading-[1.75]"
              style={{ color: 'rgba(216,228,246,0.88)' }}
            >
              What began as a response to disruption has become the Launchpad for execution.{' '}
              <span className="text-accent font-semibold">XR Asia Summit 2026</span> unites the
              visionaries, builders, and decision-makers driving the future of{' '}
              <span className="font-semibold" style={{ color: '#f8faff' }}>
                AI, Extended Reality, and Spatial Media
              </span>
              {' '}— not as prototypes, but as production-ready systems transforming enterprise,
              broadcast, and competitive media.
            </p>

            <p
              data-para
              className="text-base leading-[1.75]"
              style={{ color: 'rgba(216,228,246,0.88)' }}
            >
              Over three electrifying days, XRAS2026 delivers:
            </p>

            <ul
              data-para
              className="flex flex-col gap-3.5 text-base leading-[1.75] list-none pl-0"
              style={{ color: 'rgba(216,228,246,0.88)' }}
            >
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

            <p
              data-para
              className="text-base leading-[1.75]"
              style={{ color: 'rgba(216,228,246,0.88)' }}
            >
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-3"
              >
                {/* Light glass card keeps the icon artwork prominent on the brighter page */}
                <div
                  className="relative flex flex-col items-center justify-end w-full aspect-square rounded-lg overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(240,244,252,0.76) 100%)',
                    border: `1px solid ${pillar.accentColor}24`,
                    boxShadow: `0 12px 34px rgba(30,58,138,0.08), inset 0 1px 0 rgba(255,255,255,0.95), 0 0 22px ${pillar.accentColor}12`,
                  }}
                >
                  {/* Image — besar, center atas */}
                  <img
                    src={pillar.image}
                    alt={pillar.label}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                    style={{
                      filter: `drop-shadow(0 8px 18px rgba(30,58,138,0.14)) drop-shadow(0 0 18px ${pillar.accentColor}35)`,
                    }}
                  />
                  {/* Gradient overlay bawah untuk label */}
                  <div
                    className="relative z-10 w-full px-3 pb-3 pt-8"
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.78) 58%, transparent 100%)',
                    }}
                  >
                    <p
                      className="font-heading font-bold leading-snug"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--theme-on-light-heading)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {pillar.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-12 text-center font-heading font-bold max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              color: '#f8faff',
              lineHeight: 1.5,
            }}
          >
            This is the next phase where{' '}
            <span className="text-accent">Asia builds its spatial future.</span>
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
