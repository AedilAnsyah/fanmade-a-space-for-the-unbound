export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  actionImg?: string;
  tagline: string;
  description: string;
  traits: string[];
  quote: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  badge: string;
}

export interface Milestone {
  year: string;
  date?: string;
  title: string;
  category: string;
  description: string;
  badge?: string;
}

export interface StorePlatform {
  name: string;
  category: string;
  url: string;
  badge: string;
  icon: string;
  highlight?: boolean;
}

export interface TrailerItem {
  id: string;
  title: string;
  localVideo: string;
  youtubeId: string;
  duration?: string;
  thumbnail: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Karakter", href: "#characters" },
  { label: "Gameplay", href: "#gameplay" },
  { label: "Linimasa", href: "#news" },
  { label: "Play Now", href: "#play" },
];

export const HERO_DATA = {
  title: "A SPACE FOR THE UNBOUND",
  subtitle: "Sebuah Karya Fan-Made Showcase untuk IT FEST UNW 2026",
  tagline: "Dua remaja, satu kota kecil, dan kekuatan yang bisa menembus ingatan.",
  lead: "Ikuti kisah Atma dan Raya di kota Loka — sebuah desa kecil Indonesia di penghujung era 90-an — saat mereka menghadapi akhir masa SMA sekaligus rahasia besar yang bisa mengubah dunia mereka selamanya.",
  awards: [
    { title: "Best Storytelling", org: "SEA Game Awards 2020" },
    { title: "Future Division Award", org: "Japan Game Awards 2022" },
    { title: "Nominee Games for Impact", org: "The Game Awards 2023" },
  ],
};

export const CHARACTERS_DATA: Character[] = [
  {
    id: "atma",
    name: "Atma",
    role: "Siswa SMA & Calon Penulis",
    avatar: "/assets/images/characters/atma_02_senyum.webp",
    actionImg: "/assets/images/characters/atma_01_jatuh.webp",
    tagline: "Pemuda tenang dengan hati penuh rasa ingin tahu",
    description:
      "Pelajar SMA biasa di kota Loka. Tenang, sedikit pendiam, tapi diam-diam menyimpan mimpi besar menjadi seorang penulis. Hidupnya yang sederhana berubah total saat ia menemukan buku catatan merah ajaib dan mulai memahami misteri besar yang disimpan oleh Raya.",
    traits: ["Penyayang Kucing", "Pendengar yang Baik", "Pemilik Buku Catatan Merah"],
    quote: "“Kisah ini belum selesai, Raya... Kita pasti bisa menyelesaikannya bersama.”",
  },
  {
    id: "raya",
    name: "Raya",
    role: "Kekasih Atma & Pemilik Kekuatan Spacedive",
    avatar: "/assets/images/characters/raya_01_steam.webp",
    actionImg: "/assets/images/characters/raya_03_power.webp",
    tagline: "Gadis ceria dengan kekuatan magis yang melampaui kenyataan",
    description:
      "Kekasih Atma yang tampak periang di luar, namun memikul beban emosional yang sangat berat. Memiliki kekuatan supernatural Spacedive untuk 'menyelam' ke dalam pikiran dan ingatan orang lain — anugerah magis yang datang dengan konsekuensi besar terhadap realitas kota Loka.",
    traits: ["Kekuatan Spacedive", "Penuh Imajinasi", "Misterius"],
    quote: "“Dunia ini seperti kertas gambar... Jika kita tidak menyukainya, bisakah kita menggambar ulang?”",
  },
];

export const SUPPORTING_CHARACTERS = [
  {
    name: "Nirmala",
    role: "Gadis Kecil Penuh Teka-teki",
    img: "/assets/images/characters/nirmala_01_senja.webp",
    desc: "Sosok misterius yang kerap muncul dalam visi Atma dengan senyuman dan teka-teki yang mengharukan.",
  },
  {
    name: "Kucing-kucing Loka",
    role: "Sahabat Sejati Atma",
    img: "/assets/gifs/gif_02_cat_wonderland.gif",
    desc: "Bisa diajak berinteraksi, diberi makan, dielus, hingga diberi nama unik sepanjang petualangan.",
  },
  {
    name: "Warga Kota Loka",
    role: "Keluarga & Tetangga 90-an",
    img: "/assets/images/scenes/scene_02_forest_dialog.webp",
    desc: "Mulai dari pedagang warung, guru sekolah, hingga tetangga dengan berbagai pergulatan batin manusiawi.",
  },
];

export const GAMEPLAY_FEATURES: Feature[] = [
  {
    id: "explore-loka",
    title: "Jelajahi Kota Loka",
    subtitle: "Nostalgia Indonesia Akhir 90-an",
    description:
      "Telusuri suasana pedesaan Jawa Timur yang autentik: jajan di warung kelontong, menabuh kentongan ronda, radio tape kaset, hingga pohon beringin yang rindang dengan visual pixel art buatan tangan yang memukau.",
    iconName: "MapPin",
    image: "/assets/images/scenes/scene_07_neighborhood.webp",
    badge: "Eksplorasi Dunia",
  },
  {
    id: "dive-mechanic",
    title: "Mekanik 'Spacedive'",
    subtitle: "Menyelam ke Alam Pikiran",
    description:
      "Gunakan buku catatan merah untuk masuk ke alam bawah sadar orang lain. Pecahkan teka-teki trauma batin, bantu warga mengatasi kecemasan, dan pulihkan ketenangan jiwa mereka dari kekacauan emosi.",
    iconName: "Sparkles",
    image: "/assets/images/scenes/scene_01_dark_item.webp",
    badge: "Mekanik Unik",
  },
  {
    id: "emotional-story",
    title: "Narasi Slice-of-Life yang Menyentuh",
    subtitle: "Kisah Tentang Tumbuh Dewasa & Harapan",
    description:
      "Sebuah narasi jujur dan berani yang membahas kesehatan mental, depresi, rasa bersalah, dan arti memaafkan diri sendiri, dikemas hangat dalam balutan realisme magis khas Asia Tenggara.",
    iconName: "HeartHandshake",
    image: "/assets/images/characters/duo_02_atma_raya.webp",
    badge: "Narasi Pemenang Penghargaan",
  },
  {
    id: "handcrafted-art",
    title: "Visual Pixel & Musik Sinematik",
    subtitle: "Mahakarya Mojiken Studio",
    description:
      "Setiap frame digambar dengan dedikasi tinggi oleh seniman Indonesia, diiringi aransemen soundtrack orisinal karya Masdito 'Ittou' Bachtiar yang emosional dan membekas di ingatan.",
    iconName: "Palette",
    image: "/assets/images/scenes/scene_03_combat.webp",
    badge: "Audio-Visual",
  },
];

export const TIMELINE_DATA: Milestone[] = [
  {
    year: "2020",
    title: "Best Storytelling Award",
    category: "Penghargaan",
    description:
      "Mendapatkan apresiasi tertinggi untuk kategori penceritaan terbaik di SEA Game Awards berkat narasi prolog yang begitu berkesan.",
    badge: "SEA Game Awards",
  },
  {
    year: "2022",
    title: "Future Division Award",
    category: "Tokyo Game Show",
    description:
      "Membawa nama industri game Indonesia ke kancah global dengan meraih penghargaan prestisius di Japan Game Awards.",
    badge: "Japan Game Awards",
  },
  {
    year: "2023",
    date: "19 Januari 2023",
    title: "Perilisan Global Multi-Platform",
    category: "Peluncuran",
    description:
      "Resmi dirilis serentak di PC (Steam), PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, dan Nintendo Switch dengan sambutan luar biasa dari kritikus dunia.",
    badge: "Global Launch",
  },
  {
    year: "2023",
    date: "Desember 2023",
    title: "Nominee 'Games for Impact'",
    category: "The Game Awards",
    description:
      "Masuk sebagai salah satu nominee di ajang 'Oscar'-nya industri game dunia (The Game Awards) untuk game yang memberikan dampak sosial dan emosional mendalam.",
    badge: "The Game Awards",
  },
  {
    year: "2025",
    title: "Ekspansi ke Platform iOS",
    category: "Ekspansi",
    description:
      "Memperluas jangkauan pemain ke perangkat seluler Apple (iPhone & iPad) sehingga cerita Atma dan Raya dapat dinikmati di mana saja.",
    badge: "Mobile Release",
  },
];

export const STORE_PLATFORMS: StorePlatform[] = [
  {
    name: "Steam (PC)",
    category: "Windows / macOS / Steam Deck",
    url: "https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/",
    badge: "Overwhelmingly Positive",
    icon: "steam",
    highlight: true,
  },
  {
    name: "PlayStation Store",
    category: "PS4 & PlayStation 5",
    url: "https://store.playstation.com/en-id/concept/10006764",
    badge: "DualSense Compatible",
    icon: "playstation",
  },
  {
    name: "Nintendo eShop",
    category: "Nintendo Switch (Handheld)",
    url: "https://www.nintendo.com/us/store/products/a-space-for-the-unbound-switch/",
    badge: "Best on Portable",
    icon: "nintendo",
  },
  {
    name: "Xbox Store",
    category: "Xbox One & Series X|S",
    url: "https://www.xbox.com/en-us/games/store/a-space-for-the-unbound/9n07zflm2787",
    badge: "Smart Delivery",
    icon: "xbox",
  },
  {
    name: "Apple App Store",
    category: "iPhone & iPad",
    url: "https://apps.apple.com/app/a-space-for-the-unbound/id6475765955",
    badge: "Touch & Controller",
    icon: "apple",
  },
];

export const TRAILERS_PLAYLIST: TrailerItem[] = [
  {
    id: "trailer_01_launch",
    title: "Official Launch Trailer",
    localVideo: "/assets/videos/trailer_01_launch.mp4",
    youtubeId: "8yGznOkpIGM",
    duration: "1:48",
    thumbnail: "/assets/images/scenes/scene_13_header_cover.webp",
  },
  {
    id: "trailer_02_release_date",
    title: "Release Date Announcement",
    localVideo: "/assets/videos/trailer_02_release_date.mp4",
    youtubeId: "_4yvH1x0Nlo",
    duration: "1:32",
    thumbnail: "/assets/images/characters/duo_01_atma_raya.webp",
  },
  {
    id: "trailer_03_prologue",
    title: "Prologue Chapter Trailer",
    localVideo: "/assets/videos/trailer_03_prologue.mp4",
    youtubeId: "QU50IxsWTn4",
    duration: "1:20",
    thumbnail: "/assets/images/scenes/scene_01_dark_item.webp",
  },
  {
    id: "trailer_04_nintendo_indie",
    title: "Nintendo Indie World Spotlight",
    localVideo: "/assets/videos/trailer_04_nintendo_indie.mp4",
    youtubeId: "eoUJi7aX9EQ",
    duration: "1:45",
    thumbnail: "/assets/images/scenes/scene_11_lake_joy.webp",
  },
  {
    id: "trailer_05_gameplay",
    title: "Official Gameplay Overview",
    localVideo: "/assets/videos/trailer_05_gameplay.mp4",
    youtubeId: "60M43B_-GwQ",
    duration: "1:15",
    thumbnail: "/assets/images/scenes/scene_03_combat.webp",
  },
  {
    id: "trailer_06_animated_teaser",
    title: "Animated Anime Teaser",
    localVideo: "/assets/videos/trailer_06_animated_teaser.mp4",
    youtubeId: "RH89oUUrXWU",
    duration: "1:30",
    thumbnail: "/assets/images/characters/nirmala_02_jembatan.webp",
  },
  {
    id: "trailer_07_music_story",
    title: "Music & Emotion Spotlight",
    localVideo: "/assets/videos/trailer_07_music_story.mp4",
    youtubeId: "TXv3dqZQlvs",
    duration: "3:40",
    thumbnail: "/assets/images/characters/duo_05_atma_raya.webp",
  },
];
