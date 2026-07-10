import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes a page_view to GTM dataLayer on every SPA route change (covers all pages). */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'page_view',
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default GoogleAnalytics;
