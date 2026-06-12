import { useState } from 'react';
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
import { XRAS_KL_ACCENT } from '../../core/content/xrasKl2026';

// ─────────────────────────────────────────────────────────────────────────────
// Data — exact copy from client brief
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
    body: 'An awards ceremony and gala dinner recognising excellence across XR education, film production, broadcast, and esports. 600+ peers, clients, and industry leaders in one room. The chance to celebrate with your peers, clients and the wider industry by joining us on the night.',
    meta: 'Day 2 · Night',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tab Button
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
    className="group relative flex flex-col items-center gap-2.5 px-4 py-4 rounded-xl transition-all duration-300 cursor-none flex-shrink-0 min-w-[80px] sm:min-w-[90px]"
    style={{
      background: isActive
        ? `${XRAS_KL_ACCENT}12`
        : 'rgba(255,255,255,0.02)',
      border: `1px solid ${isActive ? `${XRAS_KL_ACCENT}40` : 'rgba(255,255,255,0.06)'}`,
      boxShadow: isActive ? `0 0 20px ${XRAS_KL_ACCENT}0a` : 'none',
    }}
    aria-expanded={isActive}
    aria-controls={`activation-panel-${activation.id}`}
  >
    {/* Active indicator line at top */}
    <div
      className="absolute top-0 inset-x-0 h-[2px] rounded-t-xl transition-opacity duration-300"
      style={{
        background: `linear-gradient(90deg, transparent, ${XRAS_KL_ACCENT}, transparent)`,
        opacity: isActive ? 1 : 0,
      }}
      aria-hidden="true"
    />

    {/* Icon */}
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
      style={{
        background: isActive ? `${XRAS_KL_ACCENT}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isActive ? `${XRAS_KL_ACCENT}35` : 'rgba(255,255,255,0.06)'}`,
        color: isActive ? XRAS_KL_ACCENT : 'rgba(139,155,180,0.7)',
      }}
    >
      {activation.icon}
    </div>

    {/* Label */}
    <span
      className="font-bold tracking-[0.08em] uppercase text-center leading-tight transition-colors duration-300 whitespace-nowrap"
      style={{
        fontSize: '0.55rem',
        color: isActive ? XRAS_KL_ACCENT : 'rgba(139,155,180,0.6)',
      }}
    >
      {activation.shortTitle}
    </span>
  </motion.button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Expanded Panel
// ─────────────────────────────────────────────────────────────────────────────

const ExpandedPanel = ({ activation }: { activation: Activation }) => (
  <motion.div
    id={`activation-panel-${activation.id}`}
    key={activation.id}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    className="relative rounded-2xl overflow-hidden"
    style={{
      background:
        'linear-gradient(155deg, rgba(18,30,50,0.7) 0%, rgba(8,16,30,0.9) 100%)',
      border: `1px solid ${XRAS_KL_ACCENT}20`,
    }}
  >
    {/* Accent gradient strip */}
    <div
      className="absolute top-0 inset-x-0 h-[1px]"
      style={{
        background: `linear-gradient(90deg, transparent 5%, ${XRAS_KL_ACCENT}60 40%, ${XRAS_KL_ACCENT}60 60%, transparent 95%)`,
      }}
      aria-hidden="true"
    />

    {/* Faint ambient glow */}
    <div
      className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 60% 100% at 20% 0%, ${XRAS_KL_ACCENT}06 0%, transparent 100%)`,
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 p-7 md:p-10 lg:p-12">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12">
        {/* Left: content */}
        <div>
          {/* Category label */}
          <span
            className="inline-block font-bold tracking-[0.32em] uppercase mb-4"
            style={{ fontSize: '0.57rem', color: `${XRAS_KL_ACCENT}90` }}
          >
            {activation.category}
          </span>

          {/* Tagline */}
          <h3
            className="font-heading font-bold text-foreground leading-tight mb-4"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)' }}
          >
            {activation.tagline}
          </h3>

          {/* Divider */}
          <div
            className="w-8 h-px mb-5"
            style={{ background: `${XRAS_KL_ACCENT}40` }}
          />

          {/* Body copy */}
          <p
            className="text-foreground-muted leading-relaxed mb-0"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.85, maxWidth: '58ch' }}
          >
            {activation.body}
          </p>

          {/* Sub-items (for Masterclass & Coaching) */}
          {activation.subItems && activation.subItems.length > 0 && (
            <div className="mt-6 flex flex-col gap-2.5">
              {activation.subItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span
                    className="mt-[0.35em] w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: `${XRAS_KL_ACCENT}70` }}
                    aria-hidden="true"
                  />
                  <div>
                    <span
                      className="font-semibold text-foreground/80"
                      style={{ fontSize: '0.82rem' }}
                    >
                      {item.label}
                    </span>
                    {item.detail && (
                      <span
                        className="text-foreground-muted ml-2"
                        style={{ fontSize: '0.78rem' }}
                      >
                        — {item.detail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: meta pill */}
        <div className="flex md:flex-col md:items-end items-center gap-3 md:gap-0">
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-lg flex-shrink-0"
            style={{
              background: `${XRAS_KL_ACCENT}10`,
              border: `1px solid ${XRAS_KL_ACCENT}35`,
              boxShadow: `0 0 16px ${XRAS_KL_ACCENT}08`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: XRAS_KL_ACCENT, boxShadow: `0 0 8px ${XRAS_KL_ACCENT}60` }}
              aria-hidden="true"
            />
            <span
              className="font-mono font-semibold tracking-[0.16em] uppercase whitespace-nowrap"
              style={{ fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)', color: `${XRAS_KL_ACCENT}dd` }}
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
// Main Section
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

  const activeActivation = ACTIVATIONS.find((a) => a.id === activeId)!;

  const handleTabClick = (id: string) => {
    if (activeId !== id) {
      setActiveId(id);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden px-6"
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
            className="font-heading font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}
          >
            3 Days. 7 Experiences.{' '}
            <span style={{ color: XRAS_KL_ACCENT }}>One Ecosystem.</span>
          </h2>
          <p
            className="text-foreground-muted leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}
          >
            1–3 December 2026 · Malaysia International Trade and Exhibition Centre (MITEC, Kuala Lumpur)
            <br />
            <span className='font-bold'>Explore what's waiting for you</span>
          </p>
        </motion.div>

        {/* ── Tab Row ──────────────────────────────────────────────────── */}
        <div
          className="overflow-x-auto pb-1 mb-5 -mx-1 px-1"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-2.5 w-max sm:w-auto sm:flex-wrap">
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

        {/* ── Expanded Panel ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeId && (
            <ExpandedPanel
              key={activeActivation.id}
              activation={activeActivation}
            />
          )}
        </AnimatePresence>

        {/* ── CTA Row ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            type="button"
            onClick={onDownloadBrochure}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.75rem] text-accent transition-colors duration-300 hover:text-foreground cursor-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${XRAS_KL_ACCENT}45`,
            }}
          >
            Download Brochure
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.75rem] text-[#050b18] transition-shadow hover:shadow-[0_0_28px_rgba(239,120,61,0.35)] cursor-none"
            style={{
              background: 'linear-gradient(135deg, #ef783d 0%, #d9652b 100%)',
              border: '1px solid rgba(239,120,61,0.5)',
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