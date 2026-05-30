import { motion } from 'framer-motion';

interface PillarCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  isFeatured?: boolean;
}

const PillarCard = ({
  index,
  icon,
  title,
  description,
  accentColor,
  isFeatured = false,
}: PillarCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ delay: index * 0.09, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col gap-5 rounded-xl overflow-hidden"
    style={{
      padding: isFeatured ? '1.75rem' : '1.4rem 1.5rem',
      background: isFeatured
        ? `linear-gradient(145deg, rgba(20,34,58,0.85) 0%, rgba(13,27,46,0.7) 100%)`
        : 'rgba(10, 20, 36, 0.5)',
      border: `1px solid ${isFeatured ? `${accentColor}28` : 'rgba(255,255,255,0.05)'}`,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
    }}
    whileHover={{ y: -5 }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = `${accentColor}40`;
      el.style.boxShadow = `0 0 32px ${accentColor}0d, 0 16px 40px rgba(0,0,0,0.25)`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = isFeatured ? `${accentColor}28` : 'rgba(255,255,255,0.05)';
      el.style.boxShadow = 'none';
    }}
  >
    {/* Left accent bar */}
    <div
      className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full"
      style={{
        background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)`,
        opacity: isFeatured ? 0.7 : 0.4,
        transition: 'opacity 0.35s ease',
      }}
      aria-hidden="true"
    />

    {/* Top-right index */}
    <div className="flex items-start justify-between">
      {/* Icon container */}
      <div
        className="flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105"
        style={{
          width: isFeatured ? '44px' : '38px',
          height: isFeatured ? '44px' : '38px',
          background: `${accentColor}12`,
          border: `1px solid ${accentColor}22`,
          color: accentColor,
        }}
      >
        {icon}
      </div>

      {/* Index number */}
      <span
        className="font-heading font-black"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          color: `${accentColor}45`,
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    {/* Text */}
    <div className="flex flex-col gap-1.5">
      <h4
        className="font-heading font-bold tracking-wide text-foreground"
        style={{ fontSize: isFeatured ? '0.88rem' : '0.8rem' }}
      >
        {title}
      </h4>
      <p
        className="leading-relaxed"
        style={{
          fontSize: '0.72rem',
          color: 'rgba(107,127,163,0.85)',
          lineHeight: 1.65,
        }}
      >
        {description}
      </p>
    </div>

    {/* Featured badge */}
    {isFeatured && (
      <div className="mt-auto pt-3 border-t" style={{ borderColor: `${accentColor}18` }}>
        <span
          className="text-[0.55rem] font-bold tracking-[0.35em] uppercase"
          style={{ color: `${accentColor}70` }}
        >
          Core Focus
        </span>
      </div>
    )}
  </motion.div>
);

export default PillarCard;