import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

/**
 * Partner logos — derived from the actual assets in /public/all-partner-logos/
 * Group 1: Government / Ecosystem Partners
 * Group 2: Technology Partners
 * All merged into one infinite slider.
 */
type Partner = {
  name: string;
  src: string;
  needsInvert?: boolean;
};

const GOVERNMENT_PARTNERS: Partner[] = [
  { name: 'Broadcast Elements (BE)', src: '/all-partner-logos/Logo_BE_Malaysia.png' },
  { name: 'Centre of Excellence (COE)', src: '/all-partner-logos/COE LOGO_PNG_Med res.png' },
  { name: 'Digital Content Creation (DCC)', src: '/all-partner-logos/DCC-Logo_OP.png' },
  { name: 'FINAS', src: '/all-partner-logos/FINAS.png' },
  { name: 'MDEC', src: '/all-partner-logos/MDEC_logo.png' },
  { name: 'POSTAM', src: '/all-partner-logos/postamsmall.png' },
];

const TECH_PARTNERS: Partner[] = [
  { name: 'AOTO', src: '/all-partner-logos/AOTO LOGO2.png' },
  { name: 'Artixium', src: '/all-partner-logos/artixium.jpg' },
  { name: 'Aximmetry', src: '/all-partner-logos/aximmetry.png', needsInvert: true },
  { name: 'Blackcam Robotics', src: '/all-partner-logos/blackcam robotics.jpg' },
  { name: 'Brompton Technology', src: '/all-partner-logos/brompton_technology_logo.jpg' },
  { name: 'Eztrack', src: '/all-partner-logos/logo_eztrack-noir.png', needsInvert: true },
  { name: 'Huawei', src: '/all-partner-logos/Huawei new Logo.png', needsInvert: true },
  { name: 'Infiled', src: '/all-partner-logos/infiled.webp' },
  { name: 'Korad', src: '/all-partner-logos/korad.png', needsInvert: true },
  { name: 'OARO', src: '/all-partner-logos/OARO.jpeg' },
  { name: 'Object Matrix', src: '/all-partner-logos/Object-Matrix-Logo-e1610495539370.webp', needsInvert: true },
  { name: 'Ortana', src: '/all-partner-logos/ortana-omg-wide-logo-with-new-tagline-sml.png', needsInvert: true },
  { name: 'Smode', src: '/all-partner-logos/logo_smode.png', needsInvert: true },
  { name: 'STYPE', src: '/all-partner-logos/STYPE-logo-black.png', needsInvert: true },
  { name: 'Unreal Engine', src: '/all-partner-logos/unreal logo.png', needsInvert: true },
  { name: 'Ventuz', src: '/all-partner-logos/Ventuz_5_logo_grey_orange.svg.png' },
  { name: 'Vivemars', src: '/all-partner-logos/vivemars_logo.jpg' },
];

// Merge all partners into one flat list for the slider
const ALL_PARTNERS: Partner[] = [...GOVERNMENT_PARTNERS, ...TECH_PARTNERS];

// ─── Single Logo Card (for slider) ──────────────────────────────────────────
const SliderLogoCard = ({ partner }: { partner: Partner }) => {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-400"
      style={{
        width: '140px',
        minHeight: '72px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '16px 20px',
      }}
      onMouseEnter={(e) => {
        if (reduce) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(251,146,60,0.35)';
        el.style.background = 'rgba(251,146,60,0.05)';
        el.style.boxShadow = '0 0 28px rgba(251,146,60,0.10)';
        if (imgRef.current) {
          imgRef.current.style.filter = partner.needsInvert
            ? 'invert(1) brightness(1.1) grayscale(0)'
            : 'grayscale(0) brightness(1.05)';
          imgRef.current.style.opacity = '1';
        }
      }}
      onMouseLeave={(e) => {
        if (reduce) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.background = 'rgba(255,255,255,0.025)';
        el.style.boxShadow = 'none';
        if (imgRef.current) {
          imgRef.current.style.filter = partner.needsInvert
            ? 'invert(1) brightness(0.85) grayscale(0.2)'
            : 'grayscale(0.35) brightness(0.85)';
          imgRef.current.style.opacity = '0.7';
        }
      }}
    >
      {/* Top shimmer line on hover */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.55), transparent)' }}
        aria-hidden="true"
      />
      <img
        ref={imgRef}
        src={partner.src}
        alt={partner.name}
        title={partner.name}
        className="max-h-9 w-full object-contain transition-all duration-400"
        style={{
          filter: partner.needsInvert
            ? 'invert(1) brightness(0.85) grayscale(0.2)'
            : 'grayscale(0.35) brightness(0.85)',
          opacity: 0.7,
        }}
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = 'none';
          const parent = img.parentElement;
          if (parent) {
            const fallback = document.createElement('span');
            fallback.style.cssText =
              'font-size:0.55rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(107,127,163,0.55);text-align:center;line-height:1.4;';
            fallback.textContent = partner.name;
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

// ─── Infinite Slider ─────────────────────────────────────────────────────────
// Uses pure CSS animation — no JS scroll loop, no RAF, GPU-friendly.
// We duplicate the list once to create the seamless loop illusion.
const InfiniteSlider = ({ partners }: { partners: Partner[] }) => {
  const reduce = useReducedMotion();
  // Duplicate for seamless loop
  const doubled = [...partners, ...partners];

  // Each card is 140px wide + 12px gap = 152px per item
  const itemWidth = 152;
  const totalWidth = partners.length * itemWidth;

  return (
    <div
      className="relative w-full overflow-hidden"
      aria-label="Partner logos slider"
      // Fade edges
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-3"
        style={{
          width: `${totalWidth * 2}px`,
          animation: reduce ? 'none' : `xr-marquee 38s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((partner, i) => (
          <SliderLogoCard key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>

      {/* Inline keyframe injected via style tag — avoids needing global CSS change */}
      <style>{`
        @keyframes xr-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes xr-marquee { 0%, 100% { transform: none; } }
        }
      `}</style>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
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
    {/* Subtle background tint */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'rgba(13,27,46,0.35)' }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <SectionEyebrow align="center">Partners</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <h2
          id="partners-heading"
          className="font-heading font-bold text-foreground mb-3"
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)' }}
        >
          Trusted by industry leaders
        </h2>
        <p className="text-foreground-muted max-w-lg mx-auto leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)' }}>
          A growing ecosystem of government agencies, technology innovators, and industry partners
          driving immersive adoption across Asia.
        </p>
      </motion.div>

      {/* ── Single Infinite Slider ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <InfiniteSlider partners={ALL_PARTNERS} />
      </motion.div>



      {/* Become a partner CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
      >
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300"
          style={{
            fontSize: '0.72rem',
            border: '1px solid rgba(239,120,61,0.4)',
            color: '#ef783d',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(239,120,61,0.08)';
            el.style.borderColor = 'rgba(239,120,61,0.65)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'transparent';
            el.style.borderColor = 'rgba(239,120,61,0.4)';
          }}
        >
          Become a partner
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default SponsorsSection;