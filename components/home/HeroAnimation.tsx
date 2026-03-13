"use client";

import { useEffect, useState } from "react";

type Phase = "floating" | "merging" | "merged" | "resetting";

const TIMINGS: Record<Phase, number> = {
  floating: 2600,
  merging:  600,
  merged:   1800,
  resetting: 500,
};

const sources = [
  { label: "HTML",       bg: "#fff7ed", border: "#fed7aa", color: "#ea580c" },
  { label: "CSS",        bg: "#eff6ff", border: "#bfdbfe", color: "#2563eb" },
  { label: "JavaScript", bg: "#fefce8", border: "#fde68a", color: "#b45309" },
];

export default function HeroAnimation() {
  const [phase, setPhase] = useState<Phase>("floating");

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase((p) =>
        p === "floating"  ? "merging"  :
        p === "merging"   ? "merged"   :
        p === "merged"    ? "resetting":
        "floating"
      );
    }, TIMINGS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const sourceOpacity  = phase === "floating" ? 1 : 0;
  const sourceScale    = phase === "floating" ? 1 : 0.75;
  const resultOpacity  = phase === "merged"   ? 1 : 0;
  const resultScale    = phase === "merged"   ? 1 : 0.8;

  return (
    <div className="relative h-16 flex items-center justify-center select-none overflow-visible my-6">

      {/* — Source pills — */}
      <div
        className="absolute flex items-center gap-2 sm:gap-3"
        style={{
          opacity: sourceOpacity,
          transform: `scale(${sourceScale})`,
          transition: "opacity 400ms ease, transform 400ms ease",
          pointerEvents: "none",
        }}
      >
        {sources.map((s, i) => (
          <span
            key={s.label}
            style={{
              background: s.bg,
              border: `1.5px solid ${s.border}`,
              color: s.color,
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "0.75rem",
              fontWeight: 700,
              display: "inline-block",
              animation: phase === "floating"
                ? `heroFloat 2.2s ease-in-out ${i * 0.3}s infinite`
                : "none",
            }}
          >
            {s.label}
          </span>
        ))}

        <span style={{ color: "#94a3b8", fontWeight: 800, fontSize: "1rem", margin: "0 2px" }}>
          →
        </span>

        {/* dimmed website placeholder */}
        <span
          style={{
            background: "rgba(99,103,255,0.06)",
            border: "1.5px dashed rgba(99,103,255,0.25)",
            color: "#6367ff",
            opacity: 0.45,
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          Website
        </span>
      </div>

      {/* — Result pill — */}
      <div
        className="absolute"
        style={{
          opacity: resultOpacity,
          transform: `scale(${resultScale})`,
          transition: "opacity 400ms ease, transform 400ms ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            background: "#6367ff",
            color: "#fff",
            padding: "10px 28px",
            borderRadius: "999px",
            fontSize: "0.9rem",
            fontWeight: 800,
            boxShadow: "0 4px 20px rgba(99,103,255,0.45)",
            display: "inline-block",
            letterSpacing: "-0.01em",
          }}
        >
          ✦ Website
        </span>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
