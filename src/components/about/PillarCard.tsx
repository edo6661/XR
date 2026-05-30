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
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ delay: index * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col gap-5 rounded-xl overflow-hidden"
    style={{
      padding: isFeatured ? '1.75rem' : '1.4rem 1.5rem',
      background: isFeatured
        ? `linear-gradient(148deg, rgba(22,38,62,0.88) 0%, rgba(13,27,46,0.75) 100%)`
        : 'rgba(9, 18, 34, 0.52)',
      border: `1px solid ${isFeatured ? `${accentColor}22` : 'rgba(255,255,255,0.042)'}`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
    }}
    whileHover={{ y: -4 }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = `${accentColor}38`;
      el.style.boxShadow = `0 0 36px ${accentColor}0b, 0 18px 40px rgba(0,0,0,0.28)`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = isFeatured ? `${accentColor}22` : 'rgba(255,255,255,0.042)';
      el.style.boxShadow = 'none';
    }}
  >
    {/* Left accent bar */}
    <div
      className="absolute left-0 top-6 bottom-6 w-[1.5px] rounded-full"
      style={{
        background: `linear-gradient(to bottom, transparent, ${accentColor}${isFeatured ? '75' : '48'}, transparent)`,
      }}
      aria-hidden="true"
    />

    {/* Top-right corner accent for featured */}
    {isFeatured && (
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}12 0%, transparent 68%)`,
        }}
        aria-hidden="true"
      />
    )}

    {/* Icon + index row */}
    <div className="flex items-start justify-between">
      <div
        className="flex items-center justify-center rounded-lg transition-transform duration-350 group-hover:scale-105"
        style={{
          width: isFeatured ? '42px' : '36px',
          height: isFeatured ? '42px' : '36px',
          background: `${accentColor}10`,
          border: `1px solid ${accentColor}20`,
          color: accentColor,
        }}
      >
        {icon}
      </div>
      <span
        className="font-heading font-black"
        style={{
          fontSize: '0.56rem',
          letterSpacing: '0.38em',
          color: `${accentColor}38`,
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
        style={{ fontSize: isFeatured ? '0.86rem' : '0.78rem' }}
      >
        {title}
      </h4>
      <p
        className="leading-relaxed"
        style={{
          fontSize: '0.7rem',
          color: 'rgba(107,127,163,0.82)',
          lineHeight: 1.68,
        }}
      >
        {description}
      </p>
    </div>

    {/* Featured badge */}
    {isFeatured && (
      <div className="mt-auto pt-3.5 border-t" style={{ borderColor: `${accentColor}16` }}>
        <span
          className="text-[0.54rem] font-bold tracking-[0.38em] uppercase"
          style={{ color: `${accentColor}65` }}
        >
          Core Focus
        </span>
      </div>
    )}
  </motion.div>
);

export default PillarCard;