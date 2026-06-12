
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import EventsSection from '../components/events/EventsSection';
import EcosystemInActionSection from '../components/home/EcosystemInActionSection';
import SponsorsSection from '../components/sponsors/SponsorsSection';
import ContactDetailsSection from '../components/home/ContactDetailsSection';
import StackedSection from '../components/ui/StackedSection';
import { COMPANY } from '../core/navigation/routes';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  return (
    <div >
      <Helmet>
        <title>XR Summits — Asia's Premier Immersive Technology Platform</title>
        <meta name="description" content={COMPANY.supportingText} />
      </Helmet>

      <StackedSection zIndex={10}>
        <HeroSection />
      </StackedSection>

      <StackedSection zIndex={20}>
        <AboutSection />
      </StackedSection>

      {/* Gunakan div wrapper untuk referensi ScrollTrigger yang akurat, di luar logic "pinning" StackedSection */}
      <div className="w-full relative">
        <StackedSection zIndex={30}>
          <EventsSection />
        </StackedSection>
      </div>

      <div className="w-full relative">
        <StackedSection zIndex={40}>
          <EcosystemInActionSection />
        </StackedSection>
      </div>

      <div className="w-full relative">
        <StackedSection zIndex={50}>
          <SponsorsSection />
        </StackedSection>
      </div>

      <div className="w-full relative">
        <StackedSection zIndex={60} isLast>
          <div className="flex min-h-screen w-full flex-col justify-center">
            <ContactDetailsSection />
          </div>
        </StackedSection>
      </div>
    </div>
  );
};

export default Home;