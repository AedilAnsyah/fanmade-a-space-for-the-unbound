import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  diveTheme?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  diveTheme = false,
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 md:mb-16", alignStyles[align], className)}>
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-display tracking-widest uppercase border",
            diveTheme
              ? "bg-dive-accent/10 border-dive-accent/40 text-dive-accent"
              : "bg-brand-accent/10 border-brand-accent/40 text-brand-accent"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
          <span>{badge}</span>
        </div>
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-wide leading-tight",
          diveTheme
            ? "text-white drop-shadow-[0_0_20px_rgba(0,229,199,0.3)]"
            : "text-text-main drop-shadow-[0_0_20px_rgba(244,201,93,0.2)]"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl",
            diveTheme ? "text-dive-text/80" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}

      <div
        className={cn(
          "w-24 h-1 mt-6 rounded-full",
          diveTheme
            ? "bg-gradient-to-r from-transparent via-dive-accent to-transparent"
            : "bg-gradient-to-r from-transparent via-brand-primary to-transparent"
        )}
      />
    </div>
  );
}
