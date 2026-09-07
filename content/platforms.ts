export interface PlatformLink {
  name: "Steam" | "PlayStation" | "Xbox" | "Nintendo Switch" | "iOS";
  href: string;
  icon: string; // react-icons/fa icon name
}

export const platforms: PlatformLink[] = [
  { name: "Steam",           href: "#", icon: "FaSteam" },
  { name: "PlayStation",     href: "#", icon: "FaPlaystation" },
  { name: "Xbox",            href: "#", icon: "FaXbox" },
  { name: "Nintendo Switch", href: "#", icon: "FaGamepad" },
  { name: "iOS",             href: "#", icon: "FaApple" },
];
