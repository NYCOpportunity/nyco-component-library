import * as React from 'react';
import { createPortal } from 'react-dom';
import { TooltipProps, TooltipPlacement } from '../../types/components';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Default info icon trigger
// ---------------------------------------------------------------------------
function InfoIcon() {
  return (
    <Icon name="info" size={22} style={{ display: 'block', cursor: 'pointer', color: '#191919' }} />
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
