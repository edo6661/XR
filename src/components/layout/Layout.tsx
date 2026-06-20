import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';
import ScrollProgress from '../ui/ScrollProgress';
import FilmGrain from '../ui/FilmGrain';
import BackgroundElements from '../ui/BackgroundElements';
import { lenisInstance, registerLenis, unregisterLenis } from '../../lib/lenisInstance';
import { killPinnedScrollTriggers } from '../../lib/scrollTriggerCleanup';
import { LeadCaptureProvider } from '../../context/LeadCaptureContext';

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    registerLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      unregisterLenis(lenis);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    killPinnedScrollTriggers();
    lenisInstance.current?.scrollTo(0, { immediate: true });

    return () => {
      killPinnedScrollTriggers();
    };
  }, [location.pathname]);

  useEffect(() => {
    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => window.clearTimeout(refreshId);
  }, [location.pathname]);

  return (
    <LeadCaptureProvider>
    <div className="relative min-h-screen w-full overflow-x-hidden text-foreground flex flex-col selection:bg-accent/30 selection:text-white">
      <BackgroundElements />
      <FilmGrain />

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <div className="relative z-10 bg-background">
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>

      <div className="sticky bottom-0 z-0 h-auto">
        <Footer />
      </div>
    </div>
    </LeadCaptureProvider>
  );
};

export default Layout;
