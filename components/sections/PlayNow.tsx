"use client";

import React, { useState } from "react";
import RetroImage from "@/components/ui/RetroImage";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import PixelIcon from "@/components/ui/PixelIcon";
import { STORE_PLATFORMS, StorePlatform } from "@/lib/constants";
import { GAME_ASSETS } from "@/lib/assets";

export default function PlayNow() {
  const [activeTape, setActiveTape] = useState<string | null>(null);

  const getPlatformIcon = (icon: string) => {
    switch (icon) {
      case "steam":
        return <PixelIcon name="steam" size={24} color="accent" />;
      case "playstation":
        return <PixelIcon name="playstation" size={24} color="secondary" />;
      case "nintendo":
        return <PixelIcon name="nintendo" size={24} color="red" />;
      case "xbox":
        return <PixelIcon name="xbox" size={24} color="accent" />;
      case "apple":
        return <PixelIcon name="apple" size={24} color="white" />;
      default:
        return <PixelIcon name="disc" size={24} color="primary" />;
    }
  };

  const getCassetteNotes = (icon: string) => {
    switch (icon) {
      case "steam":
        return "SIDE A: Petualangan Menatap Langit (Windows / Mac)";
      case "playstation":
        return "SIDE B: Melodi Hati di PS4 & PS5 (Surround Audio)";
      case "nintendo":
        return "PORTABLE: Nikmati di Perjalanan (OLED Edition)";
      case "xbox":
        return "SERIES: Petualangan Loka 4K & Cloud Play";
      case "apple":
        return "GENGGAM: Sentuhan Layar Sentuh di iPhone & iPad";
      default:
        return "EDISI RESMI MOJIKEN & TOGE 1999";
    }
  };

  return (
    <section
      id="play"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0f1d] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Storefront Header Styled as 90s Music & Game Shop */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-display uppercase tracking-widest mb-4">
            <PixelIcon name="cassette" size="sm" color="primary" bordered={false} className="w-3.5 h-3.5" />
            <span>TOKO KASET & GAME "RIA NADA" LOKA 1999</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Bawa Pulang Kaset Kenangan Ini
          </h2>

          <p className="mt-3 text-sm sm:text-base text-text-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Pilih cartridge atau kaset pita platform favorit Anda. Setiap salinan digital membawa pengalaman penuh karya orisinal Mojiken Studio tanpa pemotongan.
          </p>
        </div>

        {/* Collector's Cassette J-Card Box Slip Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 p-4 sm:p-6 rounded-2xl bg-[#0e1526] border-2 border-brand-primary/40 shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="relative w-48 sm:w-56 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border border-white/20 bg-[#F2E6D8] shadow-md">
            <RetroImage
              src={GAME_ASSETS.cartridgeCovers.cassetteCover}
              alt="Sampul Kaset Resmi Edisi Spesial A Space for the Unbound"
              fill
              sizes="224px"
              className="object-cover"
              fallbackText="SAMPUL KASET RUSAK"
              fallbackSubtext="EDISI KOLEKTOR // 1999"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-brand-primary uppercase">
              J-CARD 1999
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-accent uppercase mb-1">
              <PixelIcon name="cassette" size={12} color="accent" />
              <span>SAMPUL KASET PITA EDISI KOLEKTOR</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              "Sore di Tepi Danau Bersama Raya"
            </h3>
            <p className="text-xs text-text-muted mt-1 leading-relaxed font-sans">
              Ilustrasi sampul resmi pita kaset orisinal. Menampilkan momen damai Atma dan Raya menikmati semilir angin di dermaga kayu Loka sebelum badai kosmik bermula.
            </p>
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-3 text-[11px] font-mono text-brand-primary">
              <span>★ EDISI TERBATAS 1999</span>
              <span>•</span>
              <span className="text-white/60">KATALOG: LK-OST-99</span>
            </div>
          </div>
        </motion.div>

        {/* Physical Cassette Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORE_PLATFORMS.map((platform: StorePlatform, i: number) => {
            const isHovered = activeTape === platform.name;

            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setActiveTape(platform.name)}
                onMouseLeave={() => setActiveTape(null)}
                className="group relative"
              >
                {/* Physical Cassette Tape Body */}
                <div
                  className={`p-5 rounded-2xl border-2 transition-all duration-300 relative bg-[#14192b] shadow-2xl flex flex-col justify-between h-full ${
                    platform.highlight
                      ? "border-brand-primary shadow-[0_0_35px_rgba(244,201,93,0.25)]"
                      : "border-white/15 hover:border-brand-accent/60"
                  }`}
                >
                  {/* Cassette Screw Accents in 4 Corners */}
                  <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[7px] text-white/40">
                    +
                  </div>
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[7px] text-white/40">
                    +
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[7px] text-white/40">
                    +
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[7px] text-white/40">
                    +
                  </div>

                  <div>
                    {/* Cassette Label Header */}
                    <div className="flex items-center justify-between gap-3 mb-4 bg-black/40 p-2.5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-white/10">
                          {getPlatformIcon(platform.icon)}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-white text-base leading-none">
                            {platform.name}
                          </h3>
                          <span className="text-[10px] font-mono text-text-muted mt-1 block">
                            {platform.category}
                          </span>
                        </div>
                      </div>

                      {/* Holographic Authentic Seal */}
                      <div className="holo-foil px-2 py-1 rounded text-[9px] font-mono font-bold text-black uppercase tracking-wider shadow-sm">
                        ★ ASLI 1999 ★
                      </div>
                    </div>

                    {/* Cassette Tape Spool Window (Realistic Magnetic Ribbon) */}
                    <div className="my-4 p-3 rounded-xl bg-black/80 border border-white/20 relative overflow-hidden flex items-center justify-around">
                      {/* Left Spool */}
                      <div
                        className={`w-9 h-9 rounded-full bg-[#E5E7EB] border-2 border-[#9CA3AF] flex items-center justify-center transition-transform duration-700 ${
                          isHovered ? "rotate-180" : ""
                        }`}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-[#1F2937] border border-black flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Brown Magnetic Ribbon Bridge */}
                      <div className="flex-1 mx-2 h-5 bg-[#3B2219] border-y border-[#5C3A21] rounded-sm flex items-center justify-center">
                        <span className="text-[9px] font-mono text-amber-200/50 tracking-widest uppercase">
                          • TYPE I NORMAL •
                        </span>
                      </div>

                      {/* Right Spool */}
                      <div
                        className={`w-9 h-9 rounded-full bg-[#E5E7EB] border-2 border-[#9CA3AF] flex items-center justify-center transition-transform duration-700 ${
                          isHovered ? "-rotate-180" : ""
                        }`}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-[#1F2937] border border-black flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>

                    {/* Handwritten Spine Label */}
                    <div className="p-3 rounded-lg bg-[#FAF7F0] text-black border border-black/20 my-3 shadow-inner">
                      <div className="text-[10px] font-mono text-black/50 uppercase tracking-wider flex justify-between items-center">
                        <span>PITA REKAMAN LOKA</span>
                        <span>STEREO EQ 120µs</span>
                      </div>
                      <p className="font-hand text-lg text-black font-bold mt-0.5 leading-snug">
                        {getCassetteNotes(platform.icon)}
                      </p>
                    </div>

                    {/* Barcode Sticker */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mt-2 px-1">
                      <span>||||||| | |||| || ||||||</span>
                      <span>KATALOK: LK-{platform.name.substring(0, 3).toUpperCase()}-99</span>
                    </div>
                  </div>

                  {/* Buy / Open Store Action Button */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <button
                        className={`w-full py-2.5 px-4 rounded-xl font-display text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          platform.highlight
                            ? "bg-brand-primary text-black hover:bg-brand-primary/90 shadow-[0_0_20px_rgba(244,201,93,0.4)]"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        }`}
                      >
                        <span>Beli di Toko Resmi</span>
                        <PixelIcon name="external" size={14} />
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Specs & Support Box Styled as Vintage Warranty Certificate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-[#0d1424] border-2 border-brand-secondary/40 shadow-2xl max-w-4xl mx-auto relative"
        >
          {/* Top Pin / Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <PixelIcon name="trophy" size="md" color="primary" />
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  Kartu Panduan Teknis & Jaminan Orisinalitas
                </h4>
                <p className="text-xs text-text-muted font-sans mt-0.5">
                  Dokumen spesifikasi resmi permainan A Space for the Unbound (Edisi 1999).
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded bg-brand-primary/10 border border-brand-primary/30 text-xs font-mono text-brand-primary self-start sm:self-center">
              NO. SERI: MJ-TG-1999-ID
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left mt-6">
            <div>
              <span className="text-[11px] font-display uppercase tracking-widest text-text-muted block mb-1">
                Pengembang Asli
              </span>
              <p className="text-sm font-bold text-white font-sans">Mojiken Studio</p>
              <span className="text-xs text-brand-accent font-sans">Surabaya, Jawa Timur</span>
            </div>

            <div>
              <span className="text-[11px] font-display uppercase tracking-widest text-text-muted block mb-1">
                Penerbit Global
              </span>
              <p className="text-sm font-bold text-white font-sans">Toge Productions</p>
              <span className="text-xs text-text-muted font-sans">& Chorus Worldwide</span>
            </div>

            <div>
              <span className="text-[11px] font-display uppercase tracking-widest text-text-muted block mb-1">
                Mesin & Kontrol
              </span>
              <p className="text-sm font-bold text-white font-sans">Unity Engine</p>
              <span className="text-xs text-brand-accent font-sans">Mendukung Penuh Gamepad</span>
            </div>

            <div>
              <span className="text-[11px] font-display uppercase tracking-widest text-text-muted block mb-1">
                Bahasa Didukung
              </span>
              <p className="text-sm font-bold text-white font-sans">Bahasa Indonesia</p>
              <span className="text-xs text-text-muted font-sans">+ 10 Terjemahan Dunia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

