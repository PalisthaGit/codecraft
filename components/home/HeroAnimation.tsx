"use client";

import { useEffect, useState } from "react";

type Phase = "floating" | "merging" | "merged" | "resetting";

const TIMINGS: Record<Phase, number> = {
  floating:  2600,
  merging:   700,
  merged:    2400,
  resetting: 500,
};

const CARDS = [
  { label: "HTML", icon: "</>", iconColor: "#f97316", bg: "#1c1917", border: "#57534e" },
  { label: "CSS",  icon: "{ }", iconColor: "#60a5fa", bg: "#0f1e33", border: "#1d4ed8" },
  { label: "JS",   icon: "( )", iconColor: "#fbbf24", bg: "#1c1a0a", border: "#78580a" },
];

export default function HeroAnimation() {
  const [phase, setPhase] = useState<Phase>("floating");

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase((p) =>
        p === "floating"  ? "merging"   :
        p === "merging"   ? "merged"    :
        p === "merged"    ? "resetting" :
        "floating"
      );
    }, TIMINGS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const cardsVisible = phase === "floating";
  const isMerging    = phase === "merging";
  const browserVisible = phase === "merged";

  return (
    <div
      style={{ width: 260, height: 200, position: "relative", flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* ── Code cards ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          opacity:   cardsVisible ? 1 : 0,
          transform: cardsVisible ? "scale(1)" : "scale(0.55)",
          transition: "opacity 450ms ease, transform 500ms ease",
          pointerEvents: "none",
        }}
      >
        {CARDS.map((c, i) => (
          <div
            key={c.label}
            style={{
              background: c.bg,
              border: `1.5px solid ${c.border}`,
              borderRadius: 12,
              width: 68,
              height: 68,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              boxShadow: `0 4px 16px rgba(0,0,0,0.35)`,
              animation: cardsVisible
                ? `heroFloat 2s ease-in-out ${i * 0.32}s infinite`
                : "none",
            }}
          >
            <span style={{ color: c.iconColor, fontFamily: "monospace", fontSize: 17, fontWeight: 800, lineHeight: 1 }}>
              {c.icon}
            </span>
            <span style={{ color: "#94a3b8", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Magic burst on merge ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,103,255,0.55) 0%, transparent 70%)",
            opacity: isMerging ? 1 : 0,
            transform: isMerging ? "scale(2.5)" : "scale(0.2)",
            transition: "opacity 350ms ease, transform 650ms ease",
          }}
        />
        {/* sparkle dots */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#a5b4fc",
              opacity: isMerging ? 1 : 0,
              transform: isMerging
                ? `rotate(${deg}deg) translateX(44px) scale(1)`
                : `rotate(${deg}deg) translateX(0px) scale(0)`,
              transition: `opacity 400ms ease, transform 550ms ease ${deg * 0.3}ms`,
            }}
          />
        ))}
      </div>

      {/* ── Browser mockup ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            opacity: browserVisible ? 1 : 0,
            transform: browserVisible ? "scale(1) translateY(0)" : "scale(0.78) translateY(12px)",
            transition: "opacity 450ms ease, transform 450ms cubic-bezier(0.34,1.4,0.64,1)",
            width: 210,
            borderRadius: 10,
            overflow: "hidden",
            border: "1.5px solid #334155",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(99,103,255,0.15)",
            background: "#1e293b",
          }}
        >
          {/* Chrome bar */}
          <div style={{ background: "#0f172a", padding: "7px 10px", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f87171", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <div style={{
              flex: 1,
              marginLeft: 8,
              background: "#1e293b",
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: "0.58rem",
              color: "#64748b",
              textAlign: "center",
              border: "1px solid #334155",
            }}>
              mywebsite.com
            </div>
          </div>

          {/* Page content */}
          <div style={{ padding: "14px 14px 16px" }}>
            {/* fake nav bar */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <div style={{ height: 4, borderRadius: 2, background: "#6367ff", width: "18%" }} />
              <div style={{ height: 4, borderRadius: 2, background: "#334155", width: "14%" }} />
              <div style={{ height: 4, borderRadius: 2, background: "#334155", width: "14%" }} />
            </div>
            {/* hero text lines */}
            <div style={{ height: 5, borderRadius: 3, background: "#475569", marginBottom: 6, width: "75%" }} />
            <div style={{ height: 5, borderRadius: 3, background: "#334155", marginBottom: 12, width: "55%" }} />
            {/* website label */}
            <div style={{ textAlign: "center" }}>
              <span style={{
                background: "rgba(99,103,255,0.15)",
                border: "1px solid rgba(99,103,255,0.35)",
                color: "#a5b4fc",
                fontSize: "0.68rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: 999,
                letterSpacing: "0.04em",
              }}>
                ✦ Website
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
