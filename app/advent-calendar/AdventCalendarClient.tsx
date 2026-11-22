'use client';

import { useState } from 'react';

// 3-colour Christmas cycle for days 1-23
const CYCLE = ['#b91c1c', '#1d4ed8', '#15803d'];
const boxColor = (day: number) => CYCLE[(day - 1) % 3];

// Deterministic values — avoids SSR/client hydration mismatch
const SNOWFLAKES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: (i * 183) % 100,
  size: 2 + (i * 9 % 40) / 10,
  duration: 8 + (i * 25 % 120) / 10,
  delay: -((i * 27) % 150) / 10,
  opacity: 0.35 + (i * 11 % 55) / 100,
}));

const STARS = Array.from({ length: 110 }, (_, i) => ({
  id: i,
  left: (i * 83) % 100,
  top: (i * 61) % 65,
  size: 0.8 + (i * 25 % 22) / 10,
  opacity: 0.3 + (i * 6 % 65) / 100,
  twinkle: i % 5 === 0,
  dur: 1.2 + (i * 3 % 25) / 10,
  delay: (i * 19 % 40) / 10,
}));

const GLITTER = [
  { t: '15%', l: '12%', d: '1.9s', del: '0s' },
  { t: '75%', l: '82%', d: '2.3s', del: '0.5s' },
  { t: '20%', l: '85%', d: '1.7s', del: '1s'  },
  { t: '78%', l: '15%', d: '2.1s', del: '1.5s' },
  { t: '50%', l: '50%', d: '2.5s', del: '0.8s' },
] as const;

function TreeBody({ face = false, lights = false }: { face?: boolean; lights?: boolean }) {
  return (
    <>
      {/* Trunk */}
      <rect x="-14" y="-4" width="28" height="30" rx="3" fill="#6d4c41" />

      {/* Tier 1 — bottom */}
      <polygon points="-68,0 68,0 0,-68" fill="#2e7d32" />
      <polygon points="-24,0 24,0 0,-26" fill="rgba(255,255,255,0.72)" />

      {/* Tier 2 — middle */}
      <polygon points="-52,-42 52,-42 0,-112" fill="#388e3c" />
      <polygon points="-18,-42 18,-42 0,-64" fill="rgba(255,255,255,0.72)" />

      {/* Tier 3 — top */}
      <polygon points="-36,-82 36,-82 0,-152" fill="#43a047" />
      <polygon points="-12,-82 12,-82 0,-102" fill="rgba(255,255,255,0.72)" />

      {/* Star */}
      <polygon
        points="0,-9 2.1,-2.9 8.6,-2.8 3.4,1.1 5.3,7.3 0,3.6 -5.3,7.3 -3.4,1.1 -8.6,-2.8 -2.1,-2.9"
        fill="#ffd700"
        stroke="#ffa000"
        strokeWidth="0.6"
        transform="translate(0,-162)"
      />

      {/* Kawaii face */}
      {face && (
        <>
          <circle cx="-11" cy="-32" r="5" fill="#1a1a1a" />
          <circle cx="11" cy="-32" r="5" fill="#1a1a1a" />
          <circle cx="-9.5" cy="-33.5" r="1.8" fill="white" />
          <circle cx="12.5" cy="-33.5" r="1.8" fill="white" />
          <path d="M-11,-22 Q0,-13 11,-22" stroke="#1a1a1a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          <circle cx="-22" cy="-20" r="8" fill="#ff8a80" opacity="0.42" />
          <circle cx="22" cy="-20" r="8" fill="#ff8a80" opacity="0.42" />
        </>
      )}

      {/* Ornament lights */}
      {lights && (
        <>
          {/* Tier 1 lights */}
          <circle cx="-46" cy="-20" r="6" fill="#ef5350" />
          <circle cx="41" cy="-15" r="6" fill="#26c6da" />
          <circle cx="-27" cy="-9" r="5" fill="#ffee58" />
          <circle cx="23" cy="-6" r="6" fill="#ce93d8" />
          <circle cx="-56" cy="-11" r="5" fill="#66bb6a" />
          <circle cx="52" cy="-7" r="5" fill="#ff7043" />
          {/* Tier 2 lights */}
          <circle cx="-36" cy="-60" r="5" fill="#42a5f5" />
          <circle cx="33" cy="-57" r="5" fill="#ef5350" />
          <circle cx="-16" cy="-52" r="4" fill="#ffee58" />
          <circle cx="14" cy="-50" r="5" fill="#66bb6a" />
          {/* Tier 3 lights */}
          <circle cx="-18" cy="-96" r="4" fill="#ff7043" />
          <circle cx="15" cy="-94" r="4" fill="#42a5f5" />
          <circle cx="-3" cy="-118" r="3.5" fill="#ef5350" />
        </>
      )}
    </>
  );
}

function lightHex(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function GiftBox({
  day,
  unlocked,
  opened,
  onClick,
  floatDelay,
  big = false,
}: {
  day: number;
  unlocked: boolean;
  opened: boolean;
  onClick: () => void;
  floatDelay: string;
  big?: boolean;
}) {
  const base = day === 24 ? '#7e22ce' : boxColor(day);
  const bg = opened
    ? 'radial-gradient(circle, #1a3a22, #0d1a10)'
    : `radial-gradient(circle at 35% 35%, ${lightHex(base, 50)}, ${base})`;

  return (
    // wrapper gives the badge room to overflow the corner
    <div style={{ position: 'relative', paddingTop: '14px', paddingLeft: '14px' }}>
      {/* Number badge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          width: big ? '44px' : '34px',
          height: big ? '44px' : '34px',
          borderRadius: '50%',
          background: '#ffd700',
          border: '2.5px solid #fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: big ? '1.1rem' : '0.85rem',
          color: '#1a0a00',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          fontFamily: 'var(--font-nunito, sans-serif)',
        }}
      >
        {day}
      </div>

      {/* Gift button */}
      <button
        onClick={onClick}
        className={`ac-door${!unlocked ? ' locked' : ''}${opened ? ' opened' : ''}`}
        aria-label={`Day ${day}`}
        style={{
          '--fd': floatDelay,
          width: '100%',
          aspectRatio: big ? '16 / 7' : '3 / 2',
          borderRadius: big ? '18px' : '12px',
          border: opened
            ? '2px solid rgba(74,222,128,0.3)'
            : day === 24
            ? '2px solid rgba(255,215,0,0.5)'
            : '2px solid rgba(255,215,0,0.18)',
          cursor: unlocked ? 'pointer' : 'not-allowed',
          background: bg,
          position: 'relative',
          overflow: 'hidden',
          padding: 0,
          boxShadow: day === 24
            ? '0 0 40px rgba(126,34,206,0.5), 0 8px 32px rgba(0,0,0,0.5)'
            : '0 4px 16px rgba(0,0,0,0.3)',
        } as React.CSSProperties}
      >
        {/* Glitter dots */}
        {!opened && GLITTER.map((g, gi) => (
          <div
            key={gi}
            className="ac-glitter-dot"
            style={{
              position: 'absolute',
              top: g.t,
              left: g.l,
              width: big ? '6px' : '4px',
              height: big ? '6px' : '4px',
              borderRadius: '50%',
              background: '#ffd700',
              '--gd': g.d,
              '--gdel': g.del,
              pointerEvents: 'none',
            } as React.CSSProperties}
          />
        ))}

        {/* Ribbon vertical */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: '50%', transform: 'translateX(-50%)',
          width: big ? '8%' : '10%',
          background: 'rgba(255,215,0,0.6)',
          pointerEvents: 'none',
        }} />
        {/* Ribbon horizontal */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: '50%', transform: 'translateY(-50%)',
          height: big ? '14%' : '16%',
          background: 'rgba(255,215,0,0.6)',
          pointerEvents: 'none',
        }} />
        {/* Bow */}
        <div style={{
          position: 'absolute',
          top: '22%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: big ? '18%' : '28%',
          height: big ? '30%' : '36%',
          borderRadius: '50%',
          background: 'rgba(255,215,0,0.82)',
          pointerEvents: 'none',
        }} />

        {/* Opened checkmark */}
        {opened && (
          <span style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#4ade80', fontSize: big ? '2.5rem' : '1.6rem',
            fontFamily: 'var(--font-nunito, sans-serif)',
          }}>✓</span>
        )}
      </button>
    </div>
  );
}

export default function AdventCalendarClient() {
  const [openedDoors, setOpenedDoors] = useState<Set<number>>(new Set());
  const [popup, setPopup] = useState<number | null>(null);

  const isUnlocked = (day: number) => day <= 2;

  const handleClick = (day: number) => {
    if (!isUnlocked(day)) return;
    setOpenedDoors(prev => new Set([...prev, day]));
    setPopup(day);
  };

  const gridPad = 'max(clamp(12px,4vw,24px), env(safe-area-inset-left, 0px))';

  return (
    <>
      <style>{`
        @keyframes ac-snowfall {
          0%   { transform: translateY(-10px) translateX(0px); opacity: 1; }
          33%  { transform: translateY(33vh) translateX(14px); }
          66%  { transform: translateY(66vh) translateX(-9px); }
          100% { transform: translateY(110vh) translateX(5px); opacity: 0.2; }
        }
        @keyframes ac-twinkle {
          0%, 100% { opacity: var(--s-op); transform: scale(1); }
          50%       { opacity: calc(var(--s-op) * 0.1); transform: scale(0.3); }
        }
        @keyframes ac-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes ac-glitter {
          0%, 100% { opacity: 0;   transform: scale(0)   rotate(0deg); }
          30%       { opacity: 1;   transform: scale(1.2) rotate(45deg); }
          70%       { opacity: 0.5; transform: scale(0.7) rotate(90deg); }
        }
        @keyframes ac-popin {
          from { opacity: 0; transform: scale(0.78) translateY(14px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .ac-door {
          animation: ac-float 3s ease-in-out infinite;
          animation-delay: var(--fd);
          transition: filter 0.2s, transform 0.15s;
          display: block;
        }
        .ac-door:not(.locked):hover {
          filter: brightness(1.22) drop-shadow(0 0 12px rgba(255,215,0,0.8)) !important;
          transform: scale(1.05) !important;
          animation-play-state: paused;
        }
        .ac-door.locked  { filter: brightness(0.33) saturate(0.2); cursor: not-allowed; }
        .ac-door.opened  { filter: brightness(0.52) saturate(0.35); }
        .ac-glitter-dot  { animation: ac-glitter var(--gd) ease-in-out var(--gdel) infinite; }
        .ac-star.twinkle { animation: ac-twinkle var(--td) ease-in-out var(--tdel) infinite; }
        .ac-popup-card   { animation: ac-popin 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
        .ac-wrap {
          max-width: 720px;
          width: 100%;
          padding-left:  ${gridPad};
          padding-right: max(clamp(12px,4vw,24px), env(safe-area-inset-right, 0px));
        }
        .ac-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 2.5vw, 18px);
        }
        @media (max-width: 400px) {
          .ac-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {/* Full-screen overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 50,
        overflowY: 'auto', overflowX: 'hidden',
        background: 'linear-gradient(180deg,#020209 0%,#05051a 25%,#08082a 55%,#0d1b3e 85%,#0a1428 100%)',
      }}>

        {/* Stars */}
        {STARS.map(s => (
          <div
            key={s.id}
            className={s.twinkle ? 'ac-star twinkle' : 'ac-star'}
            style={{
              position: 'fixed', left: `${s.left}%`, top: `${s.top}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              borderRadius: '50%', background: '#fff', opacity: s.opacity,
              '--s-op': s.opacity, '--td': `${s.dur}s`, '--tdel': `${s.delay}s`,
              pointerEvents: 'none',
            } as React.CSSProperties}
          />
        ))}

        {/* Snowflakes */}
        {SNOWFLAKES.map(f => (
          <div
            key={f.id}
            style={{
              position: 'fixed', left: `${f.left}%`, top: '-10px',
              width: `${f.size}px`, height: `${f.size}px`,
              borderRadius: '50%', background: 'rgba(255,255,255,0.88)',
              animation: `ac-snowfall ${f.duration}s linear ${f.delay}s infinite`,
              pointerEvents: 'none', zIndex: 1,
            }}
          />
        ))}

        {/* Kawaii trees + snow ground */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2, pointerEvents: 'none' }}>
          <svg
            viewBox="0 0 1400 280"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          >
            {/* Snow ground */}
            <ellipse cx="700" cy="274" rx="1100" ry="58" fill="white" opacity="0.96" />

            {/* Large tree — far left */}
            <g transform="translate(110,242) scale(1.32)">
              <TreeBody face lights />
            </g>

            {/* Medium tree — left-centre */}
            <g transform="translate(300,250) scale(0.88)">
              <TreeBody face lights />
            </g>

            {/* Small tree — centre-left */}
            <g transform="translate(468,257) scale(0.62)">
              <TreeBody lights />
            </g>

            {/* Tiny background tree — left of centre */}
            <g transform="translate(620,261) scale(0.48)">
              <TreeBody />
            </g>

            {/* Tiny background tree — right of centre */}
            <g transform="translate(780,261) scale(0.48)">
              <TreeBody />
            </g>

            {/* Small tree — centre-right */}
            <g transform="translate(934,257) scale(0.62)">
              <TreeBody lights />
            </g>

            {/* Medium tree — right-centre */}
            <g transform="translate(1100,250) scale(0.88)">
              <TreeBody face lights />
            </g>

            {/* Large tree — far right */}
            <g transform="translate(1290,242) scale(1.32)">
              <TreeBody face lights />
            </g>
          </svg>
        </div>

        {/* Santa */}
        <div style={{ position: 'fixed', top: '8%', right: '4%', zIndex: 1, opacity: 0.45, pointerEvents: 'none' }}>
          <svg width="160" height="70" viewBox="0 0 160 70">
            <path d="M90,55 Q110,42 130,50 Q140,52 142,58 L88,58 Z" fill="#1a0a0a" />
            <path d="M86,58 Q88,64 100,64 L140,64 Q148,64 150,58" stroke="#1a0a0a" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <ellipse cx="98" cy="46" rx="10" ry="8" fill="#1a0a0a" />
            <circle cx="98" cy="34" r="7" fill="#1a0a0a" />
            <path d="M93,30 L96,18 L102,18 L105,30 Z" fill="#1a0a0a" />
            <rect x="91" y="29" width="14" height="3" rx="1.5" fill="#1a0a0a" />
            <ellipse cx="50" cy="50" rx="11" ry="4.5" fill="#1a0a0a" />
            <line x1="50" y1="45" x2="48" y2="34" stroke="#1a0a0a" strokeWidth="2" />
            <ellipse cx="47" cy="32" rx="4" ry="3.5" fill="#1a0a0a" />
            <line x1="44" y1="29" x2="40" y2="22" stroke="#1a0a0a" strokeWidth="1.5" />
            <line x1="40" y1="22" x2="37" y2="17" stroke="#1a0a0a" strokeWidth="1" />
            <line x1="40" y1="22" x2="43" y2="17" stroke="#1a0a0a" strokeWidth="1" />
            <line x1="51" y1="29" x2="55" y2="22" stroke="#1a0a0a" strokeWidth="1.5" />
            <line x1="55" y1="22" x2="52" y2="17" stroke="#1a0a0a" strokeWidth="1" />
            <line x1="55" y1="22" x2="58" y2="17" stroke="#1a0a0a" strokeWidth="1" />
            <ellipse cx="22" cy="52" rx="10" ry="4" fill="#1a0a0a" />
            <line x1="22" y1="48" x2="20" y2="38" stroke="#1a0a0a" strokeWidth="2" />
            <ellipse cx="19" cy="36" rx="4" ry="3" fill="#1a0a0a" />
            <line x1="16" y1="33" x2="12" y2="26" stroke="#1a0a0a" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="9" y2="21" stroke="#1a0a0a" strokeWidth="1" />
            <line x1="12" y1="26" x2="15" y2="21" stroke="#1a0a0a" strokeWidth="1" />
            <line x1="23" y1="33" x2="27" y2="26" stroke="#1a0a0a" strokeWidth="1.5" />
            <line x1="27" y1="26" x2="24" y2="21" stroke="#1a0a0a" strokeWidth="1" />
            <line x1="27" y1="26" x2="30" y2="21" stroke="#1a0a0a" strokeWidth="1" />
            <path d="M54,50 Q72,46 86,52" stroke="#1a0a0a" strokeWidth="1.5" fill="none" />
            <path d="M26,52 Q38,48 50,50" stroke="#1a0a0a" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Page content */}
        <div style={{
          position: 'relative', zIndex: 3, minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 'max(env(safe-area-inset-top, 0px), 2rem)',
          gap: 0,
        }}>

          {/* Title */}
          <h1 style={{
            color: '#ffd700', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900,
            marginBottom: '0.3rem', marginTop: 0, textAlign: 'center',
            textShadow: '0 0 30px rgba(255,215,0,0.4), 0 2px 8px rgba(0,0,0,0.6)',
            letterSpacing: '-0.01em', fontFamily: 'var(--font-nunito, sans-serif)',
          }}>
            🎄 Advent Calendar 2026
          </h1>

          {/* Days 1-23 grid */}
          <div className="ac-wrap">
            <div className="ac-grid">
              {Array.from({ length: 23 }, (_, i) => i + 1).map((day, i) => (
                <GiftBox
                  key={day}
                  day={day}
                  unlocked={isUnlocked(day)}
                  opened={openedDoors.has(day)}
                  onClick={() => handleClick(day)}
                  floatDelay={`${((i * 17) % 28) / 10}s`}
                />
              ))}
            </div>

            {/* Day 24 — big featured box */}
            <div style={{ marginTop: 'clamp(10px, 2.5vw, 18px)' }}>
              <GiftBox
                day={24}
                unlocked={isUnlocked(24)}
                opened={openedDoors.has(24)}
                onClick={() => handleClick(24)}
                floatDelay="1.2s"
                big
              />
            </div>
          </div>

          {/* Footer */}
          <footer style={{
            width: '100%',
            marginTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: '#0d1117',
            paddingBottom: '14rem',
            fontFamily: 'var(--font-nunito, sans-serif)',
          }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>

              {/* Top row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '2.5rem' }}>

                {/* Brand */}
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.01em' }}>
                    CodingBanana
                  </span>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, maxWidth: '200px' }}>
                    Free, beginner-friendly tutorials for HTML, CSS, and JavaScript.
                  </p>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
                  {([
                    ['Learn', [['HTML Basics', '/html'], ['CSS Fundamentals', '/css'], ['JavaScript', '/javascript'], ['Blog', '/blog']]],
                    ['Company', [['About', '/about'], ['Contact', '/contact']]],
                    ['Legal', [['Privacy Policy', '/privacy'], ['Terms of Use', '/terms']]],
                  ] as [string, [string, string][]][]).map(([group, items]) => (
                    <div key={group}>
                      <p style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6367ff', marginBottom: '0.75rem', marginTop: 0 }}>
                        {group}
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {items.map(([label, href]) => (
                          <li key={href}>
                            <a href={href} style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none' }}>
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom row */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#334155', margin: 0 }}>
                  © {new Date().getFullYear()} CodingBanana. All rights reserved.
                </p>
                <p style={{ fontSize: '0.75rem', color: '#334155', margin: 0 }}>
                  Free for everyone. Always.
                </p>
              </div>
            </div>
          </footer>
        </div>

        {/* Popup */}
        {popup !== null && (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.72)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'max(1rem, env(safe-area-inset-top, 0px)) 1rem max(1rem, env(safe-area-inset-bottom, 0px))',
            }}
            onClick={() => setPopup(null)}
          >
            <div
              className="ac-popup-card"
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg,#120822 0%,#1e1040 55%,#0d1b3e 100%)',
                border: '1.5px solid rgba(255,215,0,0.38)',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                maxWidth: '360px', width: '100%', textAlign: 'center',
                boxShadow: '0 0 50px rgba(255,215,0,0.12), 0 24px 60px rgba(0,0,0,0.6)',
                fontFamily: 'var(--font-nunito, sans-serif)',
              }}
            >
              <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.75rem' }}>🎁</div>
              <h2 style={{ color: '#ffd700', fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem' }}>
                Day {popup}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 1.75rem' }}>
                December {popup}
              </p>
              <a
                href={`/advent-calendar/day${popup}`}
                style={{
                  display: 'block',
                  background: 'linear-gradient(135deg,#6367ff 0%,#8494ff 100%)',
                  color: '#fff', padding: '12px 36px', borderRadius: '10px',
                  textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
                  boxShadow: '0 4px 20px rgba(99,103,255,0.45)', marginBottom: '1rem',
                }}
              >
                Start Day
              </a>
              <button
                onClick={() => setPopup(null)}
                style={{
                  background: 'none', border: 'none', color: '#64748b',
                  cursor: 'pointer', fontSize: '0.875rem', padding: '0.5rem 1rem', borderRadius: '6px',
                }}
              >
                Close ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
