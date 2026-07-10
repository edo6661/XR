import AboutSectionShell from './AboutSectionShell';
import IndustryFocusBlock from './IndustryFocusBlock';
import {
  FALLBACK_INDUSTRY_FOCUS,
  FALLBACK_INDUSTRY_FOCUS_SECTORS,
} from '../../../core/content/aboutPage';
import { useSanityQuery } from '../../../hooks/useSanityQuery';
import {
  fetchIndustryFocus,
  fetchIndustryFocusSectors,
} from '../../../lib/sanity/queries';

const IndustryFocusSection = () => {
  const { data: intro } = useSanityQuery(
    fetchIndustryFocus,
    FALLBACK_INDUSTRY_FOCUS,
  );
  const { data: sectors } = useSanityQuery(
    fetchIndustryFocusSectors,
    FALLBACK_INDUSTRY_FOCUS_SECTORS,
  );

  return (
    <AboutSectionShell
      id="industry-focus"
      eyebrow="Industry Focus"
      title={
        <>
          {intro.titlePrefix}{' '}
          <span className="gradient-text-accent">{intro.titleHighlight}</span>{' '}
          {intro.titleRest}
        </>
      }
    >
      <IndustryFocusBlock intro={intro} sectors={sectors} />
    </AboutSectionShell>
  );
};

export default IndustryFocusSection;
