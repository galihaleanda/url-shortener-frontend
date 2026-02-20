export default function Toast({ visible, message }) {
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%',
      transform: `translateX(-50%) translateY(${visible ? '0' : '80px'})`,
      opacity: visible ? 1 : 0,
      background: 'linear-gradient(135deg, #6c47ff, #00c6ff)',
      color: '#ffffff',
      fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.85rem',
      padding: '0.75rem 1.5rem', borderRadius: '100px',
      boxShadow: '0 8px 30px rgba(108,71,255,0.4)',
      zIndex: 1000, transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      ✓ {message}
    </div>
  )
}
