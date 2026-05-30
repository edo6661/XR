import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const MothershipPage = () => (
  <>
    <Helmet>
      <title>Mothership AI Bootcamp | XR Summits</title>
      <meta name="description" content="Mothership 26' — A 3-day intensive AI × XR bootcamp for builders and creators." />
    </Helmet>
    <DemoPlaceholder
      title="Mothership 26'"
      subtitle="A 3-day intensive AI × XR bootcamp for builders, artists, and technologists ready to ship immersive products."
      eta="TBC 2026"
      accentColor="#22d3ee"
    />
  </>
);

export default MothershipPage;