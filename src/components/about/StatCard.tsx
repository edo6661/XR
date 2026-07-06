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
}: StatCardProps) => {
  const countRef = useCountUp(value, suffix, 2.0);

  return (
    <div
      className="group relative flex flex-col gap-4 rounded-xl overflow-hidden"
      style={{
        padding: '1.75rem',
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(240,244,252,0.78) 100%)',
        border: '1px solid rgba(26,46,80,0.08)',
        boxShadow: '0 10px 34px rgba(30,58,138,0.07), inset 0 1px 0 rgba(255,255,255,0.95)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${accentColor}28`;
        el.style.boxShadow = `0 14px 42px rgba(30,58,138,0.1), 0 0 36px ${accentColor}16, inset 0 1px 0 rgba(255,255,255,0.98)`;
        el.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(26,46,80,0.08)';
        el.style.boxShadow =
          '0 10px 34px rgba(30,58,138,0.07), inset 0 1px 0 rgba(255,255,255,0.95)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor}70 30%, ${accentColor}70 70%, transparent 100%)`,
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Subtle corner accent */}
      <div
        className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at top left, ${accentColor}18 0%, transparent 68%)`,
        }}
        aria-hidden="true"
      />

      {/* Index watermark */}


      {/* Value display */}
      <div>
        <span
          ref={countRef}
          className="font-heading font-black leading-none block"
          style={{
            fontSize: 'clamp(3rem, 6vw, 4.2rem)',
            background: `linear-gradient(140deg, ${accentColor} 0%, var(--theme-on-light-heading) 88%)`,
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
        className="w-10 h-px transition-all duration-500 group-hover:w-16"
        style={{ background: `${accentColor}38` }}
        aria-hidden="true"
      />

      {/* Labels */}
      <div className="flex flex-col gap-1">
        <span
          className="font-heading font-bold tracking-[0.2em] uppercase"
          style={{ fontSize: '1rem', color: 'var(--theme-on-light-heading)' }}
        >
          {label}
        </span>
        <span className="text-copy-sm" style={{ color: 'var(--theme-on-light-muted)' }}>
          {sublabel}
        </span>
      </div>
    </div>
  );
};

export default StatCard;