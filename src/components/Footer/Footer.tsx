import * as React from 'react';
import { FooterProps, FooterLink } from '../../types/components';
import { Button } from '../Button';
import { cx } from '../../utils/cx';

// ---------------------------------------------------------------------------
// Focus ring (shared with rest of library)
// ---------------------------------------------------------------------------
const focusRing =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]';

// ---------------------------------------------------------------------------
// Single nav link inside the footer
// ---------------------------------------------------------------------------
function FooterNavLink({ link }: { link: FooterLink }) {
  const textClasses = cx(
    'font-primary leading-[1.5]',
    // Desktop 18px / Mobile 16px
    'text-[18px] max-[999px]:text-[16px]',
    'text-[var(--color-neutral-black)]',
    link.bold ? 'font-semibold' : 'font-normal'
  );

  if (link.href) {
    return (
      <a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        onClick={link.onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={cx(
          'block px-2 py-2 no-underline rounded-[var(--border-radius-base)]',
          '[@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:underline-offset-2',
          textClasses,
          focusRing
        )}
      >
        {link.label}
        {link.external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return <span className={cx('block px-2 py-2', textClasses)}>{link.label}</span>;
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      logo,
      siteNavGroups = [],
      connectTitle,
      connectButtonLabel = 'Sign up',
      onConnectClick,
      nycSectionTitle = 'More on nyc.gov',
      nycLinkGroups = [],
      copyright,
      className,
    },
    ref
  ) => {
    const hasTopSection = logo || siteNavGroups.length > 0 || connectTitle || onConnectClick;
    const hasBottomSection = nycLinkGroups.length > 0 || !!copyright;

    return (
      <footer ref={ref} className={cx('border-t border-[var(--color-neutral-300)]', className)}>
        {/* ── Top zone: white bg ─────────────────────────────────────────── */}
        {hasTopSection && (
          <div
            className={cx(
              'bg-white py-10',
              // Desktop: 56 px h-padding, single row
              'min-[1000px]:px-14 min-[1000px]:flex min-[1000px]:items-start min-[1000px]:justify-between',
              // Mobile: 16 px h-padding, stacked column
              'max-[999px]:px-4 max-[999px]:flex max-[999px]:flex-col max-[999px]:gap-6'
            )}
          >
            {/* Logo + site name */}
            {logo && (
              <div className="shrink-0 min-[1000px]:w-60 min-[1000px]:py-2 max-[999px]:pl-2">
                {logo}
              </div>
            )}

            {/* Site nav link groups */}
            {siteNavGroups.map((group, i) => (
              <div key={i} className="flex flex-col items-start min-[1000px]:w-80">
                {group.links.map((link, j) => (
                  <FooterNavLink key={j} link={link} />
                ))}
              </div>
            ))}

            {/* Connect / CTA section */}
            {(connectTitle || onConnectClick) && (
              <div className="flex flex-col gap-6 items-start min-[1000px]:w-80">
                {connectTitle && (
                  <p className="font-primary font-semibold text-[22px] leading-[1.4] text-[var(--color-neutral-black)]">
                    {connectTitle}
                  </p>
                )}
                {onConnectClick && (
                  <Button onClick={onConnectClick} className="max-[999px]:w-full">
                    {connectButtonLabel}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom zone: neutral-100 bg ────────────────────────────────── */}
        {hasBottomSection && (
          <div
            className={cx(
              'bg-[var(--color-neutral-100)] py-10 flex flex-col justify-between gap-10',
              'min-[1000px]:px-14',
              'max-[999px]:px-4 max-[999px]:gap-6'
            )}
          >
            {/* "More on nyc.gov" + link groups */}
            {nycLinkGroups.length > 0 && (
              <div
                className={cx(
                  'flex items-start',
                  'min-[1000px]:justify-between',
                  'max-[999px]:flex-col max-[999px]:gap-6'
                )}
              >
                {/* Section heading */}
                <p className="font-primary font-semibold text-[22px] leading-[1.4] text-[var(--color-neutral-black)] shrink-0 min-[1000px]:w-60">
                  {nycSectionTitle}
                </p>

                {/* NYC link groups */}
                <div
                  className={cx(
                    'flex items-start',
                    'max-[999px]:flex-col max-[999px]:gap-4 max-[999px]:w-full'
                  )}
                >
                  {nycLinkGroups.map((group, i) => (
                    <div key={i} className="flex flex-col items-start min-[1000px]:w-80">
                      {group.links.map((link, j) => (
                        <FooterNavLink key={j} link={link} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Copyright line */}
            {copyright && (
              <p className="font-primary text-[14px] leading-[1.6] text-[var(--color-neutral-black)]">
                {copyright}
              </p>
            )}
          </div>
        )}
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
