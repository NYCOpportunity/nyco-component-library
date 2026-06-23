import * as React from 'react';
import { SiteNavigationProps } from '../../types/components';
import { NavItem } from '../NavItem';
import { NavDrawer } from '../NavDrawer';
import { cx } from '../../utils/cx';
import { useIsMobile } from '../../hooks/useIsMobile';

// ---------------------------------------------------------------------------
// Icons — inline SVG (Material Design)
// ---------------------------------------------------------------------------

/** search — 24 × 24 */
function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

/** menu (hamburger) — 24 × 24 */
function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Shared focus ring
// ---------------------------------------------------------------------------
const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]';

const DRAWER_ID = 'site-nav-drawer';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const SiteNavigation = React.forwardRef<HTMLElement, SiteNavigationProps>(
  (
    {
      logo,
      navItems = [],
      showSearch = false,
      onSearchClick,
      mobileMenuLabel = 'Open navigation menu',
      defaultOpen = false,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const menuBtnRef = React.useRef<HTMLButtonElement>(null);
    const isMobile = useIsMobile(1000);

    React.useEffect(() => {
      if (!isMobile && isOpen) {
        setIsOpen(false);
      }
    }, [isMobile, isOpen]);

    return (
      <header ref={ref} className={cx('relative', className)}>
        {/* ── Desktop bar (≥ 1000 px) ──────────────────────────────────── */}
        <div className="hidden min-[1000px]:flex items-center justify-between bg-white border-b border-[var(--color-neutral-300)] px-14 h-[68px]">
          <div className="shrink-0">{logo}</div>
          <nav aria-label="Site navigation" className="flex items-stretch h-full">
            {navItems.map(({ className: itemClass, ...item }, i) => (
              <NavItem key={i} {...item} className={cx('h-full', itemClass)} />
            ))}
          </nav>
        </div>

        {/* ── Mobile bar (< 1000 px) ───────────────────────────────────── */}
        <div className="flex min-[1000px]:hidden items-center justify-between bg-white border-b border-[var(--color-neutral-300)] pl-6 pr-2">
          <div className="shrink-0 flex items-center">{logo}</div>
          <div className="flex items-center gap-[6.2px] h-[56px]">
            {showSearch && (
              <button
                type="button"
                onClick={onSearchClick}
                aria-label="Search"
                className={cx(
                  'flex items-center justify-center rounded-[var(--border-radius-base)]',
                  focusRing
                )}
              >
                <SearchIcon />
              </button>
            )}
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={mobileMenuLabel}
              aria-expanded={isOpen}
              aria-controls={DRAWER_ID}
              className={cx(
                'flex items-center justify-center px-4 py-4 rounded-[var(--border-radius-base)]',
                focusRing
              )}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ─────────────────────────────────────────────── */}
        <NavDrawer
          id={DRAWER_ID}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItems}
          logo={logo}
          triggerRef={menuBtnRef}
        />
      </header>
    );
  }
);

SiteNavigation.displayName = 'SiteNavigation';
