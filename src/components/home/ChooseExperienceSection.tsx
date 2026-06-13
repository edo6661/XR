import { motion } from 'framer-motion';
import GatewayCard from '../hero/GatewayCard';
import SectionEyebrow from '../ui/SectionEyebrow';

const XRIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5l10.5-6 10.5 6v9l-10.5 6-10.5-6v-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3M2.25 7.5l9.75 5.5 9.75-5.5" />
  </svg>
);

const SarawakIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
  </svg>
);

const HackathonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const EVENT_GATEWAYS = [
  {
    title: "4th XR Asia Summits 2026",
    subtitle: '1 - 3 December 2026',
    description: 'Malaysia International Trade and Exhibition Centre (MITEC), Kuala Lumpur. One platform, six activations – Conference • Expo • Workshops • Masterclasses • Hackathon Grandfinals • Esports Tournament • Awards & Gala.',
    to: '/xras-kl-2026',
    accentColor: '#fb923c',
    tag: 'XRAS26',
    icon: <XRIcon />,
  },
  {
    title: "AI-XR Cultural Innovation Forum",
    subtitle: '16 - 17 October 2026',
    description: 'Borneo Convention Centre Kuching (BCCK), Kuching, Sarawak. A prelude to XR Asia Summit – Innovation • Culture • Technology • Future Talent',
    to: '/aixr-2026-sarawak',
    accentColor: '#22d3ee',
    tag: 'AIXR',
    icon: <SarawakIcon />,
  },
  {
    title: 'AI Filmmaking Hackathon',
    subtitle: '',
    description: '4 Universities from Malaysia, 1 University from Singapore, 1 University from Indonesia. 72-hour run of show – Hands-on challenges, mentorship from industry leaders, pressure-tested workflows.',
    accentColor: '#a78bfa',
    tag: 'Hackathon',
    icon: <HackathonIcon />,
  },
] as const;

const ChooseExperienceSection = () => (
  <section
    id="choose-experience"
    className="relative w-full overflow-hidden scroll-mt-24"
    style={{
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',

    }}
    aria-labelledby="choose-experience-heading"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(251,146,60,0.04) 0%, transparent 65%)',
      }}
      aria-hidden="true"
    />
    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <SectionEyebrow align="center">Choose Your Experience</SectionEyebrow>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2
          id="choose-experience-heading"
          className="font-heading font-bold text-foreground leading-tight mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
        >
          Choose Your{' '}
          <span className="gradient-text-accent">Entry Point</span>
        </h2>

      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {EVENT_GATEWAYS.map((gateway, index) => (
          <GatewayCard
            key={gateway.title}
            index={index}
            {...gateway}
            isCenter={index === 0}
            cta='Join the Movement'
          />
        ))}
      </div>
    </div>
  </section>
);

export default ChooseExperienceSection;