import * as React from 'react';
import { InputFieldProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon';

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      helperText,
      errorText,
      showError = true,
      showClearButton = false,
      onClear,
      variant = 'outlined',
      id,
      className,
      disabled,
      required,
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

    const hasError = showError && !!errorText;
    const hasHelper = !!helperText;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Figma "select/focus" state applies on focus regardless of input method.
      setIsFocused(true);
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
      'flex items-center w-full overflow-hidden',
      shapeClass,
      // Disabled — lighter muted state (aligned with ListItem disabled tone).
      disabled && 'bg-[var(--color-neutral-100)] border-[var(--color-border-default)]',
      // Focused — visually thicker without changing layout (drawn outside).
      !disabled &&
        isFocused &&
        cx(
          'bg-[var(--color-neutral-white)]',
          variant === 'outlined'
            ? [
                'outline outline-[2px] outline-offset-0',
                hasError
                  ? 'border-[var(--color-border-error)] outline-[var(--color-border-error)]'
                  : 'border-[var(--color-border-focus)] outline-[var(--color-border-focus)]',
              ].join(' ')
            : [
                'border-b-2',
                hasError
                  ? 'border-[var(--color-border-error)] shadow-[0_1px_0_0_var(--color-border-error)]'
                  : 'border-[var(--color-border-focus)] shadow-[0_1px_0_0_var(--color-border-focus)]',
              ].join(' ')
        ),
      // Idle + hover states vary by variant in the Figma state grid.
      !disabled &&
        !isFocused &&
        cx(
          'bg-[var(--color-neutral-white)]',
          hasError ? 'border-[var(--color-border-error)]' : 'border-[var(--color-border-default)]',
          variant === 'outlined'
            ? hasError
              ? '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]'
              : '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)] [@media(hover:hover)]:hover:border-transparent'
            : hasError
              ? '[@media(hover:hover)]:hover:border-[var(--color-border-error)]'
              : '[@media(hover:hover)]:hover:border-[var(--color-neutral-700)]'
        )
    );

    const inputClasses = cx(
      'flex-1 min-w-0 text-[16px] leading-[1.5] font-normal bg-transparent outline-none',
      variant === 'outlined' ? 'px-[16px] py-[16px]' : 'pb-[8px] pr-[12px]',
      disabled
        ? 'text-[var(--color-neutral-300)] cursor-not-allowed placeholder:text-[var(--color-neutral-300)]'
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
            {required && (
              <>
                <span aria-hidden="true" className="text-[var(--color-error-base)]">
                  {' '}
                  *
                </span>
                <span className="sr-only"> required</span>
              </>
            )}
          </label>
        )}

        <div className={entryFieldClasses}>
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-describedby={describedBy}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
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
              <Icon name="close-thin" className="h-[18px] w-[18px]" />
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
