import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  LayoutGrid,
  Wrench,
  GraduationCap,
  Clapperboard,
  Gamepad2,
} from 'lucide-react';
import SectionEyebrow from '../ui/SectionEyebrow';
import ActivationPanelStack from '../ui/ActivationPanelStack';
import { useActivationTabsDock } from '../../hooks/useActivationTabsDock';

// ─────────────────────────────────────────────────────────────────────────────
// Data — verbatim from client brief
// ─────────────────────────────────────────────────────────────────────────────

type SubItem = { label: string; detail?: string };

type Activation = {
  id: string;
  icon: React.ReactNode;
  shortTitle: string;
  category: string;
  tagline: string;
  body: string;
  meta: string;
  subItems?: SubItem[];
};

const iconClass = 'w-5 h-5 flex-shrink-0';

const ACTIVATIONS: Activation[] = [
  {
    id: 'conference',
    icon: <Mic className={iconClass} />,
    shortTitle: 'Conference',
    category: 'Conference',
    tagline: 'Where culture, policy, and immersive technology meet.',
    body: 'Keynotes, fireside chats, and industry panels exploring how AI and XR are reshaping heritage preservation, immersive tourism, and the creative economy. Featuring global voices from policy, technology, and cultural institutions.',
    meta: 'Day 1 · Main Stage',
  },
  {
    id: 'expo',
    icon: <LayoutGrid className={iconClass} />,
    shortTitle: 'Expo',
    category: 'Expo',
    tagline: 'See the future of cultural technology, live.',
    body: 'An immersive showcase floor featuring XR exhibitions, AI innovation demos, and interactive heritage experiences. Where technology providers meet cultural institutions, tourism bodies, and creative industry decision-makers.',
    meta: 'Day 1–2 · Exhibition Floor',
  },
  {
    id: 'workshops',
    icon: <Wrench className={iconClass} />,
    shortTitle: 'Workshops',
    category: '2× Workshop',
    tagline: 'Hands-on skills for the immersive era.',
    body: 'Practical sessions covering AI tools, XR storytelling technologies, and spatial media production workflows — built for creators, cultural practitioners, and emerging talent looking to build real capability.',
    meta: 'Day 2 · Limited Seats',
  },
  {
    id: 'masterclasses',
    icon: <GraduationCap className={iconClass} />,
    shortTitle: 'Masterclasses',
    category: '2× Masterclass',
    tagline: 'Specialist knowledge, directly applied.',
    body: 'Deep-dive masterclasses in Cultural Documentation (3D scanning, Gaussian Splatting, volumetric capture, real-time rendering) and Digital Archiving for Heritage Organisations. For museums, tourism agencies, and cultural institutions ready to go beyond the basics.',
    meta: 'Day 2 · Limited Seats',
    subItems: [
      { label: 'Cultural Documentation', detail: '3D scanning, Gaussian Splatting, volumetric capture, real-time rendering' },
      { label: 'Digital Archiving for Heritage Organisations' },
    ],
  },
  {
    id: 'hackathon',
    icon: <Clapperboard className={iconClass} />,
    shortTitle: 'AI Filmmaking',
    category: 'Hackathon Semi Final',
    tagline: '72 hours. One mission. Real stakes.',
    body: 'Teams of filmmakers, technologists, and storytellers race to produce AI-assisted short films aligned with UN Sustainable Development Goals. The sprint launches Day 1 and culminates in live pitches Day 2 — with top teams advancing to the Grand Final at XR ASIA SUMMIT 2026 in December.',
    meta: 'Day 1 Launch → Day 2 Pitches',
  },
  {
    id: 'esports',
    icon: <Gamepad2 className={iconClass} />,
    shortTitle: 'Esports',
    category: 'Esports Semi Final',
    tagline: 'The road to the Grand Final starts here.',
    body: 'Regional teams compete in the MLBB Cup Semi Finals, with winners advancing to the Grand Final stage at XR ASIA SUMMIT 2026 in Kuala Lumpur.',
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
    className="group relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl transition-all duration-300 cursor-pointer shrink-0 min-w-[92px] sm:min-w-[108px]"
    style={{
      background: isActive
        ? 'linear-gradient(135deg, rgba(239,120,61,0.34), rgba(251,146,60,0.2))'
        : 'rgba(255,255,255,0.1)',
      border: `1.5px solid ${isActive ? 'rgba(239,120,61,0.9)' : 'rgba(255,255,255,0.2)'}`,
      boxShadow: isActive
        ? '0 0 32px rgba(239,120,61,0.32), inset 0 1px 0 rgba(239,120,61,0.22), 0 6px 20px rgba(0,0,0,0.4)'
        : '0 3px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
      transform: isActive ? 'translateY(-2px)' : 'none',
    }}
    aria-pressed={isActive}
    aria-selected={isActive}
    aria-controls={`activation-panel-${activation.id}`}
    whileHover={{
      y: -2,
      background: isActive ? undefined : 'rgba(255,255,255,0.14)',
      borderColor: isActive ? undefined : 'rgba(255,255,255,0.35)',
    }}
  >
    <div
      className="absolute top-0 inset-x-0 h-[3px] rounded-t-xl transition-opacity duration-300"
      style={{
        background: 'linear-gradient(90deg, transparent, #ef783d, #fb923c, transparent)',
        opacity: isActive ? 1 : 0,
        boxShadow: isActive ? '0 0 14px rgba(239,120,61,0.9)' : 'none',
      }}
      aria-hidden="true"
    />

    <div
      className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0"
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
      className="font-bold tracking-[0.1em] uppercase text-center leading-tight transition-all duration-300 whitespace-nowrap"
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
        className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
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

          {/* Sub-items */}
          {activation.subItems && activation.subItems.length > 0 && (
            <div className="mt-6 flex flex-col gap-3">
              {activation.subItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-[0.45em] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: '#ef783d',
                      boxShadow: '0 0 8px rgba(239,120,61,0.6)',
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-semibold" style={{ fontSize: '0.9rem', color: '#dce8f8' }}>
                      {item.label}
                    </span>
                    {item.detail && (
                      <span className="ml-2" style={{ fontSize: '0.82rem', color: '#a8b8d0' }}>
                        — {item.detail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Section with sticky tabs
// ─────────────────────────────────────────────────────────────────────────────

type AixrActivationsSectionProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const AixrActivationsSection = ({
  onDownloadBrochure,
  onRegister,
}: AixrActivationsSectionProps) => {
  const [activeId, setActiveId] = useState<string>(ACTIVATIONS[0].id);
  const headingRef = useRef<HTMLDivElement>(null);
  const {
    sectionRef,
    sentinelRef,
    dockSlotRef,
    dockRef,
    isPinned,
    isDismissing,
    isEntering,
    isPinnedRef,
    placeholderHeight,
    dockStyle,
    scrollToContent,
    handleDismissTransitionEnd,
  } = useActivationTabsDock({ contentAnchorRef: headingRef });

  const handleTabClick = useCallback(
    (id: string) => {
      const wasPinned = isPinnedRef.current;
      setActiveId(id);
      if (wasPinned) {
        requestAnimationFrame(() => scrollToContent());
      }
    },
    [isPinnedRef, scrollToContent],
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
      <div className="max-w-7xl mx-auto">
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
            id="aixr-activations-heading"
            className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#f8faff' }}
          >
            2 Days. 6 Experiences.{' '}
            <span className="gradient-text-accent">
              A prelude to XR ASIA SUMMIT 2026.
            </span>
          </h2>
          <p
            className="leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', lineHeight: 1.85, color: '#a8b8d0' }}
          >
            16–17 October 2026 · Borneo Convention Centre (BCCK), Kuching, Sarawak.

          </p>
        </motion.div>

        {/* ── Pinned horizontal tab dock + content panel ───────────────── */}
        <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
        <div ref={dockSlotRef} className="mb-5 -mx-6 px-6">
          {isPinned && (
            <div style={{ height: placeholderHeight }} aria-hidden="true" />
          )}
          <div
            ref={dockRef}
            style={dockStyle}
            onTransitionEnd={handleDismissTransitionEnd}
            className={`activation-tabs-sticky activation-tabs-dock transition-shadow duration-300 ${isPinned ? 'is-floating' : ''
              } ${isDismissing ? 'is-dismissing' : ''} ${isEntering ? 'is-entering' : ''}`}
            role="tablist"
            aria-label="Event experiences"
          >
            <p className="activation-tabs-hint">Explore what's waiting for you</p>

            <div
              className="overflow-x-auto pb-2 pt-1 -mx-1 px-1"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="flex gap-3 w-max sm:w-full sm:flex-wrap sm:justify-center">
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

        <ActivationPanelStack
          items={ACTIVATIONS}
          activeId={activeId}
          renderPanel={(activation) => <ExpandedPanel activation={activation} />}
        />

        {/* ── CTA Row ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <button
            type="button"
            onClick={onDownloadBrochure}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.75rem] transition-all duration-300 hover:shadow-[0_0_28px_rgba(239,120,61,0.25)] cursor-none"
            style={{
              color: '#ef783d',
              background: 'rgba(239,120,61,0.08)',
              border: '1px solid rgba(239,120,61,0.45)',
            }}
          >
            Download Brochure
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.75rem] text-[#050505] transition-all duration-300 hover:shadow-[0_0_36px_rgba(239,120,61,0.45)] hover:-translate-y-px cursor-none"
            style={{
              background: 'linear-gradient(135deg, #ef783d 0%, #fb923c 100%)',
              border: '1px solid rgba(239,120,61,0.5)',
              boxShadow: '0 0 24px rgba(239,120,61,0.25)',
            }}
          >
            Register / Enquiry
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AixrActivationsSection;