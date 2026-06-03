import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Tear down GSAP pin spacers before React unmounts (prevents removeChild errors). */
export function killPinnedScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.pin || st.vars.pin) {
      st.kill(true);
    }
  });
}

/** Kill every ScrollTrigger whose trigger lives inside `root`. */
export function killScrollTriggersIn(root: HTMLElement | null) {
  if (!root) return;

  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger;
    if (trigger instanceof Element && root.contains(trigger)) {
      st.kill(true);
    }
  });
}
