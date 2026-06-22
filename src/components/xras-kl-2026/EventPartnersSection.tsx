import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

type Partner = {
  name: string;
  logo: string;
  category: string;
};

type PartnerCategory = {
  label: string;
  partners: Partner[];
};

const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    label: 'Media Partner',
    partners: [
      {
        name: 'Vanakkam Malaysia News',
        logo: '/partners-logo/vanakkam-malaysia.jpeg',
        category: 'Media Partner',
      },
      {
        name: 'ESG TV',
        logo: '/partners-logo/esg-tv.png',
        category: 'Media Partner',
      },
    ],
  },
];

const PartnerLogo = ({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      delay: index * 0.07,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="group relative flex items-center justify-center rounded-xl px-8 py-6 transition-all duration-300"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
      minHeight: '96px',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.background = 'rgba(255,255,255,0.06)';
      el.style.borderColor = 'rgba(239,120,61,0.25)';
      el.style.boxShadow =
        '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(239,120,61,0.12)';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.background = 'rgba(255,255,255,0.03)';
      el.style.borderColor = 'rgba(255,255,255,0.08)';
      el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
    }}
  >
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      className="max-h-12 w-auto object-contain transition-all duration-300 group-hover:scale-[1.04]"
      style={{
        filter: 'brightness(0.92) saturate(0.85)',
        maxWidth: '160px',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLImageElement).style.filter =
          'brightness(1) saturate(1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLImageElement).style.filter =
          'brightness(0.92) saturate(0.85)';
      }}
    />
    <span className="sr-only">{partner.name}</span>
  </motion.div>
);

const EventPartnersSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-6"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-labelledby="event-partners-heading"
    >
      {/* Subtle bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(239,120,61,0.04) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionEyebrow>Event Partners</SectionEyebrow>

        <motion.h2
          id="event-partners-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-bold mb-14"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
            color: '#f8faff',
          }}
        >
          Our{' '}
          <span className="gradient-text-accent">Partners</span>
        </motion.h2>

        <div className="space-y-12">
          {PARTNER_CATEGORIES.map((category) => (
            <div key={category.label}>
              {/* Category divider */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mb-8"
              >
                <span
                  className="font-mono font-bold tracking-[0.28em] uppercase"
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(239,120,61,0.85)',
                  }}
                >
                  {category.label}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(239,120,61,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: '0.18em',
                    color: 'rgba(139,155,180,0.45)',
                  }}
                >
                  {String(category.partners.length).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.partners.map((partner, i) => (
                  <PartnerLogo key={partner.name} partner={partner} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventPartnersSection;