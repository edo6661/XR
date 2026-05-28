import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import EventsSection from '../components/events/EventsSection';
import SpeakersSection from '../components/speakers/SpeakersSection';
import SponsorsSection from '../components/sponsors/SponsorsSection';
import TicketsSection from '../components/tickets/TicketsSection';

// Import komponen Marquee yang baru dibuat
import ScrollMarquee from '../components/ui/ScrollMarquee';

const Home = () => (
  <>
    <Helmet>
      <title>XR Summits — Asia's Premier Immersive Technology Event</title>
      <meta
        name="description"
        content="XR Asia Summit 2026 — The definitive platform connecting XR innovators, enterprise leaders, and immersive tech visionaries in Asia."
      />
    </Helmet>

    <HeroSection />
    <AboutSection />
    <EventsSection />
    <SpeakersSection />

    <ScrollMarquee />

    <SponsorsSection />
    <TicketsSection />
  </>
);

export default Home;