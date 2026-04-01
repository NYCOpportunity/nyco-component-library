import * as React from 'react';
import { ChipGroupProps } from '../../types/components';
import { Chip } from '../Chip/Chip';
import { cx } from '../../utils/cx';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toggle(set: string[], value: string): string[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

// ---------------------------------------------------------------------------
// Apply / Clear button — minimal secondary style matching design system
// ---------------------------------------------------------------------------
function ActionButton({
  children,
  onClick,
  variant = 'secondary',
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center px-4 py-2 rounded-[var(--border-radius-base)]',
        'text-[14px] leading-[20px] font-semibold',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
        '[@media(hover:hover)]:transition-colors disabled:pointer-events-none',
        variant === 'primary' &&
          'bg-[var(--color-button-primary-base)] text-[var(--color-primary-foreground)] [@media(hover:hover)]:hover:bg-[var(--color-button-primary-hover)] disabled:bg-[var(--color-button-disabled-base)] disabled:text-[var(--color-button-disabled-text)]',
        variant === 'secondary' &&
          'bg-[var(--color-neutral-white)] border border-[var(--color-border-default)] text-[var(--color-neutral-black)] [@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] disabled:bg-[var(--color-button-disabled-base)] disabled:text-[var(--color-button-disabled-text)]'
      )}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// ChipGroup
// ---------------------------------------------------------------------------
export function ChipGroup({
  options,
  mode = 'multiselect',
  pending = false,
  value: controlledValue,
  defaultValue = [],
  onChange,
  onApply,
  applyLabel = 'Apply',
  clearLabel = 'Clear',
  renderActions,
  componentStyle,
  className,
}: ChipGroupProps) {
  const isControlled = controlledValue !== undefined;

  // draft — what the user is currently clicking (always internal)
  const [draft, setDraft] = React.useState<string[]>(isControlled ? controlledValue : defaultValue);

  // committed — last applied value (only meaningful in pending mode)
  const [committed, setCommitted] = React.useState<string[]>(
    isControlled ? controlledValue : defaultValue
  );

  // Sync draft when controlled value changes from outside
  React.useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setDraft(controlledValue);
      setCommitted(controlledValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue]);

  const handleToggle = (value: string) => {
    const next = toggle(draft, value);
    if (!isControlled) setDraft(next);
    if (!pending) {
      onChange?.(next);
    }
  };

  // Singleselect: clicking the active chip deselects; clicking another selects only it
  const handleSingleSelect = (value: string) => {
    const next = draft[0] === value ? [] : [value];
    if (!isControlled) setDraft(next);
    onChange?.(next);
  };

  // Dismissible mode: remove a single item and propagate immediately
  const handleDismiss = (value: string) => {
    const next = draft.filter((v) => v !== value);
    if (!isControlled) setDraft(next);
    onChange?.(next);
  };

  const handleApply = () => {
    setCommitted(draft);
    onApply?.(draft);
  };

  const handleClear = () => {
    const reset = committed; // revert draft to last committed
    if (!isControlled) setDraft(reset);
    // If not pending, a "clear" still resets to committed (no-op when committed = [])
  };

  const handleClearAll = () => {
    // Full clear — wipe both draft and committed, fire callbacks
    if (!isControlled) {
      setDraft([]);
      setCommitted([]);
    }
    if (!pending) onChange?.([]);
  };

  // In pending mode: show pending draft; in live mode: show draft (= effective value)
  const displaySelected = draft;

  // Has the draft diverged from committed?
  const isDirty =
    pending && (draft.length !== committed.length || draft.some((v) => !committed.includes(v)));

  return (
    <div className={cx('flex flex-col gap-3', className)}>
      {/* ------------------------------------------------------------------ */}
      {/* Multiselect: all options as selectable chips                         */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'multiselect' && (
        <div
          className={cx('flex flex-wrap gap-2', componentStyle?.chipContainer)}
          role="group"
          aria-label="Filter options"
        >
          {options.map((opt) => (
            <Chip
              key={opt.value}
              variant="selectable"
              label={opt.label}
              tooltip={opt.tooltip}
              tooltipTitle={opt.tooltipTitle}
              selected={displaySelected.includes(opt.value)}
              disabled={opt.disabled}
              className={componentStyle?.chip}
              onSelectedChange={() => handleToggle(opt.value)}
            />
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Singleselect: one active at a time; rest disabled when one chosen    */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'singleselect' && (
        <div
          className={cx('flex flex-wrap gap-2', componentStyle?.chipContainer)}
          role="radiogroup"
          aria-label="Filter options"
        >
          {options.map((opt) => {
            const isSelected = displaySelected[0] === opt.value;
            const isDisabled = opt.disabled || (displaySelected.length > 0 && !isSelected);
            return (
              <Chip
                key={opt.value}
                variant="selectable"
                label={opt.label}
                tooltip={opt.tooltip}
                tooltipTitle={opt.tooltipTitle}
                selected={isSelected}
                disabled={isDisabled}
                className={componentStyle?.chip}
                onSelectedChange={() => handleSingleSelect(opt.value)}
              />
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Dismissible: render only the active items — source is always external */}
      {/* ------------------------------------------------------------------ */}
      {mode === 'dismissible' && (
        <div
          className={cx('flex flex-wrap gap-2', componentStyle?.chipContainer)}
          role="group"
          aria-label="Active filters"
        >
          {displaySelected.map((val) => {
            const opt = options.find((o) => o.value === val);
            if (!opt) return null;
            return (
              <Chip
                key={val}
                variant="dismissible"
                label={opt.label}
                selected={true}
                disabled={opt.disabled}
                className={componentStyle?.chip}
                onDismiss={() => handleDismiss(val)}
              />
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Actions row — custom renderActions or built-in fallback             */}
      {/* ------------------------------------------------------------------ */}

      {/* Custom render prop: completely replaces built-in buttons for any mode */}
      {renderActions &&
        renderActions({
          selected: draft,
          apply: handleApply,
          clear: handleClear,
          clearAll: handleClearAll,
          isDirty,
        })}

      {/* Built-in: Pending mode Apply / Clear (multiselect only) */}
      {!renderActions && mode === 'multiselect' && pending && (
        <div className={cx('flex items-center gap-2 pt-1', componentStyle?.actions)}>
          <ActionButton variant="primary" onClick={handleApply} disabled={!isDirty}>
            {applyLabel}
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={handleClear}
            disabled={draft.length === 0 && committed.length === 0}
          >
            {clearLabel}
          </ActionButton>
        </div>
      )}

      {/* Built-in: Live multiselect "Clear all" */}
      {!renderActions && mode === 'multiselect' && !pending && displaySelected.length > 0 && (
        <div className={cx('flex items-center gap-2 pt-1', componentStyle?.actions)}>
          <ActionButton variant="secondary" onClick={handleClearAll}>
            Clear all
          </ActionButton>
        </div>
      )}
    </div>
  );
}

ChipGroup.displayName = 'ChipGroup';
