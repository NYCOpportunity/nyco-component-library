import * as React from 'react';
import { icons, IconName } from './icons';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /** Which glyph to render. */
  name: IconName;
  /** Width and height in pixels (icons are square). Defaults to 24. */
  size?: number | string;
  /**
   * Accessible label. When provided the icon is exposed to assistive tech as an
   * image; when omitted the icon is hidden (decorative).
   */
  title?: string;
}

/**
 * Icon — renders any glyph from the shared icon registry.
 *
 * Colors follow `currentColor`, so set `color` (or a text color class) on the
 * icon or an ancestor to recolor it.
 */
export function Icon({ name, size = 24, title, ...rest }: IconProps) {
  const icon = icons[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {icon.content}
    </svg>
  );
}
