import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const MothershipPage = () => {
  return (
    <>
      <Helmet>
        <title>Mothership AI Bootcamp | XR Summits</title>
      </Helmet>
      <DemoPlaceholder title="Mothership 26' AI Bootcamp" />
    </>
  );
};

export default MothershipPage;