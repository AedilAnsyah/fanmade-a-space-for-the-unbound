"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayer } from "@/components/layer/useLayer";
import { BookOpen, Sparkles, ChevronUp, ChevronDown, Compass, ShoppingCart } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * MINIMALIST FLOATING NAVBAR
 *
 * - Adapts to REALITY and DIVE layers
 * - Auto-hides on scroll down, reveals on scroll up
 * - Manual hide/minimize toggle button
 * - Collapsed state: ultra-minimalist glowing pill
 * - Smooth scroll integration with Lenis
 * ═══════════════════════════════════════════════════ */

export function Navbar() {
  const { layer, exitDive, enterDive, startDiveTransition, startRealityTransition } = useLayer();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  // Auto-hide on scroll down, show on scroll up, and track active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect if scrolled past hero
      setIsScrolled(currentScrollY > 60);

      // Auto-hide behavior
      if (currentScrollY > 150 && currentScrollY > lastScrollY.current + 8) {
        setIsHidden(true); // scrolling down
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsHidden(false); // scrolling up
      }

      lastScrollY.current = currentScrollY;

      // Track active section for page position styling
      const sections = ["playnow", "news", "gameplay", "trailer", "prologue", "home"];
      const scrollCheck = currentScrollY + 250;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollCheck >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, origin?: { x: number; y: number } | null) => {
    if (sectionId === "home") {
      if (layer === "dive") {
        // Trigger reverse transition back to reality
        startRealityTransition();
      } else {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.0 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    // If currently in reality, trigger the book dive transition to enter dive and navigate to target section
    if (layer === "reality") {
      startDiveTransition(origin ?? null, sectionId);
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -20, duration: 1.0 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isReality = layer === "reality";

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-[95] pointer-events-none">
      <AnimatePresence mode="wait">
        {/* ── COLLAPSED / MINIMIZED DOCKED TAB (CENTERED AT TOP) ─────── */}
        {isMinimized ? (
          <div className="flex w-full justify-center pointer-events-none">
            <motion.button
              key="minimized-nav-pill"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMinimized(false)}
              className="pointer-events-auto flex items-center gap-2 rounded-b-xl rounded-t-none border-x border-b border-t-0 px-4 py-2 backdrop-blur-xl shadow-xl transition-all hover:translate-y-0.5 cursor-pointer"
              style={{
                backgroundColor: isReality ? "rgba(244,233,216,0.92)" : "rgba(10,14,39,0.92)",
                borderColor: isReality ? "rgba(140,123,101,0.3)" : "rgba(255,255,255,0.15)",
                color: isReality ? "#2B2018" : "#EDEBFA",
                boxShadow: isReality ? "0 4px 16px rgba(0,0,0,0.1)" : "0 0 20px rgba(108,99,255,0.25)",
              }}
              aria-label="Buka navigasi menu"
            >
              <span className="text-xs">
                {activeSection === "gameplay"
                  ? "🎮"
                  : activeSection === "news"
                  ? "📰"
                  : activeSection === "trailer"
                  ? "📺"
                  : activeSection === "prologue"
                  ? "📖"
                  : "🏠"}
              </span>
              <span className="font-dive-heading text-xs uppercase tracking-wider">
                {activeSection === "gameplay"
                  ? "Gameplay"
                  : activeSection === "news"
                  ? "Berita"
                  : activeSection === "trailer"
                  ? "Trailer"
                  : activeSection === "prologue"
                  ? "Sinopsis"
                  : "Beranda"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </motion.button>
          </div>
        ) : (
          /* ── EXPANDED FULL WIDTH NAVBAR (MENTOK KIRI & KANAN, SIKU ROUNDED) ────────── */
          <motion.nav
            key="expanded-navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isHidden ? 0 : 1,
              y: isHidden ? -50 : 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full items-center justify-between rounded-b-xl md:rounded-b-2xl rounded-t-none border-b border-x-0 border-t-0 px-4 py-2 backdrop-blur-xl shadow-xl transition-colors duration-500 sm:px-6 md:px-8 lg:px-12"
            style={{
              backgroundColor: isReality
                ? "rgba(244,233,216,0.92)"
                : "rgba(10,14,39,0.92)",
              borderColor: isReality
                ? "rgba(140,123,101,0.2)"
                : "rgba(255,255,255,0.08)",
              boxShadow: isReality
                ? "0 4px 20px rgba(0,0,0,0.06)"
                : "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Left: Brand / Official Game Logo */}
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <img
                src="/assets/logo_trimmed.webp"
                alt="Logo A Space for the Unbound"
                className="h-8 md:h-9 w-auto object-contain filter drop-shadow transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span
                  className="font-dive-heading text-xs md:text-sm font-bold tracking-wider leading-none"
                  style={{ color: isReality ? "#2B2018" : "#ffffff" }}
                >
                  MENYELAM
                </span>
                <span
                  className="font-dive-body text-[9px] uppercase tracking-widest leading-none mt-0.5"
                  style={{ color: isReality ? "#6B5D4A" : "var(--dive-accent)" }}
                >
                  A Space for the Unbound
                </span>
              </div>
            </button>

            {/* Center: Navigation Links with Styled Active Indicators */}
            <div className="hidden sm:flex items-center gap-1 md:gap-1.5">
              {[
                { id: "home", label: "Beranda" },
                { id: "prologue", label: "Sinopsis" },
                { id: "trailer", label: "Trailer" },
                { id: "gameplay", label: "Gameplay" },
                { id: "news", label: "Berita" },
              ].map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      scrollToSection(link.id, {
                        x: Math.round(rect.left + rect.width / 2),
                        y: Math.round(rect.top + rect.height / 2),
                      });
                    }}
                    className="relative rounded-lg px-3 py-1 font-dive-heading text-xs transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-1.5"
                    style={{
                      color: isActive
                        ? "#FFFFFF"
                        : isReality
                        ? "#2B2018"
                        : "#EDEBFA",
                      backgroundColor: isActive
                        ? isReality
                          ? "#B33A3A"
                          : "var(--dive-accent)"
                        : "transparent",
                      boxShadow: isActive
                        ? isReality
                          ? "0 2px 10px rgba(179,58,58,0.4)"
                          : "0 0 14px color-mix(in srgb, var(--dive-accent) 50%, transparent)"
                        : "none",
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Quick Actions & Minimize Button */}
            <div className="flex items-center gap-2">
              {/* Play Now CTA Link */}
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  scrollToSection("playnow", {
                    x: Math.round(rect.left + rect.width / 2),
                    y: Math.round(rect.top + rect.height / 2),
                  });
                }}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-dive-heading text-xs text-white shadow-md transition-all hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: "#B33A3A",
                  boxShadow: "0 0 12px rgba(179,58,58,0.4)",
                }}
              >
                <ShoppingCart className="h-3 w-3" />
                <span>Beli Game</span>
              </button>

              {/* Hide / Minimize Button */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border transition-all hover:opacity-100 opacity-60 cursor-pointer"
                style={{
                  borderColor: isReality ? "rgba(140,123,101,0.3)" : "rgba(255,255,255,0.15)",
                  color: isReality ? "#2B2018" : "#EDEBFA",
                }}
                title="Sembunyikan Navbar"
                aria-label="Sembunyikan Navbar"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
