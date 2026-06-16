import { motion } from 'framer-motion';
import SectionEyebrow from '../../ui/SectionEyebrow';
import { SUSTAINABILITY_COMMITMENT } from '../../../core/content/aboutPage';

const GREEN = '#3d9b6e';

const { images } = SUSTAINABILITY_COMMITMENT;

const bodyStyle = {
  fontSize: 'clamp(0.82rem, 1.8vw, 0.9rem)',
  color: 'rgba(232, 245, 236, 0.88)',
  lineHeight: 1.7,
} as const;

const SustainabilityCommitmentSection = () => (
  <section
    id="sustainability"
    className="relative w-full overflow-hidden"
    style={{
      paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
      paddingBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
      backgroundColor: '#fafbfd',
      background: `
        linear-gradient(
          to bottom,
          rgba(5,5,5,1) 0%,
          rgba(10,22,16,0.97) 18%,
          rgba(14,38,28,0.92) 38%,
          rgba(28,58,44,0.78) 58%,
          rgba(120,150,130,0.45) 78%,
          rgba(195,210,200,0.82) 90%,
          #fafbfd 100%
        )
      `,
    }}
  >
    {/* Ambient green glow — bridges awards (dark) into footer (light) */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[min(720px,92vw)] h-[420px]"
        style={{
          background: `radial-gradient(ellipse, ${GREEN}55 0%, transparent 68%)`,
          filter: 'blur(72px)',
          opacity: 0.35,
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-[45%]"
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 50% 100%, rgba(205,218,210,0.55) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      <SectionEyebrow align="center">{SUSTAINABILITY_COMMITMENT.eyebrow}</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow:
            '0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset',
        }}
      >
        {/* Hero atmosphere — hand + holographic globe */}
        <img
          src={images.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[65%_40%] scale-105"
          loading="lazy"
          aria-hidden="true"
        />

        {/* Layered overlays for legibility + green agenda tone */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                118deg,
                rgba(6,18,12,0.94) 0%,
                rgba(8,32,22,0.88) 42%,
                rgba(10,28,20,0.72) 68%,
                rgba(6,16,12,0.82) 100%
              )
            `,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 78% 35%, ${GREEN}44 0%, transparent 52%)`,
          }}
          aria-hidden="true"
        />

        {/* Decorative earth — transparent PNG, soft float */}
        <img
          src={images.earth}
          alt=""
          className="absolute -right-6 top-6 w-[min(200px,38vw)] h-auto opacity-[0.22] pointer-events-none hidden sm:block"
          loading="lazy"
          aria-hidden="true"
        />

        <div className="relative z-10 p-5 md:p-7 lg:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-7 lg:gap-10 lg:items-start">
            {/* Left — title + footprint inset (client reference layout) */}
            <div className="flex flex-col gap-5">
              <h2
                className="font-heading font-bold uppercase tracking-[0.04em]"
                style={{
                  fontSize: 'clamp(1.25rem, 2.6vw, 1.65rem)',
                  lineHeight: 1.2,
                  color: '#f8faff',
                }}
              >
                {SUSTAINABILITY_COMMITMENT.title}
              </h2>

              <div
                className="relative overflow-hidden rounded-lg shrink-0"
                style={{
                  border: '2px solid rgba(255,255,255,0.85)',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                  maxWidth: '280px',
                }}
              >
                <img
                  src={images.footprint}
                  alt="Ecological footprint formed from green leaves"
                  className="w-full aspect-[4/5] object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right — intro + commitments */}
            <div className="flex flex-col gap-4 lg:pt-1">
              <p style={bodyStyle}>{SUSTAINABILITY_COMMITMENT.intro}</p>

              <div>
                <p
                  className="font-heading font-semibold mb-3"
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(248,250,255,0.95)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {SUSTAINABILITY_COMMITMENT.practiceLead}
                </p>

                <ul className="flex flex-col gap-2.5">
                  {SUSTAINABILITY_COMMITMENT.practices.map((item) => (
                    <li key={item} className="flex gap-2.5" style={bodyStyle}>
                      <span
                        className="mt-[0.5rem] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'rgba(255,255,255,0.9)' }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className="pt-3"
                style={{
                  ...bodyStyle,
                  fontSize: '0.8rem',
                  color: 'rgba(200,225,210,0.75)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {SUSTAINABILITY_COMMITMENT.closing}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SustainabilityCommitmentSection;
