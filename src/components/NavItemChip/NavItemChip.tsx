import * as React from 'react';
import { NavItemChipProps } from '../../types/components';
import { cx } from '../../utils/cx';
import { useFlash } from '../../hooks/useFlash';
import { chipBase, chipDefault, chipActive, chipFlashing } from './chipStyles';

// ---------------------------------------------------------------------------
// NavItemChip — chip-style nav item (no dropdown)
// ---------------------------------------------------------------------------

export const NavItemChip = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavItemChipProps
>(({ label, href, active = false, onClick, className }, ref) => {
  const { flashing: isFlashing, handlePointerDown } = useFlash();

  const classes = cx(
    chipBase,
    active
      ? cx(chipActive, isFlashing && chipFlashing)
      : cx(chipDefault, isFlashing && chipFlashing),
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={classes}
        onPointerDown={handlePointerDown}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-current={active ? 'page' : undefined}
      className={classes}
      onPointerDown={handlePointerDown}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {label}
    </button>
  );
});

NavItemChip.displayName = 'NavItemChip';
