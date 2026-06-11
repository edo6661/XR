import { motion } from 'framer-motion';

interface PastEventCardProps {
  index: number;
  year: string;
  title: string;
  date: string;
  attendees: string;
  highlight: string;
  imageSrc?: string;
  accentColor?: string;
}

const PastEventCard = ({
  index,
  year,
  title,
  date,
  attendees,
  highlight,
  imageSrc,
  accentColor = '#fb923c',
}: PastEventCardProps) => {
  // Logika zigzag: index genap (gambar kiri, teks kanan), index ganjil (sebaliknya)
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      // Jika index ganjil, row dibalik menggunakan md:flex-row-reverse
      className={`relative flex flex-col md:flex-row items-center w-full gap-8 md:gap-0 ${!isEven ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* ── Node Endpoint Center (Khusus Desktop) ── */}
      <div
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-16 h-16 rounded-full items-center justify-center border-[3px]"
        style={{
          backgroundColor: '#050505', // Match dengan background app
          borderColor: accentColor,
          boxShadow: `0 0 24px ${accentColor}30`,
        }}
      >
        <span
          className="font-heading font-black tracking-wider"
          style={{ fontSize: '1rem', color: accentColor }}
        >
          {year}
        </span>
      </div>

      {/* ── Node Endpoint Kiri (Khusus Mobile) ── */}
      <div
        className="md:hidden absolute left-0 top-0 z-20 w-10 h-10 rounded-full flex items-center justify-center border-2 mt-4"
        style={{
          backgroundColor: '#050505',
          borderColor: accentColor,
          boxShadow: `0 0 12px ${accentColor}30`,
        }}
      >
        <span
          className="font-heading font-bold"
          style={{ fontSize: '0.7rem', color: accentColor }}
        >
          '{year.slice(-2)}
        </span>
      </div>

      {/* ── Sisi Gambar (50% Width) ── */}
      <div
        className={`w-full md:w-1/2 pl-14 md:pl-0 flex ${isEven ? 'md:pr-12 lg:pr-20' : 'md:pl-12 lg:pl-20'
          }`}
      >
        <div
          className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden group shadow-lg"
          style={{ border: '1px solid rgba(255,255,255,0.055)' }}
        >
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,11,24,0.6), transparent)',
                }}
              />
            </>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `${accentColor}0d` }}
            >
              <span
                className="font-heading font-black"
                style={{ fontSize: '2.5rem', color: `${accentColor}40` }}
              >
                {year}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Sisi Konten / Deskripsi (50% Width) ── */}
      <div
        className={`w-full md:w-1/2 pl-14 md:pl-0 flex flex-col justify-center ${isEven
          ? 'md:pl-12 lg:pl-20 md:items-start md:text-left'
          : 'md:pr-12 lg:pr-20 md:items-end md:text-right'
          }`}
      >
        <h3
          className="font-heading font-black text-foreground mb-2 leading-tight"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
        >
          {title}
        </h3>

        <p
          className="font-semibold mb-3"
          style={{ fontSize: '0.78rem', color: accentColor, letterSpacing: '0.04em' }}
        >
          {date} · {attendees} Attendees
        </p>

        {highlight && (
          <p
            className="leading-relaxed mb-6"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
              color: 'rgba(107,127,163,0.85)',
              maxWidth: '90%',
            }}
          >
            {highlight}
          </p>
        )}

      </div>
    </motion.div>
  );
};

export default PastEventCard;