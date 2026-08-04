import * as React from 'react';
import { ListItemProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckIcon() {
  return <Icon name="check" style={{ display: 'block', flexShrink: 0 }} />;
}

function CheckboxBlankIcon() {
  return <Icon name="checkbox-blank" style={{ display: 'block', flexShrink: 0 }} />;
}

function CheckboxCheckedIcon() {
  return <Icon name="checkbox-checked" style={{ display: 'block', flexShrink: 0 }} />;
}

function RadioBlankIcon() {
  return <Icon name="radio-blank" style={{ display: 'block', flexShrink: 0 }} />;
}

function RadioCheckedIcon() {
  return <Icon name="radio-checked" style={{ display: 'block', flexShrink: 0 }} />;
}

// ---------------------------------------------------------------------------
// ListItem
// ---------------------------------------------------------------------------

export function ListItem({
  label,
  primaryLabel,
  secondaryLabel,
  type = 'standard',
  selected: controlledSelected,
  defaultSelected = false,
  onSelectedChange,
  onClick,
  disabled = false,
  className,
  slots = {},
}: ListItemProps) {
  const isControlled = controlledSelected !== undefined;
  const [internalSelected, setInternalSelected] = React.useState(defaultSelected);
  const selected = isControlled ? controlledSelected : internalSelected;

  const { flashing, handlePointerDown } = useFlash(disabled);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    if (type === 'multi-standard' || type === 'checkbox') {
      const next = !selected;
      if (!isControlled) setInternalSelected(next);
      onSelectedChange?.(next);
    } else if (type === 'radio') {
      if (!selected) {
        if (!isControlled) setInternalSelected(true);
        onSelectedChange?.(true);
      }
    }
  };

  const hasLeftIcon = type === 'checkbox' || type === 'radio';
  const hasRightIcon = type === 'multi-standard';

  // Figma: Standard/Radio/Checkbox have different horizontal padding
  const paddingClass = hasLeftIcon
    ? 'px-[4px] py-[8px]'
    : hasRightIcon
      ? 'pl-[16px] pr-[4px] py-[8px]'
      : 'px-[16px] py-[8px]';

  return (
    <button
      type="button"
      aria-pressed={type !== 'standard' ? selected : undefined}
      disabled={disabled}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      className={cx(
        '[font-family:var(--font-primary)] w-full flex items-center overflow-hidden rounded-[8px] text-left',
        paddingClass,
        // Base text color cascades to currentColor for SVG icons
        disabled ? 'text-[var(--color-neutral-300)]' : 'text-[var(--color-neutral-black)]',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
        'transition-colors duration-150',
        disabled
          ? 'pointer-events-none'
          : cx(
              '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
              '[@media(hover:hover)]:active:bg-[var(--color-neutral-200)]',
              flashing && '[@media(hover:none)]:bg-[var(--color-neutral-100)]'
            ),
        className
      )}
    >
      {/* Left icon — checkbox or radio */}
      {hasLeftIcon && (
        <span
          className={cx(
            'flex items-center justify-center p-[8px] shrink-0 rounded-full',
            slots.icon
          )}
        >
          {type === 'checkbox' ? (
            selected ? (
              <CheckboxCheckedIcon />
            ) : (
              <CheckboxBlankIcon />
            )
          ) : selected ? (
            <RadioCheckedIcon />
          ) : (
            <RadioBlankIcon />
          )}
        </span>
      )}

      {/* Text content */}
      <span className="flex flex-col flex-1 min-w-0">
        {primaryLabel && (
          <span
            className={cx(
              'block text-[14px] leading-[1.6] font-normal',
              !disabled && 'text-[var(--color-neutral-700)]',
              slots.primaryLabel
            )}
          >
            {primaryLabel}
          </span>
        )}
        <span className={cx('block text-[16px] leading-[1.5] font-normal', slots.label)}>
          {label}
        </span>
        {secondaryLabel && (
          <span
            className={cx(
              'block text-[14px] leading-[1.6] font-normal',
              !disabled && 'text-[var(--color-neutral-700)]',
              slots.secondaryLabel
            )}
          >
            {secondaryLabel}
          </span>
        )}
      </span>

      {/* Right icon — multi-standard checkmark (always reserve space to prevent layout shift) */}
      {hasRightIcon && (
        <span
          className={cx(
            'flex items-center justify-center p-[8px] shrink-0 rounded-full',
            slots.icon
          )}
        >
          <span className={selected ? 'visible' : 'invisible'}>
            <CheckIcon />
          </span>
        </span>
      )}
    </button>
  );
}
