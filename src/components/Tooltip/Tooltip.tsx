import * as React from 'react';
import { TooltipProps, TooltipPlacement } from '../../types/components';
import { cx } from '../../utils/cx';

// ---------------------------------------------------------------------------
// Caret — SVG triangle pointing toward the trigger
// ---------------------------------------------------------------------------
function Caret({ placement, color }: { placement: TooltipPlacement; color: string }) {
  if (placement === 'top') {
    // tooltip above → caret below, pointing down ↓
    return (
      <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="shrink-0 block">
        <path d="M6 6 L0 0 L12 0 Z" fill={color} />
      </svg>
    );
  }
  if (placement === 'bottom') {
    // tooltip below → caret above, pointing up ↑
    return (
      <svg width="12" height="6" viewBox="0 0 12 6" aria-hidden="true" className="shrink-0 block">
        <path d="M6 0 L0 6 L12 6 Z" fill={color} />
      </svg>
    );
  }
  if (placement === 'right') {
    // tooltip right → caret left, pointing left ←
    return (
      <svg width="6" height="12" viewBox="0 0 6 12" aria-hidden="true" className="shrink-0 block">
        <path d="M0 6 L6 0 L6 12 Z" fill={color} />
      </svg>
    );
  }
  // left: tooltip left → caret right, pointing right →
  return (
    <svg width="6" height="12" viewBox="0 0 6 12" aria-hidden="true" className="shrink-0 block">
      <path d="M6 6 L0 0 L0 12 Z" fill={color} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Overflow-aware placement resolution
// ---------------------------------------------------------------------------
function resolveAutoPlacement(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferred: TooltipPlacement
): TooltipPlacement {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const MARGIN = 8;

  const fits: Record<TooltipPlacement, boolean> = {
    top: triggerRect.top >= tooltipRect.height + MARGIN,
    bottom: triggerRect.bottom + tooltipRect.height + MARGIN <= vh,
    left: triggerRect.left >= tooltipRect.width + MARGIN,
    right: triggerRect.right + tooltipRect.width + MARGIN <= vw,
  };

  if (fits[preferred]) return preferred;

  // Fallback order: opposite first, then orthogonal, then bottom as last resort
  const fallbacks: Record<TooltipPlacement, TooltipPlacement[]> = {
    top: ['bottom', 'right', 'left'],
    bottom: ['top', 'right', 'left'],
    left: ['right', 'bottom', 'top'],
    right: ['left', 'bottom', 'top'],
  };

  return fallbacks[preferred].find((p) => fits[p]) ?? 'bottom';
}

// ---------------------------------------------------------------------------
// Absolute positioning classes per resolved placement
// ---------------------------------------------------------------------------
const positionClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 flex-col items-center',
  bottom: 'top-full left-1/2 -translate-x-1/2 flex-col items-center',
  left: 'right-full top-1/2 -translate-y-1/2 flex-row items-center',
  right: 'left-full top-1/2 -translate-y-1/2 flex-row items-center',
};

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
  const tooltipId = React.useId();
  const [visible, setVisible] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [resolvedPlacement, setResolvedPlacement] = React.useState<TooltipPlacement>(placement);

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const show = React.useCallback(() => {
    setReady(false);
    setResolvedPlacement(placement);
    setVisible(true);
  }, [placement]);

  const hide = React.useCallback(() => {
    setVisible(false);
    setReady(false);
  }, []);

  // After the tooltip renders, measure and correct placement to avoid overflow
  React.useLayoutEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setResolvedPlacement(resolveAutoPlacement(triggerRect, tooltipRect, placement));
    setReady(true);
  }, [visible, placement]);

  const isDark = mode === 'dark';
  const caretColor = isDark ? '#333333' : '#f5f5f5';
  const isRich = title !== undefined;

  // Caret renders before content for bottom/right, after for top/left
  const caretBefore = resolvedPlacement === 'bottom' || resolvedPlacement === 'right';
  const caretEl = <Caret placement={resolvedPlacement} color={caretColor} />;

  const trigger = React.cloneElement(children, {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      children.props.onBlur?.(e);
    },
  });

  return (
    <div ref={triggerRef} className={cx('relative inline-block', className)}>
      {trigger}

      {visible && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          style={{ filter: 'drop-shadow(0px 1px 6px rgba(25,25,25,0.15))' }}
          className={cx(
            'absolute z-50 flex pointer-events-none',
            positionClasses[resolvedPlacement],
            ready ? 'opacity-100' : 'opacity-0'
          )}
        >
          {caretBefore && caretEl}

          <div
            className={cx(
              'rounded-[4px]',
              isDark
                ? 'bg-[var(--color-neutral-900,#333333)]'
                : 'bg-[var(--color-neutral-100,#f5f5f5)]',
              isRich ? 'p-2 flex flex-col max-w-[240px]' : 'px-2 py-1 whitespace-nowrap'
            )}
          >
            {isRich && (
              <span
                className={cx(
                  'text-[14px] leading-[1.6] font-semibold block',
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
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
