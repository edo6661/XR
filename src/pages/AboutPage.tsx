import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/about/StatCard';
import PillarCard from '../components/about/PillarCard';
import AboutSectionShell from '../components/about/page/AboutSectionShell';
import {
  AIIcon,
  SpatialIcon,
  GlobeIcon,
  TalentIcon,
} from '../components/about/page/aboutIcons';
import {
  ABOUT_ACCENT,
  ABOUT_STATS,
  AWARDS_RECOGNITION,
  COMPANY_OVERVIEW,
  WHY_XR_PILLARS,
  INDUSTRY_FOCUS,
  MEDIA_PRESS,
  STRATEGIC_PARTNER_SLOTS,
  OUR_MISSION,
} from '../core/content/aboutPage';
import { COMPANY } from '../core/navigation/routes';

// Icons mapping for Why XR
const whyIcons = [<AIIcon key="ai" />, <SpatialIcon key="flex" />, <TalentIcon key="exp" />, <GlobeIcon key="prod" />];

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | XR Summits</title>
      <meta name="description" content="Learn about XR Summits — company overview, mission, awards, partners, and media." />
    </Helmet>

    {/* Page hero */}
    <section className="relative w-full overflow-hidden pt-32 pb-14 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,120,61,0.06) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-bold tracking-[0.45em] uppercase mb-4"
          style={{ fontSize: '0.52rem', color: 'rgba(239,120,61,0.7)' }}
        >
          About XR Summits
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.75 }}
          className="font-heading font-black text-foreground mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', lineHeight: 1.05 }}
        >
          {COMPANY.tagline}
        </motion.h1>
      </div>
    </section>

    {/* 1. Company Overview */}
    <AboutSectionShell id="company-overview" eyebrow="Company Overview" title={COMPANY_OVERVIEW.title} showTopBorder={false}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="flex flex-col gap-5">
          {COMPANY_OVERVIEW.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.85 }}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {ABOUT_STATS.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </AboutSectionShell>

    {/* 2. Our Mission */}
    <AboutSectionShell id="our-mission" eyebrow="Our Mission" title={OUR_MISSION.title}>
      <div className="flex flex-col gap-5 max-w-3xl">
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.95rem', lineHeight: 1.9 }}>
          {OUR_MISSION.body}
        </p>
        {/* TAMBAHAN BARU DARI KLIEN */}
        <p className="font-semibold text-foreground leading-relaxed" style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'rgba(240,244,255,0.95)' }}>
          {OUR_MISSION.highlight}
        </p>
      </div>
    </AboutSectionShell>

    {/* 3. Why XR Summits */}
    <AboutSectionShell id="why-xr-summits" eyebrow="Why XR Summits" title="Why XR Summits">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-16">
        {WHY_XR_PILLARS.map((pillar, index) => (
          <PillarCard
            key={pillar.title}
            index={index}
            icon={whyIcons[index]}
            title={pillar.title}
            description={pillar.description}
            accentColor={pillar.accentColor}
            isFeatured={pillar.featured}
          />
        ))}
      </div>
    </AboutSectionShell>

    {/* 4. Industry Focus */}
    <AboutSectionShell id="industry-focus" eyebrow="Industry Focus" title="Industry Focus">
      <div className="max-w-4xl">
        <p className="text-foreground-muted leading-relaxed mb-8" style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
          {INDUSTRY_FOCUS.description}
        </p>
        <ul className="flex flex-col gap-4 mb-8">
          {INDUSTRY_FOCUS.sectors.map((sector) => (
            <li key={sector.title} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ABOUT_ACCENT }} />
              <p style={{ fontSize: '0.9rem', color: 'rgba(240,244,255,0.85)', lineHeight: 1.7 }}>
                <span className="font-bold text-foreground">{sector.title}: </span>
                {sector.desc}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
          {INDUSTRY_FOCUS.footer}
        </p>
      </div>
    </AboutSectionShell>

    {/* 5. Awards & Recognition */}
    <AboutSectionShell id="awards" eyebrow="Awards & Recognition" title="Celebrating excellence in immersive innovation">
      <div className="max-w-4xl flex flex-col gap-6 mb-12">
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.9rem', lineHeight: 1.85 }}>
          {AWARDS_RECOGNITION.intro}
        </p>
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.9rem', lineHeight: 1.85 }}>
          {AWARDS_RECOGNITION.invitation}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {AWARDS_RECOGNITION.sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.05, duration: 0.55 }}
            className="rounded-xl p-6"
            style={{ background: 'rgba(10, 10, 10, 0.65)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <h3 className="font-heading font-bold text-foreground mb-3" style={{ fontSize: '0.95rem', color: ABOUT_ACCENT }}>
              {section.title}
            </h3>
            <p className="text-foreground-muted leading-relaxed" style={{ fontSize: '0.82rem' }}>
              {section.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </AboutSectionShell>

    {/* 6. Strategic Partners */}
    <AboutSectionShell id="strategic-partners" eyebrow="Strategic Partners" title="Partners powering the ecosystem" description="Logo assets will be published as partnerships are confirmed. Phase 1 uses elegant placeholders.">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: STRATEGIC_PARTNER_SLOTS }, (_, i) => (
          <motion.div
            key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.04, duration: 0.5 }}
            className="flex flex-col items-center justify-center aspect-[2.2/1] rounded-lg"
            style={{ border: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/40">Partner logo</span>
          </motion.div>
        ))}
      </div>
    </AboutSectionShell>

    {/* 7. Media & Press */}
    <AboutSectionShell id="media-press" eyebrow="Media & Press" title="Press resources & accreditation" description="Media kits, releases, and press pass applications — placeholders for Phase 1.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MEDIA_PRESS.map((item, index) => (
          <motion.div
            key={item.outlet} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.06, duration: 0.5 }}
            className="flex items-center justify-between gap-4 rounded-xl px-6 py-5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10, 10, 10, 0.5)' }}
          >
            <div>
              <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.88rem' }}>{item.outlet}</p>
              <p className="text-foreground-muted mt-1" style={{ fontSize: '0.72rem' }}>{item.type}</p>
            </div>
            <span className="font-mono text-[0.5rem] tracking-[0.25em] uppercase text-foreground-muted/45 shrink-0">{item.date}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050505]"
          style={{ background: 'linear-gradient(135deg, #ef783d 0%, #d9652b 100%)', border: '1px solid rgba(239,120,61,0.5)' }}
        >
          Media enquiries
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </AboutSectionShell>
  </>
);

export default AboutPage;