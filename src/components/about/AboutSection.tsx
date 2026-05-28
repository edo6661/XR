import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import PillarCard from './PillarCard';

gsap.registerPlugin(ScrollTrigger);

// ── Pillar data ────────────────────────────────────────────────────────────
const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const SpatialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.25 7.5l10.5-6 10.5 6v9l-10.5 6-10.5-6v-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3M2.25 7.5l9.75 5.5 9.75-5.5" />
  </svg>
);

const SportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
);

const EnterpriseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

const PILLARS = [
  {
    icon: <AIIcon />,
    title: 'AI × XR Convergence',
    description: 'Explore the intersection of generative AI and spatial computing — from neural rendering to AI-powered XR experiences.',
    accentColor: '#fb923c',
  },
  {
    icon: <SpatialIcon />,
    title: 'Spatial Media',
    description: 'Immersive storytelling, volumetric video, and the future of content creation for VR, AR, and mixed-reality platforms.',
    accentColor: '#22d3ee',
  },
  {
    icon: <SportsIcon />,
    title: 'Traditional Sports × XR',
    description: 'How immersive tech is transforming fan engagement, athlete performance, and sports broadcasting at a global scale.',
    accentColor: '#4ade80',
  },
  {
    icon: <EnterpriseIcon />,
    title: 'Enterprise Adoption',
    description: 'Real-world deployments of XR in manufacturing, healthcare, training, and architecture driving measurable ROI.',
    accentColor: '#a78bfa',
  },
];

const STATS = [
  { value: 500, suffix: '+', label: 'Industry Leaders', sublabel: 'Attendees across all editions', accentColor: '#fb923c' },
  { value: 40, suffix: '+', label: 'Expert Speakers', sublabel: 'Global innovators & practitioners', accentColor: '#22d3ee' },
  { value: 4, suffix: '', label: 'Years of Excellence', sublabel: 'Since the inaugural XRAS 2021', accentColor: '#a78bfa' },
];

// ── Component ──────────────────────────────────────────────────────────────
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // GSAP text-line reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word-by-word
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('[data-word]');
        gsap.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: -20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Body paragraphs
      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll('[data-para]');
        gsap.fromTo(
          paras,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Divider scale
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
    >
      {/* ── Background atmosphere ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Ambient glow top-left */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #1e3a8a 0%, transparent 70%)' }}
        />
        {/* Ambient glow bottom-right */}
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #7e22ce 0%, transparent 70%)' }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Top eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="w-6 h-px bg-accent/60" />
          <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-accent/80">
            About XR Summits
          </span>
        </motion.div>

        {/* ── Two-column layout: heading + body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

          {/* LEFT — Heading */}
          <div ref={headingRef} className="flex flex-col gap-4" style={{ perspective: '800px' }}>
            {[
              { text: 'The Definitive', accent: false },
              { text: 'Platform for', accent: false },
              { text: "Asia's XR", accent: true },
              { text: 'Future.', accent: false },
            ].map((line) => (
              <div key={line.text} className="overflow-hidden">
                <h2
                  data-word
                  className="font-heading font-black leading-[0.95]"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                    letterSpacing: '0.04em',
                    ...(line.accent
                      ? {
                        background: 'linear-gradient(135deg, #fb923c 0%, #f0f4ff 80%)',
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

            {/* Decorative line */}
            <div
              ref={dividerRef}
              className="mt-4 w-20 h-[2px] origin-left"
              style={{
                background: 'linear-gradient(90deg, #fb923c, transparent)',
                boxShadow: '0 0 10px rgba(251,146,60,0.5)',
              }}
            />
          </div>

          {/* RIGHT — Body text */}
          <div ref={bodyRef} className="flex flex-col justify-center gap-6">
            <p
              data-para
              className="text-base text-foreground leading-relaxed"
            >
              <span className="text-accent font-semibold">XR Asia Summit 2026 (XRAS26)</span>{' '}
              is the definitive platform connecting innovators, enterprise leaders, and visionaries
              shaping the future of immersive technology across Asia and the world.
            </p>
            <p data-para className="text-sm text-foreground-muted leading-relaxed">
              From extended reality and spatial computing to AI-driven experiences and the metaverse,
              XRAS26 brings together the brightest minds to showcase, discuss, and deploy the
              technologies redefining how humans interact with the digital world.
            </p>
            <p data-para className="text-sm text-foreground-muted leading-relaxed">
              As the successor to three landmark editions, the 4th XR Asia Summit builds on a
              legacy of breakthrough keynotes, live demos, and cross-industry partnerships — setting
              the stage for what comes next.
            </p>

            {/* CTA */}
            <motion.div
              data-para
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              <a
                href="#events"
                className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-accent hover:text-foreground transition-colors duration-300"
              >
                Explore Events
                <span>→</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-24">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* ── Section divider ── */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-foreground-muted whitespace-nowrap">
            Why XR Future
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ── Pillars grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} index={i} {...p} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;