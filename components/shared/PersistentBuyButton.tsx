"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * PERSISTENT BUY BUTTON
 *
 * Fixed bottom-right CTA that appears after user
 * scrolls past the Hero section. Small, unobtrusive,
 * but always accessible. Clicks scroll to #playnow.
 *
 * Positioned to avoid collision with MemoryMap toggle
 * (top-left) on mobile.
 * ═══════════════════════════════════════════════════ */

export function PersistentBuyButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~60% of viewport height
      setIsVisible(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPlayNow = () => {
    const target = document.getElementById("playnow");
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="persistent-buy"
          onClick={scrollToPlayNow}
          className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full bg-book-red px-4 py-2.5 font-dive-heading text-xs text-white shadow-[0_4px_20px_rgba(179,58,58,0.4)] transition-all duration-300 hover:scale-105 hover:bg-book-red-glow hover:shadow-[0_0_24px_6px_rgba(216,83,79,0.5)] md:px-5 md:py-3 md:text-sm"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Beli game — scroll ke section Play Now"
        >
          <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span>Beli Sekarang</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
