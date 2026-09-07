export interface NewsItem {
  id: string;
  date: string;
  edition: string;
  category: "PENGHARGAAN" | "RILIS GLOBAL" | "KABAR KOTA";
  headline: string;
  text: string;
  quote?: string;
  awardBadge?: string;
  image: string;
  imageCaption: string;
  byline: string;
  location: string;
}

export const newsTimeline: NewsItem[] = [
  {
    id: "sea-awards-2020",
    date: "November 2020",
    edition: "Edisi Khusus No. 12/90",
    category: "PENGHARGAAN",
    headline: "Kisah Puitis dari Surabaya Sabet Best Storytelling Se-Asia Tenggara",
    text: "Sebelum peluncuran perdananya, petualangan Atma dan Raya telah memikat dewan juri Asia Tenggara lewat demo prolog yang mengharukan dan estetika pixel art memukau. Kisah persahabatan anak SMA di kota kecil Jawa Timur ini dinilai mampu merajut kehangatan lokal dengan kedalaman emosional kelas dunia.",
    quote: "“Sebuah karya adiluhung langka yang mengangkat kehangatan lokal Indonesia ke kancah global.”",
    awardBadge: "SEA Game Awards 2020 — Best Storytelling",
    image: "/assets/Gambar/Screens/gambar 1.jpg",
    imageCaption: "Senja temaram di atas jembatan sungai Kota Loka: Goresan pixel art Mojiken yang menghipnotis juri internasional.",
    byline: "Oleh: Redaktur Budaya & Hiburan",
    location: "Kuala Lumpur / Surabaya",
  },
  {
    id: "japan-award-2022",
    date: "September 2022",
    edition: "Warta Tokyo - Loka",
    category: "PENGHARGAAN",
    headline: "Sorotan dari Negeri Sakura: Boyong Penghargaan Future Division di Tokyo",
    text: "Di panggung bergengsi Makuhari Messe dalam helatan Tokyo Game Show, karya anak bangsa ini berhasil memukau publik Jepang dan dianugerahi Japan Game Award untuk divisi masa depan. Pesona pedesaan Indonesia era 90-an terbukti menyentuh rasa nostalgia universal para gamer lintas benua.",
    quote: "“Dunia 90-an yang begitu akrab, hangat, dan menggetarkan hati nurani para pemain.”",
    awardBadge: "Japan Game Awards 2022 — Future Division",
    image: "/assets/Gambar/Screens/gambar2.jpg",
    imageCaption: "Ruang kelas SMA berderit dan suasana nostalgia Kota Loka yang memukau ribuan pengunjung Tokyo Game Show.",
    byline: "Laporan Khusus Koresponden Asia",
    location: "Makuhari Messe, Tokyo",
  },
  {
    id: "global-launch-2023",
    date: "19 Januari 2023",
    edition: "Edisi Perdana Sedunia",
    category: "RILIS GLOBAL",
    headline: "Pintu Realitas Terbuka: Resmi Mengudara Lintas Konsol Dunia",
    text: "Hari bersejarah tiba. A Space for the Unbound resmi dirilis serentak di PC (Steam), PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, dan Nintendo Switch. Pujian kritis mengalir deras dari media raksasa internasional seperti IGN, Kotaku, dan Eurogamer yang memuji keberanian mengangkat isu luka batin.",
    quote: "“Sebuah mahakarya naratif yang takkan terlupakan. Wajib dimainkan.” — 9/10 IGN",
    awardBadge: "Rilis Multiplatform 2023 — Skor 9/10 IGN",
    image: "/assets/Gambar/Screens/gambar3.jpg",
    imageCaption: "Gedung Bioskop Rajawali dan jalanan aspal basah Kota Loka kini dijelajahi jutaan pemain di seluruh belahan bumi.",
    byline: "Warta Teknologi & Industri Kreatif",
    location: "Jakarta / London / Los Angeles",
  },
  {
    id: "the-game-awards-2023",
    date: "Desember 2023",
    edition: "Panggung Puncak Dunia",
    category: "PENGHARGAAN",
    headline: "Pencapaian Bersejarah: Mengguncang Panggung The Game Awards Los Angeles",
    text: "Mewakili industri game Indonesia untuk pertama kalinya dalam sejarah, A Space for the Unbound melenggang gagah sebagai nominasi resmi dalam kategori paling terhormat: Games for Impact. Panggung megah Peacock Theater bergemuruh saat cuplikan kota Loka diputar di hadapan ratusan juta pasang mata.",
    quote: "“Mengangkat isu kesehatan mental dan empati dengan kelembutan yang menyentuh sanubari.”",
    awardBadge: "Nominee The Game Awards 2023 — Games for Impact",
    image: "/assets/Gambar/Screens/gambar4.jpg",
    imageCaption: "Suasana dermaga dan keheningan malam Kota Loka yang mengantarkan game ini ke nominasi dunia.",
    byline: "Biro Khusus Hollywood",
    location: "Peacock Theater, Los Angeles",
  },
  {
    id: "mobile-launch-2025",
    date: "Awal 2025",
    edition: "Kabar Generasi Baru",
    category: "KABAR KOTA",
    headline: "Buku Catatan Ajaib Kini Hadir di Genggaman Layar Sentuh iOS",
    text: "Menjangkau lebih banyak hati di mana saja dan kapan saja. Petualangan Atma, Raya, dan kucing-kucing lucu Kota Loka resmi diluncurkan untuk platform mobile iOS (iPhone dan iPad). Kontrol sentuh intuitif memudahkan pemain membalik halaman Buku Merah dan menyelami pikiran warga.",
    quote: "“Kini kehangatan kota Loka dapat kamu bawa dalam saku celana setiap saat.”",
    awardBadge: "Rilis Mobile Global 2025 — App Store Feature",
    image: "/assets/Gambar/Screens/gambar6.jpg",
    imageCaption: "Kucing belang tiga menggemaskan dan interaksi hangat warga Loka yang kini hadir di layar iPhone.",
    byline: "Rubrik Sains & Perangkat Genggam",
    location: "Kota Loka / Global",
  },
  {
    id: "arsip-nostalgia-90an",
    date: "Agustus 1999",
    edition: "Lembar Kenangan Warga",
    category: "KABAR KOTA",
    headline: "Kisah Kasih Berseragam Putih-Abu di Tengah Kehangatan Kota Loka",
    text: "Menyusuri lorong sekolah berderit, bunyi dering telepon koin di bilik wartel, dan aroma kuah bakso gerobak mangkal. Di balik kehidupan damai kota kecil ini, tersimpan ikatan janji masa muda, impian masa depan, dan misteri retakan dimensi yang hanya bisa disembuhkan dengan saling mendengar.",
    quote: "“Beberapa memori tak pernah benar-benar lenyap; ia hanya menanti seseorang yang bersedia mendengarkan.”",
    awardBadge: "Arsip Kenangan Abadi Kota Loka",
    image: "/assets/Gambar/Screens/gambar7.jpg",
    imageCaption: "Deretan bangku sekolah dan jendela kayu kelas: Tempat mimpi-mimpi remaja dituliskan sebelum kelulusan.",
    byline: "Pojok Nostalgia & Catatan Harian",
    location: "SMA Negeri 1 Loka",
  },
];


