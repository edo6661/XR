import { useRef, useCallback } from 'react';
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
  const imgRef = useRef<HTMLImageElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shineRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    gsap.to(cardRef.current, {
      rotateX: ((y - cy) / cy) * -4,
      rotateY: ((x - cx) / cx) * 4,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    gsap.to(shineRef.current, {
      x: x - cx,
      y: y - cy,
      opacity: isFeatured ? 0.14 : 0.09,
      duration: 0.38,
      ease: 'power2.out',
    });
  }, [isFeatured]);

  const handleMouseEnter = useCallback(() => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1.04, duration: 0.7, ease: 'power3.out' });
    }
    if (borderRef.current) {
      borderRef.current.style.borderColor = `${accentColor}42`;
      borderRef.current.style.boxShadow = `0 0 52px ${accentColor}14, inset 0 0 32px ${accentColor}04`;
    }
  }, [accentColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !shineRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
    gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: 'power3.out' });
    }
    if (borderRef.current) {
      borderRef.current.style.borderColor = `${accentColor}20`;
      borderRef.current.style.boxShadow = 'none';
    }
  }, [accentColor]);

  const inner = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={[
        'relative overflow-hidden rounded-xl group cursor-pointer h-full',
        isFeatured ? 'min-h-[460px]' : 'min-h-[300px]',
      ].join(' ')}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {imageSrc ? (
          <>
            <img
              ref={imgRef}
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(5,11,24,0.97) 0%, rgba(5,11,24,0.65) 40%, rgba(5,11,24,0.22) 100%)`,
              }}
            />
          </>
        ) : (
          <div
            className="w-full h-full"
            style={{ background: `linear-gradient(148deg, rgba(13,27,46,0.96) 0%, ${accentColor}10 100%)` }}
          />
        )}
      </div>

      {/* ── Border ── */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          border: `1px solid ${accentColor}20`,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      />

      {/* ── Top edge glow ── */}
      <div
        className="absolute top-0 left-10 right-10 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}${isFeatured ? '70' : '45'}, transparent)` }}
        aria-hidden="true"
      />

      {/* ── Corner brackets ── */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l pointer-events-none" style={{ borderColor: `${accentColor}48` }} aria-hidden="true" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r pointer-events-none" style={{ borderColor: `${accentColor}48` }} aria-hidden="true" />

      {/* ── Cursor shine ── */}
      <div
        ref={shineRef}
        className="absolute w-56 h-56 rounded-full pointer-events-none opacity-0 z-[1]"
        style={{
          background: `radial-gradient(circle, ${accentColor}50 0%, transparent 65%)`,
          filter: 'blur(22px)',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">

        {/* Tag + index */}
        <div className="flex items-center justify-between mb-0.5">
          <span
            className="text-[0.56rem] font-bold tracking-[0.32em] uppercase px-2.5 py-1 rounded-sm"
            style={{
              color: accentColor,
              background: `${accentColor}16`,
              border: `1px solid ${accentColor}28`,
            }}
          >
            {tag}
          </span>
          <span
            className="font-mono text-[0.5rem] tracking-[0.3em]"
            style={{ color: `${accentColor}48` }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Text */}
        <div>
          <p
            className="font-semibold tracking-[0.26em] uppercase mb-1.5"
            style={{ fontSize: '0.58rem', color: `${accentColor}80` }}
          >
            {subtitle}
          </p>
          <h3
            className="font-heading font-bold text-foreground leading-tight mb-2"
            style={{ fontSize: isFeatured ? '1.42rem' : '1.02rem' }}
          >
            {title}
          </h3>
          <p
            className="leading-relaxed line-clamp-2"
            style={{ fontSize: '0.73rem', color: 'rgba(107,127,163,0.82)' }}
          >
            {description}
          </p>
        </div>

        {/* Meta row */}
        <div
          className="flex items-center gap-5 pt-3 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <span className="flex items-center gap-1.5" style={{ fontSize: '0.63rem', color: 'rgba(107,127,163,0.75)' }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3" aria-hidden="true">
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path strokeLinecap="round" d="M5 1v3M11 1v3M2 7h12" />
            </svg>
            {date}
          </span>
          <span className="flex items-center gap-1.5" style={{ fontSize: '0.63rem', color: 'rgba(107,127,163,0.75)' }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5z" />
              <circle cx="8" cy="6" r="1.5" />
            </svg>
            {location}
          </span>
          {to && (
            <span
              className="ml-auto text-sm transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: `${accentColor}65` }}
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: '1000px' }}
    >
      {to ? <Link to={to} className="block h-full">{inner}</Link> : inner}
    </motion.div>
  );
};

export default SpotlightCard;