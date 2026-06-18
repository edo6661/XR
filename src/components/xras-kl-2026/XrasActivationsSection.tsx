import { useState, useRef, useCallback } from 'react';
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
import { useActivationTabsDock } from '../../hooks/useActivationTabsDock';

type Activation = {
  id: string;
  icon: React.ReactNode;
  shortTitle: string;
  category: string;
  tagline: string;
  body: string;
  meta: string;
  sessionSlots?: SessionSlot[];
};

const iconClass = 'w-5 h-5 flex-shrink-0';

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
  },
  {
    id: 'masterclasses',
    icon: <GraduationCap className={iconClass} />,
    shortTitle: 'Masterclasses',
    category: '3× Masterclass',
    tagline: 'Hands-on, production-ready skills.',
    body: 'Deep-dive technical sessions covering real-world XR workflows — from production pipelines to immersive deployment. Built for practitioners who want to leave with something they can use.',
    meta: 'Day 1–3 · Limited Seats',
    sessionSlots: [
      { topic: 'AI-XR / Virtual Production' },
      { topic: '3D Gaussian Splatting (3DGS)' },
      {},
    ],
  },
  {
    id: 'coaching',
    icon: <Lightbulb className={iconClass} />,
    shortTitle: 'Coaching',
    category: '2× Coaching',
    tagline: 'For the builders who need a sounding board.',
    body: 'One-on-one and small group coaching sessions pairing AI and XR startups with industry mentors. Get direct feedback, sharpen your pitch, and find your next move.',
    meta: 'Day 1–2 · Limited Seats',
    sessionSlots: [
      { topic: 'Women Empowerment' },
      {
        topic: 'Student Empowerment',
        speaker: { name: 'Speaker Name', jobTitle: 'Speaker Job Title' },
      },
    ],
  },
  {
    id: 'hackathon',
    icon: <Clapperboard className={iconClass} />,
    shortTitle: 'AI Filmmaking',
    category: 'Hackathon Grand Final',
    tagline: "The proving ground for Asia's next XR filmmakers.",
    body: 'Teams compete live with AI-assisted filmmaking tools, judged by industry leaders. The Grand Final is where months of regional competition converge into one stage.',
    meta: 'Day 2 · Competition Stage',
  },
  {
    id: 'esports',
    icon: <Gamepad2 className={iconClass} />,
    shortTitle: 'Esports',
    category: 'Esports Grand Final',
    tagline: 'Competitive gaming, produced like a broadcast.',
    body: 'The MLBB Cup Grand Final — produced using XR stage technology, volumetric graphics, and AI-driven broadcast systems. Where esports meets next-generation live production.',
    meta: 'Day 2 · Esports Arena',
  },
  {
    id: 'gala',
    icon: <Sparkles className={iconClass} />,
    shortTitle: 'Gala',
    category: 'Awards Gala',
    tagline: 'The night the industry celebrates itself.',
    body: 'An awards ceremony and gala dinner recognising excellence across XR education, film production, broadcast, and esports. 600+ peers, clients, and industry leaders in one room.',
    meta: 'Day 2 · Night',
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
// Expanded Panel — improved text readability
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
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Section with sticky tabs
// ─────────────────────────────────────────────────────────────────────────────

type XrasActivationsSectionProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const XrasActivationsSection = ({
  onDownloadBrochure,
  onRegister,
}: XrasActivationsSectionProps) => {
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
      aria-labelledby="xras-activations-heading"
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
          <h2
            id="xras-activations-heading"
            className="font-heading font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#f8faff' }}
          >
            3 Days. 7 Experiences.{' '}
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
            Request Brochure
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

export default XrasActivationsSection;