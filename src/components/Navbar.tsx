import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticWrapper from './ui/MagneticWrapper';
import ScrambleText from './ui/ScrambleText';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: "Mothership", to: '/mothership' },
  { label: 'Awards Gala', to: '/awards' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

// ── Tick / line decoration ─────────────────────────────────────────────────
const NavTick = ({ color }: { color: string }) => (
  <span
    className="w-1 h-1 rounded-full flex-shrink-0"
    style={{ background: color }}
    aria-hidden="true"
  />
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const menuOpen = menuOpenPath === location.pathname;

  const handleScroll = useCallback(() => {
    const sy = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrolled(sy > 40);
    setScrollProgress(totalHeight > 0 ? sy / totalHeight : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Main header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* Glass background layer */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: scrolled
              ? 'rgba(5, 11, 24, 0.82)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(255, 255, 255, 0.055)'
              : '1px solid transparent',
          }}
        />

        {/* Scroll progress line — ultra thin, accent color */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
          <div
            className="h-full origin-left transition-transform duration-100"
            style={{
              background: 'linear-gradient(90deg, #fb923c, #f0f4ff 60%, transparent)',
              transform: `scaleX(${scrollProgress})`,
              opacity: scrolled ? 0.7 : 0,
              boxShadow: '0 0 8px rgba(251,146,60,0.6)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[4.5rem]">

          {/* ── Logo ── */}
          <Link to="/" className="group flex items-center gap-3 select-none flex-shrink-0">
            <div className="relative w-9 h-9 flex-shrink-0">
              {/* Glow ring on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{ background: 'rgba(251,146,60,0.4)' }}
              />
              <img
                src="/logo-278x262-removebg.png"
                alt="XR Summits"
                className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-heading font-bold tracking-[0.28em] text-foreground group-hover:text-accent transition-colors duration-400"
                style={{ fontSize: '0.78rem' }}
              >
                XR SUMMITS
              </span>
              <span
                className="font-heading font-light tracking-[0.45em] text-foreground-muted uppercase"
                style={{ fontSize: '0.45rem', marginTop: '2px' }}
              >
                Asia · Est. 2021
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <MagneticWrapper key={link.to} strength={0.12}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative group px-4 py-2.5 rounded-sm transition-colors duration-300 cursor-none
                    text-[0.68rem] font-semibold tracking-[0.14em] uppercase
                    ${isActive ? 'text-accent' : 'text-foreground-muted hover:text-foreground'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Hover bg pill */}
                      <span
                        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(255,255,255,0.035)' }}
                        aria-hidden="true"
                      />

                      <ScrambleText text={link.label} />

                      {/* Active underline */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-1 left-3 right-3 h-[1px]"
                          style={{
                            background: 'linear-gradient(90deg, transparent, #fb923c, transparent)',
                            boxShadow: '0 0 10px rgba(251,146,60,0.9)',
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </MagneticWrapper>
            ))}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Register button — desktop */}
            <div className="hidden lg:block">
              <MagneticWrapper strength={0.22}>
                <a
                  href="#tickets"
                  className="group relative inline-flex items-center gap-2 px-5 py-2 overflow-hidden cursor-none"
                  style={{
                    border: '1px solid rgba(251,146,60,0.5)',
                    borderRadius: '3px',
                  }}
                >
                  {/* Fill on hover */}
                  <span
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ background: '#fb923c' }}
                    aria-hidden="true"
                  />
                  {/* Glow */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: '0 0 30px rgba(251,146,60,0.5)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative text-[0.68rem] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{ color: 'inherit' }}
                  >
                    <span className="text-accent group-hover:text-[#050b18] transition-colors duration-300">
                      Register
                    </span>
                  </span>
                  <span
                    className="relative text-[0.65rem] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#050b18]"
                    style={{ color: 'rgba(251,146,60,0.6)' }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </MagneticWrapper>
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() =>
                setMenuOpenPath((p) => (p === location.pathname ? null : location.pathname))
              }
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-foreground-muted hover:text-accent transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] flex flex-col"
            style={{ background: 'rgba(5, 11, 24, 0.97)', backdropFilter: 'blur(24px)' }}
          >
            {/* Atmospheric glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.07] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, #fb923c 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
              aria-hidden="true"
            />

            {/* Top bar (mirrors header height) */}
            <div className="h-16 flex items-center px-6 flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 select-none" onClick={() => setMenuOpenPath(null)}>
                <img src="/logo-278x262-removebg.png" alt="XR Summits" className="w-8 h-8 object-contain" />
                <span className="font-heading font-bold tracking-[0.28em] text-foreground" style={{ fontSize: '0.78rem' }}>
                  XR SUMMITS
                </span>
              </Link>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Nav links */}
            <nav className="flex flex-col flex-1 justify-center px-6 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: 32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 32, opacity: 0 }}
                  transition={{ delay: i * 0.055 + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `group flex items-center gap-4 py-4 border-b transition-colors duration-200
                      ${isActive
                        ? 'text-accent border-white/10'
                        : 'text-foreground-muted hover:text-foreground border-white/[0.05]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <NavTick color={isActive ? '#fb923c' : 'rgba(255,255,255,0.15)'} />
                        <span className="font-heading font-bold tracking-[0.2em] uppercase" style={{ fontSize: '1.05rem' }}>
                          {link.label}
                        </span>
                        {isActive && (
                          <span className="ml-auto text-xs font-mono tracking-widest opacity-50">
                            ●
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ delay: 0.38, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 pb-10 pt-6"
            >
              {/* Edition badge */}
              <p className="text-[0.55rem] font-bold tracking-[0.45em] text-foreground-muted uppercase mb-5">
                4th Edition · Kuala Lumpur · 2026
              </p>
              <a
                href="#tickets"
                onClick={() => setMenuOpenPath(null)}
                className="flex items-center justify-center gap-3 w-full py-4 font-bold tracking-[0.2em] uppercase text-[0.78rem] text-background transition-all duration-300 rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                  boxShadow: '0 0 40px rgba(251,146,60,0.35)',
                }}
              >
                Register Now
                <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;