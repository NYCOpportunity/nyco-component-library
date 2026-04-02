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

// *** Pagination Types ***
export interface PaginationProps {
  /** Current page number (1-indexed). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when the user navigates to a different page. */
  onChange: (page: number) => void;
  className?: string;
}
