"use client";

import React, { useState, useEffect } from "react";
import PixelIcon from "@/components/ui/PixelIcon";

export default function CRTFilter() {
  const [isCRT, setIsCRT] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("asftu_crt_mode");
    if (saved === "true") {
      setIsCRT(true);
      document.documentElement.classList.add("crt-active");
    }
  }, []);

  const toggleCRT = () => {
    const next = !isCRT;
    setIsCRT(next);
    localStorage.setItem("asftu_crt_mode", String(next));
    if (next) {
      document.documentElement.classList.add("crt-active");
    } else {
      document.documentElement.classList.remove("crt-active");
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <button
        onClick={toggleCRT}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-display tracking-wider uppercase border transition-all duration-300 shadow-xl select-none backdrop-blur-md ${
          isCRT
            ? "bg-bg-primary/95 border-brand-accent text-brand-accent shadow-[0_0_20px_rgba(127,231,216,0.4)]"
            : "bg-bg-secondary/90 border-brand-secondary/40 text-text-muted hover:text-text-main hover:border-brand-secondary"
        }`}
        title="Nyalakan efek garis tabung TV 90-an"
      >
        <PixelIcon name="tv" size={16} />
        <span className="hidden sm:inline">CRT Mode 90s:</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            isCRT
              ? "bg-brand-accent/20 text-brand-accent border border-brand-accent/50 animate-pulse"
              : "bg-white/10 text-text-muted"
          }`}
        >
          {isCRT ? "ON" : "OFF"}
        </span>
      </button>
    </div>
  );
}
