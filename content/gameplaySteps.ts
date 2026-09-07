export interface GameplayStep {
  order: number;
  title: string;
  subtitle: string;
  description: string;
  loreDetail: string;
  image: string;
  tag: string;
  controlsHint: string;
}

export const gameplaySteps: GameplayStep[] = [
  {
    order: 1,
    title: "Jelajah & Temukan",
    subtitle: "Sudut Kota Loka yang Penuh Cerita",
    description: "Bersepeda melintasi gang-gang sempit, menyapa tetangga yang sedang mengobrol di teras, membeli permen di warung kelontong, dan mengelus kucing liar yang berkeliaran.",
    loreDetail: "Setiap warga memiliki kegelisahan yang terpendam. Perhatikan perubahan perilaku mereka untuk menemukan siapa yang membutuhkan pertolongan.",
    image: "/assets/step-1.jpg",
    tag: "Eksplorasi Kota 90-an",
    controlsHint: "[A/D] Gerak • [E] Interaksi • [Space] Lompat",
  },
  {
    order: 2,
    title: "Membuka Buku & Menyelam",
    subtitle: "Mekanik Inti 'Spacedive'",
    description: "Dekati seseorang yang diselimuti kabut kecemasan. Buka Buku Catatan Merah ajaibmu untuk meretakkan tirai realitas dan terjun ke dalam alam bawah sadar mereka.",
    loreDetail: "Dunia di dalam pikiran mereka adalah manifestasi surealis dari memori, penyesalan masa lalu, dan ketakutan yang belum pernah mereka utarakan.",
    image: "/assets/step-2.jpg",
    tag: "Aktivasi Spacedive",
    controlsHint: "[Q] Buka Buku Merah • Tahan untuk Menyelam",
  },
  {
    order: 3,
    title: "Pecahkan Teka-Teki Batin",
    subtitle: "Menyusun Fragmen Memori yang Hilang",
    description: "Selesaikan puzzle lingkungan, temukan simbol masa lalu, dan kalahkan wujud trauma yang menghalangi jalan keluar dengan logika dan empati.",
    loreDetail: "Bukan dengan kekerasan, melainkan dengan memahami akar kesedihan mereka dan mengembalikan objek kenangan yang bermakna.",
    image: "/assets/step-3.jpg",
    tag: "Teka-teki Surealis",
    controlsHint: "[Mouse/Tombol] Padukan Objek & Pecahkan Simpul",
  },
  {
    order: 4,
    title: "Kembali & Merajut Luka",
    subtitle: "Kenyataan yang Perlahan Berubah",
    description: "Bawa mereka kembali ke dunia nyata. Wajah mereka kini lebih tenang, beban berat di pundak terangkat, dan sebuah ikatan baru terjalin di kota Loka.",
    loreDetail: "Setiap hati yang kau sembuhkan akan membuka petunjuk baru mengenai kekuatan supranatural Raya dan takdir kota yang di ambang bencana.",
    image: "/assets/step-4.jpg",
    tag: "Katarsis & Harapan",
    controlsHint: "[Esc/Tab] Catat Perkembangan di Jurnal",
  },
];

export const riftDiveEasterEgg =
  "Di titik tertentu cerita, kekuatan psikis Raya melipatgandakan Spacedive menjadi RiftDive — melompati retakan dimensi ruang dan waktu antara masa lalu dan masa depan kota Loka. Temukan rahasia ini saat menjelajahi babak akhir.";

