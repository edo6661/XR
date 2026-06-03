import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AixrHero from '../components/aixr-2026-sarawak/AixrHero';
import AixrProgramsSection from '../components/aixr-2026-sarawak/AixrProgramsSection';
import RegisterEnquiryModal from '../components/gateway/RegisterEnquiryModal';
import BrochureModal from '../components/gateway/BrochureModal';
import {
  AIXR_SARAWAK_ACCENT,
  AIXR_SARAWAK_EVENT_NAME,
  AIXR_SARAWAK_META,
} from '../core/content/aixr2026Sarawak';

const Aixr2026SarawakPage = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{AIXR_SARAWAK_META.title}</title>
        <meta name="description" content={AIXR_SARAWAK_META.description} />
      </Helmet>

      <AixrHero
        onDownloadBrochure={() => setBrochureOpen(true)}
        onRegister={() => setRegisterOpen(true)}
      />

      <AixrProgramsSection
        onDownloadBrochure={() => setBrochureOpen(true)}
        onRegister={() => setRegisterOpen(true)}
      />

      <RegisterEnquiryModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        eventName={AIXR_SARAWAK_EVENT_NAME}
        accentColor={AIXR_SARAWAK_ACCENT}
      />
      <BrochureModal
        open={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        eventName={AIXR_SARAWAK_EVENT_NAME}
        accentColor={AIXR_SARAWAK_ACCENT}
      />
    </>
  );
};

export default Aixr2026SarawakPage;
