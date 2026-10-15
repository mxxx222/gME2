import { useState, useEffect, useRef } from 'react'

interface SessionTimerProps {
  config: {
    name: string
    arousal: number
    duration: number
    timestamp: number
  }
  onOpen: () => void
}

export default function SessionTimer({ config, onOpen }: SessionTimerProps) {
  const [waveIndex, setWaveIndex] = useState(0)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const rafId = useRef<number | null>(null)
  const lastTime = useRef<number>(0)

  const waveTargets = [6, 7, 8]
  const waveDurations = [
    Math.floor(config.duration * 0.3),
    Math.floor(config.duration * 0.2),
    Math.floor(config.duration * 0.5),
  ]

  const currentWave = {
    name: `Wave ${waveIndex + 1}`,
    targetArousal: waveTargets[waveIndex] || 6,
    remaining: waveDurations[waveIndex] || 60000,
  }

  const totalDuration = config.duration

  useEffect(() => {
    if (!running) return

    const tick = (timestamp: number) => {
      if (lastTime.current === 0) {
        lastTime.current = timestamp
      }
      const delta = (timestamp - lastTime.current) / 1000
      lastTime.current = timestamp

      setTotalElapsed((t) => {
        const newT = t + delta * 1000
        if (newT >= currentWave.remaining && currentWave.remaining > 0) {
          if (waveIndex < 2) {
            setWaveIndex((i) => i + 1)
            setTotalElapsed(0)
            lastTime.current = 0
          } else {
            setRunning(false)
            setTotalElapsed(totalDuration)
          }
        }
        return Math.min(newT, totalDuration)
      })

      rafId.current = requestAnimationFrame(tick)
    }

    lastTime.current = 0
    rafId.current = requestAnimationFrame(tick)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [running, totalDuration, waveIndex, currentWave.remaining])

  const shareHash = btoa(JSON.stringify(config))

  const finishSession = () => {
    setRunning(false)
    setTotalElapsed(totalDuration)
    const history = JSON.parse(localStorage.getItem('edgingHistory') || '[]')
    const entry = {
      id: Date.now(),
      name: config.name,
      totalDuration,
      waveIndex: waveIndex + 1,
      edgesReached: Math.floor((config.arousal || 6) / 2),
      timestamp: Date.now(),
    }
    history.push(entry)
    if (history.length > 20) history.shift()
    localStorage.setItem('edgingHistory', JSON.stringify(history))
    alert('Session complete! ✓')
  }

  const toggleRunning = () => {
    setRunning((r) => !r)
  }

  const minutes = Math.floor(totalElapsed / 60000)
  const seconds = Math.floor((totalElapsed % 60000) / 1000)

  return (
    <div className="screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">LIVE SESSION</p>
          <h1 className="screen-title">
            {currentWave.name}
            <span className="dot-indicator running">{running ? '●' : '○'}</span>
          </h1>
        </div>

        <div className="session-controls">
          <button className="btn-ghost" type="button" onClick={toggleRunning}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            className="btn-primary"
            type="button"
            onClick={finishSession}
            disabled={totalElapsed < 60000}
          >
            Finish
          </button>
        </div>
      </header>

      <main className="session-main">
        <div className="wave-timer">
          <div className="wave-number">Wave {waveIndex + 1} of 3</div>

          <div className="timer-display">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="arousal-visual">
            <div
              className={`arousal-bar ${waveIndex}-wave`}
              style={{
                width: `${currentWave.targetArousal * 10}%`,
                background: 'linear-gradient(90deg, #2a43b8, #9335ea, #ea580c)',
              }}
            />
            <span className="arousal-value">{currentWave.targetArousal}/10</span>
          </div>

          <div className="wave-description">
            Target arousal: Level{' '}
            <span className="arousal-bar-value">{currentWave.targetArousal}</span>
          </div>
        </div>

        {running && totalElapsed > 0 && (
          <div className="session-stats">
            <div className="stat">
              <span className="stat-label">Total Time</span>
              <span className="stat-value">
                {String(Math.floor(totalElapsed / 60000)).padStart(2, '0')}:
                {String(Math.floor((totalElapsed % 60000) / 1000)).padStart(2, '0')}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Wave</span>
              <span className="stat-value">{waveIndex + 1}/3</span>
            </div>
          </div>
        )}
      </main>

      <section className="session-share">
        <h3>Share with Partner</h3>
        <div className="share-box">
          <input
            type="text"
            value={shareHash}
            readOnly
            onClick={(e) => {
              const target = e.target as HTMLInputElement
              target.select()
              if (navigator.clipboard) {
                navigator.clipboard.writeText(target.value)
              } else if (document.execCommand) {
                document.execCommand('copy')
              }
              alert('Link copied! Share with your partner.')
            }}
            className="share-input"
            placeholder="Copy link"
          />
          <button className="btn-primary small" type="button" onClick={onOpen}>
            Back to Builder
          </button>
        </div>
        <p className="share-hint">
          Send the link above to your partner. Both will see the same session timer.
        </p>
      </section>
    </div>
  )
}