import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  LayoutGrid,
  Wrench,
  GraduationCap,
  ScanLine,
  Clapperboard,
  Gamepad2,
  Landmark,
} from 'lucide-react';
import SectionEyebrow from '../ui/SectionEyebrow';
import ActivationPanelStack from '../ui/ActivationPanelStack';
import ActivationSessionSlots, { type SessionSlot } from '../ui/ActivationSessionSlots';
import ConferenceAgenda from '../xras-kl-2026/ConferenceAgenda';
import { useActivationTabsDock } from '../../hooks/useActivationTabsDock';

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

// ─────────────────────────────────────────────────────────────────────────────
// Data — from AI·XR Cultural Innovation Forum 2026 catalog
// ─────────────────────────────────────────────────────────────────────────────

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

const ACTIVATIONS: Activation[] = [
  {
    id: 'conference',
    icon: <Mic className={iconClass} />,
    shortTitle: 'Conference',
    category: 'Day 1 · Cultural Innovation Forum',
    tagline: 'Strategic dialogue, policy insights, and industry collaboration.',
    body: 'Day one opens with keynotes and panels exploring how Sarawak can lead ASEAN\'s future of AI-driven cultural preservation and immersive tourism. Cultural leaders, technologists, and policymakers converge to shape the region\'s creative and digital renaissance.',
    meta: 'Day 1 · BCCK Main Stage',
  },
  {
    id: 'expo',
    icon: <LayoutGrid className={iconClass} />,
    shortTitle: 'Expo',
    category: 'Day 2 · Cultural XR Innovation Showcase',
    tagline: 'Experience the future of heritage and tourism.',
    body: 'Interactive experience zones where XR exhibitions, AI innovation demos, and creative pitches bring cultural heritage to life. See how immersive technologies transform tradition into globally accessible digital experiences.',
    meta: 'Day 2 · Experience Zones',
    mediaSections: [
      {
        title: 'Expo Hall Layout',
        layout: 'single',
        images: [
          {
            src: '/booth/120-3x3-booth-20-kiosks-walkway-between-rows-immersive-story-tell-performance-creative-tech-ai-xr-virtual-prod.jpeg',
            alt: 'BCCK expo hall floor plan — exhibition booths and experience zones',
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
    id: 'workshops',
    icon: <Wrench className={iconClass} />,
    shortTitle: 'Youth Lab',
    category: 'Youth Immersion Lab',
    tagline: 'Empowering the next generation of creative technologists.',
    body: 'Hands-on training nurturing young creators and digital storytellers. Practical immersion in the AI tools, XR technologies, and spatial media workflows that will define Sarawak\'s cultural innovation future.',
    meta: 'Day 2 · Training',
    sessionSlots: [
      { topic: 'Artificial Intelligence tools' },
      { topic: 'XR storytelling technologies' },
      { topic: 'Spatial media production workflows' },
    ],
  },
  {
    id: 'masterclasses',
    icon: <GraduationCap className={iconClass} />,
    shortTitle: 'Masterclasses',
    category: 'Training & Capacity Building',
    tagline: 'Document the past. Archive it for the future.',
    body: 'Specialist intensives for museums, tourism agencies, cultural institutions, and heritage organisations ready to digitise Borneo\'s living heritage — from 3D capture to cloud-based preservation.',
    meta: 'Day 2 · Limited Seats',
    sessionSlots: [
      {
        topic:
          'Cultural Documentation Masterclass — 3D scanning, Gaussian Splatting reconstruction, volumetric video capture, real-time rendering engines',
      },
      {
        topic:
          'Digital Archiving for Heritage Organisations — museums, tourism agencies, cultural institutions, and heritage bodies',
      },
    ],
  },
  {
    id: 'heritage',
    icon: <ScanLine className={iconClass} />,
    shortTitle: 'Heritage XR',
    category: 'Preserving Heritage Through Immersive Tech',
    tagline: 'Where tradition meets technological innovation.',
    body: 'Explore how VR, AR, mixed reality, spatial computing, and AI-powered reconstruction technologies are redefining cultural preservation — digitising archives, recreating historical environments, and building digital twins of heritage sites.',
    meta: 'Forum-wide · Applications',
    sessionSlots: [
      { topic: 'Digitising museums and cultural archives' },
      { topic: 'VR recreations of historical environments' },
      { topic: 'Documentation of traditional dances and languages' },
      { topic: 'Immersive cultural storytelling and virtual exhibitions' },
      { topic: 'Digital twins of heritage sites' },
    ],
  },
  {
    id: 'hackathon',
    icon: <Clapperboard className={iconClass} />,
    shortTitle: 'AI Filmmaking',
    category: 'Hackathon · Mothership Challenge',
    tagline: '72 hours. One mission. Real stakes.',
    body: 'Filmmakers, technologists, storytellers, and AI creators from across ASEAN produce AI-assisted short films within a 72-hour sprint — narratives aligned with the United Nations Sustainable Development Goals. Launched at CENTEXS Kuching, culminating in live creative pitches at the forum.',
    meta: '15–17 Oct · CENTEXS → BCCK',
  },
  {
    id: 'esports',
    icon: <Gamepad2 className={iconClass} />,
    shortTitle: 'Esports',
    category: 'Esports Semi Final',
    tagline: 'Regional competition on the road to Kuala Lumpur.',
    body: 'Teams battle in the MLBB Cup Semi Finals — competitive spatial entertainment on the regional stage. Winners advance to the Grand Final at XR ASIA SUMMIT 2026 in December.',
    meta: 'Day 2 · Competition Stage',
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
// Media gallery — hall layouts, booth renders
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
              : 'grid grid-cols-1'
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
// Expanded Panel — improved text readability & glowing elements
// ─────────────────────────────────────────────────────────────────────────────

const ExpandedPanel = ({ activation }: { activation: Activation }) => (
  <div
    className="relative rounded-2xl overflow-hidden"
    style={{
      background: 'linear-gradient(155deg, rgba(22,36,60,0.75) 0%, rgba(10,18,34,0.92) 100%)',
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

          {/* Body — clearly readable muted white */}
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
        </div>

        {/* Meta pill */}
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
      </div>

      {activation.sessionSlots && activation.sessionSlots.length > 0 && (
        <ActivationSessionSlots slots={activation.sessionSlots} />
      )}

      {activation.id === 'conference' && <ConferenceAgenda />}

      {activation.mediaSections && activation.mediaSections.length > 0 && (
        <ActivationMediaGallery sections={activation.mediaSections} />
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Section with sticky tabs
// ─────────────────────────────────────────────────────────────────────────────

const AixrActivationsSection = () => {
  const [activeId, setActiveId] = useState<string>(ACTIVATIONS[0].id);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible px-6"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-labelledby="aixr-activations-heading"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <SectionEyebrow>7 Experiences</SectionEyebrow>

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-5xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <Landmark className="w-6 h-6 shrink-0 mt-1" style={{ color: '#ef783d' }} aria-hidden="true" />
            <h2
              id="aixr-activations-heading"
              className="font-heading font-bold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#f8faff' }}
            >
              2 Days. 7 Experiences.{' '}
              <span className="gradient-text-accent">
                Where Heritage Meets Future Technology.
              </span>
            </h2>
          </div>
          <p
            className="leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', lineHeight: 1.85, color: '#a8b8d0' }}
          >
            AI·XR Cultural Innovation Forum 2026 — a prelude to XR Asia Summits 2026. Reimagining heritage
            through artificial intelligence and immersive technology at Borneo Convention Centre (BCCK),
            Kuching, Sarawak · 16–17 October 2026.
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

              <div className="activation-tabs-scroll pb-2 pt-1 -mx-1 px-1 md:pt-0 md:mx-0 md:px-0">
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
              renderPanel={(activation) => <ExpandedPanel activation={activation} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AixrActivationsSection;