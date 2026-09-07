# KONSEP & BRIEF — "MENYELAM" (SpaceDive Website Experience)
**Website Showcase "A Space for the Unbound" — Lomba Web Development IT FEST UNW 2026**

---

## 0. Koreksi Fakta Penting (dari versi dokumen sebelumnya)

Dokumen versi awal salah menyebut siapa pemilik kekuatan "menyelam". Setelah dicek ulang dari beberapa review resmi:

- **Atma** (bukan Raya) yang menemukan **buku merah ajaib** dan mendapat kekuatan **"SpaceDive"** — menyelam ke dalam pikiran/ingatan orang lain untuk membantu mereka menghadapi trauma lewat puzzle.
- **Raya**, pacar Atma, ternyata juga punya kekuatan supernatural sendiri — terungkap belakangan di cerita, jadi salah satu misteri utama.
- **Nirmala** adalah teman lama Atma dari mimpi masa kecil mereka, partner menulis cerita yang belum selesai — karakter penting ketiga yang sebaiknya ikut ditampilkan (film/promosi resminya juga sering menonjolkan trio ini, bukan cuma Atma & Raya).
- Kota tempat cerita berlangsung: **Loka**, desa kecil di Indonesia akhir era 90-an.
- Ada juga mekanik lanjutan bernama **"RiftDive"** (menyelam ke celah ruang-waktu) — bisa jadi easter egg copy di section Gameplay untuk pemain yang sudah tahu game-nya.

Semua dokumen di bawah ini sudah disesuaikan dengan fakta yang benar.

---

## 1. Kenapa Konsep Lama Terasa "AI Slop"

Masalah utama versi sebelumnya: struktur generik "Hero → Card grid → Timeline → Button grid" adalah pola template landing page kompetitif yang sudah terlalu sering dipakai di mana-mana — starfield background, feature card 2x2, palette dipilih dari mood board tanpa keterikatan konsep. Tidak ada satu pun elemen yang **hanya masuk akal untuk game ini secara spesifik**.

Perbaikannya bukan soal "tambah animasi lagi", tapi soal **satu ide sentral yang menentukan segalanya** — struktur, transisi, palet, bahkan copywriting — sehingga tidak bisa ditempel begitu saja ke game lain.

---

## 2. Big Idea: Website Ini = Sebuah Ruang Selam

> **Pengunjung tidak "membaca tentang" Atma menyelam ke pikiran orang — pengunjung ikut menyelam.**

Struktur website dibagi jadi dua **lapisan/state**, bukan lima section yang berdiri sendiri-sendiri:

| Lapisan | Representasi | Section Juknis yang Masuk di Sini |
|---|---|---|
| **REALITY** (dunia nyata) | Hangat, siang/senja, tekstur kertas tua, seperti membuka album foto lama | **Home** |
| **DIVE** (dunia pikiran/alam bawah sadar) | Dingin, gelap, glowing, melayang, seperti masuk ke dalam ingatan | **Character, Gameplay, News, Play Now** |

Transisi dari REALITY ke DIVE dipicu oleh satu aksi sentral: **"Buka Buku Merah"** — bukan sekadar tombol "Scroll Down" biasa. Ini jadi momen pertama yang membedakan situs ini dari 99% landing page game lain.

Begitu masuk ke lapisan DIVE, navigasi antar section juga tidak berupa navbar horizontal biasa, tapi **peta ingatan (memory map)** — node-node kecil yang saling terhubung seperti rasi bintang/jaringan saraf, merepresentasikan orang-orang yang bisa "diselami" Atma. Ini realisasi visual dari mekanik SpaceDive itu sendiri, bukan navbar generik yang di-skin ulang warnanya.

---

## 3. Prinsip Desain (yang menjaga konsep tetap konsisten, bukan sekadar dekorasi)

1. **Satu warna penghubung**: merah buku (`#B33A3A`-ish) muncul konsisten di KEDUA lapisan — satu-satunya warna yang "ikut" pengunjung dari dunia nyata ke dunia pikiran. Ini simbol visual dari buku merah itu sendiri.
2. **Tipografi ikut berubah** antar lapisan: font di REALITY terasa seperti tulisan tangan/jurnal lama; font di DIVE lebih bersih & geometris, seperti "versi ingatan yang sudah diproses". Perubahan font ini sendiri jadi sinyal halus bahwa pengunjung sudah "berpindah dunia" — bukan cuma ganti warna background.
3. **Kursor berubah bentuk** saat masuk lapisan DIVE (jadi titik cahaya dengan jejak partikel) — detail kecil tapi memorable, murah untuk di-build, besar dampaknya ke rasa "imersif" yang diminta.
4. **Setiap karakter (Atma, Raya, Nirmala) punya tint warna sendiri** saat "diselami" — bukan cuma foto beda, tapi seluruh section berubah suasana warnanya, meniru gagasan bahwa pikiran tiap orang punya "rasa" berbeda.
5. **Gameplay dijelaskan lewat step alur SpaceDive yang sebenarnya** (Temukan → Menyelam → Pecahkan → Kembali), bukan daftar fitur generik — jadi copy sekaligus mengedukasi calon pembeli soal gameplay loop asli.
6. **News difaramakan sebagai "gaung dari permukaan"** yang menembus ke dalam dunia DIVE — penghargaan & rilis platform terasa seperti sinyal dari dunia nyata yang bocor ke alam bawah sadar, bukan blog post biasa.
7. **Play Now = titik keluar ("Kembali ke Permukaan")** — secara naratif ini momen penutup perjalanan situs sekaligus CTA pembelian, jadi ajakan beli terasa seperti bagian dari cerita, bukan iklan yang tiba-tiba muncul.

---

## 4. Tujuan Bisnis Website (tetap harus eksplisit, jangan sampai tenggelam oleh konsep)

Website ini adalah alat **promosi**, bukan portofolio seni semata. Setiap keputusan desain harus tetap mengarah ke satu hal: **membuat pengunjung penasaran dengan cerita game ini sampai mau membeli/main game aslinya.**

Artinya:
- Copywriting harus **informatif dan padat**, bukan puitis berlebihan yang malah bikin orang bingung game-nya tentang apa.
- CTA pembelian (**Play Now / Kembali ke Permukaan**) harus tetap mudah ditemukan kapan saja — jangan sampai konsep "menyelam" membuat tombol beli tersembunyi atau butuh effort besar untuk ditemukan.
- Interaktivitas dipakai untuk **memperkuat rasa penasaran terhadap cerita**, bukan sekadar pamer animasi teknis.

---

## 5. Catatan Kurasi Aset Visual (penting — dari file "Aset A Space for the Unbound.docx")

File aset yang sudah dikumpulkan berisi campuran sumber dengan tingkat keamanan hak cipta yang **berbeda-beda**:

| Kategori Sumber | Tingkat Aman | Saran Pakai |
|---|---|---|
| Screenshot resmi dari CDN Steam (`shared.fastly.steamstatic.com`), header game resmi | Relatif aman untuk konteks review/showcase fan-made dengan kredit, karena ini materi marketing resmi dari halaman store | Boleh dipakai secukupnya di section Gameplay/News sebagai referensi visual, **selalu cantumkan kredit "Source: Steam / Toge Productions"** |
| GIF dari blog resmi togeproductions.com | Ini konten pertama (first-party) dari publisher sendiri, biasanya memang dipublikasikan untuk keperluan press/promosi | Paling aman dipakai, tetap kredit sumber |
| Trailer YouTube resmi | Aman — sematkan via **embed**, jangan diunduh ulang | Dipakai untuk modal trailer di Hero |
| Repost dari wallpaperaccess.com, Pinterest, Tenor, ArtStation | **Provenance tidak jelas** — banyak situs semacam ini me-repost tanpa izin dari sumber asli, atau memuat fan art pihak ketiga yang punya hak ciptanya sendiri | **Hindari sebagai aset visual utama.** Boleh dipakai sebagai referensi mood/riset internal tim saja, bukan untuk ditampilkan langsung di website final |

**Rekomendasi paling aman:** jadikan link-link ini sebagai *referensi visual* untuk membuat ilustrasi/pixel art orisinal versi tim sendiri (lihat dokumen Design System bagian aset), bukan sumber gambar yang ditempel langsung — ini juga yang paling sesuai dengan larangan Juknis poin D.5 & D.11.

---

## 6. Checklist Kepatuhan Juknis (tetap berlaku, sudah dipetakan ke konsep baru)

- [ ] Tema "Immersive Gaming Experience Through Web Technology" — **terpenuhi lebih kuat** karena immersivitas jadi konsep inti, bukan tempelan
- [ ] Showcase/promosi game, bukan game itu sendiri — CTA jelas ke store resmi
- [ ] Stack bebas CMS/template premium
- [ ] Responsif desktop/tablet/smartphone (termasuk fallback: transisi "dive" disederhanakan di mobile demi performa, lihat dokumen Rancangan Teknis)
- [ ] 5 section wajib tetap ada, dipetakan ke 2 lapisan (REALITY: Home; DIVE: Character, Gameplay, News, Play Now)
- [ ] Unsur interaktif: dive transition, custom cursor, memory-map navigation, character tint switching, scroll-driven step reveal
- [ ] Bebas SARA/pornografi/kekerasan berlebihan
- [ ] Footer & credit disclaimer fan-made project tetap ada