"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayer } from "@/components/layer/useLayer";

/* ═══════════════════════════════════════════════════
 * PROPS
 * ═══════════════════════════════════════════════════ */

export interface DiveTransitionProps {
  /** Controlled active transition state */
  isTransitioning: boolean;
  /** Direction of the transition: expanding into dive or contracting back to reality */
  direction?: "dive" | "reality";
  /** Origin coordinate (button center) from which the circle expands/contracts */
  origin: { x: number; y: number } | null;
  /** Callback when transition completes */
  onComplete?: () => void;
  /** Custom heading text to cross-fade during transition */
  crossfadeText?: string;
}

/* ═══════════════════════════════════════════════════
 * DIVE TRANSITION COMPONENT
 * ═══════════════════════════════════════════════════ */

export function DiveTransition({
  isTransitioning,
  direction = "dive",
  origin,
  onComplete,
  crossfadeText = "Ada dunia lain di balik pikiran orang-orang yang kita kenal.",
}: DiveTransitionProps) {
  const { enterDive, exitDive, setBookClosing, pendingSection } = useLayer();
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [screenAnnouncement, setScreenAnnouncement] = useState("");

  // Detect mobile viewport (< 768px) and prefers-reduced-motion
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const completedRef = useRef(false);

  // Lock scroll during transition
  useEffect(() => {
    if (isTransitioning) {
      completedRef.current = false;
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [isTransitioning]);

  // Announce to screen readers when transition starts
  useEffect(() => {
    if (isTransitioning) {
      setScreenAnnouncement(
        direction === "reality"
          ? "Kembali ke Beranda..."
          : "Membuka Buku Merah. Memasuki alam pikiran..."
      );
    } else {
      setScreenAnnouncement("");
    }
  }, [isTransitioning, direction]);

  const handleAnimationComplete = () => {
    // Guard against double-fire (onAnimationComplete + onExitComplete)
    if (completedRef.current) return;
    completedRef.current = true;

    if (direction === "reality") {
      // Switch layer to reality FIRST so Hero renders
      exitDive();
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.1 });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
      // Signal Hero to start the book-closing animation
      setBookClosing(true);
    } else {
      enterDive();
      // Smooth scroll to requested section after dive completes
      const targetId = pendingSection || "prologue";
      setTimeout(() => {
        const target = document.getElementById(targetId) || document.getElementById("prologue");
        if (target) {
          if (window.__lenis) {
            window.__lenis.scrollTo(target, { offset: 0, duration: 1.0 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
    }

    if (onComplete) {
      onComplete();
    }
  };

  const originX = origin?.x ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const originY = origin?.y ?? (typeof window !== "undefined" ? window.innerHeight * 0.52 : 500);

  // Simplified mode for mobile or reduced motion
  const useSimplifiedTransition = isMobile || prefersReducedMotion;

  return (
    <>
      {/* Screen Reader Announcement */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {screenAnnouncement}
      </div>

      <AnimatePresence onExitComplete={handleAnimationComplete}>
        {isTransitioning && (
          <motion.div
            key="dive-transition-overlay"
            className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden bg-dive-bg"
            style={{ willChange: useSimplifiedTransition ? "opacity, transform" : "clip-path" }}
            initial={
              direction === "reality"
                ? useSimplifiedTransition
                  ? { opacity: 1, scale: 1 }
                  : {
                      clipPath: `circle(150% at ${originX}px ${originY}px)`,
                      opacity: 1,
                    }
                : useSimplifiedTransition
                ? { opacity: 0, scale: 0.98 }
                : {
                    clipPath: `circle(0% at ${originX}px ${originY}px)`,
                    opacity: 1,
                  }
            }
            animate={
              direction === "reality"
                ? useSimplifiedTransition
                  ? {
                      opacity: 0,
                      scale: 0.95,
                      transition: {
                        duration: 0.8,
                        ease: [0.32, 0, 0.67, 0],
                      },
                    }
                  : {
                      clipPath: `circle(0% at ${originX}px ${originY}px)`,
                      opacity: 1,
                      transition: {
                        duration: 1.0,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }
                : useSimplifiedTransition
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    },
                  }
                : {
                    clipPath: `circle(150% at ${originX}px ${originY}px)`,
                    opacity: 1,
                    transition: {
                      duration: 1.2,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }
            }
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onAnimationComplete={handleAnimationComplete}
          >
            {/* Ambient Background Energy Rays / Gradients */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(108, 99, 255, 0.35) 0%, rgba(53, 212, 199, 0.15) 45%, transparent 75%)",
              }}
            />

            {/* Expanding Red Book Energy Wave (Ring pulse) for DIVE */}
            {direction === "dive" && !useSimplifiedTransition && (
              <motion.div
                className="absolute rounded-full pointer-events-none border border-book-red-glow/60"
                style={{
                  left: originX,
                  top: originY,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 60px 20px rgba(216, 83, 79, 0.6), inset 0 0 40px rgba(108, 99, 255, 0.5)",
                }}
                initial={{
                  width: "0vmax",
                  height: "0vmax",
                  opacity: 1,
                }}
                animate={{
                  width: ["0vmax", "220vmax"],
                  height: ["0vmax", "220vmax"],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            )}

            {/* Contracting Energy Wave for REALITY (reverse pulse inward) */}
            {direction === "reality" && !useSimplifiedTransition && (
              <motion.div
                className="absolute rounded-full pointer-events-none border border-cyan-400/40"
                style={{
                  left: originX,
                  top: originY,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 40px 15px rgba(53, 212, 199, 0.4), inset 0 0 30px rgba(139, 92, 246, 0.3)",
                }}
                initial={{
                  width: "180vmax",
                  height: "180vmax",
                  opacity: 0.6,
                }}
                animate={{
                  width: ["180vmax", "0vmax"],
                  height: ["180vmax", "0vmax"],
                  opacity: [0.6, 0.9, 0],
                }}
                transition={{
                  duration: 1.0,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            )}

            {/* Reality Transition: Reverse Typography Cross-Fade (Dive → Reality) */}
            {direction === "reality" ? (
              <div className="relative z-10 max-w-3xl px-8 text-center select-none pointer-events-none">
                <div className="relative h-28 md:h-36 flex items-center justify-center">
                  {/* DIVE Heading fades out */}
                  <motion.h2
                    className="absolute inset-0 flex items-center justify-center font-dive-heading text-2xl md:text-4xl text-dive-text tracking-wider"
                    style={{
                      textShadow:
                        "0 0 20px rgba(108, 99, 255, 0.8), 0 0 40px rgba(53, 212, 199, 0.6)",
                    }}
                    initial={{ opacity: 1, filter: "blur(0px)" }}
                    animate={{
                      opacity: [1, 0.6, 0],
                      filter: ["blur(0px)", "blur(2px)", "blur(8px)"],
                      scale: [1, 0.98, 0.95],
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    &ldquo;{crossfadeText}&rdquo;
                  </motion.h2>

                  {/* REALITY Heading fades in */}
                  <motion.h2
                    className="absolute inset-0 flex items-center justify-center font-reality-heading text-2xl md:text-4xl text-reality-bg tracking-wide"
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 1.05 }}
                    animate={{
                      opacity: [0, 0.3, 1],
                      filter: ["blur(8px)", "blur(2px)", "blur(0px)"],
                      scale: [1.05, 1.02, 1],
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    &ldquo;{crossfadeText}&rdquo;
                  </motion.h2>
                </div>

                {/* Sub-label */}
                <motion.p
                  className="mt-4 font-reality-body text-xs md:text-sm uppercase tracking-[0.35em] text-amber-200/80"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: [0, 1, 0], y: [-12, 0, 12] }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  — Kembali ke Realita —
                </motion.p>
              </div>
            ) : (
              /* Dive Transition Typography Cross-Fade */
              <div className="relative z-10 max-w-3xl px-8 text-center select-none pointer-events-none">
                <div className="relative h-28 md:h-36 flex items-center justify-center">
                  {/* 1. REALITY Heading (Special Elite) - Fades Out */}
                  <motion.h2
                    className="absolute inset-0 flex items-center justify-center font-reality-heading text-2xl md:text-4xl text-reality-bg tracking-wide"
                    initial={{ opacity: 1, filter: "blur(0px)" }}
                    animate={{
                      opacity: [1, 0.8, 0],
                      filter: ["blur(0px)", "blur(2px)", "blur(8px)"],
                      scale: [1, 1.02, 1.05],
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    &ldquo;{crossfadeText}&rdquo;
                  </motion.h2>

                  {/* 2. DIVE Heading (Pixelify Sans) - Fades In with Psychic Glow */}
                  <motion.h2
                    className="absolute inset-0 flex items-center justify-center font-dive-heading text-2xl md:text-4xl text-dive-text tracking-wider"
                    style={{
                      textShadow:
                        "0 0 20px rgba(108, 99, 255, 0.8), 0 0 40px rgba(53, 212, 199, 0.6)",
                    }}
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                    animate={{
                      opacity: [0, 0.2, 1],
                      filter: ["blur(8px)", "blur(2px)", "blur(0px)"],
                      scale: [0.95, 0.98, 1],
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    &ldquo;{crossfadeText}&rdquo;
                  </motion.h2>
                </div>

                {/* Sub-label indication */}
                <motion.p
                  className="mt-4 font-dive-body text-xs md:text-sm uppercase tracking-[0.35em] text-dive-accent-glow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  — Menyelami Alam Pikiran —
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
