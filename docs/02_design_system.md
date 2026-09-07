# DESIGN SYSTEM — "MENYELAM" (SpaceDive Website)

Sistem desain ini **bukan pilihan 5 mood board terpisah** seperti versi lama — ini satu sistem warna terpadu yang berubah state mengikuti narasi: **REALITY → DIVE**, plus tint khusus per karakter saat "diselami". Semua warna & font tetap 100% gratis/open source.

---

## 1. Warna Penghubung (Constant — muncul di kedua lapisan)

| Nama | Hex | Peran |
|---|---|---|
| **Merah Buku** (Book Red) | `#B33A3A` | Satu-satunya warna yang konsisten muncul di REALITY maupun DIVE — merepresentasikan buku merah ajaib. Dipakai untuk CTA utama, aksen garis, dan elemen "portal" (tombol buka buku, tombol kembali ke permukaan) |
| **Merah Buku (hover/glow)** | `#D8534F` | Versi lebih terang untuk hover state & glow effect |

---

## 2. Palette REALITY (Home — dunia nyata, siang/senja, nostalgia album foto)

| Role | Hex | Contoh Pakai |
|---|---|---|
| Background utama | `#F4E9D8` | Krem kertas tua |
| Background sekunder | `#E8D5B7` | Card, area teks |
| Teks utama | `#2B2018` | Sephia gelap, seperti tinta lama |
| Teks muted | `#8C7B65` | Caption |
| Aksen hangat | `#C9633E` | Highlight, underline judul |
| Aksen hijau pedesaan | `#7A8B69` | Elemen dekoratif (dedaunan, ilustrasi kota Loka) |
| Merah Buku (constant) | `#B33A3A` | Tombol "Buka Buku Merah" (CTA utama) |

**Tekstur/mood**: sedikit grain/noise halus (seperti foto polaroid lama), sudut card sedikit membulat lembut, bayangan lembut — kesan "album foto yang bisa disentuh", bukan flat design digital murni.

---

## 3. Palette DIVE (Character, Gameplay, News, Play Now — dunia pikiran)

| Role | Hex | Contoh Pakai |
|---|---|---|
| Background utama | `#0A0E27` | Void gelap alam bawah sadar |
| Background sekunder | `#151B3D` | Card, panel memory-map |
| Teks utama | `#EDEBFA` | Body text di atas gelap |
| Teks muted | `#8A88B0` | Caption, meta |
| Aksen psikis | `#6C63FF` | Garis penghubung memory-map, hover state |
| Aksen dive/glow | `#35D4C7` | Partikel, indikator "sedang menyelam" |
| Merah Buku (constant) | `#B33A3A` | Tombol "Kembali ke Permukaan", elemen portal antar-section |

**Tekstur/mood**: gradient radial lembut di sekitar elemen aktif (efek glow seperti cahaya di kegelapan), garis-garis tipis menghubungkan node (seperti sinaps saraf/rasi bintang), partikel halus melayang pelan.

---

## 4. Tint Per Karakter (dipakai saat pengunjung "menyelami" tiap karakter di section Character)

Base palette DIVE tetap dipakai, tapi warna aksen (`#6C63FF`) diganti sesuai karakter yang sedang aktif — memberi kesan tiap pikiran punya "rasa" berbeda:

| Karakter | Warna Tint | Alasan |
|---|---|---|
| **Atma** | `#F2A65A` (amber hangat) | Merepresentasikan sisi "penulis"-nya — hangat, personal, seperti cahaya lampu meja saat menulis |
| **Raya** | `#6C63FF` (violet-biru psikis) | Warna default DIVE — melambangkan kekuatan supernaturalnya yang misterius dan belum sepenuhnya terungkap |
| **Nirmala** | `#E94F9C` (rose/pink senja) | Merepresentasikan nuansa "galau senja"-nya, nostalgia masa kecil & mimpi yang belum selesai |

**Implementasi teknis**: cukup 1 CSS variable `--dive-accent` yang di-swap nilainya (via state React/JS) saat card karakter di-hover/klik — tidak perlu bikin 3 palette terpisah dari nol.

---

## 5. Tipografi (Perubahan Font = Sinyal Perpindahan Dunia)

Ini bagian yang membedakan sistem ini dari template generik: **font ikut berubah karakter mengikuti lapisan**, bukan cuma warna.

| Lapisan | Font Judul | Font Body | Kesan |
|---|---|---|---|
| **REALITY** | **"Special Elite"** (Google Fonts, gaya mesin tik) | **"Lora"** (serif hangat, literer) | Seperti membaca buku harian/jurnal lama |
| **DIVE** | **"Pixelify Sans"** (Google Fonts, pixel-game tapi tetap terbaca) | **"Plus Jakarta Sans"** (sans geometris bersih) | Seperti versi "diproses"/digital dari ingatan yang sama |

Semua gratis di [fonts.google.com](https://fonts.google.com). Transisi font saat "Buka Buku" bisa dianimasikan dengan cross-fade sederhana (tidak perlu font-morphing kompleks) — cukup fade-out font REALITY, fade-in font DIVE bersamaan dengan clip-path transition (lihat dokumen Rancangan Teknis).

---

## 6. Ikon

- **Lucide Icons** (lucide.dev) — gratis, dipakai untuk ikon UI umum (panah, close, play)
- **Phosphor Icons** (phosphoricons.com) varian "duotone" — cocok untuk ikon di lapisan DIVE karena ada efek dua-warna yang pas dengan mood glow
- **react-icons/fa (Font Awesome Free)** — khusus ikon platform di section Play Now (Steam, PlayStation, Xbox, Switch, iOS)

---

## 7. Animasi & Interaktivitas (Gratis) — dipetakan ke konsep, bukan random effect

| Kebutuhan | Tool | Peran dalam Konsep |
|---|---|---|
| Transisi "Buka Buku" (Reality → Dive) | **Framer Motion** (`clip-path` circle expand / custom `AnimatePresence`) | Momen sentral situs — bukan scroll biasa |
| Custom cursor (titik cahaya + jejak partikel di DIVE) | **Framer Motion** + `mousemove` listener sederhana, atau **GSAP** | Sinyal halus "kamu sedang di alam pikiran" |
| Memory-map navigation (node saling terhubung) | **SVG + Framer Motion** (garis digambar dengan `pathLength` animation) | Representasi visual mekanik SpaceDive |
| Reveal langkah Gameplay (Temukan→Menyelam→Pecahkan→Kembali) | **GSAP ScrollTrigger** (`pin` + step reveal) | Edukasi gameplay loop asli lewat scroll, bukan card statis |
| Partikel/glow ambient di DIVE | **tsParticles** (setting minimal, partikel besar & pelan, bukan starfield ramai) | Ambience alam bawah sadar |
| Smooth scroll | **Lenis** | Menjaga transisi antar section tetap mulus, konsisten dengan mood "mengalir" |

---

## 8. Aset Visual & Ilustrasi (Gratis & Aman Hak Cipta)

Sama seperti sebelumnya, tapi diarahkan langsung ke kebutuhan konsep baru:

1. **Ilustrasi portal/buku merah orisinal** — bikin sendiri via **Piskel** (piskel.com) atau **LibreSprite**, terinspirasi (bukan menjiplak) gaya visual game.
2. **Ilustrasi 3 karakter versi orisinal tim** — gunakan referensi dari screenshot resmi Steam (lihat catatan kurasi di dokumen Brief) sebagai acuan pose/mood, tapi digambar ulang dengan gaya sendiri.
3. **Tekstur kertas/grain untuk lapisan REALITY** — cari di **Unsplash**/**Pexels** (foto tekstur kertas tua, gratis) atau generate sendiri via CSS noise filter (SVG turbulence, tanpa file gambar sama sekali — lebih ringan).
4. **Partikel/garis saraf untuk lapisan DIVE** — tidak perlu aset gambar, cukup digambar via SVG/Canvas langsung di kode (`ScrollColorShift`/`MemoryMap` component).
5. **Trailer**: tetap embed YouTube resmi, dibuka lewat modal saat tombol "Tonton Trailer" di-klik dari Hero (REALITY layer, sebelum "menyelam").

---

## 9. Hosting & Tools Deploy (Gratis)

Tidak berubah dari dokumen sebelumnya — **Vercel** (rekomendasi utama untuk Next.js) atau **Netlify**, source code di **GitHub** (repo publik), optimasi gambar via **Squoosh.app**, testing responsif via DevTools browser atau **Responsively App**.