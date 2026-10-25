import { Helmet } from 'react-helmet-async';
import GoogleAnalytics from '../analytics/GoogleAnalytics';

const MAINTENANCE_IMAGE = '/maintanance/websitedown.jpg.jpeg';

const Layout = () => {
  return (
    <>
      <Helmet>
        <title>XR Asia Summit 2027 — Coming Soon</title>
      </Helmet>
      <GoogleAnalytics />
      <div className="fixed inset-0 bg-white">
        <img
          src={MAINTENANCE_IMAGE}
          alt="XR Asia Summit 2027, 20 to 22 January 2027 at FINAS Damansara, Petaling Jaya. Website coming soon."
          className="h-full w-full object-contain object-center"
        />
      </div>
    </>
  );
};

export default Layout;
