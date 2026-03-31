import * as React from 'react';
import { createPortal } from 'react-dom';
import { TooltipProps, TooltipPlacement } from '../../types/components';
import { cx } from '../../utils/cx';

// ---------------------------------------------------------------------------
// Default info icon trigger
// ---------------------------------------------------------------------------
function InfoIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', cursor: 'pointer' }}
    >
      <path
        d="M11 15.5833C11.2598 15.5833 11.4775 15.4954 11.6532 15.3197C11.8289 15.144 11.9167 14.9263 11.9167 14.6666V10.9999C11.9167 10.7402 11.8289 10.5225 11.6532 10.3468C11.4775 10.1711 11.2598 10.0833 11 10.0833C10.7403 10.0833 10.5226 10.1711 10.3469 10.3468C10.1712 10.5225 10.0834 10.7402 10.0834 10.9999V14.6666C10.0834 14.9263 10.1712 15.144 10.3469 15.3197C10.5226 15.4954 10.7403 15.5833 11 15.5833ZM11 8.24992C11.2598 8.24992 11.4775 8.16207 11.6532 7.98638C11.8289 7.81068 11.9167 7.59297 11.9167 7.33325C11.9167 7.07353 11.8289 6.85582 11.6532 6.68013C11.4775 6.50443 11.2598 6.41659 11 6.41659C10.7403 6.41659 10.5226 6.50443 10.3469 6.68013C10.1712 6.85582 10.0834 7.07353 10.0834 7.33325C10.0834 7.59297 10.1712 7.81068 10.3469 7.98638C10.5226 8.16207 10.7403 8.24992 11 8.24992ZM11 20.1666C9.73199 20.1666 8.54032 19.926 7.42504 19.4447C6.30976 18.9635 5.33962 18.3103 4.51462 17.4853C3.68962 16.6603 3.0365 15.6902 2.55525 14.5749C2.074 13.4596 1.83337 12.268 1.83337 10.9999C1.83337 9.73186 2.074 8.5402 2.55525 7.42492C3.0365 6.30964 3.68962 5.3395 4.51462 4.5145C5.33962 3.6895 6.30976 3.03638 7.42504 2.55513C8.54032 2.07388 9.73199 1.83325 11 1.83325C12.2681 1.83325 13.4598 2.07388 14.575 2.55513C15.6903 3.03638 16.6605 3.6895 17.4855 4.5145C18.3105 5.3395 18.9636 6.30964 19.4448 7.42492C19.9261 8.5402 20.1667 9.73186 20.1667 10.9999C20.1667 12.268 19.9261 13.4596 19.4448 14.5749C18.9636 15.6902 18.3105 16.6603 17.4855 17.4853C16.6605 18.3103 15.6903 18.9635 14.575 19.4447C13.4598 19.926 12.2681 20.1666 11 20.1666ZM11 18.3333C13.0473 18.3333 14.7813 17.6228 16.2021 16.202C17.623 14.7812 18.3334 13.0471 18.3334 10.9999C18.3334 8.9527 17.623 7.21867 16.2021 5.79784C14.7813 4.377 13.0473 3.66659 11 3.66659C8.95282 3.66659 7.21879 4.377 5.79796 5.79784C4.37712 7.21867 3.66671 8.9527 3.66671 10.9999C3.66671 13.0471 4.37712 14.7812 5.79796 16.202C7.21879 17.6228 8.95282 18.3333 11 18.3333Z"
        fill="#191919"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Caret — SVG triangle pointing toward the trigger
// ---------------------------------------------------------------------------
function Caret({ placement, color }: { placement: TooltipPlacement; color: string }) {
  if (placement === 'top') {
    return (
      <svg
        width="12"
        height="6"
        viewBox="0 0 12 6"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <path d="M6 6 L0 0 L12 0 Z" fill={color} />
      </svg>
    );
  }
  if (placement === 'bottom') {
    return (
      <svg
        width="12"
        height="6"
        viewBox="0 0 12 6"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <path d="M6 0 L0 6 L12 6 Z" fill={color} />
      </svg>
    );
  }
  if (placement === 'right') {
    return (
      <svg
        width="6"
        height="12"
        viewBox="0 0 6 12"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <path d="M0 6 L6 0 L6 12 Z" fill={color} />
      </svg>
    );
  }
  return (
    <svg
      width="6"
      height="12"
      viewBox="0 0 6 12"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d="M6 6 L0 0 L0 12 Z" fill={color} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Placement resolution — picks side with smallest viewport overflow score.
// Projection mirrors the fixed-position math in computeFixedPosition so both
// functions stay in sync.
// ---------------------------------------------------------------------------
type Rect = ReturnType<Element['getBoundingClientRect']>;

function resolveAutoPlacement(
  triggerRect: Rect,
  tooltipRect: Rect,
  preferred: TooltipPlacement
): TooltipPlacement {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const MARGIN = 8; // minimum gap from viewport wall

  const projected = (p: TooltipPlacement) => {
    let top: number, left: number;
    if (p === 'top') {
      top = triggerRect.top - tooltipRect.height;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (p === 'bottom') {
      top = triggerRect.bottom;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (p === 'left') {
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width;
    } else {
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right;
    }
    return { top, left, bottom: top + tooltipRect.height, right: left + tooltipRect.width };
  };

  const score = (p: TooltipPlacement) => {
    const r = projected(p);
    return (
      Math.max(0, MARGIN - r.left) +
      Math.max(0, MARGIN - r.top) +
      Math.max(0, r.right - (vw - MARGIN)) +
      Math.max(0, r.bottom - (vh - MARGIN))
    );
  };

  const fallbacks: Record<TooltipPlacement, TooltipPlacement[]> = {
    top: ['bottom', 'right', 'left'],
    bottom: ['top', 'right', 'left'],
    left: ['right', 'bottom', 'top'],
    right: ['left', 'bottom', 'top'],
  };

  const candidates: TooltipPlacement[] = [preferred, ...fallbacks[preferred]];
  return candidates.reduce((best, c) => (score(c) < score(best) ? c : best));
}

// ---------------------------------------------------------------------------
// Compute fixed pixel coordinates for the portal-rendered tooltip.
// "top/left" refer to the outer flex wrapper's top-left corner, which includes
// both the paper and the caret, so the caret touches the trigger edge.
// ---------------------------------------------------------------------------
function computeFixedPosition(
  triggerRect: Rect,
  tooltipRect: Rect,
  placement: TooltipPlacement
): { top: number; left: number } {
  if (placement === 'top') {
    return {
      top: triggerRect.top - tooltipRect.height,
      left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
    };
  }
  if (placement === 'bottom') {
    return {
      top: triggerRect.bottom,
      left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
    };
  }
  if (placement === 'left') {
    return {
      top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.left - tooltipRect.width,
    };
  }
  return {
    top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
    left: triggerRect.right,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Tooltip = ({
  content,
  title,
  mode = 'dark',
  placement = 'top',
  children,
  className,
}: TooltipProps) => {
  const trigger = children ?? <InfoIcon />;
  const tooltipId = React.useId();
  const [visible, setVisible] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [resolvedPlacement, setResolvedPlacement] = React.useState<TooltipPlacement>(placement);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const show = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    setVisible(false);
    setReady(false);
  }, []);

  // Recompute position from current trigger bounding rect (used on scroll/resize too).
  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const resolved = resolveAutoPlacement(triggerRect, tooltipRect, placement);
    setResolvedPlacement(resolved);
    setPos(computeFixedPosition(triggerRect, tooltipRect, resolved));
  }, [placement]);

  // Two-pass render: tooltip mounts at (0,0) opacity-0 so we can measure it,
  // then we compute fixed position + best placement and flip to opacity-1.
  React.useLayoutEffect(() => {
    if (!visible) return;
    updatePosition();
    setReady(true);
  }, [visible, updatePosition]);

  // Keep tooltip anchored to trigger while user scrolls or resizes.
  React.useEffect(() => {
    if (!visible) return;
    window.addEventListener('scroll', updatePosition, { capture: true, passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', updatePosition, { capture: true });
      window.removeEventListener('resize', updatePosition);
    };
  }, [visible, updatePosition]);

  // Reset resolved placement when placement prop changes while hidden
  React.useEffect(() => {
    if (!visible) setResolvedPlacement(placement);
  }, [placement, visible]);

  const isDark = mode === 'dark';
  const caretColor = isDark ? '#333333' : '#f5f5f5';
  const isRich = title !== undefined;

  const caretBefore = resolvedPlacement === 'bottom' || resolvedPlacement === 'right';
  const isVertical = resolvedPlacement === 'top' || resolvedPlacement === 'bottom';
  const caretEl = <Caret placement={resolvedPlacement} color={caretColor} />;

  const triggerEl = React.cloneElement(trigger, {
    'aria-describedby': visible ? tooltipId : undefined,
  });

  return (
    <div
      ref={triggerRef}
      className={cx('inline-block', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {triggerEl}

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              zIndex: 9999,
              display: 'flex',
              flexDirection: isVertical ? 'column' : 'row',
              alignItems: 'center',
              pointerEvents: 'none',
              filter: 'drop-shadow(0px 1px 6px rgba(25,25,25,0.15))',
              opacity: ready ? 1 : 0,
            }}
          >
            {caretBefore && caretEl}

            <div
              className={cx(
                'rounded-[4px] p-2',
                isDark
                  ? 'bg-[var(--color-neutral-900,#333333)]'
                  : 'bg-[var(--color-neutral-100,#f5f5f5)]'
              )}
              style={{ maxWidth: 200 }}
            >
              {isRich && (
                <span
                  className={cx(
                    'text-[14px] leading-[1.6] font-semibold block whitespace-nowrap',
                    isDark ? 'text-white' : 'text-[var(--color-neutral-black,#191919)]'
                  )}
                >
                  {title}
                </span>
              )}
              <span
                className={cx(
                  'text-[14px] leading-[1.6] font-normal block',
                  isDark ? 'text-white' : 'text-[var(--color-neutral-black,#191919)]'
                )}
              >
                {content}
              </span>
            </div>

            {!caretBefore && caretEl}
          </div>,
          document.body
        )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
