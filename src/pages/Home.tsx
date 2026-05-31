import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import EventsSection from '../components/events/EventsSection';
import SpeakersSection from '../components/speakers/SpeakersSection';
import SponsorsSection from '../components/sponsors/SponsorsSection';
import TicketsSection from '../components/tickets/TicketsSection';
import ScrollMarquee from '../components/ui/ScrollMarquee';
import StackedSection from '../components/ui/StackedSection';

const Home = () => (
  <>
    <Helmet>
      <title>XR Summits — Asia's Premier Immersive Technology Event</title>
      <meta
        name="description"
        content="XR Asia Summit 2026 — The definitive platform connecting XR innovators, enterprise leaders, and immersive tech visionaries in Asia."
      />
    </Helmet>

    {/* Z-Index diatur berurutan naik, agar section di bawah merender di atas section sebelumnya */}
    <StackedSection zIndex={10}>
      <HeroSection />
    </StackedSection>

    <StackedSection zIndex={20}>
      <AboutSection />
    </StackedSection>

    <StackedSection zIndex={30}>
      <EventsSection />
    </StackedSection>

    <StackedSection zIndex={40}>
      <SpeakersSection />
    </StackedSection>

    <StackedSection zIndex={50}>
      <ScrollMarquee />
    </StackedSection>

    <StackedSection zIndex={60}>
      <SponsorsSection />
    </StackedSection>

    {/* Section terakhir tidak perlu di-pin agar footer dapat muncul dengan natural */}
    <StackedSection zIndex={70} isLast={true}>
      <TicketsSection />
    </StackedSection>
  </>
);

export default Home;