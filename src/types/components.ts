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

// *** Dropdown Types ***

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
  placeholder?: string; // default text only, component is named Dropdown
  /**
   * Trigger visual style:
   * - `'underlined'` (default) — inline text field with a bottom border divider
   * - `'outlined'` — bordered pill/box button
   */
  variant?: 'underlined' | 'outlined';
  /**
   * Optional form label shown above the trigger (14px, neutral-700).
   * When provided the trigger is automatically associated via `aria-labelledby`.
   */
  label?: string;
  /**
   * Optional helper text shown below the trigger (14px, neutral-700).
   * Rendered after the bottom divider on `underlined` variant, below the button on `outlined`.
   */
  helperText?: string;
  /** When `true`, the trigger is non-interactive and visually dimmed (`opacity: 20%`). */
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
  /** Tailwind classes applied to the root wrapper `<div>`. */
  className?: string;
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
