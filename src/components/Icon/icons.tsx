import * as React from 'react';

// ---------------------------------------------------------------------------
// Icon registry
//
// Central catalogue of every SVG icon used across the component library.
// Each entry stores its own `viewBox` plus the inner SVG markup, with fills
// and strokes normalised to `currentColor` so an icon inherits the surrounding
// text color. The <Icon> component supplies the wrapping <svg> element.
// ---------------------------------------------------------------------------

export interface IconDefinition {
  /** Human-readable label shown in the Storybook gallery. */
  label: string;
  /** SVG viewBox for this glyph. */
  viewBox: string;
  /** Inner SVG markup (paths, circles, …). */
  content: React.ReactNode;
}

export const icons = {
  add: {
    label: 'Add',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  check: {
    label: 'Check',
    viewBox: '0 0 24 24',
    content: (
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
    ),
  },
  'checkbox-blank': {
    label: 'Checkbox (blank)',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        fill="currentColor"
      />
    ),
  },
  'checkbox-checked': {
    label: 'Checkbox (checked)',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        fill="currentColor"
      />
    ),
  },
  'radio-blank': {
    label: 'Radio (blank)',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill="currentColor"
      />
    ),
  },
  'radio-checked': {
    label: 'Radio (checked)',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill="currentColor"
      />
    ),
  },
  'chevron-up': {
    label: 'Chevron up',
    viewBox: '0 0 24 24',
    content: <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" fill="currentColor" />,
  },
  'chevron-down': {
    label: 'Chevron down',
    viewBox: '0 0 24 24',
    content: <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="currentColor" />,
  },
  'chevron-left': {
    label: 'Chevron left',
    viewBox: '0 0 24 24',
    content: <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />,
  },
  'chevron-right': {
    label: 'Chevron right',
    viewBox: '0 0 24 24',
    content: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />,
  },
  'chevron-right-thin': {
    label: 'Chevron right (thin)',
    viewBox: '0 0 16 16',
    content: (
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  close: {
    label: 'Close',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="currentColor"
      />
    ),
  },
  'close-thin': {
    label: 'Close (thin)',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  dots: {
    label: 'Dots (ellipsis)',
    viewBox: '0 0 13 4',
    content: (
      <>
        <circle cx="1.5" cy="2" r="1.5" fill="currentColor" />
        <circle cx="6.5" cy="2" r="1.5" fill="currentColor" />
        <circle cx="11.5" cy="2" r="1.5" fill="currentColor" />
      </>
    ),
  },
  'north-east': {
    label: 'North-east arrow',
    viewBox: '0 0 24 24',
    content: <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" fill="currentColor" />,
  },
  info: {
    label: 'Info',
    viewBox: '0 0 22 22',
    content: (
      <path
        d="M11 15.5833C11.2598 15.5833 11.4775 15.4954 11.6532 15.3197C11.8289 15.144 11.9167 14.9263 11.9167 14.6666V10.9999C11.9167 10.7402 11.8289 10.5225 11.6532 10.3468C11.4775 10.1711 11.2598 10.0833 11 10.0833C10.7403 10.0833 10.5226 10.1711 10.3469 10.3468C10.1712 10.5225 10.0834 10.7402 10.0834 10.9999V14.6666C10.0834 14.9263 10.1712 15.144 10.3469 15.3197C10.5226 15.4954 10.7403 15.5833 11 15.5833ZM11 8.24992C11.2598 8.24992 11.4775 8.16207 11.6532 7.98638C11.8289 7.81068 11.9167 7.59297 11.9167 7.33325C11.9167 7.07353 11.8289 6.85582 11.6532 6.68013C11.4775 6.50443 11.2598 6.41659 11 6.41659C10.7403 6.41659 10.5226 6.50443 10.3469 6.68013C10.1712 6.85582 10.0834 7.07353 10.0834 7.33325C10.0834 7.59297 10.1712 7.81068 10.3469 7.98638C10.5226 8.16207 10.7403 8.24992 11 8.24992ZM11 20.1666C9.73199 20.1666 8.54032 19.926 7.42504 19.4447C6.30976 18.9635 5.33962 18.3103 4.51462 17.4853C3.68962 16.6603 3.0365 15.6902 2.55525 14.5749C2.074 13.4596 1.83337 12.268 1.83337 10.9999C1.83337 9.73186 2.074 8.5402 2.55525 7.42492C3.0365 6.30964 3.68962 5.3395 4.51462 4.5145C5.33962 3.6895 6.30976 3.03638 7.42504 2.55513C8.54032 2.07388 9.73199 1.83325 11 1.83325C12.2681 1.83325 13.4598 2.07388 14.575 2.55513C15.6903 3.03638 16.6605 3.6895 17.4855 4.5145C18.3105 5.3395 18.9636 6.30964 19.4448 7.42492C19.9261 8.5402 20.1667 9.73186 20.1667 10.9999C20.1667 12.268 19.9261 13.4596 19.4448 14.5749C18.9636 15.6902 18.3105 16.6603 17.4855 17.4853C16.6605 18.3103 15.6903 18.9635 14.575 19.4447C13.4598 19.926 12.2681 20.1666 11 20.1666ZM11 18.3333C13.0473 18.3333 14.7813 17.6228 16.2021 16.202C17.623 14.7812 18.3334 13.0471 18.3334 10.9999C18.3334 8.9527 17.623 7.21867 16.2021 5.79784C14.7813 4.377 13.0473 3.66659 11 3.66659C8.95282 3.66659 7.21879 4.377 5.79796 5.79784C4.37712 7.21867 3.66671 8.9527 3.66671 10.9999C3.66671 13.0471 4.37712 14.7812 5.79796 16.202C7.21879 17.6228 8.95282 18.3333 11 18.3333Z"
        fill="currentColor"
      />
    ),
  },
  success: {
    label: 'Success (check circle)',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M9.55 14.9467L17.9174 6.57935C18.1453 6.35145 18.4157 6.2375 18.7285 6.2375C19.0414 6.2375 19.3118 6.35145 19.5397 6.57935C19.7676 6.80725 19.8815 7.07763 19.8815 7.3905C19.8815 7.70335 19.7676 7.97372 19.5397 8.20162L10.3516 17.3897C10.1237 17.6176 9.85652 17.7315 9.55 17.7315C9.24348 17.7315 8.97627 17.6176 8.74837 17.3897L4.46033 13.1016C4.23243 12.8737 4.12164 12.6033 4.12798 12.2905C4.13433 11.9776 4.25145 11.7073 4.47935 11.4794C4.70725 11.2515 4.97763 11.1375 5.2905 11.1375C5.60335 11.1375 5.87373 11.2515 6.10163 11.4794L9.55 14.9467Z"
        fill="currentColor"
      />
    ),
  },
  warning: {
    label: 'Warning',
    viewBox: '0 0 24 24',
    content: (
      <path
        transform="translate(1.737 3)"
        d="M0.988461 18C0.805128 18 0.638462 17.9542 0.488462 17.8625C0.338462 17.7708 0.221795 17.65 0.138462 17.5C0.0551282 17.35 0.00929487 17.1875 0.000961538 17.0125C-0.0073718 16.8375 0.0384615 16.6667 0.138462 16.5L9.38846 0.5C9.48846 0.333333 9.61763 0.208333 9.77596 0.125C9.9343 0.0416667 10.0968 0 10.2635 0C10.4301 0 10.5926 0.0416667 10.751 0.125C10.9093 0.208333 11.0385 0.333333 11.1385 0.5L20.3885 16.5C20.4885 16.6667 20.5343 16.8375 20.526 17.0125C20.5176 17.1875 20.4718 17.35 20.3885 17.5C20.3051 17.65 20.1885 17.7708 20.0385 17.8625C19.8885 17.9542 19.7218 18 19.5385 18H0.988461ZM2.71346 16H17.8135L10.2635 3L2.71346 16ZM10.2635 15C10.5468 15 10.7843 14.9042 10.976 14.7125C11.1676 14.5208 11.2635 14.2833 11.2635 14C11.2635 13.7167 11.1676 13.4792 10.976 13.2875C10.7843 13.0958 10.5468 13 10.2635 13C9.98013 13 9.74263 13.0958 9.55096 13.2875C9.35929 13.4792 9.26346 13.7167 9.26346 14C9.26346 14.2833 9.35929 14.5208 9.55096 14.7125C9.74263 14.9042 9.98013 15 10.2635 15ZM10.2635 12C10.5468 12 10.7843 11.9042 10.976 11.7125C11.1676 11.5208 11.2635 11.2833 11.2635 11V8C11.2635 7.71667 11.1676 7.47917 10.976 7.2875C10.7843 7.09583 10.5468 7 10.2635 7C9.98013 7 9.74263 7.09583 9.55096 7.2875C9.35929 7.47917 9.26346 7.71667 9.26346 8V11C9.26346 11.2833 9.35929 11.5208 9.55096 11.7125C9.74263 11.9042 9.98013 12 10.2635 12Z"
        fill="currentColor"
      />
    ),
  },
  search: {
    label: 'Search',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        fill="currentColor"
      />
    ),
  },
  menu: {
    label: 'Menu (hamburger)',
    viewBox: '0 0 24 24',
    content: <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />,
  },
  translate: {
    label: 'Translate',
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
        fill="currentColor"
      />
    ),
  },
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;

/** All icon names, sorted alphabetically — handy for galleries. */
export const iconNames = Object.keys(icons).sort() as IconName[];
