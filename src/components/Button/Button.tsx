import * as React from 'react';
import { ButtonProps, ButtonSize, ButtonVariant } from '../../types/components';
import { useFlash } from '../../hooks/useFlash';

const baseClasses =
  'inline-flex items-center justify-center gap-1 [@media(hover:hover)]:transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px] disabled:pointer-events-none';

const sizeClasses: Record<ButtonSize, string> = {
  large:
    'px-6 py-4 text-[18px] leading-[22px] font-semibold max-[999px]:px-4 max-[999px]:py-3 max-[999px]:text-[14px] max-[999px]:leading-[20px]',
  small: 'px-4 py-3 text-[14px] leading-[20px] font-semibold',
};

// Link/text variant — minimal padding, font size still responsive
const linkSizeClasses: Record<ButtonSize, string> = {
  large:
    'px-1 py-1 text-[18px] leading-[22px] font-semibold max-[999px]:text-[14px] max-[999px]:leading-[20px]',
  small: 'px-1 py-1 text-[14px] leading-[20px] font-semibold',
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  large: 'size-[54px] max-[999px]:size-[44px]',
  small: 'size-[44px]',
};

const radiusClass = 'rounded-[var(--border-radius-base)]';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-button-primary-base)] text-[var(--color-primary-foreground)] border border-transparent [@media(hover:hover)]:hover:bg-[var(--color-button-primary-hover)] disabled:bg-[var(--color-button-disabled-base)] disabled:text-[var(--color-button-disabled-text)] disabled:border-transparent',
  secondary:
    'bg-[var(--color-button-secondary-base)] text-[var(--color-neutral-black)] border border-[var(--color-border-default)] [@media(hover:hover)]:hover:bg-[var(--color-button-secondary-hover)] disabled:bg-[var(--color-button-disabled-base)] disabled:text-[var(--color-button-disabled-text)] disabled:border-transparent',
  text: 'bg-transparent text-[var(--color-text-link)] no-underline [@media(hover:hover)]:hover:underline [@media(hover:hover)]:hover:underline-offset-2 disabled:text-[var(--color-button-disabled-text)] disabled:no-underline',
};

const flashClasses: Record<ButtonVariant, string> = {
  primary: '[@media(hover:none)]:bg-[var(--color-button-primary-hover)]',
  secondary: '[@media(hover:none)]:bg-[var(--color-button-secondary-hover)]',
  text: '[@media(hover:none)]:underline [@media(hover:none)]:underline-offset-2',
};

const cx = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(' ');

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'large',
      className,
      type = 'button',
      startIcon,
      endIcon,
      iconOnly = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const { flashing, handlePointerDown } = useFlash(disabled);

    const classes = cx(
      baseClasses,
      iconOnly
        ? iconOnlySizeClasses[size]
        : variant === 'text'
          ? linkSizeClasses[size]
          : sizeClasses[size],
      radiusClass,
      variantClasses[variant],
      flashing && flashClasses[variant],
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {startIcon && <span className="inline-flex shrink-0">{startIcon}</span>}
        {children}
        {endIcon && <span className="inline-flex shrink-0">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
