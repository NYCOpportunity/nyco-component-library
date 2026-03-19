import * as React from 'react';
import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '../../types/components';

const baseClasses =
  'inline-flex items-center justify-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[length:var(--font-size-sm)] font-medium',
  md: 'h-10 px-4 text-[length:var(--font-size-md)] font-medium',
  lg: 'px-6 py-4 text-[18px] leading-[22px] font-semibold',
};

const radiusClass = 'rounded-[var(--border-radius-base)]';

const colorVariantClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    contained:
      'bg-[var(--color-primary-base)] text-[var(--color-primary-foreground)] border border-transparent',
    outlined:
      'bg-transparent text-[var(--color-primary-base)] border border-[var(--color-primary-base)]',
    text: 'bg-transparent text-[var(--color-primary-base)]',
  },
  secondary: {
    contained:
      'bg-[var(--color-secondary-base)] text-[var(--color-secondary-foreground)] border border-transparent',
    outlined:
      'bg-transparent text-[var(--color-secondary-base)] border border-[var(--color-secondary-base)]',
    text: 'bg-transparent text-[var(--color-secondary-base)]',
  },
};

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'md',
      className,
      type = 'button',
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cx(
      baseClasses,
      sizeClasses[size],
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
