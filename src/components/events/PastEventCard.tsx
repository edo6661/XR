import { motion } from 'framer-motion';

interface PastEventCardProps {
  index: number;
  year: string;
  title: string;
  attendees: string;
  speakers: string;
  highlight: string;
  imageSrc?: string;
  accentColor?: string;
}

const PastEventCard = ({
  index,
  year,
  title,
  attendees,
  speakers,
  highlight,
  imageSrc,
  accentColor = '#fb923c',
}: PastEventCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex gap-5 p-5 rounded-xl overflow-hidden"
    style={{
      background: 'rgba(13,27,46,0.5)',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}
    whileHover={{
      borderColor: `${accentColor}35`,
      boxShadow: `0 0 30px ${accentColor}10`,
      transition: { duration: 0.3 },
    }}
  >
    {/* Image thumbnail */}
    <div className="relative w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/30" />
        </>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: `${accentColor}12` }}
        >
          <span
            className="font-heading text-2xl font-black"
            style={{ color: `${accentColor}60` }}
          >
            {year}
          </span>
        </div>
      )}

      {/* Year badge */}
      <div
        className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[0.55rem] font-bold tracking-wider"
        style={{
          background: `${accentColor}CC`,
          color: '#050b18',
        }}
      >
        {year}
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between flex-1 min-w-0">
      <div>
        <h4 className="font-heading text-sm font-bold text-foreground leading-tight mb-1 truncate">
          {title}
        </h4>
        <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
          {highlight}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex flex-col">
          <span
            className="font-heading text-sm font-bold"
            style={{ color: accentColor }}
          >
            {attendees}
          </span>
          <span className="text-[0.58rem] text-foreground-muted tracking-wide">Attendees</span>
        </div>
        <div className="w-px h-6 bg-border" />
        <div className="flex flex-col">
          <span
            className="font-heading text-sm font-bold"
            style={{ color: accentColor }}
          >
            {speakers}
          </span>
          <span className="text-[0.58rem] text-foreground-muted tracking-wide">Speakers</span>
        </div>
      </div>
    </div>

    {/* Right accent line */}
    <div
      className="absolute right-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
      style={{ background: accentColor }}
    />
  </motion.div>
);

export default PastEventCard;