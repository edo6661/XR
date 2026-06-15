import { motion } from 'framer-motion';
import { AWARDS_RECOGNITION } from '../../../core/content/aboutPage';

const GOLD = '#d4af37';
const BURGUNDY = '#6b0f1a';

const AWARD_TAGS = [
  AWARDS_RECOGNITION.category,
  AWARDS_RECOGNITION.subcategory,
  AWARDS_RECOGNITION.date,
] as const;

const AwardsRecognitionBlock = () => (
  <div className="relative max-w-5xl">
    {/* Ambient glow — burgundy + gold echoing APB ceremony backdrop */}
    <div className="absolute -inset-x-6 -top-10 -bottom-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full opacity-50"
        style={{ background: `radial-gradient(circle, ${BURGUNDY}55 0%, transparent 68%)` }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[360px] h-[360px] rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)` }}
      />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(212,175,55,0.18)',
        background:
          'linear-gradient(148deg, rgba(42,8,14,0.92) 0%, rgba(18,10,16,0.94) 40%, rgba(12,12,18,0.96) 100%)',
        boxShadow:
          '0 28px 72px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(212,175,55,0.12) inset',
      }}
    >
      {/* Gold top sheen */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${GOLD}88 35%, ${GOLD}cc 50%, ${GOLD}88 65%, transparent 95%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle bokeh texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 28%, ${GOLD}18 0%, transparent 8%),
            radial-gradient(circle at 72% 18%, ${GOLD}12 0%, transparent 6%),
            radial-gradient(circle at 88% 62%, ${BURGUNDY}30 0%, transparent 12%),
            radial-gradient(circle at 42% 78%, ${GOLD}10 0%, transparent 7%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-0">
        {/* Ceremony photo */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, transparent 55%, rgba(12,12,18,0.85) 100%), linear-gradient(to top, rgba(12,12,18,0.5) 0%, transparent 35%)',
            }}
            aria-hidden="true"
          />
          <img
            src={AWARDS_RECOGNITION.ceremonyPhoto}
            alt={AWARDS_RECOGNITION.ceremonyPhotoAlt}
            className="w-full h-full min-h-[260px] lg:min-h-[380px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />

          {/* Floating award badge on photo */}
          <div
            className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(8,8,12,0.72)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${GOLD}44`,
              boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 16px ${GOLD}15`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase tracking-[0.14em]"
              style={{ fontSize: '0.58rem', color: GOLD }}
            >
              Award Recipient
            </span>
          </div>
        </div>

        {/* Award details */}
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8 lg:p-9">
          {/* APB+ logo — light plate + crop: skip empty black left of wide banner asset */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #f6f7fa 0%, #eceff5 100%)',
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.18)',
            }}
          >
            <div className="relative h-[4.25rem] md:h-[4.75rem] overflow-hidden px-3 md:px-4">
              <img
                src={AWARDS_RECOGNITION.logo}
                alt="Asia-Pacific Broadcasting+ Awards 2026"
                className="absolute inset-y-0 right-3 md:right-4 h-full w-[115%] max-w-none object-cover object-right"
                loading="lazy"
              />
            </div>
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {AWARD_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                className="inline-flex items-center px-2.5 py-1 rounded-full font-mono uppercase tracking-[0.12em]"
                style={{
                  fontSize: '0.58rem',
                  color: i === 0 ? GOLD : 'rgba(200,195,220,0.85)',
                  background: i === 0 ? `${GOLD}14` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 0 ? `${GOLD}35` : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Client copy — compact, integrated */}
          <p
            className="leading-relaxed"
            style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 0.88rem)',
              lineHeight: 1.75,
              color: 'rgba(175,185,210,0.88)',
            }}
          >
            <strong className="text-foreground font-semibold" style={{ fontSize: '0.9em' }}>
              {AWARDS_RECOGNITION.companyName}
            </strong>{' '}
            {AWARDS_RECOGNITION.body}
          </p>

          {/* Event footer line */}
          <div
            className="flex items-center gap-3 pt-1"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="w-8 h-px shrink-0"
              style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
              aria-hidden="true"
            />
            <p
              className="font-mono uppercase tracking-[0.16em]"
              style={{ fontSize: '0.55rem', color: 'rgba(140,150,175,0.7)' }}
            >
              {AWARDS_RECOGNITION.event}
            </p>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-4 left-4 w-5 h-5 border-t border-l pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: `${GOLD}55` }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-4 right-4 w-5 h-5 border-b border-r pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: `${GOLD}55` }}
        aria-hidden="true"
      />
    </motion.div>
  </div>
);

export default AwardsRecognitionBlock;
