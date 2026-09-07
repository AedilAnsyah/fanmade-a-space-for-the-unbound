"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

/* ═══════════════════════════════════════════════════
 * LENIS SMOOTH SCROLL PROVIDER
 *
 * Wraps children with a Lenis instance for smooth
 * scrolling. Also exposes the instance on window
 * so GSAP ScrollTrigger can sync later (see lib/scrollTrigger.ts).
 * ═══════════════════════════════════════════════════ */

// Extend window for cross-module access
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    // Expose globally for GSAP sync
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
