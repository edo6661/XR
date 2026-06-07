import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

/**
 * Partner logos — derived from the actual assets in /public/all-partner-logos/
 * Group 1: Government / Ecosystem Partners
 * Group 2: Technology Partners
 */

type Partner = {
  name: string;
  src: string;
  needsInvert?: boolean; // logos that are dark and need CSS invert on dark bg
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

const PartnerLogo = ({
  partner,
  index,
  accentColor,
}: {
  partner: Partner;
  index: number;
  accentColor: string;
}) => {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center justify-center px-4 py-5 rounded-xl overflow-hidden transition-all duration-400"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        minHeight: '72px',
      }}
      onMouseEnter={(e) => {
        if (reduce) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${accentColor}44`;
        el.style.background = `${accentColor}08`;
        el.style.boxShadow = `0 0 28px ${accentColor}12`;
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
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}70, transparent)` }}
        aria-hidden="true"
      />

      <img
        ref={imgRef}
        src={partner.src}
        alt={partner.name}
        className="max-h-9 max-w-full object-contain transition-all duration-400"
        style={{
          filter: partner.needsInvert
            ? 'invert(1) brightness(0.85) grayscale(0.2)'
            : 'grayscale(0.35) brightness(0.85)',
          opacity: 0.7,
        }}
        loading="lazy"
        onError={(e) => {
          // If image fails, show text fallback
          const img = e.currentTarget;
          img.style.display = 'none';
          const parent = img.parentElement;
          if (parent) {
            const fallback = document.createElement('span');
            fallback.style.cssText =
              'font-size:0.58rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(107,127,163,0.55);text-align:center;';
            fallback.textContent = partner.name;
            parent.appendChild(fallback);
          }
        }}
      />
    </motion.div>
  );
};

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
      <SectionEyebrow align="center">Partners & Sponsors</SectionEyebrow>

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
        <p className="text-foreground-muted text-sm max-w-lg mx-auto leading-relaxed">
          A growing ecosystem of government agencies, technology innovators, and industry partners
          driving immersive adoption across Asia.
        </p>
      </motion.div>

      {/* Government & Ecosystem Partners */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bold tracking-[0.38em] uppercase text-center mb-6"
          style={{ fontSize: '0.52rem', color: 'rgba(251,146,60,0.7)' }}
        >
          Government & Ecosystem Partners
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {GOVERNMENT_PARTNERS.map((partner, i) => (
            <PartnerLogo key={partner.name} partner={partner} index={i} accentColor="#fb923c" />
          ))}
        </div>
      </div>

      {/* Technology Partners */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-bold tracking-[0.38em] uppercase text-center mb-6"
          style={{ fontSize: '0.52rem', color: 'rgba(34,211,238,0.7)' }}
        >
          Technology Partners
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {TECH_PARTNERS.map((partner, i) => (
            <PartnerLogo
              key={partner.name}
              partner={partner}
              index={i}
              accentColor="#22d3ee"
            />
          ))}
        </div>
      </div>

      {/* Global stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-3 gap-4 mb-10 rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(13,27,46,0.5)' }}
      >
        {[
          { value: '1,430+', label: 'Total Attendees' },
          { value: '40+', label: 'Workshops Delivered' },
          { value: '75+', label: 'Partners' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-6 px-4 text-center"
          >
            <span
              className="font-heading font-black block mb-1"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                background: 'linear-gradient(135deg, #fb923c 0%, #f0f4ff 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {stat.value}
            </span>
            <span
              className="font-bold tracking-[0.22em] uppercase"
              style={{ fontSize: '0.52rem', color: 'rgba(107,127,163,0.65)' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
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
          <span
            className="text-xs transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default SponsorsSection;
