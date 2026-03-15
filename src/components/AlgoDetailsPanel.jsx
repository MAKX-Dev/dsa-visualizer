import { useState } from "react";
import { algoInfo } from '../components/algoInfo';
import { algoCode } from '../components/algoCode';

export default function AlgoDetailsPanel({ algo }) {
  const [activeTab, setActiveTab] = useState("info");
  const info = algoInfo[algo];
  const code = algoCode[algo];

  if (!info) return null;

  const complexityColor = (val) => {
    if (!val) return '#94a3b8';
    if (val.includes('n²') || val.includes('n^2')) return '#ef4444';
    if (val.includes('n log') || val.includes('n·log')) return '#fbbf24';
    if (val.includes('log n')) return '#22c55e';
    if (val === 'O(n)') return '#60a5fa';
    if (val === 'O(1)') return '#22c55e';
    return '#94a3b8';
  };

  return (
    <div style={{
      marginTop: '24px',
      background: 'linear-gradient(135deg, #0f172a 0%, #111827 100%)',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    }}>

      {/* Tab Header */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #1e293b',
        background: '#0a0f1a',
      }}>
        {['info', 'code'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '14px 28px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: activeTab === tab ? '#22c55e' : '#475569',
              borderBottom: activeTab === tab ? '2px solid #22c55e' : '2px solid transparent',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
          >
            {tab === 'info' ? 'INFO' : 'CODE'}
          </button>
        ))}
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          paddingRight: '20px',
          gap: '8px',
        }}>
          <span style={{
            fontSize: '11px',
            color: '#334155',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {info.category}
          </span>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
            display: 'inline-block',
          }} />
        </div>
      </div>

      {/* Info Tab */}
      {activeTab === 'info' && (
        <div style={{ padding: '28px' }}>

          {/* Title + Description */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{
              margin: '0 0 12px 0',
              fontSize: '22px',
              fontWeight: '700',
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}>
              {info.name}
            </h2>
            <p style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.75',
              color: '#64748b',
              maxWidth: '780px',
            }}>
              {info.description}
            </p>
          </div>

          {/* Complexity Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}>
            {[
              { label: 'Best Case', value: info.best },
              { label: 'Average Case', value: info.average },
              { label: 'Worst Case', value: info.worst },
              { label: 'Space', value: info.space },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: '#0d1526',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '2px',
                  background: complexityColor(value),
                  opacity: 0.7,
                }} />
                <div style={{
                  fontSize: '11px',
                  color: '#475569',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: complexityColor(value),
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {value || '-'}
                </div>
              </div>
            ))}
          </div>

          {/* Properties Row */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {info.stable !== undefined && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#0d1526',
                border: `1px solid ${info.stable ? '#166534' : '#7f1d1d'}`,
                borderRadius: '20px',
                fontSize: '13px',
              }}>
                <span style={{ color: info.stable ? '#22c55e' : '#ef4444' }}>
                  {info.stable ? '' : ''}
                </span>
                <span style={{ color: '#94a3b8' }}>Stable</span>
              </div>
            )}
            {info.inPlace !== undefined && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#0d1526',
                border: `1px solid ${info.inPlace ? '#166534' : '#7f1d1d'}`,
                borderRadius: '20px',
                fontSize: '13px',
              }}>
                <span style={{ color: info.inPlace ? '#22c55e' : '#ef4444' }}>
                  {info.inPlace ? '' : ''}
                </span>
                <span style={{ color: '#94a3b8' }}>In-Place</span>
              </div>
            )}
            {info.category && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#0d1526',
                border: '1px solid #1e3a5f',
                borderRadius: '20px',
                fontSize: '13px',
              }}>
                <span style={{ color: '#60a5fa' }}></span>
                <span style={{ color: '#94a3b8' }}>{info.category}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Code Tab */}
      {activeTab === 'code' && (
        <div style={{ padding: '0' }}>
          {code ? (
            <div style={{ position: 'relative' }}>
              {/* Code header bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 20px',
                background: '#070d1a',
                borderBottom: '1px solid #1e293b',
              }}>
                {['#ef4444', '#fbbf24', '#22c55e'].map(c => (
                  <div key={c} style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%',
                    background: c,
                    opacity: 0.7,
                  }} />
                ))}
                <span style={{
                  marginLeft: '12px',
                  fontSize: '12px',
                  color: '#334155',
                  letterSpacing: '0.05em',
                }}>
                  {info.name.toLowerCase().replace(/ /g, '_')}.cpp
                </span>
              </div>
              <pre style={{
                margin: 0,
                padding: '24px 28px',
                overflowX: 'auto',
                fontSize: '13px',
                lineHeight: '1.8',
                color: '#94a3b8',
                background: '#070d1a',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                tabSize: 2,
              }}>
                <code style={{ color: '#e2e8f0' }}>{code}</code>
              </pre>
            </div>
          ) : (
            <div style={{
              padding: '48px',
              textAlign: 'center',
              color: '#334155',
              fontSize: '14px',
            }}>
              No code available for this algorithm.
            </div>
          )}
        </div>
      )}
    </div>
  );
}