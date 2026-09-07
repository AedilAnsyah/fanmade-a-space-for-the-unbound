"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayer } from "@/components/layer/useLayer";
import { ChevronUp, ChevronDown, ShoppingCart, Menu, X } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * MINIMALIST FLOATING NAVBAR
 *
 * - Adapts to REALITY and DIVE layers
 * - Auto-hides on scroll down, reveals on scroll up
 * - Manual hide/minimize toggle button
 * - Collapsed state: ultra-minimalist glowing pill
 * - Mobile navigation menu for small screens (< 640px)
 * - Smooth scroll integration with Lenis
 * ═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { id: "home", label: "Beranda", icon: "🏠" },
  { id: "prologue", label: "Sinopsis", icon: "📖" },
  { id: "trailer", label: "Trailer", icon: "📺" },
  { id: "characters", label: "Karakter", icon: "👥" },
  { id: "gameplay", label: "Gameplay", icon: "🎮" },
  { id: "news", label: "Berita", icon: "📰" },
];

export function Navbar() {
  const { layer, startDiveTransition, startRealityTransition } = useLayer();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Auto-hide on scroll down, show on scroll up, and track active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect if scrolled past hero
      setIsScrolled(currentScrollY > 60);

      // Auto-hide behavior (close mobile menu if open)
      if (currentScrollY > 150 && currentScrollY > lastScrollY.current + 8) {
        setIsHidden(true);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;

      // Track active section for page position styling
      const sections = ["playnow", "news", "gameplay", "characters", "trailer", "prologue", "home"];
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
    setMobileMenuOpen(false);

    if (sectionId === "home") {
      if (layer === "dive") {
        startRealityTransition(origin ?? null);
      } else {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.0 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

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

  const getActiveIcon = (id: string) => {
    const found = NAV_LINKS.find((l) => l.id === id);
    return found ? found.icon : "🏠";
  };

  const getActiveLabel = (id: string) => {
    const found = NAV_LINKS.find((l) => l.id === id);
    return found ? found.label : "Beranda";
  };

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
              <span className="text-xs">{getActiveIcon(activeSection)}</span>
              <span className="font-dive-heading text-xs uppercase tracking-wider">
                {getActiveLabel(activeSection)}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </motion.button>
          </div>
        ) : (
          /* ── EXPANDED FULL WIDTH NAVBAR ────────── */
          <motion.nav
            key="expanded-navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isHidden ? 0 : 1,
              y: isHidden ? -50 : 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex flex-col w-full rounded-b-xl md:rounded-b-2xl rounded-t-none border-b border-x-0 border-t-0 px-4 py-2 backdrop-blur-xl shadow-xl transition-colors duration-500 sm:px-6 md:px-8 lg:px-12"
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
            <div className="flex w-full items-center justify-between">
              {/* Left: Brand / Official Game Logo */}
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className="flex items-center gap-2.5 text-left cursor-pointer group"
                aria-label="Kembali ke Beranda"
              >
                <img
                  src="/assets/logo_trimmed.webp"
                  alt="Logo A Space for the Unbound"
                  width={36}
                  height={36}
                  loading="eager"
                  className="h-8 md:h-9 w-auto object-contain filter drop-shadow transition-transform group-hover:scale-105"
                />
                <span
                  className="font-dive-heading text-xs sm:text-sm font-bold tracking-wide leading-tight"
                  style={{ color: isReality ? "#2B2018" : "#ffffff" }}
                >
                  A Space for the Unbound
                </span>
              </button>

              {/* Center: Desktop Navigation Links */}
              <div className="hidden sm:flex items-center gap-1 md:gap-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  const isHovered = hoveredNav === link.id;

                  return (
                    <button
                      key={link.id}
                      type="button"
                      onMouseEnter={() => setHoveredNav(link.id)}
                      onMouseLeave={() => setHoveredNav(null)}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        scrollToSection(link.id, {
                          x: Math.round(rect.left + rect.width / 2),
                          y: Math.round(rect.top + rect.height / 2),
                        });
                      }}
                      className="group relative rounded-lg px-2.5 md:px-3 py-1.5 font-dive-heading text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 select-none"
                      style={{
                        transform: isHovered && !isActive ? "translateY(-1px) scale(1.05)" : isActive ? "scale(1.02)" : "none",
                        color: isActive
                          ? "#FFFFFF"
                          : isHovered
                          ? isReality
                            ? "#8A1C1C"
                            : "#35D4C7"
                          : isReality
                          ? "#382D24"
                          : "#EDEBFA",
                        backgroundColor: isActive
                          ? isReality
                            ? "#B33A3A"
                            : "var(--dive-accent)"
                          : isHovered
                          ? isReality
                            ? "rgba(179, 58, 58, 0.12)"
                            : "rgba(108, 99, 255, 0.22)"
                          : "transparent",
                        border: isActive
                          ? isReality
                            ? "1px solid rgba(179, 58, 58, 0.8)"
                            : "1px solid var(--dive-accent)"
                          : isHovered
                          ? isReality
                            ? "1px solid rgba(179, 58, 58, 0.35)"
                            : "1px solid rgba(53, 212, 199, 0.45)"
                          : "1px solid transparent",
                        boxShadow: isActive
                          ? isReality
                            ? "0 3px 12px rgba(179,58,58,0.4)"
                            : "0 0 16px color-mix(in srgb, var(--dive-accent) 60%, transparent)"
                          : isHovered
                          ? isReality
                            ? "0 3px 10px rgba(179,58,58,0.18)"
                            : "0 0 14px rgba(53, 212, 199, 0.3)"
                          : "none",
                      }}
                    >
                      <span className="relative z-10 font-medium tracking-wide">{link.label}</span>
                      {isActive && (
                        <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right: Quick Actions, Mobile Menu Button & Minimize */}
              <div className="flex items-center gap-1.5 sm:gap-2">
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
                  className="flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3.5 py-1.5 font-dive-heading text-xs text-white shadow-md transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: "#B33A3A",
                    boxShadow: "0 0 12px rgba(179,58,58,0.4)",
                  }}
                  aria-label="Beli Game di Platform Resmi"
                >
                  <ShoppingCart className="h-3 w-3" />
                  <span className="hidden xs:inline sm:inline">Beli Game</span>
                  <span className="xs:hidden sm:hidden">Beli</span>
                </button>

                {/* Mobile Menu Hamburger Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="sm:hidden flex h-7 w-7 items-center justify-center rounded-lg border transition-all hover:opacity-100 opacity-80 cursor-pointer"
                  style={{
                    borderColor: isReality ? "rgba(140,123,101,0.3)" : "rgba(255,255,255,0.15)",
                    color: isReality ? "#2B2018" : "#EDEBFA",
                  }}
                  aria-label={mobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
                >
                  {mobileMenuOpen ? (
                    <X className="h-3.5 w-3.5" />
                  ) : (
                    <Menu className="h-3.5 w-3.5" />
                  )}
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
            </div>

            {/* ── MOBILE ACCORDION DRAWER (< 640px) ── */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="sm:hidden overflow-hidden pt-2 border-t mt-2"
                  style={{
                    borderColor: isReality ? "rgba(140,123,101,0.2)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-1.5 py-1">
                    {NAV_LINKS.map((link) => {
                      const isActive = activeSection === link.id;
                      return (
                        <button
                          key={`mobile-${link.id}`}
                          type="button"
                          onClick={() => scrollToSection(link.id)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-dive-heading text-xs transition-all hover:scale-[1.03] hover:shadow-md active:scale-95 cursor-pointer"
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
                              : isReality
                              ? "rgba(140,123,101,0.12)"
                              : "rgba(255,255,255,0.06)",
                            border: isActive
                              ? isReality
                                ? "1px solid rgba(179, 58, 58, 0.8)"
                                : "1px solid var(--dive-accent)"
                              : isReality
                              ? "1px solid rgba(140,123,101,0.2)"
                              : "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          <span>{link.icon}</span>
                          <span className="font-semibold">{link.label}</span>
                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
