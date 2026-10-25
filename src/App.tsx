import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <HelmetProvider>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
