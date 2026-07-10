import { motion } from 'framer-motion';
import { FALLBACK_AWARD_RECOGNITION } from '../../../core/content/aboutPage';
import { useSanityQuery } from '../../../hooks/useSanityQuery';
import { fetchAwardRecognition } from '../../../lib/sanity/queries';
import AboutHighlightPhotos from './AboutHighlightPhotos';

const GOLD = '#d4af37';
const BURGUNDY = '#6b0f1a';

const AwardsRecognitionBlock = () => {
  const { data: award } = useSanityQuery(
    fetchAwardRecognition,
    FALLBACK_AWARD_RECOGNITION,
  );

  const awardTags = [award.category, award.subcategory, award.date] as const;

  return (
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
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-20"
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

      <div className="relative z-10 flex flex-col">
        <div className="p-5 md:p-7 pb-0">
          <AboutHighlightPhotos className="max-w-none w-full" />
        </div>

        {/* Copy + tags */}
        <div className="flex flex-col gap-5 p-6 md:p-8 lg:px-9 lg:pt-6 lg:pb-7">
          <div className="flex flex-wrap gap-2">
            {awardTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                className="inline-flex items-center px-2.5 py-1 rounded-full font-mono uppercase tracking-[0.12em]"
                style={{
                  fontSize: '0.92rem',
                  color: i === 0 ? GOLD : 'rgba(200,195,220,0.85)',
                  background: i === 0 ? `${GOLD}14` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 0 ? `${GOLD}35` : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <p
            className="leading-relaxed max-w-3xl"
            style={{
              fontSize: 'clamp(0.82rem, 1.8vw, 0.92rem)',
              lineHeight: 1.8,
              color: 'rgba(175,185,210,0.9)',
            }}
          >
            <strong className="text-foreground font-semibold" style={{ fontSize: '0.95em' }}>
              {award.companyName}
            </strong>{' '}
            {award.body}
          </p>

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
              className="font-mono uppercase tracking-[0.14em]"
              style={{ fontSize: '1rem', color: 'rgba(175,185,210,0.88)' }}
            >
              {award.event}
            </p>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-4 left-4 w-5 h-5 border-t border-l pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity z-20"
        style={{ borderColor: `${GOLD}55` }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-4 right-4 w-5 h-5 border-b border-r pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity z-20"
        style={{ borderColor: `${GOLD}55` }}
        aria-hidden="true"
      />
    </motion.div>
  </div>
  );
};

export default AwardsRecognitionBlock;
