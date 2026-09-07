"use client";

/**
 * GSAP + ScrollTrigger registration — client-only.
 *
 * Call registerScrollTrigger() once from a useEffect in any
 * component that needs ScrollTrigger (e.g. <Gameplay />).
 * It automatically syncs with the Lenis instance exposed on window.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerScrollTrigger() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);

  // Sync Lenis <-> GSAP so pin/scroll-driven animations feel smooth
  const lenis = window.__lenis;
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  registered = true;
}

export { gsap, ScrollTrigger };
