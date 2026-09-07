"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

/* ═══════════════════════════════════════════════════
 * LENIS SMOOTH SCROLL PROVIDER
 *
 * Wraps children with a Lenis instance for smooth
 * scrolling. Also exposes the instance on window
 * so components & animations can control scroll.
 * Includes proper RAF cleanup to prevent memory leaks.
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
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // On touch devices, keep touchMultiplier 1.0 for natural responsiveness
      touchMultiplier: isTouch ? 1.0 : 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
