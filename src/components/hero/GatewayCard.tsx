import { useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TracerBorder from '../ui/TracerBorder';

interface GatewayCardProps {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  to: string;
  accentColor: string;
  glowColor?: string;
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
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  // Referensi untuk GSAP quickTo agar tidak membuat instance baru setiap mouse geser
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc>(null);
  const glowXTo = useRef<gsap.QuickToFunc>(null);
  const glowYTo = useRef<gsap.QuickToFunc>(null);

  useEffect(() => {
    if (!cardRef.current || !glowRef.current) return;

    // Membangun animasi di awal (hanya 1 kali eksekusi saat mount)
    xTo.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.55, ease: "power2.out" });
    yTo.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.55, ease: "power2.out" });
    glowXTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.4, ease: "power2.out" });
    glowYTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.4, ease: "power2.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Masukkan angka/koordinat baru ke dalam instance yang sudah dibuat
    if (xTo.current) xTo.current(((x - cx) / cx) * (isCenter ? 4 : 3.5));
    if (yTo.current) yTo.current(((y - cy) / cy) * (isCenter ? -4 : -3.5));
    if (glowXTo.current) glowXTo.current(x - cx);
    if (glowYTo.current) glowYTo.current(y - cy);

    // Opacity cukup pakai gsap.to biasa dan tambahkan overwrite auto
    gsap.to(glowRef.current, {
      opacity: isCenter ? 0.2 : 0.12,
      duration: 0.4,
      overwrite: 'auto'
    });
  }, [isCenter]);

  const handleMouseEnter = useCallback(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, { y: -4, duration: 0.5, ease: 'power3.out' });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 5, opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
    if (borderRef.current) {
      borderRef.current.style.borderColor = `${accentColor}45`;
      borderRef.current.style.boxShadow = `0 0 52px ${accentColor}18, 0 28px 56px rgba(0,0,0,0.45)`;
    }
  }, [accentColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !glowRef.current) return;

    // Reset rotasi posisi 3D ke 0 melalui quickTo
    if (xTo.current) xTo.current(0);
    if (yTo.current) yTo.current(0);

    gsap.to(glowRef.current, { opacity: 0, duration: 0.45, overwrite: 'auto' });

    if (contentRef.current) {
      gsap.to(contentRef.current, { y: 0, duration: 0.65, ease: 'power3.out' });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 0, opacity: 0.5, duration: 0.35 });
    }
    if (borderRef.current) {
      borderRef.current.style.borderColor = `${accentColor}${isCenter ? '30' : '18'}`;
      borderRef.current.style.boxShadow = isCenter
        ? `0 0 48px ${accentColor}0e, 0 24px 48px rgba(0,0,0,0.35)`
        : '0 12px 32px rgba(0,0,0,0.25)';
    }
  }, [accentColor, isCenter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.3 + index * 0.12,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex-1 ${isCenter ? 'md:flex-[1.25]' : 'md:flex-[0.88]'}`}
      style={{ perspective: '1000px' }}
    >
      <Link to={to} className="block h-full cursor-none">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-full will-change-transform"
        >
          {/* ── Outer border layer ── */}
          <div
            ref={borderRef}
            className="relative overflow-hidden rounded-xl h-full group"
            style={{
              border: `1px solid ${accentColor}${isCenter ? '30' : '18'}`,
              minHeight: isCenter ? '370px' : '330px',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              boxShadow: isCenter
                ? `0 0 48px ${accentColor}0e, 0 24px 48px rgba(0,0,0,0.35)`
                : '0 12px 32px rgba(0,0,0,0.25)',
            }}
          >
            {/* TracerBorder wrapping content */}
            <TracerBorder accentColor={accentColor}>
              {/* Card body */}
              <div
                className="relative h-full w-full"
                style={{
                  background: isCenter
                    ? `linear-gradient(155deg, rgba(22,38,62,0.94) 0%, rgba(13,27,46,0.97) 100%)`
                    : 'rgba(10, 20, 36, 0.78)',
                  // backdropFilter telah DIHAPUS agar performa scroll tidak bottleneck 
                }}
              >
                {/* Top edge line */}
                <div
                  className="absolute top-0 inset-x-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent 5%, ${accentColor}${isCenter ? '55' : '35'} 40%, ${accentColor}${isCenter ? '55' : '35'} 60%, transparent 95%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Cursor glow blob */}
                <div
                  ref={glowRef}
                  className="absolute w-80 h-80 rounded-full pointer-events-none opacity-0 z-0 will-change-transform"
                  style={{
                    background: `radial-gradient(circle, ${accentColor}40 0%, transparent 65%)`,
                    left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-hidden="true"
                />

                {/* Corner brackets */}
                <div
                  className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l z-10"
                  style={{ borderColor: `${accentColor}${isCenter ? '50' : '30'}` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r z-10"
                  style={{ borderColor: `${accentColor}${isCenter ? '50' : '30'}` }}
                  aria-hidden="true"
                />

                {/* Side accent bar for flanking cards */}
                {!isCenter && (
                  <div
                    className="absolute left-0 top-8 bottom-8 w-[1.5px] rounded-full z-10"
                    style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}55, transparent)` }}
                    aria-hidden="true"
                  />
                )}

                {/* ── Content ── */}
                <div ref={contentRef} className="relative z-20 flex flex-col h-full p-6 gap-4">

                  {/* Tag + index row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[0.56rem] font-bold tracking-[0.35em] uppercase px-2.5 py-1 rounded-sm"
                      style={{
                        color: accentColor,
                        background: `${accentColor}14`,
                        border: `1px solid ${accentColor}25`,
                        letterSpacing: '0.3em',
                      }}
                    >
                      {tag}
                    </span>
                    <span
                      className="font-mono text-[0.5rem] tracking-[0.3em]"
                      style={{ color: `${accentColor}45` }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: isCenter ? '50px' : '42px',
                      height: isCenter ? '50px' : '42px',
                      background: `${accentColor}0e`,
                      border: `1px solid ${accentColor}20`,
                      color: accentColor,
                    }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    {icon}
                  </motion.div>

                  {/* Text block */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <p
                      className="font-semibold tracking-[0.28em] uppercase"
                      style={{ fontSize: '0.57rem', color: `${accentColor}75` }}
                    >
                      {subtitle}
                    </p>
                    <h3
                      className="font-heading font-bold text-foreground leading-tight"
                      style={{ fontSize: isCenter ? '1.22rem' : '1.04rem' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-foreground-muted leading-relaxed"
                      style={{ fontSize: isCenter ? '0.8rem' : '0.74rem', marginTop: '3px', lineHeight: 1.7 }}
                    >
                      {description}
                    </p>
                  </div>

                  {/* CTA row */}
                  <div
                    className="flex items-center justify-between pt-4 mt-auto border-t"
                    style={{ borderColor: `${accentColor}12` }}
                  >
                    <span
                      className="text-[0.64rem] font-bold tracking-[0.2em] uppercase"
                      style={{ color: accentColor, opacity: 0.7 }}
                    >
                      Explore
                    </span>
                    <span
                      ref={arrowRef}
                      className="text-sm"
                      style={{ color: accentColor, opacity: 0.5 }}
                      aria-hidden="true"
                    >
                      →
                    </span>
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