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
  /** max-w-7xl content wrapper — stable width for pinned dock on mobile */
  containerRef?: RefObject<HTMLElement | null>;
};

const DOCK_ANIM_MS = 320;
const METRICS_EPSILON = 0.5;

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function computePinnedMetrics(
  section: HTMLElement,
  slot: HTMLDivElement,
  navHeight: number,
  container?: HTMLElement | null,
): PinnedMetrics {
  if (isMobileViewport()) {
    const anchor = container ?? section;
    const anchorRect = anchor.getBoundingClientRect();
    return {
      top: navHeight,
      left: anchorRect.left,
      width: anchorRect.width,
    };
  }

  const slotRect = slot.getBoundingClientRect();
  return {
    top: navHeight,
    left: slotRect.left,
    width: slotRect.width,
  };
}

function metricsEqual(a: PinnedMetrics | null, b: PinnedMetrics): boolean {
  if (!a) return false;
  return (
    Math.abs(a.top - b.top) < METRICS_EPSILON &&
    Math.abs(a.left - b.left) < METRICS_EPSILON &&
    Math.abs(a.width - b.width) < METRICS_EPSILON
  );
}

/**
 * Pins the activation tab dock below the navbar while the user scrolls
 * through the section. Uses fixed positioning so it works with Lenis and
 * ancestors that have overflow-x: hidden (which break CSS sticky).
 */
export function useActivationTabsDock(options?: UseActivationTabsDockOptions) {
  const { contentAnchorRef, containerRef } = options ?? {};
  const sectionRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const dockSlotRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const isPinnedRef = useRef(false);
  const dismissingRef = useRef(false);
  const dismissTimerRef = useRef<number | null>(null);
  const enterFrameRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const navHeightRef = useRef(64);
  const pinnedMetricsRef = useRef<PinnedMetrics | null>(null);
  const placeholderHeightRef = useRef(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [pinnedMetrics, setPinnedMetrics] = useState<PinnedMetrics | null>(
    null,
  );

  const refreshNavHeight = useCallback(() => {
    const header = document.querySelector("header");
    navHeightRef.current = header?.getBoundingClientRect().height ?? 64;
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

  const clearScrollRaf = useCallback(() => {
    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }
  }, []);

  const applyPinnedMetrics = useCallback(
    (section: HTMLElement, slot: HTMLDivElement, navHeight: number) => {
      const next = computePinnedMetrics(
        section,
        slot,
        navHeight,
        containerRef?.current,
      );

      if (metricsEqual(pinnedMetricsRef.current, next)) return;

      pinnedMetricsRef.current = next;
      setPinnedMetrics(next);
    },
    [containerRef],
  );

  const applyPlaceholderHeight = useCallback((height: number) => {
    if (placeholderHeightRef.current === height) return;
    placeholderHeightRef.current = height;
    setPlaceholderHeight(height);
  }, []);

  const finishUnpin = useCallback(() => {
    clearDismissTimer();
    clearEnterFrame();
    dismissingRef.current = false;
    setIsDismissing(false);
    setIsEntering(false);
    isPinnedRef.current = false;
    pinnedMetricsRef.current = null;
    placeholderHeightRef.current = 0;
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

  const update = useCallback(() => {
    const section = sectionRef.current;
    const sentinel = sentinelRef.current;
    const dock = dockRef.current;
    const slot = dockSlotRef.current;
    if (!section || !sentinel || !dock || !slot) return;

    const navHeight = navHeightRef.current;
    const sentinelTop = sentinel.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    const dockHeight = dock.offsetHeight;
    const pinThreshold = navHeight + dockHeight + 12;

    const inPinZone = sentinelTop <= navHeight && sectionBottom > pinThreshold;
    const exitedDownward = sectionBottom <= pinThreshold;
    const scrolledAbove = sentinelTop > navHeight;

    if (inPinZone) {
      if (dismissingRef.current) {
        cancelDismiss();
      }

      applyPinnedMetrics(section, slot, navHeight);

      if (isPinnedRef.current) return;

      isPinnedRef.current = true;
      setIsPinned(true);
      applyPlaceholderHeight(dockHeight);
      setIsEntering(true);
      return;
    }

    if (!isPinnedRef.current) return;
    if (dismissingRef.current) return;

    if (exitedDownward) {
      applyPinnedMetrics(section, slot, navHeight);
      startDismiss();
      return;
    }

    if (scrolledAbove) {
      finishUnpin();
    }
  }, [
    applyPinnedMetrics,
    applyPlaceholderHeight,
    cancelDismiss,
    finishUnpin,
    startDismiss,
  ]);

  const scheduleUpdate = useCallback(() => {
    if (scrollRafRef.current !== null) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      update();
    });
  }, [update]);

  const handleResize = useCallback(() => {
    refreshNavHeight();
    scheduleUpdate();
  }, [refreshNavHeight, scheduleUpdate]);

  const scrollToContent = useCallback(() => {
    const anchor = contentAnchorRef?.current;
    if (!anchor) return;

    refreshNavHeight();
    const navHeight = navHeightRef.current;
    const lenis = lenisInstance.current;
    const offset = -(navHeight + 16);
    const rect = anchor.getBoundingClientRect();

    if (lenis) {
      const top = lenis.scroll + rect.top + offset;
      lenis.scrollTo(top, { duration: 0.9, force: true });
    } else {
      const top = rect.top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [contentAnchorRef, refreshNavHeight]);

  /** True when the user has scrolled away from the section content (pinned dock, etc.) */
  const shouldScrollToContent = useCallback(() => {
    const sentinel = sentinelRef.current;
    const anchor = contentAnchorRef?.current;
    if (!sentinel || !anchor) return isPinnedRef.current;

    const navHeight = navHeightRef.current;
    const sentinelTop = sentinel.getBoundingClientRect().top;
    const anchorTop = anchor.getBoundingClientRect().top;

    return (
      isPinnedRef.current ||
      sentinelTop <= navHeight ||
      anchorTop < navHeight + 20
    );
  }, [contentAnchorRef]);

  const handleDismissTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "opacity" || !dismissingRef.current) return;
      finishUnpin();
    },
    [finishUnpin],
  );

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
    refreshNavHeight();

    const unsubLenis = subscribeLenisScroll(scheduleUpdate);
    window.addEventListener("resize", handleResize, { passive: true });

    const ro = new ResizeObserver(scheduleUpdate);
    const slot = dockSlotRef.current;
    const container = containerRef?.current;
    if (slot) ro.observe(slot);
    if (container) ro.observe(container);

    const initialFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(initialFrame);
      unsubLenis();
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      clearDismissTimer();
      clearEnterFrame();
      clearScrollRaf();
    };
  }, [
    clearDismissTimer,
    clearEnterFrame,
    clearScrollRaf,
    handleResize,
    refreshNavHeight,
    scheduleUpdate,
    update,
  ]);

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
    shouldScrollToContent,
    handleDismissTransitionEnd,
  };
}
