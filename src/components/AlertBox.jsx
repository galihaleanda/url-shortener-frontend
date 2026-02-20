export default function AlertBox({ type = 'error', message, visible }) {
  if (!visible) return null

  const styles = {
    error:   { bg: 'rgba(255,77,109,0.08)',  border: 'rgba(255,77,109,0.25)',  color: '#e0234e' },
    success: { bg: 'rgba(0,200,150,0.08)',   border: 'rgba(0,200,150,0.25)',   color: '#00a87c' },
  }
  const s = styles[type]
  const icons = { error: '✕', success: '✓' }

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
      marginTop: '0.85rem', padding: '0.85rem 1rem', borderRadius: '12px',
      background: s.bg, border: `1.5px solid ${s.border}`, color: s.color,
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', lineHeight: 1.5
    }}>
      <span style={{ flexShrink: 0, fontWeight: 700 }}>{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}
