import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook that determines if the current viewport width is considered "mobile".
 *
 * The hook listens for changes to the window's width and updates its state accordingly.
 * It returns a boolean indicating whether the viewport width is less than the defined `MOBILE_BREAKPOINT` (defaults to `768` pixels).
 *
 * @returns {boolean} `true` if the viewport width is less than `MOBILE_BREAKPOINT`, otherwise `false`.
 *
 * @remarks
 * - The hook uses `window.matchMedia` and listens for changes to the media query.
 * - The initial value is set on mount and updated whenever the viewport size changes.
 * - Make sure `MOBILE_BREAKPOINT` is defined in the scope where this hook is used.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
