"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  angle: number;
}

export default function ChristmasBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 60;
    snowflakesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1.5,
      speed: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.5 + 0.4,
      drift: 0,
      driftSpeed: (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      for (const flake of snowflakesRef.current) {
        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.speed;
        flake.angle += 0.01;
        flake.x += Math.sin(flake.angle) * 0.4 + flake.driftSpeed;

        if (flake.y > canvas.height + 4) {
          flake.y = -4;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width + 4) flake.x = -4;
        if (flake.x < -4) flake.x = canvas.width + 4;
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Link href="/advent-calendar" className="block w-full group">
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "80px",
          background: "linear-gradient(180deg, #0a1628 0%, #0d2347 60%, #112b58 100%)",
        }}
      >
        {/* Snow canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Ground snow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-3"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full gap-3 px-4">
          <span className="text-xl select-none">🦌🎅</span>
          <span className="text-white font-bold text-sm md:text-base tracking-wide drop-shadow">
            🎄 Advent Calendar is here!
          </span>
          <span
            className="hidden sm:inline-block text-white/80 text-xs md:text-sm border border-white/30 rounded-full px-3 py-0.5 bg-white/10 group-hover:bg-white/20 transition-colors"
          >
            Open →
          </span>
          <span className="text-xl select-none">⭐</span>
        </div>
      </div>
    </Link>
  );
}
