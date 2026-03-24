import * as React from 'react';
import { BreadcrumbsProps } from '../../types/components';

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 3.5L10.5 8L6 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DotsIcon = () => (
  <svg
    width="13"
    height="4"
    viewBox="0 0 13 4"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="1.5" cy="2" r="1.5" />
    <circle cx="6.5" cy="2" r="1.5" />
    <circle cx="11.5" cy="2" r="1.5" />
  </svg>
);

const Separator = () => (
  <span className="shrink-0 text-[var(--color-neutral-black)]" aria-hidden="true">
    <ChevronRight />
  </span>
);

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, maxVisible = 3, className, ...props }, ref) => {
    const isOverflow = items.length > maxVisible;
    const hiddenItems = isOverflow ? items.slice(1, items.length - 1) : [];

    const linkClass =
      'text-[14px] leading-[1.6] font-normal text-[var(--color-neutral-black)] hover:underline hover:underline-offset-2 py-px whitespace-nowrap';
    const currentClass =
      'text-[14px] leading-[1.6] font-semibold text-[var(--color-neutral-black)] py-px whitespace-nowrap';

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cx('font-[var(--font-primary)]', className)}
        {...props}
      >
        <ol className="flex items-center flex-wrap">
          {isOverflow ? (
            <>
              {/* First item */}
              <li className="flex items-center gap-[2px]">
                <a href={items[0].href} className={linkClass}>
                  {items[0].label}
                </a>
                <Separator />
              </li>

              {/* Ellipsis with hover dropdown */}
              <li className="group relative flex items-center gap-[2px]">
                <span
                  aria-label="Show more breadcrumbs"
                  className="flex items-center justify-center w-4 h-4 text-[var(--color-neutral-black)] hover:text-[var(--color-text-link)] cursor-default"
                >
                  <DotsIcon />
                </span>
                <div className="absolute top-full left-0 pt-1 min-w-[165px] invisible group-hover:visible z-10">
                  <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-[var(--border-radius-base)] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.08)]">
                    {hiddenItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="block px-6 py-1 text-[14px] font-normal leading-[1.6] text-[var(--color-neutral-black)] hover:underline hover:underline-offset-2 whitespace-nowrap"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
                <Separator />
              </li>

              {/* Last item — current page */}
              <li>
                <span className={currentClass} aria-current="page">
                  {items[items.length - 1].label}
                </span>
              </li>
            </>
          ) : (
            items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={index} className="flex items-center gap-[2px]">
                  {isLast ? (
                    <span className={currentClass} aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <a href={item.href} className={linkClass}>
                        {item.label}
                      </a>
                      <Separator />
                    </>
                  )}
                </li>
              );
            })
          )}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
