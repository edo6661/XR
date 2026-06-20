import { Helmet } from 'react-helmet-async';
import HackathonHero from '../components/ai-filmmaking-hackathon/HackathonHero';
import HackathonSections from '../components/ai-filmmaking-hackathon/HackathonSections';
import {
  HACKATHON_ACCENT,
  HACKATHON_EVENT_NAME,
  HACKATHON_META,
} from '../core/content/aiFilmmakingHackathon';
import { useLeadCapture } from '../context/LeadCaptureContext';

const AiFilmmakingHackathonPage = () => {
  const { openLeadCapture } = useLeadCapture();

  const openRegister = () =>
    openLeadCapture({
      title: 'Register / Enquiry',
      description: 'Tell us about your interest in the AI Filmmaking Hackathon and we will follow up with next steps.',
      eventName: HACKATHON_EVENT_NAME,
      defaultInterest: 'General registration interest',
      intent: 'register',
      accentColor: HACKATHON_ACCENT,
    });

  return (
    <>
      <Helmet>
        <title>{HACKATHON_META.title}</title>
        <meta name="description" content={HACKATHON_META.description} />
      </Helmet>

      <HackathonHero onRegister={openRegister} />
      <HackathonSections onRegister={openRegister} />
    </>
  );
};

export default AiFilmmakingHackathonPage;
