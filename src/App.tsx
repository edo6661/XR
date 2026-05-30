import { Suspense, lazy, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Preloader from './components/ui/Preloader';

// ── Pages (lazy) ───────────────────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const MothershipPage = lazy(() => import('./pages/MothershipPage'));
const AwardsGalaPage = lazy(() => import('./pages/AwardsGalaPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// ── Page loading spinner (between lazy route loads) ────────────────────────
const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#050b18' }}
  >
    <div className="relative w-12 h-12">
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{ borderTop: '1.5px solid rgba(251,146,60,0.8)', borderRight: '1.5px solid transparent' }}
      />
      <div
        className="absolute inset-[4px] rounded-full animate-spin"
        style={{
          borderTop: '1px solid rgba(147,197,253,0.4)',
          borderLeft: '1px solid transparent',
          animationDirection: 'reverse',
          animationDuration: '0.6s',
        }}
      />
    </div>
  </div>
);

// ── App ────────────────────────────────────────────────────────────────────
const App = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <HelmetProvider>
      <Analytics />
      <LazyMotion features={domAnimation}>

        {/* Preloader — shown once on first load */}
        <AnimatePresence>
          {!preloaderDone && (
            <Preloader onComplete={handlePreloaderComplete} />
          )}
        </AnimatePresence>

        {/* Main app — rendered behind preloader, visible after it exits */}
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="mothership" element={<MothershipPage />} />
                <Route path="awards" element={<AwardsGalaPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>

      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;