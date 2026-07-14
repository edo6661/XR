import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import {
  HACKATHON_ACCENT,
  HACKATHON_MOTHERSHIP_MISSION,
} from '../../core/content/aiFilmmakingHackathon';
import { lenisInstance } from '../../lib/lenisInstance';

const challenges = HACKATHON_MOTHERSHIP_MISSION.challenges;

const useEmblaSelectedIndex = (emblaApi: EmblaCarouselType | undefined) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => { };
      emblaApi.on('select', onStoreChange);
      emblaApi.on('reInit', onStoreChange);
      return () => {
        emblaApi.off('select', onStoreChange);
        emblaApi.off('reInit', onStoreChange);
      };
    },
    [emblaApi],
  );

  const getSnapshot = useCallback(
    () => emblaApi?.selectedScrollSnap() ?? 0,
    [emblaApi],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
};

type ChallengeLightboxProps = {
  open: boolean;
  challenge: (typeof challenges)[number];
  onClose: () => void;
};

const ChallengeLightbox = ({ open, challenge, onClose }: ChallengeLightboxProps) => {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const lenis = lenisInstance.current;
    lenis?.stop();

    const html = document.documentElement;
    const { style: htmlStyle } = html;
    const { style: bodyStyle } = document.body;
    const prevHtmlOverflow = htmlStyle.overflow;
    const prevBodyOverflow = bodyStyle.overflow;

    htmlStyle.overflow = 'hidden';
    bodyStyle.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      htmlStyle.overflow = prevHtmlOverflow;
      bodyStyle.overflow = prevBodyOverflow;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[99999] flex flex-col overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-label={`Challenge ${challenge.id}: ${challenge.title}`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#050b18]/92 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close enlarged challenge"
          />

          <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p
                className="font-semibold tracking-[0.16em] uppercase"
                style={{ fontSize: '0.78rem', color: HACKATHON_ACCENT }}
              >
                Challenge #{String(challenge.id).padStart(2, '0')}
              </p>
              <p className="truncate font-heading font-bold text-foreground" style={{ fontSize: '0.95rem' }}>
                {challenge.title}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex shrink-0 items-center justify-center rounded-lg"
              style={{
                width: 42,
                height: 42,
                background: 'rgba(5, 11, 24, 0.85)',
                border: `1px solid ${HACKATHON_ACCENT}45`,
                color: HACKATHON_ACCENT,
              }}
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 min-h-0 flex-1 overflow-auto overscroll-contain"
            data-lenis-prevent
            onClick={onClose}
          >
            <div className="flex min-h-full w-full items-safe-center justify-safe-center px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
              <img
                src={challenge.image}
                alt={`Challenge ${challenge.id}: ${challenge.title}`}
                className="block h-auto max-h-[calc(100dvh-5.75rem)] w-auto max-w-full rounded-lg object-contain select-none"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                draggable={false}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const MothershipMissionsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
  });
  const selectedIndex = useEmblaSelectedIndex(emblaApi);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const active = challenges[selectedIndex];

  return (
    <div className="relative">
      <div className="mb-5 min-w-0">
        <p
          className="font-semibold tracking-[0.18em] uppercase mb-1.5"
          style={{ fontSize: '0.88rem', color: HACKATHON_ACCENT }}
        >
          Challenge #{String(active.id).padStart(2, '0')}
        </p>
        <h3
          className="font-heading font-bold text-foreground"
          style={{ fontSize: 'clamp(1.05rem, 2.6vw, 1.35rem)', lineHeight: 1.25 }}
        >
          {active.title}
        </h3>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="min-w-0 flex-[0_0_100%] px-0.5"
              >
                <div
                  className="overflow-hidden rounded-xl"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(9, 18, 34, 0.55)',
                  }}
                >
                  <img
                    src={challenge.image}
                    alt={`Challenge ${challenge.id}: ${challenge.title}`}
                    className="block w-full h-auto select-none"
                    draggable={false}
                    loading={challenge.id === 1 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="View challenge larger"
          className="absolute right-2 top-2 z-10 flex items-center justify-center rounded-lg sm:right-3 sm:top-3"
          style={{
            width: 40,
            height: 40,
            background: 'rgba(5, 11, 24, 0.82)',
            border: `1px solid ${HACKATHON_ACCENT}45`,
            color: HACKATHON_ACCENT,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Expand size={18} strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous challenge"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center rounded-lg sm:left-3"
          style={{
            width: 40,
            height: 40,
            background: 'rgba(5, 11, 24, 0.78)',
            border: `1px solid ${HACKATHON_ACCENT}40`,
            color: HACKATHON_ACCENT,
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next challenge"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center rounded-lg sm:right-3"
          style={{
            width: 40,
            height: 40,
            background: 'rgba(5, 11, 24, 0.78)',
            border: `1px solid ${HACKATHON_ACCENT}40`,
            color: HACKATHON_ACCENT,
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Challenge slides">
          {challenges.map((challenge, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={challenge.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to challenge ${challenge.id}`}
                onClick={() => scrollTo(index)}
                className="rounded-full transition-all"
                style={{
                  width: isActive ? 22 : 8,
                  height: 8,
                  background: isActive ? HACKATHON_ACCENT : 'rgba(255,255,255,0.22)',
                }}
              />
            );
          })}
        </div>
      </div>

      <ChallengeLightbox
        open={lightboxOpen}
        challenge={active}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default MothershipMissionsCarousel;
