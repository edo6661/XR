import { Helmet } from 'react-helmet-async';
import DemoPlaceholder from '../components/ui/DemoPlaceholder';

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact Us | XR Summits</title>
      <meta name="description" content="Get in touch with the XR Summits team for sponsorship, speaking, or general enquiries." />
    </Helmet>
    <DemoPlaceholder
      title="Contact Us"
      subtitle="Reach out for sponsorship, speaking opportunities, or general enquiries."
      eta="Q2 2026"
      accentColor="#4ade80"
    />
  </>
);

export default ContactPage;