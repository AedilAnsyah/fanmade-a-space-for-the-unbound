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
      // Gentle tilt between -6deg and +6deg
      setTilt({ x: -y * 6, y: x * 6 });
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
          const deg = Math.min(180, Math.max(0, (-deltaX / 160) * 180));
          setDragRotation(deg);
        } else {
          setDragRotation(0);
        }
      } else {
        // Back side: dragging right rotates from 180deg towards 0deg
        if (deltaX > 0) {
          const deg = Math.max(0, Math.min(180, 180 - (deltaX / 160) * 180));
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

      // If dragged more than 35px, flip; otherwise snap back
      if (!isFlipped) {
        if (deltaX < -35) {
          setIsFlipped(true);
        }
      } else {
        if (deltaX > 35) {
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
      return edgeHover === "right" ? -14 : tilt.y;
    } else {
      return edgeHover === "left" ? 194 : 180 - tilt.y;
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
            initial={{ opacity: 0, scale: 0.82, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 35 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="relative z-10 flex flex-col items-center"
            style={{ perspective: "1800px" }}
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
                stiffness: isDraggingRef.current ? 420 : 190,
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
                  A. POLAROID PHOTO (FRONT & MATCHING BACK)
                 ══════════════════════════════════════════════════════ */}
              {propType === "polaroid" && (
                <>
                  {/* ── POLAROID FRONT ── */}
                  <div
                    className="relative w-[290px] sm:w-[330px] aspect-[1/1.22] bg-[#FAF7F0] p-3.5 pb-6 rounded-[2px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-stone-300/40 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundImage:
                        "radial-gradient(circle at 50% 50%, #FAF8F2 0%, #F5EFE3 100%)",
                    }}
                  >
                    {/* Top Masking Tape Folded Over (Slightly to the Right) */}
                    <div className="absolute -top-3.5 right-6 w-20 h-6 bg-amber-200/80 border border-amber-300/60 shadow-sm rotate-2 pointer-events-none z-10" />

                    {/* Square Photo of Atma & Raya */}
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-900 border border-black/25 shadow-inner">
                      <img
                        src="/assets/Gambar/Atma n Nirmala n Raya/gambar 1 atma n raya.webp"
                        alt="Atma dan Raya"
                        loading="eager"
                        className="h-full w-full object-cover filter sepia-[0.12] contrast-105"
                      />
                      {/* Authentic Photographic Glare & Vignette */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent" />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_22px_rgba(0,0,0,0.35)]" />
                    </div>

                    {/* Handwritten Caption Front */}
                    <div className="mt-3 text-center">
                      <div className="font-serif text-sm sm:text-base italic text-stone-800 font-semibold leading-tight tracking-wide">
                        &ldquo;Musim Panas Terakhir&rdquo;
                      </div>
                      <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-1">
                        Kota Loka &bull; Juli 1998
                      </div>
                    </div>

                    {/* ── PEEL FLIP ZONE (RIGHT EDGE OF FRONT) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("right")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="absolute top-0 bottom-0 right-0 w-24 sm:w-28 z-30 cursor-pointer flex items-center justify-end pr-2 group"
                      title="Balik foto untuk melihat bagian belakang"
                    >
                      {/* Tactile Page Curl Indicator on Right Corner */}
                      <div
                        className={`absolute top-0 right-0 w-8 h-8 transition-all duration-300 pointer-events-none ${
                          edgeHover === "right" ? "opacity-100 scale-110" : "opacity-40"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[32px] border-t-transparent border-r-[32px] border-r-amber-900/20 drop-shadow-md"
                          style={{
                            filter: "drop-shadow(-2px 2px 3px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white/80 border-r-[30px] border-r-transparent" />
                      </div>

                      {/* Subtle Edge Peel Hint Arrow */}
                      <div
                        className={`font-mono text-[9px] text-amber-900/80 bg-amber-200/90 px-2 py-0.5 rounded shadow border border-amber-300 transition-all duration-300 ${
                          edgeHover === "right"
                            ? "opacity-90 translate-x-0"
                            : "opacity-0 translate-x-2"
                        }`}
                      >
                        ⮌ Balik
                      </div>
                    </div>
                  </div>

                  {/* ── POLAROID BACK (MATCHING VINTAGE PAPER & TRUE HANDWRITING) ── */}
                  <div
                    className="absolute inset-0 w-[290px] sm:w-[330px] aspect-[1/1.22] bg-[#FAF7F0] p-5 rounded-[2px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-stone-300/50 flex flex-col justify-between overflow-hidden"
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
                    {/* Top Masking Tape Folded Over — Mirrored to Left-6 on Back! */}
                    <div className="absolute -top-3.5 left-6 w-20 h-6 bg-amber-200/80 border border-amber-300/60 shadow-sm -rotate-2 pointer-events-none z-10" />

                    {/* Subtle Photographic Paper Watermark across the back */}
                    <div className="absolute inset-0 flex flex-col justify-around py-4 pointer-events-none opacity-[0.06] select-none -rotate-12">
                      <span className="font-mono text-xs uppercase tracking-[0.35em] text-stone-900 font-bold">
                        FUJICOLOR CRYSTAL ARCHIVE PAPER
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.35em] text-stone-900 font-bold ml-12">
                        FUJIFILM JAPAN &bull; 1998
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.35em] text-stone-900 font-bold ml-6">
                        LOKA PHOTO ARCHIVE
                      </span>
                    </div>

                    {/* Watermark Header Bar */}
                    <div className="flex items-center justify-between border-b border-stone-400/20 pb-1 text-[8px] font-mono text-stone-400 uppercase tracking-widest">
                      <span>FUJIFILM COLOR PAPER</span>
                      <span>NO. 07-98</span>
                    </div>

                    {/* Raya's Handwritten Letter (Pure Handwriting Font) */}
                    <div className="my-auto space-y-2.5 py-1 z-10">
                      <p className="font-handwriting text-base sm:text-lg leading-[1.3] text-[#1E2A4A] -rotate-1">
                        Atma...
                      </p>

                      <p className="font-handwriting text-[15px] sm:text-[17px] leading-[1.35] text-[#1E2A4A] pl-1">
                        Terima kasih ya sudah selalu ada dan nemenin aku keliling kota musim panas ini.
                        Kalau suatu saat nanti dunia terasa terlalu asing dan aku menghilang...
                        tolong cari aku di bawah pohon rindang depan sekolah kita ya.
                      </p>

                      <p className="font-handwriting text-[14px] sm:text-[16px] leading-[1.35] text-[#1E2A4A] pl-1">
                        Ps: Jangan lupa janji traktir es potong gerbang depan! Dan kucing belang tiga yang kemarin kita temuin... kita namain &ldquo;Loka&rdquo; aja ya!
                      </p>

                      {/* Cat doodle & sweet signature */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="font-handwriting text-base text-[#1E2A4A] flex items-center gap-1">
                          <span>(=^･ω･^=)</span>
                          <span className="text-xs font-mono opacity-60">🐾</span>
                        </div>
                        <div className="font-handwriting text-lg sm:text-xl font-bold text-[#8A1C1C] rotate-[-2deg]">
                          — Raya &hearts;
                        </div>
                      </div>
                    </div>

                    {/* Authentic Studio Rubber Stamp at Bottom */}
                    <div className="pt-1.5 border-t border-stone-300/30 flex items-center justify-between z-10">
                      <div className="font-mono text-[7px] text-stone-400">
                        SURYA PHOTO LAB
                      </div>
                      <div className="px-2 py-0.5 rounded border border-indigo-900/30 font-mono text-[8px] text-indigo-900/50 uppercase tracking-widest rotate-[-3deg]">
                        14 JULI 1998
                      </div>
                    </div>

                    {/* ── PEEL FLIP ZONE (LEFT EDGE OF BACK) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("left")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="absolute top-0 bottom-0 left-0 w-24 sm:w-28 z-30 cursor-pointer flex items-center justify-start pl-2 group"
                      title="Balik kembali ke foto depan"
                    >
                      {/* Tactile Page Curl Indicator on Left Corner */}
                      <div
                        className={`absolute top-0 left-0 w-8 h-8 transition-all duration-300 pointer-events-none ${
                          edgeHover === "left" ? "opacity-100 scale-110" : "opacity-40"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[32px] border-t-transparent border-l-[32px] border-l-amber-900/20 drop-shadow-md"
                          style={{
                            filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-white/80 border-l-[30px] border-l-transparent" />
                      </div>

                      {/* Subtle Edge Peel Hint Arrow */}
                      <div
                        className={`font-mono text-[9px] text-amber-900/80 bg-amber-200/90 px-2 py-0.5 rounded shadow border border-amber-300 transition-all duration-300 ${
                          edgeHover === "left"
                            ? "opacity-90 translate-x-0"
                            : "opacity-0 -translate-x-2"
                        }`}
                      >
                        Balik ⮎
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ══════════════════════════════════════════════════════
                  B. BINDER PAPER (FRONT & MATCHING BACK)
                 ══════════════════════════════════════════════════════ */}
              {propType === "binder" && (
                <>
                  {/* ── BINDER FRONT ── */}
                  <div
                    className="relative w-[300px] sm:w-[360px] aspect-[1/1.38] p-5 rounded-sm bg-[#FFFDF6] text-[#2B2018] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-stone-300 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 23px, rgba(59, 130, 246, 0.22) 23px, rgba(59, 130, 246, 0.22) 24px)
                      `,
                      lineHeight: "24px",
                    }}
                  >
                    {/* Masking Tape on Top Center */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 border border-amber-300/50 shadow-sm rotate-1 pointer-events-none z-10" />

                    {/* 3 Binder Hole Punches on Left Margin */}
                    <div className="absolute top-0 bottom-0 left-2.5 w-3 flex flex-col justify-around py-8 pointer-events-none opacity-25 z-10">
                      <div className="w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                    </div>

                    {/* Red Vertical Margin Line on Left */}
                    <div className="absolute top-0 bottom-0 left-9 w-px bg-red-300/40 pointer-events-none z-10" />

                    {/* Content inside margin */}
                    <div className="pl-7 pr-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-red-800 font-bold border-b border-red-200/60 pb-1 mb-2 flex items-center justify-between">
                        <span>LEMBAR BINDER SISWA</span>
                        <span className="text-[9px] text-stone-500">Hal. 12</span>
                      </div>

                      <h4 className="font-handwriting text-xl sm:text-2xl font-bold text-[#1C1917] mb-2 leading-tight">
                        Daftar Impian Sebelum Lulus:
                      </h4>

                      <ul className="font-handwriting text-lg sm:text-xl text-[#2B241E] space-y-1 leading-relaxed">
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-700 font-bold text-base">☑</span>
                          <span>Beli es potong di depan gerbang SMA</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-700 font-bold text-base">☑</span>
                          <span>Temani Raya cari kucing belang 3</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-700 font-bold text-base">☑</span>
                          <span>Nonton film di Bioskop Surya akhir pekan</span>
                        </li>
                        <li className="flex items-center gap-2 text-red-900 font-semibold">
                          <span className="text-red-700 font-bold text-base">☐</span>
                          <span>Ungkapkan rahasia tentang masa depan...</span>
                        </li>
                      </ul>

                      <div className="mt-4 pt-2 border-t border-dashed border-stone-300 text-right font-handwriting text-base text-stone-600">
                        — Ditulis bersama oleh Atma &amp; Raya
                      </div>
                    </div>

                    {/* ── PEEL FLIP ZONE (RIGHT EDGE OF FRONT) ── */}
                    <div
                      onMouseEnter={() => setEdgeHover("right")}
                      onMouseLeave={() => setEdgeHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(true);
                      }}
                      className="absolute top-0 bottom-0 right-0 w-24 sm:w-28 z-30 cursor-pointer flex items-center justify-end pr-2 group"
                      title="Balik lembar binder untuk membaca catatan di baliknya"
                    >
                      {/* Tactile Page Curl Indicator on Right Corner */}
                      <div
                        className={`absolute top-0 right-0 w-8 h-8 transition-all duration-300 pointer-events-none ${
                          edgeHover === "right" ? "opacity-100 scale-110" : "opacity-40"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[32px] border-t-transparent border-r-[32px] border-r-amber-900/20 drop-shadow-md"
                          style={{
                            filter: "drop-shadow(-2px 2px 3px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-white/80 border-r-[30px] border-r-transparent" />
                      </div>

                      {/* Subtle Edge Peel Hint Arrow */}
                      <div
                        className={`font-mono text-[9px] text-amber-900/80 bg-amber-200/90 px-2 py-0.5 rounded shadow border border-amber-300 transition-all duration-300 ${
                          edgeHover === "right"
                            ? "opacity-90 translate-x-0"
                            : "opacity-0 translate-x-2"
                        }`}
                      >
                        ⮌ Balik
                      </div>
                    </div>
                  </div>

                  {/* ── BINDER BACK (MATCHING PAPER TEXTURE & MIRRORED HOLES) ── */}
                  <div
                    className="absolute inset-0 w-[300px] sm:w-[360px] aspect-[1/1.38] p-5 rounded-sm bg-[#FFFDF6] text-[#2B2018] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-stone-300 flex flex-col justify-between overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 23px, rgba(59, 130, 246, 0.22) 23px, rgba(59, 130, 246, 0.22) 24px)
                      `,
                      lineHeight: "24px",
                    }}
                  >
                    {/* Masking Tape on Top Center (Back fold) */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 border border-amber-300/50 shadow-sm -rotate-1 pointer-events-none z-10" />

                    {/* 3 Binder Hole Punches Mirrored to RIGHT Margin! */}
                    <div className="absolute top-0 bottom-0 right-2.5 w-3 flex flex-col justify-around py-8 pointer-events-none opacity-25 z-10">
                      <div className="w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-stone-900 shadow-inner" />
                    </div>

                    {/* Red Vertical Margin Line Mirrored to RIGHT */}
                    <div className="absolute top-0 bottom-0 right-9 w-px bg-red-300/40 pointer-events-none z-10" />

                    {/* Secret Diary Scribbles (Within mirrored margins) */}
                    <div className="pr-7 pl-2 my-auto space-y-2 z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-red-800/30 pb-0.5 text-[9px] font-mono text-red-900 font-bold">
                        <span>🔒 CATATAN RAHASIA ATMA</span>
                        <span className="text-[8px] text-stone-500 italic">JANGAN DIBACA!</span>
                      </div>

                      {/* Atma's Handwritten Diary */}
                      <p className="font-handwriting text-base sm:text-lg leading-[1.35] text-[#1C1917]">
                        1. Buku catatan merah ini aneh... Tiap kali dipegang Raya, ada denyut hangat dan bisikan suara orang-orang kota. Apakah ini yang disebut SpaceDive?
                      </p>

                      <p className="font-handwriting text-base sm:text-lg leading-[1.35] text-[#1C1917]">
                        2. Raya akhir-akhir ini sering melamun memandangi langit sore. Tatapannya seolah tahu sesuatu yang akan terjadi pada kota ini.
                      </p>

                      <p className="font-handwriting text-base sm:text-lg leading-[1.35] text-[#7A1C1C] font-semibold">
                        3. Apapun yang terjadi setelah kelulusan, aku berjanji tidak akan meninggalkan Raya sendirian di dalam mimpinya.
                      </p>

                      {/* Little Secret Doodle */}
                      <div className="pt-1 flex items-center justify-between font-handwriting text-lg text-[#1C1917]">
                        <div className="flex items-center gap-1.5 text-amber-950 font-bold">
                          <span>📖✨</span>
                          <span>Buku Merah = Kunci Gerbang</span>
                        </div>
                        <span className="font-handwriting text-base text-stone-700 italic">
                          — Atma, 1998
                        </span>
                      </div>
                    </div>

                    {/* Stamp at Bottom */}
                    <div className="pr-7 pl-2 pt-1 border-t border-dashed border-stone-400/30 flex items-center justify-between text-[8px] font-mono text-stone-400 z-10">
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
                      className="absolute top-0 bottom-0 left-0 w-24 sm:w-28 z-30 cursor-pointer flex items-center justify-start pl-2 group"
                      title="Balik kembali ke halaman depan"
                    >
                      {/* Tactile Page Curl Indicator on Left Corner */}
                      <div
                        className={`absolute top-0 left-0 w-8 h-8 transition-all duration-300 pointer-events-none ${
                          edgeHover === "left" ? "opacity-100 scale-110" : "opacity-40"
                        }`}
                      >
                        <div
                          className="w-0 h-0 border-t-[32px] border-t-transparent border-l-[32px] border-l-amber-900/20 drop-shadow-md"
                          style={{
                            filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.3))",
                          }}
                        />
                        <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-white/80 border-l-[30px] border-l-transparent" />
                      </div>

                      {/* Subtle Edge Peel Hint Arrow */}
                      <div
                        className={`font-mono text-[9px] text-amber-900/80 bg-amber-200/90 px-2 py-0.5 rounded shadow border border-amber-300 transition-all duration-300 ${
                          edgeHover === "left"
                            ? "opacity-90 translate-x-0"
                            : "opacity-0 -translate-x-2"
                        }`}
                      >
                        Balik ⮎
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
