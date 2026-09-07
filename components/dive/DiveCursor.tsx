"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useLayer } from "@/components/layer/useLayer";

/* ═══════════════════════════════════════════════════
 * DIVE CURSOR
 *
 * Custom floating light-dot cursor visible ONLY in
 * the DIVE layer. Uses Framer Motion useSpring for
 * a smooth trailing/lag effect ("floating in the mind").
 *
 * - 12px circle colored by --dive-accent
 * - Glow box-shadow that matches active character tint
 * - Scales up (1.5x) when hovering interactive elements
 * - Hidden on touch devices (no mouse cursor there)
 * - aria-hidden for screen readers (purely decorative)
 * ═══════════════════════════════════════════════════ */

const SPRING_CONFIG = { damping: 25, stiffness: 200, mass: 0.5 };

const INTERACTIVE_SELECTORS = [
  "button",
  "a",
  "[role='button']",
  "[data-cursor-hover]",
  ".memory-map-node",
].join(",");

export function DiveCursor() {
  const { layer } = useLayer();
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true to avoid flash
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springy position (trails behind mouse)
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  /* ── Detect touch device ─────────────────────────── */
  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    // Also check if it's a "coarse" pointer (mobile/tablet stylus)
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(hasTouch && isCoarse);
  }, []);

  /* ── Track mouse movement ────────────────────────── */
  useEffect(() => {
    if (isTouchDevice || layer !== "dive") return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, layer, mouseX, mouseY, isVisible]);

  /* ── Detect hover on interactive elements ────────── */
  useEffect(() => {
    if (isTouchDevice || layer !== "dive") return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTORS)) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouchDevice, layer]);

  /* ── Toggle cursor: none on body when in DIVE ────── */
  useEffect(() => {
    if (isTouchDevice) return;

    if (layer === "dive") {
      document.body.classList.add("dive-cursor-active");
    } else {
      document.body.classList.remove("dive-cursor-active");
    }

    return () => {
      document.body.classList.remove("dive-cursor-active");
    };
  }, [layer, isTouchDevice]);

  // Don't render on touch devices or outside DIVE
  if (isTouchDevice || layer !== "dive") return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9998]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { type: "spring", damping: 20, stiffness: 300 },
        opacity: { duration: 0.15 },
      }}
    >
      {/* Main cursor dot */}
      <div
        className="h-3 w-3 rounded-full"
        style={{
          backgroundColor: "var(--dive-accent)",
          boxShadow: [
            "0 0 6px 2px var(--dive-accent)",
            "0 0 16px 4px color-mix(in srgb, var(--dive-accent) 50%, transparent)",
            "0 0 30px 8px color-mix(in srgb, var(--dive-accent) 20%, transparent)",
          ].join(", "),
        }}
      />

      {/* Outer ring (visible on hover) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          borderColor: "var(--dive-accent)",
        }}
        animate={{
          width: isHovering ? 36 : 20,
          height: isHovering ? 36 : 20,
          opacity: isHovering ? 0.5 : 0.15,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </motion.div>
  );
}
