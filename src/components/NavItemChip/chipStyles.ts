// Shared Tailwind classes used by both NavItemChip and NavItemChipDropdown.
// Keeping them in one place ensures visual consistency between the two components.

export const chipBase = [
  '[font-family:var(--font-primary)]',
  'inline-flex items-center gap-[6px]',
  'rounded-[8px] border',
  'px-[12px] py-[8px]',
  // Same font size as NavItem (body-regular)
  'text-[18px] leading-[1.5] font-normal whitespace-nowrap',
  'cursor-pointer no-underline select-none',
  '[@media(hover:hover)]:transition-colors',
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-[2px]',
  'disabled:opacity-40 disabled:pointer-events-none',
].join(' ');

export const chipDefault = [
  'bg-transparent border-transparent text-[var(--color-neutral-black)]',
  '[@media(hover:hover)]:hover:bg-[var(--color-neutral-100)]',
  'active:bg-[var(--color-neutral-200)]',
].join(' ');

// Active/selected: light grey highlight, no border, no color
export const chipActive = [
  'bg-[var(--color-neutral-200)] border-transparent text-[var(--color-neutral-black)]',
  '[@media(hover:hover)]:hover:bg-[var(--color-neutral-300)]',
  'active:bg-[var(--color-neutral-300)]',
].join(' ');

// Touch press flash — fires on all devices via useFlash
export const chipFlashing = 'bg-[var(--color-neutral-200)]';
export const chipFlashingActive = 'bg-[var(--color-neutral-300)]';
