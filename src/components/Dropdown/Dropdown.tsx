import * as React from 'react';
import { DropdownProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { ListItem } from '../ListItem/ListItem';
import { Divider } from '../Divider/Divider';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronIcon({ open, size = 24 }: { open: boolean; size?: number }) {
  return <Icon name={open ? 'chevron-up' : 'chevron-down'} size={size} />;
}

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------

export function Dropdown({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  multiple = false,
  label,
  helperText,
  placeholder = 'Select...',
  variant = 'underlined',
  disabled = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className,
}: DropdownProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();
  const labelId = React.useId();

  // Normalize any value form to string[]
  const normalizeValue = (v: string | string[] | undefined): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  // Value state (controlled or uncontrolled)
  const isValueControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>(() =>
    normalizeValue(defaultValue)
  );
  const selectedValues = isValueControlled ? normalizeValue(controlledValue) : internalValue;

  // Open state (controlled or uncontrolled)
  const isOpenControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isOpenControlled ? openProp! : internalOpen;

  const closePanel = React.useCallback(() => {
    if (!isOpenControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isOpenControlled, onOpenChange]);

  const openPanel = React.useCallback(() => {
    if (!isOpenControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [isOpenControlled, onOpenChange]);

  const togglePanel = () => {
    if (disabled) return;
    if (isOpen) closePanel();
    else openPanel();
  };

  // Click-outside to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Element)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, closePanel]);

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      if (!isValueControlled) setInternalValue(next);
      onChange?.(next);
    } else {
      if (!isValueControlled) setInternalValue([optionValue]);
      onChange?.(optionValue);
      closePanel();
      triggerRef.current?.focus();
    }
  };

  // Derive display label for trigger
  let displayLabel: string | null = null;
  if (selectedValues.length === 1) {
    displayLabel = options.find((o) => o.value === selectedValues[0])?.label ?? selectedValues[0];
  } else if (selectedValues.length > 1 && selectedValues.length <= 3) {
    displayLabel = selectedValues
      .map((v) => options.find((o) => o.value === v)?.label ?? v)
      .join(', ');
  } else if (selectedValues.length > 3) {
    displayLabel = `${selectedValues.length} selected`;
  }

  const triggerText = displayLabel ?? (
    <span className="text-[var(--color-neutral-500)]">{placeholder}</span>
  );

  const panelContent = (
    <div
      id={panelId}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          closePanel();
          triggerRef.current?.focus();
        }
      }}
      className={cx(
        'absolute z-50 left-0 w-full bg-[var(--color-neutral-white)] rounded-[8px] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.15)]',
        'top-full mt-[4px] p-[8px]'
      )}
    >
      {options.map((option) => (
        <ListItem
          key={option.value}
          label={option.label}
          type={multiple ? 'checkbox' : 'multi-standard'}
          selected={selectedValues.includes(option.value)}
          disabled={option.disabled}
          onClick={() => handleSelect(option.value)}
        />
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={cx(
        '[font-family:var(--font-primary)] relative w-full',
        disabled && 'opacity-20 pointer-events-none',
        className
      )}
    >
      {variant === 'underlined' ? (
        // ── Underlined trigger ──────────────────────────────────────────────
        <div
          className={cx(
            'flex flex-col rounded-[4px]',
            '[&:has(:focus-visible)]:ring-[3px] [&:has(:focus-visible)]:ring-[var(--color-border-focus)]'
          )}
        >
          {label && (
            <span
              id={labelId}
              className="text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-700)]"
            >
              {label}
            </span>
          )}
          <div className="flex flex-col gap-[4px]">
            <button
              ref={triggerRef}
              type="button"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls={isOpen ? panelId : undefined}
              aria-label={ariaLabel}
              aria-labelledby={
                !ariaLabel ? (ariaLabelledby ?? (label ? labelId : undefined)) : undefined
              }
              onClick={togglePanel}
              onKeyDown={(e) => {
                if (e.key === 'Escape') closePanel();
              }}
              className={cx(
                'flex h-[32px] items-center py-[4px] w-full text-left',
                'text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-black)]',
                '[@media(hover:hover)]:hover:text-[var(--color-neutral-700)]',
                'focus-visible:outline-none'
              )}
            >
              <span className="flex-1 min-w-0 truncate">{triggerText}</span>
              <span className="shrink-0">
                <ChevronIcon open={isOpen} />
              </span>
            </button>
            <Divider />
          </div>
          {helperText && (
            <span className="text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-700)] pt-[3px]">
              {helperText}
            </span>
          )}
        </div>
      ) : (
        // ── Outlined trigger ────────────────────────────────────────────────
        <div className="flex flex-col gap-[4px]">
          {label && (
            <span
              id={labelId}
              className="text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-700)]"
            >
              {label}
            </span>
          )}
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? panelId : undefined}
            aria-label={ariaLabel}
            aria-labelledby={
              !ariaLabel ? (ariaLabelledby ?? (label ? labelId : undefined)) : undefined
            }
            onClick={togglePanel}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closePanel();
            }}
            className={cx(
              'flex items-center overflow-hidden rounded-[8px] w-full text-left',
              'bg-[var(--color-neutral-white)] border px-[10px] py-[8px] transition-colors',
              'border-[var(--color-neutral-300)] text-[var(--color-neutral-black)]',
              '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] [@media(hover:hover)]:hover:border-[var(--color-neutral-100)]',
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]'
            )}
          >
            <span className="flex-1 min-w-0 px-[6px] py-[2px] text-[16px] leading-[1.5] font-normal truncate">
              {triggerText}
            </span>
            <span className="pr-[2px] shrink-0">
              <ChevronIcon open={isOpen} size={22} />
            </span>
          </button>
          {helperText && (
            <span className="text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-700)]">
              {helperText}
            </span>
          )}
        </div>
      )}

      {isOpen && panelContent}
    </div>
  );
}
