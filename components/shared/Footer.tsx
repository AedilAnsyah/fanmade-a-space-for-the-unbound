"use client";

import { BookOpen, ArrowUp, ExternalLink, Heart, Gamepad2 } from "lucide-react";
import { useLayer } from "@/components/layer/useLayer";

export function Footer() {
  const { layer, exitDive } = useLayer();
  const isReality = layer === "reality";

  const scrollToSection = (id: string) => {
    if (id === "home") {
      if (layer === "dive") {
        exitDive();
      }
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative w-full overflow-hidden border-t transition-colors duration-700 select-none"
      style={{
        backgroundColor: isReality ? "#EDE2CF" : "#060913",
        borderColor: isReality ? "rgba(140, 123, 101, 0.3)" : "rgba(108, 99, 255, 0.2)",
        color: isReality ? "#2B2018" : "#E2E8F0",
      }}
    >
      {/* Ambient Top Glow Line */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background: isReality
            ? "linear-gradient(90deg, transparent, rgba(179,58,58,0.5), transparent)"
            : "linear-gradient(90deg, transparent, var(--dive-accent), transparent)",
        }}
      />

      {/* Retro 90s Pixel Stars in Dive mode */}
      {!isReality && (
        <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
          <div className="absolute top-8 left-[10%] h-1 w-1 bg-white animate-pulse" />
          <div className="absolute top-16 right-[15%] h-1.5 w-1.5 bg-blue-300 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-12 left-[30%] h-1 w-1 bg-purple-300 animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-20 right-[35%] h-1.5 w-1.5 bg-amber-200 animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Story Synopsis (Cols 1-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg p-1.5 shadow-md transition-transform hover:scale-110"
                style={{
                  backgroundColor: isReality ? "rgba(179,58,58,0.15)" : "rgba(255,255,255,0.1)",
                  border: isReality ? "1px solid rgba(179,58,58,0.3)" : "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <img
                  src="/assets/logo_trimmed.webp"
                  alt="Logo A Space for the Unbound"
                  className="h-full w-full object-contain filter drop-shadow"
                />
              </div>
              <div>
                <span
                  className="font-dive-heading text-lg font-bold tracking-widest leading-none block"
                  style={{ color: isReality ? "#2B2018" : "#ffffff" }}
                >
                  MENYELAM
                </span>
                <span
                  className="font-dive-body text-[10px] uppercase tracking-[0.2em] text-dive-text-muted"
                >
                  A Space for the Unbound Showcase
                </span>
              </div>
            </div>

            <p className="font-dive-body text-xs sm:text-sm text-dive-text-muted leading-relaxed max-w-md">
              Sebuah persembahan interaktif fan-made untuk mengapresiasi mahakarya game Indonesia karya Mojiken Studio &amp; Toge Productions. Merajut kembali memori, kehangatan masa SMA, dan keajaiban kota kecil di era akhir 90-an.
            </p>

            {/* Poetic quote */}
            <div
              className="mt-1 p-3 rounded-lg border text-xs italic font-serif"
              style={{
                backgroundColor: isReality ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.6)",
                borderColor: isReality ? "rgba(140,123,101,0.2)" : "rgba(255,255,255,0.08)",
                color: isReality ? "#5C4A35" : "#94A3B8",
              }}
            >
              &ldquo;Di antara riak air dan lembaran buku merah, ingatan kita tak pernah benar-benar hilang.&rdquo;
            </div>
          </div>

          {/* Col 3: Navigasi Halaman */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-dive-heading text-xs uppercase tracking-widest font-bold"
              style={{ color: isReality ? "#B33A3A" : "var(--dive-accent)" }}
            >
              Navigasi Halaman
            </h3>
            <ul className="flex flex-col gap-2 font-dive-body text-xs sm:text-sm text-dive-text-muted">
              {[
                { id: "home", label: "Beranda & Meja Belajar" },
                { id: "prologue", label: "Sinopsis Cerita" },
                { id: "trailer", label: "Trailer TV Tabung 90-an" },
                { id: "characters", label: "Karakter Kota Loka" },
                { id: "gameplay", label: "Buku Catatan Merah" },
                { id: "news", label: "Warta Loka (Berita)" },
                { id: "playnow", label: "Dapatkan Game Ini" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="transition-colors hover:text-white hover:underline text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="opacity-40">&bull;</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform Game Resmi */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-dive-heading text-xs uppercase tracking-widest font-bold"
              style={{ color: isReality ? "#B33A3A" : "var(--dive-accent)" }}
            >
              Platform Resmi
            </h3>
            <ul className="flex flex-col gap-2 font-dive-body text-xs sm:text-sm text-dive-text-muted">
              {[
                { name: "Steam (PC)", href: "https://store.steampowered.com/app/633030/A_Space_For_The_Unbound/" },
                { name: "PlayStation Store", href: "https://store.playstation.com/concept/10003058" },
                { name: "Nintendo Switch eShop", href: "https://www.nintendo.com/store/products/a-space-for-the-unbound-switch/" },
                { name: "Xbox Series X|S", href: "https://www.xbox.com/games/store/a-space-for-the-unbound/9n4h49fl89sl" },
                { name: "iOS App Store", href: "https://apps.apple.com/" },
              ].map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white hover:underline"
                  >
                    <Gamepad2 className="h-3.5 w-3.5 opacity-60" />
                    <span>{p.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Pengembang & Komunitas */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-dive-heading text-xs uppercase tracking-widest font-bold"
              style={{ color: isReality ? "#B33A3A" : "var(--dive-accent)" }}
            >
              Kreator & Pengembang
            </h3>
            <ul className="flex flex-col gap-2 font-dive-body text-xs sm:text-sm text-dive-text-muted">
              {[
                { name: "Mojiken Studio", desc: "Developer (Surabaya)", href: "https://mojikenstudio.com" },
                { name: "Toge Productions", desc: "Publisher", href: "https://togeproductions.com" },
                { name: "Masdito Bachtiar", desc: "Original Soundtrack", href: "https://store.steampowered.com/app/633030/A_Space_For_The_Unbound/" },
              ].map((dev) => (
                <li key={dev.name}>
                  <a
                    href={dev.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transition-colors hover:text-white"
                  >
                    <div className="font-semibold flex items-center gap-1">
                      <span>{dev.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[11px] opacity-60">{dev.desc}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Back to top button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-dive-heading text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                style={{
                  backgroundColor: isReality ? "#EFE6D1" : "rgba(30, 41, 59, 0.7)",
                  borderColor: isReality ? "rgba(140, 123, 101, 0.3)" : "rgba(255, 255, 255, 0.15)",
                  color: isReality ? "#2B2018" : "#EDEBFA",
                }}
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px w-full"
          style={{
            backgroundColor: isReality ? "rgba(140, 123, 101, 0.2)" : "rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* Bottom Bar: Copyright & Competition info */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-[11px] font-dive-body text-dive-text-muted/60">
          <div className="flex flex-col gap-1">
            <p>
              &copy; {new Date().getFullYear()} MENYELAM &bull; Dibuat untuk Lomba Web Development IT FEST UNW 2026.
            </p>
            <p>
              Proyek fan-made non-komersial. Seluruh hak cipta game &ldquo;A Space for the Unbound&rdquo; dimiliki oleh Mojiken Studio &amp; Toge Productions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-dive-text-muted/70">
            <span>Dibuat dengan</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>untuk Game Indie Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
