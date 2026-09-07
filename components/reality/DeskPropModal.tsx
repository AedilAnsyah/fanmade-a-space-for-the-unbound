"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeskPropModalProps {
  propType: "binder" | "polaroid" | null;
  onClose: () => void;
}

export function DeskPropModal({ propType, onClose }: DeskPropModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [edgeHover, setEdgeHover] = useState<"right" | "left" | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState<number | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentDeltaRef = useRef(0);

  // Reset states whenever a new prop is opened
  useEffect(() => {
    setIsFlipped(false);
    setEdgeHover(null);
    setTilt({ x: 0, y: 0 });
    setDragRotation(null);
    isDraggingRef.current = false;
  }, [propType]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (propType) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [propType, onClose]);

  // Subtle 3D tilt tracking cursor over the card
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDraggingRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Gentle tilt between -5deg and +5deg
      setTilt({ x: -y * 5, y: x * 5 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDraggingRef.current) {
      setTilt({ x: 0, y: 0 });
      setEdgeHover(null);
    }
  }, []);

  // Pointer Drag handlers to turn the page/photo with cursor
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      currentDeltaRef.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      currentDeltaRef.current = deltaX;

      if (!isFlipped) {
        // Front side: dragging left rotates from 0deg towards 180deg
        if (deltaX < 0) {
          const deg = Math.min(180, Math.max(0, (-deltaX / 140) * 180));
          setDragRotation(deg);
        } else {
          setDragRotation(0);
        }
      } else {
        // Back side: dragging right rotates from 180deg towards 0deg
        if (deltaX > 0) {
          const deg = Math.max(0, Math.min(180, 180 - (deltaX / 140) * 180));
          setDragRotation(deg);
        } else {
          setDragRotation(180);
        }
      }
    },
    [isFlipped]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const deltaX = currentDeltaRef.current;
      setDragRotation(null);

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}

      // If dragged more than 30px, flip; otherwise snap back
      if (!isFlipped) {
        if (deltaX < -30) {
          setIsFlipped(true);
        }
      } else {
        if (deltaX > 30) {
          setIsFlipped(false);
        }
      }
    },
    [isFlipped]
  );

  // Compute final rotation Y combining flipped state, drag position, and edge hover curl
  const computeRotationY = () => {
    if (dragRotation !== null) return dragRotation;
    if (!isFlipped) {
      return edgeHover === "right" ? -12 : tilt.y;
    } else {
      return edgeHover === "left" ? 192 : 180 - tilt.y;
    }
  };

  return (
    <AnimatePresence>
      {propType && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 select-none">
          {/* Backdrop overlay (Clicking anywhere closes modal) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
            title="Klik di luar untuk meletakkan kembali ke meja"
          />

          {/* Modal Container: Floating prop in focus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 25 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex flex-col items-center"
            style={{ perspective: "1600px" }}
          >
            {/* 3D FLIPPABLE CARD WRAPPER */}
            <motion.div
              animate={{
                rotateY: computeRotationY(),
                rotateX: tilt.x,
              }}
              transition={{
                type: "spring",
                damping: isDraggingRef.current ? 40 : 22,
                stiffness: isDraggingRef.current ? 420 : 200,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative cursor-grab active:cursor-grabbing touch-none"
            >
              {/* ══════════════════════════════════════════════════════
                  A. POLAROID PHOTO (EXACT SIZE & FONT MATCHING DESK)
                 ══════════════════════════════════════════════════════ */}
              {propType === "polaroid" && (
                <>
                  {/* ── POLAROID FRONT (EXACT MATCH: w-52, p-2.5 pb-4, bg-white) ── */}
                  <div
                    className="relative w-52 bg-white p-2.5 pb-4 shadow-[0_22px_45px_rgba(0,0,0,0.85)] border border-stone-200 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Exact Yellowish Masking Tape at Top Corner as Desk */}
                    <div className="absolute -top-3 right-4 w-14 h-5 bg-amber-200/75 border border-amber-300/40 shadow-sm -rotate-6 pointer-events-none z-10" />

                    {/* Exact Photo Image as Desk */}
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-900 border border-black/15 shadow-inner">
                      <img
                        src="/assets/Gambar/Atma n Nirmala n Raya/gambar 1 atma n raya.webp"
                        alt="Atma dan Raya di Kota Loka"
                        loading="eager"
                        width={208}
                        height={208}
                        className="h-full w-full object-cover object-center filter sepia-[0.15] contrast-105"
                      />
                      {/* Photo Vignette as Desk */}
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]" />
                    </div>

                    {/* Exact Polaroid Handwritten Caption & Font as Desk */}
                    <div className="mt-2 text-center font-serif text-xs italic text-stone-700 leading-tight">
                      &ldquo;Musim Panas Terakhir&rdquo;
                      <br />
                      <span className="font-mono text-[9px] text-stone-500 not-italic uppercase tracking-wider">
                        Loka &bull; Juli 1998
                      </span>
                    </div>

                    {/* ── PEEL FLIP ZONE (RIGHT EDGE OF FRONT) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("right")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="absolute top-0 bottom-0 right-0 w-16 z-30 cursor-pointer flex items-center justify-end pr-1.5 group"
                      title="Balik foto untuk membaca pesan di baliknya"
                    >
                      {/* Dog-ear corner fold indicator */}
                      <div
                        className={`absolute top-0 right-0 w-7 h-7 transition-all duration-300 pointer-events-none ${
                          edgeHover === "right" ? "opacity-100 scale-110" : "opacity-35"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[28px] border-t-transparent border-r-[28px] border-r-amber-900/25 drop-shadow"
                          style={{
                            filter: "drop-shadow(-2px 2px 2px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[26px] border-t-white/90 border-r-[26px] border-r-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* ── POLAROID BACK (EXACT MATCH: w-52, p-2.5 pb-4, bg-[#FAF8F2]) ── */}
                  <div
                    className="absolute inset-0 w-52 h-full bg-[#FAF8F2] p-2.5 pb-3.5 shadow-[0_22px_45px_rgba(0,0,0,0.85)] border border-stone-200 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundImage: `
                        radial-gradient(circle at 50% 50%, #FAF8F2 0%, #F4ECE0 100%),
                        repeating-linear-gradient(45deg, rgba(0,0,0,0.012) 0px, rgba(0,0,0,0.012) 2px, transparent 2px, transparent 6px)
                      `,
                    }}
                  >
                    {/* Top Masking Tape Folded Over — Mirrored to Left Corner on Back! */}
                    <div className="absolute -top-3 left-4 w-14 h-5 bg-amber-200/75 border border-amber-300/40 shadow-sm rotate-6 pointer-events-none z-10" />

                    {/* Watermark Header Bar */}
                    <div className="flex items-center justify-between border-b border-stone-300/40 pb-1 text-[8px] font-mono text-stone-400 uppercase tracking-widest">
                      <span>FUJIFILM COLOR PAPER</span>
                      <span>NO. 07-98</span>
                    </div>

                    {/* Raya's Handwritten Letter in Caveat Font */}
                    <div className="my-auto space-y-1 py-0.5 z-10 text-stone-800">
                      <p className="font-handwriting text-xs leading-[1.25] text-[#1E2A4A] -rotate-1">
                        Atma... Terima kasih sudah selalu ada dan nemenin aku keliling kota musim panas ini.
                      </p>

                      <p className="font-handwriting text-[11px] leading-[1.25] text-[#1E2A4A]">
                        Kalau suatu saat nanti dunia terasa terlalu asing dan aku menghilang... tolong cari aku di bawah pohon rindang sekolah ya.
                      </p>

                      <p className="font-handwriting text-[10px] leading-[1.25] text-[#1E2A4A]">
                        Ps: Kucing belang 3 kemarin kita namain &ldquo;Loka&rdquo; aja ya! (=^･ω･^=)
                      </p>

                      <div className="text-right font-handwriting text-xs font-bold text-[#8A1C1C]">
                        — Raya &hearts;
                      </div>
                    </div>

                    {/* Studio Stamp at Bottom */}
                    <div className="border-t border-stone-300/40 pt-1 flex items-center justify-between font-mono text-[7px] text-stone-400 z-10">
                      <span>SURYA PHOTO LAB</span>
                      <span className="px-1 py-0.2 rounded border border-indigo-900/30 text-indigo-900/60 uppercase tracking-wider rotate-[-2deg]">
                        14 JULI 1998
                      </span>
                    </div>

                    {/* ── PEEL FLIP ZONE (LEFT EDGE OF BACK) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("left")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="absolute top-0 bottom-0 left-0 w-16 z-30 cursor-pointer flex items-center justify-start pl-1.5 group"
                      title="Balik kembali ke foto depan"
                    >
                      {/* Dog-ear corner fold indicator */}
                      <div
                        className={`absolute top-0 left-0 w-7 h-7 transition-all duration-300 pointer-events-none ${
                          edgeHover === "left" ? "opacity-100 scale-110" : "opacity-35"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[28px] border-t-transparent border-l-[28px] border-l-amber-900/25 drop-shadow"
                          style={{
                            filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[26px] border-t-white/90 border-l-[26px] border-l-transparent" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ══════════════════════════════════════════════════════
                  B. BINDER PAPER (EXACT SIZE & FONT MATCHING DESK)
                 ══════════════════════════════════════════════════════ */}
              {propType === "binder" && (
                <>
                  {/* ── BINDER FRONT (EXACT MATCH: w-60 sm:w-64, p-3.5, font-reality-heading & font-reality-body) ── */}
                  <div
                    className="relative w-60 sm:w-64 p-3.5 rounded-sm bg-[#FFFDF5] text-[#2B2018] shadow-[0_22px_45px_rgba(0,0,0,0.85)] border border-stone-300/80 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 21px, rgba(59, 130, 246, 0.2) 21px, rgba(59, 130, 246, 0.2) 22px)
                      `,
                      lineHeight: "22px",
                    }}
                  >
                    {/* Exact Masking Tape on Top as Desk */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/75 border border-amber-300/40 shadow-sm rotate-1 pointer-events-none z-10" />

                    {/* Exact Header Bar as Desk */}
                    <div className="text-[10px] font-mono uppercase tracking-wider text-red-700 font-bold border-b border-red-200 pb-1 mb-1.5 flex items-center justify-between">
                      <span>CATATAN BINDER</span>
                      <span className="text-[9px] text-gray-500">Hal. 12</span>
                    </div>

                    {/* Exact Title as Desk */}
                    <h4 className="font-reality-heading text-xs font-bold text-[#1C1917] mb-1">
                      Daftar Impian Sebelum Lulus:
                    </h4>

                    {/* Exact List Items & Body Font as Desk */}
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

                    {/* Exact Footer as Desk */}
                    <div className="mt-2 pt-1 border-t border-dashed border-gray-300 text-[9px] font-mono text-gray-500 italic text-right">
                      — Tulisan tangan Atma &amp; Raya
                    </div>

                    {/* ── PEEL FLIP ZONE (RIGHT EDGE OF FRONT) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("right")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="absolute top-0 bottom-0 right-0 w-16 z-30 cursor-pointer flex items-center justify-end pr-1.5 group"
                      title="Balik lembar binder untuk membaca catatan di baliknya"
                    >
                      {/* Dog-ear corner fold indicator */}
                      <div
                        className={`absolute top-0 right-0 w-7 h-7 transition-all duration-300 pointer-events-none ${
                          edgeHover === "right" ? "opacity-100 scale-110" : "opacity-35"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[28px] border-t-transparent border-r-[28px] border-r-amber-900/25 drop-shadow"
                          style={{
                            filter: "drop-shadow(-2px 2px 2px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[26px] border-t-white/90 border-r-[26px] border-r-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* ── BINDER BACK (EXACT MATCH: w-60 sm:w-64, p-3.5, bg-[#FFFDF5]) ── */}
                  <div
                    className="absolute inset-0 w-60 sm:w-64 p-3.5 rounded-sm bg-[#FFFDF5] text-[#2B2018] shadow-[0_22px_45px_rgba(0,0,0,0.85)] border border-stone-300/80 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 21px, rgba(59, 130, 246, 0.2) 21px, rgba(59, 130, 246, 0.2) 22px)
                      `,
                      lineHeight: "22px",
                    }}
                  >
                    {/* Top Masking Tape Folded Over — Mirrored Center on Back */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/75 border border-amber-300/40 shadow-sm -rotate-1 pointer-events-none z-10" />

                    {/* Header */}
                    <div className="text-[10px] font-mono uppercase tracking-wider text-red-700 font-bold border-b border-red-200 pb-1 mb-1 flex items-center justify-between">
                      <span>CATATAN RAHASIA ATMA</span>
                      <span className="text-[8px] text-stone-500 italic">JANGAN DIBACA!</span>
                    </div>

                    {/* Atma's Handwritten Diary in Caveat Font */}
                    <div className="my-auto space-y-1 py-0.5 text-stone-900 z-10">
                      <p className="font-handwriting text-[12px] sm:text-[13px] leading-[1.3] text-[#1C1917]">
                        1. Buku catatan merah ini aneh... Tiap kali dipegang Raya, ada denyut hangat dan bisikan suara orang-orang kota. Apakah ini SpaceDive?
                      </p>

                      <p className="font-handwriting text-[12px] sm:text-[13px] leading-[1.3] text-[#1C1917]">
                        2. Raya akhir-akhir ini sering melamun memandangi langit sore. Tatapannya seolah tahu sesuatu yang akan terjadi pada kota ini.
                      </p>

                      <p className="font-handwriting text-[12px] sm:text-[13px] leading-[1.3] text-[#7A1C1C] font-semibold">
                        3. Apapun yang terjadi setelah kelulusan, aku berjanji tidak akan meninggalkan Raya sendirian di dalam mimpinya.
                      </p>

                      <div className="pt-0.5 flex items-center justify-between font-handwriting text-xs text-[#1C1917]">
                        <span className="text-amber-950 font-bold">📖✨ Buku Merah = Kunci Gerbang</span>
                        <span className="text-stone-600 italic">— Atma, 1998</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-1 pt-1 border-t border-dashed border-gray-300 text-[8px] font-mono text-gray-500 flex justify-between z-10">
                      <span>SMA NEGERI 1 LOKA</span>
                      <span>KODE: SPACEDIVE-1998</span>
                    </div>

                    {/* ── PEEL FLIP ZONE (LEFT EDGE OF BACK) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("left")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="absolute top-0 bottom-0 left-0 w-16 z-30 cursor-pointer flex items-center justify-start pl-1.5 group"
                      title="Balik kembali ke halaman depan"
                    >
                      {/* Dog-ear corner fold indicator */}
                      <div
                        className={`absolute top-0 left-0 w-7 h-7 transition-all duration-300 pointer-events-none ${
                          edgeHover === "left" ? "opacity-100 scale-110" : "opacity-35"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[28px] border-t-transparent border-l-[28px] border-l-amber-900/25 drop-shadow"
                          style={{
                            filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[26px] border-t-white/90 border-l-[26px] border-l-transparent" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Subtle Atmospheric Bottom Guidance (No buttons) */}
            <div className="mt-5 text-center font-mono text-[9px] sm:text-[10px] text-amber-200/40 uppercase tracking-widest pointer-events-none select-none">
              Tarik atau klik ujung kertas untuk membalik &bull; Klik di luar untuk meletakkan
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
