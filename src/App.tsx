import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/Layout';

// ── Pages ──────────────────────────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const MothershipPage = lazy(() => import('./pages/MothershipPage'));
const AwardsGalaPage = lazy(() => import('./pages/AwardsGalaPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// ── Shared loader (Fallback untuk navigasi antar halaman) ─────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
      <div className="absolute inset-2 border-t border-primary rounded-full animate-spin [animation-direction:reverse] [animation-duration:0.6s]" />
    </div>
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────
const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <HelmetProvider>
      <Analytics />
      <LazyMotion features={domAnimation}>



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