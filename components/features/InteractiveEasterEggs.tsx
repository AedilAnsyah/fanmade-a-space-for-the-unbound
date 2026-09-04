"use client";

import React, { useState } from "react";
import RetroImage from "@/components/ui/RetroImage";
import { motion } from "framer-motion";
import PixelIcon from "@/components/ui/PixelIcon";
import { GAME_ASSETS } from "@/lib/assets";

export default function InteractiveEasterEggs() {
  const [catPetCount, setCatPetCount] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isKentonganActive, setIsKentonganActive] = useState(false);
  const [kentonganCount, setKentonganCount] = useState(0);

  // Play synthetic retro wood sound using Web Audio API
  const playKentonganSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      // Bamboo knock frequency curve
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      // AudioContext fallback if disabled by browser
    }
  };

  const handlePetCat = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCatPetCount((prev) => prev + 1);

    // Spawn floating heart
    const newHeart = {
      id: Date.now(),
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 40,
    };
    setHearts((prev) => [...prev.slice(-5), newHeart]);
  };

  const handleHitKentongan = () => {
    playKentonganSound();
    setIsKentonganActive(true);
    setKentonganCount((prev) => prev + 1);
    setTimeout(() => setIsKentonganActive(false), 300);
  };

  return (
    <div className="my-16 max-w-4xl mx-auto px-4">
      <div className="p-6 sm:p-8 rounded-2xl bg-bg-secondary/70 border border-brand-secondary/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary">
              <PixelIcon name="sparkles" size={18} />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg font-bold text-text-main uppercase tracking-wider">
                Aktivitas Khas Warga Loka
              </h4>
              <p className="text-xs text-text-muted font-sans">
                Interaksi santai khas game: elus kucing jalanan & pukul kentongan pos ronda!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1: Elus Kucing */}
          <div className="p-5 rounded-xl bg-bg-primary/80 border border-brand-accent/30 flex flex-col justify-between group hover:border-brand-accent transition-all relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative">
                <RetroImage
                  src={GAME_ASSETS.gameplayViewfinder[1].gif}
                  alt="Lulu si Belang"
                  fill
                  unoptimized={true}
                  sizes="64px"
                  className="object-cover"
                  fallbackText="LULU"
                  fallbackSubtext="KUCING"
                />
              </div>
              <div>
                <span className="text-xs font-display text-brand-accent uppercase tracking-wider">
                  Sahabat Jalanan
                </span>
                <h5 className="font-display text-base font-bold text-text-main">
                  Lulu si Belang
                </h5>
                <p className="text-xs text-text-muted">
                  {catPetCount === 0
                    ? "Klik untuk mengelus Lulu"
                    : `Dielus ${catPetCount} kali! Purrr... ❤️`}
                </p>
              </div>
            </div>

            {/* Pet Button */}
            <div className="relative">
              <button
                onClick={handlePetCat}
                className="w-full py-2.5 px-4 rounded-lg bg-brand-accent/15 border border-brand-accent/50 text-brand-accent font-display text-xs tracking-wider uppercase hover:bg-brand-accent hover:text-bg-primary transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                <PixelIcon name="heart" size={16} />
                <span>Elus Kucing (+1 Kasih Sayang)</span>
              </button>

              {/* Floating Hearts Animation */}
              {hearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -60, scale: 1.5 }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 text-brand-accent pointer-events-none text-xl"
                  style={{ transform: `translate(${h.x}px, -20px)` }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </div>

          {/* Card 2: Tabuh Kentongan */}
          <div className="p-5 rounded-xl bg-bg-primary/80 border border-brand-primary/30 flex flex-col justify-between group hover:border-brand-primary transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative">
                <RetroImage
                  src={GAME_ASSETS.gameplayViewfinder[3].gif}
                  alt="Kentongan Ronda"
                  fill
                  unoptimized={true}
                  sizes="64px"
                  className={`object-cover transition-transform ${
                    isKentonganActive ? "scale-110" : ""
                  }`}
                  fallbackText="RONDA"
                  fallbackSubtext="KENTONGAN"
                />
              </div>
              <div>
                <span className="text-xs font-display text-brand-primary uppercase tracking-wider">
                  Pos Ronda Malam
                </span>
                <h5 className="font-display text-base font-bold text-text-main">
                  Kentongan Bambu
                </h5>
                <p className="text-xs text-text-muted">
                  {kentonganCount === 0
                    ? "Klik untuk membunyikan suara kentongan"
                    : `Diketuk ${kentonganCount} kali! *TONG TONG!*`}
                </p>
              </div>
            </div>

            {/* Hit Button */}
            <button
              onClick={handleHitKentongan}
              className={`w-full py-2.5 px-4 rounded-lg font-display text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md border ${
                isKentonganActive
                  ? "bg-brand-primary text-bg-primary border-brand-primary scale-98 shadow-[0_0_20px_rgba(244,201,93,0.7)]"
                  : "bg-brand-primary/15 border-brand-primary/50 text-brand-primary hover:bg-brand-primary hover:text-bg-primary"
              }`}
            >
              <PixelIcon name="kentongan" size={16} />
              <span>Pukul Kentongan (*Suara Retro 8-bit*)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
