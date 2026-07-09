import * as React from 'react';
import { NavDrawerProps, NavDrawerSection, SiteNavItem } from '../../types/components';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon';

/** close — 24 × 24 */
function CloseIcon() {
  return <Icon name="close" />;
}

/** north_east icon with configurable size. */
function NorthEastIcon({ size = 40 }: { size?: number }) {
  return <Icon name="north-east" size={size} />;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]';

function DrawerLink({
  item,
  fontClass,
  isActive = false,
  iconSize = 40,
}: {
  item: SiteNavItem;
  fontClass: string;
  isActive?: boolean;
  iconSize?: number;
}) {
  if (item.href) {
    return (
      <a
        href={item.href}
        className={cx(
          'inline-flex items-center no-underline cursor-pointer rounded-[var(--border-radius-base)]',
          'w-full',
          'gap-1 py-1',
          fontClass,
          item.external ? 'text-[var(--color-text-link)]' : 'text-[var(--color-neutral-black)]',
          focusRing
        )}
        aria-current={isActive ? 'page' : undefined}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span>{item.label}</span>
        {item.external && (
          <>
            <NorthEastIcon size={iconSize} />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center no-underline cursor-pointer rounded-[var(--border-radius-base)]',
        'w-full',
        'gap-1 py-1',
        fontClass,
        item.external ? 'text-[var(--color-text-link)]' : 'text-[var(--color-neutral-black)]',
        focusRing
      )}
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
      variant = 'none',
      navItems = [],
      sections,
      footerLinks = [],
      logo,
      id = 'nav-drawer',
      triggerRef,
      label = 'Navigation menu',
      className,
    },
    ref
  ) => {
    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const dialogRef = React.useRef<HTMLDivElement | null>(null);
    const setDialogRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        dialogRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );
    const displayFontClass =
      variant === 'category' ? 'navigation-categorized-medium' : 'navigation-uncategorized-regular';

    const resolvedSections: NavDrawerSection[] =
      sections && sections.length > 0 ? sections : [{ items: navItems }];

    // Central close handler — always calls onClose then returns focus to trigger
    const handleClose = React.useCallback(() => {
      onClose();
      window.requestAnimationFrame(() => {
        (triggerRef as React.RefObject<HTMLElement> | undefined)?.current?.focus();
      });
    }, [onClose, triggerRef]);

    // Move focus into the drawer when it opens. Target the dialog container (not the
    // close button) so no focus ring is shown until the user navigates by keyboard.
    React.useEffect(() => {
      if (isOpen) {
        dialogRef.current?.focus();
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
          ref={setDialogRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
          className={cx(
            'fixed inset-y-0 right-0 z-50 outline-none',
            'w-screen md:w-[390px] md:max-w-[390px]',
            'bg-[var(--color-neutral-white)] flex flex-col',
            'pt-8 pb-8 px-4 overflow-y-auto',
            className
          )}
        >
          {/* Header row */}
          <div className="flex justify-between items-center h-[56px] mb-4">
            <div className="pt-1 flex items-center">{logo}</div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="Close navigation menu"
              className={cx('flex items-center', 'rounded-[8px]', focusRing)}
            >
              <CloseIcon />
            </button>
          </div>

          {variant === 'category' ? (
            <div className="flex flex-col gap-6">
              <nav aria-label={label} className="flex-1">
                <div className="flex flex-col gap-10">
                  {resolvedSections.map((section, i) => (
                    <section key={i}>
                      {section.category && (
                        <p className="mb-1 text-[11px] leading-[1.2] tracking-[0.04em] uppercase text-[var(--color-neutral-700)]">
                          {section.category}
                        </p>
                      )}
                      <ul className="flex flex-col gap-[2px] list-none m-0 p-0">
                        {section.items.map((item, j) => (
                          <li key={`${i}-${j}`}>
                            <DrawerLink
                              item={item}
                              fontClass={displayFontClass}
                              isActive={!!item.active}
                            />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </nav>

              {footerLinks.length > 0 && (
                <ul className="list-none m-0 mt-6 p-0 flex flex-col gap-[2px]">
                  {footerLinks.map((item, i) => (
                    <li key={`footer-${i}`}>
                      <DrawerLink
                        item={item}
                        fontClass="body-bold"
                        isActive={!!item.active}
                        iconSize={28}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <nav aria-label={label} className="flex-1">
              <ul className="flex flex-col gap-[2px] list-none m-0 p-0">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <DrawerLink item={item} fontClass={displayFontClass} isActive={!!item.active} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </>
    );
  }
);

NavDrawer.displayName = 'NavDrawer';
