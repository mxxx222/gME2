import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConsentGate from './components/ConsentGate'
import BallTeaseScreen from './components/BallTeaseScreen'
import SessionBuilder from './components/SessionBuilder'
import SessionTimer from './components/SessionTimer'
import HistoryScreen from './components/HistoryScreen'

function getPathname(): string {
  const h = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : ''
  if (!h || h === '/' || h === '') return '/'
  const parts = h.split('/')
  if (parts.length === 1) return '/' + parts[0]
  if (parts.length === 2) return '/' + parts[0] + '/' + parts[1]
  return '/' + parts.slice(0, 3).join('/')
}

function navigateTo(path: string) {
  const hash = path === '/' ? '' : `#${path.replace(/^\//, '')}`
  window.location.hash = hash
}

function useHashNavigation() {
  const [currentPath, setCurrentPath] = useState(getPathname())

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getPathname())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return currentPath
}

export default function App() {
  const [consentGranted, setConsentGranted] = useState(false)
  const currentPath = useHashNavigation()

  const navigate = (path: string) => {
    navigateTo(path)
  }

  const renderScreen = () => {
    switch (currentPath) {
      case '/':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="screen">
            <h1 className="screen-title">Edging Tease &amp; Control</h1>
            <p className="screen-subtitle">Select a technique to begin</p>
            <div className="screen-actions">
              <button className="btn-primary" onClick={() => navigate('/technique/ball-tease')}>
                Ball Tease Grip
              </button>
              <button className="btn-ghost" onClick={() => navigate('/session')}>
                Session Builder
              </button>
            </div>
          </motion.div>
        )
      case '/technique/ball-tease':
        return <BallTeaseScreen />
      case '/session':
        return <SessionBuilder />
      case '/session/timer':
        return (
          <SessionTimer
            config={{ name: 'Shared Session', arousal: 6, duration: 300000, timestamp: Date.now() }}
            onOpen={() => window.open('', '_blank')}
          />
        )
      case '/history':
        return <HistoryScreen />
      default:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="screen">
            <h1 className="screen-title">Edging Tease &amp; Control</h1>
            <p className="screen-subtitle">Welcome to the app</p>
          </motion.div>
        )
    }
  }

  if (!consentGranted) {
    return <ConsentGate onEnter={() => setConsentGranted(true)} />
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="app home">
          <span className="wordmark-mark">e</span>dging<span className="wordmark-two">C</span>
        </a>
        <div className="topbar-right">
          <span className="status-dot" />
          <span>CONSENTED</span>
          <span className="age-chip">18+</span>
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> TEASE &amp; CONTROL
          </p>
          <h1 id="hero-title">Slow. Tease. Edge.</h1>
          <p className="hero-description">
            A browser-based edging tutorial &amp; session app for couples. Slow teasing,
            edge control, hand grip techniques, and testicle stimulation.
          </p>
          <div className="hero-meta">
            <span>
              <i className="meta-icon">◷</i> Couple sync enabled
            </span>
            <span>
              <i className="meta-icon">✳</i> 18+ with consent
            </span>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">
          01 <span>—</span> 01
        </div>
      </section>

      <section className="chapter-section">
        <div className="chapter-grid">{renderScreen()}</div>
      </section>

      <footer className="footer">
        <span>
          eC <span className="footer-divider">/</span> SESSION IN PROGRESS
        </span>
        <span>built for couples</span>
      </footer>
    </main>
  )
}