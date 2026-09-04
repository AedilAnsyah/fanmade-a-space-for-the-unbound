import type { Metadata } from "next";
import { Silkscreen, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fanmade-asftu.vercel.app"),
  title: "A Space for the Unbound — Fan-Made Showcase | IT FEST UNW 2026",
  description:
    "Website showcase interaktif fan-made untuk game petualangan naratif legendaris 'A Space for the Unbound' karya Mojiken Studio & Toge Productions. Dibuat untuk Lomba Web Development IT FEST UNW 2026.",
  keywords: [
    "A Space for the Unbound",
    "Mojiken Studio",
    "Toge Productions",
    "IT FEST UNW 2026",
    "Game Indonesia",
    "Web Development",
    "Pixel Art",
    "Atma",
    "Raya",
  ],
  authors: [{ name: "Tim Web Dev IT FEST UNW 2026" }],
  openGraph: {
    title: "A Space for the Unbound — Fan Showcase",
    description: "Dua remaja, satu kota kecil, dan kekuatan yang bisa menembus ingatan.",
    url: "https://fanmade-asftu.vercel.app",
    siteName: "A Space for the Unbound Showcase",
    images: [
      {
        url: "/assets/images/characters/duo_01_atma_raya.webp",
        width: 1200,
        height: 630,
        alt: "Atma dan Raya A Space for the Unbound",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${silkscreen.variable} ${plusJakartaSans.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="bg-bg-primary text-text-main antialiased selection:bg-brand-secondary selection:text-brand-primary">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
