import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';


const ContactDetailsSection = () => (
  <section
    id="contact-details"
    className="relative w-full overflow-hidden"
    style={{
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',

    }}
    aria-labelledby="contact-details-heading"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 60% 45% at 50% 100%, rgba(34,211,238,0.04) 0%, transparent 70%)',
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      <SectionEyebrow align="center">Contact</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(155deg, rgba(22,38,62,0.75) 0%, rgba(10,20,36,0.9) 100%)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.45), transparent)',
          }}
          aria-hidden="true"
        />

        <div className="p-8 md:p-10 flex flex-col items-center text-center gap-6">
          <h2
            id="contact-details-heading"
            className="font-heading font-bold text-foreground"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            Join the Next Phase Where Asia Builds Its {' '}
            <span className='gradient-text-accent'>
              Spatial Future
            </span>
          </h2>

          <p className="text-lead max-w-lg mx-auto">
            Whether you're attending, exhibiting, sponsoring, or speaking — XR Asia Summit connects you
            to the conversations and partnerships that matter.
          </p>

          <Link to="/contact" className="btn-ghost-orange group">
            Start the Conversation
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactDetailsSection;
