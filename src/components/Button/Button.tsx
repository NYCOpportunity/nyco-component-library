import * as React from 'react';
import { ButtonColor, ButtonProps, ButtonVariant } from '../../types/components';

const baseClasses =
  'inline-flex items-center justify-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] disabled:pointer-events-none';

const sizeClass =
  'px-6 py-4 text-[18px] leading-[22px] font-semibold max-[999px]:px-4 max-[999px]:py-3 max-[999px]:text-[14px] max-[999px]:leading-[20px]';

const iconOnlySizeClass = 'size-[54px] max-[999px]:size-[44px]';

const radiusClass = 'rounded-[var(--border-radius-base)]';

const colorVariantClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    contained:
      'bg-[var(--color-button-primary-base)] text-[var(--color-primary-foreground)] border border-transparent hover:bg-[var(--color-button-primary-hover)] disabled:bg-[var(--color-button-disabled-base)] disabled:text-[var(--color-button-disabled-text)] disabled:border-transparent',
    outlined:
      'bg-transparent text-[var(--color-primary-base)] border border-[var(--color-primary-base)] hover:bg-[var(--color-primary-light)] disabled:opacity-40',
    text: 'bg-transparent text-[var(--color-primary-base)] hover:bg-[var(--color-primary-light)] disabled:opacity-40',
  },
  secondary: {
    contained:
      'bg-[var(--color-button-secondary-base)] text-[var(--color-neutral-black)] border border-[var(--color-border-default)] hover:bg-[var(--color-button-secondary-hover)] disabled:bg-[var(--color-button-disabled-base)] disabled:text-[var(--color-button-disabled-text)] disabled:border-transparent',
    outlined:
      'bg-transparent text-[var(--color-secondary-base)] border border-[var(--color-secondary-base)] hover:bg-[var(--color-secondary-light)] disabled:opacity-40',
    text: 'bg-transparent text-[var(--color-secondary-base)] hover:bg-[var(--color-secondary-light)] disabled:opacity-40',
  },
};

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      className,
      type = 'button',
      startIcon,
      endIcon,
      iconOnly = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cx(
      baseClasses,
      iconOnly ? iconOnlySizeClass : sizeClass,
      radiusClass,
      colorVariantClasses[color][variant],
      className
    );

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {startIcon && <span className="inline-flex shrink-0">{startIcon}</span>}
        {children}
        {endIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
