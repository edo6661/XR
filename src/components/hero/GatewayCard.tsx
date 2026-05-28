import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface GatewayCardProps {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  to: string;
  accentColor: string;
  glowColor: string;
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
  glowColor,
  tag,
  icon,
  isCenter = false,
}: GatewayCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current || !glowRef.current || !contentRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.04,
      y: -8,
      duration: 0.5,
      ease: 'power3.out',
    });
    gsap.to(glowRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(contentRef.current, {
      y: -4,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current || !contentRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 800,
    });
  };

  const handleMouseOut = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.4 + index * 0.18,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex-1 ${isCenter ? 'md:flex-[1.15]' : ''}`}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full cursor-pointer"
      >
        {/* Glow layer */}
        <div
          ref={glowRef}
          className="absolute -inset-[1px] rounded-lg opacity-0 transition-opacity"
          style={{
            background: `linear-gradient(135deg, ${accentColor}30, ${glowColor}20)`,
            boxShadow: `0 0 40px ${accentColor}40, 0 0 80px ${accentColor}15`,
          }}
        />

        {/* Card */}
        <div
          className="relative h-full rounded-lg overflow-hidden"
          style={{
            background: 'rgba(13, 27, 46, 0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${accentColor}35`,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
          />

          {/* Corner decorations */}
          <div
            className="absolute top-3 left-3 w-4 h-4 border-t border-l"
            style={{ borderColor: `${accentColor}80` }}
          />
          <div
            className="absolute top-3 right-3 w-4 h-4 border-t border-r"
            style={{ borderColor: `${accentColor}80` }}
          />
          <div
            className="absolute bottom-3 left-3 w-4 h-4 border-b border-l"
            style={{ borderColor: `${accentColor}80` }}
          />
          <div
            className="absolute bottom-3 right-3 w-4 h-4 border-b border-r"
            style={{ borderColor: `${accentColor}80` }}
          />

          <div ref={contentRef} className="p-8 flex flex-col gap-5 h-full">
            {/* Tag */}
            <div className="flex items-center justify-between">
              <span
                className="text-[0.6rem] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
                style={{
                  color: accentColor,
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                {tag}
              </span>
              <span
                className="text-[0.6rem] font-mono tracking-widest"
                style={{ color: `${accentColor}70` }}
              >
                0{index + 1}
              </span>
            </div>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}25`,
                color: accentColor,
              }}
            >
              {icon}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <p
                className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase"
                style={{ color: `${accentColor}90` }}
              >
                {subtitle}
              </p>
              <h3 className="font-heading text-xl font-bold text-foreground leading-tight">
                {title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed mt-1">
                {description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4">
              <Link
                to={to}
                className="group inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.15em] uppercase transition-all duration-300"
                style={{ color: accentColor }}
              >
                Enter Experience
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GatewayCard;