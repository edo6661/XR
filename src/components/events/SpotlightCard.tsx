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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !shineRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;

    gsap.to(cardRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 900,
    });

    // Shine follows cursor
    gsap.to(shineRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 0.12,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !shineRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
    });
    gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
  };

  const inner = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative h-full rounded-xl overflow-hidden cursor-pointer group
        ${isFeatured ? 'min-h-[480px]' : 'min-h-[340px]'}`}
    >
      {/* Image / gradient background */}
      <div className="absolute inset-0">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(5,11,24,0.97) 0%, rgba(5,11,24,0.6) 50%, rgba(5,11,24,0.2) 100%)`,
              }}
            />
          </>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, rgba(13,27,46,0.95) 0%, ${accentColor}18 100%)`,
            }}
          />
        )}
      </div>

      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-500"
        style={{
          border: `1px solid ${accentColor}25`,
          boxShadow: `inset 0 0 0 1px ${accentColor}00`,
        }}
      />
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 40px ${accentColor}25, inset 0 0 30px ${accentColor}08`,
          border: `1px solid ${accentColor}55`,
        }}
      />

      {/* Cursor shine blob */}
      <div
        ref={shineRef}
        className="absolute w-64 h-64 rounded-full pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${accentColor}60 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          filter: 'blur(20px)',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Corner brackets */}
      {[
        'top-3 left-3 border-t border-l',
        'top-3 right-3 border-t border-r',
        'bottom-3 left-3 border-b border-l',
        'bottom-3 right-3 border-b border-r',
      ].map((cls) => (
        <div
          key={cls}
          className={`absolute w-4 h-4 ${cls} transition-all duration-300`}
          style={{ borderColor: `${accentColor}60` }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 gap-3">
        {/* Tag + index */}
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[0.58rem] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
            style={{
              color: accentColor,
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}35`,
            }}
          >
            {tag}
          </span>
          <span
            className="font-mono text-[0.58rem] tracking-widest"
            style={{ color: `${accentColor}60` }}
          >
            0{index + 1}
          </span>
        </div>

        <div>
          <p
            className="text-[0.62rem] font-semibold tracking-[0.25em] uppercase mb-1"
            style={{ color: `${accentColor}90` }}
          >
            {subtitle}
          </p>
          <h3
            className={`font-heading font-bold text-foreground leading-tight mb-2
              ${isFeatured ? 'text-2xl' : 'text-lg'}`}
          >
            {title}
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
          <span className="flex items-center gap-1.5 text-[0.65rem] text-foreground-muted">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path strokeLinecap="round" d="M5 1v3M11 1v3M2 7h12" />
            </svg>
            {date}
          </span>
          <span className="flex items-center gap-1.5 text-[0.65rem] text-foreground-muted">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5z" />
              <circle cx="8" cy="6" r="1.5" />
            </svg>
            {location}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {to ? (
        <Link to={to} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
};

export default SpotlightCard;