import { useState } from 'react'
import './App.css'

const chapters = [
  { number: '01', title: 'The First Signal', detail: 'A message arrives after midnight.', tone: 'violet' },
  { number: '02', title: 'Glasshouse', detail: 'Someone knows what you did.', tone: 'blue' },
  { number: '03', title: 'Last Call', detail: 'One final choice changes everything.', tone: 'amber' },
]

function App() {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0].number)
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="gME2 home">
          <span className="wordmark-mark">g</span>ME<span className="wordmark-two">2</span>
        </a>
        <div className="topbar-right">
          <span className="status-dot" />
          <span>STORY MODE</span>
          <span className="age-chip">18+</span>
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="moon" />
          <div className="art-label">NO. 01&nbsp; / &nbsp;AFTER HOURS</div>
          <div className="art-coordinate">40° 42′ 46.8″ N<br />74° 00′ 21.6″ W</div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span /> AN INTERACTIVE FICTION</p>
          <h1 id="hero-title">The night<br />is <em>yours.</em></h1>
          <p className="hero-description">Every secret has a story. Every choice leaves a mark. Step into a city that never tells the whole truth.</p>
          <div className="hero-meta">
            <span><i className="meta-icon">◷</i> 3 CHAPTERS</span>
            <span><i className="meta-icon">✳</i> YOUR CHOICES MATTER</span>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">01 <span>—</span> 03</div>
      </section>

      <section className="chapter-section" aria-labelledby="chapter-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHOOSE YOUR OPENING</p>
            <h2 id="chapter-heading">Where will you begin?</h2>
          </div>
          <span className="chapter-count">01 — 03</span>
        </div>

        <div className="chapter-grid" role="group" aria-label="Choose a chapter">
          {chapters.map((chapter) => (
            <button
              className={`chapter-card ${chapter.tone} ${selectedChapter === chapter.number ? 'selected' : ''}`}
              key={chapter.number}
              type="button"
              aria-pressed={selectedChapter === chapter.number}
              onClick={() => {
                setSelectedChapter(chapter.number)
                setHasStarted(false)
              }}
            >
              <span className="card-topline"><span>CHAPTER {chapter.number}</span><span className="card-arrow">↗</span></span>
              <span className="card-title">{chapter.title}</span>
              <span className="card-detail">{chapter.detail}</span>
              <span className="card-art" aria-hidden="true"><span /></span>
            </button>
          ))}
        </div>

        <div className="play-row">
          <p className="mature-note"><span>18+</span> Mature themes · Fictional story · Player discretion advised</p>
          <button className="play-button" type="button" onClick={() => setHasStarted(true)}>
            <span>{hasStarted ? 'SESSION READY' : 'BEGIN YOUR STORY'}</span>
            <span className="play-icon" aria-hidden="true">↗</span>
          </button>
        </div>
        {hasStarted && (
          <p className="start-message" role="status">
            Chapter {selectedChapter} is ready. Your story starts here.
          </p>
        )}
      </section>

      <footer className="footer">
        <span>gME2 <span className="footer-divider">/</span> A STORY IN PROGRESS</span>
        <span>BUILT FOR THE HOURS BETWEEN</span>
      </footer>
    </main>
  )
}

export default App
