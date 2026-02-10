import * as React from 'react';
import {
  ButtonColor,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from '../../types/components';

const baseClasses =
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[length:var(--ui-font-sm)]',
  md: 'h-10 px-4 text-[length:var(--ui-font-md)]',
  lg: 'h-12 px-5 text-[length:var(--ui-font-lg)]',
};

const radiusClass = 'rounded-[var(--ui-radius)]';

const colorVariantClasses: Record<
  ButtonColor,
  Record<ButtonVariant, string>
> = {
  primary: {
    contained:
      'bg-[var(--ui-primary)] text-[var(--ui-primary-foreground)] border border-transparent',
    outlined:
      'bg-transparent text-[var(--ui-primary)] border border-[var(--ui-primary)]',
    text: 'bg-transparent text-[var(--ui-primary)]',
  },
  secondary: {
    contained:
      'bg-[var(--ui-secondary)] text-[var(--ui-secondary-foreground)] border border-transparent',
    outlined:
      'bg-transparent text-[var(--ui-secondary)] border border-[var(--ui-secondary)]',
    text: 'bg-transparent text-[var(--ui-secondary)]',
  },
};

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'md',
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const classes = cx(
      baseClasses,
      sizeClasses[size],
      radiusClass,
      colorVariantClasses[color][variant],
      className,
    );

    return <button ref={ref} type={type} className={classes} {...props} />;
  },
);

Button.displayName = 'Button';
