"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PixelIcon from "@/components/ui/PixelIcon";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface NavbarProps {
  onOpenTrailer: () => void;
}

export default function Navbar({ onOpenTrailer }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ["home", "characters", "gameplay", "news", "play"];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/90 backdrop-blur-md border-b border-brand-secondary/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-gradient-to-b from-bg-primary/90 via-bg-primary/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-3 group cursor-pointer focus:outline-none"
        >
          <div className="h-10 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(127,231,216,0.5)] shrink-0">
            <img
              src="/assets/images/logo_trimmed.webp"
              alt="A Space for the Unbound Logo"
              width={160}
              height={48}
              className="h-10 sm:h-12 w-auto max-h-12 max-w-[160px] object-contain brightness-110"
              style={{ maxHeight: "48px", width: "auto" }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm font-bold text-text-main tracking-wider group-hover:text-brand-primary transition-colors">
              A SPACE FOR THE UNBOUND
            </span>
            <span className="text-[9px] sm:text-[10px] font-sans text-brand-accent tracking-widest uppercase">
              Fan Showcase • IT FEST UNW 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? "text-brand-primary bg-brand-primary/10 border border-brand-primary/40 shadow-[0_0_10px_rgba(244,201,93,0.2)]"
                    : "text-text-muted hover:text-text-main hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={onOpenTrailer}
            icon={<PixelIcon name="play" size={14} />}
            className="hidden sm:inline-flex"
          >
            Trailer
          </Button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-main hover:bg-white/10 transition-colors border border-white/10"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <PixelIcon name="close" size={18} /> : <PixelIcon name="menu" size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-secondary/95 backdrop-blur-xl border-b border-brand-secondary/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-text-main hover:bg-white/10 hover:text-brand-primary transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-brand-accent font-display">→</span>
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 mt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrailer();
                }}
                icon={<PixelIcon name="play" size={16} />}
                className="w-full"
              >
                Tonton Trailer Resmi
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
