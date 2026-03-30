import * as React from 'react';
import { DividerProps } from '../../types/components';

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className }, ref) => {
    const isVertical = orientation === 'vertical';

    return (
      <hr
        ref={ref}
        aria-orientation={orientation}
        className={
          className ||
          (isVertical
            ? 'h-full w-px border-none bg-[var(--color-border-default)]'
            : 'h-px w-full border-none bg-[var(--color-border-default)]')
        }
      />
    );
  }
);

Divider.displayName = 'Divider';
