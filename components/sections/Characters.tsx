"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import PixelIcon from "@/components/ui/PixelIcon";
import { CHARACTERS_DATA, Character } from "@/lib/constants";
import { GAME_ASSETS } from "@/lib/assets";

interface CharacterStats {
  empati: number;
  imajinasi: number;
  keberanian: number;
  secretMemory: string;
}

const STATS_MAP: Record<string, CharacterStats> = {
  atma: {
    empati: 95,
    imajinasi: 92,
    keberanian: 85,
    secretMemory:
      "Ingatan Bawah Sadar: Atma menyimpan ketakutan mendalam bahwa cerita yang ia tulis bersama Raya akan berakhir sebelum mereka sempat menyelesaikannya.",
  },
  raya: {
    empati: 88,
    imajinasi: 99,
    keberanian: 90,
    secretMemory:
      "Ingatan Bawah Sadar: Kekuatan Spacedive Raya berakar dari kepedihan masa kecil dan keinginannya untuk melindungi Atma dari kenyataan yang menyakitkan.",
  },
};

interface PoseOption {
  key: string;
  label: string;
  src: string;
  alt: string;
  isGif?: boolean;
}

const CHARACTER_POSES: Record<string, PoseOption[]> = {
  atma: [
    {
      key: "bubblegum",
      label: "Santai",
      src: GAME_ASSETS.characters.atma.default,
      alt: "Atma sedang bersantai meniup gelembung permen karet di halte depan sekolah",
    },
    {
      key: "smiling",
      label: "Senyum",
      src: GAME_ASSETS.characters.atma.smiling,
      alt: "Atma tersenyum ramah menatap masa depan di kelas",
    },
    {
      key: "action",
      label: "Terjatuh",
      src: GAME_ASSETS.characters.atma.action,
      alt: "Atma terjatuh di dalam ruang memori retakan dimensi mimpi",
    },
  ],
  raya: [
    {
      key: "chill",
      label: "Santai",
      src: GAME_ASSETS.characters.raya.default,
      alt: "Raya bersantai di pinggir rel kereta menatap langit senja",
    },
    {
      key: "power",
      label: "Spacedive",
      src: GAME_ASSETS.characters.raya.power,
      alt: "Raya mengaktifkan kekuatan magis Spacedive berpendar toska dan ungu",
    },
    {
      key: "bridge",
      label: "Jembatan",
      src: GAME_ASSETS.characters.raya.bridgeGif,
      alt: "Raya menatap angin sepoi-sepoi di atas jembatan kali Loka (animasi)",
      isGif: true,
    },
  ],
};

const NIRMALA_POSES: PoseOption[] = [
  {
    key: "dusk",
    label: "Senja",
    src: GAME_ASSETS.characters.nirmala.dusk,
    alt: "Nirmala berdiri di bawah langit senja keemasan kota Loka",
  },
  {
    key: "bridge",
    label: "Jembatan",
    src: GAME_ASSETS.characters.nirmala.bridge,
    alt: "Nirmala berlari di jembatan kayu kali Loka",
  },
  {
    key: "laugh",
    label: "Tawa",
    src: GAME_ASSETS.characters.nirmala.laughGif,
    alt: "Nirmala tertawa riang (animasi)",
    isGif: true,
  },
];

export default function Characters() {
  const [activePose, setActivePose] = useState<Record<string, string>>({
    atma: "bubblegum",
    raya: "chill",
    nirmala: "dusk",
  });
  const [diveActive, setDiveActive] = useState<Record<string, boolean>>({});

  const setPose = (charId: string, poseKey: string) => {
    setActivePose((prev) => ({ ...prev, [charId]: poseKey }));
  };

  const toggleDive = (id: string) => {
    setDiveActive((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentNirmalaPose =
    NIRMALA_POSES.find((p) => p.key === activePose.nirmala) || NIRMALA_POSES[0];

  return (
    <section
      id="characters"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Dossier & Arsip Siswa"
          title="Dua Jiwa di Balik Loka 1999"
          subtitle="Arsip rahasia siswa SMA Loka: telusuri kepribadian, statistik batin, dan selami ingatan bawah sadar Atma serta Raya melalui kekuatan Spacedive."
        />

        {/* 2 Main Character Dossier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {CHARACTERS_DATA.map((char: Character, index: number) => {
            const poses = CHARACTER_POSES[char.id] || [];
            const activeKey = activePose[char.id] || poses[0]?.key;
            const currentPose = poses.find((p) => p.key === activeKey) || poses[0];
            const isDiving = Boolean(diveActive[char.id]);
            const stats =
              STATS_MAP[char.id] || {
                empati: 80,
                imajinasi: 80,
                keberanian: 80,
                secretMemory: "",
              };

            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative"
              >
                {/* Vintage Paperclip Ornament */}
                <div className="absolute -top-3 left-8 z-30 flex items-center gap-1.5 text-slate-400">
                  <PixelIcon
                    name="paperclip"
                    size={22}
                    className="text-brand-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <Card
                  variant={isDiving ? "dive" : "default"}
                  className={`group relative flex flex-col md:flex-row overflow-hidden transition-all duration-500 border-2 ${
                    isDiving
                      ? "border-dive-accent shadow-[0_0_40px_rgba(0,229,199,0.4)]"
                      : "border-brand-secondary/40 hover:border-brand-accent shadow-xl"
                  }`}
                >
                  {/* Stamp Cap Sekolah Retro di Pojok */}
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded border-2 border-dashed border-brand-primary/40 bg-brand-primary/10 text-brand-primary font-display text-[10px] tracking-widest uppercase rotate-3 pointer-events-none">
                    SMA LOKA 1999
                  </div>

                  {/* Character Photo Section: Diegetic Polaroid Framing */}
                  <div className="md:w-5/12 p-4 sm:p-5 flex flex-col justify-between shrink-0 bg-black/40 border-b md:border-b-0 md:border-r border-white/10">
                    {/* The Polaroid Kertas Container */}
                    <div className="relative p-2.5 pb-6 sm:pb-7 bg-[#FAF7EE] text-[#1E2022] rounded-sm shadow-[4px_4px_0_0_#0B1026] border border-[#E0D8C8] transition-all duration-300">
                      {/* Selotip Semi-Transparan di Sudut Atas */}
                      <div className="absolute -top-2.5 left-5 z-20 w-14 h-4 bg-[#FDE68A]/80 border border-[#D97706]/40 rotate-[-5deg] shadow-sm pointer-events-none backdrop-blur-[1px]" />

                      {/* Photo Container with fixed 3:4 aspect ratio (CLS: 0) */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#F2E6D8] border border-black/10">
                        <Image
                          src={currentPose.src}
                          alt={currentPose.alt}
                          fill
                          unoptimized={Boolean(currentPose.isGif)}
                          sizes="(max-width: 768px) 100vw, 340px"
                          className={`object-cover transition-all duration-500 ${
                            isDiving
                              ? "scale-105 saturate-150 hue-rotate-15"
                              : "group-hover:scale-105"
                          }`}
                          priority={index === 0}
                        />

                        {/* Spacedive Psychic Ripple Overlay */}
                        {isDiving && (
                          <div className="absolute inset-0 bg-gradient-to-t from-dive-bg/90 via-dive-accent/20 to-transparent pointer-events-none animate-pulse" />
                        )}
                      </div>

                      {/* Polaroid Bottom Caption */}
                      <div className="mt-2.5 pt-1 border-t border-black/10 flex items-center justify-between text-[11px] font-mono">
                        <span className="font-handwriting text-base sm:text-lg font-bold text-slate-900 leading-none">
                          {char.name} • {currentPose.label}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                          1999
                        </span>
                      </div>
                    </div>

                    {/* Pose Switcher Tabs Bar */}
                    <div className="mt-3 p-1.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-text-muted px-1 uppercase flex items-center gap-1">
                        <PixelIcon name="refresh" size={12} color="accent" />
                        Pose:
                      </span>
                      <div className="flex items-center gap-1">
                        {poses.map((p) => (
                          <button
                            key={p.key}
                            onClick={() => setPose(char.id, p.key)}
                            className={`px-2 py-0.5 rounded text-[10px] font-display uppercase tracking-wider transition-all ${
                              activeKey === p.key
                                ? "bg-brand-primary text-bg-primary font-bold shadow-[2px_2px_0_0_#000]"
                                : "bg-white/5 hover:bg-white/15 text-text-muted hover:text-white"
                            }`}
                            title={p.alt}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Character Dossier Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between md:w-7/12">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <PixelIcon
                          name={char.id === "atma" ? "book" : "sparkles"}
                          size="sm"
                          color={char.id === "atma" ? "primary" : "accent"}
                        />
                        <span className="text-[11px] font-display uppercase tracking-widest text-brand-accent">
                          {char.role}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-text-main tracking-wide">
                        {char.name}
                      </h3>

                      <p className="text-xs font-handwriting text-brand-primary text-base sm:text-lg mt-0.5 mb-3">
                        “{char.tagline}”
                      </p>

                      <p className="text-xs text-text-muted leading-relaxed font-sans mb-4">
                        {char.description}
                      </p>

                      {/* RPG Character Stats Bars */}
                      <div className="space-y-2 mb-4 p-3 rounded-lg bg-black/30 border border-white/10 text-[11px] font-mono">
                        <div>
                          <div className="flex justify-between text-text-muted mb-0.5">
                            <span>Empati Hati:</span>
                            <span className="text-brand-accent font-bold">{stats.empati}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-none overflow-hidden">
                            <div
                              className="h-full bg-brand-accent"
                              style={{ width: `${stats.empati}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-text-muted mb-0.5">
                            <span>Imajinasi Magis:</span>
                            <span className="text-dive-accent font-bold">{stats.imajinasi}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-none overflow-hidden">
                            <div
                              className="h-full bg-dive-accent"
                              style={{ width: `${stats.imajinasi}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-text-muted mb-0.5">
                            <span>Keberanian:</span>
                            <span className="text-brand-primary font-bold">{stats.keberanian}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-none overflow-hidden">
                            <div
                              className="h-full bg-brand-primary"
                              style={{ width: `${stats.keberanian}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Secret Spacedive Memory Box */}
                      <AnimatePresence>
                        {isDiving && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 mb-4 rounded-lg bg-dive-bg border border-dive-accent text-dive-text text-xs font-sans leading-relaxed"
                          >
                            <span className="font-display text-[10px] text-dive-accent uppercase tracking-widest block mb-1">
                              🌀 Alam Bawah Sadar Terbuka:
                            </span>
                            <p>{stats.secretMemory}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom Actions: Dive Button & Quote */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => toggleDive(char.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-md ${
                          isDiving
                            ? "bg-dive-accent text-bg-primary font-bold shadow-[0_0_15px_rgba(0,229,199,0.5)]"
                            : "bg-white/5 border border-brand-accent/40 text-brand-accent hover:bg-brand-accent hover:text-bg-primary"
                        }`}
                      >
                        <PixelIcon name="eye" size={14} />
                        <span>{isDiving ? "Tutup Dive" : "Spacedive"}</span>
                      </button>

                      <p className="text-[11px] italic font-serif text-text-muted line-clamp-1">
                        {char.quote}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting Characters & Friends Grid with Diegetic Framing */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <PixelIcon name="cat" size="sm" color="accent" />
              <h4 className="font-display text-sm sm:text-base uppercase tracking-widest text-text-main font-bold">
                Warga & Sahabat Kota Loka
              </h4>
            </div>
            <span className="text-xs text-text-muted font-mono hidden sm:inline">
              Arsip Karakter Pendukung #03
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* 1. Nirmala with Interactive Pose Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 rounded-xl bg-bg-secondary/70 border border-brand-secondary/30 hover:border-brand-accent/60 transition-all flex flex-col justify-between group shadow-md h-full">
                <div className="flex items-start gap-3.5">
                  {/* Polaroid Micro Frame */}
                  <div className="p-1 pb-3 bg-[#FAF7EE] rounded-sm shadow-[2px_2px_0_0_#0B1026] border border-[#E0D8C8] shrink-0">
                    <div className="relative w-16 h-20 rounded-sm overflow-hidden bg-[#F2E6D8]">
                      <Image
                        src={currentNirmalaPose.src}
                        alt={currentNirmalaPose.alt}
                        fill
                        unoptimized={Boolean(currentNirmalaPose.isGif)}
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h5 className="font-display text-xs sm:text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors">
                      Nirmala
                    </h5>
                    <span className="text-[11px] text-brand-primary block mb-1 font-mono">
                      Gadis Kecil Penuh Teka-teki
                    </span>
                    <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed font-sans">
                      Sosok misterius yang kerap muncul dalam visi Atma dengan senyuman dan teka-teki yang mengharukan.
                    </p>
                  </div>
                </div>

                {/* Nirmala Pose Tab Switcher */}
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-text-muted">Pose:</span>
                  <div className="flex items-center gap-1">
                    {NIRMALA_POSES.map((pose) => (
                      <button
                        key={pose.key}
                        onClick={() => setPose("nirmala", pose.key)}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          activePose.nirmala === pose.key
                            ? "bg-brand-primary text-black font-bold"
                            : "bg-white/5 hover:bg-white/15 text-text-muted hover:text-white"
                        }`}
                      >
                        {pose.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Lulu & Kucing-kucing Loka */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="p-4 rounded-xl bg-bg-secondary/70 border border-brand-secondary/30 hover:border-brand-accent/60 transition-all flex flex-col justify-between group shadow-md h-full">
                <div className="flex items-start gap-3.5">
                  <div className="p-1 pb-3 bg-[#FAF7EE] rounded-sm shadow-[2px_2px_0_0_#0B1026] border border-[#E0D8C8] shrink-0">
                    <div className="relative w-16 h-20 rounded-sm overflow-hidden bg-[#F2E6D8]">
                      <Image
                        src={GAME_ASSETS.gameplayViewfinder[1].gif}
                        alt="Lulu kucing belang kota Loka"
                        fill
                        unoptimized
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-display text-xs sm:text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors">
                      Kucing-kucing Loka
                    </h5>
                    <span className="text-[11px] text-brand-primary block mb-1 font-mono">
                      Sahabat Sejati Atma
                    </span>
                    <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed font-sans">
                      Bisa diajak berinteraksi, diberi makan, dielus, hingga diberi nama unik sepanjang petualangan.
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-text-muted">
                  <span>STATUS: RAMAH</span>
                  <span className="text-brand-accent">★ DAPAT DIELUS</span>
                </div>
              </div>
            </motion.div>

            {/* 3. Warga Kota Loka */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-4 rounded-xl bg-bg-secondary/70 border border-brand-secondary/30 hover:border-brand-accent/60 transition-all flex flex-col justify-between group shadow-md h-full">
                <div className="flex items-start gap-3.5">
                  <div className="p-1 pb-3 bg-[#FAF7EE] rounded-sm shadow-[2px_2px_0_0_#0B1026] border border-[#E0D8C8] shrink-0">
                    <div className="relative w-16 h-20 rounded-sm overflow-hidden bg-[#F2E6D8]">
                      <Image
                        src={GAME_ASSETS.newsClippings.school}
                        alt="Kehidupan sekolah dan warga Loka 1999"
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-display text-xs sm:text-sm font-bold text-text-main group-hover:text-brand-accent transition-colors">
                      Warga Kota Loka
                    </h5>
                    <span className="text-[11px] text-brand-primary block mb-1 font-mono">
                      Keluarga & Tetangga 90-an
                    </span>
                    <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed font-sans">
                      Mulai dari pedagang warung, guru sekolah, hingga tetangga dengan berbagai pergulatan batin manusiawi.
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-text-muted">
                  <span>KOMUNITAS: 1999</span>
                  <span className="text-brand-primary">LOKA TIMUR</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
