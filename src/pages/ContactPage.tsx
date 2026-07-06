import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Mic2, Newspaper, Send, Building2, GraduationCap, Landmark, LayoutGrid } from 'lucide-react';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import ContactForm from '../components/contact/ContactForm';
import ContactSidebar from '../components/contact/ContactSidebar';
import { LEGAL_PAGES } from '../core/content/legalPages';
import {
  PARTNERSHIP_CARDS,
  SPEAKER_EVENTS,
  MEDIA_PERKS,
  MEDIA_ACCREDITATION_CTA,
} from '../core/content/contactPage';
import { useLeadCapture } from '../context/LeadCaptureContext';
import type { LeadCaptureConfig, LeadInterest } from '../core/content/leadCapture';

/* ── Fade-up variant shared across sections ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* ── Partnership card icon map ─── */
const CARD_ICONS: Record<string, React.ReactNode> = {
  sponsors: <LayoutGrid size={18} />,
  exhibitors: <Building2 size={18} />,
  government: <Landmark size={18} />,
  universities: <GraduationCap size={18} />,
};

/* ── Lead capture CTA button ─── */
const CaptureBtn = ({ config, children }: { config: LeadCaptureConfig; children: React.ReactNode }) => {
  const { openLeadCapture } = useLeadCapture();
  return (
    <button type="button" onClick={() => openLeadCapture(config)} className="btn-orange inline-flex items-center gap-1.5 px-5 py-2.5">
      {children}
      <ChevronRight size={12} />
    </button>
  );
};

const PARTNERSHIP_CAPTURE: Record<string, LeadCaptureConfig> = {
  sponsors: {
    title: 'Sponsorship Package Details',
    description: 'Share your details to receive sponsorship package information and start a conversation with our partnerships team.',
    defaultInterest: 'Sponsorship package',
    intent: 'sponsor-docs',
  },
  exhibitors: {
    title: 'Exhibitor Package Details',
    description: 'Share your details to receive exhibitor package information and start a conversation with our team.',
    defaultInterest: 'Exhibitor package',
    intent: 'exhibitor-docs',
  },
  government: {
    title: 'Government Partnership Details',
    description: 'Tell us about your agency and how we can collaborate on immersive technology initiatives.',
    defaultInterest: 'Government partnership',
    intent: 'enquiry',
  },
  universities: {
    title: 'University Partnership Details',
    description: 'Connect your institution with Asia\'s XR ecosystem — share your details and we\'ll be in touch.',
    defaultInterest: 'University partnership',
    intent: 'enquiry',
  },
};

/* ═══════════════════════════════════════════════ */
const ContactPage = () => {
  const generalRef = useRef<HTMLDivElement>(null);

  const scrollToGeneral = () => {
    generalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | XR Summits</title>
        <meta
          name="description"
          content="Contact XR Summits for partnerships, sponsorships, speaker applications, media enquiries, and general information."
        />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden pt-36 pb-16 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% -10%, rgba(251,146,60,0.07) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
        {/* subtle horizontal rule */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.2) 50%, transparent)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            {...fadeUp(0)}
            className="font-mono tracking-[0.4em] uppercase mb-5 text-accent"
            style={{ fontSize: '0.88rem', opacity: 0.75 }}
          >
            Contact Us
          </motion.p>
          <motion.h1
            {...fadeUp(0.07)}
            className="font-heading font-black text-foreground leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
          >
            Every Connection{' '}
            <span className="gradient-text-accent">Starts Here.</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.15)}
            className="text-copy-lg mt-5 max-w-lg mx-auto"
          >
            Whether you're looking to partner, speak, exhibit, or simply find out more — you're in the right place.
          </motion.p>
          {/* Quick jump links */}
          <motion.div
            {...fadeUp(0.22)}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {['Partnerships', 'Speakers', 'Media', 'General'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (label === 'General') {
                    scrollToGeneral();
                  } else {
                    document.getElementById(`section-${label.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="chip-nav"
              >
                {label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Partnerships ──────────────────────────────── */}
      <section
        id="section-partnerships"
        className="relative w-full px-6"
        style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>Partnerships</SectionEyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            {/* Introductory panel */}
            <motion.div
              {...fadeUp(0)}
              className="lg:col-span-3 rounded-xl p-7 callout-accent"
            >
              <p className="text-copy-lg">
                XR Summits connects your brand with Asia's most engaged immersive tech community — across two flagship events, thousands of attendees, and a regional network of industry decision-makers.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARTNERSHIP_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                {...fadeUp(i * 0.07)}
                className="flex flex-col justify-between surface-card p-7 gap-6"
              >
                <div>
                  {/* label */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-accent/70">{CARD_ICONS[card.id]}</span>
                    <span className="text-accent-label">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-copy-sm">
                    {card.body}
                  </p>
                </div>
                <CaptureBtn config={PARTNERSHIP_CAPTURE[card.id]}>
                  {card.cta.label}
                </CaptureBtn>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Speaker Applications ──────────────────────── */}
      <section
        id="section-speakers"
        className="relative w-full px-6 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: 'var(--section-padding-y)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(251,146,60,0.04) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionEyebrow>Speaker Applications</SectionEyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <motion.h2
                {...fadeUp(0)}
                className="font-heading font-black text-foreground leading-tight mb-5"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                Share Your Expertise With Asia&apos;s{' '}
                <span className="gradient-text-accent">Immersive Tech Community</span>
              </motion.h2>
              <motion.p
                {...fadeUp(0.07)}
                className="text-copy mb-6"
              >
                We welcome applications from industry practitioners, researchers, policymakers, and innovators with perspectives worth hearing. We're currently accepting applications for{' '}
                <strong className="text-foreground/80">XR ASIA SUMMITs 2026</strong> and the{' '}
                <strong className="text-foreground/80">AI-XR Cultural Innovation Forum</strong>.
              </motion.p>
              {/* What we look for */}
              <motion.div
                {...fadeUp(0.12)}
                className="surface-card p-6"
              >
                <p className="text-micro-label mb-4">
                  What we look for
                </p>
                <p className="text-copy-sm">
                  Talks that are grounded in real experience, challenge conventional thinking, or showcase applied work in XR, AI, spatial media, or immersive storytelling.
                </p>
              </motion.div>
            </div>
            {/* Right — event cards */}
            <div className="flex flex-col gap-4">
              {SPEAKER_EVENTS.map((ev, i) => (
                <motion.div
                  key={ev.label}
                  {...fadeUp(i * 0.1)}
                  className="flex flex-col surface-card p-6 gap-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ border: '1px solid rgba(251,146,60,0.25)', background: 'rgba(251,146,60,0.07)' }}
                    >
                      <Mic2 size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-micro-label mb-1">
                        Speaker Application
                      </p>
                      <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.88rem' }}>
                        {ev.event}
                      </p>
                    </div>
                  </div>
                  <CaptureBtn
                    config={{
                      title: ev.label,
                      description: `Apply to speak at ${ev.event}. Share your details and our programming team will follow up.`,
                      eventName: ev.event,
                      defaultInterest: 'Speaker application',
                      intent: 'enquiry',
                    }}
                  >
                    {ev.label}
                  </CaptureBtn>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Enquiries ───────────────────────────── */}
      <section
        id="section-media"
        className="relative w-full px-6 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: 'var(--section-padding-y)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow>Media Enquiries</SectionEyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — intro + accreditation CTA */}
            <div>
              <motion.h2
                {...fadeUp(0)}
                className="font-heading font-black text-foreground leading-tight mb-5"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                Covering{' '}
                <span className="gradient-text-accent">Immersive Technology</span>{' '}
                or Asia&apos;s Digital Future?
              </motion.h2>
              <motion.p
                {...fadeUp(0.07)}
                className="text-copy mb-6"
              >
                XR Summits offers press accreditation, speaker access, and exclusive content opportunities for credentialled media covering immersive technology, the creative economy, or Asia's digital future.
              </motion.p>
              <motion.div
                {...fadeUp(0.12)}
                className="surface-card p-8 flex flex-col items-start gap-6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ border: '1px solid rgba(251,146,60,0.25)', background: 'rgba(251,146,60,0.07)' }}
                >
                  <Newspaper size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground mb-2" style={{ fontSize: '1.05rem' }}>
                    {MEDIA_ACCREDITATION_CTA.label}
                  </p>
                  <p className="text-copy-sm">
                    Fill in your details — name, outlet, role, and coverage angle — and our team will be in touch with next steps.
                  </p>
                </div>
                <CaptureBtn
                  config={{
                    title: MEDIA_ACCREDITATION_CTA.label,
                    description: 'Apply for press accreditation — share your details and our media team will be in touch.',
                    defaultInterest: 'Media / press' as LeadInterest,
                    intent: 'enquiry',
                  }}
                >
                  {MEDIA_ACCREDITATION_CTA.label}
                </CaptureBtn>
              </motion.div>
            </div>
            {/* Right — perks */}
            <motion.div
              {...fadeUp(0.1)}
              className="surface-card p-6"
            >
              <p className="text-micro-label mb-4">
                What's available
              </p>
              <div className="flex flex-wrap gap-2">
                {MEDIA_PERKS.map((perk) => (
                  <span
                    key={perk}
                    className="chip-tag"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── General Enquiries + Form ──────────────────── */}
      <section
        id="section-general"
        ref={generalRef}
        className="relative w-full px-6 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: 'var(--section-padding-y)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 20% 60%, rgba(251,146,60,0.04) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionEyebrow>General Enquiries</SectionEyebrow>
          {/* Intro */}
          <motion.div {...fadeUp(0)} className="mb-10 max-w-2xl">
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                style={{ border: '1px solid rgba(251,146,60,0.25)', background: 'rgba(251,146,60,0.07)' }}
              >
                <Send size={16} className="text-accent" />
              </div>
              <div>
                <h2
                  className="font-heading font-black text-foreground mb-2 leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
                >
                  Not Sure Where to Start?{' '}
                  <span className="gradient-text-accent">That&apos;s Fine.</span>
                </h2>
                <p className="text-copy">
                  Drop us a message and we'll point you in the right direction. No question is too small, no idea too early.
                </p>
              </div>
            </div>
          </motion.div>
          {/* Form + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <motion.div {...fadeUp(0.05)} className="lg:col-span-3">
              <ContactForm />
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
              <ContactSidebar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Legal ─────────────────────────────────────── */}
      <section
        className="relative w-full px-6 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: 'var(--section-padding-y)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionEyebrow align="center">Legal & Policies</SectionEyebrow>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-8">
            {LEGAL_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  to={page.path}
                  className="block px-4 py-3 rounded-lg text-[1rem] transition-colors duration-300 hover:text-accent"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'rgba(107,127,163,0.75)',
                  }}
                >
                  {page.title}
                  <span className="ml-2 opacity-40" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ContactPage;