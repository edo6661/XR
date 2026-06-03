import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const PARTNER_TIERS = [
  { label: 'Strategic Partners', count: 4, accent: '#fb923c' },
  { label: 'Gold Partners', count: 6, accent: '#d9b27a' },
  { label: 'Silver Partners', count: 8, accent: '#6b7fa3' },
] as const;

const LogoPlaceholder = ({
  index,
  accent,
}: {
  index: number;
  accent: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex items-center justify-center aspect-[2.4/1] rounded-lg overflow-hidden transition-all duration-400"
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px dashed rgba(255,255,255,0.1)',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = `${accent}44`;
      el.style.background = `${accent}08`;
      el.style.boxShadow = `0 0 32px ${accent}12`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = 'rgba(255,255,255,0.1)';
      el.style.background = 'rgba(255,255,255,0.02)';
      el.style.boxShadow = 'none';
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{
        background: `linear-gradient(135deg, transparent 40%, ${accent}06 100%)`,
      }}
      aria-hidden="true"
    />
    <div className="flex flex-col items-center gap-2 px-4">
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center"
        style={{
          border: `1px solid ${accent}25`,
          background: `${accent}0a`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={accent}
          strokeWidth={1}
          className="w-5 h-5 opacity-50"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 15l3-3 2 2 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span
        className="font-mono uppercase tracking-[0.28em]"
        style={{ fontSize: '0.48rem', color: 'rgba(107,127,163,0.45)' }}
      >
        Partner logo
      </span>
    </div>
  </motion.div>
);

const SponsorsSection = () => (
  <section
    className="relative w-full overflow-hidden"
    style={{
      borderTop: '1px solid rgba(255,255,255,0.055)',
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',
    }}
    aria-labelledby="partners-heading"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'rgba(13,27,46,0.35)' }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <SectionEyebrow align="center">Partner logos</SectionEyebrow>

      <motion.h2
        id="partners-heading"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-heading font-bold text-center text-foreground mb-12"
        style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)' }}
      >
        Trusted by industry leaders
      </motion.h2>

      <div className="flex flex-col gap-10">
        {PARTNER_TIERS.map((tier) => (
          <div key={tier.label}>
            <p
              className="font-bold tracking-[0.35em] uppercase text-center mb-5"
              style={{ fontSize: '0.52rem', color: `${tier.accent}99` }}
            >
              {tier.label}
            </p>
            <div
              className={`grid gap-4 ${tier.count <= 4
                  ? 'grid-cols-2 md:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                }`}
            >
              {Array.from({ length: tier.count }, (_, i) => (
                <LogoPlaceholder key={i} index={i} accent={tier.accent} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center mt-12"
      >
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 transition-colors duration-300"
          style={{ color: 'rgba(107,127,163,0.5)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(251,146,60,0.8)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(107,127,163,0.5)';
          }}
        >
          <span className="font-bold tracking-[0.25em] uppercase" style={{ fontSize: '0.62rem' }}>
            Become a partner
          </span>
          <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default SponsorsSection;
