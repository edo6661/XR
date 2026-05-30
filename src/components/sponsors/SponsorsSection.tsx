import { motion } from 'framer-motion';

// ── Sponsor data ───────────────────────────────────────────────────────────
// Dibagi menjadi tier untuk variasi visual
const SPONSORS_TIER1 = ['NVIDIA', 'META', 'MICROSOFT', 'EPIC GAMES'];
const SPONSORS_TIER2 = ['UNITY', 'SONY', 'HTC VIVE', 'QUALCOMM', 'SAMSUNG', 'LENOVO'];

// ── Single sponsor item ────────────────────────────────────────────────────
const SponsorItem = ({
  name,
  size = 'md',
}: {
  name: string;
  size?: 'lg' | 'md';
}) => (
  <div className="flex items-center justify-center px-10 flex-shrink-0 group">
    <span
      className="font-heading font-bold tracking-[0.2em] uppercase transition-all duration-400"
      style={{
        fontSize: size === 'lg' ? '1.35rem' : '0.95rem',
        color: 'rgba(240,244,255,0.13)',
        transition: 'color 0.35s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.color = 'rgba(251,146,60,0.55)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.color = 'rgba(240,244,255,0.13)';
      }}
    >
      {name}
    </span>
  </div>
);

// ── Dot separator ──────────────────────────────────────────────────────────
const Dot = ({ color = 'rgba(251,146,60,0.3)' }: { color?: string }) => (
  <span
    className="w-1 h-1 rounded-full flex-shrink-0"
    style={{ background: color }}
    aria-hidden="true"
  />
);

// ── SponsorsSection ────────────────────────────────────────────────────────
const SponsorsSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.055)',
        borderBottom: '1px solid rgba(255,255,255,0.055)',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
      aria-label="Our sponsors and partners"
    >
      {/* Subtle bg tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(13,27,46,0.35)' }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />
          <span
            className="font-bold tracking-[0.52em] uppercase"
            style={{ fontSize: '0.57rem', color: 'rgba(107,127,163,0.5)' }}
          >
            Supported By Industry Leaders
          </span>
          <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />
        </motion.div>

        {/* ── Row 1: Tier 1 — slower, bigger ── */}
        <div className="relative flex overflow-hidden mb-5">
          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #050b18, transparent)' }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #050b18, transparent)' }}
            aria-hidden="true"
          />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            className="flex items-center whitespace-nowrap"
            aria-hidden="true"
          >
            {[...SPONSORS_TIER1, ...SPONSORS_TIER1].map((name, i) => (
              <div key={i} className="flex items-center">
                <SponsorItem name={name} size="lg" />
                <Dot color="rgba(251,146,60,0.25)" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Row 2: Tier 2 — faster, smaller, reversed direction ── */}
        <div className="relative flex overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #050b18, transparent)' }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #050b18, transparent)' }}
            aria-hidden="true"
          />

          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            className="flex items-center whitespace-nowrap"
            aria-hidden="true"
          >
            {[...SPONSORS_TIER2, ...SPONSORS_TIER2].map((name, i) => (
              <div key={i} className="flex items-center">
                <SponsorItem name={name} size="md" />
                <Dot color="rgba(107,127,163,0.2)" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Become a sponsor CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-10"
        >
          <a
            href="/sponsorship"
            className="group inline-flex items-center gap-2 transition-colors duration-300"
            style={{ color: 'rgba(107,127,163,0.5)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(251,146,60,0.8)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(107,127,163,0.5)'; }}
          >
            <span className="font-bold tracking-[0.25em] uppercase" style={{ fontSize: '0.62rem' }}>
              Become a Sponsor
            </span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;