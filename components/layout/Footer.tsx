import React from "react";
import PixelIcon from "@/components/ui/PixelIcon";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070B1A] border-t border-brand-secondary/30 pt-16 pb-12 overflow-hidden text-text-muted">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Synopsis */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto flex items-center justify-center shrink-0">
                <img
                  src="/assets/images/logo_trimmed.webp"
                  alt="A Space for the Unbound Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto max-h-10 max-w-[140px] object-contain brightness-110 drop-shadow-[0_0_12px_rgba(127,231,216,0.5)]"
                  style={{ maxHeight: "40px", width: "auto" }}
                />
              </div>
              <span className="font-display text-base font-bold text-text-main tracking-wider">
                A SPACE FOR THE UNBOUND
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-md">
              Sebuah petualangan magis di pedesaan Indonesia era 90-an karya Mojiken Studio dan Toge Productions.
              Website showcase ini dirancang khusus untuk Lomba Web Development IT FEST UNW 2026.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-accent font-mono">
              <span>Tema:</span>
              <span className="text-text-main">“Immersive Gaming Experience Through Web Technology”</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="font-display text-xs uppercase tracking-widest text-text-main">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-brand-primary transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Link Resmi Developer */}
          <div className="space-y-3">
            <h4 className="font-display text-xs uppercase tracking-widest text-text-main">
              Tautan Resmi Game
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Halaman Steam</span>
                  <PixelIcon name="external" size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.togeproductions.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Toge Productions</span>
                  <PixelIcon name="external" size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://mojiken.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Mojiken Studio</span>
                  <PixelIcon name="external" size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Wajib Juknis Bagian D.11 & Fan-Made Rubber Stamp */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-muted leading-relaxed">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            {/* Rubber Stamp Fan-Made */}
            <div className="inline-block px-3 py-1 rounded border-2 border-dashed border-red-500/70 bg-red-950/20 text-red-300 font-mono text-[11px] font-bold uppercase tracking-wider rotate-[-2deg] mb-2">
              ★ STEMPEL RESMI: KARYA TRIBUT FAN-MADE NON-KOMERSIAL ★
            </div>
            <p className="font-medium text-text-main/90">
              Disclaimer Hak Cipta & Ketentuan Lomba IT FEST UNW 2026:
            </p>
            <p>
              Website showcase interaktif ini dirancang murni sebagai karya apresiasi seni dan teknologi untuk kompetisi Web Development IT FEST UNW 2026, bukan merupakan situs komersial atau representasi resmi korporasi.
            </p>
            <p>
              Seluruh aset grafis, kekayaan intelektual, nama karakter (Atma, Raya, Nirmala), dan semesta <em>“A Space for the Unbound”</em> adalah hak cipta mutlak <strong>Mojiken Studio</strong> dan <strong>Toge Productions</strong>.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
            <span className="font-mono text-[10px] text-brand-primary/80">
              KOTA LOKA 1999 • KARYA DARI HATI
            </span>
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-bg-secondary border border-brand-secondary/40 text-text-main hover:bg-brand-primary hover:text-bg-primary hover:border-brand-primary transition-all shadow-lg group flex items-center gap-2 text-xs font-display"
              aria-label="Kembali ke atas"
            >
              <span>MENUJU LANGIT</span>
              <PixelIcon name="arrow_up" size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
