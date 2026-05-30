import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_COLS = [
  {
    heading: 'Events',
    links: [
      { label: 'XR Asia Summit 2026', to: '/xr-summit' },
      { label: 'Mothership AI Bootcamp', to: '/mothership' },
      { label: 'XR Esports', to: '/xr-esports' },
      { label: 'Hackathon', to: '/hackathon' },
      { label: 'Awards Gala', to: '/awards' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Sponsorship', to: '/sponsorship' },
      { label: 'Press & Media', to: '/press' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const FooterLink = ({ label, to }: { label: string; to: string }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 transition-colors duration-250 hover:text-foreground"
      style={{ color: 'rgba(107,127,163,0.58)', fontSize: '0.76rem' }}
    >
      <span
        className="w-0 h-px transition-all duration-300 group-hover:w-3"
        style={{ background: 'rgba(251,146,60,0.5)', flexShrink: 0 }}
        aria-hidden="true"
      />
      {label}
    </Link>
  </li>
);

const Footer = () => {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: 'rgba(3,6,13,0.99)' }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.28) 25%, rgba(251,146,60,0.28) 75%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '280px',
          background: 'radial-gradient(ellipse, rgba(251,146,60,0.025) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Main section ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 pb-14">

          {/* Brand col */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link to="/" className="group flex items-center gap-3 w-fit select-none">
              <div className="relative w-8 h-8">
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-md"
                  style={{ background: 'rgba(251,146,60,0.3)' }}
                  aria-hidden="true"
                />
                <img
                  src="/logo-278x262-removebg.png"
                  alt="XR Summits"
                  className="relative w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none gap-[3px]">
                <span
                  className="font-heading font-bold tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-300"
                  style={{ fontSize: '0.76rem' }}
                >
                  XR SUMMITS
                </span>
                <span
                  className="font-mono tracking-[0.44em] text-foreground-muted/40 uppercase"
                  style={{ fontSize: '0.42rem' }}
                >
                  Asia · Est. 2021
                </span>
              </div>
            </Link>

            <p style={{ fontSize: '0.78rem', color: 'rgba(107,127,163,0.65)', lineHeight: 1.8, maxWidth: '270px' }}>
              Asia's definitive platform connecting innovators and shaping the future of immersive technology.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.055)',
                    color: 'rgba(107,127,163,0.5)',
                  }}
                  whileHover={{ scale: 1.08 }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(251,146,60,0.3)';
                    el.style.color = 'rgba(251,146,60,0.75)';
                    el.style.background = 'rgba(251,146,60,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(255,255,255,0.055)';
                    el.style.color = 'rgba(107,127,163,0.5)';
                    el.style.background = 'rgba(255,255,255,0.035)';
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            <address
              className="not-italic flex flex-col gap-0.5"
              style={{ fontSize: '0.7rem', color: 'rgba(107,127,163,0.42)', lineHeight: 1.75 }}
            >
              <span>Sunway Innovation Hub,</span>
              <span>Bandar Sunway, 47500</span>
              <span>Petaling Jaya, Selangor, Malaysia</span>
            </address>
          </div>

          {/* Nav cols */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {NAV_COLS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h4
                  className="font-heading font-bold tracking-[0.32em] uppercase"
                  style={{ fontSize: '0.58rem', color: 'rgba(240,244,255,0.35)' }}
                >
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <FooterLink key={link.to} {...link} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="w-full h-px"
          style={{ background: 'rgba(255,255,255,0.04)' }}
          aria-hidden="true"
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p style={{ fontSize: '0.66rem', color: 'rgba(107,127,163,0.35)' }}>
            © {new Date().getFullYear()} XR Summits Sdn. Bhd. All rights reserved.
          </p>

          <a
            href="mailto:hello@xrsummits.com"
            className="transition-colors duration-250"
            style={{ fontSize: '0.66rem', color: 'rgba(107,127,163,0.35)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(251,146,60,0.65)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(107,127,163,0.35)'; }}
          >
            hello@xrsummits.com
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 transition-colors duration-250"
            style={{ color: 'rgba(107,127,163,0.35)', fontSize: '0.66rem' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(251,146,60,0.65)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(107,127,163,0.35)'; }}
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