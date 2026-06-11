import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  LayoutGrid,
  Wrench,
  GraduationCap,
  Clapperboard,
  Gamepad2,
} from 'lucide-react';
import SectionEyebrow from '../ui/SectionEyebrow';
import { AIXR_SARAWAK_ACCENT } from '../../core/content/aixr2026Sarawak';

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
    body: 'Teams of filmmakers, technologists, and storytellers race to produce AI-assisted short films aligned with UN Sustainable Development Goals. The sprint launches Day 1 and culminates in live pitches Day 2 — with top teams advancing to the Grand Final at XR Asia Summits 2026 in December.',
    meta: 'Day 1 Launch → Day 2 Pitches',
  },
  {
    id: 'esports',
    icon: <Gamepad2 className={iconClass} />,
    shortTitle: 'Esports',
    category: 'Esports Semi Final',
    tagline: 'The road to the Grand Final starts here.',
    body: 'Regional teams compete in the MLBB Cup Semi Finals, with winners advancing to the Grand Final stage at XR Asia Summits 2026 in Kuala Lumpur.',
    meta: 'Day 2 · Competition Stage',
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
        ? `${AIXR_SARAWAK_ACCENT}10`
        : 'rgba(255,255,255,0.02)',
      border: `1px solid ${isActive ? `${AIXR_SARAWAK_ACCENT}40` : 'rgba(255,255,255,0.06)'}`,
      boxShadow: isActive ? `0 0 20px ${AIXR_SARAWAK_ACCENT}08` : 'none',
    }}
    aria-expanded={isActive}
    aria-controls={`activation-panel-${activation.id}`}
  >
    <div
      className="absolute top-0 inset-x-0 h-[2px] rounded-t-xl transition-opacity duration-300"
      style={{
        background: `linear-gradient(90deg, transparent, ${AIXR_SARAWAK_ACCENT}, transparent)`,
        opacity: isActive ? 1 : 0,
      }}
      aria-hidden="true"
    />

    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
      style={{
        background: isActive ? `${AIXR_SARAWAK_ACCENT}15` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isActive ? `${AIXR_SARAWAK_ACCENT}35` : 'rgba(255,255,255,0.06)'}`,
        color: isActive ? AIXR_SARAWAK_ACCENT : 'rgba(139,155,180,0.7)',
      }}
    >
      {activation.icon}
    </div>

    <span
      className="font-bold tracking-[0.08em] uppercase text-center leading-tight transition-colors duration-300 whitespace-nowrap"
      style={{
        fontSize: '0.55rem',
        color: isActive ? AIXR_SARAWAK_ACCENT : 'rgba(139,155,180,0.6)',
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
      border: `1px solid ${AIXR_SARAWAK_ACCENT}18`,
    }}
  >
    <div
      className="absolute top-0 inset-x-0 h-[1px]"
      style={{
        background: `linear-gradient(90deg, transparent 5%, ${AIXR_SARAWAK_ACCENT}55 40%, ${AIXR_SARAWAK_ACCENT}55 60%, transparent 95%)`,
      }}
      aria-hidden="true"
    />

    <div
      className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 60% 100% at 20% 0%, ${AIXR_SARAWAK_ACCENT}05 0%, transparent 100%)`,
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 p-7 md:p-10 lg:p-12">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12">
        <div>
          <span
            className="inline-block font-bold tracking-[0.32em] uppercase mb-4"
            style={{ fontSize: '0.57rem', color: `${AIXR_SARAWAK_ACCENT}90` }}
          >
            {activation.category}
          </span>

          <h3
            className="font-heading font-bold text-foreground leading-tight mb-4"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)' }}
          >
            {activation.tagline}
          </h3>

          <div
            className="w-8 h-px mb-5"
            style={{ background: `${AIXR_SARAWAK_ACCENT}38` }}
          />

          <p
            className="text-foreground-muted leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.85, maxWidth: '58ch' }}
          >
            {activation.body}
          </p>

          {activation.subItems && activation.subItems.length > 0 && (
            <div className="mt-6 flex flex-col gap-2.5">
              {activation.subItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-[0.35em] w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: `${AIXR_SARAWAK_ACCENT}65` }}
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

        <div className="flex md:flex-col md:items-end items-center gap-3 md:gap-0">
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-lg flex-shrink-0"
            style={{
              background: `${AIXR_SARAWAK_ACCENT}10`,
              border: `1px solid ${AIXR_SARAWAK_ACCENT}35`,
              boxShadow: `0 0 16px ${AIXR_SARAWAK_ACCENT}08`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: AIXR_SARAWAK_ACCENT, boxShadow: `0 0 8px ${AIXR_SARAWAK_ACCENT}60` }}
              aria-hidden="true"
            />
            <span
              className="font-mono font-semibold tracking-[0.16em] uppercase whitespace-nowrap"
              style={{ fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)', color: `${AIXR_SARAWAK_ACCENT}dd` }}
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

type AixrActivationsSectionProps = {
  onDownloadBrochure: () => void;
  onRegister: () => void;
};

const AixrActivationsSection = ({
  onDownloadBrochure,
  onRegister,
}: AixrActivationsSectionProps) => {
  const [activeId, setActiveId] = useState<string>(ACTIVATIONS[0].id);

  const activeActivation = ACTIVATIONS.find((a) => a.id === activeId)!;

  const handleTabClick = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      className="relative w-full overflow-hidden px-6"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-labelledby="aixr-activations-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionEyebrow>6 Experiences</SectionEyebrow>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl"
        >
          <h2
            id="aixr-activations-heading"
            className="font-heading font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}
          >
            2 Days. 6 Experiences.{' '}
            <span style={{ color: AIXR_SARAWAK_ACCENT }}>A prelude to XR Asia Summits 2026.</span>
          </h2>
          <p
            className="text-foreground-muted leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}
          >
            16–17 October 2026 · Borneo Convention Centre (BCCK), Kuching, Sarawak. <br /> <span className='font-bold'>Explore what's waiting for you</span>
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.75rem] transition-colors duration-300 hover:text-foreground cursor-none"
            style={{
              color: AIXR_SARAWAK_ACCENT,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${AIXR_SARAWAK_ACCENT}45`,
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

export default AixrActivationsSection;