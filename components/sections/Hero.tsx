"use client";

import React, { useState, useEffect, useRef } from "react";
import RetroImage from "@/components/ui/RetroImage";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Starfield from "@/components/effects/Starfield";
import Button from "@/components/ui/Button";
import PixelIcon from "@/components/ui/PixelIcon";
import { HERO_DATA } from "@/lib/constants";
import { GAME_ASSETS } from "@/lib/assets";
import { createCassetteTapeAmbience, CassetteAmbienceController } from "@/lib/audio";

interface HeroProps {
  onOpenTrailer: () => void;
}

export default function Hero({ onOpenTrailer }: HeroProps) {
  const [currentTime, setCurrentTime] = useState("19:45:00 WIB");
  const [isPlayingAmbiance, setIsPlayingAmbiance] = useState(false);
  const ambienceControllerRef = useRef<CassetteAmbienceController | null>(null);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} WIB`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Cleanup audio controller on unmount
  useEffect(() => {
    return () => {
      if (ambienceControllerRef.current) {
        ambienceControllerRef.current.stop();
      }
    };
  }, []);

  // Web Audio API: Gerimis & Lo-Fi Vinyl Ambiance Synthesizer
  const toggleAmbiance = () => {
    if (!isPlayingAmbiance) {
      const controller = createCassetteTapeAmbience();
      if (controller.isPlaying()) {
        ambienceControllerRef.current = controller;
        setIsPlayingAmbiance(true);
      }
    } else {
      if (ambienceControllerRef.current) {
        ambienceControllerRef.current.stop();
        ambienceControllerRef.current = null;
      }
      setIsPlayingAmbiance(false);
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-bg-primary"
    >
      {/* 1. Deep Cosmic Starfield Canvas */}
      <Starfield className="opacity-95" />

      {/* 2. Atmospheric 90s City Silhouette & Lighting Overlays */}
      <div className="absolute inset-0 bg-radial-at-c from-brand-secondary/20 via-transparent to-bg-primary pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent pointer-events-none" />

      {/* 3. Retro 90s Diegetic Status Bar (HUD) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto mb-6">
        <div className="p-2 sm:p-2.5 rounded-xl bg-bg-secondary/70 border border-brand-secondary/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-accent">
              <PixelIcon name="clock" size={14} color="accent" />
              <span className="font-display tracking-wider text-[11px]">{currentTime}</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-brand-primary">
              <PixelIcon name="rain" size={14} color="primary" />
              <span>Loka: Gerimis Sore 90-an</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Audio Walkman Toggle */}
            <button
              onClick={toggleAmbiance}
              data-testid="toggle-ambience"
              aria-label={isPlayingAmbiance ? "Matikan suara ambiens kota Loka" : "Nyalakan suara ambiens kota Loka"}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all border ${
                isPlayingAmbiance
                  ? "bg-brand-accent/20 border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(127,231,216,0.4)] animate-pulse"
                  : "bg-white/5 border-white/10 text-text-muted hover:text-text-main"
              }`}
              title="Suara Gerimis & Ambiens Kota Loka"
            >
              <PixelIcon name={isPlayingAmbiance ? "volume_on" : "volume_off"} size={14} />
              <span>{isPlayingAmbiance ? "Ambiens: Play" : "Ambiens: Mute"}</span>
            </button>

            <span className="hidden md:flex items-center gap-1.5 text-[11px] text-dive-accent">
              <PixelIcon name="battery" size={14} color="dive" />
              <span>DIVE PWR: [■■■] 100%</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4. Asymmetrical Hero Layout Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Narrative Headline & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge Intro with Pixel Icon */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-brand-primary/15 border-2 border-brand-primary/40 text-brand-primary text-xs font-display tracking-widest uppercase mb-4 shadow-[3px_3px_0_0_#000]"
          >
            <PixelIcon name="cassette" size="sm" color="primary" bordered={false} />
            <span>Karya Fan-Made IT FEST UNW 2026</span>
          </motion.div>

          {/* Official Game Logo Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="h-16 sm:h-20 w-auto mb-4 drop-shadow-[0_0_25px_rgba(127,231,216,0.4)] relative"
          >
            <RetroImage
              src={GAME_ASSETS.hero.logo}
              alt="Logo Resmi A Space for the Unbound"
              width={260}
              height={80}
              className="h-full w-auto object-contain brightness-110"
              priority
              fallbackText="A SPACE FOR THE UNBOUND"
              fallbackSubtext="LOGO RESMI // 1999"
            />
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-text-main tracking-wider uppercase leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
          >
            A SPACE FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary">
              THE UNBOUND
            </span>
          </motion.h1>

          {/* Poetic Tagline in Handwriting Style */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 text-base sm:text-lg md:text-xl font-handwriting text-brand-accent tracking-wide"
          >
            “Dua remaja, satu kota kecil, dan kekuatan misterius yang menembus batas ingatan.”
          </motion.p>

          {/* Synopsis Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-text-muted leading-relaxed font-sans max-w-xl"
          >
            Menyelami kisah Atma dan Raya di kota Loka — pelosok pedesaan Jawa Timur di penghujung tahun 1999 — menghadapi kegelisahan masa depan SMA sekaligus retakan magis yang mengancam dunia mereka.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenTrailer}
              icon={<PixelIcon name="play" size={14} />}
              className="shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Tonton 7 Trailer
            </Button>

            <a href="#play">
              <Button
                variant="outline"
                size="lg"
                icon={<PixelIcon name="cartridge" size={16} />}
                className="shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5"
              >
                Katalog Platform
              </Button>
            </a>
          </motion.div>

          {/* Awards Badges with Retro Pixel Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3"
          >
            {HERO_DATA.awards.map((award, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-secondary/60 border border-brand-secondary/30 text-[11px]"
              >
                <PixelIcon name="trophy" size="sm" color="primary" bordered={false} />
                <div>
                  <span className="font-bold text-text-main block">{award.title}</span>
                  <span className="text-[10px] text-text-muted">{award.org}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Parallax Memory Collage */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-md perspective-1000"
          >
            {/* Polaroid Memory 1: Atma & Raya */}
            <div className="relative z-20 polaroid-frame shadow-2xl rounded-sm">
              <div className="washi-tape -top-2 left-6" />
              <div className="aspect-[4/3] bg-[#F2E6D8] overflow-hidden rounded-sm mb-3 relative">
                <RetroImage
                  src={GAME_ASSETS.hero.polaroidFloat}
                  alt="Kenangan persahabatan di kota Loka 1999"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                  fallbackText="MEMORI TIDAK DITEMUKAN"
                  fallbackSubtext="HALTE KOTA LOKA // 1999"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <div>
                  <p className="font-handwriting text-lg text-slate-900 font-bold leading-tight">
                    Pertemuan di Tepi Danau
                  </p>
                  <span className="text-[11px] font-mono text-slate-500">Loka, 1999 • Buku Merah #01</span>
                </div>
                <PixelIcon name="heart" size="sm" color="red" bordered={false} />
              </div>
            </div>

            {/* Polaroid Memory 2 (Layer Belakang Bertumpuk) */}
            <div
              className="absolute -bottom-8 -right-6 z-10 w-44 sm:w-52 polaroid-frame shadow-xl rotate-[8deg] pointer-events-none hidden sm:block"
              style={{ transform: "translateZ(-40px) rotate(8deg)" }}
            >
              <div className="washi-tape -top-2 right-4 bg-[#7FE7D8]/60" />
              <div className="aspect-video bg-[#F2E6D8] overflow-hidden rounded-sm mb-1.5 relative">
                <RetroImage
                  src={GAME_ASSETS.cartridgeCovers.cassetteCover}
                  alt="Danau Loka dan dermaga kayu"
                  fill
                  sizes="210px"
                  className="object-cover"
                  fallbackText="MEMORI TIDAK DITEMUKAN"
                  fallbackSubtext="DERMAGA LOKA // 1999"
                />
              </div>
              <p className="font-handwriting text-xs text-slate-700">Tawa di tepi dermaga...</p>
            </div>

            {/* Floating Walkman Cassette Tape Widget */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-30 p-3 rounded-xl bg-bg-primary/90 border-2 border-brand-accent/60 shadow-[4px_4px_0_0_#000] backdrop-blur-md flex items-center gap-3"
            >
              <PixelIcon name="cassette" size="sm" color="accent" />
              <div className="text-left">
                <span className="text-[10px] font-display text-brand-accent uppercase tracking-widest block">
                  Kaset Walkman Atma
                </span>
                <span className="text-xs font-bold text-text-main font-mono">
                  Ittou Bachtiar — Theme
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
