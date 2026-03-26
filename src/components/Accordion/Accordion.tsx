import * as React from 'react';
import { AccordionProps } from '../../types/components';

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(' ');

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      variant = 'accordion',
      children,
      items = [],
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : internalOpen;
    const panelId = React.useId();

    const toggle = () => {
      if (disabled) return;
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const isInPageNav = variant === 'in-page-nav';

    // -----------------------------------------------------------------------
    // Container classes — Figma exact spacing
    //
    // Accordion (all states): px-6 py-6 gap-4
    //   gap-4 is always set; it's only visible when open (divider + content).
    //
    // In-Page Nav (all states): px-6 py-6 gap-4
    // -----------------------------------------------------------------------
    const containerCx = cx(
      'bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-[var(--border-radius-base)]',
      'w-full flex flex-col px-6 py-6 gap-4',
      disabled && 'opacity-40 pointer-events-none',
      className
    );

    return (
      <div ref={ref} className={containerCx}>
        {/* ---------------------------------------------------------------- */}
        {/* Header button — always visible                                    */}
        {/* ---------------------------------------------------------------- */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={disabled}
          aria-disabled={disabled}
          className="flex items-center justify-between w-full text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px] rounded-[2px] disabled:cursor-not-allowed"
        >
          <span className="component-accordion-title text-[var(--color-neutral-black)]">
            {title}
          </span>
          <span className="shrink-0 text-[var(--color-neutral-black)]">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </span>
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Divider — direct sibling so container gap-4 gives 16px spacing   */}
        {/* ---------------------------------------------------------------- */}
        {isOpen && (
          <div
            className="h-px w-full bg-[var(--color-border-default)] shrink-0"
            aria-hidden="true"
          />
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Panel content — direct sibling of divider; gap-4 from container  */}
        {/* creates the 16px spacing (matches Figma gap-[16px] on container). */}
        {/* ---------------------------------------------------------------- */}
        {isOpen && isInPageNav && (
          <nav id={panelId} aria-label={title} className="flex flex-col pb-4 w-full shrink-0">
            {items.map((item, index) => (
              <div key={index} className="flex items-stretch w-full">
                {/* 2px left-edge stroke — black active, neutral-300 inactive */}
                <div
                  className={cx(
                    'shrink-0 w-[2px]',
                    item.active
                      ? 'bg-[var(--color-neutral-black)]'
                      : 'bg-[var(--color-neutral-300)]'
                  )}
                  aria-hidden="true"
                />
                {/* Tab label — px-4 py-3 = 16/12 matches Figma */}
                <div className="flex flex-1 items-center px-4 py-3">
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className={cx(
                        'flex-1 component-nav-inpage-item',
                        item.active
                          ? 'text-[var(--color-neutral-black)]'
                          : 'text-[var(--color-neutral-700)] hover:text-[var(--color-neutral-black)] transition-colors'
                      )}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      className={cx(
                        'flex-1 component-nav-inpage-item',
                        item.active
                          ? 'text-[var(--color-neutral-black)]'
                          : 'text-[var(--color-neutral-700)]'
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </nav>
        )}

        {isOpen && !isInPageNav && (
          <div
            id={panelId}
            role="region"
            aria-label={title}
            className="body-regular text-[var(--color-neutral-black)] w-full shrink-0"
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
