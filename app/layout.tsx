import type { Metadata } from "next";
import { Special_Elite, Lora, Pixelify_Sans, Plus_Jakarta_Sans, Caveat } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

/* ═══════════════════════════════════════════════════
 * GOOGLE FONTS — exposed as CSS variables
 *
 * REALITY layer : Special Elite (heading) + Lora (body)
 * DIVE layer    : Pixelify Sans (heading) + Plus Jakarta Sans (body)
 * ═══════════════════════════════════════════════════ */

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

/* ═══════════════════════════════════════════════════
 * METADATA
 * ═══════════════════════════════════════════════════ */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://menyelam.vercel.app"
  ),
  title: "Fanmade A Space for the Unbound",
  description:
    "Jelajahi kekuatan SpaceDive dan selami ingatan Atma, Raya, dan Nirmala. Fan-made showcase untuk A Space for the Unbound — game petualangan pixel art dari Mojiken Studio.",
  icons: {
    icon: [
      { url: "/assets/logo_trimmed.webp", type: "image/webp" },
      { url: "/assets/logo_transparent.webp", type: "image/webp" },
    ],
    shortcut: "/assets/logo_trimmed.webp",
    apple: "/assets/logo_trimmed.webp",
  },
  keywords: [
    "A Space for the Unbound",
    "Mojiken Studio",
    "Toge Productions",
    "pixel art",
    "game indie Indonesia",
    "SpaceDive",
    "Atma",
    "Raya",
    "fan-made",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Fanmade A Space for the Unbound",
    title: "Fanmade A Space for the Unbound",
    description:
      "Jelajahi kekuatan SpaceDive dan selami ingatan Atma, Raya, dan Nirmala.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fanmade A Space for the Unbound showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fanmade A Space for the Unbound",
    description:
      "Jelajahi kekuatan SpaceDive dan selami ingatan Atma, Raya, dan Nirmala.",
    images: ["/assets/og-image.jpg"],
  },
  other: {
    "theme-color": "#F4E9D8",
  },
};

/* ═══════════════════════════════════════════════════
 * ROOT LAYOUT
 * ═══════════════════════════════════════════════════ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${specialElite.variable} ${lora.variable} ${pixelifySans.variable} ${plusJakartaSans.variable} ${caveat.variable}`}
    >
      <body className="font-reality-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
