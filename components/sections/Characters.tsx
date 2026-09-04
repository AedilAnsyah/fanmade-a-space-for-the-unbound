"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PixelIcon from "@/components/ui/PixelIcon";
import { CHARACTERS_DATA, Character } from "@/lib/constants";
import { GAME_ASSETS } from "@/lib/assets";

interface SecretMemory {
  title: string;
  thought: string;
}

const SECRET_MEMORIES: Record<string, SecretMemory> = {
  atma: {
    title: "Catatan Rahasia Buku Merah — Halaman Terlipat",
    thought:
      "\"Aku takut jika cerita yang kutulis bersama Raya ini selesai, kami tak lagi punya alasan untuk bersama di halte ini esok sore...\"",
  },
  raya: {
    title: "Gema Suara Batin — Dimensi Retakan Spacedive",
    thought:
      "\"Setiap kali aku memejamkan mata dan membuka alam bawah sadar orang lain, rasa dingin itu merambat ke dadaku. Tapi demi Atma, aku tak boleh mundur.\"",
  },
};

interface PoseOption {
  key: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
  isGif?: boolean;
}

const CHARACTER_POSES: Record<string, PoseOption[]> = {
  atma: [
    {
      key: "bubblegum",
      label: "SANTAI",
      src: GAME_ASSETS.characters.atma.default,
      alt: "Atma sedang santai meniup permen karet di halte depan sekolah",
      caption: "Atma — Halte Depan Sekolah (1999)",
    },
    {
      key: "smiling",
      label: "SENYUM",
      src: GAME_ASSETS.characters.atma.smiling,
      alt: "Atma tersenyum ramah di bangku kelas SMA Loka",
      caption: "Atma — Ruang Kelas 3-A SMA Loka",
    },
    {
      key: "action",
      label: "TERJATUH",
      src: GAME_ASSETS.characters.atma.action,
      alt: "Atma terjatuh di dalam ruang dimensi retakan mimpi",
      caption: "Atma — Dimensi Retakan Kosmik",
    },
  ],
  raya: [
    {
      key: "chill",
      label: "SANTAI",
      src: GAME_ASSETS.characters.raya.default,
      alt: "Raya bersantai di pinggir rel kereta menatap senja",
      caption: "Raya — Tepi Rel Menatap Senja (1999)",
    },
    {
      key: "power",
      label: "SPACEDIVE",
      src: GAME_ASSETS.characters.raya.power,
      alt: "Raya mengaktifkan kekuatan magis Spacedive berpendar",
      caption: "Raya — Pendar Magis Spacedive",
    },
    {
      key: "bridge",
      label: "JEMBATAN",
      src: GAME_ASSETS.characters.raya.bridgeGif,
      alt: "Raya berdiri di atas jembatan kali Loka (animasi)",
      caption: "Raya — Semilir Angin Jembatan Kali Loka",
      isGif: true,
    },
  ],
};

const CHARACTER_STAMPS: Record<string, string[]> = {
  atma: ["[ EMPATI: TINGGI ]", "[ IMAJINASI: PEKAT ]", "[ STATUS: SISWA AKTIF ]"],
  raya: ["[ RESONANSI: MAKSIMAL ]", "[ DAYA MAGIS: PEKAT ]", "[ STATUS: ANOMALI KOSMIK ]"],
};

const NIRMALA_POSES: PoseOption[] = [
  {
    key: "dusk",
    label: "SENJA",
    src: GAME_ASSETS.characters.nirmala.dusk,
    alt: "Nirmala berdiri di bawah langit senja keemasan kota Loka",
    caption: "Nirmala — Langit Senja Loka",
  },
  {
    key: "bridge",
    label: "JEMBATAN",
    src: GAME_ASSETS.characters.nirmala.bridge,
    alt: "Nirmala di jembatan kayu kali Loka",
    caption: "Nirmala — Jembatan Kayu",
  },
  {
    key: "laugh",
    label: "TAWA",
    src: GAME_ASSETS.characters.nirmala.laughGif,
    alt: "Nirmala tertawa riang (animasi)",
    caption: "Nirmala — Senyum Riang 16-Bit",
    isGif: true,
  },
];

export default function Characters() {
  const [activePose, setActivePose] = useState<Record<string, string>>({
    atma: "bubblegum",
    raya: "chill",
    nirmala: "dusk",
  });
  const [openSecret, setOpenSecret] = useState<Record<string, boolean>>({});

  const setPose = (charId: string, poseKey: string) => {
    setActivePose((prev) => ({ ...prev, [charId]: poseKey }));
  };

  const toggleSecret = (charId: string) => {
    setOpenSecret((prev) => ({ ...prev, [charId]: !prev[charId] }));
  };

  const currentNirmalaPose =
    NIRMALA_POSES.find((p) => p.key === activePose.nirmala) || NIRMALA_POSES[0];

  return (
    <section
      id="characters"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden"
    >
      {/* Background Soft Glow Ambience */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Dossier & Arsip Siswa"
          title="Dua Jiwa di Balik Loka 1999"
          subtitle="Map arsip siswa SMA Loka: lembaran rahasia, kepribadian, serta ingatan bawah sadar Atma dan Raya yang tertulis di atas meja kayu beralaskan kertas tebal 90-an."
        />

        {/* 1. MAIN CHARACTER DOSSIERS (2-COLUMN BALANCED FOLDER CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {CHARACTERS_DATA.map((char: Character, index: number) => {
            const poses = CHARACTER_POSES[char.id] || [];
            const activeKey = activePose[char.id] || poses[0]?.key;
            const currentPose = poses.find((p) => p.key === activeKey) || poses[0];
            const stamps = CHARACTER_STAMPS[char.id] || [];
            const secret = SECRET_MEMORIES[char.id];
            const isSecretOpen = Boolean(openSecret[char.id]);

            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative"
              >
                {/* Vintage Paperclip Hanging at Top Folder Edge */}
                <div className="absolute -top-3.5 left-10 z-30 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  <PixelIcon name="paperclip" size={24} className="text-[#F4C95D]" />
                </div>

                {/* Folder Manila Container with Solid Pixel Block Drop-Shadow */}
                <div className="relative rounded-lg bg-[#13182C] border border-[#2B3558] shadow-[6px_6px_0_0_#050914] overflow-hidden transition-all duration-300">
                  {/* Folder Tab Header Strip */}
                  <div className="bg-[#1B2340] border-b border-[#2B3558] px-5 sm:px-6 py-3 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-[#F4C95D]">
                      <span className="w-2 h-2 bg-[#F4C95D] rounded-2xs inline-block" />
                      <span className="tracking-widest uppercase font-bold text-[11px]">
                        ARSIP SISWA // {char.id === "atma" ? "DOKUMEN 01-A" : "DOKUMEN 02-R"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-2xs bg-black/40 border border-white/10 text-[10px] text-text-muted">
                        KLASIFIKASI: TERTUTUP
                      </span>
                      <span className="text-white/30 hidden sm:inline">•</span>
                      <span className="text-brand-accent/80 font-mono text-[11px] hidden sm:inline">
                        KOTA LOKA 1999
                      </span>
                    </div>
                  </div>

                  {/* Folder Body: 2 Columns with Ample Breathing Room */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
                    {/* SISI KIRI: POLAROID NYATA + BINDER TAB SWITCHER */}
                    <div className="sm:col-span-5 flex flex-col items-center">
                      {/* True Polaroid Paper Card Container */}
                      <div className="relative w-full p-3 sm:p-3.5 pb-7 sm:pb-8 bg-[#FAF8F5] rounded-sm shadow-[4px_4px_0_0_#050914] border border-[#E8E1D5] transition-transform duration-300 group">
                        {/* Washi Tape Semi-Transparan di Sudut Atas */}
                        <div className="absolute -top-3 left-6 z-20 w-16 h-5 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-5deg] shadow-sm pointer-events-none backdrop-blur-xs" />

                        {/* Foto Cetak 3:4 (Object-Cover & Zero CLS) */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xs bg-[#EAE2D5] border border-black/15 shadow-inner">
                          <Image
                            src={currentPose.src}
                            alt={currentPose.alt}
                            fill
                            unoptimized={Boolean(currentPose.isGif)}
                            sizes="(max-width: 640px) 100vw, 240px"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            priority={index === 0}
                          />
                        </div>

                        {/* Keterangan Tulisan Tangan di Bagian Bawah Polaroid */}
                        <div className="mt-2.5 pt-1 text-center">
                          <p className="font-handwriting text-base sm:text-lg text-slate-800 font-bold leading-tight line-clamp-1">
                            {currentPose.caption}
                          </p>
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mt-0.5">
                            FOTO DOKUMENTASI RESMI • 1999
                          </span>
                        </div>
                      </div>

                      {/* TOMBOL GANTI POSE: Tepat di Bawah Bingkai Foto (Tab Binder Sticker) */}
                      <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap w-full">
                        {poses.map((p) => {
                          const isActive = activeKey === p.key;

                          return (
                            <button
                              key={p.key}
                              onClick={() => setPose(char.id, p.key)}
                              className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-2xs transition-all ${
                                isActive
                                  ? "bg-[#FDE68A] text-[#78350F] font-bold border border-[#D97706] shadow-[1px_1px_0_0_#78350F] -translate-y-0.5"
                                  : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-dashed border-white/20"
                              }`}
                              title={p.alt}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SISI KANAN: LEMBAR BIODATA, CERITA & STEMPEL DATA FISIK */}
                    <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
                      <div>
                        {/* Sub-Header Role Badge */}
                        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-brand-accent uppercase mb-1.5">
                          <PixelIcon
                            name={char.id === "atma" ? "book" : "sparkles"}
                            size="sm"
                            color={char.id === "atma" ? "primary" : "accent"}
                          />
                          <span>{char.role}</span>
                        </div>

                        {/* Large Display Name */}
                        <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-wide">
                          {char.name}
                        </h3>

                        {/* Poetic Quote (Caveat / Warm Gold #F4C95D) */}
                        <p className="font-handwriting text-2xl sm:text-3xl text-[#F4C95D] leading-snug my-2">
                          “{char.tagline}”
                        </p>

                        {/* Relaxed Narrative Paragraphs */}
                        <p className="text-sm text-slate-300 font-sans leading-relaxed mt-2 mb-4">
                          {char.description}
                        </p>

                        {/* Secret Spacedive Memory Drawer */}
                        <div className="pt-2 border-t border-white/10">
                          <button
                            onClick={() => toggleSecret(char.id)}
                            className={`px-3 py-1.5 rounded text-xs font-display uppercase tracking-wider flex items-center gap-2 transition-all ${
                              isSecretOpen
                                ? "bg-dive-accent text-black font-bold shadow-[2px_2px_0_0_#000]"
                                : "bg-white/5 border border-dive-accent/40 text-dive-accent hover:bg-dive-accent hover:text-black"
                            }`}
                          >
                            <PixelIcon name="eye" size={14} />
                            <span>{isSecretOpen ? "Tutup Catatan Batin" : "Buka Catatan Batin"}</span>
                          </button>

                          <AnimatePresence>
                            {isSecretOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 p-3.5 rounded bg-black/60 border border-dive-accent/40 text-dive-text text-xs leading-relaxed"
                              >
                                <span className="font-mono text-[10px] text-dive-accent uppercase tracking-wider block mb-1">
                                  ★ {secret.title}:
                                </span>
                                <p className="font-handwriting text-lg text-amber-100 italic">
                                  {secret.thought}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* PHYSICAL RUBBER STAMP BADGES (Replaces Cramped Neon Bars) */}
                      <div className="pt-4 border-t border-white/10">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-2">
                          Status & Hasil Evaluasi Batin:
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {stamps.map((stamp, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-2xs border border-dashed border-[#F4C95D]/40 text-[#F4C95D] bg-[#F4C95D]/5 font-mono text-[11px] font-bold tracking-wider uppercase shadow-xs"
                            >
                              {stamp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. WARGA & SAHABAT KOTA LOKA (3 VERTICAL POLAROID CLIPPINGS) */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <PixelIcon name="cat" size="sm" color="accent" />
              <h4 className="font-display text-sm sm:text-base uppercase tracking-widest text-text-main font-bold">
                Warga & Sahabat Kota Loka
              </h4>
            </div>
            <span className="text-xs text-text-muted font-mono hidden sm:inline">
              Arsip Kliping Memori #03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Nirmala Mini Dossier */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rotate-[-1deg] hover:rotate-0 hover:scale-105 transition-all duration-300"
            >
              <div className="p-4 sm:p-5 pb-6 rounded-lg bg-[#FAF8F5] text-[#1E2022] shadow-[4px_4px_0_0_#050914] border border-[#E8E1D5] flex flex-col justify-between h-full relative">
                {/* Washi tape on top */}
                <div className="absolute -top-2.5 left-1/3 w-14 h-4 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-4deg] shadow-xs pointer-events-none" />

                <div>
                  {/* Photo Frame 3:4 */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xs bg-[#EAE2D5] border border-black/15 shadow-inner">
                    <Image
                      src={currentNirmalaPose.src}
                      alt={currentNirmalaPose.alt}
                      fill
                      unoptimized={Boolean(currentNirmalaPose.isGif)}
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>

                  {/* Pose switch tabs */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {NIRMALA_POSES.map((np) => (
                      <button
                        key={np.key}
                        onClick={() => setPose("nirmala", np.key)}
                        className={`px-2 py-0.5 text-[9px] font-mono uppercase rounded-2xs transition-all ${
                          activePose.nirmala === np.key
                            ? "bg-[#D97706] text-white font-bold"
                            : "bg-black/5 hover:bg-black/10 text-slate-600"
                        }`}
                      >
                        {np.label}
                      </button>
                    ))}
                  </div>

                  <h5 className="font-display text-base font-bold text-slate-900 mt-3">
                    Nirmala
                  </h5>
                  <span className="font-mono text-[11px] text-[#B45309] font-bold block mb-1">
                    Gadis Kecil Penuh Teka-teki
                  </span>
                  <p className="font-handwriting text-base text-slate-700 leading-tight italic">
                    “Jangan lupakan janji kita sebelum senja tenggelam di kali Loka...”
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>BERKAS: RAHA-01</span>
                  <span>★ MISTERI</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Kucing Loka (Lulu si Belang) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rotate-[1.2deg] hover:rotate-0 hover:scale-105 transition-all duration-300"
            >
              <div className="p-4 sm:p-5 pb-6 rounded-lg bg-[#FAF8F5] text-[#1E2022] shadow-[4px_4px_0_0_#050914] border border-[#E8E1D5] flex flex-col justify-between h-full relative">
                <div className="absolute -top-2.5 right-1/4 w-14 h-4 bg-[#7FE7D8]/80 border border-[#0D9488]/40 rotate-[3deg] shadow-xs pointer-events-none" />

                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xs bg-[#EAE2D5] border border-black/15 shadow-inner">
                    <Image
                      src={GAME_ASSETS.gameplayViewfinder[1].gif}
                      alt="Lulu si kucing belang di rongsokan TV"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>

                  <h5 className="font-display text-base font-bold text-slate-900 mt-4">
                    Lulu si Belang
                  </h5>
                  <span className="font-mono text-[11px] text-[#0D9488] font-bold block mb-1">
                    Sahabat Sejati Atma • Penjaga Gang
                  </span>
                  <p className="font-handwriting text-base text-slate-700 leading-tight italic">
                    “Menghuni atap seng pos ronda & penikmat ikan pindang goreng Mbok Nah.”
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>FAVORIT: IKAN PINDANG</span>
                  <span className="text-[#0D9488] font-bold">🐾 BISA DIELUS</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Warga & Tetangga Kota Loka */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rotate-[-0.8deg] hover:rotate-0 hover:scale-105 transition-all duration-300"
            >
              <div className="p-4 sm:p-5 pb-6 rounded-lg bg-[#FAF8F5] text-[#1E2022] shadow-[4px_4px_0_0_#050914] border border-[#E8E1D5] flex flex-col justify-between h-full relative">
                <div className="absolute -top-2.5 left-1/4 w-14 h-4 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-2deg] shadow-xs pointer-events-none" />

                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xs bg-[#EAE2D5] border border-black/15 shadow-inner">
                    <Image
                      src={GAME_ASSETS.newsClippings.school}
                      alt="Warga dan suasana kota Loka 1999"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>

                  <h5 className="font-display text-base font-bold text-slate-900 mt-4">
                    Warga Kota Loka
                  </h5>
                  <span className="font-mono text-[11px] text-[#4F46E5] font-bold block mb-1">
                    Keluarga & Tetangga 90-an
                  </span>
                  <p className="font-handwriting text-base text-slate-700 leading-tight italic">
                    “Dari bapak-bapak pos siskamling hingga celoteh hangat di warung gorengan.”
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>KOMUNITAS: RT 03</span>
                  <span className="text-[#4F46E5] font-bold">★ HANGAT</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
