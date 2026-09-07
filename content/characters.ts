export type CharacterId = "atma" | "raya" | "nirmala";
export type TimeOfDay = "siang" | "sore" | "malam";

export interface Character {
  id: CharacterId;
  name: string;
  timeOfDay: TimeOfDay;
  timeLabel: string;
  timeSubtitle: string;
  role: string;
  quote: string;
  description: string;
  tintColor: string;
  secondaryColor: string;
  skyGradient: string;
  cardBg: string;
  imagePlaceholder: string;
  gifPlaceholder: string;
  traits: string[];
  memoryStatus: string;
}

export const characters: Character[] = [
  {
    id: "atma",
    name: "Atma",
    timeOfDay: "siang",
    timeLabel: "Waktu Siang",
    timeSubtitle: "Langit Biru Cerah & Terik Matahari",
    role: "Penjelajah Ingatan",
    quote: "Jika sebuah cerita belum selesai ditulis, apakah kita masih bisa mengubah akhirnya?",
    description:
      "Anak SMA yang lebih nyaman menulis daripada bicara. Di bawah teriknya langit biru cerah kota Loka, ia menemukan buku merah tua yang memberinya kemampuan aneh: menyelam ke dalam pikiran orang lain.",
    tintColor: "#FBBF24", // Vibrant Golden Sunlight
    secondaryColor: "#38BDF8", // Sky Blue
    skyGradient:
      "linear-gradient(180deg, #1D4ED8 0%, #2563EB 30%, #3B82F6 65%, #60A5FA 100%)",
    cardBg: "rgba(29, 78, 216, 0.75)",
    imagePlaceholder: "/assets/char-atma.webp",
    gifPlaceholder: "/assets/char-atma.gif",
    traits: ["SpaceDive", "Buku Merah", "Penulis Catatan", "Kota Loka Siang"],
    memoryStatus: "Menyelami Pikiran di Bawah Terik Siang",
  },
  {
    id: "raya",
    name: "Raya",
    timeOfDay: "sore",
    timeLabel: "Waktu Sore",
    timeSubtitle: "Lembayung Senja & Celah Dimensi",
    role: "Penyimpan Kekuatan Psikis",
    quote: "Dunia di luar sana terlalu bising... terkadang aku hanya ingin kita berdua menghilang sejenak.",
    description:
      "Pacar Atma. Di kala langit Loka beranjak senja keemasan dan lembayung ungu merekah, ia menyimpan kekuatan membelah realitas, dan luka masa lalu yang bahkan dia sendiri belum sepenuhnya pahami.",
    tintColor: "#FB923C", // Fiery Sunset Orange
    secondaryColor: "#C084FC", // Twilight Purple
    skyGradient:
      "linear-gradient(180deg, #3B0764 0%, #581C87 30%, #9A3412 65%, #EA580C 100%)",
    cardBg: "rgba(59, 7, 100, 0.80)",
    imagePlaceholder: "/assets/char-raya.jpg",
    gifPlaceholder: "/assets/char-raya.gif",
    traits: ["Manipulasi Realitas", "Penyayang Kucing", "Celah Dimensi", "Jembatan Senja"],
    memoryStatus: "Celah Realitas di Penghujung Senja",
  },
  {
    id: "nirmala",
    name: "Nirmala",
    timeOfDay: "malam",
    timeLabel: "Waktu Malam",
    timeSubtitle: "Rembulan, Bintang & Janji Terlupakan",
    role: "Kunci Cerita Masa Lalu",
    quote: "Cerita yang kita buat dulu belum selesai, Atma. Kamu belum lupa, kan?",
    description:
      "Teman masa kecil Atma yang hadir bagai mimpi di bawah gelapnya malam bertabur bintang. Kembalinya ia membuka rahasia dongeng yang belum pernah selesai mereka tulis bersama.",
    tintColor: "#F472B6", // Luminous Night Pink / Magenta
    secondaryColor: "#22D3EE", // Starlight Cyan
    skyGradient:
      "linear-gradient(180deg, #020617 0%, #0B1120 32%, #0F172A 68%, #1E1B4B 100%)",
    cardBg: "rgba(11, 17, 32, 0.84)",
    imagePlaceholder: "/assets/char-nirmala.webp",
    gifPlaceholder: "/assets/char-nirmala.gif",
    traits: ["Buku Dongeng Bersama", "Rembulan Mimpi", "Memori Terkunci", "Langit Berbintang"],
    memoryStatus: "Ingatan yang Tertidur di Malam Hari",
  },
];
