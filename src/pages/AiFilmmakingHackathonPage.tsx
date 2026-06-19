import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HackathonHero from '../components/ai-filmmaking-hackathon/HackathonHero';
import HackathonSections from '../components/ai-filmmaking-hackathon/HackathonSections';
import RegisterEnquiryModal from '../components/gateway/RegisterEnquiryModal';
import {
  HACKATHON_ACCENT,
  HACKATHON_EVENT_NAME,
  HACKATHON_META,
} from '../core/content/aiFilmmakingHackathon';

const AiFilmmakingHackathonPage = () => {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{HACKATHON_META.title}</title>
        <meta name="description" content={HACKATHON_META.description} />
      </Helmet>

      <HackathonHero onRegister={() => setRegisterOpen(true)} />
      <HackathonSections onRegister={() => setRegisterOpen(true)} />

      <RegisterEnquiryModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        eventName={HACKATHON_EVENT_NAME}
        accentColor={HACKATHON_ACCENT}
      />
    </>
  );
};

export default AiFilmmakingHackathonPage;
