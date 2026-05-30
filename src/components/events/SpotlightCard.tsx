import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface SpotlightCardProps {
  index: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  accentColor: string;
  tag: string;
  to?: string;
  imageSrc?: string;
  isFeatured?: boolean;
}

const SpotlightCard = ({
  index,
  title,
  subtitle,
  date,
  location,
  description,
  accentColor,
  tag,
  to,
  imageSrc,
  isFeatured = false,
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  // ── 3D tilt ───────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shineRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    gsap.to(cardRef.current, {
      rotateX: ((y - cy) / cy) * -5,
      rotateY: ((x - cx) / cx) * 5,
      duration: 0.45,
      ease: 'power2.out',
      transformPerspective: 900,
    });

    gsap.to(shineRef.current, {
      x: x - cx,
      y: y - cy,
      opacity: isFeatured ? 0.15 : 0.1,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !shineRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.75, ease: 'power3.out',
    });
    gsap.to(shineRef.current, {
      opacity: 0, duration: 0.4,
    });
  };

  // ── Inner card ────────────────────────────────────────────────────────
  const inner = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={[
        'relative overflow-hidden rounded-xl group cursor-pointer h-full',
        isFeatured ? 'min-h-[460px]' : 'min-h-[300px]',
      ].join(' ')}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            {/* Gradient overlay — stronger at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to top,
                  rgba(5,11,24,0.97) 0%,
                  rgba(5,11,24,0.72) 45%,
                  rgba(5,11,24,0.28) 100%
                )`,
              }}
            />
          </>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(145deg, rgba(13,27,46,0.95) 0%, ${accentColor}14 100%)`,
            }}
          />
        )}
      </div>

      {/* ── Border (static, hover via JS) ── */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-450"
        style={{ border: `1px solid ${accentColor}22` }}
        ref={(el) => {
          if (!el) return;
          const card = cardRef.current;
          if (!card) return;
          card.addEventListener('mouseenter', () => {
            el.style.borderColor = `${accentColor}50`;
            el.style.boxShadow = `0 0 48px ${accentColor}18, inset 0 0 24px ${accentColor}06`;
          });
          card.addEventListener('mouseleave', () => {
            el.style.borderColor = `${accentColor}22`;
            el.style.boxShadow = 'none';
          });
        }}
      />

      {/* ── Top edge glow line ── */}
      <div
        className="absolute top-0 left-8 right-8 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}${isFeatured ? '80' : '50'}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* ── Corner brackets (top-left + bottom-right only — less noise) ── */}
      <div
        className="absolute top-4 left-4 w-5 h-5 border-t border-l pointer-events-none"
        style={{ borderColor: `${accentColor}55` }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-4 right-4 w-5 h-5 border-b border-r pointer-events-none"
        style={{ borderColor: `${accentColor}55` }}
        aria-hidden="true"
      />

      {/* ── Cursor shine ── */}
      <div
        ref={shineRef}
        className="absolute w-60 h-60 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${accentColor}55 0%, transparent 68%)`,
          filter: 'blur(24px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 gap-3">

        {/* Tag + index */}
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[0.58rem] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm"
            style={{
              color: accentColor,
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {tag}
          </span>
          <span
            className="font-mono text-[0.52rem] tracking-[0.3em]"
            style={{ color: `${accentColor}55` }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Text block */}
        <div>
          <p
            className="font-semibold tracking-[0.24em] uppercase mb-1"
            style={{ fontSize: '0.6rem', color: `${accentColor}85` }}
          >
            {subtitle}
          </p>
          <h3
            className="font-heading font-bold text-foreground leading-tight mb-2"
            style={{ fontSize: isFeatured ? '1.45rem' : '1.05rem' }}
          >
            {title}
          </h3>
          <p
            className="leading-relaxed line-clamp-2"
            style={{ fontSize: '0.75rem', color: 'rgba(107,127,163,0.85)' }}
          >
            {description}
          </p>
        </div>

        {/* Meta row */}
        <div
          className="flex items-center gap-5 pt-3 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {/* Date */}
          <span className="flex items-center gap-1.5" style={{ fontSize: '0.65rem', color: 'rgba(107,127,163,0.8)' }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3" aria-hidden="true">
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path strokeLinecap="round" d="M5 1v3M11 1v3M2 7h12" />
            </svg>
            {date}
          </span>

          {/* Location */}
          <span className="flex items-center gap-1.5" style={{ fontSize: '0.65rem', color: 'rgba(107,127,163,0.8)' }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5z" />
              <circle cx="8" cy="6" r="1.5" />
            </svg>
            {location}
          </span>

          {/* Arrow — only if has link */}
          {to && (
            <span
              className="ml-auto text-sm transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: `${accentColor}70` }}
              aria-hidden="true"
            >
              →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: index * 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: '900px' }}
    >
      {to ? <Link to={to} className="block h-full">{inner}</Link> : inner}
    </motion.div>
  );
};

export default SpotlightCard;