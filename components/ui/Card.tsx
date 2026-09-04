import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dive" | "glass" | "highlight";
  glow?: boolean;
}

export default function Card({
  children,
  className,
  variant = "default",
  glow = false,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-bg-secondary/90 border border-brand-secondary/30 text-text-main shadow-lg hover:border-brand-accent/60",
    dive:
      "bg-dive-card/95 border border-dive-accent/30 text-dive-text shadow-xl hover:border-dive-accent/80",
    glass:
      "glass-panel text-text-main hover:border-brand-accent/50",
    highlight:
      "bg-bg-card border-2 border-brand-primary/60 text-text-main shadow-2xl hover:border-brand-primary",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300 backdrop-blur-md relative overflow-hidden",
        variantStyles[variant],
        glow && "pixel-glow-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
