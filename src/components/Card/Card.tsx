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
}: {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}) {
  const isInteractive = !!(href || onClick);
  const { flashing, handlePointerDown } = useFlash(!isInteractive);
  const [isHovered, setIsHovered] = React.useState(false);

  const bgColor = flashing ? CHIP_PRESS_BG : isHovered ? CHIP_HOVER_BG : CHIP_BG;

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
 *
 * **Bordered**
 * - When `bordered` is set, the card gains a 1px neutral border and reveals a soft shadow
 *   on hover (instead of the title underline).
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
  bordered = false,
  href,
  onClick,
  className,
  style,
}: CardProps) {
  const isHorizontal = orientation === 'horizontal';
  const isCarousel = type === 'carousel';
  const isMobile = useIsMobile();

  const rootClasses = cx(
    '[font-family:var(--font-primary)] group flex relative cursor-pointer rounded-[8px]',
    isHorizontal ? 'flex-row items-stretch' : 'flex-col items-start',
    bordered &&
      'overflow-clip border border-[var(--color-neutral-300)] transition-shadow duration-200 [@media(hover:hover)]:hover:shadow-[2px_2px_20px_0px_rgba(25,25,25,0.08)]',
    className
  );

  // The card width follows these rules:
  // - Desktop, vertical       => fixed 320px.
  // - Desktop, horizontal     => width inherited from the container (image + content).
  // - `story`    + mobile     => full width.
  // - `carousel` + mobile     => 1 full card + 1/5 of the next (calc(100vw / 1.2)).
  const responsiveWidth: React.CSSProperties = isMobile
    ? isCarousel
      ? { width: 'calc(100vw / 1.2)' }
      : { width: '100%' }
    : isHorizontal
      ? {}
      : { width: 320 };

  const rootStyle: React.CSSProperties = {
    backgroundColor: bordered ? 'var(--color-neutral-white)' : 'transparent',
    ...responsiveWidth,
  };

  const imageSection = (
    <div
      className={cx(
        'relative overflow-clip shrink-0',
        isHorizontal ? 'self-stretch min-h-[240px] w-[337px]' : 'h-[340px] w-full'
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/*
        Vertical only — data chip overlay.
        - Mobile & tablet (< lg / 1024px): persistently visible.
        - Desktop (>= lg): hidden below the image, slides up on hover.
      */}
      {dataDate && !isHorizontal && (
        <div
          className={cx(
            'absolute left-1/2 -translate-x-1/2 flex gap-[8px] items-start transition-all duration-200 ease-in-out',
            'bottom-[16px] opacity-100 pointer-events-auto',
            'lg:bottom-[-34px] lg:opacity-0 lg:pointer-events-none',
            'lg:group-hover:bottom-[16px] lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto'
          )}
        >
          <DataChip label={dataDate} href={chipHref} onClick={onChipClick} />
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
          : bordered
            ? 'w-full shrink-0 gap-[16px] p-4 h-[190px]'
            : 'w-full shrink-0 gap-[16px] py-4 h-[190px]'
      )}
    >
      {/* Horizontal: chip lives in content area, always visible */}
      {dataDate && isHorizontal && (
        <DataChip label={dataDate} href={chipHref} onClick={onChipClick} />
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
            'text-left text-[22px] font-semibold leading-[1.4] text-[var(--color-neutral-black)] m-0 line-clamp-2 w-full',
            !bordered &&
              'group-hover:underline group-hover:decoration-[2px] group-hover:underline-offset-[2px]'
          )}
        >
          {title}
        </h3>

        {description && (
          <p className="text-left text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-700)] line-clamp-2 w-full m-0">
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
