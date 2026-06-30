import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  LayoutGrid,
  GraduationCap,
  Lightbulb,
  Clapperboard,
  Gamepad2,
  Sparkles,
} from 'lucide-react';
import SectionEyebrow from '../ui/SectionEyebrow';
import ActivationPanelStack from '../ui/ActivationPanelStack';
import ActivationSessionSlots, { type SessionSlot } from '../ui/ActivationSessionSlots';
import ConferenceAgenda from './ConferenceAgenda';
import { useActivationTabsDock } from '../../hooks/useActivationTabsDock';
import {
  XRAS_KL_MASTERCLASS_SLOTS,
  XRAS_KL_COACHING_SLOTS,
  XRAS_KL_AI_FILMMAKING,
  XRAS_KL_ESPORTS,
  XRAS_KL_AWARDS_GALA,
} from '../../core/content/xrasKl2026';

type ActivationImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ActivationMediaSection = {
  title: string;
  images: ActivationImage[];
  layout?: 'single' | 'grid';
};

type Activation = {
  id: string;
  icon: React.ReactNode;
  shortTitle: string;
  category: string;
  tagline: string;
  body: string;
  meta: string;
  sessionSlots?: SessionSlot[];
  mediaSections?: ActivationMediaSection[];
};

const iconClass = 'w-5 h-5 flex-shrink-0';

const ACTIVATION_PANEL_BACKGROUNDS = [
  '/xras-activation/1.jpg',
  '/xras-activation/2.jpg',
  '/xras-activation/3.jpg',
  '/xras-activation/4.jpg',
] as const;

const ACTIVATIONS: Activation[] = [
  {
    id: 'conference',
    icon: <Mic className={iconClass} />,
    shortTitle: 'Conference',
    category: 'Conference',
    tagline: 'The ideas that move the industry forward.',
    body: 'Three days of keynotes, panel discussions, and fireside chats covering AI infrastructure, spatial media, virtual production, and the future of competitive broadcast. Featuring global speakers across industry, policy, and creative tech.',
    meta: 'Day 1–2 · Main Stage',
  },
  {
    id: 'expo',
    icon: <LayoutGrid className={iconClass} />,
    shortTitle: 'Expo',
    category: 'Expo',
    tagline: 'Where technology meets its buyers.',
    body: 'A curated B2B exhibition floor connecting XR solution providers with enterprise and government decision-makers. Demo live. Match on the spot. Close faster.',
    meta: 'Dec 1–3 · Expo Floor',
    mediaSections: [
      {
        title: 'Expo Hall Layout',
        layout: 'single',
        images: [
          {
            src: '/others/MITEC.jpeg',
            alt: 'Malaysia International Trade and Exhibition Centre (MITEC) at dusk',
          },
          {
            src: '/booth/Expo-Layout-(XRAS26).png',
            alt: 'MITEC expo hall floor plan — 120 booths, kiosks, and masterclass zones',
          },
        ],
      },
      {
        title: 'Booth Options',
        layout: 'grid',
        images: [
          { src: '/booth/3x3.png', alt: '3m × 3m exhibition booth', caption: '3m × 3m' },
          { src: '/booth/6x3.png', alt: '6m × 3m exhibition booth', caption: '6m × 3m' },
          { src: '/booth/6x6.png', alt: '6m × 6m exhibition booth', caption: '6m × 6m' },
        ],
      },
    ],
  },
  {
    id: 'masterclasses',
    icon: <GraduationCap className={iconClass} />,
    shortTitle: 'Masterclasses',
    category: '4x Masterclass',
    tagline: 'Hands-on, production-ready skills.',
    body: 'Deep-dive technical sessions covering real-world XR workflows — from production pipelines to immersive deployment. Built for practitioners who want to leave with something they can use.',
    meta: '',
    sessionSlots: XRAS_KL_MASTERCLASS_SLOTS as SessionSlot[],
  },
  {
    id: 'coaching',
    icon: <Lightbulb className={iconClass} />,
    shortTitle: 'Coaching',
    category: 'Coaching',
    tagline: 'For the builders who need a sounding board.',
    body: 'One-on-one and small group coaching sessions pairing AI and XR startups with industry mentors. Get direct feedback, sharpen your pitch, and find your next move.',
    meta: '',
    sessionSlots: XRAS_KL_COACHING_SLOTS as SessionSlot[],
  },
  {
    id: 'hackathon',
    icon: <Clapperboard className={iconClass} />,
    shortTitle: 'AI Filmmaking',
    category: 'AI Filmmaking',
    tagline: XRAS_KL_AI_FILMMAKING.highlights[0],
    body: XRAS_KL_AI_FILMMAKING.highlights[1],
    meta: '',
  },
  {
    id: 'esports',
    icon: <Gamepad2 className={iconClass} />,
    shortTitle: 'Esports',
    category: 'Esports Grand Final',
    tagline: XRAS_KL_ESPORTS.tagline,
    body: XRAS_KL_ESPORTS.body,
    meta: '',
  },
  {
    id: 'gala',
    icon: <Sparkles className={iconClass} />,
    shortTitle: 'Gala',
    category: 'Awards & Gala',
    tagline: XRAS_KL_AWARDS_GALA.tagline,
    body: XRAS_KL_AWARDS_GALA.body,
    meta: '',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tab Button — strong active / inactive states
// ─────────────────────────────────────────────────────────────────────────────
const TabButton = ({
  activation,
  isActive,
  index,
  onClick,
}: {
  activation: Activation;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    role="tab"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl transition-all duration-300 cursor-pointer shrink-0 min-w-[92px] sm:min-w-[108px] md:flex-row md:items-center md:gap-3 md:w-full md:min-w-0 md:px-3 md:py-3 md:justify-start ${isActive ? 'md:translate-x-0.5' : ''}`}
    style={{
      background: isActive
        ? 'linear-gradient(135deg, rgba(239,120,61,0.34), rgba(251,146,60,0.2))'
        : 'rgba(255,255,255,0.1)',
      border: `1.5px solid ${isActive ? 'rgba(239,120,61,0.9)' : 'rgba(255,255,255,0.2)'}`,
      boxShadow: isActive
        ? '0 0 32px rgba(239,120,61,0.32), inset 0 1px 0 rgba(239,120,61,0.22), 0 6px 20px rgba(0,0,0,0.4)'
        : '0 3px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
      transform: isActive ? undefined : 'none',
    }}
    aria-pressed={isActive}
    aria-selected={isActive}
    aria-controls={`activation-panel-${activation.id}`}
    whileHover={{
      x: isActive ? undefined : 2,
      background: isActive ? undefined : 'rgba(255,255,255,0.14)',
      borderColor: isActive ? undefined : 'rgba(255,255,255,0.35)',
    }}
  >
    <div
      className="absolute top-0 inset-x-0 h-[3px] rounded-t-xl transition-opacity duration-300 md:hidden"
      style={{
        background: 'linear-gradient(90deg, transparent, #ef783d, #fb923c, transparent)',
        opacity: isActive ? 1 : 0,
        boxShadow: isActive ? '0 0 14px rgba(239,120,61,0.9)' : 'none',
      }}
      aria-hidden="true"
    />

    <div
      className="absolute left-0 inset-y-3 w-[3px] rounded-full transition-opacity duration-300 hidden md:block"
      style={{
        background: 'linear-gradient(180deg, transparent, #ef783d, #fb923c, transparent)',
        opacity: isActive ? 1 : 0,
        boxShadow: isActive ? '0 0 14px rgba(239,120,61,0.9)' : 'none',
      }}
      aria-hidden="true"
    />

    <div
      className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 md:w-10 md:h-10"
      style={{
        background: isActive ? 'rgba(239,120,61,0.3)' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${isActive ? 'rgba(239,120,61,0.65)' : 'rgba(255,255,255,0.18)'}`,
        color: isActive ? '#ef783d' : 'rgba(248, 250, 255, 0.95)',
        boxShadow: isActive ? '0 0 18px rgba(239,120,61,0.45)' : 'none',
      }}
    >
      {activation.icon}
    </div>

    <span
      className="font-bold tracking-[0.1em] uppercase text-center leading-tight transition-all duration-300 whitespace-nowrap md:text-left md:whitespace-normal md:leading-snug md:flex-1"
      style={{
        fontSize: '0.65rem',
        color: isActive ? '#ef783d' : 'rgba(248, 250, 255, 0.92)',
        textShadow: isActive ? '0 0 16px rgba(239,120,61,0.5)' : 'none',
        fontWeight: isActive ? 800 : 700,
      }}
    >
      {activation.shortTitle}
    </span>

    {isActive && (
      <div
        className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 md:hidden"
        style={{
          background: 'rgba(239,120,61,0.9)',
          boxShadow: '0 0 10px rgba(239,120,61,0.5)',
          zIndex: -1,
        }}
        aria-hidden="true"
      />
    )}

    {isActive && (
      <div
        className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 hidden md:block"
        style={{
          background: 'rgba(239,120,61,0.9)',
          boxShadow: '0 0 10px rgba(239,120,61,0.5)',
          zIndex: -1,
        }}
        aria-hidden="true"
      />
    )}
  </motion.button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Media gallery — hall layouts, booth renders, agenda
// ─────────────────────────────────────────────────────────────────────────────

const ActivationMediaGallery = ({ sections }: { sections: ActivationMediaSection[] }) => (
  <div className="mt-8 space-y-8">
    {sections.map((section) => (
      <div key={section.title}>
        <p
          className="mb-4 font-bold tracking-[0.28em] uppercase"
          style={{ fontSize: '0.58rem', color: '#ef783d' }}
        >
          {section.title}
        </p>

        <div
          className={
            section.layout === 'grid'
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-3'
              : 'grid grid-cols-1 gap-4'
          }
        >
          {section.images.map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(239,120,61,0.22)',
                boxShadow: '0 0 24px rgba(239,120,61,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={`w-full object-contain ${section.layout === 'grid' ? 'aspect-[4/3] bg-white p-3' : 'bg-white'}`}
              />
              {image.caption && (
                <figcaption
                  className="px-4 py-2.5 text-center font-mono font-semibold tracking-[0.16em] uppercase"
                  style={{ fontSize: '0.65rem', color: '#a8b8d0', borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// AI Filmmaking & Awards detail panels
// ─────────────────────────────────────────────────────────────────────────────

const sectionLabelStyle = {
  fontSize: '0.58rem',
  color: '#ef783d',
} as const;

const bodyTextStyle = {
  fontSize: 'clamp(0.92rem, 2.3vw, 1rem)',
  lineHeight: 1.75,
  color: '#a8b8d0',
} as const;

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(239,120,61,0.22)',
  boxShadow: '0 0 24px rgba(239,120,61,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
} as const;

const AiFilmmakingDetails = () => {
  const { highlights, framework, benefits } = XRAS_KL_AI_FILMMAKING;

  return (
    <div className="mt-8 space-y-8">
      <ul className="space-y-2">
        {highlights.slice(2).map((item) => (
          <li key={item} className="leading-relaxed" style={bodyTextStyle}>
            {item}
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-4 font-bold tracking-[0.28em] uppercase" style={sectionLabelStyle}>
          {framework.title}
        </p>
        <p className="mb-5 leading-relaxed" style={bodyTextStyle}>
          {framework.intro}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {framework.pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-xl p-5" style={cardStyle}>
              <p className="mb-2 font-bold" style={{ fontSize: '0.9rem', color: '#f8faff' }}>
                {pillar.title}
              </p>
              <p className="leading-relaxed" style={bodyTextStyle}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 leading-relaxed" style={bodyTextStyle}>
          {framework.challengeBrief}
        </p>
      </div>

      <div>
        <p className="mb-4 font-bold tracking-[0.28em] uppercase" style={sectionLabelStyle}>
          {benefits.title}
        </p>
        <div className="space-y-4">
          {benefits.items.map((benefit) => (
            <div key={benefit.title} className="rounded-xl p-5" style={cardStyle}>
              <p className="mb-2 font-bold" style={{ fontSize: '0.9rem', color: '#f8faff' }}>
                {benefit.title}
              </p>
              <p className="leading-relaxed" style={bodyTextStyle}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 leading-relaxed" style={bodyTextStyle}>
          {benefits.closing}{' '}
          {benefits.countries.map((country, index) => (
            <span key={country.code}>
              <span role="img" aria-label={country.label}>
                {country.flag}
              </span>{' '}
              {country.code}
              {index < benefits.countries.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </p>
        <figure className="mt-6 overflow-hidden rounded-xl  p-3 sm:p-4">
          <img
            src={benefits.sdgBanner.src}
            alt={benefits.sdgBanner.alt}
            loading="lazy"
            className="w-full object-contain rounded-xl"
          />
        </figure>
      </div>
    </div>
  );
};

const EsportsDetails = () => (
  <div className="mt-8 space-y-8">
    <p
      className="font-bold tracking-[0.12em] uppercase leading-relaxed"
      style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', color: '#f8faff' }}
    >
      {XRAS_KL_ESPORTS.headline}
    </p>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {XRAS_KL_ESPORTS.items.map((item) => (
        <figure key={item.title} className="overflow-hidden rounded-xl" style={cardStyle}>
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="w-full bg-white object-contain"
          />
          <figcaption className="px-5 py-4">
            <p className="mb-2 font-bold" style={{ fontSize: '0.9rem', color: '#f8faff' }}>
              {item.title}
            </p>
            <p className="leading-relaxed" style={bodyTextStyle}>
              {item.description}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);

const AwardsGalaDetails = () => {
  const { headline, categories, howToParticipate } = XRAS_KL_AWARDS_GALA;

  return (
    <div className="mt-8 space-y-8">
      <p
        className="font-bold tracking-[0.12em] uppercase leading-relaxed"
        style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', color: '#f8faff' }}
      >
        {headline}
      </p>

      <div>
        <p className="mb-4 font-bold tracking-[0.28em] uppercase" style={sectionLabelStyle}>
          AWARD CATEGORIES:
        </p>
        <div className="overflow-hidden rounded-xl" style={cardStyle}>
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              style={{
                borderTop: index > 0 ? '1px solid rgba(255,255,255,0.08)' : undefined,
              }}
            >
              <p className="font-semibold leading-snug" style={{ fontSize: '0.88rem', color: '#f0f6ff' }}>
                {category.name}
              </p>
              <p
                className="shrink-0 font-mono font-semibold tracking-[0.14em] uppercase"
                style={{ fontSize: '0.72rem', color: '#ef783d' }}
              >
                {category.count}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 font-bold tracking-[0.28em] uppercase" style={sectionLabelStyle}>
          {howToParticipate.title}
        </p>
        <div className="space-y-3">
          {howToParticipate.steps.map((step) => (
            <div
              key={step}
              className="rounded-xl px-5 py-4"
              style={cardStyle}
            >
              <span className="font-semibold tracking-[0.08em] uppercase" style={{ fontSize: '0.88rem', color: '#f8faff' }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Expanded Panel — improved text readability
// ─────────────────────────────────────────────────────────────────────────────

const ExpandedPanel = ({
  activation,
  backgroundSrc,
}: {
  activation: Activation;
  backgroundSrc: string;
}) => (
  <div
    className="relative rounded-2xl overflow-hidden"
    style={{
      backgroundImage: `linear-gradient(155deg, rgba(22,36,60,0.75) 0%, rgba(10,18,34,0.92) 100%), url(${backgroundSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid rgba(239,120,61,0.22)',
      boxShadow: '0 0 40px rgba(239,120,61,0.06), 0 24px 48px rgba(0,0,0,0.3)',
    }}
  >
    {/* Top accent line */}
    <div
      className="absolute top-0 inset-x-0 h-[2px]"
      style={{
        background: `linear-gradient(90deg, transparent 5%, #ef783d 40%, #fb923c 60%, transparent 95%)`,
        boxShadow: '0 0 16px rgba(239,120,61,0.4)',
      }}
      aria-hidden="true"
    />

    {/* Ambient glow */}
    <div
      className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 60% 100% at 20% 0%, rgba(239,120,61,0.07) 0%, transparent 100%)`,
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 p-7 md:p-10 lg:p-12">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12">
        <div>
          {/* Category label */}
          <span
            className="inline-block font-bold tracking-[0.32em] uppercase mb-4 px-3 py-1.5 rounded-sm"
            style={{
              fontSize: '0.6rem',
              color: '#ef783d',
              background: 'rgba(239,120,61,0.12)',
              border: '1px solid rgba(239,120,61,0.3)',
            }}
          >
            {activation.category}
          </span>

          {/* Tagline — bright white */}
          {activation.tagline ? (
            <>
              <h3
                className="font-heading font-bold leading-tight mb-4"
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)',
                  color: '#f8faff',
                  letterSpacing: '0.01em',
                }}
              >
                {activation.tagline}
              </h3>

              {/* Divider */}
              <div
                className="w-10 h-[2px] mb-5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #ef783d, transparent)',
                  boxShadow: '0 0 10px rgba(239,120,61,0.4)',
                }}
              />
            </>
          ) : null}

          {/* Body — clearly readable muted white */}
          {activation.body ? (
            <p
              className="leading-relaxed"
              style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                lineHeight: 1.9,
                color: '#a8b8d0',
                maxWidth: '58ch',
              }}
            >
              {activation.body}
            </p>
          ) : null}
        </div>

        {/* Meta pill */}
        {activation.meta ? (
          <div className="flex md:flex-col md:items-end items-center gap-3 md:gap-0">
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-lg flex-shrink-0"
              style={{
                background: 'rgba(239,120,61,0.12)',
                border: '1px solid rgba(239,120,61,0.4)',
                boxShadow: '0 0 20px rgba(239,120,61,0.1)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                style={{
                  background: '#ef783d',
                  boxShadow: '0 0 10px rgba(239,120,61,0.8)',
                }}
                aria-hidden="true"
              />
              <span
                className="font-mono font-semibold tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                  color: '#ef783d',
                }}
              >
                {activation.meta}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {activation.sessionSlots && activation.sessionSlots.length > 0 && (
        <ActivationSessionSlots slots={activation.sessionSlots} />
      )}

      {activation.id === 'conference' && <ConferenceAgenda />}

      {activation.id === 'hackathon' && <AiFilmmakingDetails />}

      {activation.id === 'esports' && <EsportsDetails />}

      {activation.id === 'gala' && <AwardsGalaDetails />}

      {activation.mediaSections && activation.mediaSections.length > 0 && (
        <ActivationMediaGallery sections={activation.mediaSections} />
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Section with sticky tabs
// ─────────────────────────────────────────────────────────────────────────────

const XrasActivationsSection = () => {
  const [activeId, setActiveId] = useState<string>(ACTIVATIONS[0].id);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const {
    sectionRef,
    sentinelRef,
    dockSlotRef,
    dockRef,
    isPinned,
    isDismissing,
    isEntering,
    placeholderHeight,
    dockStyle,
    scrollToContent,
    shouldScrollToContent,
    handleDismissTransitionEnd,
  } = useActivationTabsDock({ contentAnchorRef: headingRef, containerRef });

  const handleTabClick = useCallback(
    (id: string) => {
      setActiveId(id);
      requestAnimationFrame(() => {
        if (shouldScrollToContent()) {
          scrollToContent();
        }
      });
    },
    [scrollToContent, shouldScrollToContent],
  );

  useLayoutEffect(() => {
    const el = tabsScrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = el;
      const { deltaY, deltaX } = e;

      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        if (scrollHeight <= clientHeight) return;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) return;
        e.preventDefault();
        el.scrollTop += deltaY;
        return;
      }

      if (scrollWidth <= clientWidth) return;
      const atLeft = scrollLeft <= 0;
      const atRight = scrollLeft + clientWidth >= scrollWidth - 1;
      if ((deltaX < 0 && atLeft) || (deltaX > 0 && atRight)) return;
      e.preventDefault();
      el.scrollLeft += deltaX;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible px-6"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-labelledby="xras-activations-heading"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <SectionEyebrow>6 Experiences</SectionEyebrow>

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-5xl"
        >
          <h2
            id="xras-activations-heading"
            className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#f8faff' }}
          >
            3 Days. 6 Experiences.{' '}
            <span className="gradient-text-accent">
              One Ecosystem.
            </span>
          </h2>
          <p
            className="leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', lineHeight: 1.85, color: '#a8b8d0' }}
          >
            1–3 December 2026 · Malaysia International Trade and Exhibition Centre (MITEC, Kuala Lumpur)

          </p>
        </motion.div>

        {/* ── Left tab dock + content panel ───────────────────────────── */}
        <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
        <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6 lg:gap-8">
          <div ref={dockSlotRef} className="w-full md:w-56 lg:w-60 shrink-0">
            {isPinned && (
              <div className="w-full" style={{ height: placeholderHeight }} aria-hidden="true" />
            )}
            <div
              ref={dockRef}
              style={dockStyle}
              onTransitionEnd={handleDismissTransitionEnd}
              className={`activation-tabs-sticky activation-tabs-dock activation-tabs-dock--sidebar transition-shadow duration-300 ${isPinned ? 'is-floating' : ''
                } ${isDismissing ? 'is-dismissing' : ''} ${isEntering ? 'is-entering' : ''}`}
              role="tablist"
              aria-label="Event experiences"
            >
              <p className="activation-tabs-hint">Explore what's waiting for you</p>

              <div
                ref={tabsScrollRef}
                className="activation-tabs-scroll pb-2 pt-1 -mx-1 px-1 md:pt-0 md:mx-0 md:px-0"
                data-lenis-prevent
                data-lenis-prevent-wheel
              >
                <div className="flex gap-3 w-max justify-start md:w-full md:flex-col md:gap-2">
                  {ACTIVATIONS.map((activation, index) => (
                    <TabButton
                      key={activation.id}
                      activation={activation}
                      isActive={activeId === activation.id}
                      index={index}
                      onClick={() => handleTabClick(activation.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full">
            <ActivationPanelStack
              items={ACTIVATIONS}
              activeId={activeId}
              renderPanel={(activation) => {
                const index = ACTIVATIONS.findIndex((item) => item.id === activation.id);
                const backgroundSrc =
                  ACTIVATION_PANEL_BACKGROUNDS[index % ACTIVATION_PANEL_BACKGROUNDS.length];

                return (
                  <ExpandedPanel activation={activation} backgroundSrc={backgroundSrc} />
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default XrasActivationsSection;