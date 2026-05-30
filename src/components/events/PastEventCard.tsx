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
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ delay: index * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex gap-0 rounded-xl overflow-hidden"
    style={{
      background: 'rgba(10, 20, 36, 0.6)',
      border: '1px solid rgba(255,255,255,0.055)',
      transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = `${accentColor}30`;
      el.style.boxShadow = `0 0 36px ${accentColor}0c, 0 16px 40px rgba(0,0,0,0.28)`;
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = 'rgba(255,255,255,0.055)';
      el.style.boxShadow = 'none';
    }}
  >
    {/* ── Left accent bar ── */}
    <div
      className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
      style={{
        background: `linear-gradient(to bottom, transparent, ${accentColor}70, transparent)`,
        opacity: 0.6,
      }}
      aria-hidden="true"
    />

    {/* ── Image panel ── */}
    <div className="relative flex-shrink-0 w-36 overflow-hidden">
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            style={{ minHeight: '100%' }}
            loading="lazy"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(5,11,24,0.15), rgba(5,11,24,0.45))' }}
          />
        </>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: `${accentColor}0d`, minHeight: '140px' }}
        >
          <span
            className="font-heading font-black"
            style={{ fontSize: '2rem', color: `${accentColor}40` }}
          >
            {year}
          </span>
        </div>
      )}

      {/* Year badge — bottom left of image */}
      <div
        className="absolute bottom-3 left-3 px-2 py-0.5 rounded-sm"
        style={{
          background: `${accentColor}DD`,
          backdropFilter: 'blur(4px)',
        }}
      >
        <span
          className="font-heading font-bold tracking-widest"
          style={{ fontSize: '0.52rem', color: '#050b18' }}
        >
          {year}
        </span>
      </div>
    </div>

    {/* ── Content panel ── */}
    <div className="flex flex-col justify-between flex-1 p-5 min-w-0">

      {/* Top: title + highlight */}
      <div className="flex flex-col gap-2 mb-4">
        <h4
          className="font-heading font-bold text-foreground leading-tight"
          style={{ fontSize: '0.85rem' }}
        >
          {title}
        </h4>
        <p
          className="leading-relaxed line-clamp-2"
          style={{ fontSize: '0.72rem', color: 'rgba(107,127,163,0.85)' }}
        >
          {highlight}
        </p>
      </div>

      {/* Bottom: stats */}
      <div
        className="flex items-center gap-5 pt-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.055)' }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="font-heading font-bold"
            style={{ fontSize: '1rem', color: accentColor }}
          >
            {attendees}
          </span>
          <span
            className="tracking-[0.12em] uppercase"
            style={{ fontSize: '0.55rem', color: 'rgba(107,127,163,0.65)' }}
          >
            Attendees
          </span>
        </div>

        <div
          className="w-px h-7 self-center"
          style={{ background: 'rgba(255,255,255,0.07)' }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-0.5">
          <span
            className="font-heading font-bold"
            style={{ fontSize: '1rem', color: accentColor }}
          >
            {speakers}
          </span>
          <span
            className="tracking-[0.12em] uppercase"
            style={{ fontSize: '0.55rem', color: 'rgba(107,127,163,0.65)' }}
          >
            Speakers
          </span>
        </div>

        {/* Index watermark */}
        <span
          className="ml-auto font-heading font-black pointer-events-none select-none"
          style={{
            fontSize: '2.2rem',
            color: `${accentColor}07`,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  </motion.div>
);

export default PastEventCard;