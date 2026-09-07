"use client";

import { useContext } from "react";
import { LayerContext, type LayerContextValue } from "./LayerProvider";

/**
 * Hook to consume the LayerContext.
 * Must be used inside a <LayerProvider>.
 *
 * Returns: { layer, activeCharacter, enterDive, exitDive,
 *            setActiveCharacter, resetCharacterTint }
 */
export function useLayer(): LayerContextValue {
  const ctx = useContext(LayerContext);
  if (!ctx) {
    throw new Error(
      "useLayer() must be used within a <LayerProvider>. " +
        "Wrap your component tree with <LayerProvider> in the root layout."
    );
  }
  return ctx;
}
