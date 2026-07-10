import PillarCard from '../PillarCard';
import { FALLBACK_ABOUT_PILLARS } from '../../../core/content/aboutPage';
import { useSanityQuery } from '../../../hooks/useSanityQuery';
import { fetchAboutPillars } from '../../../lib/sanity/queries';
import {
  AIIcon,
  SpatialIcon,
  GlobeIcon,
} from './aboutIcons';

const whyIcons = [
  <AIIcon key="organiser" />,
  <SpatialIcon key="masterclass" />,
  <GlobeIcon key="community" />,
];

const AMBIENT_GLOWS = [
  { color: 'rgba(239,120,61,0.14)', position: 'top-0 left-[8%] w-[480px] h-[480px]' },
  { color: 'rgba(57,83,163,0.12)', position: 'top-1/3 right-0 w-[420px] h-[420px]' },
  { color: 'rgba(254,219,33,0.08)', position: 'bottom-0 left-1/3 w-[380px] h-[380px]' },
] as const;

const WhyXrSummitsBlock = () => {
  const { data: pillars } = useSanityQuery(fetchAboutPillars, FALLBACK_ABOUT_PILLARS);

  return (
  <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-8 py-12 md:py-16 lg:py-20 rounded-2xl overflow-hidden">
    {/* Section background layers */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(160deg, rgba(18,32,58,0.55) 0%, rgba(10,18,34,0.72) 45%, rgba(14,24,44,0.6) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-hidden="true"
    />

    {/* Grid texture */}
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
      aria-hidden="true"
    />

    {/* Accent ambient orbs */}
    {AMBIENT_GLOWS.map((glow) => (
      <div
        key={glow.position}
        className={`absolute rounded-full blur-3xl pointer-events-none ${glow.position}`}
        style={{ background: `radial-gradient(circle, ${glow.color} 0%, transparent 68%)` }}
        aria-hidden="true"
      />
    ))}

    {/* Diagonal color wash */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(125deg, rgba(239,120,61,0.06) 0%, transparent 30%, rgba(57,83,163,0.08) 55%, transparent 75%, rgba(254,219,33,0.05) 100%)',
      }}
      aria-hidden="true"
    />

    {/* Card grid — always 3 columns from md up */}
    <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 md:gap-7 lg:gap-8">
      {pillars.map((pillar, index) => (
        <PillarCard
          key={pillar.title}
          index={index}
          icon={whyIcons[index]}
          title={pillar.title}
          description={pillar.description}
          accentColor={pillar.accentColor}
          isFeatured={pillar.featured}
          variant="hero"
        />
      ))}
    </div>
  </div>
  );
};

export default WhyXrSummitsBlock;
