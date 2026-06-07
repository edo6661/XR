import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';
import { COMPANY, SOCIAL_LINKS } from '../../core/navigation/routes';

const SOCIAL_ICONS: Record<string, ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  'X (Twitter)': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  ),
};

const ContactDetailsSection = () => (
  <section
    id="contact-details"
    className="relative w-full overflow-hidden"
    style={{
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
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

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={`tel:${COMPANY.phone}`}
              className="group inline-flex flex-col items-center gap-1 transition-colors duration-300"
            >
              <span
                className="font-mono text-[0.5rem] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(107,127,163,0.55)' }}
              >
                Call us
              </span>
              <span
                className="font-heading font-bold tracking-wide text-foreground group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}
              >
                {COMPANY.phone}
              </span>
            </a>

            <div
              className="w-px h-8 hidden sm:block"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              aria-hidden="true"
            />

            <a
              href={`mailto:${COMPANY.email}`}
              className="group inline-flex flex-col items-center gap-1 transition-colors duration-300"
            >
              <span
                className="font-mono text-[0.5rem] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(107,127,163,0.55)' }}
              >
                Email us
              </span>
              <span
                className="font-heading font-bold tracking-wide text-accent group-hover:text-foreground transition-colors duration-300"
                style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}
              >
                {COMPANY.email}
              </span>
            </a>
          </div>

          <address
            className="not-italic flex flex-col gap-0.5"
            style={{ fontSize: '0.75rem', color: 'rgba(107,127,163,0.55)', lineHeight: 1.75 }}
          >
            <span>{COMPANY.address.line1}</span>
            <span>{COMPANY.address.line2}</span>
            <span>{COMPANY.address.line3}</span>
          </address>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 pt-2">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(107,127,163,0.55)',
                }}
                whileHover={{ scale: 1.06 }}
              >
                {SOCIAL_ICONS[label]}
              </motion.a>
            ))}
          </div>

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
