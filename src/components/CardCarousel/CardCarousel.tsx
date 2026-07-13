import * as React from 'react';
import { CardCarouselProps } from '../../types/components';
import { Card } from '../Card/Card';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Icon } from '../Icon';

/** Fixed desktop card width — matches the standalone `Card` desktop width. */
const DESKTOP_CARD_WIDTH = 320;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronLeftIcon() {
  return <Icon name="chevron-left" style={{ display: 'block', flexShrink: 0 }} />;
}

function ChevronRightIcon() {
  return <Icon name="chevron-right" style={{ display: 'block', flexShrink: 0 }} />;
}

// ---------------------------------------------------------------------------
// Arrow control
// ---------------------------------------------------------------------------

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
}) {
  const { flashing, handlePointerDown } = useFlash(disabled);

  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous cards' : 'Next cards'}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      className={cx(
        'flex items-center justify-center h-[44px] w-[44px] rounded-full shrink-0',
        'border border-[var(--color-border-default)] text-[var(--color-neutral-black)]',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
        '[@media(hover:hover)]:transition-colors',
        'disabled:opacity-40 disabled:pointer-events-none',
        '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]'
      )}
      style={{
        backgroundColor: flashing ? 'var(--color-neutral-200)' : 'var(--color-neutral-white)',
      }}
    >
      {direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Mobile pill button (Previous / Next)
// ---------------------------------------------------------------------------

function PillButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const { flashing, handlePointerDown } = useFlash(disabled);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      className={cx(
        'flex items-center justify-center h-[44px] min-w-[120px] px-[24px] rounded-full shrink-0',
        'text-[16px] font-semibold text-[var(--color-neutral-black)]',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
        '[@media(hover:hover)]:transition-colors',
        'disabled:opacity-40 disabled:pointer-events-none',
        '[@media(hover:hover)]:hover:bg-[var(--color-neutral-200)]'
      )}
      style={{
        backgroundColor: flashing ? 'var(--color-neutral-200)' : 'var(--color-neutral-100)',
      }}
    >
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// CardCarousel
// ---------------------------------------------------------------------------

/**
 * Horizontally-scrollable list of {@link Card}s with responsive desktop and mobile layouts.
 *
 * **Desktop** (viewport ≥ `mobileBreakpoint`)
 * - Cards are a fixed 320px wide (matching the standalone {@link Card} desktop width).
 * - Previous / next arrow controls advance the track one card at a time. The previous
 *   arrow is disabled at the start and the next arrow is disabled at the end.
 *
 * **Mobile** (viewport < `mobileBreakpoint`)
 * - Shows one full card plus a `mobilePeek` sliver of the next card.
 * - Native horizontal scroll with CSS scroll-snap; the desktop header arrows are hidden.
 * - Pagination dots (progress feedback) and Previous / Next buttons appear below the track.
 */
export function CardCarousel({
  items,
  title,
  visibleDesktop = 3,
  gap = 24,
  mobileBreakpoint = 768,
  mobilePeek = 0.2,
  showArrows = true,
  ariaLabel,
  className,
  style,
}: CardCarouselProps) {
  const isMobile = useIsMobile(mobileBreakpoint);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Per-card slot width.
  // - Desktop => fixed 320px (matches the standalone Card desktop width).
  // - Mobile  => one full card + a `mobilePeek` sliver of the next.
  const cardBasis = isMobile
    ? `calc((100% - ${gap}px) / ${1 + mobilePeek})`
    : `${DESKTOP_CARD_WIDTH}px`;

  const updateScrollState = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 1);
    setCanScrollNext(el.scrollLeft < maxScroll - 1);

    // Active slide index (used by the mobile pagination dots).
    const firstItem = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstItem ? firstItem.getBoundingClientRect().width : el.clientWidth;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  }, [gap, items.length]);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, items.length, isMobile]);

  const scrollByPage = (direction: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    // Advance by a single card (card width + gap) per click.
    const firstItem = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstItem ? firstItem.getBoundingClientRect().width : el.clientWidth;
    const amount = (cardWidth + gap) * (direction === 'next' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const firstItem = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstItem ? firstItem.getBoundingClientRect().width : el.clientWidth;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  };

  const showArrowControls = showArrows && !isMobile && items.length > visibleDesktop;
  const showMobileControls = isMobile && items.length > 1;
  const regionLabel = ariaLabel || title || 'Card carousel';

  if (items.length === 0) return null;

  return (
    <section
      className={cx('flex flex-col gap-[16px] w-full', className)}
      style={style}
      aria-roledescription="carousel"
      aria-label={regionLabel}
    >
      {/* Header: title + arrows */}
      {(title || showArrowControls) && (
        <div className="flex items-center justify-between gap-[16px]">
          {title ? (
            <h2 className="text-[28px] font-semibold leading-[1.3] text-[var(--color-neutral-black)] m-0">
              {title}
            </h2>
          ) : (
            <span />
          )}

          {showArrowControls && (
            <div className="flex items-center gap-[8px] shrink-0">
              <ArrowButton
                direction="prev"
                onClick={() => scrollByPage('prev')}
                disabled={!canScrollPrev}
              />
              <ArrowButton
                direction="next"
                onClick={() => scrollByPage('next')}
                disabled={!canScrollNext}
              />
            </div>
          )}
        </div>
      )}

      {/* Scroll track */}
      <div
        ref={trackRef}
        className={cx(
          'flex overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory',
          // Hide scrollbar across browsers
          '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          // Negative margin + padding allows snap-aligned cards to sit flush with the edge
          '-mx-[2px] px-[2px] py-[2px]'
        )}
        style={{ gap: `${gap}px` }}
        role="group"
        aria-label={`${regionLabel} items`}
      >
        {items.map((item, index) => {
          const { id, ...cardProps } = item;
          return (
            <div
              key={id ?? index}
              className="snap-start shrink-0"
              style={{ flex: `0 0 ${cardBasis}`, maxWidth: cardBasis }}
            >
              <Card {...cardProps} orientation="vertical" style={{ width: '100%' }} />
            </div>
          );
        })}
      </div>

      {/* Mobile controls: pagination dots + Previous / Next buttons */}
      {showMobileControls && (
        <div className="flex flex-col items-center gap-[20px]">
          {/* Pagination dots (progress feedback) */}
          <div
            className="flex items-center gap-[8px]"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {items.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={item.id ?? index}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`Go to card ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                  className={cx(
                    'h-[8px] w-[8px] rounded-full transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
                    selected ? 'bg-[var(--color-neutral-black)]' : 'bg-[var(--color-neutral-300)]'
                  )}
                />
              );
            })}
          </div>

          {/* Previous / Next buttons */}
          <div className="flex items-center gap-[12px]">
            <PillButton
              label="Previous"
              onClick={() => scrollByPage('prev')}
              disabled={!canScrollPrev}
            />
            <span aria-hidden="true" className="text-[16px] text-[var(--color-neutral-black)]">
              /
            </span>
            <PillButton
              label="Next"
              onClick={() => scrollByPage('next')}
              disabled={!canScrollNext}
            />
          </div>
        </div>
      )}
    </section>
  );
}
