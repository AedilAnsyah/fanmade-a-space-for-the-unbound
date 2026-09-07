"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Eye, Radio, Tv, Sparkles } from "lucide-react";
import { useLayer } from "@/components/layer/useLayer";

/* ═══════════════════════════════════════════════════
 * TRAILER SECTION — TV TABUNG 90-AN DI ATAS MEJA
 *
 * - Background: Dinding vintage penuh poster & koran era 90-an
 * - TV tabung cembung diletakkan di atas meja kayu kokoh
 * - 2 Saluran Video Trailer Resmi dari YouTube:
 *     1. https://www.youtube.com/watch?v=8yGznOkpIGM (CH-01)
 *     2. https://www.youtube.com/watch?v=L08ZBQswnus (CH-02)
 * - Hanya menyisakan judul section: "Trailer Game"
 * ═══════════════════════════════════════════════════ */

const TRAILERS = [
  {
    channel: 1,
    id: "8yGznOkpIGM",
    title: "Trailer 1 — Official Reveal Trailer",
    label: "CH-01 &bull; TRAILER UTAMA",
  },
  {
    channel: 2,
    id: "L08ZBQswnus",
    title: "Trailer 2 — Release Date & Launch Trailer",
    label: "CH-02 &bull; PELUNCURAN GAME",
  },
];

export function TrailerSection() {
  const { timeOfDay } = useLayer();
  const [activeChannelIdx, setActiveChannelIdx] = useState(0);
  const [tvPower, setTvPower] = useState(true);
  const [showScanlines, setShowScanlines] = useState(true);
  const [isTuning, setIsTuning] = useState(false);

  const currentTrailer = TRAILERS[activeChannelIdx];

  const handleSwitchChannel = (idx: number) => {
    if (idx === activeChannelIdx) return;
    setIsTuning(true);
    setActiveChannelIdx(idx);
    setTimeout(() => setIsTuning(false), 400);
  };

  return (
    <section
      id="trailer"
      className="relative w-full py-12 sm:py-20 px-3 sm:px-6 md:py-28 overflow-hidden select-none transition-colors duration-700"
      style={{
        // Aged vintage plaster / room wall
        backgroundColor: "#16181f",
        backgroundImage: `
          radial-gradient(circle at 50% 40%, rgba(30, 35, 48, 0.6) 0%, rgba(10, 11, 15, 0.95) 100%),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 4px)
        `,
      }}
    >
      {/* ── 1. WALL OF POSTERS & VINTAGE NEWSPAPER CLIPPINGS (DINDING KORAN & POSTER 90-an) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {/* Background wall lighting vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

        {/* Newspaper 1: Top Left - hidden on mobile to avoid overlapping the header */}
        <div
          className="absolute top-8 -left-4 sm:left-6 w-56 sm:w-64 p-3 bg-[#E8DAC2] text-[#2B2018] rounded-sm shadow-xl -rotate-6 border border-stone-800/40 opacity-40 hover:opacity-75 transition-opacity hidden sm:block"
          style={{ filter: "sepia(0.2) contrast(1.05)" }}
        >
          <div className="border-b-2 border-black pb-1 mb-1.5 flex justify-between items-center font-mono text-[8px] font-bold">
            <span>WARTA LOKA EDISI 1998</span>
            <span>RP 500,-</span>
          </div>
          <h5 className="font-serif font-bold text-xs leading-tight mb-1 uppercase">
            Fenomena Langit Merah &amp; Pecahnya Ruang Waktu
          </h5>
          <p className="font-serif text-[9px] leading-tight text-stone-700 line-clamp-3">
            Warga Kota Loka dikejutkan oleh fenomena langka di langit senja. Siswa SMA setempat dilaporkan melihat retakan misterius di angkasa...
          </p>
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-200/80 border border-amber-300/60 rotate-2" />
        </div>

        {/* Poster 1: Top Right (Game Art Scene) - hidden on mobile to avoid clutter */}
        <div
          className="absolute top-10 right-4 sm:right-12 w-48 sm:w-56 p-2 bg-[#FAF5E6] rounded-sm shadow-2xl rotate-4 border border-stone-800/40 opacity-45 hidden sm:block"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-1.5">
            <img
              src="/assets/Gambar/Screens/gambar 1.jpg"
              alt="Poster Kota Loka"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover filter contrast-110"
            />
          </div>
          <div className="font-mono text-[9px] font-bold text-center uppercase tracking-wider text-red-900">
            A Space for the Unbound
          </div>
          <div className="absolute -top-2 left-6 w-12 h-4 bg-amber-200/80 border border-amber-300/60 -rotate-3" />
        </div>

        {/* Newspaper 2: Middle Left Behind Desk */}
        <div
          className="absolute top-1/2 -left-6 sm:left-4 -translate-y-1/2 w-52 sm:w-60 p-3 bg-[#E5D7BF] text-[#2B2018] rounded-sm shadow-lg rotate-3 border border-stone-800/40 opacity-35 hidden md:block"
        >
          <div className="border-b border-black pb-1 mb-1 font-mono text-[8px] font-bold text-center">
            HARIAN KOTA &bull; KRONIK REMAJA
          </div>
          <div className="font-serif font-bold text-[11px] leading-tight">
            Kisah Akhir Masa Putih Abu-Abu
          </div>
          <p className="font-serif text-[8px] leading-tight text-stone-700 mt-1">
            Menjelang kelulusan sekolah, impian masa depan dan rahasia yang tersimpan rapat mulai terungkap satu per satu.
          </p>
          <div className="absolute -top-2.5 right-6 w-12 h-4 bg-amber-200/70 border border-amber-300/50 -rotate-2" />
        </div>

        {/* Poster 2: Middle Right (Atma & Raya Art) */}
        <div
          className="absolute top-1/2 right-2 sm:right-8 -translate-y-1/2 w-48 sm:w-52 p-2 bg-[#F7EFE0] rounded-sm shadow-xl -rotate-3 border border-stone-800/40 opacity-40 hidden md:block"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-1">
            <img
              src="/assets/Gambar/Atma n Nirmala n Raya/gambar 2 atma n raya.jpg"
              alt="Atma dan Raya Poster"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover filter contrast-105"
            />
          </div>
          <div className="font-serif text-[10px] text-center font-bold text-stone-800 italic">
            &ldquo;Jangan lupakan aku...&rdquo;
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-200/80 border border-amber-300/50 rotate-1" />
        </div>

        {/* Poster 3: Bottom Left Corner (Screen Art) */}
        <div
          className="absolute bottom-20 left-10 w-44 p-2 bg-stone-900 rounded-sm shadow-2xl rotate-6 border border-stone-700/50 opacity-30 hidden lg:block"
        >
          <img
            src="/assets/Gambar/Screens/gambar13header.jpg"
            alt="Pixel Art Retro"
            loading="lazy"
            decoding="async"
            className="w-full h-24 object-cover"
          />
        </div>
      </div>

      {/* ── 2. SECTION TITLE (HANYA SISAKAN JUDUL "TRAILER GAME") ── */}
      <div className="relative z-20 mx-auto max-w-4xl text-center mb-8 sm:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-dive-heading text-3xl sm:text-5xl md:text-6xl text-white tracking-wider leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          Trailer Game
        </motion.h2>
      </div>

      {/* ── 3. RETRO 90s CRT TV SITTING ON A PHYSICAL WOODEN DESK ── */}
      <div className="relative z-20 mx-auto max-w-4xl flex flex-col items-center">
        
        {/* TV ANTENNA (KUMIS / RABBIT EARS) — hidden on very small screens */}
        <div className="relative mb-[-12px] z-0 hidden sm:flex items-center justify-center gap-14 pointer-events-none select-none">
          <div className="h-20 w-1.5 origin-bottom -rotate-[38deg] bg-gradient-to-t from-stone-600 via-stone-400 to-stone-200 rounded-full shadow-lg" />
          <div className="h-4 w-12 rounded-t-lg bg-stone-800 border-t border-stone-600 shadow-md flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-stone-950" />
          </div>
          <div className="h-20 w-1.5 origin-bottom rotate-[38deg] bg-gradient-to-t from-stone-600 via-stone-400 to-stone-200 rounded-full shadow-lg" />
        </div>

        {/* ── CRT TUBE TELEVISION CABINET CASING ── */}
        <div
          className="relative z-10 w-full rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-3 sm:p-5 md:p-8 border-2 sm:border-4 border-[#4a4f5c] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          style={{
            background: "linear-gradient(180deg, #32353f 0%, #20222a 50%, #15161c 100%)",
            boxShadow:
              "0 20px 45px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.18), inset 0 -4px 8px rgba(0,0,0,0.75)",
          }}
        >
          {/* Upper TV Brand Header */}
          <div className="flex items-center justify-between pb-2 sm:pb-3 mb-2 sm:mb-3 border-b border-white/10 font-mono text-[10px] sm:text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-bold tracking-wider text-stone-200 truncate">
                INDOTRON &bull; CRT 21&quot;
              </span>
              <span className="text-[10px] text-stone-500 hidden md:inline">STEREO HYPER-BAND</span>
            </div>

            {/* Active Channel Display Badge */}
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-[9px] sm:text-xs font-bold bg-black/70 px-1.5 sm:px-2.5 py-0.5 rounded border border-emerald-500/40 truncate max-w-[120px] sm:max-w-none">
                {tvPower ? currentTrailer.label : "STANDBY"}
              </span>
            </div>
          </div>

          {/* TV Grid: Curved CRT Screen (Col 1-9) & Control Knobs Panel (Col 10-12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
            
            {/* ── CURVED CRT GLASS SCREEN (COL 1-9) ── */}
            <div className="lg:col-span-9 relative">
              <div
                className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-black border-2 sm:border-4 border-[#121316] p-1 sm:p-2.5"
                style={{
                  boxShadow: "inset 0 4px 14px rgba(255,255,255,0.12), inset 0 -6px 16px rgba(0,0,0,0.9)",
                }}
              >
                {/* 16:9 Aspect Video Container */}
                <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black">
                  {tvPower ? (
                    <>
                      {/* Tuning static noise transition */}
                      {isTuning ? (
                        <div
                          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-stone-900"
                          style={{
                            backgroundImage:
                              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0), radial-gradient(rgba(0,0,0,0.8) 1px, transparent 0)",
                            backgroundSize: "4px 4px",
                          }}
                        >
                          <span className="font-mono text-sm text-green-400 font-bold animate-ping">
                            MEMINDAHKAN KE {currentTrailer.label}...
                          </span>
                        </div>
                      ) : (
                        /* Real YouTube Trailer Player */
                        <iframe
                          key={currentTrailer.id}
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube-nocookie.com/embed/${currentTrailer.id}?rel=0&modestbranding=1&autoplay=0`}
                          title={currentTrailer.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}

                      {/* Phosphor CRT Scanlines Overlay */}
                      {showScanlines && (
                        <div
                          className="pointer-events-none absolute inset-0 z-10 opacity-20"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1.5px, transparent 1.5px, transparent 3.5px)",
                          }}
                        />
                      )}

                      {/* Convex Glass Glare Reflection */}
                      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 via-white/5 to-transparent z-10" />

                      {/* Heavy CRT Vignette */}
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_45px_rgba(0,0,0,0.95)] z-10" />

                      <div className="pointer-events-none absolute bottom-3 right-3 z-20 font-mono text-[9px] text-amber-300/90 bg-black/80 px-2 py-0.5 rounded border border-amber-500/40 hidden sm:block">
                        <span>HI-FI STEREO &bull; 50Hz</span>
                      </div>
                    </>
                  ) : (
                    /* TV Powered Off Screen */
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07080a]">
                      <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse mb-2" />
                      <span className="font-mono text-xs text-stone-500 tracking-wider uppercase">
                        TELEVISI PADAM (STANDBY)
                      </span>
                      <span className="font-mono text-[10px] text-stone-700 mt-1">
                        Tekan tombol &quot;NYALAKAN TV&quot; untuk menonton trailer
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── HARDWARE CONTROL PANEL & CHANNEL KNOBS ── */}
            {/* Desktop: full vertical side panel (COL 10-12) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col justify-between h-full bg-[#1b1c23] p-3.5 rounded-2xl border-2 border-stone-800 shadow-inner gap-4">
              {/* Channel Selector Buttons (Trailer 1 & Trailer 2) */}
              <div className="flex flex-col gap-2 pb-3 border-b border-stone-800">
                <span className="font-mono text-[9px] font-bold text-stone-400 uppercase tracking-widest text-center">
                  PILIH SALURAN TRAILER
                </span>

                <div className="grid grid-cols-2 gap-1.5">
                  {TRAILERS.map((t, idx) => {
                    const isSelected = activeChannelIdx === idx;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSwitchChannel(idx)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border font-mono transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)] font-bold"
                            : "bg-stone-900 border-stone-700 text-stone-400 hover:bg-stone-800 hover:text-stone-200"
                        }`}
                      >
                        <span className="text-xs">CH-0{t.channel}</span>
                        <span className="text-[8px] uppercase tracking-wider mt-0.5">
                          {idx === 0 ? "Trailer 1" : "Trailer 2"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rotary Channel Knob */}
              <div className="flex flex-col items-center py-2 border-b border-stone-800">
                <button
                  type="button"
                  onClick={() => handleSwitchChannel(activeChannelIdx === 0 ? 1 : 0)}
                  className="relative h-14 w-14 rounded-full bg-gradient-to-b from-[#3a3d4a] to-[#1e2026] border-2 border-stone-600 shadow-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer group"
                  title="Putar kenop saluran (ganti Trailer 1 / Trailer 2)"
                >
                  <div
                    className="h-4 w-1 bg-amber-400 rounded-full transition-transform duration-300"
                    style={{
                      transform: activeChannelIdx === 0 ? "translateY(-12px)" : "translateX(12px)",
                    }}
                  />
                  <div className="absolute h-6 w-6 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold text-amber-300">
                      0{currentTrailer.channel}
                    </span>
                  </div>
                </button>
                <span className="font-mono text-[8px] text-stone-500 mt-1">
                  Kenop Saluran TV
                </span>
              </div>

              {/* CRT Scanline Toggle */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowScanlines(!showScanlines)}
                  className="flex items-center justify-between rounded bg-stone-900/90 px-2.5 py-1.5 border border-stone-700 text-[10px] font-mono transition-colors hover:bg-stone-800 cursor-pointer"
                >
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <Eye className="h-3 w-3 text-blue-400" />
                    <span>Efek Scanlines</span>
                  </span>
                  <span className={showScanlines ? "text-green-400 font-bold" : "text-stone-500"}>
                    {showScanlines ? "ON" : "OFF"}
                  </span>
                </button>

                {/* Power Toggle Button */}
                <button
                  type="button"
                  onClick={() => setTvPower(!tvPower)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-800 bg-red-950/90 px-3 py-2 text-xs font-mono font-bold text-red-200 transition-all hover:bg-red-800 hover:text-white cursor-pointer shadow"
                >
                  <Power className="h-3.5 w-3.5" />
                  <span>{tvPower ? "MATIKAN TV" : "NYALAKAN TV"}</span>
                </button>
              </div>
            </div>

            {/* Mobile: compact horizontal control strip below the screen */}
            <div className="flex lg:hidden items-center gap-2 bg-[#1b1c23] p-2.5 rounded-xl border border-stone-800 shadow-inner">
              {/* Channel buttons */}
              <div className="flex gap-1.5 flex-1">
                {TRAILERS.map((t, idx) => {
                  const isSelected = activeChannelIdx === idx;
                  return (
                    <button
                      key={`mobile-${t.id}`}
                      type="button"
                      onClick={() => handleSwitchChannel(idx)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border font-mono text-[10px] transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.25)] font-bold"
                          : "bg-stone-900 border-stone-700 text-stone-400 hover:bg-stone-800"
                      }`}
                    >
                      <span>CH-0{t.channel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scanlines toggle */}
              <button
                type="button"
                onClick={() => setShowScanlines(!showScanlines)}
                className="flex items-center gap-1.5 rounded-lg bg-stone-900/90 px-2.5 py-2 border border-stone-700 text-[10px] font-mono transition-colors hover:bg-stone-800 cursor-pointer"
              >
                <Eye className="h-3 w-3 text-blue-400" />
                <span className={showScanlines ? "text-green-400 font-bold" : "text-stone-500"}>
                  {showScanlines ? "ON" : "OFF"}
                </span>
              </button>

              {/* Power toggle */}
              <button
                type="button"
                onClick={() => setTvPower(!tvPower)}
                className="flex items-center gap-1.5 rounded-lg border border-red-800 bg-red-950/90 px-2.5 py-2 text-[10px] font-mono font-bold text-red-200 transition-all hover:bg-red-800 hover:text-white cursor-pointer shadow"
              >
                <Power className="h-3 w-3" />
                <span className="hidden sm:inline">{tvPower ? "MATIKAN" : "NYALAKAN"}</span>
              </button>
            </div>
          </div>

          {/* Bottom Speaker Grille & Power LED */}
          <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-stone-800 flex items-center justify-between">
            <div className="flex gap-1 sm:gap-1.5 opacity-60 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={`spk-${i}`} className="h-1 sm:h-1.5 w-2 sm:w-3 rounded-full bg-black flex-shrink-0" />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: tvPower ? "#22c55e" : "#ef4444",
                  boxShadow: tvPower ? "0 0 10px #22c55e" : "0 0 8px #ef4444",
                }}
              />
              <span className="font-mono text-[9px] text-stone-400 font-bold">
                {tvPower ? "POWER ON" : "STANDBY"}
              </span>
            </div>
          </div>
        </div>

        {/* ── 4. REALISTIC WOODEN TABLETOP (TV DILETAKKAN DI ATAS MEJA) ── */}
        <div className="w-full mt-[-6px] sm:mt-[-8px] relative z-20">
          {/* Deep Shadow cast by TV on the tabletop */}
          <div className="mx-auto w-[92%] h-2 sm:h-4 bg-black/90 blur-md rounded-full" />

          {/* Solid Teak Wooden Desk Top Surface */}
          <div
            className="w-full rounded-t-lg p-2 sm:p-4 border-t-2 border-[#5a361e] shadow-2xl relative flex items-center justify-between"
            style={{
              background: "linear-gradient(180deg, #422615 0%, #2e1a0e 100%)",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.12)",
            }}
          >
            {/* Tabletop Wood Grain lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.4) 40px, rgba(0,0,0,0.4) 42px)"
            }} />

            {/* Right Desk Prop: TV Remote Control on the table (clean without text) */}
            <div className="relative flex items-center gap-1.5 sm:gap-2 bg-stone-900 px-2 sm:px-3 py-1.5 sm:py-2 rounded border border-stone-700 shadow-md ml-auto">
              <div className="flex gap-1 sm:gap-1.5">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-600" />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-600" />
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-500" />
              </div>
            </div>
          </div>

          {/* Front Wooden Table Edge Lip (Ketebalan Pinggir Meja) */}
          <div
            className="w-full h-3 sm:h-5 rounded-b-md border-t border-[#1e1008] shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #24140a 0%, #150b05 100%)",
            }}
          />

          {/* Table Legs Silhouette at Bottom */}
          <div className="flex justify-between px-6 sm:px-10">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-b from-[#1a0e07] to-black/80 shadow-2xl" />
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-b from-[#1a0e07] to-black/80 shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
