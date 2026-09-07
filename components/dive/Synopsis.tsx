"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLayer } from "@/components/layer/useLayer";
import { Sparkles, ChevronRight, MapPin, Volume2, Cat, Feather, Compass } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * PROLOGUE / SINOPSIS — Jurnal Catatan Kota Loka
 *
 * Desain otentik bergaya Jurnal Catatan / Buku Harian Merah:
 * - Bahasa narasi membumi & puitis khas Mojiken Studio
 * - Format lembar jurnal polaroid & robekan kertas catatan
 * - Klip visual in-game (pixel art retro 90-an)
 * - Tiga penggalan memori kunci:
 *   1. "Loka, 1990-an": Masa SMA, radio kaset, & desas-desus kota
 *   2. "Buku Catatan Bertinta Merah": Kekuatan Spacedive & menyelami batin
 *   3. "Celah di Langit Senja": Saat mimpi buruk mulai membelah kenyataan
 * ═══════════════════════════════════════════════════ */

interface JournalEntry {
  id: string;
  chapterNumber: string;
  chapterTitle: string;
  dateStamp: string;
  location: string;
  quote: string;
  paragraphs: string[];
  polaroidCaption: string;
  mediaSrc: string;
  mediaType: "image" | "gif" | "video";
  doodleNote: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "memori-1",
    chapterNumber: "BAGIAN I",
    chapterTitle: "Sepeda Onthel, Radio Tua, & Kota Loka",
    dateStamp: "Masa SMA, Akhir 90-an",
    location: "Kota Loka, Jawa Timur",
    quote: "Jika kau mendengarkan baik-baik saat senja tiba, kau bisa mendengar suara kota ini berbisik.",
    paragraphs: [
      "Di penghujung tahun 90-an, waktu di kota Loka berjalan jauh lebih lambat dari dunia luar. Suara lonceng sepeda beradu dengan deru knalpot angkot tua di persimpangan jalan, dan aroma gorengan hangat menyeruak dari warung pinggir rel kereta.",
      "Atma dan Raya hanyalah dua murid SMA biasa yang kerap membolos ke bioskop tua, memberi makan kucing-kucing liar di gang sempit, dan mengisi hari dengan impian-impian sederhana yang belum terwujud sebelum kelulusan tiba.",
      "Namun kedamaian itu perlahan retak. Satu demi satu keanehan ganjil mulai merembes ke jalanan kota—bayangan yang tak semestinya, langit yang seringkali berubah warna tiba-tiba, dan bisikan rasa cemas yang tak kasat mata.",
    ],
    polaroidCaption: "Atma & Raya di bangku bioskop tua kota Loka",
    mediaSrc: "/assets/GIF/atma n raya bioskop.webp",
    mediaType: "image",
    doodleNote: "Catatan: Jangan lupa bawa camilan buat kucing belang di dekat rel!",
  },
  {
    id: "memori-2",
    chapterNumber: "BAGIAN II",
    chapterTitle: "Buku Tulis Merah Bertinta Sihir",
    dateStamp: "Pertemuan di Hutan Jati",
    location: "Alam Bawah Sadar (Spacedive)",
    quote: "Terkadang pintu paling kokoh di dunia ini bukanlah pintu kayu, melainkan hati seseorang yang menolak bicara.",
    paragraphs: [
      "Semuanya berubah saat Atma menemukan sebuah buku catatan bertinta merah tua. Buku ini bukan buku tulis sekolah biasa—buku ini memiliki detak denyut ganjil yang merespons emosi di sekitarnya.",
      "Dengan membuka halaman buku itu di hadapan seseorang yang hatinya dirundung kepedihan, Atma mampu melakukan 'Spacedive'—menembus alam bawah sadar, menyusuri lorong memori yang terkunci, dan menghadapi manifestasi ketakutan yang menolak sembuh.",
      "Membantu warga kota menyelesaikan simpul batin mereka menjadi rutinitas rahasianya. Namun, setiap kali menyelam terlalu dalam, Atma menyadari satu hal: orang yang paling terluka justru sedang berdiri di sampingnya.",
    ],
    polaroidCaption: "Membuka gerbang pikiran dengan Buku Merah",
    mediaSrc: "/assets/step-2.jpg",
    mediaType: "image",
    doodleNote: "Kekuatan ini nyata... tapi kenapa kepala selalu pusing setelahnya?",
  },
  {
    id: "memori-3",
    chapterNumber: "BAGIAN III",
    chapterTitle: "Retakan Langit & Cerita yang Belum Tamat",
    dateStamp: "Menjelang Akhir Waktu",
    location: "Jembatan Celah Dimensi",
    quote: "Bahkan jika seluruh dunia ini runtuh menjadi debu, aku berjanji akan tetap mencari jalan pulang ke sisimu.",
    paragraphs: [
      "Kekuatan misterius dalam diri Raya berkembang tak terkendali. Ruang dan waktu di sekeliling kota Loka mulai koyak, melahirkan komet raksasa yang retak melintasi langit senja.",
      "Ini bukan sekadar bencana alam. Ini adalah jeritan batin dari masa lalu yang dipaksa bungkam, dongeng masa kecil yang tak sempat diselesaikan, dan rasa takut akan perpisahan yang tak terhindarkan.",
      "Di antara keruntuhan realitas dan kenyataan yang kian memudar, Atma harus memutuskan: apakah ia harus menyelamatkan dunia yang dingin ini, atau merelakan segalanya demi seseorang yang ia cintai?",
    ],
    polaroidCaption: "Raya di atas jembatan penghubung realitas",
    mediaSrc: "/assets/GIF/raya jembatan.gif",
    mediaType: "gif",
    doodleNote: "Janji kita di buku gambar masa kecil belum kita selesaikan...",
  },
];

export function Synopsis() {
  const { timeOfDay } = useLayer();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(0);

  const entry = JOURNAL_ENTRIES[activeTab];

  return (
    <section
      ref={sectionRef}
      id="prologue"
      className="relative min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-10 overflow-hidden transition-colors duration-700 flex flex-col items-center justify-center"
      style={{
        background:
          timeOfDay === "siang"
            ? "linear-gradient(180deg, #1E3A8A 0%, #1D4ED8 35%, #2563EB 70%, #1E3A8A 100%)"
            : timeOfDay === "sore"
            ? "linear-gradient(180deg, #2E1065 0%, #3B0764 35%, #581C87 70%, #431407 100%)"
            : "linear-gradient(180deg, #020617 0%, #0B1120 40%, #030712 100%)",
      }}
    >
      {/* ── AMBIENT ENVIRONMENT ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Vignette & texture feel */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--dive-accent) 25%, transparent) 0%, transparent 70%)`,
          }}
        />

        {/* Diagonal notebook lines subtle backdrop */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, var(--dive-accent) 0px, var(--dive-accent) 1px, transparent 1px, transparent 28px)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* ── TOP SECTION HEADER ── */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-dive-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{
              color: "var(--dive-accent)",
              textShadow: "0 0 40px color-mix(in srgb, var(--dive-accent) 35%, transparent)",
            }}
          >
            Prolog: Cerita di Balik Tirai Bawah Sadar
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-dive-body text-sm md:text-base text-dive-text-muted leading-relaxed">
            Catatan harian tentang dua anak SMA, buku tulis misterius bertinta merah,
            dan bisikan luka batin di sebuah kota kecil era 1990-an.
          </p>
        </motion.div>

        {/* ── JOURNAL SCRAPBOOK CONTAINER (FIXED HEIGHT) ── */}
        <div
          className="relative rounded-3xl border backdrop-blur-2xl shadow-2xl p-6 sm:p-8 md:p-12 overflow-hidden min-h-[580px] lg:min-h-[520px] flex flex-col justify-between"
          style={{
            backgroundColor: "rgba(11, 17, 40, 0.88)",
            borderColor: "color-mix(in srgb, var(--dive-accent) 35%, rgba(255,255,255,0.15))",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 35px color-mix(in srgb, var(--dive-accent) 15%, transparent)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`journal-page-${entry.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full justify-between"
            >
            {/* Header cap with stamp & location */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="font-dive-heading text-xs tracking-widest uppercase font-bold px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--dive-accent)",
                    borderColor: "color-mix(in srgb, var(--dive-accent) 40%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--dive-accent) 12%, transparent)",
                  }}
                >
                  {entry.chapterNumber}
                </span>
                <span className="font-dive-body text-xs text-dive-text-muted flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-amber-400" /> {entry.location}
                </span>
              </div>

              <span className="font-mono text-xs text-white/50 tracking-wider">
                {entry.dateStamp}
              </span>
            </div>

            {/* Content Layout: Left Text / Right Polaroid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (7 cols): In-depth Diary Story */}
              <div className="lg:col-span-7 flex flex-col space-y-4 text-left">
                <h3
                  className="font-dive-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
                  style={{ color: "var(--dive-accent)" }}
                >
                  {entry.chapterTitle}
                </h3>

                {/* Hand-written styled pull-quote */}
                <div
                  className="relative p-4 rounded-2xl border my-2"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--dive-accent) 8%, rgba(255,255,255,0.03))",
                    borderColor: "color-mix(in srgb, var(--dive-accent) 25%, transparent)",
                  }}
                >
                  <p className="font-dive-body text-sm md:text-base italic text-white/95 leading-relaxed">
                    &ldquo;{entry.quote}&rdquo;
                  </p>
                </div>

                {/* Story paragraphs */}
                <div className="space-y-3.5 pt-1">
                  {entry.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-dive-body text-sm sm:text-base leading-relaxed text-dive-text/90"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Handwritten sticky-note style footer remark */}
                <div className="mt-4 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-2.5">
                  <Cat className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <p className="font-dive-body text-xs text-amber-200/90 italic">
                    {entry.doodleNote}
                  </p>
                </div>
              </div>

              {/* Right Column (5 cols): Polaroid / Media Frame */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  className="relative w-full rounded-2xl p-3 bg-[#f7f2ea] text-slate-800 shadow-2xl transition-transform duration-500 hover:rotate-1"
                  style={{
                    boxShadow: "0 20px 45px rgba(0,0,0,0.6), 0 0 30px color-mix(in srgb, var(--dive-accent) 20%, transparent)",
                  }}
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black">
                    <img
                      src={entry.mediaSrc}
                      alt={entry.polaroidCaption}
                      className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Polaroid caption handwritten label */}
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <span className="font-reality-heading text-xs text-slate-800 tracking-wide font-bold">
                      {entry.polaroidCaption}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">
                      ARSIP LOKA
                    </span>
                  </div>
                </div>

                {/* Chapter Navigation controls below polaroid */}
                <div className="mt-6 flex w-full items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab((prev) => (prev > 0 ? prev - 1 : JOURNAL_ENTRIES.length - 1))
                    }
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-dive-heading text-xs text-dive-text hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Memori Sebelumnya
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab((prev) => (prev + 1) % JOURNAL_ENTRIES.length)
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-dive-heading text-xs text-white transition-all hover:scale-105 cursor-pointer shadow-lg"
                    style={{
                      backgroundColor: "var(--dive-accent)",
                      boxShadow: "0 0 16px color-mix(in srgb, var(--dive-accent) 45%, transparent)",
                    }}
                  >
                    <span>{activeTab === JOURNAL_ENTRIES.length - 1 ? "Ulangi" : "Selanjutnya"}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* Subtle blend into #characters */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black/40"
        aria-hidden="true"
      />
    </section>
  );
}