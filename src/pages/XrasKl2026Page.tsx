import { Helmet } from 'react-helmet-async';
import XrasKlHero from '../components/xras-kl-2026/XrasKlHero';
import { XRAS_KL_ACCENT, XRAS_KL_META } from '../core/content/xrasKl2026';
import XrasActivationsSection from '../components/xras-kl-2026/XrasActivationsSection';
import SpeakersSection from '../components/speakers/SpeakersSection';
import { useLeadCapture } from '../context/LeadCaptureContext';
import EventPartnersSection from '../components/xras-kl-2026/EventPartnersSection';
import XrasKlCtaRow from '../components/xras-kl-2026/XrasKlCtaRow';

const XRAS_KL_EVENT_NAME = 'XRAS KL 2026';

const XrasKl2026Page = () => {
  const { openLeadCapture } = useLeadCapture();

  const openBrochure = () =>
    openLeadCapture({
      title: 'Download Brochure',
      description: 'Share your details to access the XRAS KL 2026 brochure and start a conversation with our team.',
      eventName: XRAS_KL_EVENT_NAME,
      defaultInterest: 'Brochure download',
      intent: 'brochure',
      accentColor: XRAS_KL_ACCENT,
    });

  const openRegister = () =>
    openLeadCapture({
      title: 'Register / Enquiry',
      description: 'Tell us about your interest in XRAS KL 2026 and we will follow up with next steps.',
      eventName: XRAS_KL_EVENT_NAME,
      defaultInterest: 'General registration interest',
      intent: 'register',
      accentColor: XRAS_KL_ACCENT,
    });

  return (
    <>
      <Helmet>
        <title>{XRAS_KL_META.title}</title>
        <meta name="description" content={XRAS_KL_META.description} />
      </Helmet>

      <XrasKlHero onDownloadBrochure={openBrochure} onRegister={openRegister} />

      <div
        style={
          {
            '--section-padding-y': 'clamp(2.75rem, 5vw, 4.5rem)',
          } as React.CSSProperties
        }
      >
        <XrasActivationsSection />
        <SpeakersSection />
        <EventPartnersSection />
        <XrasKlCtaRow onDownloadBrochure={openBrochure} onRegister={openRegister} />
      </div>

    </>
  );
};

export default XrasKl2026Page;
