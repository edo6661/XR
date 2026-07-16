import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackathonHero from '../components/ai-filmmaking-hackathon/HackathonHero';
import {
  HackathonApplyGroup,
  HackathonAwardsGroup,
  HackathonDetailsGroup,
  HackathonFrameworkGroup,
  HackathonMissionsGroup,
} from '../components/ai-filmmaking-hackathon/HackathonSections';
import StackedSection from '../components/ui/StackedSection';
import {
  HACKATHON_META,
  HACKATHON_REGISTRATION_URL,
} from '../core/content/aiFilmmakingHackathon';

gsap.registerPlugin(ScrollTrigger);

const AiFilmmakingHackathonPage = () => {
  return (
    <div>
      <Helmet>
        <title>{HACKATHON_META.title}</title>
        <meta name="description" content={HACKATHON_META.description} />
      </Helmet>

      <StackedSection zIndex={10}>
        <HackathonHero registerUrl={HACKATHON_REGISTRATION_URL} />
      </StackedSection>

      <StackedSection zIndex={20} backgroundColor="#0f1d34">
        <HackathonFrameworkGroup />
      </StackedSection>

      <div className="w-full relative">
        <StackedSection zIndex={30} backgroundColor="#1a2d4a">
          <HackathonMissionsGroup />
        </StackedSection>
      </div>

      <div className="w-full relative">
        <StackedSection zIndex={40} backgroundColor="#6f87a8">
          <HackathonDetailsGroup />
        </StackedSection>
      </div>

      <div className="w-full relative">
        <StackedSection zIndex={50} tone="light" backgroundColor="#dbe5f2">
          <HackathonAwardsGroup registerUrl={HACKATHON_REGISTRATION_URL} />
        </StackedSection>
      </div>

      <div className="w-full relative">
        <StackedSection zIndex={60} isLast>
          <HackathonApplyGroup registerUrl={HACKATHON_REGISTRATION_URL} />
        </StackedSection>
      </div>
    </div>
  );
};

export default AiFilmmakingHackathonPage;
