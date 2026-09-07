"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaSteam, FaPlaystation, FaXbox, FaGamepad, FaApple } from "react-icons/fa";
import { platforms } from "@/content/platforms";
import { useLayer } from "@/components/layer/useLayer";

/* ═══════════════════════════════════════════════════
 * PLAY NOW SECTION — DIVE layer exit point
 *
 * "Dunia nyata menunggu. Loka juga."
 *
 * Slightly brighter background than other DIVE sections
 * to signal "resurfacing". Platform buttons with
 * book-red styling.
 * ═══════════════════════════════════════════════════ */

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FaSteam,
  FaPlaystation,
  FaXbox,
  FaGamepad,
  FaApple,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function PlayNow() {
  const { timeOfDay } = useLayer();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="playnow"
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 md:py-32 transition-colors duration-700"
      style={{
        background:
          timeOfDay === "siang"
            ? "linear-gradient(180deg, #1E3A8A 0%, #172554 45%, #0F172A 100%)"
            : timeOfDay === "sore"
            ? "linear-gradient(180deg, #3B0764 0%, #431407 45%, #180828 100%)"
            : "linear-gradient(180deg, #0A0E27 0%, #0B1120 40%, #030712 100%)",
      }}
    >
      {/* Group Artwork Subtle Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.10]"
        style={{ backgroundImage: "url('/assets/playnow-bg.webp')" }}
        aria-hidden="true"
      />

      {/* Subtle top glow for "resurfacing" */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 100%, rgba(179,58,58,0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floating Sunset Embers / Sparks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[12, 25, 42, 58, 73, 86].map((xPos, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? 3 : 5,
              height: i % 2 === 0 ? 3 : 5,
              left: `${xPos}%`,
              bottom: "-10px",
              backgroundColor: i % 2 === 0 ? "#D8534F" : "#F2A65A",
              boxShadow: "0 0 10px 2px rgba(216,83,79,0.7)",
            }}
            animate={{
              y: ["0vh", "-95vh"],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0, 0.7, 0.35, 0],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              delay: i * 1.6,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          className="font-dive-heading text-3xl md:text-5xl lg:text-6xl text-dive-text"
        >
          Dunia nyata menunggu.{" "}
          <span style={{ color: "var(--dive-accent)" }}>Loka juga.</span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl font-dive-body text-base text-dive-text-muted md:text-lg leading-relaxed"
        >
          Tersedia di PC, PlayStation, Xbox, Nintendo Switch, dan iOS.
          Satu ruang selam, satu musim panas terakhir yang akan sulit dilupakan.
        </motion.p>

        {/* Platform buttons grid */}
        <motion.div
          variants={itemVariants}
          className="mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {platforms.map((platform) => {
            const Icon = ICON_MAP[platform.icon];
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-lg bg-book-red px-5 py-3 font-dive-heading text-sm text-white shadow-[0_4px_16px_rgba(179,58,58,0.3)] transition-all duration-300 hover:scale-[1.03] hover:bg-book-red-glow hover:shadow-[0_0_24px_6px_rgba(216,83,79,0.4)] md:px-6 md:text-base"
              >
                {Icon && <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />}
                <span>{platform.name}</span>
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
