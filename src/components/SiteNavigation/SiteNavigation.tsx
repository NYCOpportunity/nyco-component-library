import * as React from 'react';
import { SiteNavItem, SiteNavigationProps } from '../../types/components';
import { NavItem } from '../NavItem';
import { cx } from '../../utils/cx';

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

/** close — 24 × 24 */
function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

/**
 * north_east — renders at 40 × 40 to match the Figma mobile-drawer icon container.
 * The path is designed for a 24 × 24 viewBox and scales cleanly to 40 px.
 */
function NorthEastLargeIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Shared focus ring
// ---------------------------------------------------------------------------
const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]';

// ---------------------------------------------------------------------------
// Mobile drawer nav link
// ---------------------------------------------------------------------------
function DrawerLink({ item }: { item: SiteNavItem }) {
  const classes = cx(
    'inline-flex items-center gap-1 no-underline cursor-pointer',
    'w-full py-1 rounded-[var(--border-radius-base)]',
    'font-primary font-semibold text-[38px] leading-[1.14] tracking-[-0.02em]',
    item.external ? 'text-[var(--color-text-link)]' : 'text-[var(--color-neutral-black)]',
    focusRing
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={classes}
        aria-current={item.active ? 'page' : undefined}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span>{item.label}</span>
        {item.external && (
          <>
            <NorthEastLargeIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={item.onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {item.label}
    </button>
  );
}

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
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const menuBtnRef = React.useRef<HTMLButtonElement>(null);

    // Focus the close button whenever the drawer opens
    React.useEffect(() => {
      if (isOpen) {
        closeBtnRef.current?.focus();
      }
    }, [isOpen]);

    // Body scroll lock while drawer is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Escape key closes the drawer; restores focus to hamburger
    React.useEffect(() => {
      if (!isOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          requestAnimationFrame(() => menuBtnRef.current?.focus());
        }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    const handleClose = () => {
      setIsOpen(false);
      requestAnimationFrame(() => menuBtnRef.current?.focus());
    };

    return (
      <header ref={ref} className={cx('relative', className)}>
        {/* ── Desktop bar (≥ 1000 px) ──────────────────────────────────── */}
        <div className="hidden min-[1000px]:flex items-center justify-between bg-white border-b border-[var(--color-neutral-300)] px-14 h-[68px]">
          {/* Logo */}
          <div className="shrink-0">{logo}</div>

          {/* Nav links — full-height items so the bottom border aligns with the bar edge */}
          <nav aria-label="Site navigation" className="flex items-stretch h-full">
            {navItems.map(({ className: itemClass, ...item }, i) => (
              <NavItem key={i} {...item} className={cx('h-full', itemClass)} />
            ))}
          </nav>
        </div>

        {/* ── Mobile bar (< 1000 px) ───────────────────────────────────── */}
        <div className="flex min-[1000px]:hidden items-center justify-between bg-white border-b border-[var(--color-neutral-300)] pl-6 pr-2">
          {/* Logo */}
          <div className="shrink-0 flex items-center">{logo}</div>

          {/* Actions: optional search + hamburger */}
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
              aria-controls="site-nav-drawer"
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
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              aria-hidden="true"
              onClick={handleClose}
            />

            {/* Side sheet — full-screen on mobile, max 400 px wide */}
            <div
              id="site-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[400px] bg-white flex flex-col justify-between pt-[151px] pb-14 px-6 overflow-y-auto"
            >
              {/* Close button — positioned absolute within the sheet */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={handleClose}
                aria-label="Close navigation menu"
                className={cx(
                  'absolute top-[91px] right-3 w-12 py-3',
                  'flex items-center justify-center',
                  'rounded-[var(--border-radius-base)]',
                  focusRing
                )}
              >
                <CloseIcon />
              </button>

              {/* Navigation list */}
              <nav aria-label="Site navigation">
                <ul className="flex flex-col gap-[6px] list-none m-0 p-0">
                  {navItems.map((item, i) => (
                    <li key={i}>
                      <DrawerLink item={item} />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Logo anchored to the bottom of the drawer */}
              <div className="shrink-0">{logo}</div>
            </div>
          </>
        )}
      </header>
    );
  }
);

SiteNavigation.displayName = 'SiteNavigation';
