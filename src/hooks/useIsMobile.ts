import * as React from 'react';

/** Default viewport width (px) below which the mobile layout is used. */
export const DEFAULT_MOBILE_BREAKPOINT = 768;

/**
 * Returns `true` when the viewport width is below `breakpoint`.
 *
 * Tracks `window` resize events and is SSR-safe (returns `false` when `window`
 * is unavailable). Use to switch between desktop and mobile layouts.
 *
 * @param breakpoint Width in px below which the result is `true`. Defaults to 768.
 *
 * @example
 * const isMobile = useIsMobile();
 * const isMobile = useIsMobile(640);
 */
export const useIsMobile = (breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) => {
  const getMatch = React.useCallback(
    () => (typeof window === 'undefined' ? false : window.innerWidth < breakpoint),
    [breakpoint]
  );

  const [isMobile, setIsMobile] = React.useState(getMatch);

  React.useEffect(() => {
    const onResize = () => setIsMobile(getMatch());
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [getMatch]);

  return isMobile;
};
