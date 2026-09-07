"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gameplaySteps, riftDiveEasterEgg, GameplayStep } from "@/content/gameplaySteps";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLayer } from "@/components/layer/useLayer";

/* ═══════════════════════════════════════════════════
 * GAMEPLAY SECTION — DIVE layer ("Buku Catatan Merah & Menyelam")
 *
 * Authentic Physical Artifact:
 * - Real 3D Page Turn: The book cover stays stationary. A physical paper leaf
 *   hinged at the central spine lifts, curls, rotates 180° in 3D perspective,
 *   reveals its backside in transit, and lands onto the opposite page stack.
 * - Tactile Corner Drag: Users can click/drag the page corner or click buttons;
 *   smooth spring settle and threshold-based completion.
 * - Realistic Physical Journal Details: Stacked creamy paper thickness,
 *   spine gutter shadow, faint notebook rulings, personal annotations & stamps.
 * - Deep Nostalgic Atmosphere: Subtle twinkling pixel stars, faint orbital rings,
 *   and floating dream particles.
 * ═══════════════════════════════════════════════════ */

// ── Render the Left Page (Personal Diary, Notes, Lore & Controls) ────
function LeftPageContent({ step }: { step: GameplayStep }) {
  return (
    <div className="h-full w-full p-4 sm:p-5 md:p-6 flex flex-col justify-between relative bg-[#FAF6EE] text-[#2B2018] select-none">
      {/* Subtle notebook ruling lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #1E3A8A 0px, #1E3A8A 1px, transparent 1px, transparent 24px)`,
        }}
      />

      {/* Realistic Inner Spine Shadow Curvature on the right edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/25 via-black/10 to-transparent" />

      <div>
        {/* Page Top Header with Stamped Tag */}
        <div className="flex items-center justify-between pb-1.5 border-b-2 border-[#2B2018]/25 mb-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#991B1B] text-[#FEF08A] px-2 py-0.5 rounded font-bold text-[10px] uppercase shadow-sm">
              {step.tag}
            </span>
            <span className="font-bold text-[#78350F] text-[11px] tracking-wider">
              HALAMAN 0{step.order} / 04
            </span>
          </div>
          <span className="text-[#78716C] font-serif italic text-[11px] hidden sm:inline">
            Catatan Harian Atma
          </span>
        </div>

        {/* Diary Heading */}
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-[#1C1917] leading-tight mb-1">
          {step.order}. {step.title}
        </h3>

        <p className="font-serif italic text-xs sm:text-sm text-red-900 font-semibold mb-2.5">
          &ldquo;{step.subtitle}&rdquo;
        </p>

        {/* Story Narrative */}
        <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#2B2018]/90 mb-3">
          {step.description}
        </p>

        {/* Yellow Sticky Note (Personal Observation) */}
        <div className="p-2.5 rounded-lg border border-amber-300/80 bg-[#FEF9C3] shadow-[2px_2px_0px_#CA8A04] relative mb-3 transform rotate-[-0.5deg]">
          {/* Masking Tape strip on top */}
          <div className="absolute -top-2 left-6 w-12 h-3 bg-amber-200/90 border border-amber-300/60 transform -rotate-2 opacity-90" />
          <p className="font-serif text-[11px] sm:text-xs text-[#713F12] leading-relaxed">
            💡 <strong className="font-bold text-[#854D0E]">Catatan Suasana:</strong> {step.loreDetail}
          </p>
        </div>

        {/* 90s Arcade Controls Guide */}
        <div className="flex items-center gap-2 text-[11px] font-mono bg-[#EFE6D1] px-2.5 py-1.5 rounded border border-[#2B2018]/25 shadow-inner">
          <span className="text-red-800 font-bold">KONTROL:</span>
          <span className="text-[#1C1917]">{step.controlsHint}</span>
        </div>
      </div>

      {/* Left Page Footer: Official Seal of Kota Loka & Personal Stamp */}
      <div className="mt-3 pt-2 border-t border-[#2B2018]/20 flex items-center justify-between font-mono text-[10px] text-[#78716C]">
        <span className="flex items-center gap-1 font-bold text-red-800">
          <span>🐾</span>
          <span>CAP DISETUJUI ATMA &bull; KOTA LOKA</span>
        </span>
        <span className="italic">Koleksi Memori #0{step.order}</span>
      </div>
    </div>
  );
}

// ── Render the Right Page (CRT TV Memory Window & Page Turning Actions) ────
function RightPageContent({
  step,
  isLast,
  onNext,
  onPrev,
  onEasterEgg,
}: {
  step: GameplayStep;
  isLast: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onEasterEgg?: () => void;
}) {
  return (
    <div className="h-full w-full p-4 sm:p-5 md:p-6 flex flex-col justify-between relative bg-[#F5EEDC] text-[#2B2018] select-none">
      {/* Realistic Inner Spine Shadow Curvature on the left edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />

      <div className="flex flex-col flex-1 justify-center py-2">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#2B2018]/20 mb-3 font-mono text-[11px] text-[#57534E]">
          <span className="font-bold uppercase text-[#1C1917]">JENDELA MEMORI BERGERAK</span>
          <span className="font-serif italic text-[11px] text-[#78716C]">Foto Dokumentasi Loka</span>
        </div>

        {/* SCRAPBOOK PHOTO PRINT (Tempelan Foto) */}
        <div className="relative mx-auto my-2 w-full max-w-[350px] sm:max-w-[410px] bg-[#FFFDF9] p-2.5 pb-4 sm:p-3 sm:pb-5 rounded-xs shadow-[3px_5px_16px_rgba(40,30,20,0.22)] border border-[#E7DECD] transform rotate-[0.6deg] transition-transform hover:rotate-0">
          {/* Translucent Masking Tape / Selotip Bening Tempelan di sudut atas */}
          <div className="pointer-events-none absolute -top-2.5 left-6 w-14 h-4 bg-amber-100/85 border border-amber-300/50 shadow-xs transform -rotate-3 backdrop-blur-xs opacity-90 z-20" />
          <div className="pointer-events-none absolute -top-2.5 right-6 w-14 h-4 bg-amber-100/85 border border-amber-300/50 shadow-xs transform rotate-2 backdrop-blur-xs opacity-90 z-20" />

          {/* Photo Print Image */}
          <div className="relative aspect-video max-h-[200px] sm:max-h-[230px] md:max-h-[250px] w-full overflow-hidden bg-[#1E1B18] shadow-inner border border-stone-300/60 rounded-2xs">
            <img
              src={step.image}
              alt={step.title}
              draggable={false}
              className="h-full w-full object-cover object-center filter contrast-[1.04] saturate-[1.08] pointer-events-none select-none"
            />
            {/* Subtle photo gloss */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            {/* 90s vintage yellow timestamp in bottom-right corner */}
            <div className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#F59E0B] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-bold tracking-wider">
              '99 08 24
            </div>
          </div>

          {/* Handwritten Photo Caption */}
          <div className="mt-2.5 px-1 text-center font-serif italic text-xs text-[#57534E]">
            Rekaman Memori Lembar 0{step.order}: &ldquo;{step.tag}&rdquo;
          </div>
        </div>

        {/* Scrapbook Field Note / Archive Label to balance vertical space */}
        <div className="mt-3 p-2 bg-[#EFE5CE]/80 rounded-xs border border-[#D4C4A8] flex items-center justify-between text-[11px] font-mono text-[#78716C] w-full max-w-[350px] sm:max-w-[410px] mx-auto shadow-inner">
          <span className="flex items-center gap-1.5 font-bold text-red-900">
            <span className="text-amber-600">★</span>
            <span>ARSIP VISUAL KOTA LOKA</span>
          </span>
          <span className="italic text-[10px] text-[#57534E]">Terekam di Memori Batin</span>
        </div>
      </div>

      {/* Navigation Buttons inside page */}
      <div className="mt-3 pt-2 border-t border-[#2B2018]/20 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={step.order === 1}
          className="inline-flex items-center gap-1 rounded-sm border border-[#2B2018]/30 bg-[#EFE6D1] px-2.5 py-1 font-mono text-xs text-[#2B2018] transition-all hover:bg-[#E4DAC2] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm font-bold"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Lembar Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (isLast) {
              onEasterEgg?.();
            } else {
              onNext?.();
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1 font-mono text-xs text-white transition-all hover:scale-[1.03] active:scale-95 cursor-pointer shadow-md font-bold"
          style={{
            backgroundColor: "#991B1B",
            boxShadow: "0 0 14px rgba(153, 27, 27, 0.45)",
          }}
        >
          <span>
            {isLast ? "Buka Lembar RiftDive" : "Balik Lembar Berikutnya"}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function Gameplay() {
  const { timeOfDay } = useLayer();
  const containerRef = useRef<HTMLDivElement>(null);
  const isManualInteractionRef = useRef(false);

  const [activeStep, setActiveStep] = useState(0); // 0..3
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // 4-state lifecycle: "idle" | "dragging" | "flipping" | "canceling"
  const [flipState, setFlipState] = useState<"idle" | "dragging" | "flipping" | "canceling">("idle");
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [toStep, setToStep] = useState(0);
  const targetStepRef = useRef(0);
  const [dragAngle, setDragAngle] = useState(0); // degrees

  const dragStartXRef = useRef(0);
  const bookWidthRef = useRef(350);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Execute a natural physical page turn (via button or touch)
  const triggerPageTurn = useCallback(
    (targetIndex: number) => {
      if (flipState !== "idle" || targetIndex === activeStep) return;
      if (targetIndex < 0 || targetIndex >= gameplaySteps.length) return;

      const dir = targetIndex > activeStep ? "next" : "prev";
      targetStepRef.current = targetIndex;
      setFlipDirection(dir);
      setToStep(targetIndex);
      setFlipState("flipping");
      setShowEasterEgg(false);
      setDragAngle(dir === "next" ? -180 : 180);

      setTimeout(() => {
        setActiveStep(targetIndex);
        setFlipState("idle");
        setDragAngle(0);
      }, 650);
    },
    [activeStep, flipState]
  );

  // Start dragging from edge
  const handleEdgeDragStart = (e: React.PointerEvent, dir: "next" | "prev") => {
    if (flipState !== "idle") return;
    if (dir === "next" && activeStep >= gameplaySteps.length - 1) return;
    if (dir === "prev" && activeStep <= 0) return;

    e.preventDefault();

    const bookEl = containerRef.current?.querySelector(".book-surface");
    if (bookEl) {
      const rect = bookEl.getBoundingClientRect();
      bookWidthRef.current = rect.width > 600 ? rect.width / 2 : rect.width;
    }

    const nextStep = dir === "next" ? activeStep + 1 : activeStep - 1;
    targetStepRef.current = nextStep;
    dragStartXRef.current = e.clientX;
    setFlipDirection(dir);
    setToStep(nextStep);
    setDragAngle(0);
    setFlipState("dragging");
    setShowEasterEgg(false);
  };

  // Window-level tracking for smooth, zero-loss dragging
  useEffect(() => {
    if (flipState !== "dragging") return;

    const handlePointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - dragStartXRef.current;
      const width = bookWidthRef.current || 350;

      if (flipDirection === "next") {
        // Dragging right page towards left: deltaX is negative
        const progress = Math.min(1, Math.max(0, -deltaX / width));
        setDragAngle(-progress * 180);
      } else {
        // Dragging left page towards right: deltaX is positive
        const progress = Math.min(1, Math.max(0, deltaX / width));
        setDragAngle(progress * 180);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const deltaX = e.clientX - dragStartXRef.current;
      const width = bookWidthRef.current || 350;
      const progress =
        flipDirection === "next"
          ? Math.min(1, Math.max(0, -deltaX / width))
          : Math.min(1, Math.max(0, deltaX / width));

      const nextTarget = targetStepRef.current;

      // Threshold: if user dragged > 14% of page width or > 25°, complete the turn
      if (progress > 0.14) {
        setFlipState("flipping");
        setDragAngle(flipDirection === "next" ? -180 : 180);
        setTimeout(() => {
          setActiveStep(nextTarget);
          setFlipState("idle");
          setDragAngle(0);
        }, 550);
      } else {
        // Snap back to original position smoothly
        setFlipState("canceling");
        setDragAngle(0);
        setTimeout(() => {
          setFlipState("idle");
        }, 300);
      }
    };

    const handlePointerCancel = () => {
      setFlipState("canceling");
      setDragAngle(0);
      setTimeout(() => {
        setFlipState("idle");
      }, 300);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [flipState, flipDirection]);

  // Touch Swipe on mobile / touchscreen
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0 && activeStep < gameplaySteps.length - 1) {
        triggerPageTurn(activeStep + 1);
      } else if (deltaX > 0 && activeStep > 0) {
        triggerPageTurn(activeStep - 1);
      }
    }
  };

  const currentStepData = gameplaySteps[activeStep];
  const targetStepData = gameplaySteps[toStep] || currentStepData;

  return (
    <section
      ref={containerRef}
      id="gameplay"
      className="relative w-full transition-colors duration-700 overflow-hidden"
      style={{
        minHeight: "120vh",
        background:
          timeOfDay === "siang"
            ? "linear-gradient(180deg, #102A72 0%, #1D4ED8 35%, #1E3A8A 70%, #0B1736 100%)"
            : timeOfDay === "sore"
            ? "linear-gradient(180deg, #2D054E 0%, #5B148C 30%, #832709 65%, #2B0B04 100%)"
            : "linear-gradient(180deg, #020617 0%, #080D1A 35%, #0B132B 70%, #02040A 100%)",
      }}
    >
      {/* ── 1. ATMOSPHERIC COSMIC & MEMORY SPACE BACKDROP ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Faint Constellation & Orbital Rings (The Inner Memory Space) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[750px] w-[750px] rounded-full border border-blue-400/[0.07] animate-[spin_120s_linear_infinite]" />
          <div className="absolute h-[560px] w-[560px] rounded-full border border-dashed border-indigo-400/[0.12] animate-[spin_80s_linear_infinite_reverse]" />
          <div className="absolute h-[380px] w-[380px] rounded-full border border-dotted border-purple-400/[0.15] animate-[spin_50s_linear_infinite]" />
        </div>

        {/* Faint Glowing Cosmic Dust Orbs */}
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-blue-500/[0.08] blur-3xl animate-pulse" />
        <div className="absolute bottom-[25%] right-[12%] w-96 h-96 rounded-full bg-purple-600/[0.08] blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />

        {/* Twinkling Pixel Stars (Deep Nostalgic Cosmos) */}
        {[
          { top: "12%", left: "10%", size: 8, delay: 0 },
          { top: "22%", left: "85%", size: 10, delay: 1.2 },
          { top: "35%", left: "6%", size: 6, delay: 0.7 },
          { top: "48%", left: "92%", size: 10, delay: 2.1 },
          { top: "68%", left: "14%", size: 8, delay: 1.5 },
          { top: "80%", left: "88%", size: 7, delay: 0.3 },
          { top: "28%", left: "48%", size: 6, delay: 2.5 },
        ].map((star, idx) => (
          <motion.div
            key={`cosmic-star-${idx}`}
            className="absolute opacity-50"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.8, 1.25, 0.8] }}
            transition={{ duration: 2.4 + idx * 0.3, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 6 6" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="2" y="0" width="2" height="6" fill="#E0F2FE" />
              <rect x="0" y="2" width="6" height="2" fill="#E0F2FE" />
              <rect x="2" y="2" width="2" height="2" fill="#FFFFFF" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ── 2. STICKY VIEWPORT WITH DIEGETIC BOOK INTERFACE ── */}
      <div className="sticky top-0 flex min-h-screen w-full flex-col items-center justify-center px-3 sm:px-6 py-4 md:py-6 overflow-visible">
        {/* Soft atmospheric center vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 48%, color-mix(in srgb, var(--dive-accent) 14%, transparent) 0%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Section Title Header */}
        <div className="relative z-20 mx-auto max-w-4xl text-center mb-4">
          <h2
            className="mt-0.5 font-dive-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
            style={{ color: "var(--dive-accent)" }}
          >
            Gameplay Mechanics
          </h2>
          <p className="mx-auto mt-1 max-w-lg font-dive-body text-[11px] sm:text-xs text-dive-text-muted line-clamp-1 sm:line-clamp-none">
            Buka lembar catatan ajaib Atma untuk menyelami dan menyembuhkan memori warga Kota Loka.
          </p>
        </div>

        {/* ── 3. THE MAGIC RED HARDCOVER JOURNAL ── */}
        <div
          className="relative z-10 mx-auto flex w-full max-w-4xl lg:max-w-5xl flex-1 flex-col items-center justify-center my-1"
          style={{ perspective: "1800px" }}
        >
          {/* Hardcover Leather Binder (Fixed Outer Book Case - Thinner Frame & Realistic Book Corners) */}
          <div
            className="relative w-full rounded-md p-2.5 sm:p-3 md:p-3.5 border-[3px] border-[#250404] shadow-[0_25px_60px_rgba(0,0,0,0.92)]"
            style={{
              background:
                "linear-gradient(135deg, #2b0404 0%, #4a0c0c 25%, #6e1025 50%, #4a0c0c 75%, #2b0404 100%)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.85), inset 0 1px 3px rgba(255,255,255,0.12)",
            }}
          >
            {/* Vintage Brass Corner Brackets (Sharper, realistic notebook corners) */}
            <div className="pointer-events-none absolute top-1.5 left-1.5 w-5 h-5 border-t-2 border-l-2 border-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.3)]" />
            <div className="pointer-events-none absolute top-1.5 right-1.5 w-5 h-5 border-t-2 border-r-2 border-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.3)]" />
            <div className="pointer-events-none absolute bottom-1.5 left-1.5 w-5 h-5 border-b-2 border-l-2 border-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.3)]" />
            <div className="pointer-events-none absolute bottom-1.5 right-1.5 w-5 h-5 border-b-2 border-r-2 border-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.3)]" />

            {/* STACKED CREAM PAGES BLOCK (Tumpukan kertas tebal berada DI ATAS cover merah) */}
            <div className="relative w-full rounded-xs bg-[#E5D7BE] p-[3px] sm:p-[4px] shadow-[inset_0_0_12px_rgba(100,75,45,0.4),0_4px_12px_rgba(0,0,0,0.5)] border border-[#A89474]/80">
              <div className="rounded-xs bg-[#EFE6D2] p-[2px] border-b border-r border-[#BDB094]/70">
                {/* ── 3D PHYSICAL BOOK OPEN SPREAD CONTAINER ── */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="book-surface relative h-[520px] sm:h-[550px] md:h-[580px] lg:h-[600px] flex items-stretch rounded-xs overflow-hidden shadow-md bg-[#F6EFE0] select-none touch-pan-y"
                  style={{
                    perspective: "1600px",
                    transformStyle: "preserve-3d",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.6), inset 0 0 20px rgba(180,150,110,0.3)",
                  }}
                >
              {showEasterEgg ? (
                /* ── RIFTDIVE SECRET BURNT PARCHMENT MODAL ── */
                <motion.div
                  key="easter-egg-card"
                  initial={{ rotateY: 70, opacity: 0, scale: 0.95 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  exit={{ rotateY: -70, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full h-full rounded-xs p-6 text-center shadow-2xl relative overflow-hidden border-2 border-purple-500/50 flex flex-col items-center justify-center"
                  style={{
                    background: "radial-gradient(ellipse at center, #2e1065 0%, #0f051d 100%)",
                    color: "#FAF5FF",
                    boxShadow:
                      "0 0 50px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(147, 51, 234, 0.3)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 border-4 border-dashed border-purple-400/20" />
                  <div className="mb-2 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-400/50 text-purple-300">
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300 font-bold">
                    LEMBARAN TERLARANG BUKU MERAH
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl md:text-3xl font-black text-white">
                    Kekuatan Tersembunyi: RiftDive
                  </h3>
                  <p className="mx-auto mt-2 max-w-xl font-serif text-xs sm:text-sm md:text-base italic leading-relaxed text-purple-200">
                    &ldquo;{riftDiveEasterEgg}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/80 px-4 py-1 rounded-lg border border-purple-500/40 inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                    <span>STATUS: RETAKAN DIMENSI RUANG & WAKTU TERBUKA</span>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setShowEasterEgg(false)}
                      className="rounded-xl border border-white/30 bg-purple-600/30 hover:bg-purple-600/50 px-5 py-1.5 font-mono text-xs text-white transition-all cursor-pointer font-bold shadow-lg"
                    >
                      ◄ Balik ke Lembar Manual Permainan
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── TWO-PAGE SPREAD WITH GENUINE 3D FLIPPING LEAF ── */
                <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 items-stretch select-none">
                  {/* ════ BASE LEFT PAGE ════ */}
                  <div className="h-full relative overflow-hidden">
                    <LeftPageContent
                      step={
                        flipState !== "idle" && flipDirection === "prev"
                          ? targetStepData
                          : currentStepData
                      }
                    />

                    {/* Interactive Manual Drag Zone on Left Page (Menyeret dari ujung kiri buku ke kanan) */}
                    {activeStep > 0 && flipState === "idle" && (
                      <div
                        onPointerDown={(e) => handleEdgeDragStart(e, "prev")}
                        className="group absolute top-0 bottom-12 left-0 w-16 sm:w-24 z-30 cursor-grab active:cursor-grabbing select-none flex items-center justify-start pl-1 sm:pl-2 touch-none"
                        title="Klik dan geser dari tepi buku ke kanan untuk membuka lembar sebelumnya"
                      >
                        {/* Visual Dog-ear Paper Curl on Top Left Corner */}
                        <div className="pointer-events-none absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-125 overflow-hidden">
                          <div
                            className="w-full h-full bg-gradient-to-br from-amber-200 via-[#e2d5bd] to-[#d6c5a8] shadow-[2px_2px_5px_rgba(0,0,0,0.25)] border-b border-r border-[#A89474]"
                            style={{
                              clipPath: "polygon(0 0, 100% 0, 0 100%)",
                            }}
                          />
                        </div>

                        {/* Tactile Pull Tab & Guide Indicator on Left Edge */}
                        <div className="pointer-events-none flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                          <div className="h-14 w-1 rounded-full bg-[#B89B72]/50 group-hover:bg-[#991B1B]/80 transition-colors" />
                          <span className="[writing-mode:vertical-rl] font-mono text-[9px] uppercase tracking-wider text-[#785434] font-bold py-1 bg-amber-100/70 rounded-xs px-0.5 border border-amber-300/40 shadow-xs">
                            Geser ►
                          </span>
                          <div className="h-14 w-1 rounded-full bg-[#B89B72]/50 group-hover:bg-[#991B1B]/80 transition-colors" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ════ BASE RIGHT PAGE ════ */}
                  <div className="h-full relative overflow-hidden">
                    <RightPageContent
                      step={
                        flipState !== "idle" && flipDirection === "next"
                          ? targetStepData
                          : currentStepData
                      }
                      isLast={
                        (flipState !== "idle" && flipDirection === "next"
                          ? toStep
                          : activeStep) ===
                        gameplaySteps.length - 1
                      }
                      onNext={() => triggerPageTurn(activeStep + 1)}
                      onPrev={() => triggerPageTurn(activeStep - 1)}
                      onEasterEgg={() => setShowEasterEgg(true)}
                    />

                    {/* Interactive Manual Drag Zone on Right Page (Menyeret dari ujung kanan buku ke kiri) */}
                    {activeStep < gameplaySteps.length - 1 && flipState === "idle" && (
                      <div
                        onPointerDown={(e) => handleEdgeDragStart(e, "next")}
                        className="group absolute top-0 bottom-12 right-0 w-16 sm:w-24 z-30 cursor-grab active:cursor-grabbing select-none flex items-center justify-end pr-1 sm:pr-2 touch-none"
                        title="Klik dan geser dari tepi buku ke kiri untuk membalik halaman"
                      >
                        {/* Visual Dog-ear Paper Curl on Top Right Corner */}
                        <div className="pointer-events-none absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-125 overflow-hidden">
                          <div
                            className="w-full h-full bg-gradient-to-bl from-amber-200 via-[#e2d5bd] to-[#d6c5a8] shadow-[-2px_2px_5px_rgba(0,0,0,0.25)] border-b border-l border-[#A89474]"
                            style={{
                              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                            }}
                          />
                        </div>

                        {/* Tactile Pull Tab & Guide Indicator on Right Edge */}
                        <div className="pointer-events-none flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-1">
                          <div className="h-14 w-1 rounded-full bg-[#B89B72]/50 group-hover:bg-[#991B1B]/80 transition-colors" />
                          <span className="[writing-mode:vertical-rl] font-mono text-[9px] uppercase tracking-wider text-[#785434] font-bold py-1 bg-amber-100/70 rounded-xs px-0.5 border border-amber-300/40 shadow-xs">
                            ◄ Geser
                          </span>
                          <div className="h-14 w-1 rounded-full bg-[#B89B72]/50 group-hover:bg-[#991B1B]/80 transition-colors" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ══════════════════════════════════════════════════════════
                   * 3D TURNING PAGE LEAF (Lembar Fisik yang Berputar 180° di Spine)
                   * ══════════════════════════════════════════════════════════ */}
                  {flipState !== "idle" && (
                    <div
                      className="pointer-events-none absolute inset-0 z-30 grid grid-cols-1 md:grid-cols-2"
                      style={{ perspective: "1800px" }}
                    >
                      {flipDirection === "next" ? (
                        /* Forward Flip: Leaf begins on right side, hinges at left center (spine), rotates -180° to left side */
                        <div className="hidden md:block md:col-start-2 h-full relative">
                          <motion.div
                            initial={{ rotateY: 0 }}
                            animate={{
                              rotateY:
                                flipState === "dragging"
                                  ? dragAngle
                                  : flipState === "canceling"
                                  ? 0
                                  : -180,
                            }}
                            transition={{
                              duration:
                                flipState === "dragging"
                                  ? 0
                                  : flipState === "canceling"
                                  ? 0.35
                                  : 0.65,
                              ease:
                                flipState === "dragging"
                                  ? "linear"
                                  : [0.25, 1, 0.5, 1],
                            }}
                            style={{
                              transformOrigin: "left center",
                              transformStyle: "preserve-3d",
                              height: "100%",
                              width: "100%",
                              position: "relative",
                              boxShadow:
                                "-15px 12px 25px rgba(0,0,0,0.35), 0 0 15px rgba(0,0,0,0.2)",
                            }}
                          >
                            {/* FRONT FACE of leaf: Current Right Page */}
                            <div
                              className="absolute inset-0 h-full w-full overflow-hidden shadow-2xl bg-[#F5EEDC]"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                              }}
                            >
                              <RightPageContent
                                step={currentStepData}
                                isLast={activeStep === gameplaySteps.length - 1}
                              />
                              {/* Dynamic paper lighting & crease shadow during rotation */}
                              <motion.div
                                className="absolute inset-0 bg-black pointer-events-none"
                                animate={{
                                  opacity:
                                    flipState === "dragging"
                                      ? Math.min(0.4, Math.abs(dragAngle) / 360)
                                      : flipState === "canceling"
                                      ? 0
                                      : [0, 0.4, 0],
                                }}
                                transition={{
                                  duration: flipState === "dragging" ? 0 : 0.65,
                                }}
                              />
                            </div>

                            {/* BACK FACE of leaf: Target Left Page (rendered rotated 180° so it views upright upon landing) */}
                            <div
                              className="absolute inset-0 h-full w-full overflow-hidden shadow-2xl bg-[#FAF6EE]"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                              }}
                            >
                              <LeftPageContent step={targetStepData} />
                              {/* Dynamic landing shadow */}
                              <motion.div
                                className="absolute inset-0 bg-black pointer-events-none"
                                animate={{
                                  opacity:
                                    flipState === "dragging"
                                      ? Math.max(0, 0.4 - Math.abs(dragAngle) / 360)
                                      : flipState === "canceling"
                                      ? 0.4
                                      : [0.4, 0],
                                }}
                                transition={{
                                  duration: flipState === "dragging" ? 0 : 0.65,
                                }}
                              />
                            </div>
                          </motion.div>
                        </div>
                      ) : (
                        /* Backward Flip: Leaf begins on left side, hinges at right center (spine), rotates +180° to right side */
                        <div className="hidden md:block md:col-start-1 h-full relative">
                          <motion.div
                            initial={{ rotateY: 0 }}
                            animate={{
                              rotateY:
                                flipState === "dragging"
                                  ? dragAngle
                                  : flipState === "canceling"
                                  ? 0
                                  : 180,
                            }}
                            transition={{
                              duration:
                                flipState === "dragging"
                                  ? 0
                                  : flipState === "canceling"
                                  ? 0.35
                                  : 0.65,
                              ease:
                                flipState === "dragging"
                                  ? "linear"
                                  : [0.25, 1, 0.5, 1],
                            }}
                            style={{
                              transformOrigin: "right center",
                              transformStyle: "preserve-3d",
                              height: "100%",
                              width: "100%",
                              position: "relative",
                              boxShadow:
                                "15px 12px 25px rgba(0,0,0,0.35), 0 0 15px rgba(0,0,0,0.2)",
                            }}
                          >
                            {/* FRONT FACE of leaf: Current Left Page */}
                            <div
                              className="absolute inset-0 h-full w-full overflow-hidden shadow-2xl bg-[#FAF6EE]"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                              }}
                            >
                              <LeftPageContent step={currentStepData} />
                              <motion.div
                                className="absolute inset-0 bg-black pointer-events-none"
                                animate={{
                                  opacity:
                                    flipState === "dragging"
                                      ? Math.min(0.4, Math.abs(dragAngle) / 360)
                                      : flipState === "canceling"
                                      ? 0
                                      : [0, 0.4, 0],
                                }}
                                transition={{
                                  duration: flipState === "dragging" ? 0 : 0.65,
                                }}
                              />
                            </div>

                            {/* BACK FACE of leaf: Target Right Page */}
                            <div
                              className="absolute inset-0 h-full w-full overflow-hidden shadow-2xl bg-[#F5EEDC]"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(-180deg)",
                              }}
                            >
                              <RightPageContent
                                step={targetStepData}
                                isLast={toStep === gameplaySteps.length - 1}
                              />
                              <motion.div
                                className="absolute inset-0 bg-black pointer-events-none"
                                animate={{
                                  opacity:
                                    flipState === "dragging"
                                      ? Math.max(0, 0.4 - Math.abs(dragAngle) / 360)
                                      : flipState === "canceling"
                                      ? 0.4
                                      : [0.4, 0],
                                }}
                                transition={{
                                  duration: flipState === "dragging" ? 0 : 0.65,
                                }}
                              />
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ════ NATURAL REALISTIC 3D CENTER BOOK SPINE & GUTTER CREASE ════ */}
                  <div
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 hidden md:block z-20"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(40, 20, 10, 0.04) 20%, rgba(30, 15, 5, 0.22) 42%, rgba(20, 10, 5, 0.38) 48%, rgba(10, 5, 0, 0.45) 50%, rgba(20, 10, 5, 0.38) 52%, rgba(30, 15, 5, 0.22) 58%, rgba(40, 20, 10, 0.04) 80%, transparent 100%)",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Ultra-fine book stitch line down the center */}
                    <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[1px] bg-[#3B2516]/40 opacity-70" />
                  </div>
                </div>
              )}
                </div>
              </div>
            </div>

            {/* Dangling Silk Red Bookmark Ribbon tucked in binding */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
              <div className="w-4 h-9 bg-red-700 shadow-lg border-x border-red-900" />
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Gentle bottom buffer blending into #news */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/45"
        aria-hidden="true"
      />
    </section>
  );
}
