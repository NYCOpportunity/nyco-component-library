import * as React from 'react';
import { InputFieldProps } from '../../types/components';
import { cx } from '../../utils/cx';

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      helperText,
      errorText,
      showClearButton = false,
      onClear,
      variant = 'outlined',
      id,
      className,
      disabled,
      type = 'text',
      onFocus,
      onBlur,
      ...inputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const genId = React.useId();
    const inputId = id ?? genId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const hasError = !!errorText;
    const hasHelper = !!helperText;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Only show the focus ring for keyboard navigation (not mouse clicks)
      if (e.target.matches(':focus-visible')) {
        setIsFocused(true);
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Determine if the clear button should be visible
    const showClear =
      showClearButton &&
      !disabled &&
      typeof inputProps.value === 'string' &&
      inputProps.value.length > 0;

    // ------------------------------------------------------------------
    // Entry field container classes
    // ------------------------------------------------------------------
    const shapeClass =
      variant === 'outlined'
        ? 'rounded-[8px] border'
        : 'border-b-2 border-x-0 border-t-0 rounded-none';

    const entryFieldClasses = cx(
      'flex items-center w-full overflow-hidden transition-colors',
      shapeClass,
      // Disabled — static muted appearance, no interaction states
      disabled && 'bg-[var(--color-neutral-white)] border-[var(--color-neutral-200)]',
      // Focused — white bg, border turns focus-blue
      !disabled &&
        isFocused &&
        'bg-[var(--color-neutral-white)] border-[var(--color-border-focus)]',
      // Normal (idle) — white bg, default border, hover fills with neutral-100 and hides border
      !disabled &&
        !isFocused &&
        [
          'bg-[var(--color-neutral-white)]',
          hasError ? 'border-[var(--color-border-error)]' : 'border-[var(--color-border-default)]',
          '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] [@media(hover:hover)]:hover:border-transparent',
        ].join(' ')
    );

    const inputClasses = cx(
      'flex-1 min-w-0 text-[16px] leading-[1.5] font-normal bg-transparent outline-none',
      variant === 'outlined' ? 'px-[16px] py-[16px]' : 'pb-[4px] pr-[12px]',
      disabled
        ? 'text-[var(--color-neutral-200)] cursor-not-allowed placeholder:text-[var(--color-neutral-200)]'
        : 'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]'
    );

    // aria-describedby includes both error and helper ids when both are present
    const describedBy =
      [hasError && errorId, hasHelper && helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cx('flex flex-col gap-[4px] items-start w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="w-full pr-[16px] text-[16px] leading-[1.5] font-normal text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <div className={entryFieldClasses}>
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            aria-describedby={describedBy}
            aria-invalid={hasError || undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...inputProps}
          />
          {showClear && (
            <button
              type="button"
              onClick={onClear}
              className={cx(
                'shrink-0 mr-[12px] flex items-center justify-center w-[24px] h-[24px] rounded-full transition-colors',
                'text-[var(--color-neutral-900)]',
                '[@media(hover:hover)]:hover:bg-[var(--color-neutral-200)]',
                'active:bg-[var(--color-neutral-300)]',
                'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[var(--color-border-focus)]'
              )}
              aria-label="Clear input"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-[18px] h-[18px]"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Error and helper text — both shown simultaneously when both are provided */}
        {hasError && (
          <p
            id={errorId}
            className="w-full px-[16px] text-[14px] leading-[1.6] font-normal text-[var(--color-error-base)]"
          >
            {errorText}
          </p>
        )}
        {hasHelper && (
          <p
            id={helperId}
            className="w-full px-[16px] text-[14px] leading-[1.6] font-normal text-[var(--color-text-secondary)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
