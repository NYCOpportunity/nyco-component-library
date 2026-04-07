import * as React from 'react';
import { ListItemProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckIcon() {
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
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function CheckboxBlankIcon() {
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
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function CheckboxCheckedIcon() {
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
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function RadioBlankIcon() {
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
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  );
}

function RadioCheckedIcon() {
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
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  );
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
        'w-full flex items-center overflow-hidden rounded-[4px] text-left',
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
