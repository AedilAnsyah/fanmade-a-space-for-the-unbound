"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

/* ═══════════════════════════════════════════════════
 * TYPES
 * ═══════════════════════════════════════════════════ */

export type Layer = "reality" | "dive";
export type CharacterId = "atma" | "raya" | "nirmala" | null;
export type TimeOfDay = "siang" | "sore" | "malam";
export type TransitionDirection = "dive" | "reality";

export interface LayerContextValue {
  /** Which world layer is currently active */
  layer: Layer;
  /** Which character is active */
  activeCharacter: CharacterId;
  /** Current time of day representation */
  timeOfDay: TimeOfDay;
  /** Transition state */
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  transitionOrigin: { x: number; y: number } | null;
  pendingSection: string | null;
  startDiveTransition: (origin?: { x: number; y: number } | null, targetSection?: string) => void;
  startRealityTransition: (origin?: { x: number; y: number } | null) => void;
  completeTransition: () => void;
  /** Transition from REALITY to DIVE */
  enterDive: () => void;
  /** Switch back to REALITY layer */
  exitDive: () => void;
  /** Set the active character (switches time of day globally) */
  setActiveCharacter: (id: CharacterId) => void;
  /** Reset character tint */
  resetCharacterTint: () => void;
}

/* ═══════════════════════════════════════════════════
 * TIME & TINT PALETTE MAP
 * ═══════════════════════════════════════════════════ */

interface ThemeConfig {
  accent: string;
  secondary: string;
  timeOfDay: TimeOfDay;
  bgTop: string;
  bgBottom: string;
}

const THEME_MAP: Record<string, ThemeConfig> = {
  atma: {
    accent: "#F59E0B", // Golden Sun Amber
    secondary: "#0284C7", // Sky Blue
    timeOfDay: "siang",
    bgTop: "#1E3A8A", // Bright Day Sky
    bgBottom: "#3B82F6",
  },
  raya: {
    accent: "#F97316", // Sunset Orange
    secondary: "#A855F7", // Twilight Purple
    timeOfDay: "sore",
    bgTop: "#3B0764", // Sunset Deep Twilight
    bgBottom: "#9A3412", // Fiery Horizon
  },
  nirmala: {
    accent: "#EC4899", // Neon Pink Starlight
    secondary: "#06B6D4", // Moonlit Cyan
    timeOfDay: "malam",
    bgTop: "#030712", // Deep Midnight
    bgBottom: "#1E1B4B",
  },
};

const DEFAULT_THEME: ThemeConfig = THEME_MAP.atma;

/* ═══════════════════════════════════════════════════
 * CONTEXT & PROVIDER
 * ═══════════════════════════════════════════════════ */

const LayerContext = createContext<LayerContextValue | null>(null);

export function LayerProvider({ children }: { children: ReactNode }) {
  const [layer, setLayer] = useState<Layer>("reality");
  const [activeCharacter, setActiveCharacterState] =
    useState<CharacterId>("atma"); // Default to Atma (Siang)

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] =
    useState<TransitionDirection>("dive");
  const [transitionOrigin, setTransitionOrigin] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  const theme = activeCharacter
    ? THEME_MAP[activeCharacter] ?? DEFAULT_THEME
    : DEFAULT_THEME;

  /* -- Actions ---------------------------------------------------- */

  const enterDive = useCallback(() => {
    setLayer("dive");
  }, []);

  const exitDive = useCallback(() => {
    setLayer("reality");
    setActiveCharacterState("atma");
  }, []);

  const startDiveTransition = useCallback(
    (origin?: { x: number; y: number } | null, targetSection?: string) => {
      setTransitionDirection("dive");
      setTransitionOrigin(origin ?? null);
      setPendingSection(targetSection ?? null);
      setIsTransitioning(true);
    },
    []
  );

  const startRealityTransition = useCallback(
    (origin?: { x: number; y: number } | null) => {
      setTransitionDirection("reality");
      setTransitionOrigin(origin ?? null);
      setPendingSection(null);
      setIsTransitioning(true);
    },
    []
  );

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const setActiveCharacter = useCallback((id: CharacterId) => {
    setActiveCharacterState(id);
  }, []);

  const resetCharacterTint = useCallback(() => {
    setActiveCharacterState("atma");
  }, []);

  /* -- Sync global CSS variables & data attributes ---------------- */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--dive-accent", theme.accent);
    root.style.setProperty("--dive-secondary", theme.secondary);
    root.style.setProperty("--dive-bg-top", theme.bgTop);
    root.style.setProperty("--dive-bg-bottom", theme.bgBottom);
    root.setAttribute("data-time-of-day", theme.timeOfDay);
  }, [theme]);

  return (
    <LayerContext.Provider
      value={{
        layer,
        activeCharacter,
        timeOfDay: theme.timeOfDay,
        isTransitioning,
        transitionDirection,
        transitionOrigin,
        pendingSection,
        startDiveTransition,
        startRealityTransition,
        completeTransition,
        enterDive,
        exitDive,
        setActiveCharacter,
        resetCharacterTint,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export { LayerContext };
