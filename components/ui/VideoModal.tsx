"use client";

import React, { useState, useEffect, useRef } from "react";
import PixelIcon from "@/components/ui/PixelIcon";
import RetroImage from "@/components/ui/RetroImage";
import { TRAILERS_PLAYLIST, TrailerItem } from "@/lib/constants";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrailerId?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  initialTrailerId = "trailer_01_launch",
}: VideoModalProps) {
  const [activeTrailer, setActiveTrailer] = useState<TrailerItem>(
    TRAILERS_PLAYLIST.find((t) => t.id === initialTrailerId) || TRAILERS_PLAYLIST[0]
  );
  const [useYoutube, setUseYoutube] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (initialTrailerId) {
      const found = TRAILERS_PLAYLIST.find((t) => t.id === initialTrailerId);
      if (found) setActiveTrailer(found);
    }
  }, [initialTrailerId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-bg-secondary border border-brand-accent/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-secondary/30 bg-bg-primary/80">
          <div className="flex items-center gap-3">
            <PixelIcon name="film" size={18} color="primary" />
            <div>
              <h3 className="text-sm md:text-base font-display uppercase tracking-wider text-text-main">
                {activeTrailer.title}
              </h3>
              <p className="text-xs text-text-muted">
                {useYoutube ? "Streaming via YouTube Embed" : "Memutar Aset Video Lokal WebM/MP4"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <button
              onClick={() => setUseYoutube(!useYoutube)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10 hover:border-brand-accent/50 text-text-muted hover:text-text-main"
              title="Ganti antara Pemutar Lokal dan YouTube"
            >
              <PixelIcon name="tv" size={14} color="accent" />
              <span className="hidden sm:inline">{useYoutube ? "Pakai Video Lokal" : "Pakai YouTube"}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup modal"
            >
              <PixelIcon name="close" size={16} />
            </button>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {useYoutube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeTrailer.youtubeId}?autoplay=1&rel=0`}
              title={activeTrailer.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              key={activeTrailer.localVideo}
              src={activeTrailer.localVideo}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Browser Anda tidak mendukung tag video.
            </video>
          )}
        </div>

        {/* Playlist Switcher Bar */}
        <div className="p-4 bg-bg-primary/90 border-t border-brand-secondary/30 overflow-x-auto">
          <p className="text-xs font-display uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
            <span>Daftar 7 Trailer Resmi:</span>
          </p>
          <div className="flex gap-3 min-w-max pb-1">
            {TRAILERS_PLAYLIST.map((trailer) => {
              const isActive = trailer.id === activeTrailer.id;
              return (
                <button
                  key={trailer.id}
                  onClick={() => {
                    setActiveTrailer(trailer);
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                    }
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition-all border ${
                    isActive
                      ? "bg-brand-accent/15 border-brand-accent text-white shadow-[0_0_15px_rgba(127,231,216,0.3)]"
                      : "bg-bg-secondary/60 border-brand-secondary/20 text-text-muted hover:text-text-main hover:border-brand-secondary/50"
                  }`}
                >
                  <div className="relative w-12 h-8 rounded overflow-hidden bg-black shrink-0">
                    <RetroImage
                      src={trailer.thumbnail}
                      alt={trailer.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                      fallbackText="TRAILER"
                      fallbackSubtext=""
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <PixelIcon name="play" size={12} color="white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{trailer.title}</p>
                    <span className="text-[10px] text-text-muted">{trailer.duration || "Trailer"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
