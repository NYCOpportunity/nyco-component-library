import * as React from 'react';
import { SiteNavigationProps } from '../../types/components';
import { NavItem } from '../NavItem';
import { NavItemChip, NavItemChipDropdown } from '../NavItemChip';
import { NavDrawer } from '../NavDrawer';
import { cx } from '../../utils/cx';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Icons — inline SVG (Material Design)
// ---------------------------------------------------------------------------

/** search — 24 × 24 */
function SearchIcon() {
  return <Icon name="search" />;
}

/** menu (hamburger) — 24 × 24 */
function MenuIcon() {
  return <Icon name="menu" />;
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
      navStyle: globalNavStyle = 'link',
      drawerVariant = 'none',
      drawerSections,
      drawerFooterLinks = [],
      showSearch = false,
      onSearchClick,
      mobileMenuLabel = 'Open navigation menu',
      defaultOpen = false,
      colors,
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

    // Build the bar style: direct CSS + scoped CSS variable overrides.
    // CSS variables cascade to all child components (NavItem, NavItemChip, dropdown)
    // without needing per-component color props.
    const barStyle = {
      ...(colors?.barBg && { backgroundColor: colors.barBg }),
      ...(colors?.barBorder && { borderColor: colors.barBorder }),
      ...(colors?.iconColor && { color: colors.iconColor }),
      ...(colors?.navText && { '--color-neutral-black': colors.navText }),
      ...(colors?.navLinkText && { '--color-text-link': colors.navLinkText }),
      ...(colors?.navActiveIndicator && { '--color-primary-base': colors.navActiveIndicator }),
      ...(colors?.chipHoverBg && { '--color-neutral-100': colors.chipHoverBg }),
      ...(colors?.chipActiveBg && { '--color-neutral-200': colors.chipActiveBg }),
      ...(colors?.chipPressedBg && { '--color-neutral-300': colors.chipPressedBg }),
      ...(colors?.dropdownBg && { '--color-neutral-white': colors.dropdownBg }),
    } as React.CSSProperties;

    return (
      <header ref={ref} className={cx('relative', className)}>
        {/* ── Desktop bar (≥ 1000 px) ──────────────────────────────────────────── */}
        <div
          className="hidden min-[1000px]:flex items-center justify-between bg-white border-b border-[var(--color-neutral-300)] px-14 h-[68px]"
          style={barStyle}
        >
          <div className="shrink-0">{logo}</div>
          <nav aria-label="Site navigation" className="flex items-center gap-[4px] h-full">
            {navItems.map(
              ({ className: itemClass, navStyle: itemNavStyle, navDropdownItems, ...item }, i) => {
                const style = itemNavStyle ?? globalNavStyle;

                if (style === 'dropdown' && navDropdownItems) {
                  return (
                    <NavItemChipDropdown
                      key={i}
                      label={item.label}
                      items={navDropdownItems}
                      active={item.active}
                      className={itemClass}
                    />
                  );
                }

                if (style === 'chip') {
                  return (
                    <NavItemChip
                      key={i}
                      label={item.label}
                      href={item.href}
                      active={item.active}
                      onClick={item.onClick}
                      className={itemClass}
                    />
                  );
                }

                // default: 'link' — standard NavItem
                return <NavItem key={i} {...item} className={cx('h-full', itemClass)} />;
              }
            )}
          </nav>
        </div>

        {/* ── Mobile bar (< 1000 px) ───────────────────────────────────── */}
        <div
          className="flex min-[1000px]:hidden items-center justify-between bg-white border-b border-[var(--color-neutral-300)] pl-6 pr-2"
          style={barStyle}
        >
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
          variant={drawerVariant}
          navItems={navItems}
          sections={drawerSections}
          footerLinks={drawerFooterLinks}
          logo={logo}
          triggerRef={menuBtnRef}
        />
      </header>
    );
  }
);

SiteNavigation.displayName = 'SiteNavigation';
