import { motion } from 'framer-motion';
import { TRACK_RECORD, ABOUT_ACCENT } from '../../../core/content/aboutPage';

const TrackRecordTimeline = () => (
  <div className="relative">
    {/* Vertical line — desktop & mobile */}
    <div
      className="absolute left-[1.15rem] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px"
      style={{
        background: `linear-gradient(to bottom, transparent, ${ABOUT_ACCENT}44 15%, ${ABOUT_ACCENT}44 85%, transparent)`,
      }}
      aria-hidden="true"
    />

    <ol className="flex flex-col gap-0">
      {TRACK_RECORD.map((item, index) => {
        const isLeft = index % 2 === 0;

        return (
          <motion.li
            key={item.year}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-6 md:py-8"
          >
            <div
              className="absolute left-[1.15rem] md:left-1/2 md:-translate-x-1/2 z-10 w-3 h-3 rounded-full top-2"
              style={{
                background: ABOUT_ACCENT,
                boxShadow: `0 0 12px ${ABOUT_ACCENT}88`,
              }}
              aria-hidden="true"
            />

            <article
              className={`pl-10 md:pl-0 md:w-[calc(50%-2rem)] md:max-w-md ${isLeft
                  ? 'md:mr-auto md:pr-10 md:text-right'
                  : 'md:ml-auto md:pl-10 md:ml-[calc(50%+2rem)]'
                }`}
            >
              <span
                className="inline-block font-heading font-black mb-2"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: ABOUT_ACCENT,
                  letterSpacing: '-0.02em',
                }}
              >
                {item.year}
              </span>
              <h3
                className="font-heading font-bold text-foreground mb-2"
                style={{ fontSize: '0.95rem' }}
              >
                {item.title}
              </h3>
              <p
                className="text-foreground-muted leading-relaxed"
                style={{ fontSize: '0.8rem', lineHeight: 1.75 }}
              >
                {item.detail}
              </p>
            </article>
          </motion.li>
        );
      })}
    </ol>
  </div>
);

export default TrackRecordTimeline;
