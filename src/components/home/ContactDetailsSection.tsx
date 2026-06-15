import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const ACCENT = '#fb923c';

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
    {/* Ambient glow — gives the frosted panel something to refract */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(720px,90vw)] h-[320px] rounded-full opacity-[0.07]"
        style={{
          background: `radial-gradient(ellipse, ${ACCENT} 0%, transparent 68%)`,
          filter: 'blur(48px)',
        }}
      />
      <div
        className="absolute top-1/4 -left-16 w-56 h-56 rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #22d3ee 0%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-12 w-48 h-48 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 68%)',
          filter: 'blur(36px)',
        }}
      />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6">
      <SectionEyebrow align="center">Contact</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="group relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(13,27,46,0.52) 0%, rgba(8,16,32,0.38) 100%)',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow:
            '0 24px 64px rgba(0,0,0,0.42), 0 0 48px rgba(251,146,60,0.06), inset 0 1px 0 rgba(255,255,255,0.14)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}70, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Crisp top shine */}
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.55) 55%, transparent 90%)',
          }}
          aria-hidden="true"
        />

        {/* Glass sheen — upper half */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)' }}
          aria-hidden="true"
        />

        {/* Corner brackets */}
        <div
          className="absolute top-4 left-4 w-4 h-4 border-t border-l pointer-events-none transition-colors duration-500 group-hover:border-[rgba(251,146,60,0.45)]"
          style={{ borderColor: 'rgba(251,146,60,0.28)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-4 right-4 w-4 h-4 border-b border-r pointer-events-none transition-colors duration-500 group-hover:border-[rgba(251,146,60,0.45)]"
          style={{ borderColor: 'rgba(251,146,60,0.28)' }}
          aria-hidden="true"
        />

        {/* Left accent bar */}
        <div
          className="absolute top-8 bottom-8 left-0 w-[3px] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${ACCENT}cc, ${ACCENT}22)`,
            boxShadow: `3px 0 14px ${ACCENT}28`,
            borderRadius: '0 3px 3px 0',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center gap-6">
          <h2
            id="contact-details-heading"
            className="font-heading font-bold text-foreground"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            Join the Next Phase Where Asia Builds Its{' '}
            <span className="gradient-text-accent">Spatial Future</span>
          </h2>

          <p className="text-lead max-w-lg mx-auto">
            Whether you're attending, exhibiting, sponsoring, or speaking — XR ASIA SUMMIT connects you
            to the conversations and partnerships that matter.
          </p>

          <Link to="/contact" className="btn-ghost-orange group/btn">
            Start the Conversation
            <span
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactDetailsSection;
