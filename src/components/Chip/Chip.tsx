import * as React from 'react';
import { ChipProps } from '../../types/components';
import { Tooltip } from '../Tooltip/Tooltip';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';

// ---------------------------------------------------------------------------
// Dismiss icon — 22px container, matches Figma "Close-small"
// ---------------------------------------------------------------------------
function DismissIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        d="M6 6L16 16M16 6L6 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Info icon — 22px, matches Figma "Icons / info"
// ---------------------------------------------------------------------------
function InfoIcon({ color = '#191919' }: { color?: string }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="M11 15.5833C11.2598 15.5833 11.4775 15.4954 11.6532 15.3197C11.8289 15.144 11.9167 14.9263 11.9167 14.6666V10.9999C11.9167 10.7402 11.8289 10.5225 11.6532 10.3468C11.4775 10.1711 11.2598 10.0833 11 10.0833C10.7403 10.0833 10.5226 10.1711 10.3469 10.3468C10.1712 10.5225 10.0834 10.7402 10.0834 10.9999V14.6666C10.0834 14.9263 10.1712 15.144 10.3469 15.3197C10.5226 15.4954 10.7403 15.5833 11 15.5833ZM11 8.24992C11.2598 8.24992 11.4775 8.16207 11.6532 7.98638C11.8289 7.81068 11.9167 7.59297 11.9167 7.33325C11.9167 7.07353 11.8289 6.85582 11.6532 6.68013C11.4775 6.50443 11.2598 6.41659 11 6.41659C10.7403 6.41659 10.5226 6.50443 10.3469 6.68013C10.1712 6.85582 10.0834 7.07353 10.0834 7.33325C10.0834 7.59297 10.1712 7.81068 10.3469 7.98638C10.5226 8.16207 10.7403 8.24992 11 8.24992ZM11 20.1666C9.73199 20.1666 8.54032 19.926 7.42504 19.4447C6.30976 18.9635 5.33962 18.3103 4.51462 17.4853C3.68962 16.6603 3.0365 15.6902 2.55525 14.5749C2.074 13.4596 1.83337 12.268 1.83337 10.9999C1.83337 9.73186 2.074 8.5402 2.55525 7.42492C3.0365 6.30964 3.68962 5.3395 4.51462 4.5145C5.33962 3.6895 6.30976 3.03638 7.42504 2.55513C8.54032 2.07388 9.73199 1.83325 11 1.83325C12.2681 1.83325 13.4598 2.07388 14.575 2.55513C15.6903 3.03638 16.6605 3.6895 17.4855 4.5145C18.3105 5.3395 18.9636 6.30964 19.4448 7.42492C19.9261 8.5402 20.1667 9.73186 20.1667 10.9999C20.1667 12.268 19.9261 13.4596 19.4448 14.5749C18.9636 15.6902 18.3105 16.6603 17.4855 17.4853C16.6605 18.3103 15.6903 18.9635 14.575 19.4447C13.4598 19.926 12.2681 20.1666 11 20.1666ZM11 18.3333C13.0473 18.3333 14.7813 17.6228 16.2021 16.202C17.623 14.7812 18.3334 13.0471 18.3334 10.9999C18.3334 8.9527 17.623 7.21867 16.2021 5.79784C14.7813 4.377 13.0473 3.66659 11 3.66659C8.95282 3.66659 7.21879 4.377 5.79796 5.79784C4.37712 7.21867 3.66671 8.9527 3.66671 10.9999C3.66671 13.0471 4.37712 14.7812 5.79796 16.202C7.21879 17.6228 8.95282 18.3333 11 18.3333Z"
        fill={color}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Figma design tokens (from node inspection):
//
// Shape:        rounded-[8px]
// Padding:      px-[10px] py-[8px]   — outer chip shell
// Label inner:  px-[6px] py-[2px]    — wraps the text
// Icon container: pr-[2px]           — right-side icon wrapper
// Font:         Public Sans, 16px, Regular (400), line-height 1.5
//
// Colors — Default:        bg-white      border-neutral-300 (#ddd)  text-black (#191919)
// Colors — Hover:          bg-neutral-100  border-neutral-100         text-black
// Colors — Selected:       bg-primary-light border-primary-light      text-neutral-900 (#333)
// Colors — Selected Hover: bg-[#d5d5fd]  border-[#d5d5fd]           text-neutral-900
// Colors — Disabled:       opacity-30 (applied to whole button/chip)
// ---------------------------------------------------------------------------

const SHELL =
  'inline-flex items-center rounded-[8px] border px-[10px] py-[8px] select-none [@media(hover:hover)]:transition-colors';

// ---------------------------------------------------------------------------
// Chip — Selectable variant
// ---------------------------------------------------------------------------
function SelectableChip({
  label,
  selected: controlledSelected,
  defaultSelected = false,
  onSelectedChange,
  tooltip,
  tooltipTitle,
  disabled,
  className,
  ...props
}: Omit<ChipProps, 'variant' | 'onDismiss'>) {
  const isControlled = controlledSelected !== undefined;
  const [internalSelected, setInternalSelected] = React.useState(defaultSelected);
  const selected = isControlled ? controlledSelected : internalSelected;

  const { flashing, handlePointerDown } = useFlash(disabled);

  const handleClick = () => {
    if (disabled) return;
    const next = !selected;
    if (!isControlled) setInternalSelected(next);
    onSelectedChange?.(next);
  };

  const chipClasses = cx(
    SHELL,
    'cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
    disabled && 'opacity-30 pointer-events-none',
    !disabled &&
      selected &&
      cx(
        'bg-[var(--color-primary-light)] border-[var(--color-primary-light)]',
        '[@media(hover:hover)]:hover:bg-[#d5d5fd] [@media(hover:hover)]:hover:border-[#d5d5fd]',
        flashing && '[@media(hover:none)]:bg-[#d5d5fd] [@media(hover:none)]:border-[#d5d5fd]'
      ),
    !disabled &&
      !selected &&
      cx(
        'bg-[var(--color-neutral-white)] border-[var(--color-border-default)]',
        '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] [@media(hover:hover)]:hover:border-[var(--color-neutral-100)]',
        flashing &&
          '[@media(hover:none)]:bg-[var(--color-neutral-100)] [@media(hover:none)]:border-[var(--color-neutral-100)]'
      ),
    className
  );

  const chipBtn = (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      className={chipClasses}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {/* Label — inner padding per Figma "Typography" wrapper */}
      <span
        className={cx(
          'px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap',
          selected ? 'text-[var(--color-neutral-900)]' : 'text-[var(--color-neutral-black)]'
        )}
      >
        {label}
      </span>
      {/* Info icon — right side, 22px, matches "icon container" pr-[2px] */}
      {tooltip && (
        <Tooltip content={tooltip} title={tooltipTitle} placement="top">
          <span className="flex items-center pr-[2px]">
            <InfoIcon
              color={selected ? 'var(--color-neutral-900)' : 'var(--color-neutral-black)'}
            />
          </span>
        </Tooltip>
      )}
    </button>
  );

  return chipBtn;
}

// ---------------------------------------------------------------------------
// Chip — Dismissible variant
// The entire chip is the dismiss button; × icon is visual-only.
// ---------------------------------------------------------------------------
function DismissibleChip({
  label,
  selected = false,
  onDismiss,
  disabled,
  className,
}: Omit<
  ChipProps,
  'variant' | 'defaultSelected' | 'onSelectedChange' | 'tooltip' | 'tooltipTitle'
>) {
  const { flashing, handlePointerDown } = useFlash(disabled);

  const chipClasses = cx(
    SHELL,
    'cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
    disabled && 'opacity-30 pointer-events-none',
    !disabled &&
      selected &&
      cx(
        'bg-[var(--color-primary-light)] border-[var(--color-primary-light)]',
        '[@media(hover:hover)]:hover:bg-[#d5d5fd] [@media(hover:hover)]:hover:border-[#d5d5fd]',
        flashing && '[@media(hover:none)]:bg-[#d5d5fd] [@media(hover:none)]:border-[#d5d5fd]'
      ),
    !disabled &&
      !selected &&
      cx(
        'bg-[var(--color-neutral-white)] border-[var(--color-border-default)]',
        '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] [@media(hover:hover)]:hover:border-[var(--color-neutral-100)]',
        flashing &&
          '[@media(hover:none)]:bg-[var(--color-neutral-100)] [@media(hover:none)]:border-[var(--color-neutral-100)]'
      ),
    className
  );

  return (
    <button
      type="button"
      aria-label={`Remove ${label}`}
      disabled={disabled}
      className={chipClasses}
      onClick={onDismiss}
      onPointerDown={handlePointerDown}
    >
      {/* Label */}
      <span
        className={cx(
          'px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal whitespace-nowrap',
          selected ? 'text-[var(--color-neutral-900)]' : 'text-[var(--color-neutral-black)]'
        )}
      >
        {label}
      </span>
      {/* × icon — visual only, not interactive */}
      <span className="flex items-center pr-[2px]" aria-hidden="true">
        <DismissIcon />
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Public Chip component
// ---------------------------------------------------------------------------
export function Chip({ variant = 'selectable', ...props }: ChipProps) {
  if (variant === 'dismissible') {
    return <DismissibleChip {...props} />;
  }
  return <SelectableChip {...props} />;
}

Chip.displayName = 'Chip';
