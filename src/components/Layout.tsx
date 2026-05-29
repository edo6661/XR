import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './ui/CustomCursor';
import ScrollProgress from './ui/ScrollProgress';
import FilmGrain from './ui/FilmGrain';
import BackgroundElements from './ui/BackgroundElements';
import { lenisInstance } from '../lib/lenisInstance';

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
    lenisInstance.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisInstance.current = null;
    };
  }, []);

  useEffect(() => {
    lenisInstance.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-foreground flex flex-col selection:bg-accent/30 selection:text-white">
      <BackgroundElements />
      <FilmGrain />

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* ── Konten Utama (Berada di lapisan atas, menutupi Footer) ── */}
      <div className="relative z-10 bg-background shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>

      {/* ── Parallax Curtain Footer (Berada di lapisan paling bawah) ── */}
      <div className="sticky bottom-0 z-0 h-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;