import { useState } from 'react'

export default function ResultBox({ shortUrl, onViewAnalytics }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!shortUrl) return null

  return (
    <div style={{
      marginTop: '1.25rem', borderRadius: '16px', overflow: 'hidden',
      border: '2px solid rgba(108,71,255,0.2)',
      background: 'linear-gradient(135deg, #f8f6ff 0%, #f0f9ff 100%)',
      animation: 'fadeUp 0.4s ease both'
    }}>
      {/* URL display bar */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          background: 'linear-gradient(135deg, #6c47ff, #00c6ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem'
        }}>🔗</div>
        <span style={{
          flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem',
          fontWeight: 600, color: '#6c47ff', wordBreak: 'break-all'
        }}>
          {shortUrl}
        </span>
        <button onClick={handleCopy} style={{
          flexShrink: 0,
          padding: '0.4rem 0.9rem', borderRadius: '8px', border: 'none',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.78rem', fontWeight: 700,
          cursor: 'pointer', transition: 'all 0.2s',
          background: copied ? 'rgba(0,200,150,0.12)' : 'rgba(108,71,255,0.1)',
          color: copied ? '#00a87c' : '#6c47ff',
        }}>
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Action bar */}
      <div style={{
        padding: '0.75rem 1.25rem', borderTop: '1.5px solid rgba(108,71,255,0.1)',
        display: 'flex', gap: '0.6rem', background: 'rgba(255,255,255,0.5)'
      }}>
        <button onClick={onViewAnalytics} className="snip-btn snip-btn-ghost"
          style={{ fontSize: '0.78rem', padding: '0.5rem 1rem', borderRadius: '10px' }}>
          📊 View Analytics
        </button>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          <button className="snip-btn" style={{ fontSize: '0.78rem', padding: '0.5rem 1rem', borderRadius: '10px' }}>
            Visit →
          </button>
        </a>
      </div>
    </div>
  )
}
