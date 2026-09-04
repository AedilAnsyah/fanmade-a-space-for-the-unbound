"use client";

import React, { useEffect, useState } from "react";

export default function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsPointerFine(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Outer Glowing Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${
          clicked ? "scale-150" : "scale-100"
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div className="w-4 h-4 rounded-none border border-brand-accent/80 bg-brand-primary/20 rotate-45 shadow-[0_0_12px_rgba(127,231,216,0.8)]" />
      </div>

      {/* Tiny Core Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 bg-brand-primary -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </>
  );
}
