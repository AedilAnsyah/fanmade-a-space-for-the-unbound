"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type PixelIconName =
  | "radio"
  | "tape"
  | "dive"
  | "rift"
  | "spacedive"
  | "journal"
  | "book"
  | "pencil"
  | "cat"
  | "paw"
  | "kentongan"
  | "newspaper"
  | "bulletin"
  | "cassette"
  | "cartridge"
  | "disc"
  | "trophy"
  | "tv"
  | "ticket"
  | "play"
  | "volume_on"
  | "volume_off"
  | "external"
  | "arrow_up"
  | "chevron_left"
  | "chevron_right"
  | "close"
  | "menu"
  | "heart"
  | "sparkles"
  | "spark"
  | "clock"
  | "battery"
  | "rain"
  | "cloud"
  | "eye"
  | "paperclip"
  | "refresh"
  | "shield"
  | "key"
  | "gamepad"
  | "film"
  | "quote"
  | "map"
  | "steam"
  | "playstation"
  | "nintendo"
  | "xbox"
  | "apple";

export interface PixelIconProps {
  name: PixelIconName;
  size?: 16 | 24 | 32 | 48 | 64 | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  color?: "primary" | "accent" | "secondary" | "dive" | "white" | "red" | "current";
  animated?: boolean;
  bordered?: boolean;
  blockShadow?: boolean;
}

export default function PixelIcon({
  name,
  size = 16,
  className,
  color = "current",
  animated = true,
  bordered = false,
  blockShadow = true,
}: PixelIconProps) {
  // Integer scaling multiplier to preserve razor-sharp pixel edges without blur
  const resolveSize = (): number => {
    if (typeof size === "string") {
      switch (size) {
        case "sm":
          return 16;
        case "md":
          return 32;
        case "lg":
          return 48;
        case "xl":
          return 64;
        default:
          return 16;
      }
    }
    // Snap to integer sizes
    return Math.max(16, Math.round(size));
  };

  const pixelDim = resolveSize();

  const colorClasses: Record<string, string> = {
    primary: "text-[#F4C95D]",
    accent: "text-[#7FE7D8]",
    secondary: "text-[#5B6EE1]",
    dive: "text-[#00E5C7]",
    white: "text-[#FFFFFF]",
    red: "text-[#EF4444]",
    current: "text-current",
  };

  const renderRawPixelArt = () => {
    switch (name) {
      // 1. BOOMBOX RADIO & TAPE 90-an
      case "radio":
      case "tape":
        return (
          <g shapeRendering="crispEdges">
            <rect x="13" y="0" width="1" height="2" fill="#E5E7EB" />
            <rect x="12" y="2" width="1" height="2" fill="#9CA3AF" />
            <rect x="5" y="1" width="6" height="1" fill="#4B5563" />
            <rect x="4" y="2" width="1" height="2" fill="#4B5563" />
            <rect x="11" y="2" width="1" height="2" fill="#4B5563" />
            <rect x="1" y="4" width="14" height="11" fill="#D97706" />
            <rect x="1" y="4" width="14" height="1" fill="#FCD34D" />
            <rect x="1" y="14" width="14" height="1" fill="#78350F" />
            <rect x="1" y="4" width="1" height="10" fill="#92400E" />
            <rect x="14" y="4" width="1" height="11" fill="#78350F" />
            <rect x="3" y="6" width="3" height="4" fill="#1F2937" />
            <rect x="4" y="7" width="1" height="2" fill="#E5E7EB" />
            <rect x="3" y="11" width="3" height="1" fill="#374151" />
            <rect x="10" y="6" width="3" height="4" fill="#1F2937" />
            <rect x="11" y="7" width="1" height="2" fill="#E5E7EB" />
            <rect x="10" y="11" width="3" height="1" fill="#374151" />
            <rect x="7" y="7" width="2" height="4" fill="#111827" />
            <rect x="7" y="8" width="1" height="1" fill="#60A5FA" />
            <rect x="8" y="9" width="1" height="1" fill="#60A5FA" />
            <rect x="3" y="12" width="10" height="1" fill="#FDE68A" />
            <rect x="7" y="12" width="1" height="1" fill="#DC2626" />
          </g>
        );

      // 2. RETAKAN KOSMIK SPACEDIVE
      case "dive":
      case "rift":
      case "spacedive":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="3" width="2" height="2" fill="#8C6BFF" />
            <rect x="11" y="2" width="2" height="1" fill="#00E5C7" />
            <rect x="1" y="8" width="2" height="1" fill="#8C6BFF" />
            <rect x="13" y="7" width="2" height="2" fill="#00E5C7" />
            <rect x="2" y="12" width="2" height="1" fill="#00E5C7" />
            <rect x="11" y="12" width="2" height="2" fill="#8C6BFF" />
            <rect x="7" y="1" width="2" height="2" fill="#00E5C7" />
            <rect x="6" y="3" width="3" height="2" fill="#8C6BFF" />
            <rect x="8" y="5" width="2" height="2" fill="#00E5C7" />
            <rect x="5" y="7" width="4" height="2" fill="#8C6BFF" />
            <rect x="8" y="8" width="3" height="2" fill="#00E5C7" />
            <rect x="6" y="10" width="3" height="2" fill="#8C6BFF" />
            <rect x="7" y="12" width="2" height="3" fill="#00E5C7" />
            <rect x="7" y="7" width="2" height="2" fill="#FFFFFF" />
            <rect x="6" y="8" width="1" height="1" fill="#FFFFFF" />
            <rect x="9" y="7" width="1" height="1" fill="#FFFFFF" />
          </g>
        );

      // 3. BUKU CATATAN MERAH ATMA
      case "journal":
      case "book":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="2" width="10" height="12" fill="#B91C1C" />
            <rect x="2" y="2" width="1" height="12" fill="#EF4444" />
            <rect x="3" y="2" width="1" height="12" fill="#DC2626" />
            <rect x="4" y="2" width="1" height="12" fill="#7F1D1D" />
            <rect x="13" y="3" width="1" height="10" fill="#FEF3C7" />
            <rect x="4" y="13" width="9" height="1" fill="#FDE68A" />
            <rect x="7" y="2" width="2" height="1" fill="#F59E0B" />
            <rect x="7" y="13" width="2" height="2" fill="#F59E0B" />
            <rect x="8" y="15" width="1" height="1" fill="#D97706" />
            <rect x="7" y="6" width="3" height="4" fill="#FEF08A" />
            <rect x="8" y="7" width="1" height="2" fill="#92400E" />
          </g>
        );

      // 4. PENSIL KAYU 2B
      case "pencil":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="13" width="1" height="1" fill="#1F2937" />
            <rect x="3" y="12" width="2" height="2" fill="#FED7AA" />
            <rect x="4" y="10" width="3" height="3" fill="#65A30D" />
            <rect x="6" y="8" width="3" height="3" fill="#FACC15" />
            <rect x="8" y="6" width="3" height="3" fill="#65A30D" />
            <rect x="10" y="4" width="3" height="3" fill="#FACC15" />
            <rect x="12" y="2" width="2" height="2" fill="#9CA3AF" />
            <rect x="13" y="1" width="2" height="2" fill="#F472B6" />
          </g>
        );

      // 5. KUCING LUKA / LULU
      case "cat":
      case "paw":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="2" width="2" height="2" fill="#D97706" />
            <rect x="4" y="3" width="1" height="1" fill="#F472B6" />
            <rect x="11" y="2" width="2" height="2" fill="#D97706" />
            <rect x="11" y="3" width="1" height="1" fill="#F472B6" />
            <rect x="3" y="4" width="10" height="8" fill="#F59E0B" />
            <rect x="2" y="6" width="1" height="5" fill="#D97706" />
            <rect x="13" y="6" width="1" height="5" fill="#B45309" />
            <rect x="5" y="4" width="6" height="1" fill="#FDE68A" />
            <rect x="4" y="7" width="2" height="2" fill="#FEF08A" />
            <rect x="5" y="7" width="1" height="2" fill="#1F2937" />
            <rect x="10" y="7" width="2" height="2" fill="#FEF08A" />
            <rect x="10" y="7" width="1" height="2" fill="#1F2937" />
            <rect x="7" y="9" width="2" height="1" fill="#F43F5E" />
            <rect x="7" y="10" width="1" height="1" fill="#78350F" />
            <rect x="8" y="10" width="1" height="1" fill="#78350F" />
            <rect x="1" y="8" width="2" height="1" fill="#FEF3C7" />
            <rect x="1" y="10" width="2" height="1" fill="#FEF3C7" />
            <rect x="13" y="8" width="2" height="1" fill="#FEF3C7" />
            <rect x="13" y="10" width="2" height="1" fill="#FEF3C7" />
            <rect x="7" y="12" width="2" height="2" fill="#EF4444" />
            <rect x="7" y="13" width="2" height="1" fill="#FCD34D" />
          </g>
        );

      // 6. KENTONGAN BAMBU POS RONDA
      case "kentongan":
        return (
          <g shapeRendering="crispEdges">
            <rect x="5" y="1" width="5" height="14" fill="#B45309" />
            <rect x="5" y="1" width="1" height="14" fill="#FCD34D" />
            <rect x="9" y="1" width="1" height="14" fill="#78350F" />
            <rect x="6" y="0" width="3" height="1" fill="#FDE68A" />
            <rect x="4" y="3" width="7" height="1" fill="#92400E" />
            <rect x="4" y="12" width="7" height="1" fill="#92400E" />
            <rect x="7" y="5" width="1" height="6" fill="#1C1917" />
            <rect x="11" y="4" width="2" height="2" fill="#FDE68A" />
            <rect x="12" y="6" width="1" height="7" fill="#D97706" />
            <rect x="13" y="12" width="1" height="3" fill="#78350F" />
          </g>
        );

      // 7. KORAN CETAK WARTA LOKA
      case "newspaper":
      case "bulletin":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="2" width="12" height="12" fill="#F5F5F4" />
            <rect x="13" y="3" width="1" height="11" fill="#D6D3D1" />
            <rect x="3" y="13" width="10" height="1" fill="#D6D3D1" />
            <rect x="3" y="3" width="10" height="2" fill="#1C1917" />
            <rect x="11" y="3" width="1" height="1" fill="#DC2626" />
            <rect x="4" y="6" width="3" height="3" fill="#78716C" />
            <rect x="5" y="7" width="1" height="1" fill="#E7E5E4" />
            <rect x="8" y="6" width="4" height="1" fill="#44403C" />
            <rect x="8" y="8" width="4" height="1" fill="#44403C" />
            <rect x="4" y="10" width="8" height="1" fill="#44403C" />
            <rect x="4" y="12" width="5" height="1" fill="#78716C" />
          </g>
        );

      // 8. KASET PITA
      case "cassette":
        return (
          <g shapeRendering="crispEdges">
            <rect x="1" y="3" width="14" height="10" fill="#1F2937" />
            <rect x="1" y="3" width="14" height="1" fill="#4B5563" />
            <rect x="1" y="12" width="14" height="1" fill="#111827" />
            <rect x="3" y="5" width="10" height="4" fill="#FAF5FF" />
            <rect x="3" y="5" width="10" height="1" fill="#C084FC" />
            <rect x="4" y="6" width="2" height="2" fill="#1F2937" />
            <rect x="4" y="6" width="1" height="1" fill="#FFFFFF" />
            <rect x="10" y="6" width="2" height="2" fill="#1F2937" />
            <rect x="11" y="7" width="1" height="1" fill="#FFFFFF" />
            <rect x="4" y="10" width="8" height="2" fill="#78350F" />
            <rect x="6" y="10" width="4" height="1" fill="#B45309" />
          </g>
        );

      // 9. CARTRIDGE GAME
      case "cartridge":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="2" width="12" height="12" fill="#374151" />
            <rect x="2" y="2" width="12" height="1" fill="#6B7280" />
            <rect x="2" y="13" width="12" height="1" fill="#1F2937" />
            <rect x="4" y="4" width="8" height="6" fill="#F59E0B" />
            <rect x="5" y="5" width="6" height="4" fill="#7C3AED" />
            <rect x="4" y="11" width="8" height="1" fill="#1F2937" />
            <rect x="4" y="13" width="1" height="2" fill="#FCD34D" />
            <rect x="6" y="13" width="1" height="2" fill="#FCD34D" />
            <rect x="8" y="13" width="1" height="2" fill="#FCD34D" />
            <rect x="10" y="13" width="1" height="2" fill="#FCD34D" />
          </g>
        );

      // 10. COMPACT DISC
      case "disc":
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="1" fill="#9CA3AF" />
            <rect x="2" y="2" width="12" height="1" fill="#D1D5DB" />
            <rect x="1" y="4" width="14" height="8" fill="#E5E7EB" />
            <rect x="2" y="13" width="12" height="1" fill="#9CA3AF" />
            <rect x="4" y="14" width="8" height="1" fill="#6B7280" />
            <rect x="3" y="4" width="2" height="4" fill="#67E8F9" />
            <rect x="11" y="8" width="2" height="4" fill="#C084FC" />
            <rect x="6" y="6" width="4" height="4" fill="#4B5563" />
            <rect x="7" y="7" width="2" height="2" fill="#0B1026" />
          </g>
        );

      // 11. PIALA PENGHARGAAN
      case "trophy":
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="2" width="8" height="1" fill="#FEF08A" />
            <rect x="4" y="3" width="8" height="4" fill="#F59E0B" />
            <rect x="5" y="7" width="6" height="2" fill="#D97706" />
            <rect x="6" y="9" width="4" height="1" fill="#B45309" />
            <rect x="2" y="3" width="2" height="1" fill="#F59E0B" />
            <rect x="2" y="4" width="1" height="3" fill="#D97706" />
            <rect x="2" y="6" width="2" height="1" fill="#B45309" />
            <rect x="12" y="3" width="2" height="1" fill="#FEF08A" />
            <rect x="13" y="4" width="1" height="3" fill="#F59E0B" />
            <rect x="12" y="6" width="2" height="1" fill="#D97706" />
            <rect x="7" y="10" width="2" height="2" fill="#F59E0B" />
            <rect x="5" y="12" width="6" height="1" fill="#FCD34D" />
            <rect x="4" y="13" width="8" height="2" fill="#1F2937" />
            <rect x="4" y="14" width="8" height="1" fill="#111827" />
          </g>
        );

      // 12. TV TABUNG CRT 90s
      case "tv":
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="0" width="1" height="1" fill="#E5E7EB" />
            <rect x="5" y="1" width="1" height="1" fill="#9CA3AF" />
            <rect x="6" y="2" width="1" height="1" fill="#9CA3AF" />
            <rect x="11" y="0" width="1" height="1" fill="#E5E7EB" />
            <rect x="10" y="1" width="1" height="1" fill="#9CA3AF" />
            <rect x="9" y="2" width="1" height="1" fill="#9CA3AF" />
            <rect x="1" y="3" width="14" height="11" fill="#78350F" />
            <rect x="1" y="3" width="14" height="1" fill="#B45309" />
            <rect x="3" y="5" width="8" height="7" fill="#042F2E" />
            <rect x="4" y="6" width="2" height="1" fill="#5EEAD4" />
            <rect x="4" y="7" width="1" height="2" fill="#2DD4BF" />
            <rect x="12" y="5" width="2" height="2" fill="#D97706" />
            <rect x="12" y="8" width="2" height="2" fill="#D97706" />
            <rect x="12" y="11" width="2" height="1" fill="#111827" />
            <rect x="2" y="14" width="2" height="1" fill="#451A03" />
            <rect x="12" y="14" width="2" height="1" fill="#451A03" />
          </g>
        );

      // 13. TIKET BIOSKOP MEGARIA
      case "ticket":
        return (
          <g shapeRendering="crispEdges">
            <rect x="1" y="4" width="14" height="8" fill="#F59E0B" />
            <rect x="1" y="4" width="14" height="1" fill="#FDE68A" />
            <rect x="0" y="7" width="2" height="2" fill="#0B1026" />
            <rect x="14" y="7" width="2" height="2" fill="#0B1026" />
            <rect x="7" y="6" width="2" height="4" fill="#92400E" />
            <rect x="5" y="7" width="6" height="2" fill="#92400E" />
            <rect x="7" y="7" width="2" height="2" fill="#FEF08A" />
            <rect x="4" y="5" width="1" height="1" fill="#78350F" />
            <rect x="4" y="7" width="1" height="1" fill="#78350F" />
            <rect x="4" y="9" width="1" height="1" fill="#78350F" />
            <rect x="4" y="11" width="1" height="1" fill="#78350F" />
          </g>
        );

      // 14. PLAY BUTTON
      case "play":
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="2" width="2" height="12" fill="currentColor" />
            <rect x="6" y="3" width="2" height="10" fill="currentColor" />
            <rect x="8" y="5" width="2" height="6" fill="currentColor" />
            <rect x="10" y="7" width="2" height="2" fill="currentColor" />
          </g>
        );

      // 15. VOLUME ON
      case "volume_on":
        return (
          <g shapeRendering="crispEdges">
            <rect x="1" y="6" width="3" height="4" fill="currentColor" />
            <rect x="4" y="5" width="1" height="6" fill="currentColor" />
            <rect x="5" y="4" width="1" height="8" fill="currentColor" />
            <rect x="6" y="3" width="2" height="10" fill="currentColor" />
            <rect x="10" y="6" width="1" height="4" fill="currentColor" />
            <rect x="11" y="5" width="1" height="1" fill="currentColor" />
            <rect x="11" y="10" width="1" height="1" fill="currentColor" />
            <rect x="13" y="4" width="1" height="8" fill="currentColor" />
            <rect x="14" y="3" width="1" height="1" fill="currentColor" />
            <rect x="14" y="12" width="1" height="1" fill="currentColor" />
          </g>
        );

      // 16. VOLUME OFF
      case "volume_off":
        return (
          <g shapeRendering="crispEdges">
            <rect x="1" y="6" width="3" height="4" fill="currentColor" />
            <rect x="4" y="5" width="1" height="6" fill="currentColor" />
            <rect x="5" y="4" width="1" height="8" fill="currentColor" />
            <rect x="6" y="3" width="2" height="10" fill="currentColor" />
            <rect x="10" y="5" width="1" height="1" fill="#EF4444" />
            <rect x="14" y="5" width="1" height="1" fill="#EF4444" />
            <rect x="11" y="6" width="1" height="1" fill="#EF4444" />
            <rect x="13" y="6" width="1" height="1" fill="#EF4444" />
            <rect x="12" y="7" width="1" height="2" fill="#EF4444" />
            <rect x="11" y="9" width="1" height="1" fill="#EF4444" />
            <rect x="13" y="9" width="1" height="1" fill="#EF4444" />
            <rect x="10" y="10" width="1" height="1" fill="#EF4444" />
            <rect x="14" y="10" width="1" height="1" fill="#EF4444" />
          </g>
        );

      // 17. EXTERNAL LINK
      case "external":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="5" width="7" height="1" fill="currentColor" />
            <rect x="2" y="5" width="1" height="9" fill="currentColor" />
            <rect x="2" y="13" width="9" height="1" fill="currentColor" />
            <rect x="10" y="7" width="1" height="7" fill="currentColor" />
            <rect x="9" y="2" width="5" height="1" fill="currentColor" />
            <rect x="13" y="2" width="1" height="5" fill="currentColor" />
            <rect x="12" y="3" width="1" height="1" fill="currentColor" />
            <rect x="10" y="5" width="2" height="1" fill="currentColor" />
            <rect x="8" y="7" width="2" height="1" fill="currentColor" />
            <rect x="6" y="9" width="2" height="1" fill="currentColor" />
          </g>
        );

      // 18. PANAH ATAS (MENUJU LANGIT)
      case "arrow_up":
        return (
          <g shapeRendering="crispEdges">
            <rect x="7" y="2" width="2" height="1" fill="currentColor" />
            <rect x="6" y="3" width="4" height="1" fill="currentColor" />
            <rect x="5" y="4" width="6" height="1" fill="currentColor" />
            <rect x="4" y="5" width="8" height="1" fill="currentColor" />
            <rect x="7" y="6" width="2" height="8" fill="currentColor" />
          </g>
        );

      // 19. CHEVRON KIRI
      case "chevron_left":
        return (
          <g shapeRendering="crispEdges">
            <rect x="9" y="3" width="2" height="2" fill="currentColor" />
            <rect x="7" y="5" width="2" height="2" fill="currentColor" />
            <rect x="5" y="7" width="2" height="2" fill="currentColor" />
            <rect x="7" y="9" width="2" height="2" fill="currentColor" />
            <rect x="9" y="11" width="2" height="2" fill="currentColor" />
          </g>
        );

      // 20. CHEVRON KANAN
      case "chevron_right":
        return (
          <g shapeRendering="crispEdges">
            <rect x="5" y="3" width="2" height="2" fill="currentColor" />
            <rect x="7" y="5" width="2" height="2" fill="currentColor" />
            <rect x="9" y="7" width="2" height="2" fill="currentColor" />
            <rect x="7" y="9" width="2" height="2" fill="currentColor" />
            <rect x="5" y="11" width="2" height="2" fill="currentColor" />
          </g>
        );

      // 21. CLOSE BUTTON (X)
      case "close":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="3" width="2" height="2" fill="currentColor" />
            <rect x="11" y="3" width="2" height="2" fill="currentColor" />
            <rect x="5" y="5" width="2" height="2" fill="currentColor" />
            <rect x="9" y="5" width="2" height="2" fill="currentColor" />
            <rect x="7" y="7" width="2" height="2" fill="currentColor" />
            <rect x="5" y="9" width="2" height="2" fill="currentColor" />
            <rect x="9" y="9" width="2" height="2" fill="currentColor" />
            <rect x="3" y="11" width="2" height="2" fill="currentColor" />
            <rect x="11" y="11" width="2" height="2" fill="currentColor" />
          </g>
        );

      // 22. BURGER MENU
      case "menu":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="3" width="12" height="2" fill="currentColor" />
            <rect x="2" y="7" width="12" height="2" fill="currentColor" />
            <rect x="2" y="11" width="12" height="2" fill="currentColor" />
          </g>
        );

      // 23. HATI 8-BIT
      case "heart":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="3" width="4" height="2" fill="#EF4444" />
            <rect x="9" y="3" width="4" height="2" fill="#EF4444" />
            <rect x="2" y="5" width="12" height="4" fill="#EF4444" />
            <rect x="3" y="9" width="10" height="2" fill="#DC2626" />
            <rect x="4" y="11" width="8" height="1" fill="#B91C1C" />
            <rect x="5" y="12" width="6" height="1" fill="#B91C1C" />
            <rect x="6" y="13" width="4" height="1" fill="#991B1B" />
            <rect x="7" y="14" width="2" height="1" fill="#7F1D1D" />
            <rect x="4" y="4" width="1" height="2" fill="#FFFFFF" />
            <rect x="5" y="4" width="1" height="1" fill="#FFFFFF" />
          </g>
        );

      // 24. SPARKLES & KILAUAN BINTANG
      case "sparkles":
      case "spark":
        return (
          <g shapeRendering="crispEdges">
            <rect x="7" y="6" width="2" height="4" fill="currentColor" />
            <rect x="6" y="7" width="4" height="2" fill="currentColor" />
            <rect x="7" y="2" width="2" height="4" fill="currentColor" />
            <rect x="7" y="10" width="2" height="4" fill="currentColor" />
            <rect x="2" y="7" width="4" height="2" fill="currentColor" />
            <rect x="10" y="7" width="4" height="2" fill="currentColor" />
            <rect x="13" y="2" width="1" height="1" fill="currentColor" />
            <rect x="12" y="3" width="3" height="1" fill="currentColor" />
            <rect x="13" y="4" width="1" height="1" fill="currentColor" />
          </g>
        );

      // 25. JAM 90-an
      case "clock":
        return (
          <g shapeRendering="crispEdges">
            <rect x="5" y="1" width="6" height="1" fill="currentColor" />
            <rect x="3" y="2" width="10" height="1" fill="currentColor" />
            <rect x="2" y="3" width="12" height="2" fill="currentColor" />
            <rect x="1" y="5" width="14" height="6" fill="currentColor" />
            <rect x="2" y="11" width="12" height="2" fill="currentColor" />
            <rect x="3" y="13" width="10" height="1" fill="currentColor" />
            <rect x="5" y="14" width="6" height="1" fill="currentColor" />
            <rect x="3" y="3" width="10" height="10" fill="#0B1026" />
            <rect x="7" y="4" width="2" height="4" fill="#F4C95D" />
            <rect x="8" y="7" width="4" height="2" fill="#7FE7D8" />
            <rect x="7" y="7" width="2" height="2" fill="#FFFFFF" />
          </g>
        );

      // 26. BATERAI KOTAK 90s
      case "battery":
        return (
          <g shapeRendering="crispEdges">
            <rect x="1" y="4" width="12" height="8" fill="currentColor" />
            <rect x="13" y="6" width="2" height="4" fill="currentColor" />
            <rect x="2" y="5" width="10" height="6" fill="#111827" />
            <rect x="3" y="6" width="2" height="4" fill="#10B981" />
            <rect x="6" y="6" width="2" height="4" fill="#10B981" />
            <rect x="9" y="6" width="2" height="4" fill="#10B981" />
          </g>
        );

      // 27. GERIMIS DAN AWAN
      case "rain":
      case "cloud":
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="3" width="4" height="2" fill="#93C5FD" />
            <rect x="7" y="2" width="4" height="2" fill="#E0F2FE" />
            <rect x="2" y="5" width="12" height="4" fill="#BAE6FD" />
            <rect x="2" y="8" width="12" height="1" fill="#38BDF8" />
            <rect x="4" y="10" width="1" height="2" fill="#38BDF8" />
            <rect x="3" y="12" width="1" height="2" fill="#60A5FA" />
            <rect x="8" y="11" width="1" height="2" fill="#38BDF8" />
            <rect x="7" y="13" width="1" height="2" fill="#60A5FA" />
            <rect x="12" y="10" width="1" height="2" fill="#38BDF8" />
            <rect x="11" y="12" width="1" height="2" fill="#60A5FA" />
          </g>
        );

      // 28. MATA (SPACEDIVE INSIGHT)
      case "eye":
        return (
          <g shapeRendering="crispEdges">
            <rect x="5" y="3" width="6" height="1" fill="currentColor" />
            <rect x="2" y="4" width="12" height="2" fill="currentColor" />
            <rect x="1" y="6" width="14" height="4" fill="currentColor" />
            <rect x="2" y="10" width="12" height="2" fill="currentColor" />
            <rect x="5" y="12" width="6" height="1" fill="currentColor" />
            <rect x="3" y="5" width="10" height="6" fill="#FFFFFF" />
            <rect x="6" y="5" width="4" height="6" fill="#00E5C7" />
            <rect x="7" y="6" width="2" height="4" fill="#050914" />
            <rect x="7" y="6" width="1" height="1" fill="#FFFFFF" />
          </g>
        );

      // 29. PAPERCLIP LOGAM
      case "paperclip":
        return (
          <g shapeRendering="crispEdges">
            <rect x="5" y="2" width="5" height="1" fill="currentColor" />
            <rect x="4" y="3" width="1" height="9" fill="currentColor" />
            <rect x="5" y="12" width="5" height="1" fill="currentColor" />
            <rect x="10" y="5" width="1" height="7" fill="currentColor" />
            <rect x="7" y="4" width="3" height="1" fill="currentColor" />
            <rect x="6" y="5" width="1" height="6" fill="currentColor" />
            <rect x="7" y="10" width="2" height="1" fill="currentColor" />
            <rect x="8" y="7" width="1" height="3" fill="currentColor" />
          </g>
        );

      // 30. REFRESH / ACTION POSE
      case "refresh":
        return (
          <g shapeRendering="crispEdges">
            <rect x="5" y="2" width="6" height="1" fill="currentColor" />
            <rect x="3" y="3" width="2" height="1" fill="currentColor" />
            <rect x="2" y="4" width="1" height="4" fill="currentColor" />
            <rect x="1" y="3" width="3" height="1" fill="currentColor" />
            <rect x="1" y="4" width="1" height="3" fill="currentColor" />
            <rect x="5" y="13" width="6" height="1" fill="currentColor" />
            <rect x="11" y="12" width="2" height="1" fill="currentColor" />
            <rect x="13" y="8" width="1" height="4" fill="currentColor" />
            <rect x="12" y="12" width="3" height="1" fill="currentColor" />
            <rect x="14" y="9" width="1" height="3" fill="currentColor" />
          </g>
        );

      // 31. SHIELD PERTAHANAN
      case "shield":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="2" width="12" height="2" fill="currentColor" />
            <rect x="2" y="4" width="12" height="5" fill="currentColor" />
            <rect x="3" y="9" width="10" height="2" fill="currentColor" />
            <rect x="4" y="11" width="8" height="2" fill="currentColor" />
            <rect x="6" y="13" width="4" height="1" fill="currentColor" />
            <rect x="7" y="14" width="2" height="1" fill="currentColor" />
            <rect x="4" y="4" width="4" height="4" fill="#F4C95D" />
            <rect x="8" y="4" width="4" height="4" fill="#7FE7D8" />
          </g>
        );

      // 32. KUNCI GEMBOK
      case "key":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="3" width="5" height="5" fill="#F59E0B" />
            <rect x="4" y="4" width="3" height="3" fill="#0B1026" />
            <rect x="8" y="5" width="6" height="1" fill="#FCD34D" />
            <rect x="8" y="6" width="6" height="1" fill="#D97706" />
            <rect x="11" y="7" width="1" height="2" fill="#D97706" />
            <rect x="13" y="7" width="1" height="3" fill="#D97706" />
          </g>
        );

      // 33. GAMEPAD RETRO 8-BIT
      case "gamepad":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="5" width="12" height="7" fill="#374151" />
            <rect x="2" y="5" width="12" height="1" fill="#4B5563" />
            <rect x="1" y="7" width="1" height="5" fill="#1F2937" />
            <rect x="14" y="7" width="1" height="5" fill="#1F2937" />
            <rect x="4" y="7" width="3" height="3" fill="#111827" />
            <rect x="5" y="6" width="1" height="5" fill="#9CA3AF" />
            <rect x="3" y="8" width="5" height="1" fill="#9CA3AF" />
            <rect x="11" y="7" width="1" height="1" fill="#EF4444" />
            <rect x="12" y="8" width="1" height="1" fill="#3B82F6" />
            <rect x="10" y="8" width="1" height="1" fill="#10B981" />
            <rect x="11" y="9" width="1" height="1" fill="#FACC15" />
          </g>
        );

      // 34. ROL FILM 35MM
      case "film":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="2" width="12" height="12" fill="#1F2937" />
            <rect x="2" y="2" width="12" height="1" fill="#4B5563" />
            <rect x="3" y="3" width="1" height="1" fill="#FEF08A" />
            <rect x="3" y="5" width="1" height="1" fill="#FEF08A" />
            <rect x="3" y="7" width="1" height="1" fill="#FEF08A" />
            <rect x="3" y="9" width="1" height="1" fill="#FEF08A" />
            <rect x="3" y="11" width="1" height="1" fill="#FEF08A" />
            <rect x="12" y="3" width="1" height="1" fill="#FEF08A" />
            <rect x="12" y="5" width="1" height="1" fill="#FEF08A" />
            <rect x="12" y="7" width="1" height="1" fill="#FEF08A" />
            <rect x="12" y="9" width="1" height="1" fill="#FEF08A" />
            <rect x="12" y="11" width="1" height="1" fill="#FEF08A" />
            <rect x="5" y="4" width="6" height="8" fill="#111827" />
            <rect x="6" y="5" width="4" height="6" fill="#374151" />
          </g>
        );

      // 35. QUOTE TANDA PETIK
      case "quote":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="4" width="3" height="3" fill="currentColor" />
            <rect x="2" y="7" width="1" height="2" fill="currentColor" />
            <rect x="7" y="4" width="3" height="3" fill="currentColor" />
            <rect x="7" y="7" width="1" height="2" fill="currentColor" />
          </g>
        );

      // 36. PETA LOKA
      case "map":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="3" width="4" height="10" fill="#FDE68A" />
            <rect x="6" y="2" width="4" height="10" fill="#FEF08A" />
            <rect x="10" y="3" width="4" height="10" fill="#FDE68A" />
            <rect x="2" y="13" width="4" height="1" fill="#B45309" />
            <rect x="6" y="12" width="4" height="1" fill="#B45309" />
            <rect x="10" y="13" width="4" height="1" fill="#B45309" />
            <rect x="7" y="5" width="2" height="2" fill="#EF4444" />
            <rect x="8" y="4" width="1" height="4" fill="#EF4444" />
            <rect x="6" y="5" width="4" height="1" fill="#EF4444" />
          </g>
        );

      // 37. STEAM PIXEL
      case "steam":
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="2" width="8" height="2" fill="#66C0F4" />
            <rect x="2" y="4" width="12" height="8" fill="#171A21" />
            <rect x="4" y="12" width="8" height="2" fill="#66C0F4" />
            <rect x="5" y="5" width="3" height="3" fill="#66C0F4" />
            <rect x="9" y="8" width="4" height="4" fill="#66C0F4" />
            <rect x="10" y="9" width="2" height="2" fill="#171A21" />
          </g>
        );

      // 38. NINTENDO SWITCH JOY-CON
      case "nintendo":
        return (
          <g shapeRendering="crispEdges">
            <rect x="2" y="3" width="5" height="10" fill="#E60012" />
            <rect x="3" y="4" width="1" height="1" fill="#FFFFFF" />
            <rect x="4" y="6" width="2" height="2" fill="#000000" />
            <rect x="9" y="3" width="5" height="10" fill="#00C3E3" />
            <rect x="12" y="4" width="1" height="1" fill="#FFFFFF" />
            <rect x="10" y="9" width="2" height="2" fill="#000000" />
          </g>
        );

      // 39. PLAYSTATION
      case "playstation":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="2" width="4" height="11" fill="#003791" />
            <rect x="7" y="2" width="3" height="5" fill="#003791" />
            <rect x="8" y="7" width="5" height="6" fill="#0072CE" />
          </g>
        );

      // 40. XBOX
      case "xbox":
        return (
          <g shapeRendering="crispEdges">
            <rect x="3" y="2" width="10" height="12" fill="#107C10" />
            <rect x="4" y="4" width="2" height="2" fill="#FFFFFF" />
            <rect x="10" y="4" width="2" height="2" fill="#FFFFFF" />
            <rect x="6" y="6" width="4" height="3" fill="#FFFFFF" />
            <rect x="4" y="10" width="2" height="2" fill="#FFFFFF" />
            <rect x="10" y="10" width="2" height="2" fill="#FFFFFF" />
          </g>
        );

      // 41. APPLE
      case "apple":
        return (
          <g shapeRendering="crispEdges">
            <rect x="8" y="1" width="2" height="2" fill="#FFFFFF" />
            <rect x="4" y="4" width="8" height="9" fill="#FFFFFF" />
            <rect x="3" y="6" width="10" height="6" fill="#FFFFFF" />
            <rect x="10" y="6" width="3" height="3" fill="#0B1026" />
          </g>
        );

      default:
        return (
          <g shapeRendering="crispEdges">
            <rect x="4" y="4" width="8" height="8" fill="currentColor" />
          </g>
        );
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none align-middle",
        colorClasses[color] || "text-current",
        animated && "pixel-icon-interactive",
        blockShadow && "drop-shadow-[2px_2px_0_#000]",
        bordered && "p-1 rounded border-2 border-current/40 bg-black/40 shadow-[2px_2px_0_0_#000]",
        className
      )}
      style={{
        width: `${pixelDim}px`,
        height: `${pixelDim}px`,
        imageRendering: "pixelated",
        shapeRendering: "crispEdges",
      }}
    >
      <svg
        viewBox="0 0 16 16"
        width={pixelDim}
        height={pixelDim}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        style={{
          imageRendering: "pixelated",
          shapeRendering: "crispEdges",
        }}
        className="overflow-visible block"
      >
        {renderRawPixelArt()}
      </svg>
    </span>
  );
}
