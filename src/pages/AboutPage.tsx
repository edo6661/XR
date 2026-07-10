import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RegionalNetworkMap from '../components/about/RegionalNetworkMap';
import PastEventsSection from '../components/about/PastEventsSection';
import AboutSectionShell from '../components/about/page/AboutSectionShell';
import CompanyOverviewSection from '../components/about/page/CompanyOverviewSection';
import OurMissionSection from '../components/about/page/OurMissionSection';
import IndustryFocusSection from '../components/about/page/IndustryFocusSection';
import WhyXrSummitsBlock from '../components/about/page/WhyXrSummitsBlock';
import AwardsRecognitionBlock from '../components/about/page/AwardsRecognitionBlock';
import SustainabilityCommitmentSection from '../components/about/page/SustainabilityCommitmentSection';
import {
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

    <CompanyOverviewSection />

    <OurMissionSection />
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

    <IndustryFocusSection />
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
            <span className="font-mono text-[1rem] tracking-[0.28em] uppercase text-foreground-muted/40">Partner logo</span>
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
              <p className="text-foreground-muted mt-1" style={{ fontSize: '1rem' }}>{item.type}</p>
            </div>
            <span className="font-mono text-[1.02rem] tracking-[0.25em] uppercase text-foreground-muted/45 shrink-0">{item.date}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold tracking-[0.18em] uppercase text-[1rem] text-[#050505]"
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