import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from './ui/MagneticWrapper';
import ScrambleText from './ui/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Mothership', to: '/mothership' },
  { label: 'Awards Gala', to: '/awards' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(() => location.pathname);

  // Ref untuk GSAP Scroll Progress
  const progressBarRef = useRef<HTMLDivElement>(null);

  if (location.pathname !== menuPathname) {
    setMenuPathname(location.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    // Optimasi: Hanya update state jika melewati threshold 50px
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => {
        if (prev !== isScrolled) return isScrolled;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animasikan garis bawah Navbar langsung dengan GSAP (bypass React render)
    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Smoothness
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* Glass layer */}
        <div
          className="absolute inset-0 transition-all duration-600"
          style={{
            background: scrolled ? 'rgba(5, 11, 24, 0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.045)' : '1px solid transparent',
          }}
        />

        {/* Scroll progress — ultra thin */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden z-10">
          <div
            ref={progressBarRef}
            className="h-full origin-left will-change-transform optimize-gpu"
            style={{
              background: 'linear-gradient(90deg, #fb923c 0%, rgba(240,244,255,0.6) 100%)',
              transform: 'scaleX(0)', // Inisialisasi awal 0, GSAP yang menggerakkan
              opacity: scrolled ? 0.65 : 0,
              transition: 'opacity 0.4s ease',
              boxShadow: '0 0 6px rgba(251,146,60,0.5)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* ── Logo ── */}
          <Link to="/" className="group flex items-center gap-3 select-none flex-shrink-0">
            <div className="relative w-8 h-8 flex-shrink-0">
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md"
                style={{ background: 'rgba(251,146,60,0.4)' }}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              />
              <img
                src="/logo-278x262-removebg.png"
                alt="XR Summits"
                className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col leading-none gap-[3px]">
              <span
                className="font-heading font-bold tracking-[0.3em] text-foreground group-hover:text-accent transition-colors duration-350"
                style={{ fontSize: '0.76rem' }}
              >
                XR SUMMITS
              </span>
              <span
                className="font-mono tracking-[0.44em] text-foreground-muted/50 uppercase"
                style={{ fontSize: '0.42rem' }}
              >
                Asia · Est. 2021
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center" aria-label="Primary navigation">
            <div className="w-px h-4 mr-6" style={{ background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />

            {NAV_LINKS.map((link) => (
              <MagneticWrapper key={link.to} strength={0.1}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative group px-3.5 py-2 rounded-sm transition-colors duration-300 cursor-none
                    text-[0.66rem] font-semibold tracking-[0.16em] uppercase
                    ${isActive ? 'text-accent' : 'text-foreground-muted hover:text-foreground'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                        aria-hidden="true"
                      />
                      <ScrambleText text={link.label} />
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-0.5 left-3 right-3 h-px"
                          style={{
                            background: 'linear-gradient(90deg, transparent, #fb923c, transparent)',
                            boxShadow: '0 0 8px rgba(251,146,60,0.8)',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </MagneticWrapper>
            ))}

            <div className="w-px h-4 ml-6 mr-4" style={{ background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <MagneticWrapper strength={0.2}>
                <a
                  href="#tickets"
                  className="group relative inline-flex items-center gap-2 px-5 py-2 overflow-hidden rounded-sm cursor-none"
                  style={{ border: '1px solid rgba(251,146,60,0.4)' }}
                >
                  <span
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-450"
                    style={{ background: '#fb923c', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative text-[0.66rem] font-bold tracking-[0.22em] uppercase text-accent group-hover:text-[#050b18] transition-colors duration-200"
                  >
                    Register
                  </span>
                  <span
                    className="relative text-[0.62rem] transition-all duration-300 text-accent/55 group-hover:text-[#050b18] group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </MagneticWrapper>
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-foreground-muted hover:text-accent transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                    <Menu size={18} />
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
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[99] flex flex-col"
            style={{ background: 'rgba(5, 11, 24, 0.97)', backdropFilter: 'blur(28px)' }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: '500px', height: '260px',
                background: 'radial-gradient(ellipse, rgba(251,146,60,0.07) 0%, transparent 68%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.012] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
              aria-hidden="true"
            />

            <div className="h-16 flex items-center px-6 flex-shrink-0">
              <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
                <img src="/logo-278x262-removebg.png" alt="XR Summits" className="w-7 h-7 object-contain" />
                <span className="font-heading font-bold tracking-[0.3em] text-foreground" style={{ fontSize: '0.76rem' }}>
                  XR SUMMITS
                </span>
              </Link>
            </div>

            <div className="mx-6 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

            <nav className="flex flex-col flex-1 justify-center px-6 gap-0.5" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: 28, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 28, opacity: 0 }}
                  transition={{ delay: i * 0.05 + 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `group flex items-center gap-4 py-4 border-b transition-all duration-200
                      ${isActive ? 'text-accent border-white/10' : 'text-foreground-muted hover:text-foreground border-white/[0.04]'}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
                          style={{ background: isActive ? '#fb923c' : 'rgba(255,255,255,0.12)' }}
                          aria-hidden="true"
                        />
                        <span className="font-heading font-bold tracking-[0.22em] uppercase" style={{ fontSize: '1.05rem' }}>
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-auto font-mono text-[0.5rem] tracking-widest text-accent/50"
                          >
                            ●
                          </motion.span>
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.34, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 pb-10 pt-5"
            >
              <p className="font-mono text-[0.5rem] tracking-[0.4em] text-foreground-muted/40 uppercase mb-5">
                4th Edition · Kuala Lumpur · 2026
              </p>
              <a
                href="#tickets"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-sm font-bold tracking-[0.22em] uppercase text-[0.75rem] text-background"
                style={{
                  background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                  boxShadow: '0 0 36px rgba(251,146,60,0.3)',
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