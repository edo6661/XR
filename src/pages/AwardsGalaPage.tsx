import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const AwardsGalaPage = () => {
  return (
    <>
      <Helmet>
        <title>Awards Gala | XR Summits</title>
      </Helmet>
      <DemoPlaceholder title="Broadcast Digital Awards" />
    </>
  );
};

export default AwardsGalaPage;