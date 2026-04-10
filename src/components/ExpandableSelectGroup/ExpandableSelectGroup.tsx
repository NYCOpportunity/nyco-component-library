import * as React from 'react';
import { ExpandableSelectGroupProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { ExpandableSelect } from '../ExpandableSelect/ExpandableSelect';

export const ExpandableSelectGroup = React.forwardRef<HTMLDivElement, ExpandableSelectGroupProps>(
  (
    {
      filters,
      title,
      subtitle,
      value: controlledValue,
      defaultValue,
      onChange,
      defaultOpenId,
      accordion = true,
      className,
    },
    ref
  ) => {
    // Open state — which filter id(s) are open
    const [openIds, setOpenIds] = React.useState<Set<string>>(() => {
      if (defaultOpenId) return new Set([defaultOpenId]);
      return new Set();
    });

    // Selection state (controlled or uncontrolled)
    const isValueControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<Record<string, string[]>>(
      defaultValue ?? {}
    );
    const selectedMap = isValueControlled ? controlledValue! : internalValue;

    const handleOpenChange = (id: string, next: boolean) => {
      setOpenIds((prev) => {
        const updated = new Set(accordion ? [] : prev);
        if (next) {
          updated.add(id);
        } else {
          updated.delete(id);
        }
        return updated;
      });
    };

    const handleChange = (id: string, values: string[]) => {
      const next = { ...selectedMap, [id]: values };
      if (!isValueControlled) setInternalValue(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cx(
          'bg-white rounded-[8px] border-2 border-[var(--color-neutral-300,#ddd)]',
          'py-[24px] flex flex-col',
          title || subtitle ? 'gap-[24px]' : '',
          className
        )}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        {(title || subtitle) && (
          <div className="px-[24px] flex flex-col gap-[4px]">
            {title && (
              <p className="font-primary font-semibold text-[18px] leading-[1.6] text-[var(--color-neutral-black)] m-0">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="font-primary font-normal text-[16px] leading-[1.6] text-[var(--color-neutral-700,#777)] m-0">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* ── Filters ─────────────────────────────────────────────────────── */}
        <div className="px-[12px]">
          {filters.map((filter) => (
            <ExpandableSelect
              key={filter.id}
              label={filter.label}
              options={filter.options}
              value={selectedMap[filter.id]}
              onChange={(values) => handleChange(filter.id, values)}
              open={openIds.has(filter.id)}
              onOpenChange={(next) => handleOpenChange(filter.id, next)}
              disabled={filter.disabled}
            />
          ))}
        </div>
      </div>
    );
  }
);

ExpandableSelectGroup.displayName = 'ExpandableSelectGroup';
