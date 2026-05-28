import { motion } from 'framer-motion';

interface PillarCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

const PillarCard = ({ index, icon, title, description, accentColor }: PillarCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex flex-col gap-4 p-6 rounded-lg group cursor-default"
    style={{
      background: 'rgba(13, 27, 46, 0.5)',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'border-color 0.3s, transform 0.3s',
    }}
    whileHover={{
      y: -4,
      transition: { duration: 0.3 },
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = `${accentColor}35`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
    }}
  >
    {/* Left accent line */}
    <div
      className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-60"
      style={{ background: accentColor }}
    />

    {/* Number */}
    <span
      className="font-heading text-[0.6rem] font-bold tracking-[0.3em] opacity-50"
      style={{ color: accentColor }}
    >
      0{index + 1}
    </span>

    {/* Icon */}
    <div
      className="w-10 h-10 rounded-md flex items-center justify-center"
      style={{
        background: `${accentColor}12`,
        border: `1px solid ${accentColor}25`,
        color: accentColor,
      }}
    >
      {icon}
    </div>

    <div className="flex flex-col gap-1">
      <h4 className="font-heading text-sm font-bold text-foreground tracking-wide">
        {title}
      </h4>
      <p className="text-xs text-foreground-muted leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

export default PillarCard;