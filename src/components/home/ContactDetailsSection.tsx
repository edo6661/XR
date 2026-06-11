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

    <div className="relative z-10 max-w-4xl mx-auto px-6">
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
            Join the Next Phase Where Asia Builds Its Spatial Future
          </h2>

          <p
            className="text-foreground-muted max-w-lg leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8 }}
          >
            Whether you're attending, exhibiting, sponsoring, or speaking — XR Asia Summit connects you
            to the conversations and partnerships that matter.
          </p>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-sm font-bold tracking-[0.18em] uppercase transition-all duration-300"
            style={{
              fontSize: 'clamp(0.72rem, 2vw, 0.8rem)',
              border: '1px solid rgba(239,120,61,0.45)',
              color: '#ef783d',
              background: 'rgba(239,120,61,0.06)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(239,120,61,0.12)';
              el.style.borderColor = 'rgba(239,120,61,0.7)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(239,120,61,0.06)';
              el.style.borderColor = 'rgba(239,120,61,0.45)';
            }}
          >
            Start the Conversation
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactDetailsSection;
