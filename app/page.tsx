"use client";

import { useState, useCallback } from "react";
import { useLayer } from "@/components/layer/useLayer";
import { Hero } from "@/components/reality/Hero";
import { DiveTransition } from "@/components/dive/DiveTransition";
import { Synopsis } from "@/components/dive/Synopsis";
import { TrailerSection } from "@/components/dive/TrailerSection";
import { Characters } from "@/components/dive/Characters";
import { Gameplay } from "@/components/dive/Gameplay";
import { News } from "@/components/dive/News";
import { PlayNow } from "@/components/dive/PlayNow";
import { Footer } from "@/components/shared/Footer";

/**
 * Main page — single-page site.
 * Composes REALITY (Hero) and DIVE sections with the DiveTransition overlay.
 */
export default function Home() {
  const {
    layer,
    isTransitioning,
    transitionDirection,
    transitionOrigin,
    startDiveTransition,
    completeTransition,
  } = useLayer();

  const handleOpenBook = useCallback(
    (origin: { x: number; y: number }) => {
      startDiveTransition(origin);
    },
    [startDiveTransition]
  );

  return (
    <main
      data-layer={layer}
      className="relative min-h-screen transition-colors duration-500"
    >
      {/* ── DIVE / REALITY TRANSITION OVERLAY ─────── */}
      <DiveTransition
        isTransitioning={isTransitioning}
        direction={transitionDirection}
        origin={transitionOrigin}
        onComplete={completeTransition}
      />

      {/* ── REALITY LAYER ─────────────────────────── */}
      {layer === "reality" && (
        <Hero onOpenBook={handleOpenBook} isTransitioning={isTransitioning} />
      )}

      {/* ── DIVE LAYER ────────────────────────────── */}
      {layer === "dive" && (
        <>
          {/* Prologue / Synopsis section */}
          <Synopsis />

          {/* Dedicated Game Trailer on 90s CRT Tube TV */}
          <TrailerSection />

          {/* Characters section */}
          <Characters />

          {/* Gameplay section */}
          <Gameplay />

          {/* News section */}
          <News />

          {/* Play Now section */}
          <PlayNow />

          {/* Footer section */}
          <Footer />
        </>
      )}
    </main>
  );
}
