import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';
import {
  ECOSYSTEM_IN_ACTION_DESCRIPTION,
  FALLBACK_EVENT_PHOTOS,
  type EventPhoto,
} from '../../core/content/ecosystemInAction';
import { useSanityQuery } from '../../hooks/useSanityQuery';
import { fetchEventPhotos } from '../../lib/sanity/queries';

const PhotoCard = ({ photo }: { photo: EventPhoto }) => (
  <div
    className="relative shrink-0 overflow-hidden rounded-xl"
    style={{
      width: '220px',
      height: '148px',
      border: '1px solid rgba(26,46,80,0.08)',
      background: '#ffffff',
      boxShadow: '0 10px 30px rgba(30,58,138,0.08)',
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
  photos: EventPhoto[];
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

const EcosystemInActionSection = () => {
  const { data: photos } = useSanityQuery(fetchEventPhotos, FALLBACK_EVENT_PHOTOS);

  const midpoint = Math.ceil(photos.length / 2);
  const rowOne = useMemo(() => photos.slice(0, midpoint), [photos, midpoint]);
  const rowTwo = useMemo(() => photos.slice(midpoint), [photos, midpoint]);

  return (
    <section
      className="relative w-full overflow-hidden isolate"
      style={{
        borderTop: '1px solid rgba(26,46,80,0.08)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        backgroundColor: '#dbe5f2',
        background:
          'linear-gradient(180deg, #dbe5f2 0%, #eef3fa 48%, #f6f8fc 100%)',
      }}
      aria-labelledby="ecosystem-in-action-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(57,83,163,0.14) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,46,80,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26,46,80,0.5) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionEyebrow align="center" tone="light">Past Event Highlights</SectionEyebrow>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2
            id="ecosystem-in-action-heading"
            className="font-heading font-black mb-4"
            style={{
              fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
              color: 'var(--theme-on-light-heading)',
              letterSpacing: '0.03em',
            }}
          >
            The{' '}
            <span className="text-accent">
              Ecosystem
            </span>
            , in Action.
          </h2>
          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              color: 'var(--theme-on-light-muted)',
              lineHeight: 1.8,
            }}
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
          {rowOne.length > 0 ? <PhotoMarquee photos={rowOne} duration={54} /> : null}
          {rowTwo.length > 0 ? <PhotoMarquee photos={rowTwo} reverse duration={48} /> : null}
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemInActionSection;
