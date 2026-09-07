# RANCANGAN TEKNIS & ARSITEKTUR — "MENYELAM"
**Website Showcase "A Space for the Unbound" — Lomba Web Development IT FEST UNW 2026**

Dokumen ini adalah **dokumen Rancangan Teknis** yang dirujuk berulang kali di `01_konsep_dan_brief.md` (checklist responsif) dan `04_interaksi_dan_vibe_coding_prompts.md` (Prompt 2, Prompt 5). Isinya menerjemahkan konsep & design system jadi keputusan teknis konkret: struktur project, kontrak data, strategi performa/aksesibilitas, dan checklist QA — supaya tim vibe-coding tidak menebak-nebak struktur file saat menempel prompt ke AI.

---

## 1. Tujuan Dokumen

- Jadi rujukan tunggal soal **struktur folder, penamaan komponen, dan bentuk data** — supaya hasil tiap prompt di dokumen 04 nyambung satu sama lain meski dikerjakan di sesi AI terpisah.
- Menjabarkan **aturan fallback mobile & performa** yang di dokumen 01/04 baru disebut sebagai catatan singkat.
- Jadi checklist QA sebelum submit, melengkapi Prompt 10.

---

## 2. Tech Stack & Versi Target

| Layer | Tool | Versi target | Catatan |
|---|---|---|---|
| Framework | Next.js | 14.x (App Router) | Sesuai keputusan di dokumen konsep, jangan pindah ke Pages Router |
| Styling | Tailwind CSS | 3.4.x | Token warna & font di-mapping ke `tailwind.config.ts`, lihat §3 |
| Animasi UI | Framer Motion | 11.x | `clip-path`, `AnimatePresence`, `useSpring` untuk cursor |
| Scroll-driven animasi | GSAP + ScrollTrigger | 3.12.x | Hanya dipakai di `<Gameplay />` (pin + step reveal) |
| Smooth scroll | Lenis (`@studio-freight/lenis` atau turunannya `lenis`) | terbaru stabil | Wajib disinkronkan manual dengan ScrollTrigger, lihat §9.1 |
| Ikon | lucide-react, phosphor-react, react-icons/fa | terbaru stabil | Sesuai pembagian peran di dokumen Design System §6 |
| Hosting | Vercel (utama) / Netlify (cadangan) | — | Next.js App Router paling mulus di Vercel |

Cek versi stabil terbaru masing-masing package saat `npm install` — jangan pin versi dari dokumen ini secara buta kalau sudah ada breaking change di antara waktu penulisan dan waktu development.

---

## 3. Struktur Folder Proyek

```
menyelam-website/
├─ app/
│  ├─ layout.tsx              # Root layout: font vars, LenisProvider, LayerProvider
│  ├─ page.tsx                # Merangkai semua section dalam satu halaman (single-page site)
│  └─ globals.css             # Reset, CSS variables non-Tailwind (mis. --dive-accent)
├─ components/
│  ├─ layer/
│  │  ├─ LayerProvider.tsx     # Context provider (Prompt 1)
│  │  └─ useLayer.ts           # Hook konsumsi context
│  ├─ reality/
│  │  └─ Hero.tsx              # Prompt 3
│  ├─ dive/
│  │  ├─ DiveTransition.tsx    # Prompt 2
│  │  ├─ DiveCursor.tsx        # Prompt 4
│  │  ├─ MemoryMap.tsx         # Prompt 5
│  │  ├─ Characters.tsx        # Prompt 6
│  │  ├─ Gameplay.tsx          # Prompt 7
│  │  ├─ News.tsx              # Prompt 8
│  │  └─ PlayNow.tsx           # Prompt 9 (termasuk PersistentBuyButton.tsx terpisah)
│  └─ shared/
│     ├─ TrailerModal.tsx
│     └─ PersistentBuyButton.tsx
├─ content/
│  ├─ characters.ts            # Data 3 karakter (§6.1)
│  ├─ gameplaySteps.ts          # Data 4 langkah (§6.2)
│  ├─ newsTimeline.ts           # Data 5 item timeline (§6.3)
│  └─ platforms.ts              # Data tombol platform (§6.4)
├─ lib/
│  ├─ lenis.ts                  # Setup instance Lenis + integrasi ScrollTrigger
│  └─ scrollTrigger.ts          # Registrasi plugin GSAP (client-only)
├─ public/
│  └─ assets/                   # Placeholder & ilustrasi orisinal (lihat 06_manifest_aset.md)
├─ tailwind.config.ts
└─ next.config.js
```

Prinsip: **komponen dikelompokkan per lapisan** (`reality/` vs `dive/`), bukan per "jenis komponen" — supaya saat ada perubahan konsep di satu lapisan, tim tidak perlu menyisir seluruh folder `components/`.

---

## 4. State Management — `LayerContext`

```ts
// components/layer/LayerProvider.tsx
type Layer = "reality" | "dive";
type CharacterId = "atma" | "raya" | "nirmala" | null;

interface LayerState {
  layer: Layer;
  activeCharacter: CharacterId;
}

interface LayerContextValue extends LayerState {
  enterDive: () => void;          // dipanggil DiveTransition setelah animasi selesai
  setActiveCharacter: (id: CharacterId) => void;
  resetCharacterTint: () => void; // dipakai saat scroll keluar section Character
}
```

Aturan pemakaian:
- **Satu sumber kebenaran.** Tidak boleh ada komponen yang menyimpan state `layer` atau `activeCharacter` versi lokalnya sendiri (mis. `useState` duplikat di `Hero.tsx`) — semua baca/tulis lewat `useLayer()`.
- `--dive-accent` di-set via inline style atau `document.documentElement.style.setProperty` di dalam `useEffect` yang mendengarkan `activeCharacter`, bukan lewat class Tailwind statis (karena nilainya dinamis per karakter).
- Nilai awal `activeCharacter` adalah `null` → `--dive-accent` fallback ke warna default DIVE (`#6C63FF`, sama seperti tint Raya) sesuai dokumen Design System §4.

---

## 5. Peta Komponen → Data yang Dikonsumsi

| Komponen | Baca dari `content/` | Baca dari `LayerContext` |
|---|---|---|
| `Hero` | — | `enterDive` (dipanggil saat klik tombol) |
| `DiveTransition` | — | `layer`, `enterDive` |
| `DiveCursor` | — | `layer`, `activeCharacter` (untuk warna) |
| `MemoryMap` | `characters.ts`, id section lain | `activeCharacter`, `setActiveCharacter` |
| `Characters` | `characters.ts` | `activeCharacter`, `setActiveCharacter` |
| `Gameplay` | `gameplaySteps.ts` | `layer` (guard: hanya render penuh saat sudah di DIVE) |
| `News` | `newsTimeline.ts` | — |
| `PlayNow` | `platforms.ts` | — |
| `PersistentBuyButton` | — | `layer` (opsional, untuk styling) |

---

## 6. Skema Data Konten

Semua konten statis disimpan sebagai modul TypeScript di `content/` — **bukan** hardcode di dalam JSX komponen, dan **bukan** CMS (sesuai larangan di dokumen Brief §6).

### 6.1 `characters.ts`
```ts
export interface Character {
  id: "atma" | "raya" | "nirmala";
  name: string;
  description: string;   // ±30 kata, sesuai batas di dokumen Konten
  tintColor: string;     // hex, dipakai untuk --dive-accent
  imagePlaceholder: string; // path ke placeholder di /public/assets
}
```

### 6.2 `gameplaySteps.ts`
```ts
export interface GameplayStep {
  order: number;        // 1-4
  title: string;        // Temukan / Menyelam / Pecahkan / Kembali
  description: string;  // ≤12 kata
}
export const riftDiveEasterEgg: string; // micro-copy terpisah, bukan step ke-5
```

### 6.3 `newsTimeline.ts`
```ts
export interface NewsItem {
  date: string;    // "2020", "Jan 2023", dst — string bebas, bukan Date object
  text: string;    // ≤12 kata
}
```
Catatan: field `date` sengaja `string`, bukan `Date`, karena beberapa entri hanya berupa tahun tanpa bulan/hari.

### 6.4 `platforms.ts`
```ts
export interface PlatformLink {
  name: "Steam" | "PlayStation" | "Xbox" | "Nintendo Switch" | "iOS";
  href: string;   // placeholder "#" sampai link store resmi tersedia
  icon: string;   // nama ikon react-icons/fa
}
```

---

## 7. Strategi Responsif

| Breakpoint | Perilaku khusus |
|---|---|
| `< 768px` (mobile) | `DiveTransition` pakai mode crossfade+scale (bukan circle-expand). `MemoryMap` default collapsed, expand jadi list vertikal. `DiveCursor` non-aktif total. `Gameplay` step-reveal tetap jalan tapi pin GSAP dipersingkat durasinya agar tidak terasa "macet" di layar kecil. |
| `768px – 1024px` (tablet) | `MemoryMap` tetap bentuk constellation tapi dengan radius node lebih kecil. Grid `Characters` tetap 1 kolom jika lebar < 900px agar card tidak terlalu sempit. |
| `> 1024px` (desktop) | Semua efek penuh: circle-expand, custom cursor, constellation map. |

Deteksi mobile pakai kombinasi `window.matchMedia("(max-width: 767px)")` **dan** deteksi touch (`"ontouchstart" in window`) — supaya laptop dengan touchscreen tidak salah dianggap "device mobile" untuk urusan lebar layar, tapi tetap dianggap touch untuk urusan cursor.

---

## 8. Strategi Performa

1. **Client-only untuk library berat.** `GSAP`, `ScrollTrigger`, dan `Lenis` di-`dynamic(() => import(...), { ssr: false })` agar tidak ikut ke bundle server-side Next.js.
2. **Reduce motion.** Cek `window.matchMedia("(prefers-reduced-motion: reduce)")` di level `LayerProvider`. Jika `true`: `DiveTransition` otomatis pakai mode mobile (crossfade), `DiveCursor` non-aktif, partikel ambient dimatikan.
3. **Gambar.** Semua placeholder & ilustrasi lewat `next/image` dengan `sizes` yang benar; kompres dulu via Squoosh sebelum masuk `/public/assets` (sesuai dokumen Design System §9).
4. **Font.** `next/font/google` dengan `display: "swap"` supaya tidak ada render-blocking saat font pixel (`Pixelify Sans`) sempat lambat load.
5. **Matikan grain filter saat transisi berjalan** (sesuai catatan Prompt 10 poin 2) — cek prop `isTransitioning` dari `DiveTransition`, suppress SVG filter di `Hero` selama itu.

---

## 9. Sinkronisasi Lenis + GSAP ScrollTrigger

Ini bagian yang paling sering bikin bug kalau digabung asal-asalan.

```ts
// lib/lenis.ts (client-only)
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
Tanpa baris ini, `pin` di `<Gameplay />` akan terasa "double scroll" atau lompat-lompat karena Lenis dan GSAP punya raf loop masing-masing.

---

## 10. Aksesibilitas

- Kontras semua pasangan teks/background di §2 dan §3 dokumen Design System sudah dicek minimal WCAG AA (4.5:1 untuk teks body) — verifikasi ulang begitu tint karakter aktif, karena warna aksen menimpa elemen teks di beberapa tempat.
- `MemoryMap` harus tetap bisa dioperasikan via keyboard (`tabIndex`, `onKeyDown` Enter/Space) — bukan cuma `onClick`, karena node representasinya bukan elemen `<a>`/`<button>` native.
- Saat `layer` berubah dari `reality` ke `dive`, tambahkan `aria-live="polite"` singkat (mis. teks tersembunyi "Memasuki alam pikiran") untuk pengguna screen reader, karena perubahan visual total tidak terbaca otomatis oleh assistive tech.
- `DiveCursor` murni dekoratif — pastikan `aria-hidden="true"` supaya tidak mengganggu navigasi screen reader.

---

## 11. SEO & Meta Dasar

Di `app/layout.tsx`:
```ts
export const metadata = {
  title: "MENYELAM — A Space for the Unbound Showcase",
  description: "Jelajahi kekuatan SpaceDive dan selami ingatan Atma, Raya, dan Nirmala. Fan-made showcase untuk lomba IT FEST UNW 2026.",
  openGraph: { images: ["/assets/og-image.jpg"] },
};
```
`og-image.jpg` harus aset orisinal tim (lihat `06_manifest_aset.md`), bukan screenshot resmi yang belum jelas izin pakainya untuk thumbnail sharing.

---

## 12. Checklist QA Teknis (melengkapi Prompt 10)

- [ ] `DiveTransition` diuji di perangkat mid-range asli (bukan hanya resize browser desktop)
- [ ] `prefers-reduced-motion` diuji dengan setting aktif di OS, bukan cuma dibaca dari kode
- [ ] `DiveCursor` dipastikan mati di device dengan `ontouchstart`
- [ ] Kontras teks di setiap tint karakter (Atma/Raya/Nirmala) dicek ulang, bukan cuma warna default
- [ ] `PersistentBuyButton` tidak bertabrakan dengan ikon collapsed `MemoryMap` di mobile (lihat §7)
- [ ] Lighthouse mobile: Performance ≥ 80, Accessibility ≥ 90 sebagai target minimum submission
- [ ] Semua `href="#"` di `platforms.ts` diganti link store resmi sebelum submit final

---

## 13. Environment & Deployment

- Tidak ada backend/database — seluruh konten statis di `content/`. Tidak perlu file `.env` kecuali nanti ditambahkan `NEXT_PUBLIC_YOUTUBE_TRAILER_ID` untuk modal trailer.
- Deploy ke Vercel, hubungkan repo GitHub publik (sesuai dokumen Design System §9). Aktifkan preview deployment per pull request supaya tiap section bisa direview terpisah sebelum merge ke `main`.
