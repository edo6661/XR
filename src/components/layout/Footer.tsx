import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COMPANY, PRIMARY_NAV_LINKS, SOCIAL_LINKS } from '../../core/navigation/routes';
import { LEGAL_PAGES } from '../../core/content/legalPages';

const SOCIAL_ICONS: Record<string, ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  'X (Twitter)': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  ),
};

const FooterLink = ({ label, to }: { label: string; to: string }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 transition-colors duration-250 hover:text-on-light-heading"
      style={{ color: 'var(--theme-on-light-muted)', fontSize: '0.82rem' }}
    >
      <span
        className="w-0 h-px transition-all duration-300 group-hover:w-3 shrink-0"
        style={{ background: 'rgba(251,146,60,0.5)', flexShrink: 0 }}
        aria-hidden="true"
      />
      {label}
    </Link>
  </li>
);

const FooterColumnTitle = ({ children }: { children: ReactNode }) => (
  <h4
    className="font-heading font-bold tracking-[0.22em] uppercase pb-3 mb-1 text-on-light-heading"
    style={{
      fontSize: '0.92rem',
      borderBottom: '1px solid rgba(26, 46, 80, 0.1)',
    }}
  >
    {children}
  </h4>
);

const Footer = () => {
  const eventLinks = PRIMARY_NAV_LINKS.filter(
    (l) => l.to !== '/' && l.to !== '/about' && l.to !== '/contact',
  );
  const companyLinks = PRIMARY_NAV_LINKS.filter(
    (l) => l.to === '/' || l.to === '/about' || l.to === '/contact',
  );

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(168deg, #fafbfd 0%, #ffffff 42%, #f6f8fc 100%)',
      }}
    >
      {/* Ambient brand mesh — decorative only, no extra height */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-16 -right-12 w-[320px] h-[320px] rounded-full opacity-[0.18]"
          style={{
            background: 'radial-gradient(circle, rgba(239,120,61,0.16) 0%, transparent 68%)',
            filter: 'blur(36px)',
          }}
        />
        <div
          className="absolute bottom-0 -left-16 w-[280px] h-[280px] rounded-full opacity-[0.14]"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,138,0.14) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,46,80,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(26,46,80,0.55) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--theme-accent-yellow) 15%, var(--theme-accent) 35%, var(--theme-accent-blue) 65%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 pb-14">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link to="/" className="group flex items-center gap-3 w-fit select-none">
              <div className="relative w-8 h-8">
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-md"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(239,120,61,0.28), rgba(57,83,163,0.22))',
                  }}
                  aria-hidden="true"
                />
                <div className="relative glass-light rounded-lg p-0.5">
                  <img
                    src="/logo-278x262-removebg.png"
                    alt="XR Summits"
                    className="relative w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col leading-none gap-[3px]">
                <span
                  className="font-heading font-bold tracking-[0.3em] text-on-light-heading group-hover:text-accent transition-colors duration-300"
                  style={{ fontSize: '0.76rem' }}
                >
                  XR SUMMITS SDN BHD
                </span>
              </div>
            </Link>

            <p
              style={{
                fontSize: '0.86rem',
                color: 'var(--theme-on-light)',
                lineHeight: 1.8,
                maxWidth: '320px',
              }}
            >
              {COMPANY.tagline}
            </p>

            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--theme-on-light-muted)',
                lineHeight: 1.75,
                maxWidth: '320px',
              }}
            >
              {COMPANY.supportingText}
            </p>

            {/* Social links */}
            <div className="flex items-center flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass-light flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
                  style={{ color: 'var(--theme-on-light-muted)' }}
                  whileHover={{ scale: 1.08 }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(239,120,61,0.28)';
                    el.style.color = 'var(--theme-accent)';
                    el.style.background =
                      'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(239,120,61,0.08))';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = '';
                    el.style.color = 'var(--theme-on-light-muted)';
                    el.style.background = '';
                  }}
                >
                  {SOCIAL_ICONS[label]}
                </motion.a>
              ))}
            </div>

            {/* Contact info */}
            <div
              className="flex flex-col gap-1.5"
              style={{
                fontSize: '0.8rem',
                color: 'var(--theme-on-light-muted)',
                lineHeight: 1.8,
              }}
            >
              <a
                href={`tel:${COMPANY.phone}`}
                className="hover:text-accent transition-colors duration-200"
              >
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="hover:text-accent transition-colors duration-200"
              >
                {COMPANY.email}
              </a>
              <address className="not-italic flex flex-col gap-0.5 mt-1">
                <span>{COMPANY.address.line1}</span>
                <span>{COMPANY.address.line2}</span>
                <span>{COMPANY.address.line3}</span>
              </address>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <FooterColumnTitle>Events 2026</FooterColumnTitle>
              <ul className="flex flex-col gap-2.5">
                {eventLinks.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <FooterColumnTitle>Explore</FooterColumnTitle>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
              <FooterColumnTitle>Legal</FooterColumnTitle>
              <ul className="flex flex-col gap-2.5">
                {LEGAL_PAGES.map((page) => (
                  <FooterLink key={page.slug} label={page.title} to={page.path} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: 'rgba(26, 46, 80, 0.08)' }}
          aria-hidden="true"
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p style={{ fontSize: '0.76rem', color: 'var(--theme-on-light-muted)' }}>
            XR SUMMITS SDN BHD, MALAYSIA ({COMPANY.registrationNo}) ©2026. All Rights Reserved.
          </p>

          <a
            href={`mailto:${COMPANY.email}`}
            className="transition-colors duration-250 hover:text-accent"
            style={{ fontSize: '0.76rem', color: 'var(--theme-on-light-muted)' }}
          >
            {COMPANY.email}
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 transition-colors duration-250 hover:text-accent"
            style={{ color: 'var(--theme-on-light-muted)', fontSize: '0.76rem' }}
            aria-label="Back to top"
          >
            <span className="font-bold tracking-[0.24em] uppercase">Back to top</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              ↑
            </motion.span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
