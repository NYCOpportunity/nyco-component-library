import * as React from 'react';
import { AccordionProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';

const PlusIcon = ({ rotate }: { rotate?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={rotate ? 'rotate-45 transition-transform' : 'transition-transform'}
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
    const { flashing, handlePointerDown } = useFlash(disabled);

    const toggle = () => {
      if (disabled) return;
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const isInPageNav = variant === 'in-page-nav';

    return (
      <div
        ref={ref}
        className={cx(
          'bg-[var(--color-bg-primary)] border border-[var(--color-border-default)] rounded-[var(--border-radius-base)] max-[999px]:rounded-lg overflow-hidden w-full flex flex-col',
          disabled && 'opacity-40 pointer-events-none',
          className
        )}
      >
        <button
          type="button"
          onClick={toggle}
          onPointerDown={handlePointerDown}
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={disabled}
          className={cx(
            'flex items-center justify-between w-full text-left px-6 py-4 max-[999px]:p-4 [@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] [@media(hover:hover)]:transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-[var(--color-border-focus)] disabled:cursor-not-allowed',
            flashing && '[@media(hover:none)]:bg-[var(--color-neutral-100)]'
          )}
        >
          <span className="component-accordion-title text-[var(--color-neutral-black)]">
            {title}
          </span>
          <span className="shrink-0 text-[var(--color-neutral-black)]">
            <PlusIcon rotate={isOpen} />
          </span>
        </button>

        {isOpen && (
          <div className="h-px bg-[var(--color-border-default)] shrink-0" aria-hidden="true" />
        )}

        {isOpen && isInPageNav && (
          <nav
            id={panelId}
            aria-label={title}
            className="flex flex-col px-6 max-[999px]:px-4 pt-4 pb-6 w-full shrink-0"
          >
            {items.map((item, index) => (
              <div key={index} className="flex items-stretch w-full">
                <div
                  className={cx(
                    'shrink-0 w-[2px]',
                    item.active
                      ? 'bg-[var(--color-neutral-black)]'
                      : 'bg-[var(--color-neutral-300)]'
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-1 items-center px-4 py-3">
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className={cx(
                        'flex-1 component-nav-inpage-item',
                        item.active
                          ? 'text-[var(--color-neutral-black)]'
                          : 'text-[var(--color-neutral-700)] [@media(hover:hover)]:hover:text-[var(--color-neutral-black)] transition-colors'
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
            className="body-regular text-[var(--color-neutral-black)] px-6 max-[999px]:px-4 pt-4 pb-6 w-full shrink-0"
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
