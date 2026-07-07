import * as React from 'react';
import { ChipProps } from '../../types/components';
import { Tooltip } from '../Tooltip/Tooltip';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Dismiss icon — 22px container, matches Figma "Close-small"
// ---------------------------------------------------------------------------
function DismissIcon() {
  return <Icon name="dismiss" size={22} style={{ display: 'block', flexShrink: 0 }} />;
}

// ---------------------------------------------------------------------------
// Info icon — 22px, matches Figma "Icons / info"
// ---------------------------------------------------------------------------
function InfoIcon({ color = '#191919' }: { color?: string }) {
  return <Icon name="info" size={22} style={{ display: 'block', flexShrink: 0, color }} />;
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
