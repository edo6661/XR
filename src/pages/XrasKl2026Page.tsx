import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import XrasKlHero from '../components/xras-kl-2026/XrasKlHero';
import XrasProgramsSection from '../components/xras-kl-2026/XrasProgramsSection';
import RegisterEnquiryModal from '../components/gateway/RegisterEnquiryModal';
import BrochureModal from '../components/gateway/BrochureModal';
import { XRAS_KL_ACCENT, XRAS_KL_META } from '../core/content/xrasKl2026';

const XRAS_KL_EVENT_NAME = 'XRAS KL 2026';

const XrasKl2026Page = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{XRAS_KL_META.title}</title>
        <meta name="description" content={XRAS_KL_META.description} />
      </Helmet>

      <XrasKlHero
        onDownloadBrochure={() => setBrochureOpen(true)}
        onRegister={() => setRegisterOpen(true)}
      />

      <XrasProgramsSection
        onDownloadBrochure={() => setBrochureOpen(true)}
        onRegister={() => setRegisterOpen(true)}
      />

      <RegisterEnquiryModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        eventName={XRAS_KL_EVENT_NAME}
        accentColor={XRAS_KL_ACCENT}
      />
      <BrochureModal
        open={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        eventName={XRAS_KL_EVENT_NAME}
        accentColor={XRAS_KL_ACCENT}
      />
    </>
  );
};

export default XrasKl2026Page;
