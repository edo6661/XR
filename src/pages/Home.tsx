
import { useLayoutEffect, useRef } from 'react';
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
import { killScrollTriggersIn } from '../lib/scrollTriggerCleanup';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);


  const eventsWrapRef = useRef<HTMLDivElement>(null);
  const ecosystemWrapRef = useRef<HTMLDivElement>(null);
  const sponsorsWrapRef = useRef<HTMLDivElement>(null);
  const contactWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const root = document.documentElement;

    const ctx = gsap.context(() => {

      gsap.to(root, {
        "--theme-background": "#12112d",
        scrollTrigger: {
          trigger: eventsWrapRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        }
      });

      // 2. Morphing dari Events ke Ecosystem in Action
      gsap.to(root, {
        "--theme-background": "#1a1325",
        scrollTrigger: {
          trigger: ecosystemWrapRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        }
      });

      // 3. Morphing dari Ecosystem ke Sponsors
      gsap.to(root, {
        "--theme-background": "#0d1626",
        scrollTrigger: {
          trigger: sponsorsWrapRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        }
      });

      // 4. Morphing dari Sponsors ke Contact Detail
      gsap.to(root, {
        "--theme-background": "#0b101a", // Ganti ke Very Dark Slate
        scrollTrigger: {
          trigger: contactWrapRef.current,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        }
      });

    }, pageRef);

    return () => {
      ctx.revert();


      root.style.removeProperty('--theme-background');
      killScrollTriggersIn(page);
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

      {/* Gunakan div wrapper untuk referensi ScrollTrigger yang akurat, di luar logic "pinning" StackedSection */}
      <div ref={eventsWrapRef} className="w-full relative">
        <StackedSection zIndex={30}>
          <EventsSection />
        </StackedSection>
      </div>

      <div ref={ecosystemWrapRef} className="w-full relative">
        <StackedSection zIndex={40}>
          <EcosystemInActionSection />
        </StackedSection>
      </div>

      <div ref={sponsorsWrapRef} className="w-full relative">
        <StackedSection zIndex={50}>
          <SponsorsSection />
        </StackedSection>
      </div>

      <div ref={contactWrapRef} className="w-full relative">
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