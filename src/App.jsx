import { useState, useCallback } from 'react'
import Header from './components/Header'
import ShortenView from './components/ShortenView'
import AnalyticsView from './components/AnalyticsView'
import Toast from './components/Toast'
import { useToast } from './hooks/useToast'
import { getHistory } from './utils/history'

export default function App() {
  const [view, setView] = useState('shorten')
  const [history, setHistory] = useState(getHistory)
  const [analyticsCode, setAnalyticsCode] = useState(null)
  const { toast, showToast } = useToast()

  const refreshHistory = useCallback(() => setHistory(getHistory()), [])

  const goToAnalytics = useCallback((code) => {
    setAnalyticsCode(code)
    setView('analytics')
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header view={view} onViewChange={setView} />

      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 1.5rem 3rem' }}>
        {view === 'shorten' && (
          <ShortenView history={history} onHistoryChange={refreshHistory} onViewAnalytics={goToAnalytics} showToast={showToast} />
        )}
        {view === 'analytics' && (
          <AnalyticsView prefillCode={analyticsCode} onPrefillConsumed={() => setAnalyticsCode(null)} />
        )}
      </main>

      <footer style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '1.5rem', borderTop: '2px solid #e2dcff',
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#9b93c4',
        background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)'
      }}>
        SNIP v1.0, Created by Galih Aleanda — backend on{' '}
        <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer"
          style={{ color: '#6c47ff', textDecoration: 'none', fontWeight: 600 }}>
          The Go Programming Language
        </a>
      </footer>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  )
}
