import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  type CSSProperties,
  type RefObject,
  type TransitionEvent,
} from "react";
import { lenisInstance, subscribeLenisScroll } from "../lib/lenisInstance";

type PinnedMetrics = {
  top: number;
  left: number;
  width: number;
};

type UseActivationTabsDockOptions = {
  /** Section heading block — scrolled into view when switching tabs while pinned */
  contentAnchorRef?: RefObject<HTMLElement | null>;
};

const DOCK_ANIM_MS = 320;

/**
 * Pins the activation tab dock below the navbar while the user scrolls
 * through the section. Uses fixed positioning so it works with Lenis and
 * ancestors that have overflow-x: hidden (which break CSS sticky).
 */
export function useActivationTabsDock(options?: UseActivationTabsDockOptions) {
  const { contentAnchorRef } = options ?? {};
  const sectionRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const dockSlotRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const isPinnedRef = useRef(false);
  const dismissingRef = useRef(false);
  const dismissTimerRef = useRef<number | null>(null);
  const enterFrameRef = useRef<number | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [pinnedMetrics, setPinnedMetrics] = useState<PinnedMetrics | null>(
    null,
  );

  const getNavHeight = useCallback(() => {
    const header = document.querySelector("header");
    return header?.getBoundingClientRect().height ?? 64;
  }, []);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimerRef.current !== null) {
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  const clearEnterFrame = useCallback(() => {
    if (enterFrameRef.current !== null) {
      cancelAnimationFrame(enterFrameRef.current);
      enterFrameRef.current = null;
    }
  }, []);

  const finishUnpin = useCallback(() => {
    clearDismissTimer();
    clearEnterFrame();
    dismissingRef.current = false;
    setIsDismissing(false);
    setIsEntering(false);
    isPinnedRef.current = false;
    setIsPinned(false);
    setPlaceholderHeight(0);
    setPinnedMetrics(null);
  }, [clearDismissTimer, clearEnterFrame]);

  const startDismiss = useCallback(() => {
    if (dismissingRef.current) return;
    dismissingRef.current = true;
    setIsDismissing(true);
    clearDismissTimer();
    dismissTimerRef.current = window.setTimeout(() => {
      if (dismissingRef.current) finishUnpin();
    }, DOCK_ANIM_MS + 50);
  }, [clearDismissTimer, finishUnpin]);

  const cancelDismiss = useCallback(() => {
    clearDismissTimer();
    dismissingRef.current = false;
    setIsDismissing(false);
  }, [clearDismissTimer]);

  const updatePinnedMetrics = useCallback(
    (slot: HTMLDivElement, navHeight: number) => {
      const slotRect = slot.getBoundingClientRect();
      setPinnedMetrics({
        top: navHeight,
        left: slotRect.left,
        width: slotRect.width,
      });
    },
    [],
  );

  const update = useCallback(() => {
    const section = sectionRef.current;
    const sentinel = sentinelRef.current;
    const dock = dockRef.current;
    const slot = dockSlotRef.current;
    if (!section || !sentinel || !dock || !slot) return;

    const navHeight = getNavHeight();
    const sentinelTop = sentinel.getBoundingClientRect().top;
    const sectionRect = section.getBoundingClientRect();
    const dockHeight = dock.offsetHeight;
    const pinThreshold = navHeight + dockHeight + 12;

    const inPinZone =
      sentinelTop <= navHeight && sectionRect.bottom > pinThreshold;
    const exitedDownward = sectionRect.bottom <= pinThreshold;
    const scrolledAbove = sentinelTop > navHeight;

    if (inPinZone) {
      const wasPinned = isPinnedRef.current;
      cancelDismiss();

      isPinnedRef.current = true;
      setIsPinned(true);
      setPlaceholderHeight(dockHeight);
      updatePinnedMetrics(slot, navHeight);

      if (!wasPinned) {
        setIsEntering(true);
      }

      return;
    }

    if (!isPinnedRef.current) return;

    if (dismissingRef.current) return;

    if (exitedDownward) {
      updatePinnedMetrics(slot, navHeight);
      startDismiss();
      return;
    }

    if (scrolledAbove) {
      finishUnpin();
    }
  }, [
    cancelDismiss,
    finishUnpin,
    getNavHeight,
    startDismiss,
    updatePinnedMetrics,
  ]);

  const scrollToContent = useCallback(() => {
    const anchor = contentAnchorRef?.current;
    if (!anchor) return;

    const navHeight = getNavHeight();
    const lenis = lenisInstance.current;
    const offset = -(navHeight + 16);

    if (lenis) {
      lenis.scrollTo(anchor, { offset, duration: 0.9 });
    } else {
      const top = anchor.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [contentAnchorRef, getNavHeight]);

  const handleDismissTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "opacity" || !dismissingRef.current) return;
      finishUnpin();
    },
    [finishUnpin],
  );

  /* Commit hidden enter state to the DOM, then animate to visible */
  useLayoutEffect(() => {
    if (!isPinned || !isEntering) return;

    const dock = dockRef.current;
    if (!dock) return;

    void dock.getBoundingClientRect();

    clearEnterFrame();
    enterFrameRef.current = requestAnimationFrame(() => {
      enterFrameRef.current = requestAnimationFrame(() => {
        enterFrameRef.current = null;
        setIsEntering(false);
      });
    });

    return clearEnterFrame;
  }, [isPinned, isEntering, clearEnterFrame]);

  useEffect(() => {
    const unsubLenis = subscribeLenisScroll(update);
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    const section = sectionRef.current;
    const dock = dockRef.current;
    const slot = dockSlotRef.current;
    if (section) ro.observe(section);
    if (dock) ro.observe(dock);
    if (slot) ro.observe(slot);

    const initialFrame = requestAnimationFrame(update);
    const layoutRefresh = window.setTimeout(update, 150);

    return () => {
      cancelAnimationFrame(initialFrame);
      unsubLenis();
      window.removeEventListener("resize", update);
      ro.disconnect();
      clearDismissTimer();
      clearEnterFrame();
      window.clearTimeout(layoutRefresh);
    };
  }, [clearDismissTimer, clearEnterFrame, update]);

  const dockStyle: CSSProperties | undefined = pinnedMetrics
    ? {
        position: "fixed",
        top: pinnedMetrics.top,
        left: pinnedMetrics.left,
        width: pinnedMetrics.width,
        boxSizing: "border-box",
        zIndex: 50,
      }
    : undefined;

  return {
    sectionRef,
    sentinelRef,
    dockSlotRef,
    dockRef,
    isPinned,
    isDismissing,
    isEntering,
    isPinnedRef,
    placeholderHeight,
    dockStyle,
    scrollToContent,
    handleDismissTransitionEnd,
  };
}
