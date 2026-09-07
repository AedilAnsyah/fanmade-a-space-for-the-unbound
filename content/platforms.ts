export interface PlatformLink {
  name: "Steam" | "PlayStation" | "Xbox" | "Nintendo Switch" | "iOS" | "Android";
  href: string;
  icon: string; // react-icons/fa icon name
}

export const platforms: PlatformLink[] = [
  {
    name: "Steam",
    href: "https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/",
    icon: "FaSteam",
  },
  {
    name: "PlayStation",
    href: "https://www.playstation.com/en-id/games/a-space-for-the-unbound/",
    icon: "FaPlaystation",
  },
  {
    name: "Xbox",
    href: "https://www.xbox.com/id-ID/games/store/a-space-for-the-unbound/9pg2rz8gvzcj",
    icon: "FaXbox",
  },
  {
    name: "Nintendo Switch",
    href: "https://www.nintendo.com/us/store/products/a-space-for-the-unbound-switch/?srsltid=AfmBOoqnp3GVxZoEK1ZKCCrptqnicihk4Xv3NAev3ncwfYF4KTNU6QtY",
    icon: "FaGamepad",
  },
  {
    name: "iOS",
    href: "https://apps.apple.com/id/app/a-space-for-the-unbound/id6544796348",
    icon: "FaApple",
  },
  {
    name: "Android",
    href: "https://play.google.com/store/apps/details?id=com.mojiken.space&hl=id",
    icon: "FaGooglePlay",
  },
];
