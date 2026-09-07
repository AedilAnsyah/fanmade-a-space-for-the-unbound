"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCw, Sparkles, Heart } from "lucide-react";

interface DeskPropModalProps {
  propType: "binder" | "polaroid" | null;
  onClose: () => void;
}

export function DeskPropModal({ propType, onClose }: DeskPropModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flipped state when a new prop is opened
  useEffect(() => {
    setIsFlipped(false);
  }, [propType]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (propType) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [propType, onClose]);

  return (
    <AnimatePresence>
      {propType && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 select-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 flex flex-col items-center max-w-lg w-full"
          style={{ perspective: "1500px" }}
        >
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between w-full mb-3 px-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-amber-200/90 font-semibold drop-shadow">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>
                {propType === "polaroid"
                  ? "Foto Kenangan Atma & Raya"
                  : "Catatan Kertas Binder"}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-red-900/80 text-stone-300 hover:text-white border border-stone-700 hover:border-red-600 transition-colors font-mono text-xs cursor-pointer shadow-lg"
              title="Letakkan kembali ke meja"
            >
              <X className="h-3.5 w-3.5" />
              <span>Letakkan (Tutup)</span>
            </button>
          </div>

          {/* 3D FLIPPABLE CARD CONTAINER */}
          <div
            className="relative cursor-pointer transition-transform"
            style={{ perspective: "1500px" }}
            onClick={() => setIsFlipped(!isFlipped)}
            title="Klik kartu untuk membalik sisi"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.3, 0.64, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* ══════════════════════════════════════════
                  A. POLAROID PHOTO PROPS (FRONT & BACK)
                 ══════════════════════════════════════════ */}
              {propType === "polaroid" && (
                <>
                  {/* SIDE 1: POLAROID FRONT */}
                  <div
                    className="w-[280px] sm:w-[320px] bg-[#FFFDF8] p-3 pb-5 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-stone-300/40"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Masking tape on top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/80 border border-amber-300/60 shadow-sm rotate-1" />

                    {/* Polaroid Photo Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-stone-900 border border-black/20 shadow-inner">
                      <img
                        src="/assets/Gambar/Atma n Nirmala n Raya/gambar 1 atma n raya.webp"
                        alt="Atma dan Raya"
                        loading="eager"
                        className="h-full w-full object-cover filter sepia-[0.12] contrast-105"
                      />
                      {/* Photo Glare Reflection */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.35)]" />
                    </div>

                    {/* Handwritten Caption Front */}
                    <div className="mt-3 text-center">
                      <div className="font-serif text-sm sm:text-base italic text-stone-800 font-semibold leading-tight">
                        &ldquo;Musim Panas Terakhir&rdquo;
                      </div>
                      <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-1">
                        Kota Loka &bull; Juli 1998
                      </div>
                    </div>

                    {/* Flip clue at bottom */}
                    <div className="mt-2.5 pt-2 border-t border-dashed border-stone-300 text-center font-mono text-[9px] text-amber-800/80 flex items-center justify-center gap-1">
                      <RotateCw className="h-2.5 w-2.5" />
                      <span>Klik untuk membalik foto &amp; membaca pesan rahasia</span>
                    </div>
                  </div>

                  {/* SIDE 2: POLAROID BACK (EASTER EGG) */}
                  <div
                    className="absolute inset-0 w-[280px] sm:w-[320px] bg-[#F2E8D5] p-5 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 border-stone-400/40 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundImage: `
                        radial-gradient(circle at 80% 20%, rgba(180, 140, 80, 0.15) 0%, transparent 60%),
                        repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 2px, transparent 2px, transparent 6px)
                      `,
                    }}
                  >
                    {/* Watermark header */}
                    <div className="flex items-center justify-between border-b border-stone-400/30 pb-1.5 text-[8px] font-mono text-stone-500 uppercase tracking-widest">
                      <span>FUJIFILM COLOR PAPER</span>
                      <span>LOKA-98</span>
                    </div>

                    {/* Raya's Handwritten Note (Easter Egg) */}
                    <div className="my-auto space-y-2 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-serif text-red-900 font-bold">
                        <span>Pesan Rahasia dari Raya:</span>
                        <Heart className="h-3 w-3 fill-red-700 text-red-700" />
                      </div>

                      <p className="font-serif text-[11px] sm:text-xs leading-relaxed text-stone-800 italic">
                        &ldquo;Atma, terima kasih ya udah selalu nemenin aku musim panas ini. Kalau suatu saat nanti dunia terasa terlalu asing dan aku menghilang... tolong cari aku di bawah pohon rindang depan sekolah ya.&rdquo;
                      </p>

                      <p className="font-serif text-[10px] sm:text-[11px] leading-relaxed text-stone-700 italic">
                        &ldquo;Ps: Jangan lupa janji traktir es potongnya! Dan kucing belang tiga yang kemarin kita temuin... namanya kita kasih nama &lsquo;Loka&rsquo; aja ya!&rdquo;
                      </p>

                      {/* Cat paw doodle & signature */}
                      <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-stone-600">
                        <div className="text-amber-800 font-bold flex items-center gap-1">
                          <span>🐾</span>
                          <span>( =^･ω･^= )</span>
                        </div>
                        <span className="font-serif italic font-bold text-red-800">
                          — Raya &hearts;
                        </span>
                      </div>
                    </div>

                    {/* Bottom Stamp */}
                    <div className="pt-2 border-t border-dashed border-stone-400/40 flex items-center justify-between text-[8px] font-mono text-stone-500">
                      <span>STUDIO FOTO SURYA</span>
                      <span>14 JULI 1998</span>
                    </div>
                  </div>
                </>
              )}

              {/* ══════════════════════════════════════════
                  B. BINDER PAPER PROPS (FRONT & BACK)
                 ══════════════════════════════════════════ */}
              {propType === "binder" && (
                <>
                  {/* SIDE 1: BINDER FRONT (BUCKET LIST) */}
                  <div
                    className="w-[300px] sm:w-[360px] p-5 rounded-sm bg-[#FFFDF5] text-[#2B2018] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-stone-300"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 23px, rgba(59, 130, 246, 0.25) 23px, rgba(59, 130, 246, 0.25) 24px)
                      `,
                      lineHeight: "24px",
                    }}
                  >
                    {/* Masking Tape on Top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 border border-amber-300/50 shadow-sm rotate-1" />

                    {/* Binder Hole Punches on Left Margin */}
                    <div className="absolute top-0 bottom-0 left-2 w-3 flex flex-col justify-around py-6 pointer-events-none opacity-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                    </div>

                    <div className="pl-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-red-700 font-bold border-b border-red-200 pb-1 mb-2 flex items-center justify-between">
                        <span>LEMBAR BINDER SISWA</span>
                        <span className="text-[10px] text-gray-500">Hal. 12</span>
                      </div>

                      <h4 className="font-reality-heading text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        Daftar Impian Sebelum Lulus:
                      </h4>

                      <ul className="font-reality-body text-xs sm:text-sm text-[#38332F] space-y-1.5">
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold text-base">☑</span>
                          <span>Beli es potong di depan gerbang SMA</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold text-base">☑</span>
                          <span>Temani Raya cari kucing belang 3</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold text-base">☑</span>
                          <span>Nonton film di Bioskop Surya akhir pekan</span>
                        </li>
                        <li className="flex items-center gap-2 text-red-900 font-semibold">
                          <span className="text-red-700 font-bold text-base">☐</span>
                          <span>Ungkapkan rahasia tentang masa depan...</span>
                        </li>
                      </ul>

                      <div className="mt-3 pt-2 border-t border-dashed border-gray-300 text-[10px] font-mono text-gray-500 italic text-right">
                        — Ditulis bersama oleh Atma &amp; Raya
                      </div>

                      {/* Flip clue */}
                      <div className="mt-2 pt-1 text-center font-mono text-[9px] text-amber-800/80 flex items-center justify-center gap-1">
                        <RotateCw className="h-2.5 w-2.5" />
                        <span>Klik untuk membalik lembar &amp; melihat catatan rahasia Atma</span>
                      </div>
                    </div>
                  </div>

                  {/* SIDE 2: BINDER BACK (ATMA'S SECRET DIARY EASTER EGG) */}
                  <div
                    className="absolute inset-0 w-[300px] sm:w-[360px] p-5 rounded-sm bg-[#FAF5E6] text-[#2B2018] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 border-amber-900/30 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundImage: `
                        repeating-linear-gradient(transparent, transparent 23px, rgba(220, 38, 38, 0.15) 23px, rgba(220, 38, 38, 0.15) 24px)
                      `,
                      lineHeight: "24px",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-red-800/30 pb-1 text-[10px] font-mono text-red-900 font-bold">
                      <span className="flex items-center gap-1">
                        <span>🔒</span>
                        <span>CATATAN RAHASIA ATMA</span>
                      </span>
                      <span className="text-[9px] text-stone-500 italic">JANGAN DIBACA!</span>
                    </div>

                    {/* Secret Diary Scribbles */}
                    <div className="my-auto space-y-2 py-1 text-stone-800">
                      <p className="font-serif text-[11px] sm:text-xs leading-relaxed italic">
                        1. Buku catatan merah ini aneh... Tiap kali dipegang Raya, ada denyut hangat dan bisikan suara orang-orang kota. Apakah ini yang disebut SpaceDive?
                      </p>
                      <p className="font-serif text-[11px] sm:text-xs leading-relaxed italic">
                        2. Raya akhir-akhir ini sering melamun memandangi langit sore. Tatapannya seolah tahu sesuatu yang akan terjadi pada kota ini.
                      </p>
                      <p className="font-serif text-[11px] sm:text-xs leading-relaxed italic text-red-950 font-semibold">
                        3. Apapun yang terjadi setelah kelulusan, aku berjanji tidak akan meninggalkan Raya sendirian di dalam mimpinya.
                      </p>

                      {/* Little Secret Doodle */}
                      <div className="pt-1 flex items-center justify-between font-mono text-[9px] text-stone-600">
                        <div className="flex items-center gap-1.5 text-amber-900">
                          <span>📖✨</span>
                          <span>Buku Merah = Kunci Gerbang</span>
                        </div>
                        <span className="italic">— Atma</span>
                      </div>
                    </div>

                    {/* Footer / Stamp */}
                    <div className="border-t border-dashed border-stone-400/40 pt-1 text-[8px] font-mono text-stone-500 flex justify-between">
                      <span>KELAS XII-A SMA LOKA</span>
                      <span>KODE: SPACEDIVE-1998</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Bottom Flip Button CTA */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-200 font-mono text-xs font-bold transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <RotateCw className={`h-3.5 w-3.5 transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
              <span>
                {isFlipped
                  ? "Balik ke Sisi Depan"
                  : propType === "polaroid"
                  ? "Balik Foto (Buka Pesan Rahasia)"
                  : "Balik Lembar (Buka Catatan Rahasia)"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    )}
    </AnimatePresence>
  );
}
