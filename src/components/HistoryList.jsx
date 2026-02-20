export default function HistoryList({ history, onClear, onCopy, onViewAnalytics }) {
  if (history.length === 0) return null

  return (
    <div style={{ width: '100%', maxWidth: '38rem', marginTop: '2rem', animation: 'fadeUp 0.4s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b93c4' }}>
          Recent links
        </span>
        <button onClick={onClear} style={{
          background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.72rem',
          fontFamily: 'JetBrains Mono, monospace', color: '#c4bede', transition: 'color 0.2s',
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}
          onMouseEnter={e => e.target.style.color = '#ff4d6d'}
          onMouseLeave={e => e.target.style.color = '#c4bede'}>
          Clear all
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {history.map(item => (
          <div key={item.code} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: '#ffffff', border: '2px solid #e2dcff', borderRadius: '14px',
            padding: '0.85rem 1.1rem', transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#6c47ff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#e2dcff'}>

            {/* Code pill */}
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 600,
              color: '#6c47ff', background: 'rgba(108,71,255,0.08)',
              padding: '0.2rem 0.6rem', borderRadius: '6px', flexShrink: 0,
            }}>
              {item.code}
            </span>

            <span style={{ flex: 1, fontSize: '0.8rem', color: '#9b93c4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.originalUrl}
            </span>

            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              {[
                { label: 'Copy', action: () => onCopy(item.shortUrl) },
                { label: 'Stats', action: () => onViewAnalytics(item.code) },
              ].map(({ label, action }) => (
                <button key={label} onClick={action} style={{
                  background: 'rgba(108,71,255,0.07)', border: '1.5px solid #e2dcff',
                  color: '#6c47ff', borderRadius: '8px', padding: '0.3rem 0.65rem',
                  fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(108,71,255,0.15)'; e.target.style.borderColor = '#6c47ff' }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(108,71,255,0.07)'; e.target.style.borderColor = '#e2dcff' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
