import * as React from 'react';
import { NavItemChipProps, NavDropdownItem } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Shared chip classes
// ---------------------------------------------------------------------------

const chipBase = [
  '[font-family:var(--font-primary)]',
  'inline-flex items-center gap-[6px]',
  'rounded-[8px] border',
  'px-[12px] py-[8px]',
  // Same font size as NavItem (body-regular)
  'text-[18px] leading-[1.5] font-normal whitespace-nowrap',
  'cursor-pointer no-underline select-none',
  '[@media(hover:hover)]:transition-colors',
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
  'disabled:opacity-40 disabled:pointer-events-none',
].join(' ');

const chipDefault = [
  'bg-transparent border-transparent text-[var(--color-neutral-black)]',
  '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
  // Blink darker on press (desktop + touch)
  'active:bg-[var(--color-neutral-200)]',
].join(' ');

// Active/selected: light grey highlight, no border, no color
const chipActive = [
  'bg-[var(--color-neutral-200)] border-transparent text-[var(--color-neutral-black)]',
  '[@media(hover:hover)]:hover:bg-[var(--color-neutral-300)]',
  'active:bg-[var(--color-neutral-300)]',
].join(' ');

// Touch press flash
const chipFlashing = '[@media(hover:none)]:bg-[var(--color-neutral-200)]';

// ---------------------------------------------------------------------------
// NavItemChip — chip-style nav item (no dropdown)
// ---------------------------------------------------------------------------

export const NavItemChip = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavItemChipProps
>(({ label, href, active = false, onClick, className }, ref) => {
  const { flashing, handlePointerDown } = useFlash();

  const classes = cx(
    chipBase,
    active ? cx(chipActive, flashing && chipFlashing) : cx(chipDefault, flashing && chipFlashing),
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={classes}
        onPointerDown={handlePointerDown}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-current={active ? 'page' : undefined}
      className={classes}
      onPointerDown={handlePointerDown}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {label}
    </button>
  );
});

NavItemChip.displayName = 'NavItemChip';

// ---------------------------------------------------------------------------
// NavItemChipDropdown — chip trigger that opens a navigation dropdown panel.
//
// Unlike a form select, the trigger always shows the fixed `label` and items
// are navigation links (anchors / buttons), not selectable options.
// Supports external items with a north-east arrow and optional dividers.
// ---------------------------------------------------------------------------

export interface NavItemChipDropdownProps {
  /** Fixed label always shown in the chip trigger. */
  label: string;
  /** Navigation links shown in the dropdown panel. */
  items: NavDropdownItem[];
  /** Sets `aria-expanded` accessible state. No visual difference. */
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
  const { flashing, handlePointerDown } = useFlash();

  // When this dropdown is deactivated from outside (another nav item was selected),
  // clear the internal selection so the trigger chip goes back to its default state.
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
          role="menu"
          className="absolute z-50 left-0 top-full mt-[8px] min-w-[200px] bg-[var(--color-neutral-white)] rounded-[12px] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.15)] py-[8px] overflow-hidden"
        >
          {items.map((item, i) => {
            const isSelected = selectedIndex === i;
            const itemClasses = cx(
              '[font-family:var(--font-primary)] flex items-center gap-[6px] w-full text-left',
              'px-[16px] py-[10px]',
              'text-[16px] leading-[1.5]',
              'text-[16px] leading-[1.5] font-normal',
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
