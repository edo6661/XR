import { motion } from 'framer-motion';
import SectionEyebrow from '../../ui/SectionEyebrow';
import { SUSTAINABILITY_COMMITMENT } from '../../../core/content/aboutPage';

const ACCENT = '#fb923c';

const bodyStyle = {
  fontSize: 'clamp(0.8rem, 1.8vw, 0.875rem)',
  color: 'var(--theme-on-light-muted)',
  lineHeight: 1.65,
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
          rgba(18,26,48,0.95) 28%,
          rgba(100,125,170,0.55) 58%,
          rgba(195,210,232,0.9) 82%,
          #fafbfd 100%
        )
      `,
    }}
  >
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute bottom-0 inset-x-0 h-[50%]"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(205,218,240,0.65) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      <SectionEyebrow align="center">{SUSTAINABILITY_COMMITMENT.eyebrow}</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-xl overflow-hidden"
        style={{
          background:
            'linear-gradient(145deg, rgba(218,226,240,0.88) 0%, rgba(240,244,252,0.84) 100%)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow:
            '0 12px 40px rgba(30,58,138,0.08), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        <div
          className="absolute top-0 left-0 bottom-0 w-[3px]"
          style={{ background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}30)` }}
          aria-hidden="true"
        />

        <div className="relative p-5 md:p-7 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 lg:items-start">
            {/* Left — headline + intro + closing */}
            <div className="flex flex-col gap-4">
              <h2
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
                  lineHeight: 1.25,
                  color: 'var(--theme-on-light-heading)',
                }}
              >
                {SUSTAINABILITY_COMMITMENT.titleLead}{' '}
                <span className="text-accent">{SUSTAINABILITY_COMMITMENT.titleAccent}</span>
              </h2>

              <p style={bodyStyle}>{SUSTAINABILITY_COMMITMENT.intro}</p>

              <p
                className="hidden lg:block pt-1"
                style={{
                  ...bodyStyle,
                  fontSize: '0.8rem',
                  borderTop: '1px solid rgba(26,46,80,0.1)',
                  paddingTop: '0.875rem',
                }}
              >
                {SUSTAINABILITY_COMMITMENT.closing}
              </p>
            </div>

            {/* Right — practices in 2-col grid */}
            <div>
              <p
                className="font-heading font-semibold mb-3"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--theme-on-light-heading)',
                  letterSpacing: '0.03em',
                }}
              >
                {SUSTAINABILITY_COMMITMENT.practiceLead}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                {SUSTAINABILITY_COMMITMENT.practices.map((item) => (
                  <li key={item} className="flex gap-2.5" style={bodyStyle}>
                    <span
                      className="mt-[0.45rem] w-1 h-1 rounded-full shrink-0"
                      style={{ background: ACCENT }}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Closing — mobile / tablet only */}
          <p
            className="lg:hidden mt-5 pt-4"
            style={{
              ...bodyStyle,
              fontSize: '0.8rem',
              borderTop: '1px solid rgba(26,46,80,0.1)',
            }}
          >
            {SUSTAINABILITY_COMMITMENT.closing}
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SustainabilityCommitmentSection;
