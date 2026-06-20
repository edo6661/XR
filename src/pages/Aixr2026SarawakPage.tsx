import { Helmet } from 'react-helmet-async';
import AixrHero from '../components/aixr-2026-sarawak/AixrHero';
import AixrActivationsSection from '../components/aixr-2026-sarawak/AiXrActivationsSection';
import {
  AIXR_SARAWAK_ACCENT,
  AIXR_SARAWAK_EVENT_NAME,
  AIXR_SARAWAK_META,
} from '../core/content/aixr2026Sarawak';
import { useLeadCapture } from '../context/LeadCaptureContext';

const Aixr2026SarawakPage = () => {
  const { openLeadCapture } = useLeadCapture();

  const openBrochure = () =>
    openLeadCapture({
      title: 'Download Brochure',
      description: 'Share your details to access the AIXR Sarawak 2026 brochure and start a conversation with our team.',
      eventName: AIXR_SARAWAK_EVENT_NAME,
      defaultInterest: 'Brochure download',
      intent: 'brochure',
      accentColor: AIXR_SARAWAK_ACCENT,
    });

  const openRegister = () =>
    openLeadCapture({
      title: 'Register / Enquiry',
      description: 'Tell us about your interest in AIXR Sarawak 2026 and we will follow up with next steps.',
      eventName: AIXR_SARAWAK_EVENT_NAME,
      defaultInterest: 'General registration interest',
      intent: 'register',
      accentColor: AIXR_SARAWAK_ACCENT,
    });

  return (
    <>
      <Helmet>
        <title>{AIXR_SARAWAK_META.title}</title>
        <meta name="description" content={AIXR_SARAWAK_META.description} />
      </Helmet>

      <AixrHero onDownloadBrochure={openBrochure} onRegister={openRegister} />

      <AixrActivationsSection onDownloadBrochure={openBrochure} onRegister={openRegister} />
    </>
  );
};

export default Aixr2026SarawakPage;
