import type Lenis from 'lenis';

type ScrollListener = () => void;

export const lenisInstance: { current: Lenis | null } = { current: null };

const scrollListeners = new Set<ScrollListener>();

/** Called by Layout when Lenis is created — attaches any early subscribers */
export function registerLenis(lenis: Lenis) {
  lenisInstance.current = lenis;
  scrollListeners.forEach((listener) => {
    lenis.on('scroll', listener);
  });
}

/** Called by Layout when Lenis is destroyed */
export function unregisterLenis(lenis: Lenis) {
  scrollListeners.forEach((listener) => {
    lenis.off('scroll', listener);
  });
  if (lenisInstance.current === lenis) {
    lenisInstance.current = null;
  }
}

/**
 * Subscribe to Lenis scroll. Safe to call before Lenis exists —
 * listener is attached automatically once Layout registers Lenis.
 */
export function subscribeLenisScroll(listener: ScrollListener) {
  scrollListeners.add(listener);
  lenisInstance.current?.on('scroll', listener);

  return () => {
    scrollListeners.delete(listener);
    lenisInstance.current?.off('scroll', listener);
  };
}
