import { useCountUp } from '../../hooks/useScrollAnimations';

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  accentColor?: string;
  index?: number;
}

const StatCard = ({
  value,
  suffix,
  label,
  sublabel,
  accentColor = '#fb923c',
  index = 0,
}: StatCardProps) => {
  const countRef = useCountUp(value, suffix, 2.2);

  return (
    <div
      className="group relative flex flex-col gap-3 px-7 py-7 rounded-xl overflow-hidden"
      style={{
        background: 'rgba(13, 27, 46, 0.55)',
        border: '1px solid rgba(255,255,255,0.055)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${accentColor}30`;
        el.style.boxShadow = `0 0 40px ${accentColor}0e, 0 20px 48px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.055)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Index number — background watermark */}
      <span
        className="absolute top-4 right-5 font-heading font-black pointer-events-none select-none"
        style={{
          fontSize: '4.5rem',
          lineHeight: 1,
          color: `${accentColor}07`,
          letterSpacing: '-0.02em',
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Accent top line — full width, gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}80 40%, ${accentColor}80 60%, ${accentColor}00)`,
          boxShadow: `0 0 10px ${accentColor}40`,
        }}
        aria-hidden="true"
      />

      {/* Value */}
      <div className="flex items-end gap-1">
        <span
          ref={countRef}
          className="font-heading font-black leading-none"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4rem)',
            background: `linear-gradient(135deg, ${accentColor} 0%, #f0f4ff 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          0{suffix}
        </span>
      </div>

      {/* Divider */}
      <div
        className="w-8 h-px"
        style={{ background: `${accentColor}40` }}
        aria-hidden="true"
      />

      {/* Label + sublabel */}
      <div className="flex flex-col gap-1">
        <span
          className="font-heading font-bold tracking-[0.18em] uppercase"
          style={{ fontSize: '0.72rem', color: '#f0f4ff' }}
        >
          {label}
        </span>
        <span
          className="tracking-wide leading-snug"
          style={{ fontSize: '0.68rem', color: 'rgba(107,127,163,0.8)' }}
        >
          {sublabel}
        </span>
      </div>
    </div>
  );
};

export default StatCard;