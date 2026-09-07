"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X } from "lucide-react";
import { useLayer } from "@/components/layer/useLayer";
import type { CharacterId } from "@/components/layer/LayerProvider";

/* ═══════════════════════════════════════════════════
 * MEMORY MAP — constellation-style navigation
 *
 * Replaces a traditional navbar in the DIVE layer.
 * Nodes are scattered like neural synapses / star map.
 * Lines between nodes animate with pathLength on mount.
 * ═══════════════════════════════════════════════════ */

interface MapNode {
  id: string;
  label: string;
  /** Position as percentage of container (desktop constellation) */
  cx: number;
  cy: number;
  /** Target scroll section ID */
  scrollTo: string;
  /** If this is a character node, its CharacterId */
  characterId?: CharacterId;
}

const NODES: MapNode[] = [
  { id: "atma",     label: "Atma",      cx: 20, cy: 25, scrollTo: "characters", characterId: "atma" },
  { id: "raya",     label: "Raya",      cx: 50, cy: 15, scrollTo: "characters", characterId: "raya" },
  { id: "nirmala",  label: "Nirmala",   cx: 80, cy: 28, scrollTo: "characters", characterId: "nirmala" },
  { id: "gameplay", label: "Gameplay",  cx: 35, cy: 55, scrollTo: "gameplay",   characterId: undefined },
  { id: "news",     label: "News",      cx: 65, cy: 60, scrollTo: "news",       characterId: undefined },
  { id: "playnow",  label: "Play Now",  cx: 50, cy: 85, scrollTo: "playnow",    characterId: undefined },
];

/** Connections between nodes (index pairs into NODES array) */
const EDGES: [number, number][] = [
  [0, 1], // Atma - Raya
  [1, 2], // Raya - Nirmala
  [0, 3], // Atma - Gameplay
  [2, 4], // Nirmala - News
  [3, 4], // Gameplay - News
  [3, 5], // Gameplay - Play Now
  [4, 5], // News - Play Now
  [1, 3], // Raya - Gameplay
];

const NODE_RADIUS = 20; // px

export function MemoryMap() {
  const { layer, activeCharacter, setActiveCharacter } = useLayer();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-collapse when scrolling on mobile
  useEffect(() => {
    if (!isMobile || !isExpanded) return;
    const handleScroll = () => setIsExpanded(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isExpanded]);

  const handleNodeClick = useCallback(
    (node: MapNode) => {
      // Update character tint if it's a character node
      if (node.characterId) {
        setActiveCharacter(node.characterId);
      }
      // Smooth scroll to target section
      const target = document.getElementById(node.scrollTo);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: -20, duration: 1.0 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
      // Collapse on mobile after navigation
      if (isMobile) setIsExpanded(false);
    },
    [setActiveCharacter, isMobile]
  );

  // Only render in DIVE layer
  if (layer !== "dive") return null;

  return (
    <div className="fixed left-0 top-0 z-[90]">
      {/* ── Collapse/Expand Toggle Button ────────── */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="memory-map-node absolute left-4 top-4 z-[91] flex h-10 w-10 items-center justify-center rounded-lg bg-dive-bg-secondary/90 text-dive-text shadow-lg backdrop-blur-sm transition-colors hover:bg-dive-bg-secondary"
        style={{
          borderWidth: 1,
          borderColor: isExpanded ? "var(--dive-accent)" : "rgba(138,136,176,0.3)",
          boxShadow: isExpanded ? "0 0 12px 2px var(--dive-accent)" : "none",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? "Tutup Memory Map" : "Buka Memory Map"}
        aria-expanded={isExpanded}
      >
        {isExpanded ? <X className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
      </motion.button>

      {/* ── Memory Map Panel ─────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.nav
            key="memory-map-panel"
            className={
              isMobile
                ? "absolute left-4 top-16 z-[90] w-48 rounded-xl border border-dive-text-muted/20 bg-dive-bg-secondary/95 p-3 shadow-2xl backdrop-blur-md"
                : "absolute left-4 top-16 z-[90] h-[320px] w-[360px] rounded-2xl border border-dive-text-muted/20 bg-dive-bg-secondary/95 p-4 shadow-2xl backdrop-blur-md"
            }
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Memory Map Navigation"
          >
            {isMobile ? (
              /* ── MOBILE: Vertical List ─────────── */
              <ul className="flex flex-col gap-1">
                {NODES.map((node) => {
                  const isActive = node.characterId === activeCharacter;
                  return (
                    <li key={node.id}>
                      <button
                        onClick={() => handleNodeClick(node)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-dive-heading text-sm text-dive-text transition-all hover:bg-dive-bg/50"
                        style={{
                          color: isActive ? "var(--dive-accent)" : undefined,
                          backgroundColor: isActive ? "rgba(108,99,255,0.1)" : undefined,
                        }}
                      >
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: isActive ? "var(--dive-accent)" : "#8A88B0",
                            boxShadow: isActive ? "0 0 8px var(--dive-accent)" : "none",
                          }}
                        />
                        {node.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              /* ── DESKTOP: Constellation SVG ────── */
              <div className="relative h-full w-full">
                {/* SVG lines connecting nodes */}
                <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {EDGES.map(([fromIdx, toIdx], i) => {
                    const from = NODES[fromIdx];
                    const to = NODES[toIdx];
                    return (
                      <motion.line
                        key={`edge-${i}`}
                        x1={`${from.cx}%`}
                        y1={`${from.cy}%`}
                        x2={`${to.cx}%`}
                        y2={`${to.cy}%`}
                        stroke="var(--dive-accent)"
                        strokeWidth={1}
                        strokeOpacity={0.25}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.1 + i * 0.06,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                {NODES.map((node, idx) => {
                  const isActive =
                    node.characterId != null &&
                    node.characterId === activeCharacter;

                  return (
                    <motion.button
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className="memory-map-node absolute flex flex-col items-center gap-1"
                      style={{
                        left: `${node.cx}%`,
                        top: `${node.cy}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.15 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Navigasi ke ${node.label}`}
                    >
                      {/* Node circle */}
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300"
                        style={{
                          borderColor: isActive
                            ? "var(--dive-accent)"
                            : "rgba(138,136,176,0.4)",
                          backgroundColor: isActive
                            ? "rgba(108,99,255,0.15)"
                            : "rgba(21,27,61,0.8)",
                          boxShadow: isActive
                            ? "0 0 14px 3px var(--dive-accent), inset 0 0 6px var(--dive-accent)"
                            : "0 0 6px 1px rgba(108,99,255,0.15)",
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: isActive
                              ? "var(--dive-accent)"
                              : "#8A88B0",
                          }}
                        />
                      </span>

                      {/* Label */}
                      <span
                        className="whitespace-nowrap font-dive-heading text-[10px] transition-colors duration-300"
                        style={{
                          color: isActive ? "var(--dive-accent)" : "#8A88B0",
                        }}
                      >
                        {node.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
