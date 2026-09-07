"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLayer } from "@/components/layer/useLayer";
import { characters, type Character, type CharacterId, type TimeOfDay } from "@/content/characters";
import { BookOpen, Quote, Sun, Sunset, Moon, Sparkles } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * CHARACTERS SECTION — DIVE layer ("Ingatan yang Bisa Diselami")
 *
 * DAY-NIGHT CYCLE REPRESENTATION:
 * - Atma    = SIANG HARI (Daytime, bright sky, sun, floating fluffy clouds)
 * - Raya    = SORE SENJA (Golden hour sunset, sinking sun, twilight clouds, embers)
 * - Nirmala = MALAM HARI (Starry night, crescent moon, twinkling stars, celestial aura)
 *
 * Dynamic palette, animated sky backgrounds, and dossier styling.
 * ═══════════════════════════════════════════════════ */

export function Characters() {
  const { activeCharacter, setActiveCharacter } = useLayer();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const selectedCharId = activeCharacter ?? "atma";
  const currentChar =
    characters.find((c) => c.id === selectedCharId) ?? characters[0];

  const handleSelectCharacter = (id: CharacterId) => {
    setActiveCharacter(id);
  };

  const getTimeIcon = (time: TimeOfDay) => {
    switch (time) {
      case "siang":
        return <Sun className="h-4 w-4 text-amber-400" />;
      case "sore":
        return <Sunset className="h-4 w-4 text-orange-400" />;
      case "malam":
        return <Moon className="h-4 w-4 text-pink-300" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="characters"
      className="relative min-h-screen px-6 py-24 md:py-32 overflow-hidden transition-colors duration-700"
    >
      {/* ── 1. DYNAMIC DAY-NIGHT SKY BACKGROUND ─────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`sky-bg-${currentChar.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
          style={{ background: currentChar.skyGradient }}
          aria-hidden="true"
        >
          {/* ── ATMA: SIANG HARI (Terik Cerah, Pixel Sun & Awan Pixel) ── */}
          {currentChar.timeOfDay === "siang" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Stepped Pixel Sun */}
              <div className="absolute top-8 right-[8%] md:right-[16%] flex items-center justify-center">
                <div className="absolute h-48 w-48 rounded-full bg-amber-300/40 blur-3xl animate-pulse" />
                <svg width="84" height="84" viewBox="0 0 42 42" style={{ shapeRendering: "crispEdges" }}>
                  <rect x="19" y="1" width="4" height="5" fill="#FEF08A" />
                  <rect x="19" y="36" width="4" height="5" fill="#FEF08A" />
                  <rect x="1" y="19" width="5" height="4" fill="#FEF08A" />
                  <rect x="36" y="19" width="5" height="4" fill="#FEF08A" />
                  <rect x="6" y="6" width="4" height="4" fill="#FDE047" />
                  <rect x="32" y="6" width="4" height="4" fill="#FDE047" />
                  <rect x="6" y="32" width="4" height="4" fill="#FDE047" />
                  <rect x="32" y="32" width="4" height="4" fill="#FDE047" />
                  <rect x="9" y="9" width="24" height="24" fill="#F59E0B" />
                  <rect x="12" y="7" width="18" height="28" fill="#FBBF24" />
                  <rect x="7" y="12" width="28" height="18" fill="#FBBF24" />
                  <rect x="13" y="13" width="16" height="16" fill="#FEF08A" />
                  <rect x="16" y="16" width="10" height="10" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Stepped Pixel Clouds */}
              <motion.div
                className="absolute top-12 left-0 w-64 md:w-80 opacity-65"
                animate={{ x: [-200, 1300] }}
                transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 160 64" className="w-full" style={{ shapeRendering: "crispEdges" }}>
                  <path d="M 32,48 H 128 V 56 H 32 Z M 16,32 H 144 V 48 H 16 Z M 24,16 H 120 V 32 H 24 Z M 40,8 H 96 V 16 H 40 Z M 48,0 H 80 V 8 H 48 Z" fill="white" />
                  <rect x="48" y="8" width="32" height="8" fill="#E0F2FE" />
                  <rect x="32" y="24" width="80" height="8" fill="#F0F9FF" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute top-40 left-0 w-52 md:w-68 opacity-50"
                animate={{ x: [-250, 1350] }}
                transition={{ duration: 54, repeat: Infinity, delay: 8, ease: "linear" }}
              >
                <svg viewBox="0 0 144 56" className="w-full" style={{ shapeRendering: "crispEdges" }}>
                  <path d="M 24,40 H 120 V 48 H 24 Z M 12,24 H 132 V 40 H 12 Z M 20,12 H 108 V 24 H 20 Z M 36,4 H 84 V 12 H 36 Z" fill="white" />
                  <rect x="36" y="8" width="40" height="6" fill="#E0F2FE" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-28 left-0 w-80 md:w-96 opacity-40"
                animate={{ x: [-300, 1300] }}
                transition={{ duration: 48, repeat: Infinity, delay: 18, ease: "linear" }}
              >
                <svg viewBox="0 0 180 72" className="w-full" style={{ shapeRendering: "crispEdges" }}>
                  <path d="M 36,54 H 144 V 63 H 36 Z M 18,36 H 162 V 54 H 18 Z M 27,18 H 135 V 36 H 27 Z M 45,9 H 108 V 18 H 45 Z" fill="white" />
                </svg>
              </motion.div>

              {/* Floating Golden Pixel Sparkles */}
              {[12, 30, 52, 70, 88].map((x, i) => (
                <motion.div
                  key={`day-pixel-mote-${i}`}
                  className="absolute"
                  style={{
                    width: 4,
                    height: 4,
                    left: `${x}%`,
                    bottom: "-10px",
                    backgroundColor: "#FEF08A",
                    boxShadow: "0 0 6px 1px #FBBF24",
                  }}
                  animate={{
                    y: ["0vh", "-110vh"],
                    opacity: [0, 0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 13 + i * 2,
                    repeat: Infinity,
                    delay: i * 2.2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}

          {/* ── RAYA: SORE HARI (Matahari Tenggelam & Lembayung Senja PIXEL) ── */}
          {currentChar.timeOfDay === "sore" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Stepped Pixel Sunset Sun */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-orange-500/35 blur-3xl animate-pulse" />
                <svg width="120" height="120" viewBox="0 0 40 40" style={{ shapeRendering: "crispEdges" }}>
                  <rect x="18" y="2" width="4" height="4" fill="#FDE047" />
                  <rect x="8" y="6" width="24" height="4" fill="#FBBF24" />
                  <rect x="4" y="10" width="32" height="6" fill="#F59E0B" />
                  <rect x="2" y="16" width="36" height="8" fill="#F97316" />
                  <rect x="4" y="24" width="32" height="6" fill="#EA580C" />
                  <rect x="8" y="30" width="24" height="4" fill="#C2410C" />
                  <rect x="14" y="34" width="12" height="4" fill="#9A3412" />
                  {/* Sun core highlights */}
                  <rect x="12" y="12" width="16" height="8" fill="#FEF08A" />
                  <rect x="16" y="14" width="8" height="4" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Stepped Pixel Sunset Clouds */}
              <motion.div
                className="absolute top-16 left-0 w-72 md:w-96 opacity-40"
                animate={{ x: [-200, 1300] }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 160 56" className="w-full" style={{ shapeRendering: "crispEdges" }}>
                  <path d="M 28,36 H 132 V 44 H 28 Z M 16,24 H 144 V 36 H 16 Z M 24,12 H 120 V 24 H 24 Z M 44,4 H 92 V 12 H 44 Z" fill="#7C2D12" />
                  <rect x="24" y="24" width="96" height="6" fill="#EA580C" />
                  <rect x="40" y="12" width="60" height="6" fill="#F97316" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-36 left-0 w-80 md:w-[28rem] opacity-35"
                animate={{ x: [-260, 1350] }}
                transition={{ duration: 60, repeat: Infinity, delay: 12, ease: "linear" }}
              >
                <svg viewBox="0 0 160 56" className="w-full" style={{ shapeRendering: "crispEdges" }}>
                  <path d="M 32,36 H 136 V 44 H 32 Z M 16,24 H 148 V 36 H 16 Z M 28,12 H 124 V 24 H 28 Z M 48,4 H 96 V 12 H 48 Z" fill="#4C1D95" />
                  <rect x="28" y="24" width="96" height="6" fill="#6B21A8" />
                  <rect x="44" y="12" width="60" height="6" fill="#9333EA" />
                </svg>
              </motion.div>

              {/* Pixel Flying Birds Silhouettes */}
              <motion.div
                className="absolute top-24 left-0 opacity-60"
                animate={{ x: [-100, 1400], y: [0, -18, 8, -12, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <svg width="72" height="24" viewBox="0 0 36 12" style={{ shapeRendering: "crispEdges" }}>
                  {/* Bird 1 */}
                  <rect x="0" y="3" width="2" height="2" fill="#FDBA74" />
                  <rect x="2" y="1" width="2" height="2" fill="#FDBA74" />
                  <rect x="4" y="3" width="2" height="2" fill="#FDBA74" />
                  <rect x="6" y="1" width="2" height="2" fill="#FDBA74" />
                  <rect x="8" y="3" width="2" height="2" fill="#FDBA74" />
                  {/* Bird 2 (Offset) */}
                  <rect x="16" y="7" width="2" height="2" fill="#FED7AA" />
                  <rect x="18" y="5" width="2" height="2" fill="#FED7AA" />
                  <rect x="20" y="7" width="2" height="2" fill="#FED7AA" />
                  <rect x="22" y="5" width="2" height="2" fill="#FED7AA" />
                  <rect x="24" y="7" width="2" height="2" fill="#FED7AA" />
                  {/* Bird 3 */}
                  <rect x="28" y="2" width="2" height="2" fill="#FDBA74" />
                  <rect x="30" y="0" width="2" height="2" fill="#FDBA74" />
                  <rect x="32" y="2" width="2" height="2" fill="#FDBA74" />
                  <rect x="34" y="0" width="2" height="2" fill="#FDBA74" />
                </svg>
              </motion.div>

              {/* Pixel Sunset Embers Drifting Up */}
              {[15, 32, 50, 68, 86].map((x, i) => (
                <motion.div
                  key={`sunset-pixel-ember-${i}`}
                  className="absolute"
                  style={{
                    width: i % 2 === 0 ? 4 : 6,
                    height: i % 2 === 0 ? 4 : 6,
                    left: `${x}%`,
                    bottom: "-10px",
                    backgroundColor: i % 2 === 0 ? "#F97316" : "#FBBF24",
                    boxShadow: "0 0 8px 2px rgba(249,115,22,0.85)",
                  }}
                  animate={{
                    y: ["0vh", "-110vh"],
                    x: [0, i % 2 === 0 ? 20 : -20, 0],
                    opacity: [0, 0.85, 0.4, 0],
                  }}
                  transition={{
                    duration: 11 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.6,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}

          {/* ── NIRMALA: MALAM HARI (Bulan Sabit Pixel, Bintang 4-Point, & Bintang Jatuh Pixel) ── */}
          {currentChar.timeOfDay === "malam" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Stepped Pixel Crescent Moon */}
              <div className="absolute top-10 right-[10%] md:right-[18%] flex items-center justify-center">
                <div className="absolute h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl animate-pulse" />
                <svg width="80" height="80" viewBox="0 0 32 32" style={{ shapeRendering: "crispEdges" }}>
                  {/* Stepped Crescent Moon Pattern */}
                  <rect x="14" y="2" width="10" height="2" fill="#E0F2FE" />
                  <rect x="10" y="4" width="8" height="2" fill="#E0F2FE" />
                  <rect x="22" y="4" width="4" height="2" fill="#BAE6FD" />
                  <rect x="8" y="6" width="6" height="2" fill="#E0F2FE" />
                  <rect x="24" y="6" width="4" height="2" fill="#BAE6FD" />
                  <rect x="6" y="8" width="6" height="2" fill="#E0F2FE" />
                  <rect x="26" y="8" width="4" height="2" fill="#BAE6FD" />
                  <rect x="6" y="10" width="6" height="4" fill="#E0F2FE" />
                  <rect x="4" y="14" width="6" height="4" fill="#FFFFFF" />
                  <rect x="6" y="18" width="6" height="4" fill="#E0F2FE" />
                  <rect x="6" y="22" width="6" height="2" fill="#E0F2FE" />
                  <rect x="26" y="22" width="4" height="2" fill="#BAE6FD" />
                  <rect x="8" y="24" width="6" height="2" fill="#E0F2FE" />
                  <rect x="24" y="24" width="4" height="2" fill="#BAE6FD" />
                  <rect x="10" y="26" width="8" height="2" fill="#E0F2FE" />
                  <rect x="22" y="26" width="4" height="2" fill="#BAE6FD" />
                  <rect x="14" y="28" width="10" height="2" fill="#E0F2FE" />
                  {/* Core white shimmer */}
                  <rect x="8" y="12" width="3" height="8" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Celestial Nebula Glow */}
              <div className="absolute top-20 left-[18%] h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />
              <div className="absolute bottom-24 right-[22%] h-80 w-80 rounded-full bg-cyan-600/20 blur-3xl" />

              {/* Pixel 4-Point Twinkling Cross Stars */}
              {[
                { top: "10%", left: "12%", size: 10, delay: 0 },
                { top: "16%", left: "32%", size: 8, delay: 0.8 },
                { top: "24%", left: "48%", size: 12, delay: 1.5 },
                { top: "12%", left: "62%", size: 8, delay: 0.4 },
                { top: "20%", left: "78%", size: 10, delay: 1.2 },
                { top: "34%", left: "20%", size: 8, delay: 2.1 },
                { top: "42%", left: "38%", size: 12, delay: 0.6 },
                { top: "50%", left: "8%", size: 8, delay: 1.9 },
                { top: "56%", left: "88%", size: 10, delay: 1.3 },
                { top: "64%", left: "26%", size: 12, delay: 0.9 },
                { top: "72%", left: "72%", size: 8, delay: 1.7 },
                { top: "80%", left: "16%", size: 10, delay: 0.5 },
                { top: "86%", left: "52%", size: 8, delay: 2.3 },
                { top: "28%", left: "92%", size: 8, delay: 1.4 },
                { top: "46%", left: "65%", size: 10, delay: 0.7 },
              ].map((star, idx) => (
                <motion.div
                  key={`night-pixel-star-${idx}`}
                  className="absolute"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.85, 1.25, 0.85],
                  }}
                  transition={{
                    duration: 2.4 + (idx % 3) * 0.8,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeInOut",
                  }}
                >
                  <svg viewBox="0 0 6 6" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
                    <rect x="2" y="0" width="2" height="6" fill="#E0F2FE" />
                    <rect x="0" y="2" width="6" height="2" fill="#E0F2FE" />
                    <rect x="2" y="2" width="2" height="2" fill="#FFFFFF" />
                  </svg>
                </motion.div>
              ))}

              {/* ── CINEMATIC PIXEL SHOOTING STAR (Bintang Jatuh Pixel Art) ── */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "14%",
                  left: "22%",
                }}
                animate={{
                  x: [-60, 480],
                  y: [-30, 260],
                  opacity: [0, 0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.35,
                  repeat: Infinity,
                  repeatDelay: 5.5,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.35, 0.75, 1],
                }}
              >
                <div style={{ transform: "rotate(-30deg)" }} className="relative flex items-center">
                  {/* Stepped Pixel Stardust Tail */}
                  <svg width="140" height="12" viewBox="0 0 70 6" style={{ shapeRendering: "crispEdges" }}>
                    {/* Head / Core */}
                    <rect x="66" y="2" width="4" height="2" fill="#FFFFFF" />
                    <rect x="67" y="1" width="2" height="4" fill="#FFFFFF" />
                    {/* Dense Cyan Tail */}
                    <rect x="58" y="2" width="8" height="2" fill="#A5F3FC" />
                    <rect x="60" y="1" width="5" height="4" fill="#67E8F9" />
                    {/* Mid Tail */}
                    <rect x="46" y="2" width="12" height="2" fill="#38BDF8" />
                    <rect x="50" y="1" width="6" height="1" fill="#0284C7" />
                    <rect x="50" y="4" width="6" height="1" fill="#0284C7" />
                    {/* Dissolving Magenta / Purple Stardust Tail */}
                    <rect x="30" y="2" width="16" height="2" fill="#C084FC" />
                    <rect x="34" y="1" width="8" height="1" fill="#A855F7" />
                    <rect x="16" y="2" width="14" height="2" fill="#EC4899" />
                    <rect x="4" y="2" width="12" height="2" fill="#9333EA" />
                    <rect x="0" y="2" width="4" height="2" fill="#4C1D95" />
                  </svg>
                  {/* Glowing Pixel Pulse at the Head */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-300/80 blur-[2px] rounded-full" />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Giant Character Watermark in Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={`watermark-${currentChar.id}`}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 0.05, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="font-dive-heading text-[22vw] leading-none uppercase font-bold tracking-widest text-white"
          >
            {currentChar.name}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── 2. SECTION HEADER (Clean without "ARSIP MEMORI") ── */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-dive-heading text-3xl md:text-5xl lg:text-6xl transition-colors duration-500"
            style={{
              color: currentChar.tintColor,
              textShadow: `0 0 30px ${currentChar.tintColor}40`,
            }}
          >
            Ingatan yang Bisa Diselami
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-dive-body text-base text-dive-text-muted md:text-lg">
            Buku merah itu bukan cuma bisa dibaca — dia bisa membaca orang lain.
          </p>
        </motion.div>

        {/* ── 3. TIME-OF-DAY CHARACTER SELECTOR TABS ── */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {characters.map((char) => {
            const isSelected = currentChar.id === char.id;
            return (
              <button
                key={char.id}
                type="button"
                onClick={() => handleSelectCharacter(char.id)}
                className="group relative flex items-center gap-3 rounded-2xl border px-5 py-3 transition-all duration-400 cursor-pointer overflow-hidden backdrop-blur-xl"
                style={{
                  backgroundColor: isSelected
                    ? `color-mix(in srgb, ${char.tintColor} 22%, rgba(10,14,39,0.85))`
                    : "rgba(10,14,39,0.6)",
                  borderColor: isSelected
                    ? char.tintColor
                    : "rgba(255,255,255,0.15)",
                  boxShadow: isSelected
                    ? `0 0 28px 6px ${char.tintColor}40, inset 0 0 14px ${char.tintColor}25`
                    : "0 4px 16px rgba(0,0,0,0.25)",
                  transform: isSelected ? "translateY(-2px) scale(1.03)" : "scale(1)",
                }}
              >
                {/* Character Avatar */}
                <div
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ borderColor: char.tintColor }}
                >
                  <img
                    src={char.imagePlaceholder}
                    alt={char.name}
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Character Name & Role */}
                <div className="flex flex-col text-left">
                  <span
                    className="font-dive-heading text-sm md:text-base font-semibold transition-colors duration-300"
                    style={{ color: isSelected ? char.tintColor : "#EDEBFA" }}
                  >
                    {char.name}
                  </span>
                  <span className="font-dive-body text-[11px] text-dive-text-muted mt-0.5">
                    {char.role}
                  </span>
                </div>

                {/* Active Indicator Pulse Glow */}
                {isSelected && (
                  <motion.div
                    layoutId="active-character-glow"
                    className="absolute -bottom-1 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full"
                    style={{
                      backgroundColor: char.tintColor,
                      boxShadow: `0 0 12px 3px ${char.tintColor}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── 4. FEATURED TIME-OF-DAY MEMORY DOSSIER ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`character-dossier-${currentChar.id}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border p-6 md:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-700"
            style={{
              backgroundColor: currentChar.cardBg,
              borderColor: `color-mix(in srgb, ${currentChar.tintColor} 45%, transparent)`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 45px ${currentChar.tintColor}25`,
            }}
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* ── Left Column: Living Pixel Art Scene (5 cols) ── */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group w-full max-w-sm">
                  {/* Outer Glowing Aura Frame */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-75 blur-lg transition duration-700 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${currentChar.tintColor}, ${currentChar.secondaryColor}, transparent)`,
                    }}
                  />

                  {/* Pixel Frame Container */}
                  <div
                    className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-2xl border-2 bg-black shadow-2xl"
                    style={{ borderColor: currentChar.tintColor }}
                  >
                    {/* Animated Pixel Art Scene (GIF) */}
                    <img
                      src={currentChar.gifPlaceholder || currentChar.imagePlaceholder}
                      alt={`Animasi piksel ${currentChar.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Retro CRT Scanline Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
                      }}
                    />

                    {/* Vignette Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* ── Right Column: Character Mind Profile (7 cols) ── */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Role Badge */}
                <div className="mb-3 flex flex-wrap items-center gap-2.5">
                  <span
                    className="flex items-center gap-1.5 rounded-full border px-3.5 py-1 font-dive-heading text-xs uppercase tracking-wider"
                    style={{
                      color: currentChar.tintColor,
                      borderColor: `color-mix(in srgb, ${currentChar.tintColor} 50%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${currentChar.tintColor} 14%, transparent)`,
                      boxShadow: `0 0 14px ${currentChar.tintColor}30`,
                    }}
                  >
                    <span>{currentChar.role}</span>
                  </span>
                </div>

                {/* Character Name in Giant Pixel Font */}
                <h3
                  className="mb-4 font-dive-heading text-4xl md:text-6xl font-bold tracking-tight"
                  style={{
                    color: currentChar.tintColor,
                    textShadow: `0 0 28px ${currentChar.tintColor}55`,
                  }}
                >
                  {currentChar.name}
                </h3>

                {/* Narrative Description */}
                <p className="font-dive-body text-base md:text-lg leading-relaxed text-dive-text/95 max-w-xl">
                  {currentChar.description}
                </p>

                {/* Character Quote (Clean without blockquote) */}
                <p className="mt-6 font-reality-heading text-base md:text-lg italic text-dive-text/95 tracking-wide leading-relaxed">
                  &ldquo;{currentChar.quote}&rdquo;
                </p>

                {/* Interactive Dive Button */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById("gameplay");
                      if (target) {
                        if (window.__lenis) {
                          window.__lenis.scrollTo(target, { offset: 0, duration: 1.0 });
                        } else {
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 font-dive-heading text-sm text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: currentChar.tintColor,
                      boxShadow: `0 0 24px ${currentChar.tintColor}60`,
                    }}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Lihat Cara Menyelam</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
