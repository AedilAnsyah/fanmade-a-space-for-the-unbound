# SPESIFIKASI INTERAKSI & VIBE CODING PROMPTS — "MENYELAM"

Dokumen ini menggantikan versi prompt lama. Perbedaan utama: setiap prompt sekarang membangun **satu mekanik interaksi milik konsep ini**, bukan komponen landing page generik.

---

## 1. Peta Interaksi (baca dulu sebelum mulai coding)

```
[REALITY: Home]
   |
   |  klik "Buka Buku Merah"
   v
[TRANSISI: Dive-In]  ← clip-path circle expand dari posisi tombol + font cross-fade
   |
   v
[DIVE: Memory Map]  ← nav utama di lapisan DIVE, berupa node Atma/Raya/Nirmala/Gameplay/News/Play
   |
   |-- klik node karakter → tint warna section berubah sesuai karakter aktif
   |-- scroll → Gameplay (step reveal), News (echo timeline), Play Now (exit point)
   v
[Play Now: "Kembali ke Permukaan"]  ← CTA beli game, sekaligus titik akhir narasi
```

Custom cursor aktif **hanya di lapisan DIVE** (titik cahaya + jejak partikel). Di lapisan REALITY, cursor default browser saja — supaya perubahannya terasa jadi "sinyal", bukan mengganggu dari awal.

---

## Prompt 0 — Context Awal (tempel sekali di awal sesi AI)

```
Kita membangun website fan-made showcase untuk game indie "A Space for the Unbound"
(dev: Mojiken Studio, publisher: Toge Productions) untuk lomba web development.

KONSEP UTAMA (wajib dipahami sebelum coding apa pun):
Website ini punya 2 "lapisan" yang merepresentasikan REALITY (dunia nyata) dan DIVE
(alam pikiran/bawah sadar), meniru kekuatan "SpaceDive" milik karakter Atma di dalam
game (menyelam ke pikiran orang lain lewat buku merah ajaib). Section "Home" ada di
lapisan REALITY. Section "Character", "Gameplay", "News", "Play Now" ada di lapisan
DIVE. Perpindahan dari REALITY ke DIVE dipicu tombol "Buka Buku Merah", bukan scroll
biasa.

Tech stack: Next.js 14 (App Router) + Tailwind CSS + Framer Motion + GSAP (khusus
ScrollTrigger untuk step reveal) + Lenis (smooth scroll). Semua library gratis/open
source.

Design tokens:
- Warna konstan (muncul di 2 lapisan): --book-red: #B33A3A, --book-red-glow: #D8534F
- REALITY: bg #F4E9D8, bg-secondary #E8D5B7, text #2B2018, text-muted #8C7B65,
  accent-warm #C9633E, accent-green #7A8B69
- DIVE: bg #0A0E27, bg-secondary #151B3D, text #EDEBFA, text-muted #8A88B0,
  accent-psychic #6C63FF (default), accent-glow #35D4C7
- Tint per karakter (ganti nilai --dive-accent saat karakter aktif):
  Atma → #F2A65A, Raya → #6C63FF, Nirmala → #E94F9C
- Font REALITY: heading "Special Elite", body "Lora"
- Font DIVE: heading "Pixelify Sans", body "Plus Jakarta Sans"

Aturan:
- JANGAN gunakan CMS apapun, JANGAN template premium jadi.
- Semua ilustrasi/aset visual pakai placeholder dulu, jangan asumsikan aset resmi game.
- Fully responsive. Transisi "Buka Buku" boleh disederhanakan di mobile (lihat Prompt 2)
  demi performa, tapi tetap harus terasa seperti perpindahan dunia, bukan cuma fade biasa.
- CTA beli game (di section Play Now) harus tetap gampang ditemukan kapan saja —
  tambahkan juga tombol kecil "Beli Sekarang" yang muncul di pojok setelah user
  scroll melewati Home (persistent, tidak mengganggu tapi selalu ada).

Kerjakan satu prompt per section/mekanik, tunggu instruksi saya untuk lanjut.
```

---

## Prompt 1 — Setup Project & Design Tokens

```
Buatkan struktur awal Next.js 14 (App Router) + Tailwind CSS.
1. tailwind.config.ts dengan semua color token di atas, dikelompokkan jelas
   (reality-*, dive-*, book-red).
2. Import font "Special Elite", "Lora", "Pixelify Sans", "Plus Jakarta Sans" via
   next/font/google, expose sebagai CSS variable.
3. Buat React Context sederhana `LayerContext` yang menyimpan state global:
   layer: "reality" | "dive", activeCharacter: "atma" | "raya" | "nirmala" | null.
   Semua komponen nanti baca dari context ini untuk tahu harus pakai token warna/font
   yang mana.
4. Setup Lenis untuk smooth scroll di root layout.
Tampilkan semua file lengkap dengan isinya.
```

---

## Prompt 2 — Mekanik Utama: Transisi "Buka Buku Merah"

```
Ini komponen paling penting di seluruh situs, buat dengan hati-hati.

Buatkan komponen <DiveTransition /> yang:
- Ditrigger oleh klik tombol "Buka Buku Merah" di Hero.
- Efek: sebuah lingkaran (clip-path circle) muncul dari posisi tombol yang diklik,
  lalu membesar (expand) memenuhi layar, mengungkap konten section DIVE di baliknya.
  Gunakan Framer Motion `motion.div` dengan animasi `clipPath` dari `circle(0% at Xpx
  Ypx)` ke `circle(150% at Xpx Ypx)`.
- Bersamaan dengan itu: font heading cross-fade dari "Special Elite" ke "Pixelify Sans"
  (opacity transition antar 2 elemen teks yang overlap, bukan font-morphing beneran).
- Setelah animasi selesai (±1.2 detik), update LayerContext jadi layer: "dive", lalu
  scroll otomatis ke section Character.
- Di mobile (viewport < 768px): sederhanakan jadi crossfade + slight scale saja
  (tanpa circle-expand penuh) demi performa, tapi tetap beri sedikit delay/anticipation
  sebelum konten baru muncul supaya tetap terasa seperti "transisi", bukan instant cut.
Style tombol "Buka Buku Merah": warna --book-red, hover jadi --book-red-glow dengan
sedikit efek glow/shadow.
```

---

## Prompt 3 — Hero (REALITY layer)

```
Buatkan komponen <Hero /> untuk section Home (layer REALITY):
- Background: warna reality-bg dengan tekstur grain halus (pakai SVG feTurbulence
  filter overlay, opacity rendah, tanpa file gambar).
- Eyebrow text: "Sebuah kisah slice-of-life dari Mojiken Studio" (font Lora, kecil,
  huruf besar semua, letter-spacing lebar).
- Headline: "Ada dunia lain di balik pikiran orang-orang yang kita kenal." (font
  Special Elite, besar).
- Sub-headline 1 kalimat (saya sudah siapkan copy-nya, tempel dari dokumen konten).
- Tombol "Buka Buku Merah" (memicu <DiveTransition />) dan tombol sekunder
  "Tonton Trailer" (buka modal iframe YouTube, placeholder video ID dulu).
- Badge kecil "Best Storytelling — SEA Game Awards 2020" di pojok bawah, subtle,
  border tipis warna accent-warm.
- Semua elemen fade-up saat halaman load (Framer Motion, stagger antar elemen).
```

---

## Prompt 4 — Custom Cursor (khusus lapisan DIVE)

```
Buatkan komponen <DiveCursor /> yang:
- Hanya aktif/visible saat LayerContext.layer === "dive".
- Berupa lingkaran kecil (±12px) warna --dive-accent (ambil dari context, berubah
  sesuai activeCharacter jika ada), dengan efek glow (box-shadow blur).
- Mengikuti posisi mouse dengan sedikit delay/lag halus (pakai spring animation dari
  Framer Motion useSpring, bukan langsung nempel di posisi cursor asli — biar terasa
  seperti "melayang").
- Saat hover di atas elemen interaktif (button, node memory-map), lingkaran membesar
  sedikit (scale 1.5).
- Sembunyikan cursor asli browser (cursor: none) hanya di dalam area layer DIVE.
- Pastikan tidak aktif/dinonaktifkan otomatis di touch device (mobile/tablet), karena
  tidak ada mouse cursor di sana.
```

---

## Prompt 5 — Memory Map Navigation (pengganti navbar)

```
Buatkan komponen <MemoryMap /> sebagai navigasi utama di layer DIVE:
- Berupa node-node kecil (lingkaran, ±40px) untuk: Atma, Raya, Nirmala, Gameplay,
  News, Play Now — posisinya tersebar seperti rasi bintang/simpul jaringan saraf
  (gunakan posisi custom, bukan grid rapi).
- Antar node ada garis tipis penghubung (SVG <line> atau <path>), digambar dengan
  animasi `pathLength` (Framer Motion) saat komponen pertama kali muncul, seolah
  "sinaps menyala".
- Klik salah satu node → smooth scroll ke section terkait DAN (khusus node karakter)
  update `activeCharacter` di LayerContext, yang otomatis mengubah nilai CSS variable
  --dive-accent di section Character sesuai tint karakter tersebut.
- Node yang activeCharacter-nya sedang aktif diberi ring/glow lebih terang dari yang lain.
- Buat versi ringkas (collapsed) berupa ikon buku kecil di pojok kiri-atas yang bisa
  diklik untuk expand/collapse MemoryMap ini — supaya tidak menutupi konten terus-menerus.
- Responsif: di mobile, MemoryMap default collapsed, expand jadi list vertikal
  sederhana saat ikon buku di-tap (bukan constellation visual penuh, terlalu ramai
  untuk layar kecil).
```

---

## Prompt 6 — Section Characters (dengan tint switching)

```
Buatkan komponen <Characters /> di layer DIVE:
- Intro 1 kalimat di atas (dari dokumen konten).
- 3 card: Atma, Raya, Nirmala. Layout grid 3 kolom desktop, 1 kolom mobile.
- Setiap card, saat di-hover ATAU saat node terkait di MemoryMap diklik: seluruh
  section (background glow, border card, cursor jika aktif) berubah warna mengikuti
  --dive-accent karakter tersebut (Atma #F2A65A, Raya #6C63FF, Nirmala #E94F9C).
  Transisi warna pakai Framer Motion animate, durasi ±0.4s, jangan instant snap.
- Isi card: gambar placeholder rasio 3:4, nama (font Pixelify Sans), deskripsi
  singkat (tempel dari dokumen konten, ±30 kata per karakter).
- Scroll-reveal: card muncul fade-up bergantian (Framer Motion whileInView).
```

---

## Prompt 7 — Section Gameplay (step reveal, bukan card grid)

```
Buatkan komponen <Gameplay /> di layer DIVE:
- Intro 1 kalimat (dari dokumen konten).
- 4 langkah: Temukan, Menyelam, Pecahkan, Kembali (copy singkat dari dokumen konten).
- Gunakan GSAP ScrollTrigger dengan teknik "pin" sederhana: section ini nge-pin di
  layar, lalu tiap langkah muncul satu-satu mengikuti scroll progress (bukan reveal
  4 card sekaligus). Beri nomor besar (01-04) di font Pixelify Sans untuk tiap langkah.
- Beri indikator progress kecil (4 titik/garis) yang menunjukkan sedang di langkah
  keberapa.
- Tambahkan micro-copy easter egg soal "RiftDive" di akhir sequence (dari dokumen
  konten), muncul lebih subtle/kecil dibanding 4 langkah utama.
```

---

## Prompt 8 — Section News (echo timeline)

```
Buatkan komponen <News /> di layer DIVE:
- Intro 1 kalimat (dari dokumen konten): "Sesekali, dunia nyata ikut bergema sampai
  ke sini."
- Timeline horizontal-scroll (bukan vertikal biasa) — beri kesan "gelombang/echo"
  dengan sedikit efek blur-in saat tiap item masuk viewport (seperti sinyal yang
  makin jelas), pakai Framer Motion whileInView dengan filter blur → sharp.
- 5 item timeline dari dokumen konten (2020 s.d. 2025), tiap item singkat (≤12 kata).
- Style titik penanda timeline pakai bentuk kotak kecil (bukan bulat), konsisten
  dengan estetika pixel.
```

---

## Prompt 9 — Section Play Now (exit point + persistent CTA)

```
Buatkan komponen <PlayNow /> di layer DIVE, sebagai penutup narasi:
- Headline "Dunia nyata menunggu. Loka juga." (font Pixelify Sans, besar) + sub-copy
  singkat dari dokumen konten.
- Grid tombol platform: Steam, PlayStation, Xbox, Nintendo Switch, iOS (ikon dari
  react-icons/fa), warna --book-red sebagai base, hover jadi --book-red-glow.
- Section ini beri sedikit "kembali ke terang" secara visual (background sedikit
  lebih cerah dari section sebelumnya, tanpa keluar dari palette DIVE) sebagai isyarat
  "resurface".
- Sekalian buatkan komponen terpisah <PersistentBuyButton /> yang muncul fixed di
  pojok kanan-bawah setelah user scroll melewati Hero, kecil, warna --book-red,
  isi teks "Beli Sekarang" — klik akan scroll langsung ke section Play Now.
Catatan: href tombol platform sementara pakai "#" placeholder.
```

---

## Prompt 10 — Polish & QA (dikerjakan paling akhir)

```
Review seluruh halaman dan:
1. Pastikan LayerContext konsisten dipakai di semua komponen (tidak ada section yang
   "lupa" ganti font/warna sesuai layer-nya).
2. Cek transisi DiveTransition tidak nge-lag di device menengah — kalau berat, kurangi
   kompleksitas clip-path atau matikan grain filter saat transisi berjalan.
3. Pastikan DiveCursor benar-benar nonaktif di touch device.
4. Cek kontras warna teks vs background di kedua layer, minimal WCAG AA.
5. Tambahkan meta tag SEO dasar (title, description, og:image) di layout.
6. Test PersistentBuyButton tidak menutupi konten penting di mobile (misal MemoryMap
   collapsed icon) — atur posisi agar tidak bertabrakan.
```

---

## Tips Vibe Coding untuk Konsep Ini

1. **Bangun Prompt 1-2 dulu sampai benar-benar mulus** sebelum lanjut ke section lain — DiveTransition adalah "wajah" dari seluruh konsep, kalau ini terasa janky, seluruh kesan imersif ikut runtuh.
2. **Test transisi & cursor di device asli**, bukan cuma resize browser — animasi clip-path & spring cursor sensitif terhadap performa device.
3. **Jangan tambah efek baru yang tidak dijelaskan di dokumen ini** tanpa mengecek dulu apakah efek itu benar-benar mendukung konsep REALITY/DIVE — ini yang mencegah hasil akhir kembali terasa generik.
4. Simpan histori prompt & hasilnya sebagai bagian dari **Dokumentasi Proyek (PDF)** yang wajib dikumpulkan.