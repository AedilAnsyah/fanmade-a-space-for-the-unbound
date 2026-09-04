"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function Starfield({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 4500), 180);
    const starColors = ["#F5F3ED", "#F4C95D", "#7FE7D8", "#5B6EE1"];
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() < 0.8 ? 1 : Math.random() < 0.95 ? 1.8 : 2.6,
      opacity: Math.random() * 0.7 + 0.3,
      speed: (Math.random() * 0.15 + 0.05) * (Math.random() < 0.5 ? 1 : -1),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    let shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render static & twinkling stars
      stars.forEach((star) => {
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.015;
        star.opacity = Math.max(0.15, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();

        // Slow drift
        star.y += star.speed;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      // Periodic shooting star
      const now = Date.now();
      if (now - lastShootingStarTime > 4000 && Math.random() < 0.03) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 7,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          opacity: 1,
        });
        lastShootingStarTime = now;
      }

      // Render shooting stars
      shootingStars = shootingStars.filter((sStar) => {
        const endX = sStar.x - Math.cos(sStar.angle) * sStar.length;
        const endY = sStar.y - Math.sin(sStar.angle) * sStar.length;

        const gradient = ctx.createLinearGradient(sStar.x, sStar.y, endX, endY);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(127, 231, 216, 0.8)");
        gradient.addColorStop(1, "rgba(11, 16, 38, 0)");

        ctx.beginPath();
        ctx.moveTo(sStar.x, sStar.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = sStar.opacity;
        ctx.stroke();

        sStar.x += Math.cos(sStar.angle) * sStar.speed;
        sStar.y += Math.sin(sStar.angle) * sStar.speed;
        sStar.opacity -= 0.02;

        return sStar.opacity > 0 && sStar.x < width + 100 && sStar.y < height + 100;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
