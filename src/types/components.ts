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
  /** The element that triggers the tooltip on hover / focus. Must accept `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`. */
  children: React.ReactElement;
  className?: string;
}
