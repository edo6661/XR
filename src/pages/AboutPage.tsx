import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/about/StatCard';
import PillarCard from '../components/about/PillarCard';
import AboutSectionShell from '../components/about/page/AboutSectionShell';
import TrackRecordTimeline from '../components/about/page/TrackRecordTimeline';
import {
  AIIcon,
  SpatialIcon,
  GlobeIcon,
  BuildingIcon,
  TalentIcon,
  MapIcon,
} from '../components/about/page/aboutIcons';
import {
  ABOUT_ACCENT,
  ABOUT_STATS,
  AWARDS,
  COMPANY_OVERVIEW,
  INDUSTRY_FOCUS_PILLARS,
  MEDIA_PRESS,
  OUR_MISSION,
  REGIONAL_NETWORK_PILLARS,
  STRATEGIC_PARTNER_SLOTS,
  TEAM_MEMBERS,
} from '../core/content/aboutPage';
import { COMPANY } from '../core/navigation/routes';

const industryIcons = [<AIIcon key="ai" />, <SpatialIcon key="sp" />, <BuildingIcon key="ent" />, <TalentIcon key="tal" />];
const regionalIcons = [<MapIcon key="kl" />, <GlobeIcon key="sw" />, <GlobeIcon key="asia" />];

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | XR Summits</title>
      <meta
        name="description"
        content="Learn about XR Summits — company overview, mission, track record 2021–2026, awards, partners, team, and media."
      />
    </Helmet>

    {/* Page hero */}
    <section className="relative w-full overflow-hidden pt-32 pb-14 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(251,146,60,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bold tracking-[0.45em] uppercase mb-4"
          style={{ fontSize: '0.52rem', color: 'rgba(251,146,60,0.7)' }}
        >
          About XR Summits
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.75 }}
          className="font-heading font-black text-foreground mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', lineHeight: 1.05 }}
        >
          {COMPANY.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.75 }}
          className="text-foreground-muted max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: '0.88rem', lineHeight: 1.85 }}
        >
          {COMPANY.supportingText}
        </motion.p>
      </div>
    </section>

    {/* 1. Company Overview */}
    <AboutSectionShell
      id="company-overview"
      eyebrow="Company Overview"
      title={COMPANY_OVERVIEW.title}
      showTopBorder={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="flex flex-col gap-5">
          {COMPANY_OVERVIEW.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-foreground-muted leading-relaxed"
              style={{ fontSize: '0.88rem', lineHeight: 1.85 }}
            >
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
      <p
        className="text-foreground-muted max-w-3xl leading-relaxed"
        style={{ fontSize: '0.95rem', lineHeight: 1.9 }}
      >
        {OUR_MISSION.body}
      </p>
    </AboutSectionShell>

    {/* 3. Why XR Summits */}
    <AboutSectionShell
      id="why-xr-summits"
      eyebrow="Why XR Summits"
      title="Industry focus & regional network"
      description="Two complementary strengths — deep sector expertise and a growing pan-Asia convening network."
    >
      <div className="mb-12">
        <h3
          className="font-heading font-bold text-foreground mb-6"
          style={{ fontSize: '0.82rem', letterSpacing: '0.2em' }}
        >
          INDUSTRY FOCUS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {INDUSTRY_FOCUS_PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              index={index}
              icon={industryIcons[index]}
              title={pillar.title}
              description={pillar.description}
              accentColor={pillar.accentColor}
              isFeatured={pillar.featured}
            />
          ))}
        </div>
      </div>

      <div>
        <h3
          className="font-heading font-bold text-foreground mb-6"
          style={{ fontSize: '0.82rem', letterSpacing: '0.2em' }}
        >
          REGIONAL NETWORK
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {REGIONAL_NETWORK_PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              index={index}
              icon={regionalIcons[index]}
              title={pillar.title}
              description={pillar.description}
              accentColor={pillar.accentColor}
              isFeatured={pillar.featured}
            />
          ))}
        </div>
      </div>
    </AboutSectionShell>

    {/* 4. Track Record */}
    <AboutSectionShell
      id="track-record"
      eyebrow="Track Record"
      title="2021 – 2026 Timeline"
      description="Six years of convening Asia's immersive technology community — from inaugural summit to dual gateway model."
    >
      <TrackRecordTimeline />
    </AboutSectionShell>

    {/* 5. Awards & Recognition */}
    <AboutSectionShell
      id="awards"
      eyebrow="Awards & Recognition"
      title="Celebrating excellence in immersive innovation"
      description="The AI/XR Awards programme honours studios, innovators, and leaders at the flagship gala in Kuala Lumpur."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {AWARDS.map((award, index) => (
          <motion.div
            key={award.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.05, duration: 0.55 }}
            className="rounded-xl p-6"
            style={{
              background: 'rgba(10, 20, 36, 0.65)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span
              className="font-bold tracking-[0.32em] uppercase"
              style={{ fontSize: '0.5rem', color: `${ABOUT_ACCENT}88` }}
            >
              {award.category}
            </span>
            <h3 className="font-heading font-bold text-foreground mt-3 mb-2" style={{ fontSize: '0.95rem' }}>
              {award.title}
            </h3>
            <p className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-foreground-muted/55">
              {award.year} · Placeholder
            </p>
          </motion.div>
        ))}
      </div>
    </AboutSectionShell>

    {/* 6. Strategic Partners */}
    <AboutSectionShell
      id="strategic-partners"
      eyebrow="Strategic Partners"
      title="Partners powering the ecosystem"
      description="Logo assets will be published as partnerships are confirmed. Phase 1 uses elegant placeholders."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: STRATEGIC_PARTNER_SLOTS }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            className="flex flex-col items-center justify-center aspect-[2.2/1] rounded-lg"
            style={{
              border: '1px dashed rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <span className="font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/40">
              Partner logo
            </span>
          </motion.div>
        ))}
      </div>
    </AboutSectionShell>

    {/* 7. Our Team */}
    <AboutSectionShell
      id="our-team"
      eyebrow="Our Team"
      title="The people behind XR Summits"
      description="Full team profiles and photography coming soon."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEAM_MEMBERS.map((member, index) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.05, duration: 0.55 }}
            className="rounded-xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(10, 20, 36, 0.6)',
            }}
          >
            <div
              className="aspect-[4/3] flex items-center justify-center"
              style={{
                background: `linear-gradient(160deg, ${ABOUT_ACCENT}12 0%, rgba(10,20,36,0.4) 100%)`,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-foreground-muted/30"
                style={{
                  fontSize: '1.25rem',
                  border: '1px dashed rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                XR
              </div>
            </div>
            <div className="p-5">
              <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.9rem' }}>
                {member.name}
              </p>
              <p className="text-accent mt-1" style={{ fontSize: '0.72rem' }}>
                {member.role}
              </p>
              <p className="font-mono text-[0.5rem] tracking-[0.3em] uppercase mt-2 text-foreground-muted/45">
                {member.department}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </AboutSectionShell>

    {/* 8. Media & Press */}
    <AboutSectionShell
      id="media-press"
      eyebrow="Media & Press"
      title="Press resources & accreditation"
      description="Media kits, releases, and press pass applications — placeholders for Phase 1."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MEDIA_PRESS.map((item, index) => (
          <motion.div
            key={item.outlet}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="flex items-center justify-between gap-4 rounded-xl px-6 py-5"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(13, 27, 46, 0.5)',
            }}
          >
            <div>
              <p className="font-heading font-bold text-foreground" style={{ fontSize: '0.88rem' }}>
                {item.outlet}
              </p>
              <p className="text-foreground-muted mt-1" style={{ fontSize: '0.72rem' }}>
                {item.type}
              </p>
            </div>
            <span className="font-mono text-[0.5rem] tracking-[0.25em] uppercase text-foreground-muted/45 shrink-0">
              {item.date}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[0.68rem] text-[#050b18]"
          style={{
            background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
            border: '1px solid rgba(251,146,60,0.5)',
          }}
        >
          Media enquiries
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </AboutSectionShell>
  </>
);

export default AboutPage;
