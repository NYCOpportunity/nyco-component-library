import * as React from 'react';
import { NavDropdownItem } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { Icon } from '../Icon';
import { chipBase, chipDefault, chipActive, chipFlashing } from './chipStyles';

// ---------------------------------------------------------------------------
// NavItemChipDropdown — chip trigger that opens a navigation dropdown panel.
//
// Unlike a form select, the trigger always shows the fixed `label` and items
// are navigation links (anchors / buttons), not selectable options.
// Supports external items with a north-east arrow and optional dividers.
// The panel repositions itself if it would overflow the viewport.
// ---------------------------------------------------------------------------

export interface NavItemChipDropdownProps {
  /** Fixed label always shown in the chip trigger. */
  label: string;
  /** Navigation links shown in the dropdown panel. */
  items: NavDropdownItem[];
  /**
   * When `true` the dropdown is considered active/selected (another system
   * tracks this). The trigger shows the active highlight and internal
   * selection clears when this becomes `false`.
   */
  active?: boolean;
  className?: string;
}

export function NavItemChipDropdown({
  label,
  items,
  active = false,
  className,
}: NavItemChipDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = React.useState<React.CSSProperties>({});
  const { flashing, handlePointerDown } = useFlash();

  // When deactivated from outside (another nav item selected), clear selection
  React.useEffect(() => {
    if (!active) setSelectedIndex(null);
  }, [active]);

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Element)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Smart panel positioning — flip if panel overflows viewport
  React.useLayoutEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const style: React.CSSProperties = {};
    if (rect.right > window.innerWidth) {
      style.left = 'auto';
      style.right = 0;
    }
    if (rect.bottom > window.innerHeight) {
      style.top = 'auto';
      style.bottom = '100%';
      style.marginTop = 0;
      style.marginBottom = '8px';
    }
    setPanelStyle(style);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) setPanelStyle({});
  }, [isOpen]);

  const hasSelection = selectedIndex !== null;
  const triggerClasses = cx(
    chipBase,
    isOpen || hasSelection ? chipActive : cx(chipDefault, flashing && chipFlashing),
    className
  );

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={triggerClasses}
        onClick={() => setIsOpen((o) => !o)}
        onPointerDown={handlePointerDown}
      >
        {label}
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          role="menu"
          style={panelStyle}
          className="absolute z-50 left-0 top-full mt-[8px] min-w-[200px] bg-[var(--color-neutral-white)] rounded-[12px] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.15)] py-[8px] overflow-hidden"
        >
          {items.map((item, i) => {
            const isSelected = selectedIndex === i;
            const itemClasses = cx(
              '[font-family:var(--font-primary)] flex items-center gap-[6px] w-full text-left',
              'px-[16px] py-[10px]',
              'text-[18px] leading-[1.5] font-normal',
              item.external
                ? 'text-[var(--color-text-link)] [@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:underline-offset-2'
                : cx(
                    'text-[var(--color-neutral-black)]',
                    isSelected
                      ? 'bg-[var(--color-neutral-100)] [@media(hover:hover)]:hover:bg-[var(--color-neutral-200)]'
                      : '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]'
                  ),
              'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)]',
              'cursor-pointer no-underline'
            );

            const content = (
              <>
                <span className="flex-1 min-w-0">{item.label}</span>
                {item.external && <Icon name="north-east" size={18} />}
              </>
            );

            const handleItemClick = (e: React.MouseEvent, idx: number) => {
              if (!item.external) setSelectedIndex(idx);
              item.onClick?.(e as React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>);
              setIsOpen(false);
            };

            const el = item.href ? (
              <a
                key={i}
                href={item.href}
                role="menuitem"
                aria-current={isSelected ? 'true' : undefined}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={itemClasses}
                onClick={(e) => handleItemClick(e, i)}
              >
                {content}
                {item.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            ) : (
              <button
                key={i}
                type="button"
                role="menuitem"
                aria-current={isSelected ? 'true' : undefined}
                className={itemClasses}
                onClick={(e) => handleItemClick(e, i)}
              >
                {content}
              </button>
            );

            return (
              <React.Fragment key={i}>
                {el}
                {item.dividerAfter && (
                  <div
                    className="h-px bg-[var(--color-neutral-200)] mx-[8px] my-[4px]"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
