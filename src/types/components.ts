import * as React from 'react';

// *** Button Types ***
export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'large' | 'small';

// *** Breadcrumbs Types ***
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  /** Ordered list of breadcrumb items. The last item is treated as the current page. */
  items: BreadcrumbItem[];
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconOnly?: boolean;
}

// *** Accordion Types ***
export interface AccordionNavItem {
  /** Display label for the navigation item. */
  label: string;
  /** Optional href — renders the item as an anchor. */
  href?: string;
  /** Whether this item is the active/current item. */
  active?: boolean;
  /** Optional click handler — called when the item anchor is clicked. */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface AccordionProps {
  /** Accordion header title. */
  title: string;
  /**
   * `'accordion'` — standard expandable content panel.
   * `'in-page-nav'` — Table of Contents with navigation items.
   */
  variant?: 'accordion' | 'in-page-nav';
  /** Body content rendered when `variant="accordion"` and the panel is open. */
  children?: React.ReactNode;
  /** Navigation items rendered when `variant="in-page-nav"` and the panel is open. */
  items?: AccordionNavItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
  /** When true, prevents toggling and dims the component. */
  disabled?: boolean;
  className?: string;
}

// *** Divider Types ***
export interface DividerProps {
  /** `'horizontal'` spans full parent width (default). `'vertical'` spans full parent height. */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// *** Chip Types ***
export type ChipVariant = 'selectable' | 'dismissible';

export interface ChipProps {
  /** Text label displayed inside the chip. */
  label: string;
  /**
   * `'selectable'` (default) — toggles a highlighted/selected state on click.
   * `'dismissible'` — shows an × button that calls `onDismiss` to remove the chip.
   */
  variant?: ChipVariant;
  /**
   * Optional tooltip content. When provided an info icon appears inside the chip
   * and a tooltip is shown on hover / focus.
   * Only applicable to the `selectable` variant.
   */
  tooltip?: React.ReactNode;
  /** Optional bold title shown at the top of the tooltip. Only applicable to the `selectable` variant. */
  tooltipTitle?: string;
  /** Controlled selected state (selectable variant). */
  selected?: boolean;
  /** Initial selected state when uncontrolled (selectable variant). Defaults to `false`. */
  defaultSelected?: boolean;
  /** Called when the selected state should change (selectable variant). */
  onSelectedChange?: (selected: boolean) => void;
  /** Called when the chip is clicked (dismissible variant). The entire chip surface is the dismiss trigger. */
  onDismiss?: () => void;
  disabled?: boolean;
  className?: string;
}

// *** ChipGroup Types ***

/**
 * Context object passed to the `renderActions` render prop.
 * Use it to wire your custom buttons to ChipGroup's internal state.
 */
export interface ChipGroupActionsContext {
  /** Current draft selection (what the user has clicked — not yet committed in pending mode). */
  selected: string[];
  /** Commits the draft and fires `onApply`. Same as pressing the built-in Apply button. */
  apply: () => void;
  /** Reverts the draft to the last committed value. Same as pressing the built-in Clear button. */
  clear: () => void;
  /** Wipes both draft and committed to `[]` and fires `onChange`. */
  clearAll: () => void;
  /** `true` when draft differs from committed (only meaningful in `pending` mode). */
  isDirty: boolean;
}

/** A single option available in a ChipGroup. */
export interface ChipOption {
  /** Unique identifier — also used as the value in `value` / `onChange`. */
  value: string;
  /** Display label shown inside the chip. */
  label: string;
  /** Optional tooltip body text shown via the ⓘ icon. */
  tooltip?: string;
  /** Optional bold tooltip title. */
  tooltipTitle?: string;
  /** Prevents this option from being selected or dismissed. */
  disabled?: boolean;
}

export interface ChipGroupProps {
  /**
   * Metadata registry for all possible items — provides `label`, `tooltip`, and `disabled`
   * per `value` key. Used by both modes.
   *
   * - `multiselect`: all options are rendered as selectable chips.
   * - `dismissible`: only items whose `value` appears in `value` prop are rendered;
   *   `options` is used purely for label / tooltip lookup.
   */
  options: ChipOption[];
  /**
   * `'multiselect'` (default) — renders all options as selectable chips. Manages selection state.
   * Supports `pending` mode with Apply / Clear buttons.
   *
   * `'singleselect'` — same chip row, but only one option can be active at a time.
   * Clicking a chip selects it and deselects any previously active chip.
   * Clicking the active chip again deselects it (toggles off).
   * Always fires `onChange` immediately (no `pending` support).
   *
   * `'dismissible'` — renders only the currently active items (from `value`) as dismissible chips.
   * The source of which items are active is entirely external (e.g. a dropdown, URL params, API).
   * Clicking × fires `onChange` with the item removed.
   */
  mode?: 'multiselect' | 'singleselect' | 'dismissible';
  /**
   * When true, selection changes are buffered until the user clicks Apply.
   * Renders Apply / Clear buttons below the chips.
   * - Use `onApply` to receive the committed selection.
   * - Without `pending`, use `onChange` for live updates.
   */
  pending?: boolean;
  /** Controlled selection (array of `ChipOption.value`). */
  value?: string[];
  /** Uncontrolled initial selection. Defaults to `[]`. */
  defaultValue?: string[];
  /** Called on every selection change when `pending` is false. */
  onChange?: (selected: string[]) => void;
  /** Called when the Apply button is clicked (`pending` mode). Receives committed selection. */
  onApply?: (selected: string[]) => void;
  /** Override the Apply button label. Defaults to `"Apply"`. */
  applyLabel?: string;
  /** Override the Clear button label. Defaults to `"Clear"`. */
  clearLabel?: string;
  /**
   * Render prop that completely replaces the built-in action row with your own UI.
   * Receives a `ChipGroupActionsContext` object exposing current state and action handlers:
   *
   * ```tsx
   * renderActions={({ selected, apply, clear, clearAll, isDirty }) => (
   *   <>
   *     <Button onClick={apply} disabled={!isDirty}>Save ({selected.length})</Button>
   *     <Button variant="ghost" onClick={clearAll}>Reset</Button>
   *   </>
   * )}
   * ```
   *
   * When omitted, the built-in Apply / Clear (pending mode) or "Clear all" (live mode) is shown.
   */
  renderActions?: (ctx: ChipGroupActionsContext) => React.ReactNode;
  /**
   * Per-slot class name overrides. All slots already have sensible defaults —
   * use these to tweak layout without wrapping the component.
   *
   * | Slot | Default classes | Example use |
   * |---|---|---|
   * | `chips` | `flex flex-wrap gap-2` | `'flex-col'` for vertical stack |
   * | `actions` | `flex items-center gap-2 pt-1` | `'justify-end'` to right-align buttons |
   */
  componentStyle?: {
    /** The wrapping container of the chip row. Defaults to `flex flex-wrap gap-2`. */
    chipContainer?: string;
    /** Applied to every individual `Chip` inside the group via its `className` prop. */
    chip?: string;
    /** The Apply / Clear or "Clear all" button row. Defaults to `flex items-center gap-2 pt-1`. */
    actions?: string;
  };
  className?: string;
}

// *** Tooltip Types ***
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Text shown in the tooltip. */
  content: React.ReactNode;
  /** Optional bold title. When provided the tooltip renders in rich style. */
  title?: string;
  /** `'dark'` (default) — neutral-900 bg, white text. `'light'` — neutral-100 bg, black text. */
  mode?: 'light' | 'dark';
  /**
   * Preferred placement relative to the trigger.
   * Automatically flips when the tooltip would overflow the viewport — falls back to `'bottom'` as last resort.
   * Defaults to `'top'`.
   */
  placement?: TooltipPlacement;
  /** The element that triggers the tooltip on hover / focus. Defaults to the built-in info icon. */
  children?: React.ReactElement;
  className?: string;
}

// *** ListItem Types ***
export type ListItemType = 'standard' | 'multi-standard' | 'checkbox' | 'radio';

export interface ListItemProps {
  /** Main label text displayed in the list item. */
  label: string;
  /**
   * Small overline text (14px, neutral-700) rendered above the main label.
   * Only available on `'standard'` type.
   */
  primaryLabel?: string;
  /**
   * Small underline text (14px, neutral-700) rendered below the main label.
   * Only available on `'standard'` type.
   */
  secondaryLabel?: string;
  /**
   * Visual type of the list item:
   * - `'standard'` — plain text row, no selection icon (default)
   * - `'multi-standard'` — shows a checkmark on the right when selected
   * - `'checkbox'` — checkbox icon on the left, toggles on click
   * - `'radio'` — radio icon on the left, selects (does not deselect) on click
   */
  type?: ListItemType;
  /** Controlled selected state (for `multi-standard`, `checkbox`, and `radio` types). */
  selected?: boolean;
  /** Initial selected state when uncontrolled. Defaults to `false`. */
  defaultSelected?: boolean;
  /** Called when the selected state changes. */
  onSelectedChange?: (selected: boolean) => void;
  /** Called on every click (all types). */
  onClick?: () => void;
  disabled?: boolean;
  /** Tailwind classes applied to the root `<button>`. Use `hover:*` / `active:*` modifiers here,
   *  or CSS-variable overrides like `[--color-neutral-100:#e0f2fe]` to retheme hover/press colors. */
  className?: string;
  /**
   * Slot-level Tailwind class overrides.
   *
   * | Slot | What it targets | Example use |
   * |---|---|---|
   * | `icon` | Icon wrapper `<span>` (checkbox, radio, checkmark) | `'text-violet-600'` to change icon color |
   * | `label` | Main label `<span>` | `'font-semibold text-lg'` |
   * | `primaryLabel` | Overline text `<span>` | `'text-violet-400'` |
   * | `secondaryLabel` | Underline text `<span>` | `'italic'` |
   */
  slots?: {
    /** Icon wrapper `<span>`. Icons inherit `currentColor`, so `text-*` sets fill color. */
    icon?: string;
    /** Main label `<span>`. */
    label?: string;
    /** Overline text `<span>` — visible only when `primaryLabel` is provided. */
    primaryLabel?: string;
    /** Underline text `<span>` — visible only when `secondaryLabel` is provided. */
    secondaryLabel?: string;
  };
}

// *** Footer Types ***

/** A single link inside a footer link column. */
export interface FooterLink {
  /** Visible label text. */
  label: string;
  /** When provided, renders as an `<a>` element. */
  href?: string;
  /** Renders the label in semibold. Used for column headings like "311", "Website feedback". */
  bold?: boolean;
  /** Opens in a new tab and adds `rel="noopener noreferrer"`. */
  external?: boolean;
  /** Click handler. */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

/** A vertical column of footer links. */
export interface FooterLinkGroup {
  links: FooterLink[];
}

export interface FooterProps {
  /**
   * Logo rendered in the top-left of the footer.
   * Accepts any React node — typically a logo mark + wordmark.
   */
  logo?: React.ReactNode;
  /**
   * Site navigation link groups for the top white section.
   * Each group becomes one column. Desktop: up to 3 columns. Mobile: stacked.
   */
  siteNavGroups?: FooterLinkGroup[];
  /**
   * Heading for the CTA / newsletter sign-up block.
   * Example: "Receive updates about the Workforce Data Portal".
   */
  connectTitle?: string;
  /**
   * Label for the CTA button. Defaults to `"Sign up"`.
   */
  connectButtonLabel?: string;
  /** Called when the CTA button is clicked. Providing this prop renders the button. */
  onConnectClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Heading for the nyc.gov links section. Defaults to `"More on nyc.gov"`.
   */
  nycSectionTitle?: string;
  /**
   * NYC.gov link groups for the bottom neutral-100 section.
   * Desktop: up to 3 columns. Mobile: stacked.
   */
  nycLinkGroups?: FooterLinkGroup[];
  /** Copyright line rendered at the very bottom. */
  copyright?: string;
  className?: string;
}

// *** NavDrawer Types ***
export interface NavDrawerProps {
  /** Whether the drawer is visible. */
  isOpen: boolean;
  /** Called when the drawer requests to close (close button, backdrop click, or Escape). */
  onClose: () => void;
  /** Navigation items rendered as large display links. */
  navItems?: SiteNavItem[];
  /** Optional logo rendered at the bottom of the drawer. */
  logo?: React.ReactNode;
  /**
   * `id` applied to the drawer element.
   * Use this as the `aria-controls` value on the trigger button.
   * Defaults to `"nav-drawer"`.
   */
  id?: string;
  /**
   * When provided, focus is returned to this element after the drawer closes.
   * Typically a ref to the hamburger / trigger button.
   */
  triggerRef?: React.RefObject<HTMLElement>;
  /** Accessible label for the drawer `role="dialog"`. Defaults to `"Navigation menu"`. */
  label?: string;
  className?: string;
}

// *** SiteNavigation Types ***

/** A single item in the `SiteNavigation` nav link list. */
export interface SiteNavItem {
  /** Text displayed for the link. */
  label: string;
  /**
   * URL the item navigates to.
   * Renders as an `<a>` element when provided, `<button>` otherwise.
   */
  href?: string;
  /**
   * Marks this item as the current/active page.
   * Desktop: renders a 5 px primary-base bottom border.
   * Sets `aria-current="page"` on anchors.
   */
  active?: boolean;
  /**
   * Renders the item in link color (`--color-text-link`) with a north-east arrow.
   * Desktop: uses the `NavItem` external variant.
   * Mobile drawer: large display text + 40 px arrow icon.
   */
  external?: boolean;
  /**
   * Adds a chevron icon on the right (desktop NavItem only).
   * Use for items that trigger a dropdown / mega-menu.
   */
  hasDropdown?: boolean;
  /** Called on click. Receives the native mouse event. */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
}

export interface SiteNavigationProps {
  /**
   * Logo rendered on the left side of the bar and at the bottom of the mobile drawer.
   * Accepts any React node — typically a logo mark + wordmark.
   */
  logo: React.ReactNode;
  /** Navigation items. Desktop: `NavItem` links. Mobile drawer: large display-style links. */
  navItems?: SiteNavItem[];
  /**
   * When `true`, shows a search icon button in the mobile bar to the left of the hamburger.
   * Defaults to `false`.
   */
  showSearch?: boolean;
  /** Called when the mobile search icon button is clicked. */
  onSearchClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Accessible label for the mobile hamburger button.
   * Defaults to `'Open navigation menu'`.
   */
  mobileMenuLabel?: string;
  /**
   * Seeds the internal open/closed state of the mobile drawer.
   * Useful for Storybook stories and SSR scenarios.
   * Defaults to `false`.
   */
  defaultOpen?: boolean;
  className?: string;
}

// *** NavItem Types ***
export interface NavItemProps {
  /** Text label displayed in the nav item. */
  label: string;
  /**
   * URL the item navigates to.
   * Renders as an `<a>` element when provided, `<button>` otherwise.
   */
  href?: string;
  /**
   * Marks this item as the current/active page.
   * Renders a 5 px solid bottom border in `--color-primary-base`.
   * Also sets `aria-current="page"` on anchors.
   */
  active?: boolean;
  /**
   * Adds an `expand_more` chevron icon on the right.
   * Use for nav items that open a dropdown / mega-menu.
   */
  hasDropdown?: boolean;
  /**
   * Renders the item in link color (`--color-text-link`) with a `north_east` arrow icon.
   * Use for external links that open outside the current site.
   */
  external?: boolean;
  /** Called on click. Receives the native mouse event. */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
}

// *** GlobalNavigation Types ***
export interface GlobalNavigationProps {
  /**
   * When `true`, renders the language/translate toggle on the right (desktop) or
   * in a separate row above the site text (mobile). Defaults to `true`.
   */
  showTranslate?: boolean;
  /**
   * Language label shown inside the translate toggle next to the icon.
   * Defaults to `'English'`.
   */
  language?: string;
  /** Called when the language toggle button is clicked. */
  onLanguageClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

// *** Pagination Types ***
export interface PaginationProps {
  /** Current page number (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when the user navigates to a different page. */
  onChange: (page: number) => void;
  /**
   * When `true`, clicking an ellipsis opens a dropdown of hidden page numbers.
   * When `false` (default), the ellipsis is a static indicator with no hover or popup.
   */
  expandableEllipsis?: boolean;
  /**
   * Current page size (items per page). Provide together with `pageSizeOptions` and
   * `onPageSizeChange` to render a "Results per page" dropdown beside the pagination bar.
   */
  pageSize?: number;
  /** Options for the page-size dropdown (e.g. `[10, 25, 50, 100]`). */
  pageSizeOptions?: number[];
  /** Called when the user selects a new page size. */
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

// *** Dropdown Types (legacy) ***

/** A single option in a `Dropdown`. */
export interface DropdownOption {
  /** Unique value identifier — used in `value` and `onChange`. */
  value: string;
  /** Display label shown in the trigger and dropdown. */
  label: string;
  /** Prevents this option from being selected. */
  disabled?: boolean;
}

export interface DropdownProps {
  /** Options displayed in the dropdown. */
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  variant?: 'underlined' | 'outlined';
  label?: string;
  helperText?: string;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
}

// *** DropdownMenu Types ***

/**
 * Trigger visual style:
 * - `'contained'` (default) — gray-background pill trigger
 * - `'uncontained'` — transparent trigger with hover fill
 */
export type DropdownMenuTriggerType = 'contained' | 'uncontained';

/** A single option in a `DropdownMenu`. */
export interface DropdownMenuOption {
  /** Unique value identifier — used in `value` and `onChange`. */
  value: string;
  /** Display label shown in the trigger and menu. */
  label: string;
  /**
   * Optional category name for grouping options under a header in the menu.
   * Options with the same `category` string are grouped together in the order
   * they first appear. Options without a `category` are in an unnamed group.
   */
  category?: string;
  /** Prevents this option from being selected. */
  disabled?: boolean;
}

export interface DropdownMenuProps {
  /** Options displayed in the dropdown menu. */
  options: DropdownMenuOption[];
  /**
   * Controlled selected value(s).
   * - Single-select (`multiple: false`): pass a `string`
   * - Multi-select (`multiple: true`): pass `string[]`
   */
  value?: string | string[];
  /** Initial value when uncontrolled. */
  defaultValue?: string | string[];
  /**
   * Called when the selection changes.
   * - Single-select: receives a `string`
   * - Multi-select: receives `string[]`
   */
  onChange?: (value: string | string[]) => void;
  /**
   * When `true`, multiple options can be selected simultaneously; checkboxes are shown.
   * Defaults to `false`.
   */
  multiple?: boolean;
  /** Text shown in the trigger when no option is selected. Defaults to `'Select...'`. */
  placeholder?: string;
  /**
   * Trigger visual style:
   * - `'contained'` (default) — gray-background `var(--color-neutral-100)` pill
   * - `'uncontained'` — transparent background with hover fill
   */
  type?: DropdownMenuTriggerType;
  /**
   * When `true` and `type="contained"`, renders a visible `var(--color-neutral-300)` border
   * around the trigger instead of the borderless default.
   * Defaults to `false`.
   */
  border?: boolean;
  /**
   * Optional form label shown above the trigger (14px, neutral-700).
   * When provided the trigger is automatically associated via `aria-labelledby`.
   */
  label?: string;
  /** Optional helper text shown below the trigger (14px, neutral-700). */
  helperText?: string;
  /** When `true`, the trigger is non-interactive and visually dimmed. */
  disabled?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** `aria-label` on the trigger button. */
  'aria-label'?: string;
  /** `aria-labelledby` on the trigger button. */
  'aria-labelledby'?: string;
  /**
   * Background color of the trigger in its normal (idle) state.
   * Accepts any valid CSS color value, e.g. `'var(--color-neutral-100)'`, `'#f0f0f0'`.
   * Defaults to `var(--color-neutral-100)` for `contained` (no border),
   * `var(--color-neutral-white)` for `contained` with border, and `transparent` for `uncontained`.
   */
  triggerBgColor?: string;
  /**
   * Background color of the trigger when hovered.
   * Defaults to `var(--color-neutral-100)`.
   */
  triggerHoverBgColor?: string;
  /**
   * Background color of the trigger when pressed (pointer-down flash).
   * Defaults to `var(--color-neutral-200)`.
   */
  triggerPressBgColor?: string;
  /** Tailwind classes applied to the root wrapper `<div>`. */
  className?: string;
}

// *** Card Types ***

/** Layout orientation of the card. */
export type CardOrientation = 'vertical' | 'horizontal';

/** Display type for the card. */
export type CardType = 'story' | 'carousel';

export interface CardProps {
  /** URL of the card image. */
  image: string;
  /** Alt text for the card image. Defaults to `""`. */
  imageAlt?: string;
  /** Card heading text. Wraps naturally; each wrapped line is underlined on hover. */
  title: string;
  /**
   * Optional body text shown below the title. Clamped to 2 lines.
   * Hidden when omitted.
   */
  description?: string;
  /** Optional read-time label shown below the description (e.g. `"7 min"`). */
  readTime?: string;
  /**
   * Optional data-date chip label (e.g. `"2023 data"`).
   * - **Vertical**: rendered as an overlay inside the image that slides into view on hover.
   * - **Horizontal**: rendered statically at the top of the content area.
   */
  dataDate?: string;
  /**
   * URL the data chip navigates to when clicked (e.g. a findings page pre-filtered to this
   * data year). Renders the chip as an `<a>` element. The chip click does **not** propagate
   * to the card's own click target.
   *
   * Prefer `onChipClick` over `chipHref` when the card itself also has an `href`, to avoid
   * nesting `<a>` elements.
   */
  chipHref?: string;
  /**
   * Click handler fired when the data chip is clicked. Renders the chip as a `<button>`.
   * The click does **not** propagate to the card's own click target.
   */
  onChipClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Card layout orientation.
   * - `'vertical'` (default) — stacked image + content, used for desktop/mobile grids.
   * - `'horizontal'` — image on the left, content on the right.
   */
  orientation?: CardOrientation;
  /**
   * Card display type.
   * - `'story'` (default) — mobile full width, desktop fixed or grid-based width.
   * - `'carousel'` — responsive width showing 1 full card + 1/5 of next card.
   */
  type?: CardType;
  /**
   * Render the card with a `1px` neutral border. When `true`, hovering reveals a soft
   * shadow instead of the title underline. Defaults to `false` (borderless).
   */
  bordered?: boolean;
  /** When provided the entire card renders as an `<a>` element. */
  href?: string;
  /** Click handler. Combined with `href` it fires alongside navigation. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Tailwind classes applied to the root element. */
  className?: string;
  /** Inline styles applied to the root element. */
  style?: React.CSSProperties;
}

// *** CardCarousel Types ***

/** A single card entry rendered inside a `CardCarousel`. */
export interface CardCarouselItem extends Omit<CardProps, 'orientation' | 'type'> {
  /** Stable key for the card. Falls back to the array index when omitted. */
  id?: string | number;
}

export interface CardCarouselProps {
  /** Cards rendered as horizontally-scrollable slides. */
  items: CardCarouselItem[];
  /** Optional heading shown above the carousel track. */
  title?: string;
  /**
   * Minimum number of (fixed 320px) cards before the desktop arrow controls appear. When the
   * item count exceeds this value the previous/next arrows are shown; the arrows advance the
   * track one card at a time. Defaults to `3`.
   */
  visibleDesktop?: number;
  /**
   * Gap between cards, in pixels, applied at every breakpoint. Defaults to `24`.
   */
  gap?: number;
  /**
   * Viewport width (px) below which the **mobile** peek layout is used: one full card
   * plus a sliver of the next. At or above this width the desktop grid layout is used.
   * Defaults to `768`.
   */
  mobileBreakpoint?: number;
  /**
   * Fraction of the next card shown as a "peek" beyond the full cards in view.
   * `0.2` shows 1/5 of the next card on both mobile (1 + peek) and desktop
   * (`visibleDesktop` + peek). Defaults to `0.2`.
   */
  mobilePeek?: number;
  /** Show the previous/next arrow controls on desktop. Defaults to `true`. */
  showArrows?: boolean;
  /** Accessible label for the carousel region. Defaults to `title` or `"Card carousel"`. */
  ariaLabel?: string;
  /** Tailwind classes applied to the root element. */
  className?: string;
  /** Inline styles applied to the root element. */
  style?: React.CSSProperties;
}

// *** ToastMessage Types ***

/**
 * Severity of a `ToastMessage`. Drives the background color, default icon, and the
 * accessibility live-region semantics (`info`/`success` → polite, `warning`/`error` → assertive).
 */
export type ToastMessageType = 'info' | 'success' | 'warning' | 'error';

export interface ToastMessageProps {
  /** Severity of the toast. Defaults to `'info'`. */
  type?: ToastMessageType;
  /** Bold heading text. Omit for a description-only toast. */
  title?: React.ReactNode;
  /** Supporting body text. Omit for a title-only toast. */
  description?: React.ReactNode;
  /** Render the leading severity icon. Defaults to `true`. */
  showIcon?: boolean;
  /** Replace the default severity icon with custom content. */
  icon?: React.ReactNode;
  /** Show the trailing close button. Defaults to `true`. */
  dismissible?: boolean;
  /** Called when the close button is activated. */
  onClose?: () => void;
  /** Accessible label for the close button. Defaults to `'Dismiss'`. */
  closeLabel?: string;
  /**
   * ARIA role for the live region. Defaults to `'status'` for `info`/`success`
   * and `'alert'` for `warning`/`error`.
   */
  role?: 'status' | 'alert';
  /** Tailwind classes applied to the root element. */
  className?: string;
  /** Inline styles applied to the root element. */
  style?: React.CSSProperties;
}

// *** ExpandableSelect Types ***

/** A single option in an `ExpandableSelect`. */
export interface ExpandableSelectOption {
  /** Unique value identifier. */
  value: string;
  /** Display label shown in the checkbox row. */
  label: string;
  /** Prevents this option from being toggled. */
  disabled?: boolean;
}

export interface ExpandableSelectProps {
  /** Options displayed when the panel is open. */
  options: ExpandableSelectOption[];
  /** Controlled selected values. */
  value?: string[];
  /** Initial selected values when uncontrolled. Defaults to `[]`. */
  defaultValue?: string[];
  /** Called when the selection changes. */
  onChange?: (value: string[]) => void;
  /**
   * Text shown in the trigger button — typically the category or filter name.
   * Defaults to `'Select...'`.
   */
  label?: string;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** When `true`, the trigger is non-interactive and visually dimmed. */
  disabled?: boolean;
  /** `id` on the root wrapper `<div>`. */
  id?: string;
  /** `aria-label` on the trigger button. */
  'aria-label'?: string;
  /** `aria-labelledby` on the trigger button. */
  'aria-labelledby'?: string;
  /** Tailwind classes applied to the root wrapper `<div>`. */
  className?: string;
}

// *** InputField Types ***

/** Visual style of the input field border. */
export type InputFieldVariant = 'outlined' | 'underlined';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** HTML input type (e.g. `'text'`, `'email'`, `'password'`). Defaults to `'text'`. */
  type?: string;
  /** Marks the field as required; forwarded to the native input. */
  required?: boolean;
  /** Optional label rendered above the input and associated via `htmlFor`. */
  label?: string;
  /** Helper text rendered below the input (neutral-700, 14px). */
  helperText?: string;
  /** Error message rendered below the input in error color (14px). */
  errorText?: string;
  /** Controls whether the error state/message is visible. Defaults to `true`. */
  showError?: boolean;
  /**
   * When `true`, a clear (×) button appears on the right side of the input.
   * Only visible when the field has a non-empty value and is not disabled.
   * Defaults to `false`.
   */
  showClearButton?: boolean;
  /** Called when the clear button is clicked. */
  onClear?: () => void;
  /**
   * Visual variant of the input border:
   * - `'outlined'` (default) — full rounded border on all sides.
   * - `'underlined'` — bottom border only, no border-radius.
   */
  variant?: InputFieldVariant;
  /** Tailwind classes applied to the root wrapper `<div>`. */
  className?: string;
}

// *** ExpandableSelectGroup Types ***

/** A single filter row inside an `ExpandableSelectGroup`. */
export interface ExpandableSelectGroupFilter {
  /** Unique identifier — used as the key in the `value` map. */
  id: string;
  /** Label shown in the trigger button for this row. */
  label: string;
  /** Checkbox options displayed when the row is open. */
  options: ExpandableSelectOption[];
  /** Prevents this row's trigger from being interacted with. */
  disabled?: boolean;
}

export interface ExpandableSelectGroupProps {
  /** Filter rows to render inside the panel. */
  filters: ExpandableSelectGroupFilter[];
  /** Optional card heading (semibold 18 px). */
  title?: string;
  /** Optional subtitle rendered below the heading (regular 16 px, neutral-700). */
  subtitle?: string;
  /**
   * Controlled selection state — a map of filter `id` → `string[]` of selected values.
   * Partial maps are allowed; missing keys fall back to uncontrolled state.
   */
  value?: Record<string, string[]>;
  /** Initial selection state when uncontrolled. Defaults to `{}`. */
  defaultValue?: Record<string, string[]>;
  /** Called whenever any filter's selection changes. Receives the full updated map. */
  onChange?: (value: Record<string, string[]>) => void;
  /**
   * The `id` of the filter that starts open (uncontrolled).
   * Only meaningful when `accordion` is `true` (the default).
   */
  defaultOpenId?: string;
  /**
   * When `true` (default), opening one filter automatically closes all others.
   * Set to `false` to allow multiple filters to be open simultaneously.
   */
  accordion?: boolean;
  /** Tailwind classes applied to the root card `<div>`. */
  className?: string;
}
