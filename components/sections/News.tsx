"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PixelIcon from "@/components/ui/PixelIcon";
import RetroImage from "@/components/ui/RetroImage";
import { TIMELINE_DATA, Milestone } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

export default function News() {
  const [selectedFilter, setSelectedFilter] = useState<string>("Semua");

  const categories = ["Semua", "Penghargaan", "Peluncuran", "Ekspansi"];

  const filteredData =
    selectedFilter === "Semua"
      ? TIMELINE_DATA
      : TIMELINE_DATA.filter((item) => {
          if (selectedFilter === "Penghargaan") {
            return (
              item.category === "Penghargaan" ||
              item.category === "Tokyo Game Show" ||
              item.category === "The Game Awards"
            );
          }
          return item.category === selectedFilter;
        });

  // Map newspaper clippings to corresponding milestone events
  const getMilestonePhoto = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return {
          src: ASSETS.newsClippings.school,
          alt: "Arsip foto sekolah dan kehidupan siswa Loka 1999",
          caption: "Kliping 01: Kehidupan Siswa SMA Loka 1999",
        };
      case 1:
        return {
          src: ASSETS.newsClippings.bridge,
          alt: "Pemandangan jembatan kali Loka di sore hari",
          caption: "Kliping 02: Suasana Jembatan Kali Loka",
        };
      case 2:
        return {
          src: ASSETS.hero.polaroidFloat,
          alt: "Foto bertiga Atma, Raya, dan Nirmala",
          caption: "Kliping 03: Trio Kenangan Manis Kota Loka",
        };
      default:
        return {
          src: ASSETS.cartridgeCovers.cassetteCover,
          alt: "Danau Loka dan dermaga kayu",
          caption: "Kliping 04: Dermaga Kayu Danau Loka",
        };
    }
  };

  return (
    <section
      id="news"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0e1424] text-text-main overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Newspaper Masthead / Header Koran Jadul */}
        <div className="newspaper-page p-6 sm:p-10 rounded-2xl border-2 border-[#D3C7A6] bg-[#F7F3E9] text-[#1E2022] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative mb-12">
          {/* Weather & Date Top Header Strip */}
          <div className="flex flex-wrap items-center justify-between border-b-2 border-black/80 pb-2 text-[11px] font-mono tracking-wider text-black/70 mb-4">
            <span>EDISI KHUSUS ARSIP KOTA LOKA • NO. 1999/VOL. IX</span>
            <span className="hidden sm:inline">CUACA: GERIMIS SENJA • KURS: Rp 2.400 / US$</span>
            <span className="font-bold text-black">HARGA ECERAN: Rp 500,-</span>
          </div>

          {/* Newspaper Giant Title Banner */}
          <div className="text-center py-4 border-b-4 border-black border-double">
            <div className="inline-flex items-center gap-2 text-xs font-display tracking-widest text-[#8B2616] uppercase font-bold mb-1">
              <span>★ BULETIN RESMI DAN CATATAN PERJALANAN ★</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-black uppercase">
              WARTA LOKA
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-black/70 mt-1 max-w-xl mx-auto">
              Menyuarakan cerita hangat dari gang-gang pedesaan Jawa Timur hingga melangkah ke panggung kehormatan industri game dunia.
            </p>
          </div>

          {/* Red Stamp of Authenticity */}
          <div className="absolute -top-3 -right-3 sm:top-6 sm:right-8 rotate-[-12deg] pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-sm border-2 border-dashed border-[#B91C1C] text-[#B91C1C] font-mono text-xs font-black tracking-widest uppercase bg-[#F7F3E9]/90 shadow-sm">
              ★ TERVERIFIKASI REDAKSI 1999 ★
            </div>
          </div>

          {/* Headline Story (Berita Utama) */}
          <div className="mt-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b-2 border-black/20 pb-8">
            <div className="lg:col-span-7">
              <div className="inline-block px-2.5 py-0.5 bg-black text-white text-[10px] font-display uppercase tracking-widest mb-3">
                BERITA UTAMA DUNIA
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-black leading-tight">
                Karya Sederhana dari Surabaya Memikat Hati Para Kritikus di The Game Awards Los Angeles
              </h3>
              <p className="font-serif text-sm sm:text-base text-black/80 mt-3 leading-relaxed">
                Dimulai dari eksperimen tulus tim kecil Mojiken Studio yang ingin mengabadikan kenangan masa sekolah 90-an di Indonesia, <em>A Space for the Unbound</em> berhasil membuktikan bahwa narasi lokal yang jujur dan menyentuh mampu menembus sekat bahasa dan budaya internasional.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs font-mono text-black/60">
                <span>REPORTER: SANGGAR SENI LOKA</span>
                <span>•</span>
                <span className="font-bold text-[#8B2616]">STATUS: PRESTASI BERSEJARAH</span>
              </div>
            </div>

            {/* Headline Photo Clipping with Diegetic Halftone Filter */}
            <div className="lg:col-span-5 relative">
              <div className="p-3 bg-white border border-black/30 shadow-md rotate-[1deg]">
                {/* Fixed aspect ratio with warm cream skeleton background for zero CLS */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161B33] border border-black/10">
                  <RetroImage
                    src={ASSETS.hero.banner}
                    alt="Arsip Utama Redaksi Warta Loka 1999: Atma dan Raya berlari menatap langit"
                    fill
                    unoptimized={true}
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    priority
                  />
                </div>
                <p className="font-mono text-[10px] text-black/60 mt-2 text-center">
                  Dok. Arsip Redaksi: Ilustrasi lari menembus senja Loka 1999 (Arahkan kursor untuk melihat warna asli cetakan).
                </p>
              </div>
              <div className="washi-tape -top-2 left-1/4" />
            </div>
          </div>

          {/* Filter Tabs Styled as Newspaper Section Headings */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-black uppercase">Kliping Rubrik:</span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      selectedFilter === cat
                        ? "bg-black text-white font-bold shadow-sm"
                        : "bg-black/5 hover:bg-black/10 text-black/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs font-mono text-black/50 hidden md:inline">
              MENAMPILKAN {filteredData.length} DOKUMEN ARSIP
            </span>
          </div>
        </div>

        {/* Newspaper Clippings Grid with Halftone Photo Insets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredData.map((item: Milestone, index: number) => {
            const tiltAngles = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[-0.5deg]", "rotate-[0.5deg]"];
            const tilt = tiltAngles[index % tiltAngles.length];
            const photo = getMilestonePhoto(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`transition-transform duration-300 hover:scale-[1.01] ${tilt}`}
              >
                <div className="newspaper-page p-6 rounded-xl border border-[#D3C7A6] bg-[#F7F3E9] text-[#1E2022] shadow-lg relative h-full flex flex-col justify-between">
                  {/* Washi Tape Accent */}
                  <div className="washi-tape -top-2 left-1/3" />

                  <div>
                    {/* Clipping Header */}
                    <div className="flex items-center justify-between border-b border-black/20 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <PixelIcon
                          name={item.category === "Penghargaan" ? "trophy" : "newspaper"}
                          size="sm"
                          color="primary"
                          bordered={false}
                          className="w-4 h-4 text-black"
                        />
                        <span className="font-mono text-xs font-bold text-[#8B2616] tracking-wider uppercase">
                          {item.category}
                        </span>
                      </div>

                      <div className="px-2 py-0.5 rounded bg-black/5 border border-black/20 font-mono text-xs font-bold text-black">
                        TH. {item.year}
                      </div>
                    </div>

                    {/* Date Tag */}
                    {item.date && (
                      <div className="font-mono text-[11px] text-black/60 mb-2">
                        KABAR DITERIMA: {item.date}
                      </div>
                    )}

                    {/* Article Headline */}
                    <h4 className="text-lg sm:text-xl font-serif font-bold text-black leading-snug mb-3">
                      {item.title}
                    </h4>

                    {/* Inset Newspaper Halftone Photo (Zero CLS with aspect-[16/9]) */}
                    <div className="my-3 p-2 bg-white border border-black/20 shadow-xs">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161B33]">
                        <RetroImage
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          unoptimized={true}
                          sizes="(max-width: 768px) 100vw, 450px"
                          className="object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-black/60 block mt-1 text-center">
                        {photo.caption}
                      </span>
                    </div>

                    {/* Article Body Snippet */}
                    <p className="font-serif text-xs sm:text-sm text-black/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Stamp & Footer of Clipping */}
                  <div className="mt-6 pt-3 border-t border-black/15 flex items-center justify-between text-[11px] font-mono text-black/60">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#8B2616] rounded-full" />
                      {item.badge || "ARSIP DOKUMENTASI"}
                    </span>
                    <span className="italic font-serif">Koran Loka Hal. 0{index + 2}</span>
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
