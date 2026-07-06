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
import IconCard, { bulletList } from './IconCard';
import {
  HACKATHON_ACCENT,
  HACKATHON_BENEFITS,
  HACKATHON_CHALLENGE_BRIEF,
  HACKATHON_CHECKIN,
  HACKATHON_CLOSING,
  HACKATHON_DELIVERABLES,
  HACKATHON_EXPERIENCE_FRAMEWORK,
  HACKATHON_FINALS_QUALIFICATION,
  HACKATHON_PARTICIPATION_FEE,
  HACKATHON_PRIZE_STRUCTURE,
  HACKATHON_RULES,
} from '../../core/content/aiFilmmakingHackathon';

const iconSize = { size: 20, strokeWidth: 1.5 };
const iconSizeLg = { size: 22, strokeWidth: 1.5 };

const FrameworkIcon = () => <Users {...iconSize} />;
const CadenceIcon = () => <Calendar {...iconSize} />;
const EndorseIcon = () => <ShieldCheck {...iconSize} />;
const SupportIcon = () => <Wrench {...iconSize} />;
const frameworkIcons = [<FrameworkIcon key="cohort" />, <CadenceIcon key="cadence" />, <EndorseIcon key="endorse" />, <SupportIcon key="support" />];

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

const statIcons = [
  <Calendar key="dates" {...iconSize} />,
  <MapPin key="loc" {...iconSize} />,
  <Trophy key="prize" {...iconSize} />,
];

type HackathonSectionsProps = {
  registerUrl: string;
};

const HackathonSections = ({ registerUrl }: HackathonSectionsProps) => (
  <>
    <AboutSectionShell
      id="experience-framework"
      eyebrow="Hackathon Experience"
      title={
        <>
          <span className="gradient-text-accent">Hackathon</span> Experience Framework
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
            icon={frameworkIcons[index]}
            title={pillar.title}
            description={pillar.description}
            accentColor={HACKATHON_ACCENT}
            isFeatured={index === 0}
          />
        ))}
      </div>
    </AboutSectionShell>

    {/* Deliverables — bento grid */}
    <AboutSectionShell
      id="challenge-deliverables"
      eyebrow="Challenge Brief"
      title={
        <>
          Core Challenge{' '}
          <span className="gradient-text-accent">Deliverables</span>
        </>
      }
      description={HACKATHON_CHALLENGE_BRIEF}
    >
      <p className="text-foreground-muted mb-8 max-w-3xl" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
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

    {/* Benefits — featured first + grid */}
    <AboutSectionShell
      id="participant-benefits"
      eyebrow="Benefits"
      title={
        <>
          <span className="gradient-text-accent">Participant</span> Benefits
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HACKATHON_BENEFITS.items.map((benefit, index) => (
          <IconCard
            key={benefit.title}
            className={index === 0 ? 'md:col-span-2' : ''}
            icon={benefitIcons[index]}
            title={benefit.title}
            subtitle={'subtitle' in benefit ? benefit.subtitle : undefined}
            description={benefit.description}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
    </AboutSectionShell>

    {/* Participation fee — 4-up icon row */}
    <AboutSectionShell
      id="participation-fee"
      eyebrow="Registration"
      title={
        <>
          Participation Fee —{' '}
          <span className="gradient-text-accent">{HACKATHON_PARTICIPATION_FEE.amount}</span>
        </>
      }
      description={`${HACKATHON_PARTICIPATION_FEE.label}. ${HACKATHON_PARTICIPATION_FEE.intro}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {HACKATHON_PARTICIPATION_FEE.inclusions.map((item, index) => (
          <IconCard
            key={item.title}
            icon={inclusionIcons[index]}
            title={item.title}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </AboutSectionShell>

    {/* Rules — 2-column compact grid */}
    <AboutSectionShell
      id="requirements-rules"
      eyebrow="Requirements & Rules"
      title={
        <>
          Hackathon Participant{' '}
          <span className="gradient-text-accent">Requirements & Rules</span>
        </>
      }
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
              background: 'rgba(9, 18, 34, 0.52)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="flex shrink-0 flex-col items-center gap-1 pt-0.5"
              aria-hidden="true"
            >
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
                <p style={{ fontSize: '1rem', color: 'rgba(180,195,220,0.88)', lineHeight: 1.6 }}>
                  {section.intro}
                </p>
              )}
              {'paragraphs' in section &&
                section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)} style={{ fontSize: '1rem', color: 'rgba(180,195,220,0.88)', lineHeight: 1.6 }}>
                    {p}
                  </p>
                ))}
              {'bullets' in section && section.bullets && bulletList(section.bullets)}
              {'footer' in section && section.footer && (
                <p className="font-semibold" style={{ fontSize: '1rem', color: 'rgba(180,195,220,0.65)' }}>
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
          border: `1px solid ${HACKATHON_ACCENT}22`,
          background: `linear-gradient(135deg, ${HACKATHON_ACCENT}08 0%, rgba(9,18,34,0.5) 100%)`,
        }}
      >
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
          {HACKATHON_FINALS_QUALIFICATION}
        </p>
      </motion.div>
    </AboutSectionShell>

    {/* Mothership statement — split banner */}
    <AboutSectionShell
      id="mothership-statement"
      eyebrow="The Mothership Hackathon"
      title={
        <>
          Isn&apos;t Just Another{' '}
          <span className="gradient-text-accent">AI Filmmaking Competition</span>
        </>
      }
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
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 100% 0%, ${HACKATHON_ACCENT}12 0%, transparent 55%)`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${HACKATHON_ACCENT}60, transparent)` }}
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
                  {statIcons[i]}
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
            Apply Now
          </a>
        </div>
      </motion.div>
    </AboutSectionShell>

    {/* Prize structure — podium layout */}
    <AboutSectionShell
      id="prize-structure"
      eyebrow="Awards"
      title={
        <>
          AI XR Awards{' '}
          <span className="gradient-text-accent">Prize Structure</span>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Grand Prix — hero */}
        {HACKATHON_PRIZE_STRUCTURE.prizes.slice(0, 1).map((prize) => (
          <motion.div
            key={prize.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl px-6 py-6 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${HACKATHON_ACCENT}14 0%, rgba(9,18,34,0.75) 100%)`,
              border: `1px solid ${HACKATHON_ACCENT}35`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${HACKATHON_ACCENT}18 0%, transparent 70%)` }}
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
              <h4 className="font-heading font-bold text-foreground mb-1" style={{ fontSize: '1.1rem' }}>
                {prize.title}
              </h4>
              <p className="font-semibold mb-2" style={{ fontSize: '0.88rem', color: HACKATHON_ACCENT }}>
                {prize.amount}
              </p>
              <p style={{ fontSize: '1.02rem', color: 'rgba(180,195,220,0.9)', lineHeight: 1.65 }}>
                {prize.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Remaining prizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HACKATHON_PRIZE_STRUCTURE.prizes.slice(1).map((prize, index) => (
            <IconCard
              key={prize.title}
              icon={prizeIcons[index + 1]}
              title={prize.title}
              amount={prize.amount}
              description={prize.description}
              index={index + 1}
            />
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-foreground-muted leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.75 }}>
        {HACKATHON_PRIZE_STRUCTURE.footer}
      </p>
    </AboutSectionShell>

    <AboutSectionShell
      id="event-checkin"
      eyebrow="Applications"
      title={
        <>
          <span className="gradient-text-accent">Apply</span> for the Hackathon
        </>
      }
      description={HACKATHON_CHECKIN.intro}
    >
      <div
        className="max-w-4xl rounded-xl px-6 py-6 sm:px-8"
        style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(9,18,34,0.45)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{ width: 38, height: 38, background: `${HACKATHON_ACCENT}12`, border: `1px solid ${HACKATHON_ACCENT}22`, color: HACKATHON_ACCENT }}
              >
                <Smartphone {...iconSize} />
              </div>
              <p className="font-semibold tracking-[0.14em] uppercase" style={{ fontSize: '0.95rem', color: HACKATHON_ACCENT }}>
                Hackathon Applications
              </p>
            </div>
            <h3 className="font-heading font-bold text-foreground mb-3" style={{ fontSize: 'clamp(1.35rem, 4vw, 2rem)', lineHeight: 1.15 }}>
              {HACKATHON_CHECKIN.title}
            </h3>
            <p className="text-foreground-muted leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
              {HACKATHON_CHECKIN.subheadline}
            </p>
            <p className="mt-5 text-foreground-muted leading-relaxed" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
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
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </AboutSectionShell>
  </>
);

export default HackathonSections;
