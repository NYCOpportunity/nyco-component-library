import * as React from 'react';
import { NavDrawerProps, SiteNavItem } from '../../types/components';
import { cx } from '../../utils/cx';

// ---------------------------------------------------------------------------
// Icons — inline SVG (Material Design)
// ---------------------------------------------------------------------------

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
 * north_east — 40 × 40 container matching the Figma mobile-drawer icon size.
 * Path draws for a 24 × 24 viewBox and scales cleanly to 40 px.
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
// Individual drawer link — large display typography per Figma spec
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
// NavDrawer
// ---------------------------------------------------------------------------

export const NavDrawer = React.forwardRef<HTMLDivElement, NavDrawerProps>(
  (
    {
      isOpen,
      onClose,
      navItems = [],
      logo,
      id = 'nav-drawer',
      triggerRef,
      label = 'Navigation menu',
      className,
    },
    ref
  ) => {
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);

    // Central close handler — always calls onClose then returns focus to trigger
    const handleClose = React.useCallback(() => {
      onClose();
      window.requestAnimationFrame(() => {
        (triggerRef as React.RefObject<HTMLElement> | undefined)?.current?.focus();
      });
    }, [onClose, triggerRef]);

    // Focus the close button whenever the drawer opens
    React.useEffect(() => {
      if (isOpen) {
        closeBtnRef.current?.focus();
      }
    }, [isOpen]);

    // Body scroll lock
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

    // Escape key
    React.useEffect(() => {
      if (!isOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 z-40 bg-black/20" aria-hidden="true" onClick={handleClose} />

        {/* Side sheet */}
        <div
          ref={ref}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className={cx(
            'fixed inset-y-0 right-0 z-50',
            'w-full max-w-[400px]',
            'bg-white flex flex-col justify-between',
            'pt-[151px] pb-14 px-6 overflow-y-auto',
            className
          )}
        >
          {/* Close button */}
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
          <nav aria-label={label}>
            <ul className="flex flex-col gap-[6px] list-none m-0 p-0">
              {navItems.map((item, i) => (
                <li key={i}>
                  <DrawerLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo anchored to the bottom */}
          {logo && <div className="shrink-0">{logo}</div>}
        </div>
      </>
    );
  }
);

NavDrawer.displayName = 'NavDrawer';
