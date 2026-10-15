import { useState, useEffect } from 'react'
import Disclaimer from './Disclaimer'

interface SessionEntry {
  id: number
  name: string
  totalDuration: number
  waveIndex: number
  edgesReached: number
  timestamp: number
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<SessionEntry[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('edgingHistory') || '[]')
    setHistory(stored)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('edgingHistory')
    setHistory([])
  }

  const totalDuration = history.reduce((sum, s) => sum + s.totalDuration, 0)
  const totalEdges = history.reduce((sum, s) => sum + s.edgesReached, 0)
  const avgDuration = history.length ? totalDuration / history.length : 0

  return (
    <div className="screen">
      <header className="screen-header">
        <div>
          <p className="screen-eyebrow">PROGRESS TRACKER</p>
          <h1 className="screen-title">Session History</h1>
        </div>
        {history.length > 0 && (
          <button
            className="btn-ghost"
            type="button"
            onClick={clearHistory}
          >
            Clear All
          </button>
        )}
      </header>

      <Disclaimer />

      <div className="history-stats">
        <div className="stat">
          <span className="stat-label">Total Sessions</span>
          <span className="stat-value">{history.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Time</span>
          <span className="stat-value">
            {Math.floor(totalDuration / 60000)} min {totalDuration % 60000} sec
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Avg Duration</span>
          <span className="stat-value">
            {Math.floor(avgDuration / 60000)} min {avgDuration % 60000} sec
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Edges Reached</span>
          <span className="stat-value">{totalEdges}</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <p>No sessions yet. Start your first edging session!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div key={entry.id} className="history-card">
              <div className="history-card-header">
                <h3>{entry.name}</h3>
                <span className="history-date">
                  {new Date(entry.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="history-card-stats">
                <span>
                  <strong>Duration:</strong> {Math.floor(entry.totalDuration / 60000)} min
                </span>
                <span>
                  <strong>Wave:</strong> {entry.waveIndex}/3
                </span>
                <span>
                  <strong>Edges:</strong> {entry.edgesReached}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}