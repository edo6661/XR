import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const XrasKl2026Page = lazy(() => import('./pages/XrasKl2026Page'));
const Aixr2026SarawakPage = lazy(() => import('./pages/Aixr2026SarawakPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#050b18' }}>
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

const App = () => {
  return (
    <HelmetProvider>
      <Analytics />
      <LazyMotion features={domAnimation}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="xras-kl-2026" element={<XrasKl2026Page />} />
                <Route path="aixr-2026-sarawak" element={<Aixr2026SarawakPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="legal/:slug" element={<LegalPage />} />
                <Route path="mothership" element={<Navigate to="/xras-kl-2026" replace />} />
                <Route path="awards" element={<Navigate to="/xras-kl-2026" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;
