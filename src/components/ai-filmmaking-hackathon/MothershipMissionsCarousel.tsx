import { useCallback, useSyncExternalStore } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  HACKATHON_ACCENT,
  HACKATHON_MOTHERSHIP_MISSION,
} from '../../core/content/aiFilmmakingHackathon';

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

const MothershipMissionsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
  });
  const selectedIndex = useEmblaSelectedIndex(emblaApi);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

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
    </div>
  );
};

export default MothershipMissionsCarousel;
