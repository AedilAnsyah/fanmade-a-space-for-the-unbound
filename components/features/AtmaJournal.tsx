"use client";

import React, { useState } from "react";
import RetroImage from "@/components/ui/RetroImage";
import { motion, AnimatePresence } from "framer-motion";
import PixelIcon from "@/components/ui/PixelIcon";
import { GAME_ASSETS } from "@/lib/assets";

interface JournalEntry {
  date: string;
  location: string;
  title: string;
  content: string[];
  photo: string;
  photoCaption: string;
  stickerText: string;
  doodle: string;
  isGif?: boolean;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    date: "14 Agustus 1999",
    location: "Halte Depan Sekolah, Kota Loka",
    title: "Catatan Tentang Senja dan Raya",
    content: [
      "Hujan sore ini baru saja reda. Aroma tanah basah dan gorengan dari warung Mbok Nah di seberang jalan membuat kota Loka terasa begitu tenang.",
      "Raya duduk di sampingku sambil melipat bungkus permen karet. Dia bilang, suatu hari nanti kita harus membuat daftar impian yang ingin diselesaikan sebelum masa SMA ini benar-benar berakhir.",
      "Aku hanya tersenyum dan mengangguk. Tapi entah kenapa, tatapan matanya sore ini terasa jauh sekali, menatap langit senja seperti menyimpan sebuah rahasia yang tak berani ia katakan.",
    ],
    photo: GAME_ASSETS.hero.polaroidFloat,
    photoCaption: "Raya di halte sore itu...",
    stickerText: "★ Hari ke-42",
    doodle: "🐱 Meow!",
  },
  {
    date: "27 Agustus 1999",
    location: "Tepi Jembatan Kali Loka",
    title: "Kekuatan yang Tak Masuk Akal",
    content: [
      "Buku catatan merah ini... ternyata bukan sekadar buku biasa. Waktu Pak Guru tampak gelisah memikirkan toko bukunya yang mau tutup, Raya menyuruhku mendekat dan membuka lembaran ini.",
      "Tiba-tiba sekelilingku berpendar ungu dan biru toska. Aku seperti 'menyelam' masuk ke dalam ruangan gelap di dalam kepalanya, melihat kenangan dan rasa cemas yang terkunci rapat.",
      "Raya menyebutnya 'Spacedive'. Dia bilang kekuatan ini anugerah, tapi setiap kali dia memakainya, tangannya selalu gemetar dingin. Aku berjanji akan menjaganya, apapun resikonya.",
    ],
    photo: GAME_ASSETS.characters.raya.power,
    photoCaption: "Cahaya pendar Spacedive",
    stickerText: "⚡ Misteri!",
    doodle: "✨ Spacedive",
  },
  {
    date: "02 September 1999",
    location: "Tempat Rongsokan Belakang Bioskop",
    title: "Kerajaan Kucing & Kentongan Ronda",
    content: [
      "Hari ini aku dan Raya menemukan anak kucing belang tiga di belakang rongsokan TV bioskop tua. Kami menamainya 'Lulu' dan memberinya sisa pindang goreng.",
      "Saat jalan pulang melewati pos ronda, aku tak tahan untuk tidak menabuh kentongan bambu. Suaranya 'tong-tong-tong' bergema memecah sunyi jalanan kampung.",
      "Pak RT sempat melongok dari jendela sambil tersenyum geleng-geleng kepala. Kota ini kecil, tapi di setiap gangnya ada cerita hangat yang tak ingin kulupakan.",
    ],
    photo: GAME_ASSETS.gameplayViewfinder[1].gif,
    photoCaption: "Memberi makan Lulu si kucing",
    stickerText: "🐾 Lulu si Belang",
    doodle: "🐟 Ikan Pindang",
    isGif: true,
  },
];

export default function AtmaJournal() {
  const [pageIndex, setPageIndex] = useState(0);
  const entry = JOURNAL_ENTRIES[pageIndex];

  return (
    <div className="relative my-20 max-w-4xl mx-auto px-2 sm:px-4">
      {/* Header Section Intro */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-display tracking-widest uppercase mb-3">
          <PixelIcon name="journal" size={14} color="primary" />
          <span>Elemen Diegetik Orisinal</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-text-main uppercase tracking-wide">
          Buku Catatan Merah Atma
        </h3>
        <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto mt-2 font-sans">
          Buku harian bersampul merah yang selalu dibawa Atma untuk mencatat kenangan, daftar impian, dan misteri kekuatan Spacedive di kota Loka.
        </p>
      </div>

      {/* Red Notebook Outer Leather Cover */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#8B1E1E] via-[#A82828] to-[#6E1414] p-3 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-[#520F0F]">
        {/* Brass Book Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-brand-primary/80 pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-brand-primary/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-brand-primary/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-brand-primary/80 pointer-events-none" />

        {/* Notebook Spine Ribbon Bookmark */}
        <div className="absolute -top-3 right-12 z-20 w-6 h-14 bg-brand-primary shadow-md flex items-end justify-center pb-1">
          <span className="w-2.5 h-2.5 bg-bg-primary rotate-45 mb-[-5px]" />
        </div>

        {/* Inner Lined Paper Page */}
        <div className="notebook-paper rounded-xl p-6 sm:p-10 text-slate-800 relative overflow-hidden min-h-[440px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex-1"
            >
              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-2 mb-4">
                <div className="flex items-center gap-2 pl-4 sm:pl-6">
                  <span className="font-handwriting text-xl sm:text-2xl font-bold text-red-700">
                    {entry.date}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-handwriting text-base sm:text-lg text-slate-600">
                    📍 {entry.location}
                  </span>
                </div>

                {/* Stamp Sticker */}
                <div className="px-2.5 py-0.5 rounded border border-dashed border-red-500/70 bg-red-50 text-red-700 text-xs font-display rotate-2 shadow-sm">
                  {entry.stickerText}
                </div>
              </div>

              {/* Main Content & Polaroid Column */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
                {/* Diary Paragraphs */}
                <div className="md:col-span-7 space-y-3 pl-4 sm:pl-6">
                  <h4 className="font-handwriting text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                    {entry.title}
                  </h4>

                  {entry.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="font-handwriting text-lg sm:text-xl text-slate-800 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Marginal Doodle */}
                  <div className="pt-2 text-right">
                    <span className="font-handwriting text-base text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded rotate-[-4deg] inline-block">
                      {entry.doodle}
                    </span>
                  </div>
                </div>

                {/* Taped Polaroid Photo */}
                <div className="md:col-span-5 flex flex-col items-center justify-center relative pt-2">
                  {/* Washi Tape Effect */}
                  <div className="washi-tape -top-2 left-1/2 -translate-x-1/2" />

                  <div className="polaroid-frame w-48 sm:w-56 text-center">
                    <div className="relative aspect-[4/3] bg-[#F2E6D8] overflow-hidden rounded-sm mb-2">
                      <RetroImage
                        src={entry.photo}
                        alt={entry.photoCaption}
                        fill
                        unoptimized={true}
                        sizes="224px"
                        className="object-cover"
                        fallbackText="MEMORI TIDAK DITEMUKAN"
                        fallbackSubtext={entry.stickerText}
                      />
                    </div>
                    <p className="font-handwriting text-base text-slate-700 font-medium">
                      {entry.photoCaption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page Navigation Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-300 pl-4 sm:pl-6">
            <button
              onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={pageIndex === 0}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display uppercase tracking-wider text-slate-700 hover:text-red-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <PixelIcon name="chevron_left" size={14} />
              <span>Lembar Sebelumnya</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              Halaman {pageIndex + 1} dari {JOURNAL_ENTRIES.length}
            </span>

            <button
              onClick={() => setPageIndex((prev) => Math.min(JOURNAL_ENTRIES.length - 1, prev + 1))}
              disabled={pageIndex === JOURNAL_ENTRIES.length - 1}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display uppercase tracking-wider text-slate-700 hover:text-red-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <span>Lembar Selanjutnya</span>
              <PixelIcon name="chevron_right" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
