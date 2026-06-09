// src/pages/Home.tsx
import { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import EventsSection from '../components/events/EventsSection';
import SpeakersSection from '../components/speakers/SpeakersSection';
import SponsorsSection from '../components/sponsors/SponsorsSection';
import ContactDetailsSection from '../components/home/ContactDetailsSection';
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

      <StackedSection zIndex={30}>
        <EventsSection />
      </StackedSection>

      <StackedSection zIndex={40}>
        <SponsorsSection />
      </StackedSection>

      <StackedSection zIndex={50}>
        <SpeakersSection />
      </StackedSection>

      <StackedSection zIndex={60} isLast>
        <div className="flex min-h-screen w-full flex-col justify-center">
          <ContactDetailsSection />
        </div>
      </StackedSection>
    </div>
  );
};

export default Home;