import { useState, useEffect } from 'react'
import HeroBadge from './HeroBadge'
import AlertBox from './AlertBox'
import AnalyticsResult from './AnalyticsResult'
import { fetchAnalytics } from '../utils/api'

export default function AnalyticsView({ prefillCode, onPrefillConsumed }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    if (prefillCode) {
      setCode(prefillCode)
      onPrefillConsumed?.()
      handleLookup(prefillCode)
    }
  }, [prefillCode])

  const handleLookup = async (overrideCode) => {
    const target = (overrideCode ?? code).trim()
    setError(''); setData(null)
    if (!target) { setError('Please enter a short code.'); return }
    setLoading(true)
    try {
      const result = await fetchAnalytics(target)
      setData(result)
    } catch (err) {
      setError(err.message || 'Cannot reach the server. Is it running on :8080?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', maxWidth: '520px', marginBottom: '2.5rem', animation: 'fadeUp 0.6s ease both' }}>
        <HeroBadge icon="📊">Link Analytics</HeroBadge>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800,
          letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1rem', color: '#1a1040'
        }}>
          Track every{' '}
          <span style={{ background: 'linear-gradient(135deg, #6c47ff, #00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            click.
          </span>
        </h1>
        <p style={{ fontSize: '1rem', color: '#9b93c4', lineHeight: 1.7, fontWeight: 500 }}>
          Enter a short code to see detailed analytics — clicks, visitors, and more.
        </p>
      </div>

      {/* Card */}
      <div className="snip-card">
        <p className="card-label">Lookup short code</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{
              position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'JetBrains Mono, monospace', color: '#9b93c4', fontSize: '0.9rem', pointerEvents: 'none'
            }}>#</span>
            <input
              type="text"
              className="snip-input"
              placeholder="e.g. abc123"
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLookup()}
              autoComplete="off"
            />
          </div>
          <button className="snip-btn" onClick={() => handleLookup()} disabled={loading}>
            {loading
              ? <span style={{ width: '16px', height: '16px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
              : 'Lookup →'}
          </button>
        </div>
        <AlertBox type="error" message={error} visible={!!error} />
      </div>

      <AnalyticsResult data={data} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
