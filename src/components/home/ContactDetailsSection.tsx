import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';
import { COMPANY } from '../../core/navigation/routes';


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
            style={{ fontSize: '0.85rem', lineHeight: 1.8 }}
          >
            Whether you're attending, exhibiting, sponsoring, or speaking — XR Summits connects you
            to the conversations and partnerships that matter.
          </p>





          {/* CTA */}
          <a
            href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('Join the Movement — XR Summits')}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-bold tracking-[0.2em] uppercase text-[0.68rem] text-[#050b18] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(251,146,60,0.35)]"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              border: '1px solid rgba(251,146,60,0.5)',
            }}
          >
            Join the Movement
            <span aria-hidden="true">→</span>
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1 transition-colors duration-250"
            style={{ fontSize: '0.68rem', color: 'rgba(107,127,163,0.45)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(251,146,60,0.65)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(107,127,163,0.45)';
            }}
          >
            Full contact form →
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactDetailsSection;
