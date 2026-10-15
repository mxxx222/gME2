import { useState } from 'react'
import HandSVG from './HandSVG'
import Disclaimer from './Disclaimer'

interface BallTeaseScreenProps {
  onStartSession: () => void
}

const PRESSURE_LEVELS = [
  { value: 0.1, label: 'Light', description: 'Gentle teasing touch' },
  { value: 0.3, label: 'Medium', description: 'Firm but controlled' },
  { value: 0.5, label: 'Firm', description: 'Sustained pressure' },
  { value: 0.7, label: 'Strong', description: 'Deep hold' },
  { value: 0.9, label: 'Maximum', description: 'Full grip intensity' },
]

export default function BallTeaseScreen({ onStartSession }: BallTeaseScreenProps) {
  const [pressure, setPressure] = useState(0.3)
  const [timer, setTimer] = useState(0)
  const [running, setRunning] = useState(false)
  const [practiceMode, setPracticeMode] = useState(false)
  const [edgesReached, setEdgesReached] = useState(0)

  const currentLevel = PRESSURE_LEVELS.find((l) => Math.abs(l.value - pressure) < 0.15) || PRESSURE_LEVELS[1]

  return (
    <div className="screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">TECHNIQUE 01</p>
          <h1 className="screen-title">Ball Tease Grip</h1>
        </div>
        <div className="screen-actions">
          <button
            className="chip"
            type="button"
            onClick={() => setPracticeMode((p) => !p)}
          >
            {practiceMode ? 'Practice On' : 'Practice Off'}
          </button>
        </div>
      </header>

      <Disclaimer />

      <div className="technique-grid">
        <div className="technique-art">
          <HandSVG pressure={pressure} highlight={running} />
        </div>

        <div className="technique-info">
          <div className="technique-steps">
            <h3>How to do it</h3>
            <ol>
              <li>Position yourself comfortably, facing your partner.</li>
              <li>Wrap your fingers around the base of the scrotum, thumb on top.</li>
              <li>Apply steady, rhythmic pressure — never squeeze hard enough to cut circulation.</li>
              <li>Tease with alternating pressure: firm hold → light stroke → firm hold.</li>
              <li>Communicate constantly. Use your safe word if anything hurts.</li>
            </ol>
          </div>

          <div className="technique-controls">
            <div>
              <label className="technique-label">
                Pressure intensity
                <span className="technique-value">{currentLevel.label}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={pressure}
                onChange={(e) => setPressure(parseFloat(e.target.value))}
                className="slider"
              />
              <p className="technique-hint">{currentLevel.description}</p>
            </div>

            <div className="timer-row">
              <div className="timer-display">
                <span className="timer-value">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
                <span className="timer-label">Session time</span>
              </div>
              <div className="timer-controls">
                <button
                  className="btn-primary"
                  type="button"
                  onClick={() => setRunning((r) => !r)}
                >
                  {running ? 'Pause' : 'Start'}
                </button>
                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => { setTimer(0); setEdgesReached(0) }}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="edges-row">
              <span className="edges-label">Edges reached</span>
              <div className="edges-dots">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    className={`edge-dot ${i < edgesReached ? 'active' : ''}`}
                    type="button"
                    onClick={() => setEdgesReached(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary full-width" type="button" onClick={onStartSession}>
              Continue to Session Builder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}