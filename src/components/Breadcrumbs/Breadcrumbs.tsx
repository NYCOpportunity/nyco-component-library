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
  ({ items, className, ...props }, ref) => {
    // Hidden probe — always renders the full list to measure natural width.
    // Compares probe scrollWidth vs nav clientWidth to detect overflow.
    const probeRef = React.useRef<React.ElementRef<'ol'>>(null);
    const [isOverflow, setIsOverflow] = React.useState(false);

    React.useLayoutEffect(() => {
      const probe = probeRef.current;
      if (!probe) return;
      const nav = probe.parentElement;
      if (!nav) return;

      const check = () => setIsOverflow(probe.scrollWidth > nav.clientWidth);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, [items]);

    const hiddenItems = isOverflow ? items.slice(1, items.length - 1) : [];

    // Parent links are semibold (clickable); current page (last) is regular weight
    const linkClass =
      'ui-14-bold text-[var(--color-neutral-black)] hover:underline hover:underline-offset-2 py-px whitespace-nowrap';
    const currentClass = 'ui-14-regular text-[var(--color-neutral-black)] py-px whitespace-nowrap';
    // Single item is the current page with no parent links — keep it prominent
    const soloClass = 'ui-14-bold text-[var(--color-neutral-black)] py-px whitespace-nowrap';

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cx('font-[var(--font-primary)] relative', className)}
        {...props}
      >
        {/* Hidden probe — measures full-list width to detect container overflow */}
        <ol
          ref={probeRef}
          aria-hidden="true"
          className="absolute invisible pointer-events-none flex items-center flex-nowrap"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-[2px]">
                {isLast ? (
                  <span className={items.length === 1 ? soloClass : currentClass}>
                    {item.label}
                  </span>
                ) : (
                  <>
                    <a href={item.href} className={linkClass} tabIndex={-1}>
                      {item.label}
                    </a>
                    <Separator />
                  </>
                )}
              </li>
            );
          })}
        </ol>

        {/* Visible list */}
        <ol className="flex items-center flex-nowrap">
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
                  className="flex items-end justify-center w-4 h-4 text-[var(--color-neutral-black)] hover:text-[var(--color-text-link)] cursor-default"
                >
                  <DotsIcon />
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[165px] invisible group-hover:visible z-10">
                  <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-[var(--border-radius-base)] shadow-[0px_4px_15px_0px_rgba(25,25,25,0.08)]">
                    {hiddenItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="block px-6 py-1 ui-14-regular text-[var(--color-neutral-black)] hover:underline hover:underline-offset-2 whitespace-nowrap"
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
                    <span
                      className={items.length === 1 ? soloClass : currentClass}
                      aria-current="page"
                    >
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
