import { motion, useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';
import {
  ECOSYSTEM_IN_ACTION_DESCRIPTION,
  ECOSYSTEM_IN_ACTION_PHOTOS,
} from '../../core/content/ecosystemInAction';

type Photo = (typeof ECOSYSTEM_IN_ACTION_PHOTOS)[number];

const PhotoCard = ({ photo }: { photo: Photo }) => (
  <div
    className="relative flex-shrink-0 overflow-hidden rounded-xl"
    style={{
      width: '220px',
      height: '148px',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(10,10,10,0.5)',
    }}
  >
    <img
      src={photo.src}
      alt={photo.alt}
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'linear-gradient(to top, rgba(5,11,24,0.35) 0%, transparent 45%)',
      }}
      aria-hidden="true"
    />
  </div>
);

const PhotoMarquee = ({
  photos,
  reverse = false,
  duration = 52,
}: {
  photos: Photo[];
  reverse?: boolean;
  duration?: number;
}) => {
  const reduce = useReducedMotion();
  const doubled = [...photos, ...photos];
  const itemWidth = 232;
  const totalWidth = photos.length * itemWidth;

  return (
    <div
      className="relative w-full overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-3"
        style={{
          width: `${totalWidth * 2}px`,
          animation: reduce
            ? 'none'
            : `eco-marquee-${reverse ? 'reverse' : 'forward'} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((photo, i) => (
          <PhotoCard key={`${photo.src}-${i}`} photo={photo} />
        ))}
      </div>

      <style>{`
        @keyframes eco-marquee-forward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        @keyframes eco-marquee-reverse {
          0% { transform: translateX(-${totalWidth}px); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes eco-marquee-forward {
            0%, 100% { transform: none; }
          }
          @keyframes eco-marquee-reverse {
            0%, 100% { transform: none; }
          }
        }
      `}</style>
    </div>
  );
};

const midpoint = Math.ceil(ECOSYSTEM_IN_ACTION_PHOTOS.length / 2);
const ROW_ONE = ECOSYSTEM_IN_ACTION_PHOTOS.slice(0, midpoint);
const ROW_TWO = ECOSYSTEM_IN_ACTION_PHOTOS.slice(midpoint);

const EcosystemInActionSection = () => (
  <section
    className="relative w-full overflow-hidden"
    style={{
      borderTop: '1px solid rgba(255,255,255,0.055)',
      paddingTop: 'var(--section-padding-y)',
      paddingBottom: 'var(--section-padding-y)',
    }}
    aria-labelledby="ecosystem-in-action-heading"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 65%)',
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <SectionEyebrow align="center">Past Event Highlights</SectionEyebrow>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2
          id="ecosystem-in-action-heading"
          className="font-heading font-black text-foreground mb-4"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', letterSpacing: '0.03em' }}
        >
          The{' '}
          <span
            style={{
              background: 'linear-gradient(130deg, #22d3ee 0%, #f0f4ff 85%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ecosystem
          </span>
          , in Action.
        </h2>
        <p
          className="text-foreground-muted max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8 }}
        >
          {ECOSYSTEM_IN_ACTION_DESCRIPTION}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-4"
        aria-label="Past event photo gallery"
      >
        <PhotoMarquee photos={ROW_ONE} duration={54} />
        <PhotoMarquee photos={ROW_TWO} reverse duration={48} />
      </motion.div>
    </div>
  </section>
);

export default EcosystemInActionSection;
