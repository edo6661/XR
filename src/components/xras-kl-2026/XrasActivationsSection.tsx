import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    category: '2× Masterclass',
    tagline: 'Hands-on, production-ready skills.',
    body: 'Deep-dive technical sessions covering real-world XR workflows — from production pipelines to immersive deployment. Built for practitioners who want to leave with something they can use.',
    meta: 'Day 1–3 · Limited Seats',
    subItems: [
      { label: 'AI-XR / Virtual Production' },
      { label: '3D Gaussian Splatting (3DGS)' },
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
    subItems: [
      { label: 'Women Empowerment', detail: 'By Natalie Loi' },
      {
        label: 'Student Empowerment',
        detail: 'By Ajun John (TedX Speaker "AI Kid of India")',
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
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl transition-all duration-250 cursor-none flex-shrink-0 min-w-[80px] sm:min-w-[92px]"
    style={{
      background: isActive
        ? `linear-gradient(135deg, rgba(239,120,61,0.22), rgba(251,146,60,0.14))`
        : 'rgba(255,255,255,0.025)',
      border: `1px solid ${isActive ? 'rgba(239,120,61,0.65)' : 'rgba(255,255,255,0.07)'}`,
      boxShadow: isActive
        ? `0 0 28px rgba(239,120,61,0.22), inset 0 1px 0 rgba(239,120,61,0.18), 0 4px 16px rgba(0,0,0,0.3)`
        : 'none',
      transform: isActive ? 'translateY(-1px)' : 'none',
    }}
    aria-pressed={isActive}
    aria-controls={`activation-panel-${activation.id}`}
  >
    {/* Active top bar — bold orange */}
    <div
      className="absolute top-0 inset-x-0 h-[2.5px] rounded-t-xl transition-opacity duration-250"
      style={{
        background: `linear-gradient(90deg, transparent, #ef783d, #fb923c, transparent)`,
        opacity: isActive ? 1 : 0,
        boxShadow: isActive ? '0 0 12px rgba(239,120,61,0.8)' : 'none',
      }}
      aria-hidden="true"
    />

    {/* Icon box */}
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250"
      style={{
        background: isActive ? 'rgba(239,120,61,0.2)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isActive ? 'rgba(239,120,61,0.5)' : 'rgba(255,255,255,0.08)'}`,
        color: isActive ? '#ef783d' : 'rgba(168,184,208,0.65)',
        boxShadow: isActive ? '0 0 14px rgba(239,120,61,0.3)' : 'none',
      }}
    >
      {activation.icon}
    </div>

    {/* Label */}
    <span
      className="font-bold tracking-[0.08em] uppercase text-center leading-tight transition-all duration-250 whitespace-nowrap"
      style={{
        fontSize: '0.58rem',
        color: isActive ? '#ef783d' : 'rgba(168,184,208,0.55)',
        textShadow: isActive ? '0 0 16px rgba(239,120,61,0.5)' : 'none',
        fontWeight: isActive ? 800 : 600,
      }}
    >
      {activation.shortTitle}
    </span>
  </motion.button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Expanded Panel — improved text readability
// ─────────────────────────────────────────────────────────────────────────────

const ExpandedPanel = ({ activation }: { activation: Activation }) => (
  <motion.div
    id={`activation-panel-${activation.id}`}
    key={activation.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                      <span className="ml-2" style={{ fontSize: '0.9rem', color: 'rgba(200,215,240,0.88)' }}>
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
  </motion.div>
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
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isTabsSticky, setIsTabsSticky] = useState(false);

  const activeActivation = ACTIVATIONS.find((a) => a.id === activeId)!;

  const handleTabClick = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  /* Observe when the tabs bar becomes sticky */
  useEffect(() => {
    const sentinel = tabsRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTabsSticky(!entry.isIntersecting);
      },
      { threshold: 1, rootMargin: '-65px 0px 0px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
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
      <div className="max-w-7xl mx-auto">
        <SectionEyebrow>7 Experiences</SectionEyebrow>

        <motion.div
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
            <br />
            <span className="font-semibold" style={{ color: '#f8faff' }}>Explore what's waiting for you</span>
          </p>
        </motion.div>

        {/* ── Sticky sentinel + Tab Row ──────────────────────────────── */}
        <div
          ref={tabsRef}
          className="sticky z-40 -mx-6 px-6 py-3 mb-5 transition-all duration-300"
          style={{
            top: '64px',
            background: isTabsSticky
              ? 'rgba(5,5,5,0.94)'
              : 'transparent',
            backdropFilter: isTabsSticky ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: isTabsSticky ? 'blur(20px)' : 'none',
            borderBottom: isTabsSticky
              ? '1px solid rgba(239,120,61,0.15)'
              : '1px solid transparent',
            boxShadow: isTabsSticky
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : 'none',
          }}
        >
          <div
            className="overflow-x-auto pb-1 -mx-1 px-1"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex gap-2.5 w-max sm:w-auto sm:flex-wrap max-w-7xl">
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

        {/* ── Expanded Panel ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeId && (
            <ExpandedPanel
              key={activeActivation.id}
              activation={activeActivation}
            />
          )}
        </AnimatePresence>

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