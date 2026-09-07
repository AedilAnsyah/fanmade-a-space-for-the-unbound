import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { newsTimeline, type NewsItem } from "@/content/newsTimeline";
import { useLayer } from "@/components/layer/useLayer";
import { Newspaper, Trophy, Radio, ArrowRight, Award, Calendar, Bookmark, Camera, Flame, Eye, MapPin, Tag } from "lucide-react";

/* ═══════════════════════════════════════════════════
 * NEWS SECTION — DIVE layer ("HARIAN WARTA LOKA")
 *
 * Authentic 1990s Indonesian Broadsheet Newspaper:
 * - Lembar Koran Fisik Lawas bertinta hitam (#1C1917) di atas kertas koran buram (#F5EEDC)
 * - Maskot Pembaca Koran: GIF animasi "Ibu-ibu baca koran" dari aset kota Loka
 * - Kepala Surat Kabar (Masthead): "HARIAN WARTA LOKA", harga koran Rp 500,-, edisi 90-an, izin Deppen RI
 * - FOTO DOKUMENTASI untuk SETIAP ARTIKEL: Baik artikel utama maupun arsip kliping memiliki gambar otentik
 * - Rubrik Iklan Baris & Pojok Warga 90-an (Wartel 24 Jam, Rental Kaset VHS/Sega, Kucing Hilang)
 * - Filter Halaman: Halaman Utama, Rubrik Penghargaan, Rilis Global, Kabar Kota
 * ═══════════════════════════════════════════════════ */

export function News() {
  const { timeOfDay } = useLayer();
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [selectedFilter, setSelectedFilter] = useState<"SEMUA" | "PENGHARGAAN" | "RILIS GLOBAL" | "KABAR KOTA">("SEMUA");
  const [activeArticleId, setActiveArticleId] = useState<string>(newsTimeline[0].id);

  const filteredNews = selectedFilter === "SEMUA"
    ? newsTimeline
    : newsTimeline.filter((n) => n.category === selectedFilter);

  // Fallback to first filtered article if current active isn't in filter
  const activeArticle = filteredNews.find((n) => n.id === activeArticleId) || filteredNews[0] || newsTimeline[0];

  return (
    <section
      ref={sectionRef}
      id="news"
      className="relative min-h-screen py-20 md:py-28 px-3 sm:px-6 md:px-10 overflow-hidden transition-colors duration-700 flex flex-col justify-center items-center"
      style={{
        background:
          timeOfDay === "siang"
            ? "linear-gradient(180deg, #172554 0%, #1E3A8A 40%, #1D4ED8 100%)"
            : timeOfDay === "sore"
            ? "linear-gradient(180deg, #431407 0%, #581C87 45%, #3B0764 100%)"
            : "linear-gradient(180deg, #030712 0%, #0B1120 50%, #020617 100%)",
      }}
    >
      {/* ── THEMATIC ATMOSPHERIC BACKDROP ────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Subtle Horizontal Frequency Waves */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, var(--dive-accent) 0px, var(--dive-accent) 1px, transparent 1px, transparent 24px)`,
          }}
        />
        {/* Expanding Ambient Radar Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((ring) => (
            <div
              key={`news-radio-ring-${ring}`}
              className="absolute rounded-full border border-dashed opacity-10 animate-ping"
              style={{
                borderColor: "var(--dive-accent)",
                width: `${ring * 360}px`,
                height: `${ring * 360}px`,
                animationDuration: `${9 + ring * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── SECTION INTRO HEADER ── */}
      <motion.div
        className="relative z-10 mb-8 text-center px-4 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md mb-3"
          style={{
            borderColor: "color-mix(in srgb, var(--dive-accent) 40%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--dive-accent) 15%, rgba(10,14,39,0.85))",
          }}
        >
          <Newspaper className="h-3.5 w-3.5" style={{ color: "var(--dive-accent)" }} />
          <span
            className="font-dive-heading text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--dive-accent)" }}
          >
            Arsip Pers & Kliping Warta
          </span>
        </div>

        <h2
          className="font-dive-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          style={{
            color: "var(--dive-accent)",
            textShadow: "0 0 35px color-mix(in srgb, var(--dive-accent) 30%, transparent)",
          }}
        >
          Gaung Suara dari Permukaan
        </h2>

        <p className="mx-auto mt-2 max-w-xl font-dive-body text-xs sm:text-sm text-dive-text-muted leading-relaxed">
          Lembaran surat kabar cetak era 90-an yang mencatat jejak langkah, prestasi anak bangsa,
          dan denyut kehidupan warga Kota Loka.
        </p>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
       * PHYSICAL NEWSPAPER BROADSHEET CONTAINER
       * ═══════════════════════════════════════════════════ */}
      <div
        className="relative z-10 w-full max-w-5xl rounded-2xl md:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-4 border-[#241b14] overflow-hidden"
        style={{
          backgroundColor: "#F5EEDC", // Authentic warm aged newsprint paper
          color: "#1C1917", // Vintage dark printer ink
          boxShadow: "0 25px 60px rgba(0,0,0,0.85), inset 0 0 40px rgba(180,150,110,0.25)",
        }}
      >
        {/* Subtle Newspaper Paper Grain & Weathered Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "6px 6px",
          }}
          aria-hidden="true"
        />

        {/* ── 1. NEWSPAPER TOP RUNNING HEADER (KUPON & TARIF) ── */}
        <div className="border-b border-[#2B2018]/30 px-4 py-2 bg-[#EFE6D1] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#57534E]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1C1917]">HARIAN PAGI NASIONAL</span>
            <span>•</span>
            <span>EDISI KHUSUS AKHIR PEKAN</span>
            <span>•</span>
            <span className="hidden sm:inline">NOMOR 24 / TAHUN V</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-red-800 font-bold">LULUS SENSOR DEPPEN RI NO. 199/STT/1990</span>
            <span className="bg-[#E4DAC2] px-2 py-0.5 rounded border border-[#2B2018]/20 font-bold text-[#1C1917]">
              HARGA RP 500,- (LUAR JAWA RP 600,-)
            </span>
          </div>
        </div>

        {/* ── 2. NEWSPAPER MASTHEAD BANNER (KEPALA KORAN) ── */}
        <div className="px-4 sm:px-8 py-5 border-b-4 border-double border-[#1C1917]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Left Col: Animated Auntie Reading Newspaper Asset */}
            <div className="md:col-span-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[#2B2018]/25 pb-3 md:pb-0 md:pr-4">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 border-[#1C1917] bg-[#E8DFC8] shadow-inner">
                <img
                  src="/assets/GIF/ibu2 baca koran.webp"
                  alt="Ibu-ibu membaca koran Harian Loka"
                  className="h-full w-full object-cover object-center"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#1C1917]/85 text-[8px] font-mono text-[#F5EEDC] text-center py-0.5">
                  BU RT LOKA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-bold text-red-800 uppercase tracking-widest">
                  POJOK WARUNG
                </span>
                <p className="font-serif italic text-xs text-[#2B2018] leading-tight mt-0.5">
                  &ldquo;Walah le, berita anyar opo maneh iki teko luar negeri?&rdquo;
                </p>
                <span className="font-mono text-[9px] text-[#78716C] mt-1">
                  Kios Koran Bu RT, Jl. Cendana
                </span>
              </div>
            </div>

            {/* Center Col: Big Bold Newspaper Title */}
            <div className="md:col-span-6 text-center">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#57534E] font-bold">
                SURAT KABAR RAKYAT DAN SUARA MASA LALU
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1C1917] mt-0.5 leading-none">
                HARIAN WARTA LOKA
              </h1>
              <p className="font-serif italic text-xs sm:text-sm text-[#44403C] mt-1">
                &ldquo;Merekam Kejujuran Rasa, Melintasi Retakan Dimensi Bawah Sadar&rdquo;
              </p>
            </div>

            {/* Right Col: Weather, Currency, and Stamp */}
            <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-[#2B2018]/25 pt-3 md:pt-0 md:pl-4 text-right font-mono text-[10px] sm:text-[11px] text-[#57534E] flex flex-col justify-center">
              <div className="font-bold text-[#1C1917]">SENIN PON, ERA 90-AN</div>
              <div>Cuaca: Cerah Berawan 29°C</div>
              <div>Kurs: US$ 1 = Rp 1.950,-</div>
              <div className="mt-1 text-red-700 font-bold flex items-center justify-end gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>HOTLINE WARTEL: 031-89021</span>
              </div>
            </div>
          </div>

          {/* ── Category Filter Tabs (Halaman Koran) ── */}
          <div className="mt-4 pt-3 border-t-2 border-[#1C1917]/30 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-[11px] font-bold text-[#1C1917] mr-1 hidden sm:inline">
                RUBRIK:
              </span>
              {(["SEMUA", "PENGHARGAAN", "RILIS GLOBAL", "KABAR KOTA"] as const).map((filter) => {
                const isSelected = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className="px-3 py-1 font-mono text-xs uppercase font-bold transition-all duration-200 cursor-pointer border rounded-sm"
                    style={{
                      backgroundColor: isSelected ? "#1C1917" : "#EFE6D1",
                      color: isSelected ? "#F5EEDC" : "#2B2018",
                      borderColor: "#1C1917",
                      boxShadow: isSelected ? "2px 2px 0px #78716C" : "1px 1px 0px #A8A29E",
                    }}
                  >
                    {filter === "SEMUA" ? "📰 HALAMAN UTAMA" : filter}
                  </button>
                );
              })}
            </div>

            <div className="font-mono text-[10px] text-[#78716C] italic hidden md:inline">
              * Klik tajuk berita pada arsip kanan untuk membaca edisi lengkap
            </div>
          </div>
        </div>

        {/* ── 3. MAIN SPREAD: EDITORIAL LEAD (LEFT) & ARCHIVE CLIPPINGS (RIGHT) ── */}
        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ════ LEFT COLUMN: MAIN FEATURED HEADLINE ARTICLE (7 cols) ════ */}
          <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-[#2B2018]/30 pb-6 lg:pb-0 lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={`newspaper-article-${activeArticle.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Dateline & Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2B2018]/25 mb-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-800 text-white px-2 py-0.5 rounded-sm font-bold uppercase text-[10px]">
                      {activeArticle.category}
                    </span>
                    <span className="text-[#57534E] font-bold">
                      {activeArticle.edition}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#78716C]">
                    <Calendar className="h-3 w-3" />
                    <span>{activeArticle.date}</span>
                  </div>
                </div>

                {/* Big Headline */}
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1917] leading-tight tracking-tight mb-2">
                  {activeArticle.headline}
                </h2>

                {/* Byline & Reporter Location */}
                <div className="font-mono text-[11px] text-[#57534E] italic mb-4 pb-2 border-b border-[#2B2018]/15">
                  <span>{activeArticle.byline}</span> • <span className="font-bold text-[#1C1917]">{activeArticle.location}</span>
                </div>

                {/* ── BIG NEWSPAPER PHOTOGRAPH WITH CAPTION ── */}
                <div className="mb-5 rounded border-2 border-[#1C1917] bg-[#E8DFC8] p-1.5 shadow-[2px_2px_0px_#1C1917]">
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black/20">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.headline}
                      className="h-full w-full object-cover object-center filter contrast-[1.05] brightness-[0.98]"
                    />
                    {/* Retro photo corner stamp */}
                    <div className="absolute top-2 right-2 bg-[#1C1917]/85 text-[#F5EEDC] text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      FOTO PERS
                    </div>
                  </div>
                  {/* Photo Caption */}
                  <div className="mt-1.5 px-1 py-1 flex items-start justify-between gap-2 font-serif text-xs text-[#44403C]">
                    <p className="italic leading-relaxed flex items-start gap-1">
                      <Camera className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#1C1917]" />
                      <span>{activeArticle.imageCaption}</span>
                    </p>
                    <span className="shrink-0 font-mono text-[10px] font-bold uppercase text-[#78716C] mt-0.5">
                      DOK. MOJIKEN
                    </span>
                  </div>
                </div>

                {/* Pull Quote */}
                {activeArticle.quote && (
                  <div className="mb-4 p-3.5 rounded border-l-4 border-[#1C1917] bg-[#EFE6D1] font-serif italic text-sm sm:text-base text-[#1C1917] leading-relaxed shadow-sm">
                    {activeArticle.quote}
                  </div>
                )}

                {/* Article Body Text with Drop Cap */}
                <div className="font-serif text-sm sm:text-base text-[#2B2018] leading-relaxed text-justify space-y-3">
                  <p className="first-letter:text-5xl first-letter:font-black first-letter:font-serif first-letter:mr-2.5 first-letter:float-left first-letter:text-[#1C1917] first-letter:leading-none">
                    {activeArticle.text}
                  </p>
                </div>

                {/* Award Badge Stamp (Vintage Rubber Ink Stamp Look) */}
                {activeArticle.awardBadge && (
                  <div className="mt-6 pt-4 border-t-2 border-dashed border-[#2B2018]/30 flex items-center justify-between flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-red-700 bg-red-100/60 text-red-900 rounded font-mono text-xs font-bold uppercase tracking-wider transform -rotate-1 shadow-sm">
                      <Trophy className="h-4 w-4 text-red-700 shrink-0" />
                      <span>{activeArticle.awardBadge}</span>
                    </div>

                    <span className="font-mono text-[10px] text-[#78716C] uppercase tracking-widest">
                      KORAN WARTA LOKA • BUKTI ARSIP RESMI
                    </span>
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          {/* ════ RIGHT COLUMN: ARCHIVE CLIPPINGS WITH PICTURES (5 cols) ════ */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#1C1917] mb-4">
                <span className="font-serif text-base font-black text-[#1C1917] tracking-wide uppercase flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4 text-red-800" />
                  <span>Kliping Lembar Berita ({filteredNews.length})</span>
                </span>
                <span className="font-mono text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-800/30">
                  KLIK UNTUK MEMBUKA
                </span>
              </div>

              {/* Stack of Clippings - EVERY ITEM HAS AN IMAGE! */}
              <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
                {filteredNews.map((news) => {
                  const isSelected = activeArticle.id === news.id;
                  return (
                    <button
                      key={news.id}
                      type="button"
                      onClick={() => setActiveArticleId(news.id)}
                      className="w-full text-left p-2.5 sm:p-3 rounded border transition-all duration-200 cursor-pointer flex gap-3 items-center group relative overflow-hidden"
                      style={{
                        backgroundColor: isSelected ? "#FEF9C3" : "#EFE6D1", // Yellow highlighter look when active
                        borderColor: isSelected ? "#CA8A04" : "rgba(43,32,24,0.25)",
                        boxShadow: isSelected
                          ? "2px 3px 0px #A16207, inset 0 0 10px rgba(250,204,21,0.2)"
                          : "1px 2px 0px rgba(43,32,24,0.15)",
                        transform: isSelected ? "translateX(2px)" : "none",
                      }}
                    >
                      {/* Thumbnail Image for each and every article! */}
                      <div className="relative h-18 w-24 sm:h-20 sm:w-26 shrink-0 rounded overflow-hidden border border-[#2B2018]/40 bg-black/20 shadow-inner">
                        <img
                          src={news.image}
                          alt={news.headline}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[8px] font-mono text-white text-center py-0.5">
                          {news.date.split(" ")[0]}
                        </span>
                      </div>

                      {/* Headline Snippet & Tag */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.2 rounded"
                            style={{
                              backgroundColor: isSelected ? "#1C1917" : "#E2D7BE",
                              color: isSelected ? "#FEF9C3" : "#44403C",
                            }}
                          >
                            {news.category}
                          </span>
                          <span className="font-mono text-[10px] text-[#78716C]">
                            {news.date}
                          </span>
                        </div>

                        <h4 className="font-serif text-xs sm:text-sm font-bold text-[#1C1917] line-clamp-2 leading-tight group-hover:text-red-900 transition-colors">
                          {news.headline}
                        </h4>

                        <p className="font-serif text-[11px] text-[#57534E] line-clamp-1 mt-1 italic">
                          {news.text}
                        </p>
                      </div>

                      {/* Selected marker red ribbon */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 90s Radio Broadcast Tune Box */}
            <div className="mt-4 p-3 rounded border border-[#2B2018]/30 bg-[#E8DFC8] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-red-700 animate-pulse" />
                <span className="font-bold text-[#1C1917]">SUARA LOKA 98.2 FM</span>
              </div>
              <span className="text-[#57534E]">RADIO TRANSISTOR 1990</span>
            </div>
          </div>
        </div>

        {/* ── 4. RETRO CLASSIFIED ADS (IKLAN BARIS 90-AN) ── */}
        <div className="border-t-4 border-double border-[#1C1917] bg-[#EFE6D1] px-4 sm:px-8 py-5">
          <div className="flex items-center justify-between border-b border-[#2B2018]/30 pb-2 mb-3">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#1C1917]">
              IKLAN BARIS & POJOK LAYANAN WARGA KOTA LOKA
            </span>
            <span className="font-mono text-[10px] text-red-800 font-bold">
              TARIF IKLAN RP 150,- / BARIS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {/* Ad 1: Wartel */}
            <div className="p-2.5 rounded border border-[#2B2018]/25 bg-[#F5EEDC]">
              <span className="font-bold text-[#1C1917] block mb-0.5">☎️ WARTEL LOKA 24 JAM</span>
              <p className="text-[11px] text-[#57534E] leading-relaxed">
                Bilik bicara nyaman, AC dingin, diskon 50% bicara lewat tengah malam. Sedia kartu telepon magnetik & koin Rp 100 baru.
              </p>
            </div>

            {/* Ad 2: Rental VHS & Nintendo */}
            <div className="p-2.5 rounded border border-[#2B2018]/25 bg-[#F5EEDC]">
              <span className="font-bold text-[#1C1917] block mb-0.5">📼 RENTAL KASET & SEGA</span>
              <p className="text-[11px] text-[#57534E] leading-relaxed">
                Tersedia film kungfu terbaru, kartun anak, dan rental konsol 16-bit Sega Genesis / Super Nintendo. Dekat bioskop Rajawali.
              </p>
            </div>

            {/* Ad 3: Kucing Hilang */}
            <div className="p-2.5 rounded border border-[#2B2018]/25 bg-[#F5EEDC]">
              <span className="font-bold text-red-800 block mb-0.5">🐱 PENGUMUMAN KUCING</span>
              <p className="text-[11px] text-[#57534E] leading-relaxed">
                Dicari kucing belang tiga milik Nona Raya. Suka tidur di atap warung bakso. Yang menemukan akan diberi imbalan kue lemper.
              </p>
            </div>

            {/* Ad 4: Sandiwara Radio */}
            <div className="p-2.5 rounded border border-[#2B2018]/25 bg-[#F5EEDC]">
              <span className="font-bold text-[#1C1917] block mb-0.5">📻 SANDIWARA MISTERI</span>
              <p className="text-[11px] text-[#57534E] leading-relaxed">
                Dengarkan drama radio &ldquo;Buku Catatan Merah&rdquo; setiap malam Jumat pukul 21.00 WIB hanya di Suara Loka 98.2 FM.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#2B2018]/20 flex items-center justify-between text-[10px] font-mono text-[#78716C]">
            <span>DICETAK OLEH PERCETAKAN RAKYAT LOKA • SURABAYA</span>
            <span>MOJIKEN STUDIO & TOGE PRODUCTIONS © 1990 - 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}


