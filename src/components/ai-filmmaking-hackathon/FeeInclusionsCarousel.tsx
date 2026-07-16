import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { HACKATHON_ACCENT, HACKATHON_PARTICIPATION_FEE } from '../../core/content/aiFilmmakingHackathon';
import IconCard from './IconCard';

type FeeInclusionsCarouselProps = {
  icons: ReactNode[];
};

const FeeInclusionsCarousel = ({ icons }: FeeInclusionsCarouselProps) => {
  const items = HACKATHON_PARTICIPATION_FEE.inclusions;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    // Stop at the last full view (e.g. cards 03+04) — no orphan last-card snap
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncNav = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    syncNav();
    emblaApi.on('select', syncNav);
    emblaApi.on('reInit', syncNav);
    emblaApi.on('resize', syncNav);
    return () => {
      emblaApi.off('select', syncNav);
      emblaApi.off('reInit', syncNav);
      emblaApi.off('resize', syncNav);
    };
  }, [emblaApi, syncNav]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const navBtn = (enabled: boolean) => ({
    width: 40,
    height: 40,
    background: enabled ? 'rgba(5, 11, 24, 0.82)' : 'rgba(5, 11, 24, 0.35)',
    border: `1px solid ${enabled ? `${HACKATHON_ACCENT}40` : 'rgba(255,255,255,0.08)'}`,
    color: enabled ? HACKATHON_ACCENT : 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(8px)',
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.55,
  });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-stretch">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] px-1.5 flex"
            >
              <IconCard
                className="w-full"
                equalHeight
                icon={icons[index]}
                title={item.title}
                description={item.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p
          className="font-heading font-bold tracking-[0.18em] tabular-nums"
          style={{ fontSize: '0.92rem', color: 'rgba(180,195,220,0.55)' }}
          aria-live="polite"
        >
          <span style={{ color: HACKATHON_ACCENT }}>
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>{String(items.length).padStart(2, '0')}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous inclusion"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="inline-flex items-center justify-center rounded-lg transition-all duration-200"
            style={navBtn(canPrev)}
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next inclusion"
            onClick={scrollNext}
            disabled={!canNext}
            className="inline-flex items-center justify-center rounded-lg transition-all duration-200"
            style={navBtn(canNext)}
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeInclusionsCarousel;
