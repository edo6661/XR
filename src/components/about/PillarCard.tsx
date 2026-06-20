import { motion } from 'framer-motion';

interface PillarCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
  isFeatured?: boolean;
  variant?: 'default' | 'hero';
}

const PillarCard = ({
  index,
  icon,
  title,
  description,
  accentColor,
  isFeatured = false,
  variant = 'default',
}: PillarCardProps) => {
  const isHero = variant === 'hero';

  const padding = isHero
    ? '2.25rem 2rem'
    : isFeatured
      ? '1.75rem'
      : '1.4rem 1.5rem';

  const background = isHero
    ? `linear-gradient(155deg, ${accentColor}18 0%, rgba(12,22,42,0.82) 38%, rgba(8,16,32,0.88) 100%)`
    : isFeatured
      ? 'linear-gradient(148deg, rgba(22,38,62,0.88) 0%, rgba(13,27,46,0.75) 100%)'
      : 'rgba(9, 18, 34, 0.52)';

  const borderColor = isHero || isFeatured ? `${accentColor}30` : 'rgba(255,255,255,0.042)';

  const iconSize = isHero ? 56 : isFeatured ? 42 : 36;
  const titleSize = isHero
    ? 'clamp(1.15rem, 2.4vw, 1.45rem)'
    : isFeatured
      ? '0.86rem'
      : '0.78rem';
  const descSize = isHero ? 'clamp(0.98rem, 1.9vw, 1.1rem)' : '0.82rem';
  const indexSize = isHero ? '0.72rem' : '0.56rem';

  return (
    <motion.div
      initial={{ opacity: 0, y: isHero ? 40 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay: index * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden ${isHero ? 'h-full gap-7 min-h-[280px] md:min-h-[320px] rounded-2xl' : 'gap-5 rounded-xl'}`}
      style={{
        padding,
        background,
        border: `1px solid ${borderColor}`,
        boxShadow: isHero ? `0 24px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)` : undefined,
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
      }}
      whileHover={{ y: isHero ? -6 : -4 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${accentColor}${isHero ? '55' : '38'}`;
        el.style.boxShadow = isHero
          ? `0 0 48px ${accentColor}18, 0 28px 56px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 0 36px ${accentColor}0b, 0 18px 40px rgba(0,0,0,0.28)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = borderColor;
        el.style.boxShadow = isHero
          ? '0 24px 48px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'none';
      }}
    >
      {/* Hero: large watermark numeral */}
      {isHero && (
        <span
          className="absolute -right-2 -bottom-4 font-heading font-black leading-none pointer-events-none select-none"
          style={{
            fontSize: 'clamp(5.5rem, 12vw, 8rem)',
            color: `${accentColor}0c`,
            letterSpacing: '-0.04em',
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}

      {/* Hero: bottom accent glow */}
      {isHero && (
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${accentColor}14 0%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Left accent bar */}
      <div
        className={`absolute left-0 rounded-full ${isHero ? 'top-8 bottom-8 w-[2px]' : 'top-6 bottom-6 w-[1.5px]'}`}
        style={{
          background: `linear-gradient(to bottom, transparent, ${accentColor}${isHero || isFeatured ? '85' : '48'}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Top-right corner accent */}
      {(isFeatured || isHero) && (
        <div
          className={`absolute top-0 right-0 pointer-events-none ${isHero ? 'w-32 h-32' : 'w-20 h-20'}`}
          style={{
            background: `radial-gradient(circle at top right, ${accentColor}${isHero ? '22' : '12'} 0%, transparent 68%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Icon + index row */}
      <div className="relative flex items-start justify-between">
        <div
          className={`flex items-center justify-center transition-transform duration-350 group-hover:scale-105 ${isHero ? 'rounded-xl' : 'rounded-lg'}`}
          style={{
            width: iconSize,
            height: iconSize,
            background: `${accentColor}${isHero ? '20' : '10'}`,
            border: `1px solid ${accentColor}${isHero ? '35' : '20'}`,
            color: accentColor,
          }}
        >
          {isHero ? (
            <div className="scale-125">{icon}</div>
          ) : (
            icon
          )}
        </div>
        {!isHero && (
          <span
            className="font-heading font-black"
            style={{
              fontSize: indexSize,
              letterSpacing: '0.38em',
              color: `${accentColor}38`,
            }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        {isHero && (
          <span
            className="font-heading font-black uppercase"
            style={{
              fontSize: indexSize,
              letterSpacing: '0.32em',
              color: accentColor,
            }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Text — fixed title height keeps descriptions aligned across cards */}
      <div className={`relative flex flex-col flex-1 ${isHero ? 'gap-3' : 'gap-1.5'}`}>
        <h4
          className="font-heading font-bold tracking-wide text-foreground"
          style={{
            fontSize: titleSize,
            lineHeight: isHero ? 1.25 : undefined,
            ...(isHero && { minHeight: '2.5em' }),
          }}
        >
          {title}
        </h4>
        <p
          className="leading-relaxed"
          style={{
            fontSize: descSize,
            color: isHero ? 'rgba(200,215,240,0.92)' : 'rgba(180,195,220,0.88)',
            lineHeight: isHero ? 1.75 : 1.68,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default PillarCard;