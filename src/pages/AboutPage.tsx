import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | XR Summits</title>
      </Helmet>
      <DemoPlaceholder title="About Us" />
    </>
  );
};

export default AboutPage;