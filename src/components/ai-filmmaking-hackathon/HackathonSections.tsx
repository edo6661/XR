import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  Clapperboard,
  Cpu,
  FileStack,
  Film,
  Gift,
  ImageIcon,
  MapPin,
  Medal,
  Megaphone,
  Scale,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  UtensilsCrossed,
  Video,
  Wrench,
} from 'lucide-react';
import AboutSectionShell from '../about/page/AboutSectionShell';
import PillarCard from '../about/PillarCard';
import FeeInclusionsCarousel from './FeeInclusionsCarousel';
import IconCard, { bulletList } from './IconCard';
import MothershipMissionsCarousel from './MothershipMissionsCarousel';
import {
  HACKATHON_ACCENT,
  HACKATHON_BENEFITS,
  HACKATHON_CHALLENGE_BRIEF,
  HACKATHON_CHECKIN,
  HACKATHON_CLOSING,
  HACKATHON_DELIVERABLES,
  HACKATHON_EXPERIENCE_FRAMEWORK,
  HACKATHON_FINALS_QUALIFICATION,
  HACKATHON_META,
  HACKATHON_MOTHERSHIP_MISSION,
  HACKATHON_PARTICIPATION_FEE,
  HACKATHON_PRIZE_STRUCTURE,
  HACKATHON_RULES,
} from '../../core/content/aiFilmmakingHackathon';

const iconSize = { size: 20, strokeWidth: 1.5 };
const iconSizeLg = { size: 22, strokeWidth: 1.5 };

const FRAMEWORK_ICONS = [
  <Users key="cohort" {...iconSize} />,
  <Calendar key="cadence" {...iconSize} />,
  <ShieldCheck key="endorse" {...iconSize} />,
  <Wrench key="support" {...iconSize} />,
];

const deliverableIcons = [
  <Clapperboard key="film" {...iconSizeLg} />,
  <Smartphone key="social" {...iconSizeLg} />,
  <Video key="bts" {...iconSizeLg} />,
  <ImageIcon key="art" {...iconSizeLg} />,
  <FileStack key="docs" {...iconSizeLg} />,
];

const benefitIcons = [
  <Trophy key="prize" {...iconSizeLg} />,
  <Cpu key="ai" {...iconSizeLg} />,
  <Sparkles key="workshop" {...iconSizeLg} />,
  <Megaphone key="exposure" {...iconSizeLg} />,
  <Award key="cert" {...iconSizeLg} />,
];

const inclusionIcons = [
  <Users key="group" {...iconSizeLg} />,
  <Sparkles key="tokens" {...iconSizeLg} />,
  <UtensilsCrossed key="food" {...iconSizeLg} />,
  <Wrench key="ops" {...iconSizeLg} />,
];

const ruleIcons = [
  <Users {...iconSize} />,
  <Film {...iconSize} />,
  <Scale {...iconSize} />,
  <Cpu {...iconSize} />,
  <Shield {...iconSize} />,
  <Star {...iconSize} />,
  <ShieldCheck {...iconSize} />,
  <Video {...iconSize} />,
  <Scale {...iconSize} />,
  <Award {...iconSize} />,
];

const prizeIcons = [
  <Trophy {...iconSizeLg} />,
  <Medal {...iconSizeLg} />,
  <Film {...iconSizeLg} />,
  <Gift {...iconSizeLg} />,
  <Star {...iconSizeLg} />,
  <Award {...iconSizeLg} />,
];

const closingStatIcons = [
  <MapPin key="loc" {...iconSize} />,
  <Trophy key="prize" {...iconSize} />,
];

type HackathonSectionsProps = {
  registerUrl: string;
};

const LightBokehBackdrop = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(680px,90vw)] h-[380px]"
      style={{
        background: `radial-gradient(ellipse, ${HACKATHON_ACCENT} 0%, transparent 68%)`,
        filter: 'blur(80px)',
        opacity: 0.07,
      }}
    />
    <div
      className="absolute top-[18%] left-[8%] w-40 h-40 rounded-full opacity-[0.35]"
      style={{
        background: 'radial-gradient(circle, rgba(200,218,240,0.9) 0%, transparent 70%)',
        filter: 'blur(2px)',
      }}
    />
    <div
      className="absolute top-[42%] right-[12%] w-24 h-24 rounded-full opacity-[0.28]"
      style={{
        background: 'radial-gradient(circle, rgba(147,197,253,0.85) 0%, transparent 70%)',
        filter: 'blur(1px)',
      }}
    />
    <div
      className="absolute bottom-[22%] left-[22%] w-16 h-16 rounded-full opacity-[0.22]"
      style={{
        background: 'radial-gradient(circle, rgba(251,146,60,0.55) 0%, transparent 70%)',
      }}
    />
    <div
      className="absolute top-[28%] right-[28%] w-10 h-10 rounded-full opacity-[0.2]"
      style={{
        background: 'radial-gradient(circle, rgba(34,211,238,0.7) 0%, transparent 70%)',
      }}
    />
    <div
      className="absolute bottom-[35%] right-[18%] w-14 h-14 rounded-full opacity-[0.18]"
      style={{
        background: 'radial-gradient(circle, rgba(167,139,250,0.65) 0%, transparent 70%)',
      }}
    />
  </div>
);

/** Framework + Deliverables on #fcfcfd with bokeh */
export const HackathonFrameworkGroup = () => (
  <div className="relative" style={{ backgroundColor: '#fcfcfd' }}>
    <LightBokehBackdrop />
    <div className="relative z-10">
      <AboutSectionShell
        id="experience-framework"
        eyebrow="Hackathon Experience"
        tone="light"
        title={
          <>
            <span className="text-accent">Hackathon</span> Experience Framework
          </>
        }
        description={HACKATHON_EXPERIENCE_FRAMEWORK.intro}
        showTopBorder={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {HACKATHON_EXPERIENCE_FRAMEWORK.pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              index={index}
              icon={FRAMEWORK_ICONS[index]}
              title={pillar.title}
              description={pillar.description}
              accentColor={HACKATHON_ACCENT}
              isFeatured={index === 0}
            />
          ))}
        </div>
      </AboutSectionShell>

      <AboutSectionShell
        id="challenge-deliverables"
        eyebrow="Challenge Brief"
        tone="light"
        title={
          <>
            Core Challenge <span className="text-accent">Deliverables</span>
          </>
        }
        description={HACKATHON_CHALLENGE_BRIEF}
      >
        <p className="text-on-light-muted mb-8 max-w-3xl" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
          {HACKATHON_DELIVERABLES.intro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {HACKATHON_DELIVERABLES.items.map((item, index) => {
            const isFeatured = index === 0;
            const isWide = index === 4;
            const spanClass = isFeatured
              ? 'sm:col-span-2 lg:col-span-3'
              : isWide
                ? 'sm:col-span-2 lg:col-span-6'
                : 'lg:col-span-2';

            return (
              <IconCard
                key={item.title}
                className={spanClass}
                icon={deliverableIcons[index]}
                title={item.title}
                description={'description' in item ? item.description : undefined}
                bullets={'bullets' in item ? item.bullets : undefined}
                index={index}
                featured={isFeatured}
              />
            );
          })}
        </div>
      </AboutSectionShell>
    </div>
  </div>
);

/** Missions only — dark mid scene */
export const HackathonMissionsGroup = () => (
  <AboutSectionShell
    id="mothership-missions"
    eyebrow={HACKATHON_MOTHERSHIP_MISSION.eyebrow}
    title={
      <>
        MOTHERSHIP MISSION:{' '}
        <span className="gradient-text-accent">&ldquo;PACKAGING FUTURES&rdquo;</span>
      </>
    }
    showTopBorder={false}
  >
    <MothershipMissionsCarousel />
  </AboutSectionShell>
);

/** Benefits with big Prize Pool highlight — dark scene stays */
export const HackathonBenefitsGroup = () => {
  const [prizePool, ...otherBenefits] = HACKATHON_BENEFITS.items;

  return (
    <AboutSectionShell
      id="participant-benefits"
      eyebrow="Benefits"
      title={
        <>
          <span className="gradient-text-accent">Participant</span> Benefits
        </>
      }
      showTopBorder={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65 }}
        className="relative mb-8 overflow-hidden rounded-2xl px-6 py-8 md:px-10 md:py-10"
        style={{
          background: `linear-gradient(135deg, ${HACKATHON_ACCENT}18 0%, rgba(9,18,34,0.92) 45%, rgba(6,32,72,0.95) 100%)`,
          border: `1px solid ${HACKATHON_ACCENT}40`,
          boxShadow: `0 24px 56px rgba(0,0,0,0.35), 0 0 48px ${HACKATHON_ACCENT}12`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${HACKATHON_ACCENT}22 0%, transparent 68%)` }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
          <div className="flex-1">
            <p className="font-semibold tracking-[0.22em] uppercase mb-3" style={{ fontSize: '0.92rem', color: HACKATHON_ACCENT }}>
              Prize Pool @ The Finals
            </p>
            <p
              className="font-heading font-black text-foreground tracking-tight"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 4.5rem)', lineHeight: 0.95 }}
            >
              RM <span style={{ color: HACKATHON_ACCENT }}>25,000</span>
            </p>
            <p className="mt-3 font-semibold tracking-[0.16em] uppercase" style={{ fontSize: '1rem', color: HACKATHON_ACCENT }}>
              {prizePool.subtitle}
            </p>
            <p className="mt-3 max-w-xl" style={{ fontSize: '1.05rem', color: 'rgba(232,238,248,0.88)', lineHeight: 1.65 }}>
              {prizePool.description}
            </p>
          </div>
          <div
            className="flex items-center justify-center rounded-2xl shrink-0"
            style={{
              width: 72,
              height: 72,
              background: `${HACKATHON_ACCENT}18`,
              border: `1px solid ${HACKATHON_ACCENT}35`,
              color: HACKATHON_ACCENT,
            }}
          >
            <Trophy size={34} strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {otherBenefits.map((benefit, index) => (
          <IconCard
            key={benefit.title}
            className={index === 0 ? 'md:col-span-2' : ''}
            icon={benefitIcons[index + 1]}
            title={benefit.title}
            subtitle={'subtitle' in benefit ? benefit.subtitle : undefined}
            description={benefit.description}
            index={index + 1}
            featured={index === 0}
          />
        ))}
      </div>
    </AboutSectionShell>
  );
};

/** Fee + carousel — dark, bridges toward navy */
export const HackathonFeeGroup = () => (
  <div
    className="relative"
    style={{
      background: 'linear-gradient(180deg, #0a1220 0%, #0c1a32 55%, #062048 100%)',
    }}
  >
    <AboutSectionShell
      id="participation-fee"
      eyebrow="Registration"
      title={
        <>
          <span className="gradient-text-accent">{HACKATHON_PARTICIPATION_FEE.amount}</span>{' '}
          {HACKATHON_PARTICIPATION_FEE.label}
        </>
      }
      showTopBorder={false}
    >
      <div className="mb-8 max-w-2xl">
        <h3
          className="font-heading font-bold text-foreground mb-3"
          style={{ fontSize: 'clamp(1.35rem, 3.2vw, 1.85rem)', lineHeight: 1.2 }}
        >
          {HACKATHON_PARTICIPATION_FEE.subsidisedTitle}
        </h3>
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
          {HACKATHON_PARTICIPATION_FEE.intro}
        </p>
      </div>
      <FeeInclusionsCarousel icons={inclusionIcons} />
    </AboutSectionShell>
  </div>
);

/** Rules — immersive universe video background */
export const HackathonRulesGroup = () => (
  <div className="relative overflow-hidden" style={{ backgroundColor: '#062048' }}>
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src="/others/abstract-deep-space.mp4"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(180deg, rgba(6,32,72,0.72) 0%, rgba(5,11,24,0.78) 45%, rgba(5,11,24,0.88) 100%)',
      }}
      aria-hidden="true"
    />

    <div className="relative z-10">
      <AboutSectionShell
        id="requirements-rules"
        eyebrow="Requirements & Rules"
        title={
          <>
            Hackathon Participant{' '}
            <span className="gradient-text-accent">Requirements & Rules</span>
          </>
        }
        showTopBorder={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {HACKATHON_RULES.sections.map((section, index) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ delay: (index % 2) * 0.05, duration: 0.55 }}
              className="group relative flex gap-4 rounded-xl px-5 py-4 overflow-hidden"
              style={{
                background: 'rgba(9, 18, 34, 0.72)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5" aria-hidden="true">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 36,
                    height: 36,
                    background: `${HACKATHON_ACCENT}10`,
                    border: `1px solid ${HACKATHON_ACCENT}20`,
                    color: HACKATHON_ACCENT,
                  }}
                >
                  {ruleIcons[index]}
                </div>
                <span
                  className="font-heading font-black"
                  style={{ fontSize: '1.02rem', letterSpacing: '0.2em', color: `${HACKATHON_ACCENT}50` }}
                >
                  {String(section.number).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-col gap-2 min-w-0">
                <h4 className="font-heading font-bold text-foreground" style={{ fontSize: '1.02rem' }}>
                  {section.title}
                </h4>
                {'intro' in section && section.intro && (
                  <p style={{ fontSize: '1rem', color: 'rgba(220,228,242,0.9)', lineHeight: 1.6 }}>
                    {section.intro}
                  </p>
                )}
                {'paragraphs' in section &&
                  section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)} style={{ fontSize: '1rem', color: 'rgba(220,228,242,0.9)', lineHeight: 1.6 }}>
                      {p}
                    </p>
                  ))}
                {'bullets' in section && section.bullets && bulletList(section.bullets)}
                {'footer' in section && section.footer && (
                  <p className="font-semibold" style={{ fontSize: '1rem', color: 'rgba(200,210,230,0.75)' }}>
                    {section.footer}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-xl px-6 py-5 max-w-4xl"
          style={{
            border: `1px solid ${HACKATHON_ACCENT}30`,
            background: `linear-gradient(135deg, ${HACKATHON_ACCENT}12 0%, rgba(9,18,34,0.82) 100%)`,
          }}
        >
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8, color: 'rgba(232,238,248,0.95)' }}>
            {HACKATHON_FINALS_QUALIFICATION}
          </p>
        </motion.div>
      </AboutSectionShell>
    </div>
  </div>
);

/** Closing + prizes */
export const HackathonAwardsGroup = ({ registerUrl }: HackathonSectionsProps) => (
  <>
    <AboutSectionShell
      id="mothership-statement"
      eyebrow="The Mothership Hackathon"
      title={
        <>
          Isn&apos;t Just Another{' '}
          <span className="gradient-text-accent">AI Filmmaking Competition</span>
        </>
      }
      showTopBorder={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          border: `1px solid ${HACKATHON_ACCENT}25`,
          background: 'linear-gradient(145deg, rgba(22,38,62,0.95) 0%, rgba(9,18,34,0.88) 55%, rgba(13,27,46,0.92) 100%)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.28)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 100% 0%, ${HACKATHON_ACCENT}12 0%, transparent 55%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 p-6 md:p-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 48,
                  height: 48,
                  background: `${HACKATHON_ACCENT}14`,
                  border: `1px solid ${HACKATHON_ACCENT}28`,
                  color: HACKATHON_ACCENT,
                }}
              >
                <Clapperboard size={24} strokeWidth={1.5} />
              </div>
              <p className="font-semibold tracking-[0.14em] uppercase" style={{ fontSize: '1rem', color: HACKATHON_ACCENT }}>
                {HACKATHON_CLOSING.title}
              </p>
            </div>
            <p className="text-foreground leading-relaxed mb-4" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
              {HACKATHON_CLOSING.body}
            </p>
            <p className="text-foreground-muted leading-relaxed" style={{ fontSize: 'clamp(0.92rem, 2.3vw, 1rem)', lineHeight: 1.75 }}>
              {HACKATHON_CLOSING.body2}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[220px]">
            {HACKATHON_CLOSING.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: `${HACKATHON_ACCENT}12`,
                    border: `1px solid ${HACKATHON_ACCENT}22`,
                    color: HACKATHON_ACCENT,
                  }}
                >
                  {closingStatIcons[i]}
                </div>
                <div>
                  <p className="font-semibold tracking-[0.16em] uppercase" style={{ fontSize: '0.88rem', color: 'rgba(180,195,220,0.55)' }}>
                    {stat.label}
                  </p>
                  <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.9rem' }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative flex flex-col sm:flex-row gap-3 px-6 md:px-10 pb-6 md:pb-10 pt-2 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <a
            href={registerUrl}
            target={registerUrl.startsWith('http') ? '_blank' : undefined}
            rel={registerUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[1rem] text-[#050b18] transition-shadow hover:shadow-[0_0_32px_rgba(251,146,60,0.35)]"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              border: '1px solid rgba(251,146,60,0.5)',
            }}
          >
            Register Your Team
          </a>
          <a
            href={`tel:${HACKATHON_META.contactPhone.replace(/-/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-bold tracking-[0.14em] uppercase text-[1rem] transition-opacity hover:opacity-90"
            style={{
              background: 'transparent',
              border: `1px solid ${HACKATHON_ACCENT}55`,
              color: HACKATHON_ACCENT,
            }}
          >
            Contact: {HACKATHON_META.contactPhone}
          </a>
        </div>
      </motion.div>
    </AboutSectionShell>

    <AboutSectionShell
      id="prize-structure"
      eyebrow="Awards"
      title={
        <>
          AI XR Awards <span className="gradient-text-accent">Prize Structure</span>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {HACKATHON_PRIZE_STRUCTURE.prizes.slice(0, 1).map((prize) => (
          <motion.div
            key={prize.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="relative flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl px-6 py-6 overflow-hidden cursor-default"
            style={{
              background: 'linear-gradient(135deg, rgba(22,38,62,0.97) 0%, rgba(9,18,34,0.98) 100%)',
              border: `1px solid ${HACKATHON_ACCENT}40`,
              boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${HACKATHON_ACCENT}22 0%, transparent 70%)` }}
              aria-hidden="true"
            />
            <div
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{
                width: 56,
                height: 56,
                background: `${HACKATHON_ACCENT}18`,
                border: `1px solid ${HACKATHON_ACCENT}30`,
                color: HACKATHON_ACCENT,
              }}
            >
              <Trophy size={28} strokeWidth={1.5} />
            </div>
            <div className="relative flex-1">
              <p className="font-semibold tracking-[0.2em] uppercase mb-1" style={{ fontSize: '0.92rem', color: HACKATHON_ACCENT }}>
                Top Award
              </p>
              <h4 className="font-heading font-bold text-foreground mb-1" style={{ fontSize: '1.25rem' }}>
                {prize.title}
              </h4>
              <p
                className="font-heading font-black mb-2 tracking-tight"
                style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', color: HACKATHON_ACCENT, lineHeight: 1.15 }}
              >
                {prize.amount}
              </p>
              <p style={{ fontSize: '1.02rem', color: 'rgba(232,238,248,0.92)', lineHeight: 1.65 }}>
                {prize.description}
              </p>
            </div>
          </motion.div>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HACKATHON_PRIZE_STRUCTURE.prizes.slice(1).map((prize, index) => (
            <IconCard
              key={prize.title}
              icon={prizeIcons[index + 1]}
              title={prize.title}
              amount={prize.amount}
              description={prize.description}
              index={index + 1}
              featured={index === 0}
            />
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-foreground-muted leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.75 }}>
        {HACKATHON_PRIZE_STRUCTURE.footer}
      </p>
    </AboutSectionShell>
  </>
);

/** Final apply CTA — white fade to footer */
export const HackathonApplyGroup = ({ registerUrl }: HackathonSectionsProps) => (
  <div
    className="relative w-full min-h-dvh overflow-hidden flex flex-col justify-center"
    style={{
      backgroundColor: '#ffffff',
      background: `
        linear-gradient(
          to bottom,
          #f6f8fc 0%,
          #fbfcff 42%,
          #ffffff 100%
        )
      `,
    }}
  >
    <LightBokehBackdrop />
    <div className="relative z-10">
      <AboutSectionShell
        id="event-checkin"
        eyebrow="Applications"
        tone="light"
        title={
          <>
            <span className="text-accent">Apply</span> for the Hackathon
          </>
        }
        description={HACKATHON_CHECKIN.intro}
        showTopBorder={false}
      >
        <div
          className="max-w-4xl rounded-xl px-6 py-6 sm:px-8"
          style={{
            border: '1px solid rgba(26,46,80,0.1)',
            background: 'rgba(255,255,255,0.72)',
            boxShadow: '0 18px 44px rgba(26,46,80,0.08)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    width: 38,
                    height: 38,
                    background: `${HACKATHON_ACCENT}12`,
                    border: `1px solid ${HACKATHON_ACCENT}22`,
                    color: HACKATHON_ACCENT,
                  }}
                >
                  <Smartphone {...iconSize} />
                </div>
                <p className="font-semibold tracking-[0.14em] uppercase" style={{ fontSize: '0.95rem', color: HACKATHON_ACCENT }}>
                  Hackathon Applications
                </p>
              </div>
              <h3
                className="font-heading font-bold text-on-light-heading mb-3"
                style={{ fontSize: 'clamp(1.35rem, 4vw, 2rem)', lineHeight: 1.15 }}
              >
                {HACKATHON_CHECKIN.title}
              </h3>
              <p className="text-on-light-muted leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
                {HACKATHON_CHECKIN.subheadline}
              </p>
              <p className="mt-5 text-on-light-muted leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
                {HACKATHON_CHECKIN.closing}
              </p>
            </div>

            <div className="flex flex-col items-stretch lg:items-end gap-3">
              <a
                href={registerUrl}
                target={registerUrl.startsWith('http') ? '_blank' : undefined}
                rel={registerUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group inline-flex w-full sm:w-auto min-w-[220px] items-center justify-center rounded-sm px-6 py-4 text-center font-bold tracking-[0.18em] uppercase text-[1rem] text-[#050b18] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(251,146,60,0.32)]"
                style={{
                  border: `1px solid ${HACKATHON_ACCENT}55`,
                  background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                }}
              >
                Register Your Team
              </a>
              <a
                href={`tel:${HACKATHON_META.contactPhone.replace(/-/g, '')}`}
                className="inline-flex w-full sm:w-auto min-w-[220px] items-center justify-center rounded-sm px-6 py-3.5 text-center font-bold tracking-[0.14em] uppercase text-[1rem]"
                style={{
                  border: `1px solid rgba(26,46,80,0.15)`,
                  background: 'rgba(255,255,255,0.9)',
                  color: HACKATHON_ACCENT,
                }}
              >
                Contact: {HACKATHON_META.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </AboutSectionShell>
    </div>
  </div>
);

/** @deprecated Prefer composing the exported groups with StackedSection */
const HackathonSections = ({ registerUrl }: HackathonSectionsProps) => (
  <>
    <HackathonFrameworkGroup />
    <HackathonMissionsGroup />
    <HackathonBenefitsGroup />
    <HackathonFeeGroup />
    <HackathonRulesGroup />
    <HackathonAwardsGroup registerUrl={registerUrl} />
    <HackathonApplyGroup registerUrl={registerUrl} />
  </>
);

export default HackathonSections;
