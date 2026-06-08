// src/pages/Home.tsx
import { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
// import ChooseExperienceSection from '../components/home/ChooseExperienceSection';
import EventsSection from '../components/events/EventsSection';
import SpeakersSection from '../components/speakers/SpeakersSection';
import SponsorsSection from '../components/sponsors/SponsorsSection';
import ContactDetailsSection from '../components/home/ContactDetailsSection';
// import TicketsSection from '../components/tickets/TicketsSection';
// import ScrollMarquee from '../components/ui/ScrollMarquee';
import StackedSection from '../components/ui/StackedSection';
import { COMPANY } from '../core/navigation/routes';
import { killScrollTriggersIn } from '../lib/scrollTriggerCleanup';

const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    return () => {
      killScrollTriggersIn(pageRef.current);
    };
  }, []);

  return (
    <div ref={pageRef}>
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

      {/* <StackedSection zIndex={30}>
        <ChooseExperienceSection />
      </StackedSection> */}

      <StackedSection zIndex={30}>
        <EventsSection />
      </StackedSection>
      <StackedSection zIndex={40}>
        <SponsorsSection />
      </StackedSection>

      <StackedSection zIndex={50}>
        <SpeakersSection />
      </StackedSection>



      <StackedSection zIndex={60}
        isLast
      >
        <ContactDetailsSection />
      </StackedSection>

      {/* <StackedSection zIndex={80}>
        <ScrollMarquee />
      </StackedSection>

      <StackedSection zIndex={90} isLast>
        <TicketsSection />
      </StackedSection> */}
    </div>
  );
};

export default Home;
