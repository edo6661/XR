import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticWrapper from './ui/MagneticWrapper';
import ScrambleText from './ui/ScrambleText';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: "Mothership 26' AI Bootcamp", to: '/mothership' },
  { label: 'Awards Gala', to: '/awards' },
  { label: 'About', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
          ? 'py-2 bg-[rgba(15,23,42,0.75)] backdrop-blur-xl border-b border-[rgba(251,146,60,0.12)] shadow-[0_0_40px_rgba(251,146,60,0.05)]'
          : 'py-4 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 select-none">
            <div className="relative">
              <img
                src="/logo-278x262-removebg.png"
                alt="XR Summits"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback text logo */}
              <span
                className="font-heading text-xl font-bold tracking-[0.2em] text-foreground group-hover:text-accent transition-colors duration-300"
                style={{ display: 'none' }}
                ref={(el) => {
                  if (el) {
                    const img = el.previousElementSibling as HTMLImageElement;
                    if (img && img.style.display === 'none') {
                      el.style.display = 'block';
                    }
                  }
                }}
              >
                XR
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-sm font-bold tracking-[0.25em] text-foreground group-hover:text-accent transition-colors duration-300">
                XR
              </span>
              <span className="font-heading text-[0.5rem] font-light tracking-[0.4em] text-foreground-muted uppercase">
                Summits
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <MagneticWrapper key={link.to} strength={0.15}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-[0.72rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 rounded-sm cursor-none
                    ${isActive
                      ? 'text-accent'
                      : 'text-foreground-muted hover:text-foreground'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Ganti pemanggilan {link.label} dengan ini: */}
                      <ScrambleText text={link.label} />

                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-2 right-2 h-[1px] bg-accent shadow-[0_0_8px_rgba(251,146,60,0.8)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </MagneticWrapper>
            ))}

            {/* Tarikan magnet sedang (0.25) untuk tombol CTA Navigasi */}
            <div className="ml-4">
              <MagneticWrapper strength={0.25}>
                <a
                  href="#tickets"
                  className="px-5 py-2 text-[0.72rem] font-bold tracking-[0.15em] uppercase
                    border border-accent text-accent rounded-sm
                    hover:bg-accent hover:text-background
                    transition-all duration-300
                    shadow-[0_0_16px_rgba(251,146,60,0.2)]
                    hover:shadow-[0_0_24px_rgba(251,146,60,0.5)] cursor-none inline-block"
                >
                  Register
                </a>
              </MagneticWrapper>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-foreground-muted hover:text-accent transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] bg-[rgba(15,23,42,0.97)] backdrop-blur-2xl flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block py-4 text-xl font-heading font-semibold tracking-[0.15em] uppercase border-b border-border
                      ${isActive ? 'text-accent' : 'text-foreground-muted'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <a
                  href="#tickets"
                  className="inline-block px-8 py-3 text-base font-bold tracking-[0.2em] uppercase
                    border border-accent text-accent rounded-sm
                    hover:bg-accent hover:text-background
                    transition-all duration-300
                    shadow-[0_0_24px_rgba(251,146,60,0.3)]"
                >
                  Register
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;