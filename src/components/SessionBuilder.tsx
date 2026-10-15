import { useState } from 'react'

const DEFAULT_AROUSAL = [6, 4, 7]
const DEFAULT_DURATION = [300, 180, 600] // 5min, 3min, 10min

export default function SessionBuilder() {
  const [roles, setRoles] = useState<'controller' | 'receiver'>('controller')
  const [waves, setWaves] = useState([
    { arousal: DEFAULT_AROUSAL[0], duration: DEFAULT_DURATION[0] },
    { arousal: DEFAULT_AROUSAL[1], duration: DEFAULT_DURATION[1] },
    { arousal: DEFAULT_AROUSAL[2], duration: DEFAULT_DURATION[2] },
  ])
  const [sessionName, setSessionName] = useState('Session 1')
  const [showTips, setShowTips] = useState(false)

  const totalDuration = waves.reduce((sum, w) => sum + w.duration, 0)

  return (
    <div className="screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">SESSION BUILDER</p>
          <h1 className="screen-title">Create Your Edging Session</h1>
        </div>
        <div className="screen-actions">
          <button
            className="btn-primary"
            type="button"
            onClick={() => alert('Starting session...')}
          >
            Start Session
          </button>
        </div>
      </header>

      <div className="session-builder">
        <div className="session-form">
          <div className="form-section">
            <h3>Session Setup</h3>
            <div className="input-group">
              <label>
                Session name
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="e.g., 'Wednesday Night'"
                />
              </label>
            </div>

            <div className="input-group">
              <label>
                Your role
                <div className="role-toggle">
                  <button
                    className={roles === 'controller' ? 'selected' : ''}
                    type="button"
                    onClick={() => setRoles('controller')}
                  >
                    Controller
                  </button>
                  <button
                    className={roles === 'receiver' ? 'selected' : ''}
                    type="button"
                    onClick={() => setRoles('receiver')}
                  >
                    Receiver
                  </button>
                </div>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Three-Wave Protocol</h3>
            <p className="form-hint">
              The 3-wave edging protocol: Warm-up → Build → Peak &amp; Recovery
            </p>

            {waves.map((wave, index) => (
              <div key={index} className="wave-card">
                <div className="wave-header">
                  <h4>Wave {index + 1}</h4>
                </div>

                <div className="wave-controls">
                  <div>
                    <label>Arousal target (1-10)</label>
                    <div className="arousal-slider">
                      <div className="arousal-track">
                        <div
                          className="arousal-fill"
                          style={{ width: `${wave.arousal * 10}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={wave.arousal}
                        onChange={(e) => {
                          const newWaves = [...waves]
                          newWaves[index].arousal = parseInt(e.target.value, 10)
                          setWaves(newWaves)
                        }}
                        className="slider"
                      />
                      <div className="arousal-values">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      min="15"
                      max="1800"
                      step="15"
                      value={wave.duration / 60}
                      onChange={(e) => {
                        const minutes = parseInt(e.target.value, 10) || 15
                        const newWaves = [...waves]
                        newWaves[index].duration = minutes * 60
                        setWaves(newWaves)
                      }}
                      className="duration-input"
                    />
                  </div>
                </div>

                <div className="wave-arousal-gauge">
                  <div className="gauge-label">Arousal Level</div>
                  <div className="gauge">
                    <div
                      className="gauge-fill"
                      style={{
                        width: `${wave.arousal * 10}%`,
                        background: 'linear-gradient(90deg, #2a43b8, #9335ea, #ea580c)',
                      }}
                    />
                  </div>
                  <div className="gauge-value">{wave.arousal}/10</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="session-summary">
          <h3>Session Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-label">Total Duration</span>
              <span className="stat-value">
                {Math.floor(totalDuration / 60)} min {totalDuration % 60} sec
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Avg Arousal</span>
              <span className="stat-value">
                {(waves.reduce((sum, w) => sum + w.arousal, 0) / waves.length).toFixed(1)} / 10
              </span>
            </div>
          </div>

          <button
            className="btn-ghost"
            type="button"
            onClick={() => setShowTips((s) => !s)}
          >
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
        </aside>
      </div>
    </div>
  )
}