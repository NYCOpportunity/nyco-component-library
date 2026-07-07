import * as React from 'react';
import { NavItemProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Icons — inline SVG (Material Design paths)
// ---------------------------------------------------------------------------

/** expand_more — 24 × 24 */
function ChevronDownIcon() {
  return <Icon name="chevron-down" />;
}

/** north_east — 24 × 24 */
function NorthEastIcon() {
  return <Icon name="north-east" />;
}

// ---------------------------------------------------------------------------
// Shared base — typography, gap, cursor, no-underline
// ---------------------------------------------------------------------------
const baseClasses = [
  'inline-flex items-center gap-1',
  // Typography — Desktop/Body/Regular
  'body-regular whitespace-nowrap',
  // Reset anchor underline
  'no-underline',
  // Cursor
  'cursor-pointer',
  // Transparent bottom border always present → no layout shift on hover/active
  'border-b-[5px] border-b-transparent',
  // Smooth colour transition on pointer-capable devices
  '[@media(hover:hover)]:transition-colors',
  // Focus-visible: filled primary background (per Figma design)
  // Use !important on border so it beats the active arbitrary-value class
  // (Tailwind puts arbitrary values later in stylesheet → higher cascade priority)
  'focus-visible:outline-none',
  'focus-visible:bg-[var(--color-primary-base)] focus-visible:text-[var(--color-primary-foreground)]',
  'focus-visible:rounded-[var(--border-radius-base)]',
  'focus-visible:![border-bottom-color:transparent]',
].join(' ');

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const NavItem = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, NavItemProps>(
  (
    { label, href, active = false, hasDropdown = false, external = false, onClick, className },
    ref
  ) => {
    const hasIcon = hasDropdown || external;

    const paddingClasses = hasIcon ? 'py-2 pl-4 pr-[10px]' : 'py-2 px-4';

    const colorClasses = external
      ? 'text-[var(--color-text-link)]'
      : 'text-[var(--color-neutral-black)]';

    const borderClasses = external
      ? cx(
          active && 'border-b-[var(--color-text-link)]',
          '[@media(hover:hover)]:hover:border-b-[var(--color-text-link)]'
        )
      : cx(
          active && 'border-b-[var(--color-primary-base)]',
          '[@media(hover:hover)]:hover:border-b-[var(--color-primary-base)]'
        );

    const classes = cx(baseClasses, paddingClasses, colorClasses, borderClasses, className);

    // ── Anchor ──────────────────────────────────────────────────────────────
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-current={active ? 'page' : undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={classes}
        >
          <span>{label}</span>
          {hasDropdown && <ChevronDownIcon />}
          {external && (
            <>
              <NorthEastIcon />
              <span className="sr-only">(opens in a new tab)</span>
            </>
          )}
        </a>
      );
    }

    // ── Button (no href) ────────────────────────────────────────────────────
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        aria-current={active ? 'page' : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        className={classes}
      >
        <span>{label}</span>
        {hasDropdown && <ChevronDownIcon />}
        {external && (
          <>
            <NorthEastIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </button>
    );
  }
);

NavItem.displayName = 'NavItem';
