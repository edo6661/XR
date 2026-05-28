import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | XR Summits</title>
      </Helmet>
      <DemoPlaceholder title="Contact Operations" />
    </>
  );
};

export default ContactPage;