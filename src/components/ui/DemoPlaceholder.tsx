import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { COMPANY } from '../../core/navigation/routes';

interface DemoPlaceholderProps {
  title: string;
  subtitle?: string;
  eta?: string;        // e.g. "Q3 2026"
  accentColor?: string;
}

const DemoPlaceholder = ({
  title,
  subtitle,
  eta,
  accentColor = '#fb923c',
}: DemoPlaceholderProps) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">

      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[600px] h-[400px] rounded-full opacity-[0.055]"
          style={{
            background: `radial-gradient(ellipse, ${accentColor} 0%, transparent 68%)`,
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}70, transparent)`,
            boxShadow: `0 0 12px ${accentColor}40`,
          }}
          aria-hidden="true"
        />

        {/* Corner brackets */}
        <div className="absolute top-5 left-5 w-5 h-5 border-t border-l" style={{ borderColor: `${accentColor}40` }} aria-hidden="true" />
        <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r" style={{ borderColor: `${accentColor}40` }} aria-hidden="true" />

        <div
          className="rounded-2xl p-10 flex flex-col items-center gap-7 text-center"
          style={{
            background: 'rgba(13,27,46,0.7)',
            border: `1px solid ${accentColor}18`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `0 0 80px ${accentColor}06, 0 32px 64px rgba(0,0,0,0.35)`,
          }}
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl"
            style={{
              background: `${accentColor}12`,
              border: `1px solid ${accentColor}28`,
              color: accentColor,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          {/* Eyebrow */}
          <p
            className="font-bold tracking-[0.45em] uppercase"
            style={{ fontSize: '0.55rem', color: `${accentColor}70` }}
          >
            {eta ? `Coming ${eta}` : 'Under Development'}
          </p>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1
              className="font-heading font-black text-foreground leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', letterSpacing: '0.04em' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: '0.85rem', color: 'rgba(107,127,163,0.75)', lineHeight: 1.7 }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Body */}
          <p style={{ fontSize: '0.82rem', color: 'rgba(107,127,163,0.7)', lineHeight: 1.8, maxWidth: '340px' }}>
            This section is currently being built. We're working hard to bring you
            something exceptional — check back soon or register your interest below.
          </p>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.055)' }} aria-hidden="true" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a
              href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('XR Summits Interest')}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 group"
              style={{
                fontSize: '0.7rem',
                background: accentColor,
                color: '#050b18',
                boxShadow: `0 0 24px ${accentColor}30`,
              }}
            >
              Register Interest
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>

            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 group"
              style={{
                fontSize: '0.7rem',
                border: `1px solid rgba(255,255,255,0.1)`,
                color: 'rgba(107,127,163,0.7)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${accentColor}35`;
                (e.currentTarget as HTMLAnchorElement).style.color = '#f0f4ff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(107,127,163,0.7)';
              }}
            >
              <span aria-hidden="true">←</span>
              Back to Hub
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom coordinate label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute bottom-10 font-mono tracking-[0.35em] uppercase"
        style={{ fontSize: '0.46rem', color: 'rgba(107,127,163,0.25)' }}
        aria-hidden="true"
      >
        XR SUMMITS · KUL · 2026
      </motion.p>
    </section>
  );
};

export default DemoPlaceholder;