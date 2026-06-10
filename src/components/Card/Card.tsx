import * as React from 'react';
import { CardProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { useIsMobile } from '../../hooks/useIsMobile';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const CHIP_BG = 'var(--color-neutral-100)';
const CHIP_HOVER_BG = 'var(--color-neutral-200)';
const CHIP_PRESS_BG = 'var(--color-neutral-300)';

/** "2023 data" style chip used in the card. Interactive when `href` or `onClick` is provided. */
function DataChip({
  label,
  href,
  onClick,
  cardFlashing = false,
}: {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** When true the parent card is in its press-flash state — chip matches the card bg. */
  cardFlashing?: boolean;
}) {
  const isInteractive = !!(href || onClick);
  const { flashing, handlePointerDown } = useFlash(!isInteractive);
  const [isHovered, setIsHovered] = React.useState(false);

  const bgColor = cardFlashing
    ? 'var(--color-primary-light)'
    : flashing
      ? CHIP_PRESS_BG
      : isHovered
        ? CHIP_HOVER_BG
        : CHIP_BG;

  const sharedClasses = cx(
    'flex items-center justify-center px-[24px] py-[6px] rounded-[8px] shrink-0',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]'
  );
  const textClasses =
    'text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-700)] whitespace-nowrap';

  const interactiveHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onPointerDown: handlePointerDown,
    style: { backgroundColor: bgColor },
  };

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => e.stopPropagation()}
        className={cx(sharedClasses, 'no-underline cursor-pointer')}
        {...interactiveHandlers}
      >
        <span className={textClasses}>{label}</span>
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        className={cx(sharedClasses, 'border-0 cursor-pointer')}
        {...interactiveHandlers}
      >
        <span className={textClasses}>{label}</span>
      </button>
    );
  }

  return (
    <div className={cx(sharedClasses)} style={{ backgroundColor: CHIP_BG }}>
      <span className={textClasses}>{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

/**
 * Content card with image, title, optional description, read time, and data chip.
 *
 * **Hover interaction (vertical)**
 * - The data chip slides up from below the image into the image area.
 * - The title gains a 2px underline on each wrapped line.
 *
 * **Hover interaction (horizontal)**
 * - Only the title underline appears; the chip is statically visible in the content area.
 *
 * **Display types** (desktop width is always 320px; type only affects mobile width)
 * - `story` (default): full width on mobile.
 * - `carousel`: on mobile shows 1 full card + 1/5 of the next card.
 */
export function Card({
  image,
  imageAlt = '',
  title,
  description,
  readTime,
  dataDate,
  chipHref,
  onChipClick,
  orientation = 'vertical',
  type = 'story',
  href,
  onClick,
  className,
  style,
}: CardProps) {
  const isHorizontal = orientation === 'horizontal';
  const isCarousel = type === 'carousel';
  const isMobile = useIsMobile();

  const { flashing: cardFlashing, handlePointerDown: handleCardPointerDown } = useFlash();

  const rootClasses = cx(
    'group flex items-start relative cursor-pointer rounded-[8px]',
    isHorizontal ? 'flex-row' : 'flex-col',
    className
  );

  // The card width follows these rules:
  // - Desktop (either type)   => fixed 320px.
  // - `story`    + mobile     => full width.
  // - `carousel` + mobile     => 1 full card + 1/5 of the next (calc(100vw / 1.2)).
  const responsiveWidth: React.CSSProperties = isMobile
    ? isCarousel
      ? { width: 'calc(100vw / 1.2)' }
      : { width: '100%' }
    : { width: 320 };

  const rootStyle: React.CSSProperties = {
    backgroundColor: cardFlashing ? 'var(--color-primary-light)' : 'var(--color-neutral-white)',
    ...responsiveWidth,
  };

  const imageSection = (
    <div
      className={cx(
        'relative overflow-clip shrink-0',
        isHorizontal ? 'h-[240px] w-[337px]' : 'h-[340px] w-full'
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover rounded-tl-[2px] rounded-tr-[2px] pointer-events-none"
      />

      {/* Vertical only: chip hidden below image in default, slides up on hover */}
      {dataDate && !isHorizontal && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-34px] group-hover:bottom-[16px] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 ease-in-out flex gap-[8px] items-start">
          <DataChip
            label={dataDate}
            href={chipHref}
            onClick={onChipClick}
            cardFlashing={cardFlashing}
          />
        </div>
      )}
    </div>
  );

  const contentSection = (
    <div
      className={cx(
        'flex flex-col items-start',
        isHorizontal
          ? 'flex-1 min-w-0 gap-[16px] px-[16px] pt-[16px] pb-[24px]'
          : 'w-full shrink-0 gap-[16px] p-4 h-[190px]'
      )}
    >
      {/* Horizontal: chip lives in content area, always visible */}
      {dataDate && isHorizontal && (
        <DataChip
          label={dataDate}
          href={chipHref}
          onClick={onChipClick}
          cardFlashing={cardFlashing}
        />
      )}

      {/* Title + Description */}
      <div
        className={cx(
          'flex flex-col items-start w-full shrink-0',
          description ? 'gap-[8px]' : 'gap-0'
        )}
      >
        <h3
          className={cx(
            'text-[22px] font-semibold leading-[1.4] text-[var(--color-neutral-black)] m-0 line-clamp-2 w-full',
            'group-hover:underline group-hover:decoration-[2px] group-hover:underline-offset-[2px]'
          )}
        >
          {title}
        </h3>

        {description && (
          <p className="text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-700)] line-clamp-2 w-full m-0">
            {description}
          </p>
        )}
      </div>

      {/* Read time */}
      {readTime && (
        <span className="text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-700)] whitespace-nowrap">
          {readTime}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onPointerDown={handleCardPointerDown}
        className={cx(rootClasses, 'no-underline text-inherit')}
        style={{ ...rootStyle, ...style }}
      >
        {imageSection}
        {contentSection}
      </a>
    );
  }

  return (
    <div
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      onPointerDown={handleCardPointerDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ ...rootStyle, ...style }}
      className={rootClasses}
    >
      {imageSection}
      {contentSection}
    </div>
  );
}
