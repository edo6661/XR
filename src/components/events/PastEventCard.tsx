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
  const isEven = index % 2 === 0;

  // Silver-white neomorphism — shadow dual tone pure monochromatic
  const neoShadow = `
    10px 10px 28px rgba(180,190,208,0.58),
    -7px -7px 20px rgba(255,255,255,1),
    inset 0 1px 0 rgba(255,255,255,0.9)
  `;

  const neoShadowHover = `
    14px 14px 36px rgba(165,178,200,0.62),
    -9px -9px 26px rgba(255,255,255,1),
    inset 0 1px 0 rgba(255,255,255,0.95)
  `;

  // Inset tray — terlihat seperti "cekungan" di permukaan silver
  const neoInset = `
    inset 5px 5px 16px rgba(168,180,204,0.52),
    inset -5px -5px 14px rgba(255,255,255,0.98)
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col md:flex-row items-center w-full gap-8 md:gap-0 ${!isEven ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* ── Timeline Node — Desktop ── */}
      <div
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-[70px] h-[70px] rounded-full items-center justify-center flex-col gap-0.5"
        style={{
          background: 'linear-gradient(145deg, #f5f7fa, #e2e8f0)',
          boxShadow: `
            7px 7px 20px rgba(168,180,204,0.56),
            -6px -6px 16px rgba(255,255,255,1),
            inset 0 1px 0 rgba(255,255,255,0.85),
            0 0 0 3px rgba(255,255,255,0.9),
            0 0 0 4.5px ${accentColor}45
          `,
        }}
      >
        <span
          className="font-heading font-black leading-none"
          style={{ fontSize: '0.95rem', color: accentColor }}
        >
          {year}
        </span>
        <div
          className="w-[18px] h-px mt-0.5"
          style={{ background: `${accentColor}55` }}
        />
      </div>

      {/* ── Timeline Node — Mobile ── */}
      <div
        className="md:hidden absolute left-0 top-0 z-20 w-11 h-11 rounded-full flex items-center justify-center mt-3"
        style={{
          background: 'linear-gradient(145deg, #f5f7fa, #e2e8f0)',
          boxShadow: `
            4px 4px 12px rgba(168,180,204,0.52),
            -3px -3px 10px rgba(255,255,255,1),
            0 0 0 2.5px rgba(255,255,255,0.85),
            0 0 0 3.5px ${accentColor}38
          `,
        }}
      >
        <span
          className="font-heading font-bold"
          style={{ fontSize: '0.62rem', color: accentColor }}
        >
          &apos;{year.slice(-2)}
        </span>
      </div>

      {/* ── Image Side — Inset glass tray ── */}
      <div
        className={`w-full md:w-1/2 pl-14 md:pl-0 flex ${isEven ? 'md:pr-12 lg:pr-20' : 'md:pl-12 lg:pl-20'
          }`}
      >
        {/* Inset neomorphic tray */}
        <div
          className="relative w-full rounded-2xl p-[7px]"
          style={{
            background: 'linear-gradient(145deg, #dce3ee, #eef2f8)',
            boxShadow: neoInset,
          }}
        >
          {/* Inner glass frame */}
          <div
            className="relative w-full aspect-video md:aspect-[4/3] rounded-[14px] overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.75)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Frosted vignette bawah */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(175deg, rgba(255,255,255,0.08) 0%, transparent 35%, rgba(15,20,40,0.3) 100%)',
                  }}
                />
                {/* Top shine */}
                <div
                  className="absolute top-0 inset-x-0 h-[1px] pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.85)' }}
                />
              </>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #edf1f7, #f5f8fc)' }}
              >
                <span
                  className="font-heading font-black"
                  style={{ fontSize: '3.5rem', color: 'rgba(100,115,140,0.15)' }}
                >
                  {year}
                </span>
              </div>
            )}

            {/* Glass pill badge — bottom left */}
            <div
              className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-[5px] rounded-full"
              style={{
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.82)',
                boxShadow: '0 2px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
              }}
            >
              <span
                className="font-heading font-bold"
                style={{ fontSize: '0.68rem', color: '#1a2840', letterSpacing: '0.06em' }}
              >
                {year}
              </span>
              <span style={{ fontSize: '0.5rem', color: 'rgba(26,40,64,0.3)' }}>·</span>
              <span
                className="font-semibold"
                style={{ fontSize: '0.63rem', color: accentColor }}
              >
                {attendees} Attendees
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Card — Raised neomorphic glass ── */}
      <div
        className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:pl-12 lg:pl-20' : 'md:pr-12 lg:pr-20'
          }`}
      >
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl p-6 lg:p-8"
          style={{
            background: 'linear-gradient(145deg, rgba(252,253,255,0.94), rgba(236,242,252,0.9))',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: neoShadow,
            border: '1px solid rgba(255,255,255,0.88)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = neoShadowHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = neoShadow;
          }}
        >
          {/* Shine line atas */}
          <div
            className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 8%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, transparent 92%)',
            }}
            aria-hidden="true"
          />

          {/* Accent bar kiri / kanan sesuai arah */}
          <div
            className={`absolute top-8 bottom-8 w-[3px] rounded-full pointer-events-none ${isEven ? 'left-0' : 'right-0 left-auto'}`}
            style={{
              background: `linear-gradient(to bottom, ${accentColor}ee, ${accentColor}30)`,
              boxShadow: isEven
                ? `3px 0 14px ${accentColor}30`
                : `-3px 0 14px ${accentColor}30`,
              borderRadius: isEven ? '0 3px 3px 0' : '3px 0 0 3px',
            }}
            aria-hidden="true"
          />

          <div className={isEven ? 'text-left pl-2' : 'md:text-right pr-2'}>
            {/* Date */}
            <p
              className="font-semibold mb-2"
              style={{
                fontSize: '0.67rem',
                color: accentColor,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {date}
            </p>

            <h3
              className="font-heading font-black mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', color: '#0f1b30' }}
            >
              {title}
            </h3>

            {/* Etched divider */}
            <div
              className="mb-5 h-px w-full"
              style={{
                background: 'transparent',
                boxShadow:
                  '0 -0.5px 0 rgba(255,255,255,0.9), 0 0.5px 0 rgba(148,165,196,0.28)',
              }}
              aria-hidden="true"
            />

            {highlight && (
              <p
                className="leading-relaxed"
                style={{
                  fontSize: 'clamp(0.8rem, 1.4vw, 0.92rem)',
                  color: 'rgba(22,36,62,0.72)',
                  lineHeight: 1.85,
                }}
              >
                {highlight}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PastEventCard;