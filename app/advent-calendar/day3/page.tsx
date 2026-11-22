'use client';

import { useState, useCallback } from 'react';

const SNOWFLAKES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 173 + 50) % 88 + 6,
  y: (i * 97 + 20) % 72 + 4,
  size: 7 + (i * 7 % 8),
  opacity: 0.35 + (i * 11 % 50) / 100,
}));

const LIGHTS = [
  { cx: -46, cy: -20, delay: 0 },
  { cx: 41, cy: -15, delay: 0.3 },
  { cx: -27, cy: -9, delay: 0.6 },
  { cx: 23, cy: -6, delay: 0.1 },
  { cx: -56, cy: -11, delay: 0.4 },
  { cx: 52, cy: -7, delay: 0.7 },
  { cx: -36, cy: -60, delay: 0.2 },
  { cx: 33, cy: -57, delay: 0.5 },
  { cx: -16, cy: -52, delay: 0.8 },
  { cx: 14, cy: -50, delay: 0.15 },
  { cx: -18, cy: -96, delay: 0.35 },
  { cx: 15, cy: -94, delay: 0.65 },
  { cx: -3, cy: -118, delay: 0.5 },
];

function ChristmasScene({ blinkSpeed, lightColor }: { blinkSpeed: number; lightColor: string }) {
  const dur = Math.max(0.15, Math.min(blinkSpeed, 10));
  return (
    <>
      <style>{`
        @keyframes d3-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.08; }
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(180deg,#06082a 0%,#0d1b4e 100%)',
        borderRadius: '12px',
        padding: '16px 20px 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '230px',
        border: '2px dashed rgba(255,255,255,0.25)',
      }}>
        {SNOWFLAKES.map(f => (
          <div key={f.id} style={{
            position: 'absolute', left: `${f.x}%`, top: `${f.y}%`,
            color: 'white', opacity: f.opacity, fontSize: `${f.size}px`,
            pointerEvents: 'none', userSelect: 'none',
          }}>❄</div>
        ))}

        <h2 style={{
          textAlign: 'center', color: 'white', fontWeight: 900,
          fontSize: '1.25rem', margin: '0 0 2px',
          fontFamily: 'var(--font-nunito, sans-serif)',
          textShadow: '0 0 24px rgba(255,255,255,0.4)',
          position: 'relative', zIndex: 2,
        }}>
          Merry Christmas, Friend! 🎄
        </h2>

        <p style={{
          textAlign: 'center', margin: '0 0 4px',
          fontSize: '1.1rem', position: 'relative', zIndex: 2,
        }}>
          🦌🛷🎅
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
          <svg width="130" height="175" viewBox="-80 -170 160 200" aria-hidden>
            <ellipse cx="0" cy="30" rx="90" ry="20" fill="white" opacity="0.92" />
            <rect x="-10" y="-10" width="20" height="40" rx="3" fill="#6d4c41" />

            <polygon points="-68,0 68,0 0,-68" fill="#2e7d32" />
            <polygon points="-52,-42 52,-42 0,-112" fill="#388e3c" />
            <polygon points="-36,-82 36,-82 0,-152" fill="#43a047" />

            <polygon
              points="0,-9 2.1,-2.9 8.6,-2.8 3.4,1.1 5.3,7.3 0,3.6 -5.3,7.3 -3.4,1.1 -8.6,-2.8 -2.1,-2.9"
              fill="#ffd700" stroke="#ffa000" strokeWidth="0.6"
              transform="translate(0,-161)"
            />

            {LIGHTS.map((l, i) => (
              <circle
                key={i}
                cx={l.cx} cy={l.cy} r="6"
                fill={lightColor}
                style={{
                  animation: `d3-blink ${dur}s ease-in-out ${l.delay}s infinite`,
                  filter: `drop-shadow(0 0 5px ${lightColor})`,
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </>
  );
}

function parseCode(code: string): { blinkSpeed: number; lightColor: string } {
  const speedMatch = code.match(/let\s+blinkSpeed\s*=\s*([\d.]+)/);
  const colorMatch = code.match(/let\s+lightColor\s*=\s*["']([^"']+)["']/);
  return {
    blinkSpeed: Math.max(0.15, Math.min(10, parseFloat(speedMatch?.[1] ?? '1.2'))),
    lightColor: colorMatch?.[1] ?? 'white',
  };
}

const DEFAULT_CODE = `// 💡 LIGHTS PANEL (change me)
let lightColor = "white";
let blinkSpeed = 1.2;`;

const SOLUTION_CODE = `// 💡 LIGHTS PANEL (change me)
let lightColor = "gold";
let blinkSpeed = 0.4;`;

export default function Day3Page() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState({ blinkSpeed: 1.2, lightColor: 'white' });
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const runCode = useCallback(() => {
    setOutput(parseCode(code));
    setFeedback(null);
  }, [code]);

  const checkAnswer = useCallback(() => {
    const { blinkSpeed, lightColor } = parseCode(code);
    if (lightColor === 'white' && blinkSpeed === 1.2) {
      setFeedback({ ok: false, msg: 'Change the light color and blink speed first!' });
    } else if (lightColor === 'white') {
      setFeedback({ ok: false, msg: 'Change the lightColor to something other than white!' });
    } else if (blinkSpeed === 1.2) {
      setFeedback({ ok: false, msg: 'Change blinkSpeed to make the lights flash faster or slower!' });
    } else {
      setFeedback({ ok: true, msg: 'The lights are blinking! Great work! 🎉' });
    }
  }, [code]);

  const showSolution = useCallback(() => {
    setCode(SOLUTION_CODE);
    setOutput(parseCode(SOLUTION_CODE));
    setFeedback(null);
  }, []);

  return (
    <>
      <style>{`
        .d3-copy-btn:hover  { background: rgba(255,255,255,0.14) !important; }
        .d3-run-btn:hover   { background: #15803d !important; }
        .d3-check-btn:hover { background: #b91c1c !important; }
        .d3-sol-btn:hover   { background: rgba(255,215,0,0.12) !important; }
        .d3-editor { caret-color: #7dd3fc; }
        .d3-editor::selection { background: rgba(99,103,255,0.35); }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#020209 0%,#05051a 25%,#08082a 55%,#0d1b3e 85%,#0a1428 100%)',
        color: 'white',
        padding: '2.25rem 1rem 0',
        fontFamily: 'var(--font-nunito, sans-serif)',
      }}>
        <div style={{ maxWidth: '660px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
            <span style={{
              background: '#ffd700', color: '#1a0a00', borderRadius: '20px',
              padding: '4px 14px', fontWeight: 800, fontSize: '0.82rem', whiteSpace: 'nowrap',
            }}>DAY 3 OF 24</span>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.4rem,5vw,1.9rem)', fontWeight: 900 }}>
              💡 Blinking lights
            </h1>
          </div>

          <p style={{ color: '#c4c9e8', marginBottom: '1.5rem', lineHeight: 1.65, fontSize: '0.97rem' }}>
            Change the color of the tree lights to any color you like. Then change the number to make
            them blink faster or slower. Press <strong>Run</strong> and watch them flash. It takes about 15 seconds!
          </p>

          {/* Target Output */}
          <p style={{
            color: '#7dd3fc', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 0.45rem',
          }}>Target Output</p>
          <div style={{ marginBottom: '1.5rem' }}>
            <ChristmasScene blinkSpeed={0.4} lightColor="gold" />
          </div>

          {/* Code editor */}
          <div style={{
            background: '#10152a', borderRadius: '12px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem',
          }}>
            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', color: '#7dd3fc' }}>
                JAVASCRIPT
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="d3-copy-btn"
                  onClick={() => navigator.clipboard?.writeText(code)}
                  style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                    color: '#c4c9e8', borderRadius: '6px', padding: '4px 11px',
                    cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'inherit',
                  }}
                >
                  📋 Copy
                </button>
                <button
                  className="d3-run-btn"
                  onClick={runCode}
                  style={{
                    background: '#16a34a', border: 'none', color: 'white',
                    borderRadius: '6px', padding: '4px 14px', cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.85rem', fontFamily: 'inherit',
                  }}
                >
                  ▶ Run
                </button>
              </div>
            </div>

            {/* Editor with line numbers */}
            <div style={{ display: 'flex', fontFamily: 'monospace', fontSize: '0.88rem' }}>
              <div style={{
                padding: '12px 10px 12px 16px', color: 'rgba(255,255,255,0.28)',
                userSelect: 'none', lineHeight: '1.65', textAlign: 'right', minWidth: '30px',
              }}>
                {[1, 2, 3].map(n => <div key={n}>{n}</div>)}
              </div>
              <textarea
                className="d3-editor"
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
                rows={3}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#e2e8f0', padding: '12px 16px 12px 6px', lineHeight: '1.65',
                  resize: 'none', fontFamily: 'monospace', fontSize: '0.88rem',
                }}
              />
            </div>

            {/* Hidden lines hint */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.25)', color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem',
            }}>
              <span>🔒</span>
              <span style={{ color: '#ffd700', fontWeight: 700 }}>4 – 70</span>
              <span>hidden: the tree, snow and Santa from Days 1 and 2 are already done for you</span>
            </div>
          </div>

          {/* Output */}
          <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.45rem' }}>
            Output
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <ChristmasScene blinkSpeed={output.blinkSpeed} lightColor={output.lightColor} />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button
              className="d3-check-btn"
              onClick={checkAnswer}
              style={{
                background: '#dc2626', border: 'none', color: 'white',
                borderRadius: '10px', padding: '12px 22px',
                cursor: 'pointer', fontWeight: 700, fontSize: '1rem', fontFamily: 'inherit',
              }}
            >
              Check my answer
            </button>
            <button
              className="d3-sol-btn"
              onClick={showSolution}
              style={{
                background: 'transparent', border: '2px solid #ffd700', color: '#ffd700',
                borderRadius: '10px', padding: '12px 22px',
                cursor: 'pointer', fontWeight: 700, fontSize: '1rem', fontFamily: 'inherit',
              }}
            >
              Show solution
            </button>
          </div>

          {feedback && (
            <div style={{
              padding: '11px 16px', borderRadius: '10px', marginBottom: '1rem',
              background: feedback.ok ? 'rgba(74,222,128,0.12)' : 'rgba(239,68,68,0.12)',
              border: `1px solid ${feedback.ok ? '#4ade80' : '#ef4444'}`,
              color: feedback.ok ? '#4ade80' : '#f87171',
              fontWeight: 600, fontSize: '0.95rem',
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Next day teaser */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Done? Tomorrow Santa learns to talk 🤖
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px', padding: '10px 24px',
              color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem', fontWeight: 600,
            }}>
              🔒 Day 4 opens Dec 4
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: '#0d1117',
          fontFamily: 'var(--font-nunito, sans-serif)',
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '2.5rem' }}>
              <div style={{ flex: 1, minWidth: '160px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.01em' }}>
                  CodingBanana
                </span>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, maxWidth: '200px' }}>
                  Free, beginner-friendly tutorials for HTML, CSS, and JavaScript.
                </p>
              </div>
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
    </>
  );
}
