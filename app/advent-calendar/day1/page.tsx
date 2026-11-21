'use client';

import { useState, useCallback } from 'react';

const SNOWFLAKES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 173 + 50) % 88 + 6,
  y: (i * 97 + 20) % 72 + 4,
  size: 7 + (i * 7 % 8),
  opacity: 0.35 + (i * 11 % 50) / 100,
}));

function ChristmasScene({ treeColor, name }: { treeColor: string; name: string }) {
  return (
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
        Merry Christmas, {name}! 🎄
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

          <polygon points="-60,0 60,0 0,-60" fill={treeColor} />
          <polygon points="-45,-38 45,-38 0,-98" fill={treeColor} />
          <polygon points="-30,-72 30,-72 0,-135" fill={treeColor} />

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

function parseCode(code: string): { treeColor: string; yourName: string } {
  const colorMatch = code.match(/let\s+treeColor\s*=\s*["']([^"']+)["']/);
  const nameMatch = code.match(/let\s+yourName\s*=\s*["']([^"']+)["']/);
  return {
    treeColor: colorMatch?.[1] ?? 'green',
    yourName: nameMatch?.[1] ?? 'Friend',
  };
}

const DEFAULT_CODE = `// 🌲 CONTROL PANEL (change me)
let treeColor = "green";
let yourName = "Friend";`;

const SOLUTION_CODE = `// 🌲 CONTROL PANEL (change me)
let treeColor = "purple";
let yourName = "Your Name";`;

export default function Day1Page() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState({ treeColor: 'green', yourName: 'Friend' });
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const runCode = useCallback(() => {
    setOutput(parseCode(code));
    setFeedback(null);
  }, [code]);

  const checkAnswer = useCallback(() => {
    const { treeColor, yourName } = parseCode(code);
    if (treeColor === 'green' && yourName === 'Friend') {
      setFeedback({ ok: false, msg: 'Change the tree color and your name first!' });
    } else if (treeColor === 'green') {
      setFeedback({ ok: false, msg: 'Change the tree color too!' });
    } else if (yourName === 'Friend') {
      setFeedback({ ok: false, msg: 'Change yourName to something other than Friend!' });
    } else {
      setFeedback({ ok: true, msg: 'Great job! You made it yours! 🎉' });
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
        .d1-copy-btn:hover { background: rgba(255,255,255,0.14) !important; }
        .d1-run-btn:hover  { background: #15803d !important; }
        .d1-check-btn:hover { background: #b91c1c !important; }
        .d1-sol-btn:hover  { background: rgba(255,215,0,0.12) !important; }
        .d1-editor { caret-color: #7dd3fc; }
        .d1-editor::selection { background: rgba(99,103,255,0.35); }
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
            }}>DAY 1 OF 24</span>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.4rem,5vw,1.9rem)', fontWeight: 900 }}>
              🎅 Make it yours
            </h1>
          </div>

          <p style={{ color: '#c4c9e8', marginBottom: '1.5rem', lineHeight: 1.65, fontSize: '0.97rem' }}>
            Change the color of the tree to any color you like. Then type your name between the quotes. Press{' '}
            <strong>Run</strong> and watch the picture change. It takes 10 to 20 seconds!
          </p>

          {/* Target Output */}
          <p style={{
            color: '#7dd3fc', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 0.45rem',
          }}>Target Output</p>
          <div style={{ marginBottom: '1.5rem' }}>
            <ChristmasScene treeColor="purple" name="Your Name" />
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
                  className="d1-copy-btn"
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
                  className="d1-run-btn"
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
                className="d1-editor"
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

            {/* Hidden lines */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.25)', color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem',
            }}>
              <span>🔒</span>
              <span style={{ color: '#ffd700', fontWeight: 700 }}>4 – 46</span>
              <span>hidden: the snow, Santa, lights and star are already done for you</span>
            </div>
          </div>

          {/* Output */}
          <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.45rem' }}>
            Output
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <ChristmasScene treeColor={output.treeColor} name={output.yourName} />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button
              className="d1-check-btn"
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
              className="d1-sol-btn"
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
              Done? Tomorrow the snow starts to fall ❄️
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px', padding: '10px 24px',
              color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem', fontWeight: 600,
            }}>
              🔒 Day 2 opens Dec 2
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

            {/* Top row */}
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
    </>
  );
}
