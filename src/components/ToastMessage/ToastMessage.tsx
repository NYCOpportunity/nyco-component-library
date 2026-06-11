import * as React from 'react';
import { ToastMessageProps, ToastMessageType } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';

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
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        transform="translate(2 2)"
        d="M10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14V10C11 9.71667 10.9042 9.47917 10.7125 9.2875C10.5208 9.09583 10.2833 9 10 9C9.71667 9 9.47917 9.09583 9.2875 9.2875C9.09583 9.47917 9 9.71667 9 10V14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15ZM10 7C10.2833 7 10.5208 6.90417 10.7125 6.7125C10.9042 6.52083 11 6.28333 11 6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6C9 6.28333 9.09583 6.52083 9.2875 6.7125C9.47917 6.90417 9.71667 7 10 7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SuccessIcon() {
  // Figma node 9024:119641 — 24×24 check glyph.
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.55 14.9467L17.9174 6.57935C18.1453 6.35145 18.4157 6.2375 18.7285 6.2375C19.0414 6.2375 19.3118 6.35145 19.5397 6.57935C19.7676 6.80725 19.8815 7.07763 19.8815 7.3905C19.8815 7.70335 19.7676 7.97372 19.5397 8.20162L10.3516 17.3897C10.1237 17.6176 9.85652 17.7315 9.55 17.7315C9.24348 17.7315 8.97627 17.6176 8.74837 17.3897L4.46033 13.1016C4.23243 12.8737 4.12164 12.6033 4.12798 12.2905C4.13433 11.9776 4.25145 11.7073 4.47935 11.4794C4.70725 11.2515 4.97763 11.1375 5.2905 11.1375C5.60335 11.1375 5.87373 11.2515 6.10163 11.4794L9.55 14.9467Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WarningIcon() {
  // Figma node 9024:119731 — 20.5269×18 triangle, inset 12.5%/7.24% within a 24px box.
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        transform="translate(1.737 3)"
        d="M0.988461 18C0.805128 18 0.638462 17.9542 0.488462 17.8625C0.338462 17.7708 0.221795 17.65 0.138462 17.5C0.0551282 17.35 0.00929487 17.1875 0.000961538 17.0125C-0.0073718 16.8375 0.0384615 16.6667 0.138462 16.5L9.38846 0.5C9.48846 0.333333 9.61763 0.208333 9.77596 0.125C9.9343 0.0416667 10.0968 0 10.2635 0C10.4301 0 10.5926 0.0416667 10.751 0.125C10.9093 0.208333 11.0385 0.333333 11.1385 0.5L20.3885 16.5C20.4885 16.6667 20.5343 16.8375 20.526 17.0125C20.5176 17.1875 20.4718 17.35 20.3885 17.5C20.3051 17.65 20.1885 17.7708 20.0385 17.8625C19.8885 17.9542 19.7218 18 19.5385 18H0.988461ZM2.71346 16H17.8135L10.2635 3L2.71346 16ZM10.2635 15C10.5468 15 10.7843 14.9042 10.976 14.7125C11.1676 14.5208 11.2635 14.2833 11.2635 14C11.2635 13.7167 11.1676 13.4792 10.976 13.2875C10.7843 13.0958 10.5468 13 10.2635 13C9.98013 13 9.74263 13.0958 9.55096 13.2875C9.35929 13.4792 9.26346 13.7167 9.26346 14C9.26346 14.2833 9.35929 14.5208 9.55096 14.7125C9.74263 14.9042 9.98013 15 10.2635 15ZM10.2635 12C10.5468 12 10.7843 11.9042 10.976 11.7125C11.1676 11.5208 11.2635 11.2833 11.2635 11V8C11.2635 7.71667 11.1676 7.47917 10.976 7.2875C10.7843 7.09583 10.5468 7 10.2635 7C9.98013 7 9.74263 7.09583 9.55096 7.2875C9.35929 7.47917 9.26346 7.71667 9.26346 8V11C9.26346 11.2833 9.35929 11.5208 9.55096 11.7125C9.74263 11.9042 9.98013 12 10.2635 12Z"
        fill="currentColor"
      />
    </svg>
  );
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
  return (
    <svg width={23} height={23} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        transform="translate(6.806 6.829)"
        d="M4.19375 5.45417L1.53542 8.1125C1.36736 8.28056 1.15347 8.36458 0.89375 8.36458C0.634028 8.36458 0.420139 8.28056 0.252083 8.1125C0.0840278 7.94444 0 7.73056 0 7.47083C0 7.21111 0.0840278 6.99722 0.252083 6.82917L2.91042 4.17083L0.252083 1.53542C0.0840278 1.36736 0 1.15347 0 0.89375C0 0.634028 0.0840278 0.420139 0.252083 0.252083C0.420139 0.0840278 0.634028 0 0.89375 0C1.15347 0 1.36736 0.0840278 1.53542 0.252083L4.19375 2.91042L6.82917 0.252083C6.99722 0.0840278 7.21111 0 7.47083 0C7.73056 0 7.94444 0.0840278 8.1125 0.252083C8.29583 0.435417 8.3875 0.653125 8.3875 0.905208C8.3875 1.15729 8.29583 1.36736 8.1125 1.53542L5.45417 4.17083L8.1125 6.82917C8.28056 6.99722 8.36458 7.21111 8.36458 7.47083C8.36458 7.73056 8.28056 7.94444 8.1125 8.1125C7.92917 8.29583 7.71146 8.3875 7.45938 8.3875C7.20729 8.3875 6.99722 8.29583 6.82917 8.1125L4.19375 5.45417Z"
        fill="currentColor"
      />
    </svg>
  );
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
        'flex h-fit w-full items-start rounded-[8px] p-[12px]',
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
              <p className="m-0 w-full break-words font-primary text-[18px] font-semibold leading-[1.5] text-[var(--color-neutral-black)]">
                {title}
              </p>
            )}
            {description != null && description !== '' && (
              <p className="m-0 w-full break-words font-primary text-[18px] font-normal leading-[1.5] text-[var(--color-neutral-black)]">
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
