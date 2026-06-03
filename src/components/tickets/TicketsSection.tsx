import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import MagneticWrapper from '../ui/MagneticWrapper';
import PaymentPlaceholders from './PaymentPlaceholders';
import { COMPANY } from '../../core/navigation/routes';

// ── Decorative checkmark icon ──────────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Perks list ─────────────────────────────────────────────────────────────
const PERKS = [
  'Full-day access to all keynotes & panels',
  'Hands-on XR demo floor',
  'Exclusive networking sessions',
  'Post-event recordings & resources',
];

// ── TicketsSection ─────────────────────────────────────────────────────────
const TicketsSection = () => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const handleBtnEnter = () => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, { scaleY: 1, duration: 0.45, ease: 'power3.out' });
  };
  const handleBtnLeave = () => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, { scaleY: 0, duration: 0.35, ease: 'power3.in' });
  };

  return (
    <section
      id="tickets"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
    >
      {/* ── Atmospheric center glow ── */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[900px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse, #fb923c 0%, transparent 68%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — copy block */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-px" style={{ background: 'rgba(251,146,60,0.55)' }} />
              <span
                className="font-bold tracking-[0.52em] uppercase"
                style={{ fontSize: '0.57rem', color: 'rgba(251,146,60,0.72)' }}
              >
                Secure Your Seat
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-heading font-black leading-[0.95]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', letterSpacing: '0.03em' }}
              >
                <span style={{ color: '#f0f4ff' }}>Join</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(130deg, #fb923c 0%, #f0f4ff 85%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  500+ Leaders
                </span>
              </h2>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.16, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: '0.88rem', color: 'rgba(107,127,163,0.9)', lineHeight: 1.8 }}
            >
              Early bird tickets for XRAS26 are highly limited. Join innovators,
              enterprise leaders, and XR visionaries at Asia's most anticipated
              immersive technology summit.
            </motion.p>

            {/* Perks list */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
              role="list"
            >
              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3"
                  style={{ fontSize: '0.8rem', color: 'rgba(240,244,255,0.75)' }}
                >
                  <span style={{ color: '#fb923c' }}>
                    <CheckIcon />
                  </span>
                  {perk}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(13,27,46,0.75)',
              border: '1px solid rgba(251,146,60,0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 0 80px rgba(251,146,60,0.07), 0 32px 64px rgba(0,0,0,0.4)',
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.7) 40%, rgba(251,146,60,0.7) 60%, transparent)',
                boxShadow: '0 0 12px rgba(251,146,60,0.4)',
              }}
              aria-hidden="true"
            />

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l" style={{ borderColor: 'rgba(251,146,60,0.35)' }} aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r" style={{ borderColor: 'rgba(251,146,60,0.35)' }} aria-hidden="true" />

            <div className="flex flex-col gap-7 p-10">
              {/* Early bird badge */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm font-bold tracking-[0.22em] uppercase"
                  style={{
                    fontSize: '0.58rem',
                    color: '#050b18',
                    background: '#fb923c',
                    boxShadow: '0 0 20px rgba(251,146,60,0.4)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#050b18] animate-pulse"
                    aria-hidden="true"
                  />
                  Early Bird
                </span>
                <span
                  className="font-bold tracking-[0.2em] uppercase"
                  style={{ fontSize: '0.58rem', color: 'rgba(107,127,163,0.6)' }}
                >
                  Limited Seats
                </span>
              </div>

              {/* Price block */}
              <div className="flex flex-col gap-1">
                <div className="flex items-end gap-2">
                  <span
                    className="font-heading font-black leading-none"
                    style={{
                      fontSize: 'clamp(2.8rem, 6vw, 3.8rem)',
                      background: 'linear-gradient(135deg, #fb923c 0%, #f0f4ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    TBC
                  </span>
                  <span
                    className="mb-2 font-semibold"
                    style={{ fontSize: '0.78rem', color: 'rgba(107,127,163,0.65)' }}
                  >
                    / person
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'rgba(107,127,163,0.7)' }}>
                  Pricing announced soon — register interest now
                </p>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} aria-hidden="true" />

              {/* CTA Button */}
              <MagneticWrapper strength={0.2}>
                <a
                  ref={btnRef}
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('XRAS26 Ticket Interest')}`}
                  className="relative flex items-center justify-center gap-3 w-full py-4 rounded-sm overflow-hidden cursor-none group"
                  style={{
                    border: '1px solid rgba(251,146,60,0.55)',
                    color: '#fb923c',
                    transition: 'color 0.4s ease, box-shadow 0.4s ease',
                  }}
                  onMouseEnter={(e: React.MouseEvent) => {
                    handleBtnEnter();
                    (e.currentTarget as HTMLAnchorElement).style.color = '#050b18';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(251,146,60,0.4)';
                  }}
                  onMouseLeave={(e: React.MouseEvent) => {
                    handleBtnLeave();
                    (e.currentTarget as HTMLAnchorElement).style.color = '#fb923c';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Fill layer */}
                  <span
                    ref={fillRef}
                    className="absolute inset-0 origin-bottom"
                    style={{
                      background: '#fb923c',
                      transform: 'scaleY(0)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative font-bold tracking-[0.22em] uppercase" style={{ fontSize: '0.76rem' }}>
                    Register Interest
                  </span>
                  <span className="relative text-sm transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </a>
              </MagneticWrapper>

              {/* Fine print */}
              <p
                className="text-center"
                style={{ fontSize: '0.62rem', color: 'rgba(107,127,163,0.5)' }}
              >
                No commitment required · We'll notify you when tickets go live
              </p>
            </div>
          </motion.div>
        </div>

        <PaymentPlaceholders />
      </div>
    </section>
  );
};

export default TicketsSection;