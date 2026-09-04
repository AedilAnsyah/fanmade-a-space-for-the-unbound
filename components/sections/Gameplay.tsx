"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PixelIcon from "@/components/ui/PixelIcon";
import RetroImage from "@/components/ui/RetroImage";
import { GAME_ASSETS } from "@/lib/assets";

interface MemoryTarget {
  id: string;
  name: string;
  role: string;
  avatar: string;
  riftImg: string;
  mood: string;
  anomaly: string;
  innerThought: string;
  unlockedMemory: string;
  color: string;
}

const MEMORY_TARGETS: MemoryTarget[] = [
  {
    id: "cinema-keeper",
    name: "Pak Yohan",
    role: "Penjaga Bioskop Megaria 21",
    avatar: GAME_ASSETS.gameplayViewfinder[0].gif,
    riftImg: GAME_ASSETS.spacediveRifts[0].img, // street_brawl.jpg (Konflik Batin)
    mood: GAME_ASSETS.spacediveRifts[0].mood,
    anomaly: "Gembok Keraguan Masa Lalu",
    innerThought:
      "\"Bioskop tua ini sudah sepi... anak-anak muda lebih suka jalan ke mal besar di kota. Apakah rol film terakhir ini hanya akan berputar untuk kursi-kursi kosong?\"",
    unlockedMemory:
      "Teringat kenangan 1985: tawa riuh penonton desa saat poster film silat pertama kali dipasang dengan cat minyak buatan tangan.",
    color: "#F4C95D",
  },
  {
    id: "lulu-cat",
    name: "Kucing Belang",
    role: "Penjaga Pos Ronda RT 03",
    avatar: GAME_ASSETS.gameplayViewfinder[1].gif,
    riftImg: GAME_ASSETS.spacediveRifts[1].img, // winged_cat_monster.webp (Monster Fantasi)
    mood: GAME_ASSETS.spacediveRifts[1].mood,
    anomaly: "Misteri Ikan Asin Hilang",
    innerThought:
      "\"*Mrrrp?* Bu Lurah tadi siang menaruh ikan pindang di tudung saji... tapi atap seng pos ronda terlalu hangat untuk ditinggalkan...\"",
    unlockedMemory:
      "Membuka jalan rahasia di bawah gorong-gorong sekolah yang menghubungkan jalan desa ke padang ilalang tempat Atma sering melamun.",
    color: "#7FE7D8",
  },
  {
    id: "student-ebtanas",
    name: "Erik",
    role: "Siswa Kelas 3 SMA Loka",
    avatar: GAME_ASSETS.characters.atma.default,
    riftImg: GAME_ASSETS.spacediveRifts[2].img, // item_search.jpg (Penelusuran Memori)
    mood: GAME_ASSETS.spacediveRifts[2].mood,
    anomaly: "Kecemasan Ujian Kelulusan",
    innerThought:
      "\"Bapak ingin aku langsung kerja di pabrik gula, tapi aku masih ingin belajar melukis... Kenapa masa depan rasanya seperti tembok tebal yang tak berpintu?\"",
    unlockedMemory:
      "Sketsa krayon usang tentang langit senja berawan yang disembunyikan di lipatan buku rumus fisika.",
    color: "#8C6BFF",
  },
];

const GAMEPLAY_FRAGMENTS = [
  {
    id: "explore",
    title: "Menyusuri Setiap Jengkal Loka",
    tag: "Eksplorasi Nostalgia 90-an",
    icon: "map" as const,
    image: GAME_ASSETS.newsClippings.school,
    description:
      "Bersepeda melewati warung kelontong beratap seng, mencium aroma bakwan goreng yang baru diangkat, dan mendengarkan celoteh ibu-ibu di tukang sayur keliling. Loka bukan sekadar latar permainan, melainkan detak jantung masa remaja yang hangat dan bersahaja.",
    annotation: "Catatan: Jangan lupa menyapa Pak RT di pos ronda.",
    badgeColor: "accent" as const,
  },
  {
    id: "spacedive",
    title: "Menyelami Lipatan Trauma & Harapan",
    tag: "Mekanik Inti Spacedive",
    icon: "spacedive" as const,
    image: GAME_ASSETS.spacediveRifts[2].img,
    description:
      "Buku bersampul merah di tangan Atma adalah pintu gerbang menuju batin manusia. Masuki alam bawah sadar warga Loka, pecahkan simpul teka-teki emosional yang membelenggu mereka, dan bantu mereka berdamai dengan luka yang tak pernah terucap kata.",
    annotation: "Peringatan: Pikiran yang terluka bisa bermanifestasi menjadi anomali.",
    badgeColor: "dive" as const,
  },
  {
    id: "romance",
    title: "Dua Jiwa di Bawah Langit yang Retak",
    tag: "Kisah Pahit-Manis Remaja",
    icon: "heart" as const,
    image: GAME_ASSETS.cartridgeCovers.cassetteCover,
    description:
      "Duduk berdua bersama Raya di dermaga kayu danau, meniup permen karet sembari menuliskan daftar impian yang ingin diwujudkan sebelum hari kelulusan tiba. Di balik senyum manisnya, ada rahasia kosmik yang pelan-pelan mengancam keberadaan seluruh dunia.",
    annotation: "\"Janji ya, Atma... kita selesaikan buku catatan ini bersama-sama?\"",
    badgeColor: "primary" as const,
  },
  {
    id: "cats",
    title: "Menamai Kucing-Kucing Liar Loka",
    tag: "Interaksi Hangat",
    icon: "cat" as const,
    image: GAME_ASSETS.gameplayViewfinder[1].gif,
    isGif: true,
    description:
      "Hampir setiap sudut jalan Loka dihuni oleh kucing liar berkepribadian unik. Elus bulu mereka, berikan nama kesayangan dalam buku harianmu, dan saksikan bagaimana hewan-hewan kecil ini mengantarkan kehangatan di tengah badai misteri yang kian pekat.",
    annotation: "Total lebih dari puluhan kucing untuk diajak berteman.",
    badgeColor: "accent" as const,
  },
];

export default function Gameplay() {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState<MemoryTarget>(MEMORY_TARGETS[0]);
  const [activeViewfinderIndex, setActiveViewfinderIndex] = useState<number | null>(null);

  return (
    <section
      id="gameplay"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050914] text-[#E0E7FF] overflow-hidden transition-colors duration-1000"
    >
      {/* 1. Spacedive Cosmic Rift Transition Divider (Top Seam) */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-bg-primary to-[#050914] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1.5 spacedive-rift z-20" />

      {/* Diegetic Protocol HUD Ribbon */}
      <div className="max-w-7xl mx-auto relative z-10 mb-12">
        <div className="flex items-center justify-between border-b border-dive-accent/30 pb-3 text-xs font-mono tracking-widest text-dive-accent">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dive-accent animate-ping" />
            <span className="font-display">[ PROTOKOL_SPACEDIVE // FREKUENSI 19.99 MHz ]</span>
          </div>
          <span className="hidden sm:inline-block text-[#8C6BFF]/80 font-hand text-base">
            *sentuh batin orang lain untuk membuka gembok luka*
          </span>
        </div>
      </div>

      {/* Atmospheric Void Glows */}
      <div className="absolute -top-32 right-10 w-[550px] h-[550px] bg-[#8C6BFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-dive-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Mekanik & Eksplorasi"
          title="Menyelam ke Alam Batin Warga Loka"
          subtitle="Gunakan kekuatan magis Spacedive dari buku catatan merah Atma. Temukan rahasia yang terkunci di hati orang lain, selami ketakutan mereka, dan bantu mereka berdamai dengan kenyataan."
          diveTheme={true}
        />

        {/* 2. CAMCORDER 4:3 VIEWFINDER 2X2 GRID */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-16 rounded-2xl border-2 border-dive-accent/50 bg-[#09101f] shadow-[0_0_50px_rgba(0,229,199,0.25)] overflow-hidden relative"
        >
          {/* Camcorder Outer Chassis Master Header Bar */}
          <div className="bg-[#0b1428] px-4 sm:px-6 py-3 border-b border-dive-accent/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-dive-accent">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#ef4444]" />
                <span className="font-display font-bold text-red-400 tracking-wider">● REC</span>
              </div>
              <span className="text-white/80 font-mono">TAPE 120min [SP]</span>
              <span className="hidden md:inline-block text-white/50">•</span>
              <span className="hidden md:inline-block text-white/70">FORMAT: 4:3 NTSC 1999</span>
            </div>

            {/* Retro Battery Bar and Timecode HUD */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[11px] font-mono bg-black/50 px-2.5 py-1 rounded border border-white/10">
                <span className="text-text-muted">BAT:</span>
                <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
                  <span className="inline-block w-2.5 h-3 bg-emerald-400 rounded-2xs" />
                  <span className="inline-block w-2.5 h-3 bg-emerald-400 rounded-2xs" />
                  <span className="inline-block w-2.5 h-3 bg-emerald-400 rounded-2xs" />
                  <span className="inline-block w-2.5 h-3 bg-white/20 rounded-2xs" />
                </span>
                <span className="text-emerald-400">85%</span>
              </div>
              <span className="text-brand-primary font-mono text-xs hidden sm:inline-block">
                14 NOV 1999 • 17:45 WIB
              </span>
            </div>
          </div>

          {/* 2x2 Viewfinder Grid Container */}
          <div className="p-4 sm:p-6 bg-black/70">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {GAME_ASSETS.gameplayViewfinder.map((clip, idx) => {
                const isActive = activeViewfinderIndex === idx;

                return (
                  <div
                    key={clip.title}
                    onMouseEnter={() => setActiveViewfinderIndex(idx)}
                    onMouseLeave={() => setActiveViewfinderIndex(null)}
                    className="relative group rounded-xl overflow-hidden border-2 border-dive-accent/30 hover:border-dive-accent bg-[#070b16] transition-all duration-300 shadow-lg"
                  >
                    {/* Viewfinder 4:3 Aspect Ratio Shell (CLS: 0) */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161B33]">
                      <RetroImage
                        src={clip.gif}
                        alt={clip.title}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Phosphor CRT Scanline Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60" />

                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

                      {/* Camcorder Viewfinder Top HUD Overlay */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 border border-red-500/40 text-red-400 backdrop-blur-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="font-bold">{clip.tag}</span>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-white/80 font-mono">
                          4:3 SP • CH-0{idx + 1}
                        </div>
                      </div>

                      {/* Camcorder Center Framing Crosshair Brackets [ + ] */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 border border-white/30 relative">
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 text-xs">
                            +
                          </span>
                        </div>
                      </div>

                      {/* 4 Corner Viewfinder Angle Brackets */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none" />

                      {/* Camcorder Viewfinder Bottom HUD */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between pointer-events-none z-20">
                        <div className="p-2 rounded bg-black/80 border border-dive-accent/40 backdrop-blur-xs max-w-[80%]">
                          <h4 className="font-display text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                            <PixelIcon name="film" size={12} color="dive" />
                            <span>{clip.title}</span>
                          </h4>
                          <p className="text-[11px] text-gray-300 font-sans mt-0.5 line-clamp-1">
                            {clip.desc}
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-brand-primary">
                          {clip.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Viewfinder Bottom Explanatory Strip */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-dive-accent/70">
              <span className="flex items-center gap-1.5">
                <PixelIcon name="radio" size={12} color="dive" />
                <span>4 REKAMAN LENSA JADUL KOTA LOKA — SENTUH DOKUMEN UNTUK FOKUS</span>
              </span>
              <span className="text-white/40">SAMPEL DOKUMENTASI MOJIKEN STUDIO 1999</span>
            </div>
          </div>
        </motion.div>

        {/* 3. INTERACTIVE "SIMULASI SPACEDIVE" DENGAN ASSET RETAKAN KOSMIK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 p-6 sm:p-8 rounded-2xl bg-[#091124] border-2 border-dive-accent/40 relative shadow-[0_0_50px_rgba(140,107,255,0.15)]"
        >
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <PixelIcon name="spacedive" size="md" color="dive" />
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
                  Meja Eksperimen Spacedive
                </h3>
                <p className="text-xs text-text-muted font-sans mt-0.5">
                  Pilih target warga untuk menembus alam bawah sadar mereka dan meneliti anomali emosional.
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded bg-dive-accent/10 border border-dive-accent/30 text-xs font-mono text-dive-accent self-start sm:self-center">
              STATUS: SINKRONISASI AKTIF
            </div>
          </div>

          {/* Target Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {MEMORY_TARGETS.map((target) => {
              const isSelected = selectedTarget.id === target.id;
              return (
                <button
                  key={target.id}
                  onClick={() => setSelectedTarget(target)}
                  className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden flex items-center gap-3 ${
                    isSelected
                      ? "border-dive-accent bg-dive-accent/10 shadow-[0_0_20px_rgba(0,229,199,0.3)]"
                      : "border-white/10 bg-black/40 hover:border-brand-accent/50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/20 relative bg-[#161B33]">
                    <RetroImage
                      src={target.avatar}
                      alt={target.name}
                      fill
                      unoptimized={true}
                      sizes="48px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{target.name}</h4>
                    <span className="text-[11px] text-brand-primary block font-mono">
                      {target.role}
                    </span>
                    <span className="text-[10px] text-dive-accent font-mono block mt-0.5">
                      Rift: {target.mood}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-dive-accent animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Spacedive Mental Dive Result Box with Cosmic Rift Asset */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTarget.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-6 rounded-xl bg-black/60 border border-dive-accent/30 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Visual: Spacedive Rift Screen Asset */}
                <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-dive-accent/50 shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161B33]">
                    <RetroImage
                      src={selectedTarget.riftImg}
                      alt={selectedTarget.name}
                      fill
                      unoptimized={true}
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-center filter contrast-110 saturate-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dive-bg/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-dive-accent/50 text-[10px] font-mono text-dive-accent">
                      DIMENSI RETAKAN: {selectedTarget.mood.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Right Details: Anomaly & Unlocked Memory */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    <PixelIcon name="rift" size={12} color="red" />
                    <span>ANOMALI: {selectedTarget.anomaly}</span>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1">
                      Suara Batin Terkunci:
                    </h5>
                    <p className="font-handwriting text-xl sm:text-2xl text-[#FAF7EE] leading-relaxed italic">
                      {selectedTarget.innerThought}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-dive-accent/10 border border-dive-accent/40">
                    <div className="flex items-center gap-2 mb-1">
                      <PixelIcon name="sparkles" size={14} color="dive" />
                      <span className="font-display text-xs uppercase tracking-wider text-dive-accent font-bold">
                        Memori Terbuka Berkat Buku Catatan:
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
                      {selectedTarget.unlockedMemory}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 4. CAMCORDER ARTIFACT MONITOR (FOOTAGE LOKAL) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-16 rounded-xl border-2 border-dive-accent/40 bg-black/80 shadow-[0_0_40px_rgba(0,229,199,0.2)] overflow-hidden relative"
        >
          <div className="bg-[#0b1226] px-4 py-2 border-b border-dive-accent/30 flex items-center justify-between text-[11px] font-mono text-dive-accent">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                REC
              </span>
              <span className="text-white/60">[00:14:28:09] SP</span>
              <span className="text-dive-accent/80">KUALITAS: VHS TAPE 1999</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isMuted ? (
                  <PixelIcon name="volume_off" size={14} />
                ) : (
                  <PixelIcon name="volume_on" size={14} color="dive" />
                )}
                <span className="text-[10px] font-display">
                  {isMuted ? "BISUKAN" : "SUARA AKTIF"}
                </span>
              </button>
            </div>
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black">
            <video
              id="gameplay-preview-video"
              src="/assets/videos/video_01_forest_talk.webm"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-black/40 pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#050914]/90 border border-dive-accent/40 text-[11px] font-display text-dive-accent uppercase mb-2">
                  <PixelIcon name="film" size={14} color="dive" />
                  <span>Klip Arsip: Percakapan di Tepi Hutan Loka</span>
                </div>
                <h4 className="text-base sm:text-2xl font-display font-bold text-white tracking-wide">
                  Setiap percakapan menyimpan serpihan kenangan
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 font-sans mt-1">
                  Mendengarkan kisah warga desa membuka petunjuk tersembunyi yang tak tercatat di peta.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 bg-black/60 px-3 py-1.5 rounded border border-white/20 text-xs font-mono text-white/80">
                <PixelIcon name="radio" size={14} color="dive" />
                <span>CHANNEL 04: GELOMBANG JIWA</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. 4 CORE GAMEPLAY NARRATIVE FRAGMENTS */}
        <div className="space-y-16 mt-16">
          {GAMEPLAY_FRAGMENTS.map((frag, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={frag.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-12 p-6 sm:p-8 rounded-2xl bg-[#080d1d] border border-white/10 hover:border-dive-accent/50 transition-all duration-300 shadow-xl`}
              >
                {/* Widescreen Cinematic Image Container (Zero CLS) */}
                <div className="w-full lg:w-7/12 relative group overflow-hidden rounded-xl border border-white/20 bg-[#161B33] shadow-2xl">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <RetroImage
                      src={frag.image}
                      alt={frag.title}
                      fill
                      unoptimized={true}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none">
                      <span className="px-2 py-0.5 rounded bg-black/70 border border-white/20">
                        {frag.tag}
                      </span>
                      <span className="font-hand text-base text-brand-primary">Loka 1999</span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-5/12 space-y-4">
                  <div className="flex items-center gap-2">
                    <PixelIcon name={frag.icon} size="sm" color={frag.badgeColor} />
                    <span className="text-xs font-mono uppercase tracking-widest text-dive-accent">
                      0{idx + 1} // {frag.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                    {frag.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                    {frag.description}
                  </p>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-brand-primary/90 flex items-start gap-2">
                    <PixelIcon name="sparkles" size={14} color="primary" />
                    <span>{frag.annotation}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
