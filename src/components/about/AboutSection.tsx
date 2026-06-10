import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import StatCard from './StatCard';

gsap.registerPlugin(ScrollTrigger);

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
              { text: 'Platform of', accent: false },
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
              <span className="text-accent font-semibold">XR Summits </span>{' '}
              is connecting innovators across Extended Reality (XR), Spatial Media, AVXR, immersive technologies, and the evolving future of esports.
            </p>
            <p data-para style={{ fontSize: '0.85rem', color: 'rgba(107,127,163,0.9)', lineHeight: 1.8 }}>
              It serves as the region’s central hub for showcasing production-ready solutions and forging high-value commercial partnerships. XR Summits represents a decisive shift in the immersive industry.
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





      </div>
    </section>
  );
};

export default AboutSection;
