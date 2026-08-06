import * as React from 'react';
import { DropdownMenuProps } from '../../types/components';
import { useFlash } from '../../hooks/useFlash';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronIcon({ open, size = 22 }: { open: boolean; size?: number }) {
  return <Icon name={open ? 'chevron-up' : 'chevron-down'} size={size} />;
}

function CheckmarkIcon() {
  return <Icon name="check" size={20} />;
}

// ---------------------------------------------------------------------------
// DropdownMenu
// ---------------------------------------------------------------------------

export function DropdownMenu({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  multiple = false,
  label,
  helperText,
  placeholder = 'Select...',
  type = 'contained',
  border = false,
  disabled = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  triggerBgColor,
  triggerHoverBgColor,
  triggerPressBgColor,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className,
}: DropdownMenuProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();
  const labelId = React.useId();

  const { flashing, handlePointerDown } = useFlash(disabled);
  const [isHovered, setIsHovered] = React.useState(false);

  // Compute effective trigger background colors
  console.log('triggerBgColor:', triggerBgColor);
  const defaultBg =
    type === 'contained'
      ? border
        ? 'var(--color-neutral-white)'
        : 'var(--color-neutral-100)'
      : 'transparent';
  const effectiveBg = triggerBgColor ?? defaultBg;
  const effectiveHoverBg = triggerHoverBgColor ?? 'var(--color-neutral-100)';
  const effectivePressBg = triggerPressBgColor ?? 'var(--color-neutral-200)';

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
  } else if (multiple && selectedValues.length > 1) {
    // Multi-select: "First Item (+N)" format
    const firstLabel =
      options.find((o) => o.value === selectedValues[0])?.label ?? selectedValues[0];
    displayLabel = `${firstLabel} (+${selectedValues.length - 1})`;
  }

  const triggerText = displayLabel ?? (
    <span className="text-[var(--color-neutral-500)]">{placeholder}</span>
  );

  // Group options by category (preserves insertion order)
  const groupedOptions = React.useMemo(() => {
    const groups: Array<{ category: string | null; items: typeof options }> = [];
    const seen = new Map<string | null, number>();

    for (const option of options) {
      const cat = option.category ?? null;
      if (!seen.has(cat)) {
        seen.set(cat, groups.length);
        groups.push({ category: cat, items: [] });
      }
      groups[seen.get(cat)!].items.push(option);
    }

    return groups;
  }, [options]);

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
      className="absolute z-50 left-0 top-full mt-[8px] w-full min-w-[180px] bg-[var(--color-neutral-white)] rounded-[12px] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.15)] p-[8px] max-h-[256px] overflow-y-auto"
    >
      {groupedOptions.map((group, gi) => (
        <React.Fragment key={gi}>
          {group.category && (
            <div className="pl-[4px] pt-[4px]">
              <span className="text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-700)]">
                {group.category}
              </span>
            </div>
          )}
          {group.items.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <button
                key={option.value}
                role="option"
                type="button"
                aria-selected={isSelected}
                disabled={option.disabled}
                onClick={() => handleSelect(option.value)}
                className={cx(
                  'flex items-center w-full text-left px-[16px] py-[8px] rounded-[6px] transition-colors',
                  'text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-black)]',
                  '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
                  'active:bg-[var(--color-neutral-200)]',
                  'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
                  'disabled:opacity-40 disabled:pointer-events-none'
                )}
              >
                <span className="flex-1 min-w-0 truncate">{option.label}</span>
                {multiple && isSelected && (
                  <span className="ml-[8px] shrink-0 text-[var(--color-neutral-black)]">
                    <CheckmarkIcon />
                  </span>
                )}
              </button>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={cx(
        '[font-family:var(--font-primary)] relative w-full',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
    >
      {label && (
        <span
          id={labelId}
          className="block text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-700)] mb-[8px]"
        >
          {label}
        </span>
      )}

      <div className="relative">
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
          onPointerDown={handlePointerDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closePanel();
          }}
          style={{
            backgroundColor: flashing
              ? effectivePressBg
              : isHovered
                ? effectiveHoverBg
                : effectiveBg,
          }}
          className={cx(
            'flex items-center overflow-hidden rounded-[8px] w-full text-left transition-colors',
            'px-[10px] py-[8px]',
            'text-[16px] leading-[1.5] font-normal text-[var(--color-neutral-black)]',
            // Contained trigger — only border styling
            type === 'contained' &&
              (border ? 'border border-[var(--color-neutral-300)]' : 'border-0'),
            // Uncontained trigger — only border styling
            type === 'uncontained' && 'border border-transparent',
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]'
          )}
        >
          <span className="flex-1 min-w-0 px-[6px] py-[2px] truncate">{triggerText}</span>
          <span className="pr-[2px] shrink-0">
            <ChevronIcon open={isOpen} />
          </span>
        </button>

        {isOpen && panelContent}
      </div>

      {helperText && (
        <span
          className={cx(
            'block text-[14px] leading-[1.6] font-normal mt-[8px] px-[16px] transition-colors',
            isOpen ? 'text-[var(--color-neutral-900)]' : 'text-[var(--color-neutral-700)]'
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
