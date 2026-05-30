import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const AwardsGalaPage = () => (
  <>
    <Helmet>
      <title>Broadcast Digital Awards | XR Summits</title>
      <meta name="description" content="Broadcast Digital Awards — Celebrating excellence in digital broadcasting and immersive media across Asia-Pacific." />
    </Helmet>
    <DemoPlaceholder
      title="Broadcast Digital Awards"
      subtitle="Celebrating excellence in digital broadcasting and immersive media production across the Asia-Pacific region."
      eta="TBC 2026"
      accentColor="#a78bfa"
    />
  </>
);

export default AwardsGalaPage;