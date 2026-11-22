'use client';

import { useState, useCallback } from 'react';

function ChristmasScene({ snowSymbol, snowAmount }: { snowSymbol: string; snowAmount: number }) {
  const count = Math.max(1, Math.min(snowAmount, 200));
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 173 + 50) % 94 + 3,
    duration: 8 + (i * 25 % 100) / 10,
    delay: -((i * 37) % 180) / 10,
    size: 14 + (i * 7 % 14),
    drift: (i % 2 === 0 ? 1 : -1) * (4 + (i * 11 % 12)),
  }));

  return (
    <div style={{
      background: 'linear-gradient(180deg,#06082a 0%,#0d1b4e 100%)',
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      height: '230px',
      border: '2px dashed rgba(255,255,255,0.25)',
    }}>
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-30px',
            fontSize: `${p.size}px`,
            animation: `d2-fall-${p.id % 4} ${p.duration}s linear ${p.delay}s infinite`,
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
            zIndex: 1,
          }}
        >
          {snowSymbol}
        </span>
      ))}

      <h2 style={{
        textAlign: 'center', color: 'white', fontWeight: 900,
        fontSize: '1.25rem', margin: '0',
        fontFamily: 'var(--font-nunito, sans-serif)',
        textShadow: '0 0 24px rgba(255,255,255,0.4)',
        position: 'relative', zIndex: 2,
        paddingTop: '14px',
      }}>
        Merry Christmas, Friend! 🎄
      </h2>

      <p style={{
        position: 'absolute', top: '10px', right: '14px',
        margin: 0, fontSize: '1.05rem', zIndex: 2,
      }}>
        🦌🛷🎅
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <svg width="120" height="175" viewBox="-80 -170 160 200" aria-hidden>
          <ellipse cx="0" cy="30" rx="90" ry="20" fill="white" opacity="0.92" />
          <rect x="-10" y="-10" width="20" height="40" rx="3" fill="#6d4c41" />

          <polygon points="-60,0 60,0 0,-60" fill="#2e7d32" />
          <polygon points="-45,-38 45,-38 0,-98" fill="#388e3c" />
          <polygon points="-30,-72 30,-72 0,-135" fill="#43a047" />

          <polygon
            points="0,-9 2.1,-2.9 8.6,-2.8 3.4,1.1 5.3,7.3 0,3.6 -5.3,7.3 -3.4,1.1 -8.6,-2.8 -2.1,-2.9"
            fill="#ffd700" stroke="#ffa000" strokeWidth="0.6"
            transform="translate(0,-143)"
          />

          <circle cx="-40" cy="-15" r="6" fill="#ef5350" />
          <circle cx="35" cy="-10" r="6" fill="#26c6da" />
          <circle cx="-20" cy="-5" r="5" fill="#ffee58" />
          <circle cx="20" cy="-3" r="6" fill="#ce93d8" />
          <circle cx="-46" cy="-8" r="5" fill="#ff7043" />
          <circle cx="48" cy="-5" r="5" fill="#66bb6a" />
          <circle cx="-30" cy="-55" r="5" fill="#42a5f5" />
          <circle cx="28" cy="-52" r="5" fill="#ef5350" />
          <circle cx="-12" cy="-45" r="4" fill="#ffee58" />
          <circle cx="10" cy="-43" r="5" fill="#66bb6a" />
          <circle cx="-14" cy="-88" r="4" fill="#ff7043" />
          <circle cx="12" cy="-86" r="4" fill="#42a5f5" />
        </svg>
      </div>
    </div>
  );
}

function parseCode(code: string): { snowSymbol: string; snowAmount: number } {
  const symbolMatch = code.match(/let\s+snowSymbol\s*=\s*["']([^"']+)["']/);
  const amountMatch = code.match(/let\s+snowAmount\s*=\s*(\d+)/);
  return {
    snowSymbol: symbolMatch?.[1] ?? '❄',
    snowAmount: Math.min(200, Math.max(1, parseInt(amountMatch?.[1] ?? '25', 10))),
  };
}

const DEFAULT_CODE = `// ❄ SNOW PANEL (change me)
let snowSymbol = "❄";
let snowAmount = 25;`;

const SOLUTION_CODE = `// ❄ SNOW PANEL (change me)
let snowSymbol = "💗";
let snowAmount = 50;`;

export default function Day2Page() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState({ snowSymbol: '❄', snowAmount: 25 });
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const runCode = useCallback(() => {
    setOutput(parseCode(code));
    setFeedback(null);
  }, [code]);

  const checkAnswer = useCallback(() => {
    const { snowSymbol, snowAmount } = parseCode(code);
    if (snowSymbol === '❄' && snowAmount <= 25) {
      setFeedback({ ok: false, msg: 'Change the snow symbol and increase the amount first!' });
    } else if (snowSymbol === '❄') {
      setFeedback({ ok: false, msg: 'Change the snow symbol to something fun!' });
    } else if (snowAmount <= 25) {
      setFeedback({ ok: false, msg: 'Increase snowAmount beyond 25 to make it snow more!' });
    } else {
      setFeedback({ ok: true, msg: "It's snowing! Great job! 🎉" });
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
        @keyframes d2-fall-0 {
          0%   { transform: translateY(0px) translateX(0px);   opacity: 1; }
          100% { transform: translateY(290px) translateX(10px); opacity: 0.3; }
        }
        @keyframes d2-fall-1 {
          0%   { transform: translateY(0px) translateX(0px);    opacity: 1; }
          100% { transform: translateY(290px) translateX(-12px); opacity: 0.3; }
        }
        @keyframes d2-fall-2 {
          0%   { transform: translateY(0px) translateX(0px);  opacity: 1; }
          50%  { transform: translateY(145px) translateX(8px); }
          100% { transform: translateY(290px) translateX(-6px); opacity: 0.3; }
        }
        @keyframes d2-fall-3 {
          0%   { transform: translateY(0px) translateX(0px);   opacity: 1; }
          50%  { transform: translateY(145px) translateX(-9px); }
          100% { transform: translateY(290px) translateX(7px);  opacity: 0.3; }
        }
        .d2-copy-btn:hover { background: rgba(255,255,255,0.14) !important; }
        .d2-run-btn:hover  { background: #15803d !important; }
        .d2-check-btn:hover { background: #b91c1c !important; }
        .d2-sol-btn:hover  { background: rgba(255,215,0,0.12) !important; }
        .d2-editor { caret-color: #7dd3fc; }
        .d2-editor::selection { background: rgba(99,103,255,0.35); }
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
            }}>DAY 2 OF 24</span>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.4rem,5vw,1.9rem)', fontWeight: 900 }}>
              ❄️ Let it snow
            </h1>
          </div>

          <p style={{ color: '#c4c9e8', marginBottom: '1.5rem', lineHeight: 1.65, fontSize: '0.97rem' }}>
            Change the snow into anything you like (a heart, a star, a gift...). Then make it snow more by
            changing the number. Press <strong>Run</strong> and watch it fall. It takes about 15 seconds!
          </p>

          {/* Target Output */}
          <p style={{
            color: '#7dd3fc', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 0.45rem',
          }}>Target Output</p>
          <div style={{ marginBottom: '1.5rem' }}>
            <ChristmasScene snowSymbol="💗" snowAmount={50} />
          </div>

          {/* Code editor */}
          <div style={{
            background: '#10152a', borderRadius: '12px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', color: '#7dd3fc' }}>
                JAVASCRIPT
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="d2-copy-btn"
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
                  className="d2-run-btn"
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

            <div style={{ display: 'flex', fontFamily: 'monospace', fontSize: '0.88rem' }}>
              <div style={{
                padding: '12px 10px 12px 16px', color: 'rgba(255,255,255,0.28)',
                userSelect: 'none', lineHeight: '1.65', textAlign: 'right', minWidth: '30px',
              }}>
                {[1, 2, 3].map(n => <div key={n}>{n}</div>)}
              </div>
              <textarea
                className="d2-editor"
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

            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.25)', color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem',
            }}>
              <span>🔒</span>
              <span style={{ color: '#ffd700', fontWeight: 700 }}>4 – 60</span>
              <span>hidden: the tree, Santa and lights from Day 1 are already done for you</span>
            </div>
          </div>

          {/* Output */}
          <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.45rem' }}>
            Output
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <ChristmasScene snowSymbol={output.snowSymbol} snowAmount={output.snowAmount} />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button
              className="d2-check-btn"
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
              className="d2-sol-btn"
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
              Done? Tomorrow the lights start to blink 💡
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px', padding: '10px 24px',
              color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem', fontWeight: 600,
            }}>
              🔒 Day 3 opens Dec 3
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
