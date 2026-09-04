"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  pixelBorder?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  pixelBorder = true,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-display tracking-wider uppercase transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-xs md:text-sm px-5 py-2.5 gap-2",
    lg: "text-sm md:text-base px-7 py-3.5 gap-3",
  };

  const variantStyles = {
    primary:
      "bg-brand-primary text-bg-primary font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(244,201,93,0.6)] shadow-[0_4px_0_0_#b38b22]",
    secondary:
      "bg-brand-secondary text-white hover:bg-brand-secondary/80 hover:shadow-[0_0_20px_rgba(91,110,225,0.6)] shadow-[0_4px_0_0_#38479e]",
    accent:
      "bg-brand-accent text-bg-primary font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(127,231,216,0.7)] shadow-[0_4px_0_0_#46a89b]",
    outline:
      "bg-transparent text-text-main border-2 border-brand-accent/50 hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent shadow-[0_4px_0_0_rgba(127,231,216,0.3)]",
    ghost:
      "bg-transparent text-text-muted hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        pixelBorder && "pixel-corners",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
