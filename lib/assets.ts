/**
 * GAME_ASSETS & ASSETS - Master Asset Registry for "A Space for the Unbound"
 * Cleanly categorized asset paths, metadata, and aspect ratios to ensure
 * zero Cumulative Layout Shift (CLS: 0) and handcrafted diegetic presentation.
 */

export const GAME_ASSETS = {
  hero: {
    banner: "/images/screens/header_run.jpg", // Gambar 13
    polaroidFloat: "/images/group/trio_memory.jpg", // Gambar 1
    logo: "/images/logo_trimmed.webp",
  },
  characters: {
    atma: {
      default: "/images/characters/atma_bubblegum.jpg", // Gambar 11
      smiling: "/images/characters/atma_smile.jpg", // Gambar 10
      action: "/images/characters/atma_fallen.jpg", // Gambar 9
    },
    raya: {
      default: "/images/characters/raya_chill.jpg", // Gambar 5
      power: "/images/characters/raya_power.jpg", // Gambar 8
      bridgeGif: "/gifs/raya_bridge.gif", // GIF 6
    },
    nirmala: {
      dusk: "/images/characters/nirmala_dusk.jpg", // Gambar 6
      bridge: "/images/characters/nirmala_bridge.png", // Gambar 7
      laughGif: "/gifs/nirmala_laugh.gif", // GIF 8
    },
  },
  gameplayViewfinder: [
    {
      title: "Bioskop Tua Loka",
      gif: "/gifs/atma_raya_cinema.gif",
      tag: "REC [00:12:04]",
      time: "00:12:04",
      desc: "Menatap layar bioskop Megaria 21 bersama Raya di malam minggu.",
    }, // GIF 1
    {
      title: "Kucing Rongsokan",
      gif: "/gifs/cat_wonderland.gif",
      tag: "REC [00:23:19]",
      time: "00:23:19",
      desc: "Lulu si kucing belang bermain di tumpukan rongsokan TV tabung.",
    }, // GIF 2
    {
      title: "Sore di Taman",
      gif: "/gifs/newspaper_park.gif",
      tag: "REC [00:45:02]",
      time: "00:45:02",
      desc: "Kliping koran tersapu angin sore di bangku taman kota Loka.",
    }, // GIF 4
    {
      title: "Kentongan Pos Ronda",
      gif: "/gifs/kentongan_hit.gif",
      tag: "REC [01:02:11]",
      time: "01:02:11",
      desc: "Suara gema ketukan kayu bambu di malam jaga siskamling RT 03.",
    }, // GIF 7
  ],
  spacediveRifts: [
    {
      title: "Konflik Batin",
      img: "/images/screens/street_brawl.jpg",
      mood: "Tegang",
      desc: "Pertarungan emosi melawan manifestasi kecemasan di gang sempit Loka.",
    }, // Gambar 20
    {
      title: "Monster Fantasi",
      img: "/images/screens/winged_cat_monster.webp",
      mood: "Surealis",
      desc: "Manifestasi trauma bawah sadar yang berwujud monster kucing raksasa bersayap.",
    }, // Gambar 27
    {
      title: "Penelusuran Memori",
      img: "/images/screens/item_search.jpg",
      mood: "Misteri",
      desc: "Menembus kabut kegelapan mencari barang peninggalan masa lalu.",
    }, // Gambar 18
  ],
  newsClippings: {
    school: "/images/screens/school_life.jpg", // Gambar 25
    bridge: "/images/screens/bridge_view.png", // Gambar 31
  },
  cartridgeCovers: {
    cassetteCover: "/images/screens/lake_happy.jpg", // Gambar 28
  },
} as const;

/**
 * ASSETS - Convenient shorthand alias with direct character mappings:
 * ASSETS.atma, ASSETS.raya, ASSETS.nirmala
 */
export const ASSETS = {
  ...GAME_ASSETS,
  atma: GAME_ASSETS.characters.atma,
  raya: GAME_ASSETS.characters.raya,
  nirmala: GAME_ASSETS.characters.nirmala,
} as const;

export type GameAssetsType = typeof GAME_ASSETS;
export type AssetsType = typeof ASSETS;

export default ASSETS;
