export default function HeroBadge({ icon, children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#6c47ff',
      background: 'linear-gradient(135deg, rgba(108,71,255,0.08), rgba(0,198,255,0.08))',
      border: '1.5px solid rgba(108,71,255,0.2)',
      padding: '0.4rem 0.9rem', borderRadius: '100px', marginBottom: '1.25rem'
    }}>
      <span>{icon}</span>
      {children}
    </div>
  )
}
