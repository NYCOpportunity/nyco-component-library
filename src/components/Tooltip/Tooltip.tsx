import * as React from 'react';
import { TooltipProps, TooltipPlacement } from '../../types/components';
import { cx } from '../../utils/cx';

// ---------------------------------------------------------------------------
// Default info icon trigger
// ---------------------------------------------------------------------------
function InfoIcon() {
  return (
    <svg
      width="22"
      height="22"
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
  triggerRect: ReturnType<Element['getBoundingClientRect']>,
  tooltipRect: ReturnType<Element['getBoundingClientRect']>,
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
  children = <InfoIcon />,
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
  });

  return (
    <div
      ref={triggerRef}
      className={cx('relative inline-block', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
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
              isRich ? 'p-2 flex flex-col max-w-[160px]' : 'px-2 py-1 whitespace-nowrap'
            )}
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
                'text-[14px] leading-[1.6] font-normal block whitespace-nowrap',
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
