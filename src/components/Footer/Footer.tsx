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
    link.bold ? 'body-bold' : 'body-regular',
    'text-[var(--color-neutral-black)]'
  );

  if (link.href) {
    return (
      <a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        onClick={link.onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={cx(
          'block no-underline rounded-[var(--border-radius-base)]',
          '[@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:underline-offset-2',
          'transition-colors',
          textClasses,
          focusRing
        )}
      >
        {link.label}
        {link.external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return <span className={cx('block', textClasses)}>{link.label}</span>;
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
          <div className="bg-white">
            <div
              className={cx(
                'mx-auto',
                // Mobile: 16 px h-padding
                'px-4 py-12',
                // Tablet: 24 px h-padding
                'min-[600px]:max-[999px]:px-6',
                // Desktop: 56 px h-padding
                'min-[1000px]:px-14 min-[1000px]:py-16'
              )}
            >
              <div
                className={cx(
                  // Mobile: single column stack
                  'flex flex-col gap-8',
                  // Desktop: grid layout with logo column + 3 equal columns
                  'min-[1000px]:grid min-[1000px]:[grid-template-columns:minmax(12rem,auto)_1fr_1fr_1fr] min-[1000px]:gap-12'
                )}
              >
                {/* Logo + site name */}
                {logo && <div className="h-fit w-fit">{logo}</div>}

                {/* Site nav link groups */}
                {siteNavGroups.map((group, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    {group.links.map((link, j) => (
                      <FooterNavLink key={j} link={link} />
                    ))}
                  </div>
                ))}

                {/* Connect / CTA section */}
                {(connectTitle || onConnectClick) && (
                  <div className="flex flex-col gap-6 items-start">
                    {connectTitle && (
                      <p className="component-card-title text-[var(--color-neutral-black)]">
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
            </div>
          </div>
        )}

        {/* ── Bottom zone: neutral-100 bg ────────────────────────────────── */}
        {hasBottomSection && (
          <div className="bg-[var(--color-neutral-100)]">
            <div
              className={cx(
                'mx-auto flex flex-col gap-8',
                // Mobile: 16 px h-padding
                'px-4 py-12',
                // Tablet: 24 px h-padding
                'min-[600px]:max-[999px]:px-6 min-[600px]:max-[999px]:gap-8',
                // Desktop: 56 px h-padding
                'min-[1000px]:px-14 min-[1000px]:py-16 min-[1000px]:gap-12'
              )}
            >
              {/* "More on nyc.gov" + link groups */}
              {nycLinkGroups.length > 0 && (
                <div
                  className={cx(
                    // Mobile: stacked
                    'flex flex-col gap-8',
                    // Desktop: grid with heading column + 3 link columns
                    'min-[1000px]:grid min-[1000px]:[grid-template-columns:minmax(12rem,auto)_1fr_1fr_1fr] min-[1000px]:gap-12'
                  )}
                >
                  {/* Section heading */}
                  <p className="component-card-title text-[var(--color-neutral-black)] whitespace-nowrap">
                    {nycSectionTitle}
                  </p>

                  {/* NYC link groups */}
                  {nycLinkGroups.map((group, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      {group.links.map((link, j) => (
                        <FooterNavLink key={j} link={link} />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Copyright line */}
              {copyright && (
                <p className="ui-14-regular text-[var(--color-neutral-black)] border-t border-[var(--color-neutral-300)] pt-8">
                  {copyright}
                </p>
              )}
            </div>
          </div>
        )}
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
