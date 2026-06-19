import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { HACKATHON_ACCENT } from '../../core/content/aiFilmmakingHackathon';

type IconCardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  amount?: string;
  subtitle?: string;
  bullets?: readonly string[];
  index?: number;
  featured?: boolean;
  className?: string;
  accent?: string;
};

export const bulletList = (
  items: readonly string[],
  accent = HACKATHON_ACCENT,
) => (
  <ul className="space-y-1.5" style={{ fontSize: '0.82rem', color: 'rgba(180,195,220,0.9)', lineHeight: 1.6 }}>
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2">
        <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const IconCard = ({
  icon,
  title,
  description,
  amount,
  subtitle,
  bullets,
  index,
  featured = false,
  className = '',
  accent = HACKATHON_ACCENT,
}: IconCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: (index ?? 0) * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative flex flex-col gap-3 rounded-xl overflow-hidden ${className}`}
    style={{
      padding: featured ? '1.5rem 1.65rem' : '1.25rem 1.4rem',
      background: featured
        ? `linear-gradient(148deg, rgba(22,38,62,0.92) 0%, rgba(13,27,46,0.78) 100%)`
        : 'rgba(9, 18, 34, 0.58)',
      border: `1px solid ${featured ? `${accent}28` : 'rgba(255,255,255,0.07)'}`,
      transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
    }}
    whileHover={{ y: -3 }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = `${accent}35`;
      el.style.boxShadow = `0 0 32px ${accent}0c, 0 16px 36px rgba(0,0,0,0.25)`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = featured ? `${accent}28` : 'rgba(255,255,255,0.07)';
      el.style.boxShadow = 'none';
    }}
  >
    <div
      className="absolute left-0 top-5 bottom-5 w-px rounded-full pointer-events-none"
      style={{ background: `linear-gradient(to bottom, transparent, ${accent}${featured ? '70' : '45'}, transparent)` }}
      aria-hidden="true"
    />
    {featured && (
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${accent}14 0%, transparent 68%)` }}
        aria-hidden="true"
      />
    )}

    <div className="flex items-start justify-between gap-3">
      <div
        className="flex items-center justify-center rounded-lg shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{
          width: featured ? 44 : 38,
          height: featured ? 44 : 38,
          background: `${accent}12`,
          border: `1px solid ${accent}22`,
          color: accent,
        }}
      >
        {icon}
      </div>
      {index !== undefined && (
        <span
          className="font-heading font-black"
          style={{ fontSize: '0.56rem', letterSpacing: '0.38em', color: `${accent}40` }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <h4 className="font-heading font-bold text-foreground leading-snug" style={{ fontSize: featured ? '0.92rem' : '0.84rem' }}>
        {title}
      </h4>
      {subtitle && (
        <p className="font-semibold tracking-[0.14em] uppercase" style={{ fontSize: '0.6rem', color: accent }}>
          {subtitle}
        </p>
      )}
      {amount && (
        <p className="font-semibold" style={{ fontSize: '0.78rem', color: accent }}>
          {amount}
        </p>
      )}
      {description && (
        <p style={{ fontSize: '0.84rem', color: 'rgba(180,195,220,0.9)', lineHeight: 1.65 }}>
          {description}
        </p>
      )}
      {bullets && bulletList(bullets, accent)}
    </div>
  </motion.div>
);

export default IconCard;
