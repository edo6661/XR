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
        background: 'rgba(10, 20, 38, 0.6)',
        border: '1px solid rgba(255,255,255,0.048)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${accentColor}28`;
        el.style.boxShadow = `0 0 48px ${accentColor}0a, 0 20px 48px rgba(0,0,0,0.32)`;
        el.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.048)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
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
            background: `linear-gradient(140deg, ${accentColor} 0%, #f0f4ff 85%)`,
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
          className="font-heading font-bold tracking-[0.2em] uppercase text-foreground"
          style={{ fontSize: '0.7rem' }}
        >
          {label}
        </span>
        <span className="text-copy-sm">
          {sublabel}
        </span>
      </div>
    </div>
  );
};

export default StatCard;