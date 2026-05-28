import { useCountUp } from '../../hooks/useScrollAnimations';

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  accentColor?: string;
  delay?: number;
}

const StatCard = ({
  value,
  suffix,
  label,
  sublabel,
  accentColor = '#fb923c',
}: StatCardProps) => {
  const countRef = useCountUp(value, suffix, 2.4);

  return (
    <div
      className="relative flex flex-col items-center gap-2 px-8 py-8 rounded-lg text-center group"
      style={{
        background: 'rgba(13, 27, 46, 0.6)',
        backdropFilter: 'blur(16px)',
        border: `1px solid rgba(255,255,255,0.06)`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}40`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${accentColor}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full"
        style={{ background: accentColor, boxShadow: `0 0 12px ${accentColor}` }}
      />

      <span
        ref={countRef}
        className="font-heading text-5xl font-black"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, #f0f4ff 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        0{suffix}
      </span>

      <span className="font-heading text-sm font-bold tracking-[0.15em] uppercase text-foreground">
        {label}
      </span>
      <span className="text-xs text-foreground-muted tracking-wide">
        {sublabel}
      </span>
    </div>
  );
};

export default StatCard;