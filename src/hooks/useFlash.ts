import * as React from 'react';

/**
 * Returns a `flashing` boolean and `handlePointerDown` handler.
 *
 * On pointer down, `flashing` is set to `true` for `duration` ms then cleared.
 * Intended for mobile tap feedback — apply a background class while `flashing` is true.
 *
 * @example
 * const { flashing, handlePointerDown } = useFlash(disabled);
 * <button onPointerDown={handlePointerDown} className={flashing ? 'bg-neutral-100' : ''} />
 */
export const useFlash = (disabled?: boolean, duration = 120) => {
  const [flashing, setFlashing] = React.useState(false);

  const handlePointerDown = () => {
    if (disabled) return;
    setFlashing(true);
    window.setTimeout(() => setFlashing(false), duration);
  };

  return { flashing, handlePointerDown };
};
