import * as React from 'react';
import { ExpandableSelectProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { ListItem } from '../ListItem/ListItem';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronIcon({ open, disabled }: { open: boolean; disabled?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cx(
        'shrink-0',
        disabled ? 'text-[var(--color-neutral-300)]' : 'text-[var(--color-neutral-black)]'
      )}
    >
      <path
        d={
          open && !disabled
            ? 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' // expand_less
            : 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' // expand_more
        }
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// ExpandableSelect
// ---------------------------------------------------------------------------

export const ExpandableSelect = React.forwardRef<HTMLDivElement, ExpandableSelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      label = 'Select...',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      className,
    },
    ref
  ) => {
    const panelId = React.useId();

    // Open state (controlled or uncontrolled)
    const isOpenControlled = openProp !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = isOpenControlled ? openProp! : internalOpen;

    // Value state (controlled or uncontrolled)
    const isValueControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
    const selectedValues = isValueControlled ? controlledValue! : internalValue;

    const toggleOpen = () => {
      if (disabled) return;
      const next = !isOpen;
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const handleSelect = (optionValue: string) => {
      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      if (!isValueControlled) setInternalValue(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        id={id}
        className={cx(
          'flex flex-col w-full rounded-[8px]',
          // Focus ring wraps the entire component (trigger + list when open)
          '[&:has(:focus-visible)]:ring-[3px] [&:has(:focus-visible)]:ring-[var(--color-border-focus)] [&:has(:focus-visible)]:ring-offset-[2px]',
          disabled && 'pointer-events-none',
          className
        )}
      >
        {/* ── Trigger button ─────────────────────────────────────────────── */}
        <button
          type="button"
          disabled={disabled}
          aria-expanded={isOpen}
          aria-controls={isOpen ? panelId : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          onClick={toggleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && isOpen) toggleOpen();
          }}
          className={cx(
            'flex h-[48px] items-center px-[12px] py-[8px] w-full rounded-[8px] text-left',
            'text-[16px] leading-[1.5] font-normal font-primary',
            'focus-visible:outline-none',
            disabled
              ? 'text-[var(--color-neutral-300)]'
              : cx(
                  'text-[var(--color-neutral-black)]',
                  '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
                  'active:bg-[var(--color-neutral-200,#eee)]'
                )
          )}
        >
          <span className="flex-1 min-w-0">{label}</span>
          <ChevronIcon open={isOpen} disabled={disabled} />
        </button>

        {/* ── Expanded content (inline, pushes layout) ───────────────────── */}
        {isOpen && (
          <>
            {/* Divider — inset 8px from edges */}
            <div className="px-[8px]">
              <hr className="border-0 border-t border-[var(--color-neutral-300,#ddd)]" />
            </div>

            {/* Checkbox option list */}
            <div
              id={panelId}
              role="group"
              aria-label={ariaLabel ?? label}
              className="overflow-hidden rounded-[8px]"
            >
              {options.map((option) => (
                <ListItem
                  key={option.value}
                  label={option.label}
                  type="checkbox"
                  selected={selectedValues.includes(option.value)}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option.value)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

ExpandableSelect.displayName = 'ExpandableSelect';
