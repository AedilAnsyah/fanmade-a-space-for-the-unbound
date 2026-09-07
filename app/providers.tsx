"use client";

import { type ReactNode } from "react";
import { LayerProvider } from "@/components/layer/LayerProvider";
import { LenisProvider } from "@/lib/lenis";
import { DiveCursor } from "@/components/dive/DiveCursor";
import { Navbar } from "@/components/shared/Navbar";

/**
 * Client-side providers wrapper.
 * Combines LayerProvider (state) + LenisProvider (smooth scroll)
 * + global overlays (Navbar, DiveCursor).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LayerProvider>
      <LenisProvider>
        <Navbar />
        {children}
        <DiveCursor />
      </LenisProvider>
    </LayerProvider>
  );
}

