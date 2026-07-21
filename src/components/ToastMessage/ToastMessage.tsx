import * as React from 'react';
import { ToastMessageProps, ToastMessageType } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { Icon } from '../Icon';

// ---------------------------------------------------------------------------
// Figma design tokens (Global Design System — "Toasts")
//
// Shell:       flex items-center p-[12px] rounded-[8px]
// Content:     flex gap-[8px] items-start
// Left group:  flex gap-[12px] items-start (icon + text column)
// Icon:        24px, colored with the type's base color
// Title:       Public Sans SemiBold 18px / 1.5, color --color-neutral-black
// Description: Public Sans Regular 18px / 1.5, color --color-neutral-black
// Close:       22px icon button
//
// Background per type uses the existing --color-{type}-light tokens.
// ---------------------------------------------------------------------------

interface TypeStyle {
  /** Tailwind background utility using the design-system token. */
  bg: string;
  /** Icon color (CSS value) sourced from the design-system token. */
  iconColor: string;
}

const TYPE_STYLES: Record<ToastMessageType, TypeStyle> = {
  info: {
    bg: 'bg-[var(--color-info-light)]',
    iconColor: 'var(--color-info-dark)',
  },
  success: {
    bg: 'bg-[var(--color-success-light)]',
    iconColor: 'var(--color-success-dark)',
  },
  warning: {
    bg: 'bg-[var(--color-warning-light)]',
    iconColor: 'var(--color-warning-dark)',
  },
  error: {
    bg: 'bg-[var(--color-error-light)]',
    iconColor: 'var(--color-error-dark)',
  },
};

// ---------------------------------------------------------------------------
// Severity icons — 24px, drawn with currentColor so the type color applies.
// ---------------------------------------------------------------------------

function InfoIcon() {
  // Figma node 9024:119833 — 20×20 vector inset 8.33% (2px) within a 24px box.
  return <Icon name="info-circle" />;
}

function SuccessIcon() {
  // Figma node 9024:119641 — 24×24 check glyph.
  return <Icon name="success" />;
}

function WarningIcon() {
  // Figma node 9024:119731 — 20.5269×18 triangle, inset 12.5%/7.24% within a 24px box.
  return <Icon name="warning" />;
}

const TYPE_ICONS: Record<ToastMessageType, () => React.JSX.Element> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: InfoIcon,
};

// ---------------------------------------------------------------------------
// Close icon — 22px, matches Figma "close_small".
// ---------------------------------------------------------------------------
// function CloseIcon() {
//   return (
//     <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
//       <path
//         d="M6 6L16 16M16 6L6 16"
//         stroke="currentColor"
//         strokeWidth="1.75"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

function CloseIcon() {
  return <Icon name="close-small" size={23} />;
}

/**
 * ToastMessage — a compact, dismissible status banner.
 *
 * Renders one of four severities (`info`, `success`, `warning`, `error`), each with its own
 * background color and leading icon. Supports a bold title, a description, or both, plus an
 * optional close button. Announces itself to assistive technology via an ARIA live region.
 */
export function ToastMessage({
  type = 'info',
  title,
  description,
  showIcon = true,
  icon,
  dismissible = true,
  onClose,
  closeLabel = 'Dismiss',
  role,
  className,
  style,
}: ToastMessageProps) {
  const { flashing, handlePointerDown } = useFlash(false);

  const typeStyle = TYPE_STYLES[type];
  const TypeIcon = TYPE_ICONS[type];

  // info/success are non-urgent (polite); warning/error are urgent (assertive).
  const resolvedRole = role ?? (type === 'warning' || type === 'error' ? 'alert' : 'status');
  const ariaLive = resolvedRole === 'alert' ? 'assertive' : 'polite';

  return (
    <div
      role={resolvedRole}
      aria-live={ariaLive}
      className={cx(
        'flex h-fit w-full max-w-[360px] items-start rounded-[8px] p-[12px]',
        typeStyle.bg,
        className
      )}
      style={style}
    >
      <div className="flex w-full items-start gap-[8px]">
        <div className="flex min-w-0 flex-1 items-start gap-[12px]">
          {(showIcon || icon) && (
            <span
              className="flex size-[24px] shrink-0 items-center justify-center"
              style={{ color: typeStyle.iconColor }}
            >
              {icon ?? <TypeIcon />}
            </span>
          )}

          <div className="flex min-w-0 flex-1 flex-col items-start">
            {title != null && title !== '' && (
              <p className="m-0 w-full break-words text-left font-primary text-[18px] font-semibold leading-[1.5] text-[var(--color-neutral-black)]">
                {title}
              </p>
            )}
            {description != null && description !== '' && (
              <p className="m-0 w-full break-words text-left font-primary text-[18px] font-normal leading-[1.5] text-[var(--color-neutral-black)]">
                {description}
              </p>
            )}
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            onPointerDown={handlePointerDown}
            className={cx(
              'flex shrink-0 items-center justify-center rounded-full px-[4px] pb-[4px] pt-[2px] text-[var(--color-neutral-black)]',
              'cursor-pointer [@media(hover:hover)]:transition-colors',
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
              '[@media(hover:hover)]:hover:opacity-70',
              flashing && '[@media(hover:none)]:opacity-70'
            )}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
}
