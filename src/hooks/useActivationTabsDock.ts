import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
  type RefObject,
} from "react";
import { lenisInstance } from "../lib/lenisInstance";

type PinnedMetrics = {
  top: number;
  left: number;
  width: number;
};

type UseActivationTabsDockOptions = {
  /** Section heading block — scrolled into view when switching tabs while pinned */
  contentAnchorRef?: RefObject<HTMLElement | null>;
};

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
  const [isPinned, setIsPinned] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [pinnedMetrics, setPinnedMetrics] = useState<PinnedMetrics | null>(
    null,
  );

  const getNavHeight = useCallback(() => {
    const header = document.querySelector("header");
    return header?.getBoundingClientRect().height ?? 64;
  }, []);

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

    const shouldPin =
      sentinelTop <= navHeight &&
      sectionRect.bottom > navHeight + dockHeight + 12;

    isPinnedRef.current = shouldPin;
    setIsPinned(shouldPin);
    setPlaceholderHeight(shouldPin ? dockHeight : 0);

    if (shouldPin) {
      const slotRect = slot.getBoundingClientRect();
      setPinnedMetrics({
        top: navHeight,
        left: slotRect.left,
        width: slotRect.width,
      });
    } else {
      setPinnedMetrics(null);
    }
  }, [getNavHeight]);

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

  useEffect(() => {
    update();

    const lenis = lenisInstance.current;
    lenis?.on("scroll", update);
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    const section = sectionRef.current;
    const dock = dockRef.current;
    const slot = dockSlotRef.current;
    if (section) ro.observe(section);
    if (dock) ro.observe(dock);
    if (slot) ro.observe(slot);

    return () => {
      lenis?.off("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [update]);

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
    isPinnedRef,
    placeholderHeight,
    dockStyle,
    scrollToContent,
  };
}
