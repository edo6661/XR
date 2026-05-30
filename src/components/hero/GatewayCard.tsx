import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TracerBorder from '../ui/TracerBorder'; // <-- Import TracerBorder dikembalikan

interface GatewayCardProps {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  to: string;
  accentColor: string;
  glowColor?: string; // Opsional jika tidak dipakai di versi baru
  tag: string;
  icon: React.ReactNode;
  isCenter?: boolean;
}

const GatewayCard = ({
  index,
  title,
  subtitle,
  description,
  to,
  accentColor,
  tag,
  icon,
  isCenter = false,
}: GatewayCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // ── 3D tilt + glow follow ──────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * (isCenter ? -5 : -4);
    const rotY = ((x - cx) / cx) * (isCenter ? 5 : 4);

    gsap.to(cardRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    });

    // Glow follows cursor
    gsap.to(glowRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: isCenter ? 0.22 : 0.14,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      y: -5,
      duration: 0.45,
      ease: 'power3.out',
    });
  };

  const handleMouseLeaveInner = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  // ── Sizing & style per variant ─────────────────────────────────────────
  const isFlanking = !isCenter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.35 + index * 0.14,
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex-1 ${isCenter ? 'md:flex-[1.22]' : 'md:flex-[0.9]'}`}
      style={{ perspective: '900px' }}
    >
      <Link to={to} className="block h-full cursor-none">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => { handleMouseLeave(); handleMouseLeaveInner(); }}
          onMouseEnter={handleMouseEnter}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-full"
        >
          {/* ── Outer glow border (always visible, stronger on center) ── */}
          <div
            className="absolute -inset-px rounded-xl pointer-events-none z-0"
            style={{
              background: isCenter
                ? `linear-gradient(135deg, ${accentColor}35 0%, transparent 60%, ${accentColor}20 100%)`
                : `linear-gradient(135deg, ${accentColor}18 0%, transparent 70%)`,
              borderRadius: '12px',
            }}
            aria-hidden="true"
          />

          {/* ── Card body wrapper ── */}
          <div
            className="relative overflow-hidden rounded-xl h-full group z-10"
            style={{
              border: `1px solid ${accentColor}${isCenter ? '35' : '20'}`,
              minHeight: isCenter ? '360px' : '320px',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              boxShadow: isCenter
                ? `0 0 60px ${accentColor}12, 0 32px 64px rgba(0,0,0,0.4)`
                : '0 16px 40px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}55`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 50px ${accentColor}20, 0 32px 64px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}${isCenter ? '35' : '20'}`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = isCenter
                ? `0 0 60px ${accentColor}12, 0 32px 64px rgba(0,0,0,0.4)`
                : '0 16px 40px rgba(0,0,0,0.3)';
            }}
          >
            {/* ── TracerBorder membungkus konten ── */}
            <TracerBorder accentColor={accentColor}>
              <div
                className="relative h-full w-full"
                style={{
                  background: isCenter
                    ? `linear-gradient(160deg, rgba(20,34,58,0.92) 0%, rgba(13,27,46,0.96) 100%)`
                    : `rgba(10, 20, 36, 0.72)`,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Cursor glow blob */}
                <div
                  ref={glowRef}
                  className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0"
                  style={{
                    background: `radial-gradient(circle, ${accentColor}50 0%, transparent 65%)`,
                    filter: 'blur(28px)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />

                {/* Top edge glow line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px z-10"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}${isCenter ? '70' : '40'}, transparent)`,
                  }}
                  aria-hidden="true"
                />

                {/* Corner bracket — top left */}
                <div
                  className="absolute top-4 left-4 w-5 h-5 border-t border-l z-10"
                  style={{ borderColor: `${accentColor}${isCenter ? '60' : '35'}` }}
                  aria-hidden="true"
                />
                {/* Corner bracket — bottom right */}
                <div
                  className="absolute bottom-4 right-4 w-5 h-5 border-b border-r z-10"
                  style={{ borderColor: `${accentColor}${isCenter ? '60' : '35'}` }}
                  aria-hidden="true"
                />

                {/* ── Flanking card: vertical accent bar ── */}
                {isFlanking && (
                  <div
                    className="absolute top-6 bottom-6 left-0 w-[2px] rounded-full opacity-50 z-10"
                    style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)` }}
                    aria-hidden="true"
                  />
                )}

                {/* ── Content ── */}
                <div ref={innerRef} className="relative z-20 flex flex-col h-full p-7 gap-5">
                  {/* Tag row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[0.58rem] font-bold tracking-[0.32em] uppercase px-2.5 py-1 rounded-sm"
                      style={{
                        color: accentColor,
                        background: `${accentColor}15`,
                        border: `1px solid ${accentColor}28`,
                      }}
                    >
                      {tag}
                    </span>
                    <span
                      className="font-mono text-[0.55rem] tracking-[0.3em]"
                      style={{ color: `${accentColor}50` }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-lg transition-all duration-400 group-hover:scale-105"
                    style={{
                      width: isCenter ? '52px' : '44px',
                      height: isCenter ? '52px' : '44px',
                      background: `${accentColor}10`,
                      border: `1px solid ${accentColor}22`,
                      color: accentColor,
                    }}
                  >
                    {icon}
                  </div>

                  {/* Text block */}
                  <div className="flex flex-col gap-2 flex-1">
                    <p
                      className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase"
                      style={{ color: `${accentColor}80` }}
                    >
                      {subtitle}
                    </p>
                    <h3
                      className="font-heading font-bold text-foreground leading-tight"
                      style={{ fontSize: isCenter ? '1.28rem' : '1.08rem' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-foreground-muted leading-relaxed"
                      style={{ fontSize: isCenter ? '0.82rem' : '0.76rem', marginTop: '2px' }}
                    >
                      {description}
                    </p>
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${accentColor}14` }}>
                    <span
                      className="text-[0.66rem] font-bold tracking-[0.18em] uppercase transition-colors duration-300 group-hover:opacity-100"
                      style={{ color: accentColor, opacity: 0.75 }}
                    >
                      Explore
                    </span>
                    <motion.span
                      className="text-sm"
                      style={{ color: accentColor }}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                      aria-hidden="true"
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>
            </TracerBorder>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GatewayCard;