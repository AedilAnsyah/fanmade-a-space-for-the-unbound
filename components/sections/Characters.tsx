"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PixelIcon from "@/components/ui/PixelIcon";
import RetroImage from "@/components/ui/RetroImage";
import { CHARACTERS_DATA, Character } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

interface SecretMemory {
  title: string;
  thought: string;
}

const SECRET_MEMORIES: Record<string, SecretMemory> = {
  atma: {
    title: "Catatan Rahasia Buku Merah — Halaman Terlipat",
    thought:
      "\"Aku takut jika cerita yang kutulis bersama Raya ini selesai, kami tak lagi punya alasan untuk duduk bersama di halte ini esok sore...\"",
  },
  raya: {
    title: "Gema Suara Batin — Dimensi Retakan Spacedive",
    thought:
      "\"Setiap kali aku membuka alam bawah sadar orang lain, rasa dingin itu merambat ke dadaku. Tapi demi Atma dan kota Loka, aku tak boleh mundur.\"",
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

// Membaca URL yang valid secara langsung dari ASSETS.atma dan ASSETS.raya
const CHARACTER_POSES: Record<string, PoseOption[]> = {
  atma: [
    {
      key: "bubblegum",
      label: "SANTAI",
      src: ASSETS.atma.default,
      alt: "Atma santai meniup permen karet di halte depan sekolah",
      caption: "Atma — Halte Depan Sekolah (1999)",
    },
    {
      key: "smiling",
      label: "SENYUM",
      src: ASSETS.atma.smiling,
      alt: "Atma tersenyum ramah di bangku kelas SMA Loka",
      caption: "Atma — Ruang Kelas 3-A SMA Loka",
    },
    {
      key: "action",
      label: "TERJATUH",
      src: ASSETS.atma.action,
      alt: "Atma terjatuh di dalam ruang dimensi retakan mimpi",
      caption: "Atma — Dimensi Retakan Kosmik",
    },
  ],
  raya: [
    {
      key: "chill",
      label: "SANTAI",
      src: ASSETS.raya.default,
      alt: "Raya bersantai di pinggir rel kereta menatap senja",
      caption: "Raya — Tepi Rel Menatap Senja (1999)",
    },
    {
      key: "power",
      label: "SPACEDIVE",
      src: ASSETS.raya.power,
      alt: "Raya mengaktifkan kekuatan magis Spacedive berpendar",
      caption: "Raya — Pendar Magis Spacedive",
    },
    {
      key: "bridge",
      label: "JEMBATAN",
      src: ASSETS.raya.bridgeGif,
      alt: "Raya berdiri di atas jembatan kali Loka (animasi)",
      caption: "Raya — Semilir Angin Jembatan Kali Loka",
      isGif: true,
    },
  ],
};

// 3 badge stempel mini sesuai arahan prompt
const CHARACTER_STAMPS: Record<string, string[]> = {
  atma: ["[ EMPATI: TINGGI ]", "[ IMAJINASI: PEKAT ]", "[ STATUS: AKTIF ]"],
  raya: ["[ RESONANSI: MAKSIMAL ]", "[ DAYA MAGIS: PEKAT ]", "[ STATUS: ANOMALI ]"],
};

const NIRMALA_POSES: PoseOption[] = [
  {
    key: "dusk",
    label: "SENJA",
    src: ASSETS.nirmala.dusk,
    alt: "Nirmala berdiri di bawah langit senja keemasan kota Loka",
    caption: "Nirmala — Langit Senja Loka",
  },
  {
    key: "bridge",
    label: "JEMBATAN",
    src: ASSETS.nirmala.bridge,
    alt: "Nirmala di jembatan kayu kali Loka",
    caption: "Nirmala — Jembatan Kayu",
  },
  {
    key: "laugh",
    label: "TAWA",
    src: ASSETS.nirmala.laughGif,
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
          subtitle="Map arsip siswa SMA Loka: lembaran rahasia, kepribadian, serta ingatan bawah sadar Atma dan Raya yang tertata rapi di atas kertas tebal era 90-an tanpa sekat yang sesak."
        />

        {/* 1. MAIN CHARACTER DOSSIERS (ANTI-CRAMPED 2-COLUMN FOLDER SHEETS) */}
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

                {/* Dossier Folder Manila Top Tab */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1C233C] border-t border-l border-r border-white/15 rounded-t-md text-[11px] font-mono text-[#F4C95D] uppercase tracking-wider ml-4 -mb-[1px]">
                  <span className="w-2 h-2 rounded-2xs bg-[#F4C95D] inline-block" />
                  <span>BERKAS {char.id.toUpperCase()} // ARSIP 1999</span>
                </div>

                {/* Main Folder Sheet: Latar Dossier #12172A / #161B33 dengan Bayangan Tegas Pixel */}
                <div className="relative rounded-lg rounded-tl-none bg-[#14192B] border border-white/10 shadow-[6px_6px_0_0_#050914] p-6 sm:p-8 transition-all duration-300">
                  {/* Layout 2-Kolom Seimbang (Breathe Room) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
                    {/* SISI KIRI: POLAROID NYATA (3:4) & TAB BINDER GANTI POSE */}
                    <div className="sm:col-span-5 flex flex-col items-center">
                      {/* Polaroid Frame Putih Tebal Khas Foto Cetak 90-an */}
                      <div className="relative w-full p-3.5 pb-8 bg-[#FAF7F2] rounded-xs shadow-[4px_4px_0_0_#050914] border border-[#E3DDD1] transition-transform duration-300">
                        {/* Washi Tape Semi-Transparan di Sudut Atas */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-2deg] shadow-xs backdrop-blur-xs pointer-events-none z-20" />

                        {/* Foto Cetak: Aspect Ratio Dikunci dengan relative w-full aspect-[3/4] & object-cover object-center */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xs bg-[#161B33] border border-black/15 shadow-inner">
                          <RetroImage
                            src={currentPose.src}
                            alt={currentPose.alt}
                            fill
                            unoptimized={true}
                            sizes="(max-width: 640px) 100vw, 280px"
                            className="object-cover object-center transition-transform duration-700 hover:scale-105"
                            priority={index === 0}
                          />
                        </div>

                        {/* Keterangan Tulisan Tangan di Bawah Polaroid */}
                        <div className="mt-3 text-center">
                          <p className="font-handwriting text-base sm:text-lg text-slate-800 font-bold leading-tight line-clamp-1">
                            {currentPose.caption}
                          </p>
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mt-0.5">
                            KOTA LOKA • 1999
                          </span>
                        </div>
                      </div>

                      {/* POSISI TOMBOL GANTI POSE: Tepat di Bawah Bingkai Foto (Tab Stiker Binder) */}
                      <div className="mt-3.5 flex items-center justify-center gap-1.5 flex-wrap w-full">
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

                    {/* SISI KANAN: LEMBAR BIODATA & CERITA (BERNAPAS LEGA, BEBAS DARI KOTAK BERSARANG) */}
                    <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
                      <div className="space-y-2.5">
                        {/* Sub-Header Role Badge */}
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="uppercase tracking-widest text-brand-accent">
                            {char.role}
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                            SMA LOKA • KELAS 3-A
                          </span>
                        </div>

                        {/* Nama Besar (Silkscreen/Pixel Display Font) */}
                        <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-wide">
                          {char.name}
                        </h3>

                        {/* Kutipan Puitis (Caveat/Handwritten dengan Aksen Emas Hangat #F4C95D) */}
                        <p className="font-handwriting text-2xl sm:text-3xl text-[#F4C95D] leading-snug">
                          “{char.tagline}”
                        </p>

                        {/* Paragraf Deskripsi yang Nyaman Dibaca Tanpa Terdesak */}
                        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1">
                          {char.description}
                        </p>

                        {/* Spacedive Secret Revelation: Lipatan Catatan Batin Diegetik */}
                        <div className="pt-3">
                          <button
                            onClick={() => toggleSecret(char.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-dive-accent hover:underline decoration-dashed transition-all"
                          >
                            <PixelIcon name="eye" size={13} color="dive" />
                            <span>
                              {isSecretOpen ? "[-] Lipat Catatan Batin" : "[+] Buka Catatan Rahasia Batin"}
                            </span>
                          </button>

                          <AnimatePresence>
                            {isSecretOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2.5 p-3.5 rounded-2xs border-l-2 border-dive-accent bg-dive-accent/5 text-dive-text">
                                  <span className="font-mono text-[10px] text-dive-accent uppercase tracking-wider block mb-1">
                                    ★ {secret.title}:
                                  </span>
                                  <p className="font-handwriting text-xl text-amber-100 italic leading-relaxed">
                                    {secret.thought}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* 3 BADGE STEMPEL FISIK SEDERHANA DI POJOK BAWAH (PENGGANTI STAT BAR NEON) */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                        {stamps.map((stamp, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 border border-dashed border-[#F4C95D]/60 text-[#F4C95D] font-mono text-[11px] font-bold uppercase tracking-wider rounded-2xs bg-[#F4C95D]/5 shadow-xs"
                          >
                            {stamp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. SECTION "WARGA & SAHABAT KOTA LOKA": GRID 3 POLAROID MINI BERDIRI BERJEJER */}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 1. Nirmala: Foto Mini Berbingkai Usang + Kutipan Rahasia */}
            <div className="relative p-3.5 pb-6 bg-[#FAF7F2] rounded-xs shadow-[4px_4px_0_0_#050914] border border-[#E3DDD1] rotate-[-1deg] hover:-rotate-1 hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-full">
              <div className="absolute -top-2.5 left-1/3 w-16 h-4 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-3deg] shadow-xs pointer-events-none" />

              <div>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#161B33] rounded-2xs mb-3 border border-black/10">
                  <RetroImage
                    src={currentNirmalaPose.src}
                    alt={currentNirmalaPose.alt}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Pose switch tabs */}
                <div className="flex items-center justify-center gap-1 mb-2.5">
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

                <h5 className="font-display font-bold text-slate-900 text-sm">
                  Nirmala
                </h5>
                <span className="font-mono text-[11px] text-[#B45309] font-bold block mb-1">
                  Gadis Kecil Penuh Teka-teki
                </span>
                <p className="font-handwriting text-base text-slate-700 italic leading-snug">
                  “Jangan lupakan janji kita sebelum senja tenggelam di kali Loka...”
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>BERKAS: RAHA-01</span>
                <span>★ MISTERI</span>
              </div>
            </div>

            {/* 2. Kucing Loka: Foto Siluet Kucing Belang + Label Sahabat Sejati Atma */}
            <div className="relative p-3.5 pb-6 bg-[#FAF7F2] rounded-xs shadow-[4px_4px_0_0_#050914] border border-[#E3DDD1] rotate-[1.5deg] hover:-rotate-1 hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-full">
              <div className="absolute -top-2.5 right-1/4 w-16 h-4 bg-[#7FE7D8]/80 border border-[#0D9488]/40 rotate-[2deg] shadow-xs pointer-events-none" />

              <div>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#161B33] rounded-2xs mb-3 border border-black/10">
                  <RetroImage
                    src={ASSETS.gameplayViewfinder[1].gif}
                    alt="Lulu si kucing belang di rongsokan TV"
                    fill
                    unoptimized={true}
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover object-center"
                  />
                </div>

                <h5 className="font-display font-bold text-slate-900 text-sm mt-3">
                  Lulu si Belang
                </h5>
                <span className="font-mono text-[11px] text-[#0D9488] font-bold block mb-1">
                  Sahabat Sejati Atma
                </span>
                <p className="font-handwriting text-base text-slate-700 italic leading-snug">
                  “Menghuni atap seng pos ronda & penikmat ikan pindang goreng Mbok Nah.”
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>FAVORIT: IKAN PINDANG</span>
                <span className="text-[#0D9488] font-bold">🐾 BISA DIELUS</span>
              </div>
            </div>

            {/* 3. Warga Loka: Kliping Bapak-bapak Pos Ronda & Ibu Warung */}
            <div className="relative p-3.5 pb-6 bg-[#FAF7F2] rounded-xs shadow-[4px_4px_0_0_#050914] border border-[#E3DDD1] rotate-[-0.8deg] hover:-rotate-1 hover:scale-105 transition-transform duration-300 flex flex-col justify-between h-full">
              <div className="absolute -top-2.5 left-1/4 w-16 h-4 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-1deg] shadow-xs pointer-events-none" />

              <div>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#161B33] rounded-2xs mb-3 border border-black/10">
                  <RetroImage
                    src={ASSETS.newsClippings.school}
                    alt="Warga dan suasana kota Loka 1999"
                    fill
                    unoptimized={true}
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover object-center"
                  />
                </div>

                <h5 className="font-display font-bold text-slate-900 text-sm mt-3">
                  Warga Kota Loka
                </h5>
                <span className="font-mono text-[11px] text-[#4F46E5] font-bold block mb-1">
                  Keluarga & Tetangga 90-an
                </span>
                <p className="font-handwriting text-base text-slate-700 italic leading-snug">
                  “Dari bapak-bapak pos siskamling hingga celoteh hangat di warung gorengan.”
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>KOMUNITAS: RT 03</span>
                <span className="text-[#4F46E5] font-bold">★ HANGAT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
