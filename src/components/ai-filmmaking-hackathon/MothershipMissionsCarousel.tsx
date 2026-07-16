import { useCallback, useSyncExternalStore } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  HACKATHON_ACCENT,
  HACKATHON_MOTHERSHIP_MISSION,
  sdgIconPath,
} from '../../core/content/aiFilmmakingHackathon';
import { bulletList } from './IconCard';

const challenges = HACKATHON_MOTHERSHIP_MISSION.challenges;

const navBtnStyle = {
  width: 40,
  height: 40,
  background: 'rgba(5, 11, 24, 0.82)',
  border: `1px solid ${HACKATHON_ACCENT}40`,
  color: HACKATHON_ACCENT,
  backdropFilter: 'blur(8px)',
} as const;

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

  return (
    <div className="relative">
      <div
        className="mb-5 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Challenge slides"
      >
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

      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous challenge"
          className="absolute left-2 top-1/2 z-10 flex shrink-0 -translate-y-1/2 items-center justify-center rounded-lg sm:left-0 sm:-translate-x-1/2"
          style={navBtnStyle}
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next challenge"
          className="absolute right-2 top-1/2 z-10 flex shrink-0 -translate-y-1/2 items-center justify-center rounded-lg sm:right-0 sm:translate-x-1/2"
          style={navBtnStyle}
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="min-w-0 flex-[0_0_100%] px-0.5"
              >
                <article
                  className="relative overflow-hidden rounded-xl px-5 py-5 sm:px-7 sm:py-6"
                  style={{
                    background: 'rgba(9, 18, 34, 0.58)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="absolute left-0 top-5 bottom-5 w-px rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${HACKATHON_ACCENT}55, transparent)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="min-w-0">
                        <p
                          className="font-semibold tracking-[0.18em] uppercase mb-2"
                          style={{ fontSize: '0.88rem', color: HACKATHON_ACCENT }}
                        >
                          Challenge #{String(challenge.id).padStart(2, '0')}
                        </p>
                        <h3
                          className="inline-block font-heading font-bold text-foreground"
                          style={{
                            fontSize: 'clamp(1.05rem, 2.6vw, 1.3rem)',
                            lineHeight: 1.25,
                            background: `${HACKATHON_ACCENT}18`,
                            border: `1px solid ${HACKATHON_ACCENT}35`,
                            padding: '0.4rem 0.75rem',
                            borderRadius: '0.4rem',
                          }}
                        >
                          {challenge.title}
                        </h3>
                      </div>

                      <div
                        className="flex flex-wrap items-center gap-3 shrink-0"
                        aria-label="Related SDG icons"
                      >
                        {challenge.sdgs.map((sdg) => (
                          <img
                            key={sdg}
                            src={sdgIconPath(sdg)}
                            alt={`SDG ${sdg}`}
                            className="h-20 w-20 sm:h-24 sm:w-24 rounded-md object-cover shadow-sm"
                            style={{ border: '1px solid rgba(255,255,255,0.14)' }}
                            loading="lazy"
                            decoding="async"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {challenge.sections.map((section, sectionIndex) => {
                        const heading = 'heading' in section ? section.heading : undefined;
                        const body = 'body' in section ? section.body : undefined;
                        const bullets = 'bullets' in section ? section.bullets : undefined;

                        return (
                          <div key={`${challenge.id}-section-${sectionIndex}`}>
                            {heading && (
                              <h4
                                className="font-heading font-bold text-foreground mb-1.5"
                                style={{ fontSize: '1rem' }}
                              >
                                {heading}
                              </h4>
                            )}
                            {body && (
                              <p
                                className="mb-2"
                                style={{
                                  fontSize: '1rem',
                                  color: 'rgba(180,195,220,0.9)',
                                  lineHeight: 1.65,
                                }}
                              >
                                {body}
                              </p>
                            )}
                            {bullets && bulletList(bullets)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MothershipMissionsCarousel;
