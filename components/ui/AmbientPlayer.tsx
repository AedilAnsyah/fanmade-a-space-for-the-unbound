"use client";

import React, { useState, useRef, useEffect } from "react";
import PixelIcon from "@/components/ui/PixelIcon";

export interface AmbientPlayerProps {
  src?: string;
  defaultVolume?: number;
  className?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

/**
 * Mini Walkman Sony TPS-L2 / Walkman SMA 90-an
 * Diegetic vintage cassette player widget with spinning gears, physical LED,
 * and warm, clean acoustic piano/lofi audio playback.
 */
export default function AmbientPlayer({
  src = "/audio/walkman-theme.mp3",
  defaultVolume = 0.25,
  className = "",
  onPlayStateChange,
}: AmbientPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = defaultVolume;
    }
  }, [defaultVolume]);

  const handlePlayState = (playing: boolean) => {
    setIsPlaying(playing);
    if (onPlayStateChange) {
      onPlayStateChange(playing);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      handlePlayState(false);
    } else {
      try {
        audio.volume = defaultVolume;
        await audio.play();
        handlePlayState(true);
      } catch {
        // Handled: browser autoplay restrictions
        handlePlayState(false);
      }
    }
  };

  return (
    <div
      data-testid="walkman-player"
      className={`relative inline-flex items-center p-2 rounded-sm bg-[#161B33] border border-white/20 shadow-[3px_3px_0_0_#050914] select-none text-white ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
      }}
    >
      {/* Invisible HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        loop
        data-testid="walkman-audio-element"
        onEnded={() => handlePlayState(false)}
        onPause={() => handlePlayState(false)}
        onPlay={() => handlePlayState(true)}
      />

      {/* 4 Corner Screws (Fisik Sekrup 90-an) */}
      <div
        data-testid="screw-tl"
        className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-slate-600 border border-slate-400 flex items-center justify-center"
      >
        <div className="w-1 h-[0.5px] bg-slate-900 rotate-45" />
      </div>
      <div
        data-testid="screw-tr"
        className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-600 border border-slate-400 flex items-center justify-center"
      >
        <div className="w-1 h-[0.5px] bg-slate-900 -rotate-45" />
      </div>
      <div
        data-testid="screw-bl"
        className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-slate-600 border border-slate-400 flex items-center justify-center"
      >
        <div className="w-1 h-[0.5px] bg-slate-900 -rotate-30" />
      </div>
      <div
        data-testid="screw-br"
        className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-600 border border-slate-400 flex items-center justify-center"
      >
        <div className="w-1 h-[0.5px] bg-slate-900 rotate-60" />
      </div>

      <div className="flex items-center gap-3 px-1.5">
        {/* Cassette Acrylic Window with 2 Mini Spinning Spool Gears */}
        <div
          data-testid="cassette-window"
          className="relative w-16 h-8 rounded-xs bg-black/60 border border-white/15 px-1.5 flex items-center justify-between overflow-hidden shadow-inner shrink-0"
        >
          {/* Brown magnetic tape stripe in the background */}
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-2.5 bg-[#452718] border-y border-[#29150B] opacity-80" />

          {/* Left Spool Gear */}
          <div
            data-testid="spool-left"
            className={`relative z-10 w-4 h-4 rounded-full border border-white/40 bg-white/10 flex items-center justify-center ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#090D1A] border border-white/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3.5 h-[1px] bg-white/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3.5 w-[1px] bg-white/40" />
            </div>
          </div>

          {/* Center Tape Window Cutout Ruler */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="font-mono text-[7px] text-[#F4C95D]/80 tracking-tighter leading-none">
              TPS-L2
            </span>
            <div className="w-3 h-0.5 bg-[#F4C95D]/40 mt-0.5" />
          </div>

          {/* Right Spool Gear */}
          <div
            data-testid="spool-right"
            className={`relative z-10 w-4 h-4 rounded-full border border-white/40 bg-white/10 flex items-center justify-center ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#090D1A] border border-white/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3.5 h-[1px] bg-white/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3.5 w-[1px] bg-white/40" />
            </div>
          </div>
        </div>

        {/* Diegetic Labels & Status */}
        <div className="flex flex-col text-left min-w-[170px] max-w-[210px]">
          <div className="flex items-center gap-1.5">
            {/* Physical LED Indicator with Glow Ring */}
            <div
              data-testid="led-indicator"
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-[#F4C95D] shadow-[0_0_6px_#F4C95D] animate-pulse"
                  : "bg-[#4B5563] shadow-none"
              }`}
              title={isPlaying ? "LED: Aktif (Playing)" : "LED: Nonaktif (Muted)"}
            />

            <span className="font-mono text-[9px] font-bold text-[#F4C95D] tracking-widest uppercase truncate">
              WALKMAN AUTO-REVERSE
            </span>
          </div>

          <span
            data-testid="track-title"
            className="font-mono text-[10px] text-slate-200 tracking-wide font-medium truncate mt-0.5"
            title="SIDE A: MASDITO BACHTIAR - THEME"
          >
            SIDE A: MASDITO BACHTIAR - THEME
          </span>
        </div>

        {/* Tactile Mechanical Bevel Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          data-testid="walkman-play-btn"
          aria-label={
            isPlaying
              ? "Jeda pemutar kaset Walkman"
              : "Putar kaset Walkman: Masdito Bachtiar - Theme"
          }
          className={`flex items-center justify-center w-8 h-8 rounded-xs text-[11px] font-mono transition-all shrink-0 active:translate-y-0.5 ${
            isPlaying
              ? "bg-amber-500 text-amber-950 border-t-2 border-l-2 border-amber-900 border-b-2 border-r-2 border-amber-300 shadow-inner"
              : "bg-amber-300 hover:bg-amber-200 text-amber-950 border-t-2 border-l-2 border-amber-100 border-b-2 border-r-2 border-amber-800 shadow-[2px_2px_0_0_#050914]"
          }`}
          title={isPlaying ? "Pause / Jeda" : "Play / Putar"}
        >
          {isPlaying ? (
            <div className="w-2.5 h-2.5 bg-amber-950 rounded-2xs" />
          ) : (
            <PixelIcon name="play" size={12} color="current" />
          )}
        </button>
      </div>
    </div>
  );
}
