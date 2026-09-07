"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * TRAILER MODAL
 *
 * Opens a centered YouTube iframe overlay.
 * Placeholder video ID for now — swap before deploy.
 * ═══════════════════════════════════════════════════ */

const TRAILERS = [
  { id: "8yGznOkpIGM", name: "Trailer 1 (Reveal)", label: "CH-01 &bull; SP 2:05" },
  { id: "L08ZBQswnus", name: "Trailer 2 (Launch)", label: "CH-02 &bull; SP 1:45" },
];

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrailerModal({ isOpen, onClose }: TrailerModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [isOpen]);

  const activeTrailer = TRAILERS[selectedIdx];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="trailer-modal-backdrop"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* 90s VCR / VHS DECK CHASSIS */}
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-b from-[#2b2d35] via-[#1c1e24] to-[#121317] border-4 border-[#3d414d] shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top VCR Faceplate Header */}
            <div className="flex items-center justify-between border-b-2 border-black/80 bg-[#1e2027] px-4 py-2 text-stone-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  <span>VCR PLAYBACK</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  <span>{activeTrailer.label}</span>
                </div>
                <span className="font-reality-heading text-xs text-stone-200 hidden md:inline">
                  A Space for the Unbound &bull; Rekaman Video 1998
                </span>
              </div>

              {/* VCR EJECT / Close button */}
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-lg border border-red-800/60 bg-red-950/80 px-3 py-1 font-mono text-[11px] font-bold text-red-200 transition-all hover:bg-red-800 hover:text-white cursor-pointer"
                aria-label="Keluarkan Kaset (Eject)"
              >
                <span>EJECT [⏏]</span>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* VCR SCREEN BEZEL */}
            <div className="relative p-2 sm:p-3 bg-black">
              {/* Screen Area with 16:9 Aspect Ratio */}
              <div className="relative w-full overflow-hidden rounded-lg bg-black shadow-inner border border-stone-800" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  key={activeTrailer.id}
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeTrailer.id}?autoplay=1&rel=0`}
                  title={`A Space for the Unbound — ${activeTrailer.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* CRT / VHS Scanlines Texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 3px)",
                  }}
                />

                {/* Retro 90s OSD Badge */}
                <div className="pointer-events-none absolute top-3 left-3 z-10 font-mono text-[10px] text-green-400 bg-black/70 px-2 py-0.5 rounded border border-green-500/30 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>PLAY ▶ &bull; {activeTrailer.label} &bull; HI-FI STEREO</span>
                </div>
              </div>
            </div>

            {/* Bottom VCR Controls: Channel Switcher & Details */}
            <div className="flex flex-wrap items-center justify-between border-t border-stone-800 bg-[#16171d] px-4 py-2 text-[10px] font-mono text-stone-400">
              {/* Channel Selector Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-stone-500 uppercase">PILIH KASET:</span>
                <div className="flex gap-1.5">
                  {TRAILERS.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedIdx(idx)}
                      className={`px-2.5 py-0.5 rounded border font-mono text-[10px] cursor-pointer transition-colors ${
                        selectedIdx === idx
                          ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                          : "bg-black/60 border-stone-700 text-stone-400 hover:bg-stone-800"
                      }`}
                    >
                      CH-0{idx + 1}: {idx === 0 ? "Trailer 1" : "Trailer 2"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded bg-black/60 px-2 py-0.5 border border-stone-700 text-stone-300">
                  INDOTRON VCR-9800
                </span>
                <span className="rounded bg-black/60 px-2 py-0.5 border border-stone-700 text-amber-300">
                  NTSC / PAL 50Hz
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
