import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, Mic2, Newspaper, Send, Building2, GraduationCap, Landmark, LayoutGrid } from 'lucide-react';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import ContactForm from '../components/contact/ContactForm';
import ContactSidebar from '../components/contact/ContactSidebar';
import { LEGAL_PAGES } from '../core/content/legalPages';
import { PARTNERSHIP_CARDS, SPEAKER_EVENTS, MEDIA_PERKS } from '../core/content/contactPage';

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

const BRAND_ORANGE = '#ef783d';
const BRAND_PURPLE = '#3953a3';

/* ── Shared CTA button ─── */
const CtaBtn = ({
  href,
  variant,
  children,
}: {
  href: string;
  variant: 'orange' | 'purple' | 'ghost';
  children: React.ReactNode;
}) => {
  if (variant === 'orange') {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.72rem] text-[#050505] transition-shadow hover:shadow-[0_0_22px_rgba(239,120,61,0.35)] active:scale-[0.99]"
        style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE}, #d9652b)`, border: '1px solid rgba(239,120,61,0.5)' }}
      >
        {children}
        <ChevronRight size={12} />
      </a>
    );
  }

  if (variant === 'purple') {
    return (
      <a
        href={href}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.72rem] text-[#f0f4ff] transition-shadow hover:shadow-[0_0_22px_rgba(57,83,163,0.4)] active:scale-[0.99]"
        style={{ background: `linear-gradient(135deg, ${BRAND_PURPLE}, #2d4285)`, border: '1px solid rgba(57,83,163,0.55)' }}
      >
        {children}
        <ChevronRight size={12} />
      </a>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.72rem] text-foreground-muted transition-colors hover:text-accent"
      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
    >
      {children}
      <ExternalLink size={11} />
    </a>
  );
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
            style={{ fontSize: '0.55rem', opacity: 0.75 }}
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
            className="text-foreground-muted mt-5 max-w-lg mx-auto"
            style={{ fontSize: '0.9rem', lineHeight: 1.85 }}
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
                className="px-4 py-1.5 rounded-full font-mono tracking-[0.2em] uppercase text-foreground-muted/70 transition-all duration-200 hover:text-accent hover:border-accent/40"
                style={{ fontSize: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
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
              className="lg:col-span-3 rounded-xl p-7"
              style={{ border: '1px solid rgba(251,146,60,0.15)', background: 'rgba(251,146,60,0.03)' }}
            >
              <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.9rem', maxWidth: '64ch' }}>
                XR Summits connects your brand with Asia's most engaged immersive tech community — across two flagship events, thousands of attendees, and a regional network of industry decision-makers.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PARTNERSHIP_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                {...fadeUp(i * 0.07)}
                className="flex flex-col justify-between rounded-xl p-7 gap-6"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.025)',
                }}
              >
                <div>
                  {/* label */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-accent/70">{CARD_ICONS[card.id]}</span>
                    <span
                      className="font-mono tracking-[0.3em] uppercase text-accent/70"
                      style={{ fontSize: '0.5rem' }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <h3
                    className="font-heading font-bold text-foreground mb-3 leading-snug"
                    style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
                  >
                    {card.heading}
                  </h3>
                  <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.82rem' }}>
                    {card.body}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.ctas.map((cta) => (
                    <CtaBtn key={cta.label} href={cta.href} variant={cta.variant}>
                      {cta.label}
                    </CtaBtn>
                  ))}
                </div>
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
                Share Your Expertise With Asia's Immersive Tech Community
              </motion.h2>
              <motion.p
                {...fadeUp(0.07)}
                className="text-foreground-muted leading-relaxed mb-6"
                style={{ fontSize: '0.88rem' }}
              >
                We welcome applications from industry practitioners, researchers, policymakers, and innovators with perspectives worth hearing. We're currently accepting applications for{' '}
                <strong className="text-foreground/80">XR Asia Summits 2026</strong> and the{' '}
                <strong className="text-foreground/80">AI-XR Cultural Innovation Forum</strong>.
              </motion.p>
              {/* What we look for */}
              <motion.div
                {...fadeUp(0.12)}
                className="rounded-xl p-6"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p
                  className="font-mono tracking-[0.28em] uppercase mb-4 text-foreground-muted/55"
                  style={{ fontSize: '0.5rem' }}
                >
                  What we look for
                </p>
                <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.83rem' }}>
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
                  className="flex items-center justify-between rounded-xl p-6 gap-4"
                  style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ border: '1px solid rgba(251,146,60,0.25)', background: 'rgba(251,146,60,0.07)' }}
                    >
                      <Mic2 size={16} className="text-accent" />
                    </div>
                    <div>
                      <p
                        className="font-mono tracking-[0.25em] uppercase text-foreground-muted/55 mb-1"
                        style={{ fontSize: '0.48rem' }}
                      >
                        Speaker Application
                      </p>
                      <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.88rem' }}>
                        {ev.event}
                      </p>
                    </div>
                  </div>
                  <CtaBtn href={ev.href} variant="purple">{ev.label}</CtaBtn>
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
            {/* Left */}
            <div>
              <motion.h2
                {...fadeUp(0)}
                className="font-heading font-black text-foreground leading-tight mb-5"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                Covering Immersive Technology or Asia's Digital Future?
              </motion.h2>
              <motion.p
                {...fadeUp(0.07)}
                className="text-foreground-muted leading-relaxed mb-6"
                style={{ fontSize: '0.88rem' }}
              >
                XR Summits offers press accreditation, speaker access, and exclusive content opportunities for credentialled media covering immersive technology, the creative economy, or Asia's digital future.
              </motion.p>
              {/* Available perks */}
              <motion.div
                {...fadeUp(0.12)}
                className="rounded-xl p-6"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p
                  className="font-mono tracking-[0.28em] uppercase mb-4 text-foreground-muted/55"
                  style={{ fontSize: '0.5rem' }}
                >
                  What's available
                </p>
                <div className="flex flex-wrap gap-2">
                  {MEDIA_PERKS.map((perk) => (
                    <span
                      key={perk}
                      className="px-3 py-1.5 rounded-full text-foreground-muted"
                      style={{
                        fontSize: '0.72rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            {/* Right — CTA card */}
            <motion.div
              {...fadeUp(0.1)}
              className="rounded-xl p-8 flex flex-col items-start gap-6"
              style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ border: '1px solid rgba(251,146,60,0.25)', background: 'rgba(251,146,60,0.07)' }}
              >
                <Newspaper size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground mb-2" style={{ fontSize: '1.05rem' }}>
                  Apply for Media Accreditation
                </p>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Fill in your details — name, outlet, role, and coverage angle — and our team will be in touch with next steps.
                </p>
              </div>
              {/* Inline mini-form link — scrolls to main form with subject pre-set */}
              <a
                href="#section-general"
                onClick={(e) => {
                  e.preventDefault();
                  generalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // subject change handled via URL hash — ContactForm reads it
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.65rem] text-[#050505] transition-shadow hover:shadow-[0_0_22px_rgba(251,146,60,0.35)]"
                style={{ background: 'linear-gradient(135deg,#fb923c,#f97316)', border: '1px solid rgba(251,146,60,0.5)' }}
              >
                Apply for Media Accreditation <ChevronRight size={13} />
              </a>
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
                  Not Sure Where to Start? That's Fine.
                </h2>
                <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem' }}>
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
          <p className="text-center text-foreground-muted text-sm mb-8 max-w-lg mx-auto leading-relaxed">
            Phase 1 placeholder documents — final legal text will be supplied by the client.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LEGAL_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  to={page.path}
                  className="block px-4 py-3 rounded-lg text-[0.78rem] transition-colors duration-300 hover:text-accent"
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