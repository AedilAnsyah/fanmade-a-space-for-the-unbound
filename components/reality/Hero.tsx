"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { TrailerModal } from "@/components/shared/TrailerModal";
import { DeskPropModal } from "./DeskPropModal";

/* ═══════════════════════════════════════════════════
 * HERO — REALITY LAYER: MEJA KELAS SMA INDONESIA
 *
 * Suasana meja kayu di ruang kelas SMA era 90-an/2000-an:
 * - Serat kayu meja dengan guratan & ukiran coretan pena ("XII-A", "A+R")
 * - Sinar matahari sore (golden hour) menembus jendela kaca sekolah
 * - Buku catatan merah Atma yang tergeletak di tengah meja
 * - Foto polaroid Atma & Raya dengan solasi kertas
 * - Kertas binder sobekan bertuliskan "Daftar Impian Sebelum Lulus"
 * - Pulpen jadul, kaset pita walkman (interaktif untuk trailer)
 * ═══════════════════════════════════════════════════ */

const MOBILE_DUST = [
  { top: "18%", left: "22%", size: 1.6, dur: 7.5, delay: 0, dx: 12, dy: -22 },
  { top: "32%", left: "35%", size: 2.0, dur: 8.5, delay: 1.0, dx: -10, dy: -28 },
  { top: "48%", left: "26%", size: 1.4, dur: 7.0, delay: 2.2, dx: 14, dy: -20 },
  { top: "25%", left: "55%", size: 1.8, dur: 9.0, delay: 0.5, dx: -12, dy: -30 },
  { top: "58%", left: "42%", size: 1.5, dur: 8.0, delay: 1.8, dx: 10, dy: -24 },
];

const DESKTOP_DUST = [
  { top: "14%", left: "18%", size: 1.5, dur: 7.2, delay: 0, dx: 14, dy: -24 },
  { top: "22%", left: "26%", size: 2.2, dur: 8.5, delay: 1.2, dx: -12, dy: -30 },
  { top: "34%", left: "20%", size: 1.2, dur: 6.8, delay: 2.1, dx: 18, dy: -20 },
  { top: "26%", left: "40%", size: 1.8, dur: 9.1, delay: 0.5, dx: -8, dy: -35 },
  { top: "44%", left: "32%", size: 1.4, dur: 7.6, delay: 3.0, dx: 15, dy: -25 },
  { top: "36%", left: "50%", size: 2.0, dur: 8.0, delay: 1.8, dx: -14, dy: -28 },
  { top: "50%", left: "24%", size: 1.0, dur: 6.5, delay: 2.5, dx: 10, dy: -18 },
  { top: "20%", left: "60%", size: 1.6, dur: 8.8, delay: 3.5, dx: -16, dy: -32 },
  { top: "46%", left: "56%", size: 1.3, dur: 7.0, delay: 0.9, dx: 12, dy: -22 },
  { top: "60%", left: "38%", size: 1.9, dur: 9.5, delay: 2.8, dx: -10, dy: -30 },
  { top: "28%", left: "14%", size: 1.1, dur: 6.2, delay: 1.5, dx: 8, dy: -16 },
  { top: "56%", left: "66%", size: 1.5, dur: 8.2, delay: 4.0, dx: -12, dy: -26 },
  { top: "16%", left: "46%", size: 2.4, dur: 9.8, delay: 0.3, dx: 16, dy: -36 },
  { top: "64%", left: "20%", size: 1.2, dur: 7.4, delay: 3.2, dx: 14, dy: -20 },
  { top: "38%", left: "68%", size: 1.7, dur: 8.4, delay: 1.1, dx: -10, dy: -24 },
];

interface HeroProps {
  onOpenBook: (origin: { x: number; y: number }) => void;
  isTransitioning: boolean;
  /** When true, Hero shows book in open state and animates it closing */
  isBookClosing?: boolean;
  /** Callback when book closing animation finishes */
  onBookClosed?: () => void;
}

export function Hero({ onOpenBook, isTransitioning, isBookClosing = false, onBookClosed }: HeroProps) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [inspectedProp, setInspectedProp] = useState<"binder" | "polaroid" | null>(null);
  const [isBookHovered, setIsBookHovered] = useState(false);
  const [isBookOpening, setIsBookOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pendingOriginRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // ── BOOK CLOSING ANIMATION SEQUENCE ──
  // When isBookClosing is true (returning from dive):
  // 1. While isTransitioning is true: hold book open ("open_holding") so it's visible behind contracting overlay
  // 2. When isTransitioning becomes false: pause 350ms to let user see open book on the desk
  // 3. Switch to "closing": cover rotates back 180° -> 0° over 1.1s with natural weighted easing
  // 4. When closing completes: switch to "idle" and call onBookClosed()
  const [closingPhase, setClosingPhase] = useState<"idle" | "open_holding" | "closing">("idle");

  useEffect(() => {
    if (isBookClosing) {
      if (isTransitioning) {
        setClosingPhase("open_holding");
      } else {
        // Overlay finished! Ensure open_holding is active first if idle
        setClosingPhase("open_holding");

        const closeTimer = setTimeout(() => {
          setClosingPhase("closing");
        }, 350);

        const doneTimer = setTimeout(() => {
          setClosingPhase("idle");
          onBookClosed?.();
        }, 350 + 1150);

        return () => {
          clearTimeout(closeTimer);
          clearTimeout(doneTimer);
        };
      }
    } else {
      setClosingPhase("idle");
    }
  }, [isBookClosing, isTransitioning, onBookClosed]);

  // Derived state: whether the book should visually appear OPEN
  // True during opening animation OR when held open during/after transition
  const bookIsOpen = isBookOpening || closingPhase === "open_holding";
  const isClosingAnim = closingPhase === "closing";
  const bookAnimDuration = isBookOpening || isClosingAnim ? 1.1 : 0.3;
  const bookAnimEase = isClosingAnim ? [0.35, 0, 0.25, 1] : [0.28, 1.05, 0.4, 1];

  // Trigger full book-opening animation, then fire the dive transition after the book is completely open
  const handleBookClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isBookOpening || isTransitioning) return;
      // Capture coordinates NOW while the event is still live
      const rect = e.currentTarget.getBoundingClientRect();
      pendingOriginRef.current = {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      };
      setIsBookOpening(true);

      // Allow 1.6 seconds: 1.1s for the 3D cover to flip completely open 180° into a 2-page spread,
      // plus ~500ms to admire the open glowing pages and magical portal before transition fires
      setTimeout(() => {
        if (pendingOriginRef.current) {
          onOpenBook(pendingOriginRef.current);
          pendingOriginRef.current = null;
        }
      }, 1600);
    },
    [isBookOpening, isTransitioning, onOpenBook]
  );

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-8 sm:px-6 md:py-12 select-none"
        style={{
          // Worn Indonesian classroom teak desk — organic tone variation
          backgroundColor: "#331D0B",
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 45% 40%, rgba(100, 60, 22, 0.5) 0%, transparent 100%),
            radial-gradient(ellipse 40% 30% at 78% 25%, rgba(75, 42, 14, 0.35) 0%, transparent 100%),
            radial-gradient(ellipse 35% 25% at 20% 70%, rgba(90, 52, 18, 0.3) 0%, transparent 100%),
            radial-gradient(ellipse 15% 12% at 60% 80%, rgba(50, 28, 8, 0.4) 0%, transparent 100%),
            linear-gradient(180deg, #3E2410 0%, #331D0B 35%, #2A1608 65%, #201005 100%)
          `,
        }}
      >
        {/* ── 1. ORGANIC WOOD CHARACTER (NO ARTIFICIAL LINES) ──────── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Broad natural wood tone variation — irregular warm/dark patches without any repeating lines */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 55% 38% at 30% 45%, rgba(120,75,30,0.3) 0%, transparent 100%),
                radial-gradient(ellipse 48% 42% at 70% 55%, rgba(60,35,12,0.25) 0%, transparent 100%),
                radial-gradient(ellipse 28% 22% at 15% 20%, rgba(140,90,35,0.2) 0%, transparent 100%),
                radial-gradient(ellipse 32% 18% at 85% 80%, rgba(100,60,20,0.25) 0%, transparent 100%)
              `,
            }}
          />

          {/* Natural soft specular sheen where afternoon window light pools on varnished wood */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 45% at 32% 32%, rgba(255, 230, 160, 0.28) 0%, rgba(255, 195, 100, 0.08) 45%, transparent 75%)",
            }}
          />

          {/* Subtle natural wood knots */}
          <div
            className="absolute top-[18%] left-[22%] w-6 h-4 rounded-[60%_40%_50%_50%] opacity-15 rotate-[15deg]"
            style={{ background: "radial-gradient(ellipse, #1A0D04 0%, transparent 65%)" }}
          />
          <div
            className="absolute top-[55%] right-[15%] w-5 h-3 rounded-[40%_60%_50%_50%] opacity-12 -rotate-[8deg]"
            style={{ background: "radial-gradient(ellipse, #1A0D04 0%, transparent 60%)" }}
          />
          <div
            className="absolute top-[75%] left-[45%] w-4 h-3 rounded-[50%_50%_40%_60%] opacity-10 rotate-[22deg]"
            style={{ background: "radial-gradient(ellipse, #150A03 0%, transparent 70%)" }}
          />

          {/* Desk edge wear — slightly lighter at bottom where students' arms and books rest */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 opacity-25"
            style={{ background: "linear-gradient(to top, rgba(180,140,80,0.3) 0%, transparent 100%)" }}
          />
        </div>

        {/* ── 2. REALISTIC GOLDEN HOUR CLASSROOM SUNLIGHT & GLITTERING DUST ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Soft atmospheric window light bloom (smooth falloff, no harsh diagonal streaks) */}
          <div
            className="absolute -top-32 -left-32 w-[135%] h-[120%] opacity-35"
            style={{
              background:
                "radial-gradient(ellipse 85% 65% at 20% 15%, rgba(255, 235, 165, 0.42) 0%, rgba(255, 195, 95, 0.16) 35%, transparent 68%)",
            }}
          />

          {/* Soft diffused classroom window pane shadow */}
          <div
            className="absolute -top-12 -left-12 w-[720px] h-[600px] opacity-10 rotate-12 blur-[3px]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.85) 28px, transparent 28px),
                linear-gradient(to bottom, rgba(0,0,0,0.85) 28px, transparent 28px)
              `,
              backgroundSize: "180px 220px",
            }}
          />

          {(isMobile ? MOBILE_DUST : DESKTOP_DUST).map((dust, idx) => (
            <div
              key={`dust-mote-${idx}`}
              className="absolute rounded-full pointer-events-none dust-mote-gpu"
              style={{
                top: dust.top,
                left: dust.left,
                width: dust.size,
                height: dust.size,
                backgroundColor: "#FFF8DC",
                boxShadow:
                  dust.size > 1.5
                    ? "0 0 3px 1px rgba(255, 235, 160, 0.75)"
                    : "0 0 2px rgba(255, 240, 180, 0.5)",
                // Pass CSS animation variables to compositor
                ["--dx" as string]: `${dust.dx}px`,
                ["--dy" as string]: `${dust.dy}px`,
                ["--dur" as string]: `${dust.dur}s`,
                ["--delay" as string]: `${dust.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ── 4. HEADER: STORY HEADLINE (Static for zero CLS & instant load) ─────── */}
        <div className="relative z-20 mx-auto max-w-3xl text-center pt-8 sm:pt-10">
          <h1 className="mt-1 font-reality-heading text-2xl sm:text-4xl md:text-5xl text-[#F5EEDC] leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Ada dunia lain yang tersembunyi di atas meja ini.
          </h1>

          <p className="mt-2 font-reality-body text-xs sm:text-sm text-amber-100/70 max-w-xl mx-auto leading-relaxed">
            Sebuah musim panas terakhir sebelum kelulusan SMA. Sentuh dan buka buku catatan merah Atma untuk menyelami ingatan, rahasia, dan keajaiban yang ada di Kota Loka.
          </p>
        </div>

        {/* ── 5. THE REALISTIC DESK SURFACE ENSEMBLE ──────── */}
        <div className="relative z-20 mx-auto my-6 sm:my-8 flex w-full max-w-5xl items-center justify-center">
          {/* DESK PROPS WRAPPER */}
          <div className="relative flex w-full flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            
            {/* ── PROP A: BINDER PAPER / BUCKET LIST (LEFT) ── */}
            <motion.div
              initial={false}
              animate={{
                opacity: bookIsOpen ? 0.15 : 1,
                x: bookIsOpen ? -80 : 0,
              }}
              transition={{ duration: isClosingAnim ? 1.1 : 0.8, delay: bookIsOpen ? 0.3 : 0 }}
              className="hidden md:block select-none"
            >
              <div
                onClick={() => setInspectedProp("binder")}
                className="group relative w-60 sm:w-64 p-3.5 rounded-sm bg-[#FFFDF5] text-[#2B2018] shadow-[0_14px_28px_rgba(0,0,0,0.6)] -rotate-6 transition-all hover:-rotate-2 hover:scale-105 duration-300 cursor-pointer select-none hover:shadow-[0_20px_35px_rgba(0,0,0,0.75)]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(transparent, transparent 21px, rgba(59, 130, 246, 0.2) 21px, rgba(59, 130, 246, 0.2) 22px)
                  `,
                  lineHeight: "22px",
                }}
                title="Klik untuk mengangkat & membaca catatan binder"
              >
                {/* Masking Tape on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/75 border border-amber-300/40 shadow-sm rotate-1" />

                <div className="text-[10px] font-mono uppercase tracking-wider text-red-700 font-bold border-b border-red-200 pb-1 mb-1.5 flex items-center justify-between">
                  <span>CATATAN BINDER</span>
                  <span className="text-[9px] text-gray-500">Hal. 12</span>
                </div>

                <h4 className="font-reality-heading text-xs font-bold text-[#1C1917] mb-1">
                  Daftar Impian Sebelum Lulus:
                </h4>

                <ul className="font-reality-body text-[11px] text-[#44403C] space-y-1">
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">☑</span>
                    <span>Beli es potong di depan gerbang</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">☑</span>
                    <span>Temani Raya cari kucing belang 3</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">☑</span>
                    <span>Nonton film di Bioskop Surya</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-red-800 font-semibold">
                    <span className="text-red-700 font-bold">☐</span>
                    <span>Ungkapkan rahasia tentang masa depan...</span>
                  </li>
                </ul>

                <div className="mt-2 pt-1 border-t border-dashed border-gray-300 text-[9px] font-mono text-gray-500 italic text-right">
                  — Tulisan tangan Atma &amp; Raya
                </div>
              </div>
            </motion.div>

            {/* ── PROP B: THE PROMINENT RED NOTEBOOK (CENTER) ── */}
            <div className="relative flex flex-col items-center">
              {/* Natural Ambient Warmth Behind the Red Book */}
              <motion.div
                initial={false}
                className="absolute inset-0 -m-6 rounded-3xl blur-2xl pointer-events-none"
                animate={{
                  scale: bookIsOpen ? (isMobile ? 1.5 : 2.0) : isBookHovered ? 1.1 : 1,
                  background: bookIsOpen
                    ? "radial-gradient(circle, rgba(53, 212, 199, 0.45) 0%, rgba(139, 92, 246, 0.4) 40%, rgba(220, 38, 38, 0.25) 70%, transparent 90%)"
                    : isBookHovered
                    ? "radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 70%)"
                    : "radial-gradient(circle, rgba(140, 20, 20, 0.08) 0%, transparent 65%)",
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Physical Red Hardcover Book Button */}
              <button
                type="button"
                onClick={handleBookClick}
                disabled={isTransitioning || bookIsOpen || isBookClosing}
                onMouseEnter={() => setIsBookHovered(true)}
                onMouseLeave={() => setIsBookHovered(false)}
                className="relative cursor-pointer outline-none select-none"
                style={{ perspective: "2200px" }}
                aria-label="Buka Buku Catatan Merah Atma untuk memulai SpaceDive"
              >
                {/* Outer wrapper: centers the spine when opening by shifting X by 50% */}
                <motion.div
                  initial={false}
                  animate={{
                    x: bookIsOpen ? (isMobile ? "35%" : "50%") : "0%",
                    y: bookIsOpen ? -14 : isBookHovered ? -8 : 0,
                    rotateX: bookIsOpen ? 14 : isBookHovered ? 10 : 4,
                    scale: bookIsOpen ? (isMobile ? 0.65 : 1) : isBookHovered ? 1.03 : 1,
                  }}
                  transition={{
                    duration: bookAnimDuration,
                    ease: bookAnimEase,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-[270px] sm:w-[310px] md:w-[340px] aspect-[1/1.38]"
                >
                  {/* ────────────────────────────────────────────────
                      1. STATIONARY BASE: RIGHT PAGE (HALAMAN KANAN)
                      Revealed underneath when the front cover flips open
                     ──────────────────────────────────────────────── */}
                  <div
                    className="absolute inset-0 rounded-r-xl rounded-l-sm p-4 sm:p-5 flex flex-col justify-between overflow-hidden text-left"
                    style={{
                      backgroundColor: "#F8F4EA",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 20px, rgba(147, 197, 253, 0.3) 20px, rgba(147, 197, 253, 0.3) 21px),
                        linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 7%, transparent 16%)
                      `,
                      border: "3px solid #6E1212",
                      borderLeft: "none",
                      boxShadow: bookIsOpen
                        ? "0 28px 60px rgba(0,0,0,0.85), inset -2px 0 6px rgba(0,0,0,0.1), inset 4px 0 10px rgba(0,0,0,0.25)"
                        : "none",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-red-900/20 pb-1.5 text-[9px] font-mono text-stone-600">
                      <span className="font-bold tracking-widest text-red-800 flex items-center gap-1.5">
                        <span className="text-amber-600 text-[11px] font-bold">✦</span>
                        GERBANG PIKIRAN
                      </span>
                      <span className="text-stone-500">Hal. 02</span>
                    </div>

                    {/* Central Mystical Seal / Portal Diagram */}
                    <div className="relative my-auto flex flex-col items-center justify-center py-2">
                      {/* Compass Circle / Astral Seal */}
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border-2 border-stone-800/40 flex items-center justify-center">
                        {/* Concentric rings */}
                        <div className="absolute inset-2 rounded-full border border-dashed border-red-800/30" />
                        <div className="absolute inset-6 rounded-full border border-stone-800/30" />

                        {/* Cardinal points */}
                        <span className="absolute top-1 text-[8px] font-mono font-bold text-red-800">U</span>
                        <span className="absolute bottom-1 text-[8px] font-mono font-bold text-stone-500">S</span>
                        <span className="absolute left-1.5 text-[8px] font-mono font-bold text-stone-500">B</span>
                        <span className="absolute right-1.5 text-[8px] font-mono font-bold text-stone-500">T</span>

                        {/* Astrological constellation lines */}
                        <div className="absolute w-24 h-0.5 bg-stone-800/20 rotate-45" />
                        <div className="absolute w-24 h-0.5 bg-stone-800/20 -rotate-45" />

                        {/* Center Vortex / Glowing Portal (Awakens when open) */}
                        <motion.div
                          className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                          animate={{
                            scale: bookIsOpen ? [0.8, 1.15, 1] : 0.8,
                            opacity: bookIsOpen ? 1 : 0.3,
                          }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background:
                                "radial-gradient(circle, rgba(53,212,199,0.9) 0%, rgba(139,92,246,0.85) 45%, rgba(245,158,11,0.6) 75%, transparent 100%)",
                            }}
                            animate={{
                              rotate: bookIsOpen ? [0, 360] : 0,
                              scale: bookIsOpen ? [1, 1.2, 1] : 1,
                            }}
                            transition={{
                              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                            }}
                          />
                          <span className="relative z-10 font-mono text-[9px] font-bold tracking-widest text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                            SPACEDIVE
                          </span>
                        </motion.div>

                        {/* Pulsing Energy Rings radiating from center */}
                        {bookIsOpen && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-full border border-cyan-400 pointer-events-none"
                              animate={{ scale: [1, 1.8], opacity: [0.9, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-full border border-purple-400 pointer-events-none"
                              animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: 1.0 }}
                            />
                          </>
                        )}
                      </div>

                      {/* Floating Light Sparkles */}
                      {bookIsOpen && (
                        <div className="absolute inset-0 pointer-events-none">
                          {[
                            { x: "35%", y: "25%", delay: 0.7 },
                            { x: "65%", y: "30%", delay: 0.9 },
                            { x: "50%", y: "70%", delay: 1.1 },
                            { x: "25%", y: "60%", delay: 0.8 },
                            { x: "75%", y: "65%", delay: 1.0 },
                          ].map((pt, i) => (
                            <motion.div
                              key={`portal-sparkle-${i}`}
                              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#35D4C7]"
                              style={{ left: pt.x, top: pt.y }}
                              animate={{
                                y: [-6, -26],
                                opacity: [0, 1, 0],
                                scale: [0.8, 1.4, 0.2],
                              }}
                              transition={{
                                duration: 1.3,
                                repeat: Infinity,
                                delay: pt.delay,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom handwritten guidance */}
                    <div className="border-t border-stone-300/60 pt-1.5 text-center">
                      <p className="font-serif text-[10px] italic text-stone-700 leading-tight">
                        &ldquo;Tutup matamu dan sentuh halaman ini. Ada dunia lain di balik pikiran.&rdquo;
                      </p>
                      <span className="font-mono text-[8px] text-red-800 uppercase tracking-wider font-semibold">
                        — Portal Memori Aktif —
                      </span>
                    </div>

                    {/* Right Page Edge Paper Stack */}
                    <div
                      className="absolute top-2 bottom-2 -right-3 w-3 rounded-r-xs bg-[#E8DAC2] border-r-2 border-t-2 border-b-2 border-[#8A7963] shadow-md"
                      style={{
                        backgroundImage: "repeating-linear-gradient(0deg, #E8DAC2 0px, #E8DAC2 2px, #C2B29A 2px, #C2B29A 3px)",
                      }}
                    />
                  </div>

                  {/* ────────────────────────────────────────────────
                      2. 3D FLIPPING LEAF (FRONT COVER -> LEFT PAGE)
                      Rotates 180° around the left spine edge
                     ──────────────────────────────────────────────── */}
                  <motion.div
                    initial={false}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      zIndex: 25,
                    }}
                    animate={{
                      rotateY: bookIsOpen ? -180 : 0,
                    }}
                    transition={{
                      duration: bookAnimDuration,
                      ease: bookAnimEase,
                    }}
                  >
                    {/* ── SIDE A: FRONT HARDCOVER (Visible when closed) ── */}
                    <div
                      className="absolute inset-0 rounded-r-xl rounded-l-md p-5 flex flex-col justify-between text-left select-none"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                        backgroundColor: "#8A1C1C",
                        backgroundImage: `
                          radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.35) 0%, rgba(90, 10, 10, 0.95) 100%),
                          repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px, transparent 2px, transparent 6px)
                        `,
                        border: "3px solid #5C0E0E",
                        boxShadow: isBookHovered
                          ? "0 28px 60px -10px rgba(0,0,0,0.85), 0 0 35px rgba(220, 38, 38, 0.5), inset 4px 0 10px rgba(255,255,255,0.15), inset -3px 0 8px rgba(0,0,0,0.5)"
                          : "0 18px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(185, 28, 28, 0.3), inset 4px 0 8px rgba(255,255,255,0.1), inset -3px 0 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Left Spine Book Binding Ridge */}
                      <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/40 via-white/10 to-black/30 rounded-l-md border-r border-[#4A0A0A]" />

                      {/* Golden Foil Ornate Inner Border Frame */}
                      <div className="relative z-10 h-full w-full rounded-lg border-2 border-amber-300/40 p-4 flex flex-col justify-between shadow-inner">
                        {/* Top Golden Header */}
                        <div className="flex items-center justify-between border-b border-amber-300/25 pb-2">
                          <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-amber-300 text-xs font-bold">✦</span>
                            <span>KOTA LOKA &bull; 1998</span>
                          </div>
                          <span className="font-mono text-[9px] text-amber-200/70">NO. 01</span>
                        </div>

                        {/* Book Center Golden Embossed Typography */}
                        <div className="my-auto text-center py-6">
                          <h3 className="font-reality-heading text-xl sm:text-2xl font-bold tracking-wider text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                            BUKU CATATAN RAHASIA
                          </h3>
                          <p className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-amber-300/80">
                            MILIK ATMA &bull; KELAS XII
                          </p>

                          <div className="mx-auto mt-4 h-0.5 w-20 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
                        </div>

                        {/* Bottom Interactive CTA Badge */}
                        <div className="relative z-10 rounded-lg border border-amber-300/40 bg-gradient-to-r from-red-950/80 via-red-900/80 to-red-950/80 py-2.5 px-3 text-center shadow-md group-hover:border-amber-300 group-hover:bg-red-800 transition-colors duration-300">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-reality-heading text-xs sm:text-sm font-bold tracking-wide text-white">
                              Buka Buku Merah
                            </span>
                            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                              ➔
                            </span>
                          </div>
                          <p className="mt-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-200/80">
                            Klik untuk Menyelami Memori (SpaceDive)
                          </p>
                        </div>
                      </div>

                      {/* Stacked Paper Pages Edge on Front Cover */}
                      <div
                        className="absolute top-2 bottom-2 -right-3.5 w-3.5 rounded-r-sm bg-[#E8DAC2] border-r-2 border-t-2 border-b-2 border-[#8A7963] shadow-[2px_4px_8px_rgba(0,0,0,0.6)]"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, #E8DAC2 0px, #E8DAC2 2px, #C2B29A 2px, #C2B29A 3px)",
                        }}
                      />
                    </div>

                    {/* ── SIDE B: INSIDE LEFT PAGE (Visible when flipped 180°) ── */}
                    <div
                      className="absolute inset-0 rounded-l-xl rounded-r-sm p-4 sm:p-5 flex flex-col justify-between overflow-hidden text-left select-none"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: "#F8F4EA",
                        backgroundImage: `
                          repeating-linear-gradient(transparent, transparent 20px, rgba(147, 197, 253, 0.3) 20px, rgba(147, 197, 253, 0.3) 21px),
                          linear-gradient(270deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 7%, transparent 16%)
                        `,
                        border: "3px solid #6E1212",
                        borderRight: "none",
                        boxShadow: "0 28px 60px rgba(0,0,0,0.85), inset 2px 0 6px rgba(0,0,0,0.1), inset -4px 0 10px rgba(0,0,0,0.25)",
                      }}
                    >
                      {/* Left Page Header */}
                      <div className="flex items-center justify-between border-b border-red-900/20 pb-1.5 text-[9px] font-mono text-stone-600">
                        <span className="font-bold tracking-widest text-red-800">CATATAN RAHASIA</span>
                        <span className="text-stone-500">Loka &bull; Juli &apos;98</span>
                      </div>

                      {/* Handwritten Journal Content */}
                      <div className="my-auto space-y-2.5 text-stone-800">
                        <div className="font-serif text-[11px] sm:text-xs leading-relaxed italic text-stone-800">
                          &ldquo;Buku catatan ini bukan buku biasa. Saat Raya memegangnya, ada bisikan rahasia yang terhubung langsung dengan pikiran orang-orang di kota ini...&rdquo;
                        </div>

                        {/* Little Quest Box */}
                        <div className="rounded border border-dashed border-amber-900/30 bg-amber-50/70 p-2 text-[10px] font-mono space-y-1">
                          <div className="font-bold text-red-800 text-[9px] uppercase tracking-wider">Misi Terakhir:</div>
                          <div className="flex items-center gap-1.5 text-emerald-800">
                            <span>☑</span>
                            <span>Beli es potong depan gerbang SMA</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-800">
                            <span>☑</span>
                            <span>Temani Raya cari kucing belang 3</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-red-900 font-semibold">
                            <span>☐</span>
                            <span>Menyelami alam pikiran (SpaceDive)</span>
                          </div>
                        </div>

                        {/* Doodle of Raya's 3-colored cat */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-stone-600 pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber-800 font-bold">/\_/\</span>
                            <span>( o.o ) ★ Kucing Loka</span>
                          </div>
                          <span className="text-[9px] text-stone-500 italic">— Atma &amp; Raya</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-stone-300/60 pt-1 text-[8px] font-mono text-stone-500 flex justify-between">
                        <span>SMA KOTA LOKA</span>
                        <span>HAL. 01</span>
                      </div>

                      {/* Left Page Edge Paper Stack */}
                      <div
                        className="absolute top-2 bottom-2 -left-3 w-3 rounded-l-xs bg-[#E8DAC2] border-l-2 border-t-2 border-b-2 border-[#8A7963] shadow-md"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, #E8DAC2 0px, #E8DAC2 2px, #C2B29A 2px, #C2B29A 3px)",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* ────────────────────────────────────────────────
                      3. CENTER SPINE CREASE & BINDING STITCHES
                      Visible down the middle fold between Left & Right page
                     ──────────────────────────────────────────────── */}
                  <motion.div
                    initial={false}
                    className="absolute top-0 bottom-0 left-0 -ml-2 w-4 z-30 pointer-events-none"
                    animate={{ opacity: bookIsOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: bookIsOpen ? 0.3 : 0 }}
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 100%)",
                    }}
                  >
                    {/* Spine binding thread stitch marks */}
                    <div className="h-full flex flex-col justify-around items-center py-4 opacity-50">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={`stitch-${i}`} className="w-1.5 h-0.5 bg-amber-100/90 rounded-full" />
                      ))}
                    </div>
                  </motion.div>

                  {/* ────────────────────────────────────────────────
                      4. RED SILK BOOKMARK RIBBON
                      Drapes from the spine down to the desk
                     ──────────────────────────────────────────────── */}
                  <motion.div
                    initial={false}
                    className="pointer-events-none absolute z-40 flex flex-col items-center"
                    animate={{
                      left: bookIsOpen ? -8 : 48,
                      bottom: bookIsOpen ? -34 : -28,
                      rotate: bookIsOpen ? -4 : 0,
                    }}
                    transition={{ duration: isClosingAnim ? 1.1 : 0.9, ease: "easeOut" }}
                  >
                    <div className="w-3.5 sm:w-4 h-9 sm:h-10 bg-red-800 shadow-lg border-x border-red-950" />
                    <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-800" />
                  </motion.div>
                </motion.div>
              </button>

              {/* Realistic Shadow Cast on Wood — dynamically expands when the book opens */}
              <motion.div
                initial={false}
                className="pointer-events-none -mt-3 rounded-full bg-black/75 blur-md"
                animate={{
                  width: bookIsOpen ? (isMobile ? 380 : 580) : 310,
                  height: bookIsOpen ? 28 : 20,
                  opacity: bookIsOpen ? 0.95 : 0.7,
                  x: bookIsOpen ? (isMobile ? "18%" : "25%") : "0%",
                }}
                transition={{ duration: isClosingAnim ? 1.1 : 0.9 }}
              />
            </div>

            {/* ── PROP C: POLAROID PHOTO & VINTAGE CASSETTE (RIGHT) ── */}
            <motion.div
              initial={false}
              animate={{
                opacity: bookIsOpen ? 0.15 : 1,
                x: bookIsOpen ? 80 : 0,
              }}
              transition={{ duration: isClosingAnim ? 1.1 : 0.8 }}
              className="flex flex-col items-center gap-4 hidden lg:flex select-none"
            >
              
              {/* Polaroid Pasfoto of Atma & Raya */}
              <div
                onClick={() => setInspectedProp("polaroid")}
                className="group relative w-52 bg-white p-2.5 pb-4 shadow-[0_14px_28px_rgba(0,0,0,0.6)] rotate-6 transition-all hover:rotate-2 hover:scale-105 duration-300 cursor-pointer select-none hover:shadow-[0_20px_35px_rgba(0,0,0,0.75)]"
                title="Klik untuk mengangkat & melihat foto dari dekat"
              >
                {/* Yellowish Masking Tape at Top Corner */}
                <div className="absolute -top-3 right-4 w-14 h-5 bg-amber-200/75 border border-amber-300/40 shadow-sm -rotate-6" />

                {/* Photo Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-900 border border-black/15">
                  <img
                    src="/assets/Gambar/Atma n Nirmala n Raya/gambar 1 atma n raya.webp"
                    alt="Atma dan Raya di Kota Loka"
                    loading="lazy"
                    decoding="async"
                    width={208}
                    height={208}
                    className="h-full w-full object-cover object-center filter sepia-[0.15] contrast-105"
                  />
                  {/* Photo Vignette */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]" />
                </div>

                {/* Polaroid Handwritten Caption */}
                <div className="mt-2 text-center font-serif text-xs italic text-stone-700 leading-tight">
                  &ldquo;Musim Panas Terakhir&rdquo;
                  <br />
                  <span className="font-mono text-[9px] text-stone-500 not-italic uppercase tracking-wider">
                    Loka &bull; Juli 1998
                  </span>
                </div>
              </div>

              {/* Authentic 90s VHS Video Cassette Tape (Interactive: opens trailer!) */}
              <button
                type="button"
                onClick={() => setTrailerOpen(true)}
                className="group relative flex w-60 flex-col rounded-lg border-2 border-stone-900 bg-[#16171b] p-2.5 text-left shadow-[0_14px_28px_rgba(0,0,0,0.65)] -rotate-2 transition-all hover:scale-105 hover:border-amber-400/60 cursor-pointer select-none"
                style={{
                  backgroundImage: "radial-gradient(circle at 50% 20%, #252830 0%, #121316 100%)",
                }}
                title="Putar Kaset Video Trailer 90-an"
              >
                {/* Cassette Top Screw Holes */}
                <div className="flex justify-between items-center px-1 mb-1 opacity-30 text-[8px] font-mono">
                  <span>✦ T-120 VHS</span>
                  <span>HI-FI STEREO ✦</span>
                </div>

                {/* Aged Paper Sticker Label */}
                <div className="relative rounded-sm bg-[#F5EEDC] p-2 text-[#1C1917] shadow-inner border border-amber-800/20">
                  <div className="flex items-center justify-between border-b border-red-700/40 pb-1 mb-1">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-red-800">
                      REKAMAN VIDEO &bull; LOKA 1998
                    </span>
                    <span className="font-mono text-[8px] text-stone-500">SP 2:30</span>
                  </div>

                  <div className="font-reality-heading text-xs font-bold leading-tight text-stone-900">
                    A Space for the Unbound
                  </div>
                  <div className="font-mono text-[9px] text-stone-600 underline decoration-red-600/60 font-semibold">
                    Trailer Resmi — Peluncuran Game
                  </div>
                </div>

                {/* Cassette Tape Window with Dual Spools */}
                <div className="mt-2 flex items-center justify-between rounded bg-black/80 px-4 py-2 border border-stone-800 shadow-inner">
                  {/* Left Spool */}
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-stone-800 border border-stone-600 shadow">
                    <div className="h-4 w-4 rounded-full bg-stone-950 border border-stone-700 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    </div>
                    {/* Gear Teeth */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-6 h-0.5 bg-stone-400/40" />
                      <div className="w-0.5 h-6 bg-stone-400/40" />
                    </div>
                  </div>

                  {/* Center Tape Window Ribbon */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-1.5 w-14 rounded-full bg-amber-950/70 border border-amber-900/40" />
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                      <span className="font-mono text-[8px] text-amber-300/80 font-bold">PUTAR TAPE</span>
                    </div>
                  </div>

                  {/* Right Spool */}
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-stone-800 border border-stone-600 shadow">
                    <div className="h-4 w-4 rounded-full bg-stone-950 border border-stone-700 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    </div>
                    {/* Gear Teeth */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-6 h-0.5 bg-stone-400/40" />
                      <div className="w-0.5 h-6 bg-stone-400/40" />
                    </div>
                  </div>
                </div>

                {/* Bottom Tape Grip Ribs */}
                <div className="mt-1.5 flex justify-center gap-1 opacity-40">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={`grip-${i}`} className="h-1 w-3 rounded bg-black" />
                  ))}
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── 6. DESK ACCESSORIES & MOBILE PROMPT ACTIONS ── */}
        <div className="relative z-20 mx-auto flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {/* Mobile Prop Inspection Buttons */}
          <button
            type="button"
            onClick={() => setInspectedProp("binder")}
            className="md:hidden inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/60 px-3 py-1.5 font-mono text-xs text-amber-200 shadow backdrop-blur-sm transition-all hover:bg-amber-900 cursor-pointer"
          >
            <span>📝</span>
            <span>Lihat Catatan</span>
          </button>

          <button
            type="button"
            onClick={() => setInspectedProp("polaroid")}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/60 px-3 py-1.5 font-mono text-xs text-amber-200 shadow backdrop-blur-sm transition-all hover:bg-amber-900 cursor-pointer"
          >
            <span>📷</span>
            <span>Lihat Foto</span>
          </button>

          {/* Mobile Trailer Button (shows if on small screens) */}
          <button
            type="button"
            onClick={() => setTrailerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-amber-600/30 bg-amber-950/60 px-4 py-2 font-mono text-xs text-amber-200 shadow-md backdrop-blur-sm transition-all hover:bg-amber-900 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            <span>Tonton Trailer Resmi</span>
          </button>
        </div>
      </section>

      {/* ── Desk Prop Inspection Modal (3D Flip & Easter Eggs) ── */}
      <DeskPropModal
        propType={inspectedProp}
        onClose={() => setInspectedProp(null)}
      />

      {/* ── Trailer Modal ────────────────────────────── */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </>
  );
}

