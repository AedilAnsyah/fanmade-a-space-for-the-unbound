"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import PixelIcon from "@/components/ui/PixelIcon";

export interface RetroImageProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
  fallbackSubtext?: string;
  fallbackClassName?: string;
  onImageError?: () => void;
}

/**
 * RetroImage - Diegetic Image Component with Zero CLS and Retro Paper Fallback
 * Automatically displays a warm vintage placeholder (#161B33 with pixel text "MEMORI TIDAK DITEMUKAN")
 * if network, CDN, or image loading fails.
 */
export default function RetroImage({
  src,
  alt,
  className,
  unoptimized = true,
  fallbackText = "MEMORI TIDAK DITEMUKAN",
  fallbackSubtext = "ARSIP KOTA LOKA // 1999",
  fallbackClassName,
  onImageError,
  ...props
}: RetroImageProps) {
  const [imageError, setImageError] = useState(false);

  // Reset error state whenever the source URL changes (e.g. pose switching)
  useEffect(() => {
    setImageError(false);
  }, [src]);

  const handleError = () => {
    setImageError(true);
    if (onImageError) {
      onImageError();
    }
  };

  if (imageError || !src) {
    return (
      <div
        className={cn(
          "w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 select-none bg-[#161B33] text-[#F5F3ED] border border-white/15 relative overflow-hidden",
          props.fill ? "absolute inset-0" : "",
          fallbackClassName
        )}
        style={{
          backgroundImage:
            "radial-gradient(rgba(244, 201, 93, 0.05) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {/* Diegetic CRT phosphor scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="p-2 rounded-xs bg-black/50 border border-[#F4C95D]/30 mb-2 shadow-sm">
            <PixelIcon name="tv" size={24} color="primary" />
          </div>

          <span className="font-mono text-[11px] sm:text-xs font-bold text-[#F4C95D] tracking-widest uppercase">
            {fallbackText}
          </span>

          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider mt-1">
            {fallbackSubtext}
          </span>
        </div>

        {/* 4 Corner brackets */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#F4C95D]/50 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#F4C95D]/50 pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#F4C95D]/50 pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#F4C95D]/50 pointer-events-none" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Foto kenangan A Space for the Unbound"}
      className={cn("object-cover object-center", className)}
      unoptimized={unoptimized}
      onError={handleError}
      {...props}
    />
  );
}
