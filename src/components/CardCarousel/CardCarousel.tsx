import * as React from 'react';
import { CardCarouselProps } from '../../types/components';
import { Card } from '../Card/Card';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { useIsMobile } from '../../hooks/useIsMobile';

/** Fixed desktop card width — matches the standalone `Card` desktop width. */
const DESKTOP_CARD_WIDTH = 320;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
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
// CardCarousel
// ---------------------------------------------------------------------------

/**
 * Horizontally-scrollable list of {@link Card}s with responsive desktop and mobile layouts.
 *
 * **Desktop** (viewport ≥ `mobileBreakpoint`)
 * - Cards are a fixed 320px wide (matching the standalone {@link Card} desktop width).
 * - Previous / next arrow controls page the track `visibleDesktop` cards at a time.
 *
 * **Mobile** (viewport < `mobileBreakpoint`)
 * - Shows one full card plus a `mobilePeek` sliver of the next card.
 * - Native horizontal scroll with CSS scroll-snap; arrows are hidden.
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
  }, []);

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
    // Advance by `visibleDesktop` full cards (card width + gap) per click so the
    // peek of the next card becomes the new leading card.
    const firstItem = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstItem ? firstItem.getBoundingClientRect().width : el.clientWidth;
    const amount = (cardWidth + gap) * visibleDesktop * (direction === 'next' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const showArrowControls = showArrows && !isMobile && items.length > visibleDesktop;
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
    </section>
  );
}
