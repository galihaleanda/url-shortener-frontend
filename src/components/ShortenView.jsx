import { useState } from 'react'
import HeroBadge from './HeroBadge'
import AlertBox from './AlertBox'
import ResultBox from './ResultBox'
import HistoryList from './HistoryList'
import { shortenUrl } from '../utils/api'
import { addToHistory, clearHistory } from '../utils/history'

// Minimum datetime = now + 1 menit, format untuk input[type=datetime-local]
function getMinDatetime() {
  const d = new Date(Date.now() + 60_000)
  return d.toISOString().slice(0, 16)
}

// Default = 24 jam dari sekarang
function getDefaultDatetime() {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 16)
}

export default function ShortenView({ history, onHistoryChange, onViewAnalytics, showToast }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [expiredAt, setExpiredAt] = useState(getDefaultDatetime())
  const [useExpiry, setUseExpiry] = useState(false)

  const handleShorten = async () => {
    setError('')
    setResult(null)
    const trimmed = url.trim()
    if (!trimmed) { setError('Please enter a URL first.'); return }
    try { new URL(trimmed) } catch { setError("That doesn't look like a valid URL."); return }

    if (useExpiry && new Date(expiredAt) <= new Date()) {
      setError('Expiration time must be in the future.')
      return
    }

    setLoading(true)
    try {
      // Kirim sebagai ISO 8601 jika expiry diaktifkan
      const isoExpiry = useExpiry ? new Date(expiredAt).toISOString() : null
      const data = await shortenUrl(trimmed, isoExpiry)
      setResult(data)
      addToHistory({ code: data.short_code, shortUrl: data.shortUrl, originalUrl: trimmed })
      onHistoryChange()
      setUrl('')
    } catch (err) {
      setError(err.message || 'Cannot reach the server. Is it running on :8080?')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', maxWidth: '560px', marginBottom: '3rem', animation: 'fadeUp 0.6s ease both' }}>
        <HeroBadge icon="⚡">Lightning Fast URL Shortener</HeroBadge>
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '1rem', color: '#1a1040' }}>
          Shorten🤏. Share.{' '}
          <span style={{ background: 'linear-gradient(135deg, #6c47ff 0%, #00c6ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Track.
          </span>
        </h1>
        <p style={{ fontSize: '1rem', color: '#9b93c4', lineHeight: 1.7, fontWeight: 500 }}>
          Paste any long URL and get a clean, shareable short link instantly.
          Built-in analytics for every click.
        </p>
      </div>

      {/* Card */}
      <div className="snip-card" style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}>
        <p className="card-label">Shorten URL</p>

        {/* URL Input row */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔗</span>
            <input
              type="url"
              className="snip-input"
              placeholder="https://your-very-long-url.com/goes/here"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleShorten()}
              autoComplete="off"
            />
          </div>
          <button className="snip-btn" onClick={handleShorten} disabled={loading}>
            {loading
              ? <span style={{ width: '16px', height: '16px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
              : 'Shorten →'}
          </button>
        </div>

        {/* Expiry toggle + datetime picker */}
        <div style={{
          background: useExpiry ? 'rgba(108,71,255,0.04)' : '#fafafa',
          border: `2px solid ${useExpiry ? 'rgba(108,71,255,0.2)' : '#f0edff'}`,
          borderRadius: '14px',
          padding: '0.9rem 1rem',
          transition: 'all 0.25s ease',
        }}>
          {/* Toggle row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: useExpiry ? '#6c47ff' : '#9b93c4', transition: 'color 0.2s' }}>
                Set expiration date
              </span>
            </div>

            {/* Toggle switch */}
            <div
              onClick={() => setUseExpiry(v => !v)}
              style={{
                width: '42px', height: '24px', borderRadius: '100px', cursor: 'pointer',
                background: useExpiry ? 'linear-gradient(135deg, #6c47ff, #4f9bff)' : '#e2dcff',
                position: 'relative', transition: 'background 0.25s ease',
                boxShadow: useExpiry ? '0 2px 8px rgba(108,71,255,0.35)' : 'none',
                flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: '3px',
                left: useExpiry ? '21px' : '3px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: '#ffffff', transition: 'left 0.25s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }} />
            </div>
          </div>

          {/* Datetime picker — animasi expand */}
          <div style={{
            overflow: 'hidden',
            maxHeight: useExpiry ? '120px' : '0px',
            opacity: useExpiry ? 1 : 0,
            transition: 'max-height 0.3s ease, opacity 0.25s ease',
          }}>
            <div style={{ paddingTop: '0.85rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9b93c4', marginBottom: '0.5rem' }}>
                Expires at
              </label>
              <input
                type="datetime-local"
                lang="en-GB"
                value={expiredAt}
                min={getMinDatetime()}
                onChange={e => setExpiredAt(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '2px solid #e2dcff',
                  borderRadius: '10px',
                  color: '#1a1040',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.875rem',
                  padding: '0.6rem 0.9rem',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  colorScheme: 'light',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#6c47ff'
                  e.target.style.boxShadow = '0 0 0 4px rgba(108,71,255,0.12)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#e2dcff'
                  e.target.style.boxShadow = 'none'
                }}
              />
              {expiredAt && (
<p style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: '#9b93c4', fontFamily: 'JetBrains Mono, monospace' }}>
  Link expires: {expiredAt ? new Date(expiredAt).toLocaleString('en-GB', { hour12: false }) : ''}
</p>

              )}
            </div>
          </div>
        </div>

        <AlertBox type="error" message={error} visible={!!error} />
        <ResultBox shortUrl={result?.shortUrl} onViewAnalytics={() => result && onViewAnalytics(result.short_code)} />
      </div>

      {/* History */}
      <HistoryList
        history={history}
        onClear={() => { clearHistory(); onHistoryChange() }}
        onCopy={handleCopy}
        onViewAnalytics={onViewAnalytics}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}