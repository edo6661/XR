import { Helmet } from 'react-helmet-async';
import HackathonHero from '../components/ai-filmmaking-hackathon/HackathonHero';
import HackathonSections from '../components/ai-filmmaking-hackathon/HackathonSections';
import {
  HACKATHON_META,
  HACKATHON_REGISTRATION_URL,
} from '../core/content/aiFilmmakingHackathon';

const AiFilmmakingHackathonPage = () => {
  return (
    <>
      <Helmet>
        <title>{HACKATHON_META.title}</title>
        <meta name="description" content={HACKATHON_META.description} />
      </Helmet>

      <HackathonHero registerUrl={HACKATHON_REGISTRATION_URL} />
      <HackathonSections registerUrl={HACKATHON_REGISTRATION_URL} />
    </>
  );
};

export default AiFilmmakingHackathonPage;
