import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | XR Summits</title>
      <meta name="description" content="Learn about XR Summits — Asia's definitive immersive technology event series since 2021." />
    </Helmet>
    <DemoPlaceholder
      title="About Us"
      subtitle="Our story, mission, and the team behind Asia's premier XR event series."
      eta="Q2 2026"
      accentColor="#22d3ee"
    />
  </>
);

export default AboutPage;