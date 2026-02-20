
// utils/date.js
export function truncate(str, n) {
  return str && str.length > n ? str.slice(0, n) + '…' : str
}

// Hitung sisa hari
function daysUntilExpiry(expiryString) {
  if (!expiryString) return '—'
  const expiry = new Date(expiryString)
  const diff = expiry.getTime() - Date.now()
  return diff > 0 ? Math.ceil(diff / 86_400_000) : 0 // hari tersisa
}

// Format DD/MM/YYYY HH:MM:SS di local timezone
export function formatDate(dateString) {
  if (!dateString) return '—'
  const d = new Date(dateString)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export default function AnalyticsResult({ data }) {
  if (!data) return null

  const stats = [
    { value: data.click_count ?? 0, label: 'Total Clicks', icon: '👆', color: '#6c47ff' },
    { value: '-', label: '(Unique Visitors) In Development', icon: '👤', color: '#00c6ff' },
  { value: daysUntilExpiry(data.expires_at), label: 'Days Left', icon: '📅', color: '#00c896' },
  ]

  const details = [
    { key: 'original_url', value: data.original_url, isLink: true, truncateAt: 50 },
    { key: 'created_at', value: formatDate(data.created_at) },
    { key: 'expires_at', value: formatDate(data.expires_at) },
  ]

  return (
    <div style={{ width: '100%', maxWidth: '38rem', marginTop: '1.5rem', animation: 'fadeUp 0.4s ease both' }}>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.85rem', marginBottom: '1rem' }}>
        {stats.map(({ value, label, icon, color }) => (
          <div key={label} className="stat-box" style={{ cursor: 'default' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{icon}</div>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '0.3rem',
              background: `linear-gradient(135deg, ${color}, #6c47ff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {value}
            </div>
            <div style={{
              fontSize: '0.65rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9b93c4'
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Detail table */}
      <div style={{
        background: '#ffffff',
        border: '2px solid #e2dcff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(108,71,255,0.08)'
      }}>
        {details.map(({ key, value, isLink, truncateAt }, i) => (
          <div key={key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.85rem 1.4rem',
            fontSize: '0.85rem',
            borderBottom: i < details.length - 1 ? '1.5px solid #f0edff' : 'none',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#9b93c4',
              fontSize: '0.78rem',
              flexShrink: 0
            }}>
              {key}
            </span>

            <span style={{
              fontWeight: 600,
              color: '#1a1040',
              textAlign: 'right',
              maxWidth: '60%',
              wordBreak: 'break-all'
            }}>
              {isLink && value && value !== '—' ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6c47ff', textDecoration: 'none', fontWeight: 600 }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >
                  {truncateAt ? truncate(value, truncateAt) : value}
                </a>
              ) : (value ?? '—')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
