import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RegionalNetworkMap from '../components/about/RegionalNetworkMap';
import PastEventsSection from '../components/about/PastEventsSection';
import AboutSectionShell from '../components/about/page/AboutSectionShell';
import CompanyOverviewBlock from '../components/about/page/CompanyOverviewBlock';
import OurMissionBlock from '../components/about/page/OurMissionBlock';
import WhyXrSummitsBlock from '../components/about/page/WhyXrSummitsBlock';
import AwardsRecognitionBlock from '../components/about/page/AwardsRecognitionBlock';
import SustainabilityCommitmentSection from '../components/about/page/SustainabilityCommitmentSection';
import {
  ABOUT_ACCENT,
  INDUSTRY_FOCUS,
  // MEDIA_PRESS,
  // STRATEGIC_PARTNER_SLOTS,
  REGIONAL_NETWORK,
} from '../core/content/aboutPage';

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | XR Summits</title>
      <meta name="description" content="Learn about XR Summits — company overview, mission, awards, partners, and media." />
    </Helmet>

    {/* 1. Company Overview */}
    <AboutSectionShell
      id="company-overview"
      eyebrow="Company Overview"
      title={
        <>
          Connecting Innovators Across Asia&apos;s{' '}
          <span className="gradient-text-accent">Immersive Future</span>
        </>
      }
      showTopBorder={false}
    >
      <CompanyOverviewBlock />
    </AboutSectionShell>

    {/* 2. Our Mission */}
    <AboutSectionShell
      id="our-mission"
      eyebrow="Our Mission"
      title={
        <>
          <span className="gradient-text-accent">Maximum reach.</span> Minimum friction.
        </>
      }
    >
      <OurMissionBlock />
    </AboutSectionShell>

    {/* 3. Why XR ASIA SUMMIT */}
    <AboutSectionShell
      id="why-xr-summits"
      eyebrow="Why XR ASIA SUMMIT"
      title={
        <>
          Where the
          <span className="gradient-text-accent"> XR ecosystem </span>
          comes to life
        </>
      }
    >
      <WhyXrSummitsBlock />
    </AboutSectionShell>

    <AboutSectionShell
      id="industry-focus"
      eyebrow="Industry Focus"
      title={
        <>
          Where{" "}
          <span className="gradient-text-accent">immersive technology</span>
          {" "}meets real-world impact.
        </>
      }
    >
      <div className="max-w-5xl">
        <p className="text-foreground-muted leading-relaxed mb-10" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}>
          {INDUSTRY_FOCUS.description}
        </p>

        {/* Card grid — 2×2 (4 items), never 3+1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
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
                  style={{ fontSize: '0.84rem', color: 'rgba(180,195,220,0.9)', lineHeight: 1.65 }}
                >
                  {sector.desc}
                </p>
                {'bullets' in sector && sector.bullets.length > 0 && (
                  <ul
                    className="mt-1 space-y-1 pl-3"
                    style={{ fontSize: '0.8rem', color: 'rgba(150,165,195,0.85)', lineHeight: 1.55 }}
                  >
                    {sector.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className="mt-[0.45em] h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: ABOUT_ACCENT }}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
      title={
        <>
          <span className="gradient-text-accent">Asia sets the stage</span> — the world shows up.
        </>
      }
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

        <RegionalNetworkMap />
      </div>
    </AboutSectionShell>

    <PastEventsSection />

    {/* 5. Awards & Recognition */}
    <AboutSectionShell
      id="awards"
      eyebrow="Awards & Recognition"
      title={
        <>
          Awards & <span className="gradient-text-accent">Recognition</span>
        </>
      }
    >
      <AwardsRecognitionBlock />
    </AboutSectionShell>

    <SustainabilityCommitmentSection />

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