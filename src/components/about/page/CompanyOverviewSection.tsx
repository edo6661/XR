import AboutSectionShell from './AboutSectionShell';
import CompanyOverviewBlock from './CompanyOverviewBlock';
import { FALLBACK_COMPANY_OVERVIEW } from '../../../core/content/aboutPage';
import { useSanityQuery } from '../../../hooks/useSanityQuery';
import { fetchCompanyOverview } from '../../../lib/sanity/queries';

const CompanyOverviewSection = () => {
  const { data: overview } = useSanityQuery(
    fetchCompanyOverview,
    FALLBACK_COMPANY_OVERVIEW,
  );

  return (
    <AboutSectionShell
      id="company-overview"
      eyebrow="Company Overview"
      title={
        <>
          {overview.titleHighlight}{' '}
          <span className="gradient-text-accent">{overview.titleRest}</span>
        </>
      }
      showTopBorder={false}
    >
      <CompanyOverviewBlock content={overview} />
    </AboutSectionShell>
  );
};

export default CompanyOverviewSection;
