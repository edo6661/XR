import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../components/ui/SectionEyebrow';
import ContactForm from '../components/contact/ContactForm';
import ContactSidebar from '../components/contact/ContactSidebar';
import { LEGAL_PAGES } from '../core/content/legalPages';

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact Us | XR Summits</title>
      <meta
        name="description"
        content="Contact XR Summits for general enquiries, partnerships, speakers, media, and registration."
      />
    </Helmet>

    <section className="relative w-full overflow-hidden pt-32 pb-10 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,222,128,0.05) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading font-black text-foreground"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65 }}
          className="text-foreground-muted mt-4 max-w-xl mx-auto"
          style={{ fontSize: '0.88rem', lineHeight: 1.8 }}
        >
          Enquiries for partnerships, exhibitors, speakers, press, and general registration interest.
        </motion.p>
      </div>
    </section>

    <section
      className="relative w-full px-6"
      style={{ paddingBottom: 'var(--section-padding-y)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionEyebrow>Get in touch</SectionEyebrow>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactSidebar />
          </div>
        </div>
      </div>
    </section>

    <section
      className="relative w-full px-6 border-t border-white/5"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionEyebrow align="center">Legal & policies</SectionEyebrow>
        <p className="text-center text-foreground-muted text-sm mb-8 max-w-lg mx-auto leading-relaxed">
          Phase 1 placeholder documents — final legal text will be supplied by the client.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEGAL_PAGES.map((page) => (
            <li key={page.slug}>
              <Link
                to={page.path}
                className="block px-4 py-3 rounded-lg text-[0.78rem] transition-colors duration-300 hover:text-accent"
                style={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(107,127,163,0.75)',
                }}
              >
                {page.title}
                <span className="ml-2 opacity-40" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default ContactPage;
