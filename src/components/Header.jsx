export default function Header({ view, onViewChange }) {
  const navItems = [
    { id: 'shorten', label: 'Shorten' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <header className="relative z-10 flex items-center justify-between px-8 py-5"
      style={{ borderBottom: '2px solid #e2dcff', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}>

      {/* Logo */}
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6c47ff 0%, #00c6ff 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(108,71,255,0.35)'
        }}>
          <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, lineHeight: 1 }}>S</span>
        </div>
        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1040', letterSpacing: '-0.03em' }}>
          SN<span style={{ background: 'linear-gradient(135deg, #6c47ff, #00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IP</span>
        </span>
      </div> */}

      {/* Nav */}
      <nav style={{ display: 'flex', gap: '0.5rem', background: '#f0edff', padding: '4px', borderRadius: '12px' }}>
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '9px',
              border: 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: view === id ? '#ffffff' : 'transparent',
              color: view === id ? '#6c47ff' : '#9b93c4',
              boxShadow: view === id ? '0 2px 8px rgba(108,71,255,0.15)' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  )
}
