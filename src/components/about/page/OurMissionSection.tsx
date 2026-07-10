import AboutSectionShell from './AboutSectionShell';
import OurMissionBlock from './OurMissionBlock';
import { FALLBACK_MISSION } from '../../../core/content/aboutPage';
import { useSanityQuery } from '../../../hooks/useSanityQuery';
import { fetchMission } from '../../../lib/sanity/queries';

const OurMissionSection = () => {
  const { data: mission } = useSanityQuery(fetchMission, FALLBACK_MISSION);

  return (
    <AboutSectionShell
      id="our-mission"
      eyebrow="Our Mission"
      title={
        <>
          <span className="gradient-text-accent">{mission.titleHighlight}</span>{' '}
          {mission.titleRest}
        </>
      }
    >
      <OurMissionBlock content={mission} />
    </AboutSectionShell>
  );
};

export default OurMissionSection;
