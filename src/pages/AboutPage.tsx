import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillarCard from '../components/about/PillarCard';
import AboutSectionShell from '../components/about/page/AboutSectionShell';
import CompanyOverviewBlock from '../components/about/page/CompanyOverviewBlock';
import OurMissionBlock from '../components/about/page/OurMissionBlock';
import {
  AIIcon,
  SpatialIcon,
  GlobeIcon,
  TalentIcon,
} from '../components/about/page/aboutIcons';
import {
  ABOUT_ACCENT,
  AWARDS_RECOGNITION,
  COMPANY_OVERVIEW,
  WHY_XR_PILLARS,
  INDUSTRY_FOCUS,
  // MEDIA_PRESS,
  // STRATEGIC_PARTNER_SLOTS,
  OUR_MISSION,
  REGIONAL_NETWORK,
  epicenterTarget,
  networkNodes,
  epicenterNodes,
} from '../core/content/aboutPage';

// Icons mapping for Why XR
const whyIcons = [<AIIcon key="ai" />, <SpatialIcon key="flex" />, <TalentIcon key="exp" />, <GlobeIcon key="prod" />];


const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | XR Summits</title>
      <meta name="description" content="Learn about XR Summits — company overview, mission, awards, partners, and media." />
    </Helmet>

    {/* 1. Company Overview */}
    <AboutSectionShell id="company-overview" eyebrow="Company Overview" title={COMPANY_OVERVIEW.title} showTopBorder={false}>
      <CompanyOverviewBlock />
    </AboutSectionShell>

    {/* 2. Our Mission */}
    <AboutSectionShell id="our-mission" eyebrow="Our Mission" title={OUR_MISSION.title}>
      <OurMissionBlock />
    </AboutSectionShell>

    {/* 3. Why XR Asia Summit */}
    <AboutSectionShell id="why-xr-summits" eyebrow="Why XR Asia Summit" title="Why XR Asia Summit">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
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

    <AboutSectionShell id="industry-focus" eyebrow="Industry Focus" title="Industry Focus">
      <div className="max-w-5xl">
        <p className="text-foreground-muted leading-relaxed mb-10" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
          {INDUSTRY_FOCUS.description}
        </p>

        {/* Card grid — 2 col mobile, 3 col md, tapi 5 item jadi: 2-2-1 atau pakai auto-fit */}
        <div
          className="grid gap-4 mb-10"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {INDUSTRY_FOCUS.sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-xl"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,10,10,0.6)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.85) 100%)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5 px-4 py-4">
                {/* Accent bar + title */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-1 h-3.5 rounded-full flex-shrink-0"
                    style={{ background: ABOUT_ACCENT }}
                    aria-hidden="true"
                  />
                  <h4
                    className="font-heading font-bold text-foreground leading-tight"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {sector.title}
                  </h4>
                </div>
                <p
                  className="leading-relaxed pl-3"
                  style={{ fontSize: '0.72rem', color: 'rgba(139,155,180,0.85)', lineHeight: 1.65 }}
                >
                  {sector.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </AboutSectionShell>
    {/* 4. Regional Network */}
    <AboutSectionShell
      id="regional-network"
      eyebrow={REGIONAL_NETWORK.title}
      title={REGIONAL_NETWORK.highlight}
    >
      <div className="flex flex-col gap-10 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-foreground-muted leading-relaxed max-w-3xl"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}
        >
          {REGIONAL_NETWORK.body}
        </motion.p>

        {/* Code-Based Animated Network Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative w-full mt-4 rounded-[18px] p-1"
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 0 32px rgba(239,120,61,0.06)',
          }}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden glass"
            style={{
              background: 'radial-gradient(circle at 75% 70%, rgba(239,120,61,0.06) 0%, rgba(5,5,5,0) 60%)',
              border: '1px solid rgba(239,120,61,0.25)',
              boxShadow: 'inset 0 0 0 1px rgba(239,120,61,0.08)',
            }}
          >
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div className="min-w-[700px] w-full p-6 lg:p-10">
                <svg viewBox="0 0 850 400" className="w-full h-auto drop-shadow-md">

                  {/* 1. Animated Connecting Lines */}
                  {networkNodes.map((node, i) => (
                    <motion.line
                      key={`line-${node.id}`}
                      x1={node.x}
                      y1={node.y}
                      x2={epicenterTarget.x}
                      y2={epicenterTarget.y}
                      stroke={ABOUT_ACCENT}
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      strokeOpacity="0.25"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 1.8, ease: "easeOut" }}
                    />
                  ))}

                  {/* 2. Dots & Labels */}
                  {[...networkNodes, ...epicenterNodes].map((node, i) => {
                    const isEpicenter = node.id === 'my' || node.id === 'id';
                    const delay = isEpicenter ? 0.2 : 0.8 + i * 0.05;

                    return (
                      <g key={`node-${node.id}`}>
                        {/* Pulsing Aura */}
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={isEpicenter ? 20 : 12}
                          fill="transparent"
                          stroke={ABOUT_ACCENT}
                          strokeWidth="1"
                          initial={{ scale: 0.2, opacity: 0 }}
                          animate={{ scale: 1.8, opacity: [0, 0.4, 0] }}
                          transition={{ repeat: Infinity, duration: isEpicenter ? 2.5 : 3, delay: i * 0.2 }}
                        />

                        {/* Solid Center Dot */}
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={isEpicenter ? 7 : 4}
                          fill={ABOUT_ACCENT}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay, type: "spring", stiffness: 200, damping: 10 }}
                          style={{ filter: `drop-shadow(0 0 8px ${ABOUT_ACCENT})` }}
                        />

                        {/* Legible Text Label */}
                        <motion.text
                          x={node.x}
                          y={node.y - (isEpicenter ? 16 : 12)}
                          fill="#f0f4ff"
                          fontSize={isEpicenter ? "16px" : "13px"}
                          fontWeight={isEpicenter ? "bold" : "normal"}
                          textAnchor="middle"
                          letterSpacing="0.05em"
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: delay + 0.2, duration: 0.4 }}
                          style={{ fontFamily: 'var(--font-sans)', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                          {node.label}
                        </motion.text>
                      </g>
                    );
                  })}

                  {/* Epicenter Label Tag */}
                  <motion.text
                    x={epicenterTarget.x + 40}
                    y={epicenterTarget.y}
                    fill={ABOUT_ACCENT}
                    fontSize="10px"
                    fontWeight="bold"
                    letterSpacing="0.3em"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    EPICENTER
                  </motion.text>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AboutSectionShell>
    {/* 5. Awards & Recognition */}
    <AboutSectionShell id="awards" eyebrow="Awards & Recognition" title="Awards & Recognition">
      <div className="flex flex-col gap-6 mb-12">
        <p className="text-foreground-muted leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.85 }}>
          <strong className="text-foreground font-bold">{AWARDS_RECOGNITION.companyName}</strong>
          {AWARDS_RECOGNITION.introRest}
        </p>

      </div>
      <div className='bg-white rounded-md'>
        <img src={AWARDS_RECOGNITION.image} alt="Awards & Recognition" className="w-full h-full object-cover rounded-md" />

      </div>
    </AboutSectionShell>

    {/* 6. Strategic Partners */}
    {/* <AboutSectionShell id="strategic-partners" eyebrow="Strategic Partners" title="Partners powering the ecosystem" description="Logo assets will be published as partnerships are confirmed. Phase 1 uses elegant placeholders.">
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
    </AboutSectionShell> */}

    {/* 7. Media & Press */}
    {/* <AboutSectionShell id="media-press" eyebrow="Media & Press" title="Press resources & accreditation" description="Media kits, releases, and press pass applications — placeholders for Phase 1.">
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
    </AboutSectionShell> */}
  </>
);

export default AboutPage;