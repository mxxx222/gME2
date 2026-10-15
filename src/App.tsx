import { useEffect, useRef, useState } from 'react'
import './App.css'

type Screen = 'onboarding' | 'solo'
type TimerStatus = 'idle' | 'running' | 'paused' | 'complete'

const soloCards = [
  {
    id: 'arrive',
    title: 'Arrive in the moment',
    description: 'A gentle reset to help you notice what you need right now.',
    prompt: 'Let your shoulders soften. Take one comfortable breath, then notice how you feel.',
    shortPrompt: 'One comfortable breath. Notice how you feel.',
    duration: 2,
  },
  {
    id: 'slow-down',
    title: 'Find a slower pace',
    description: 'Make a little room to check in with yourself.',
    prompt: 'Move at a pace that feels comfortable. You can pause or skip whenever you like.',
    shortPrompt: 'Slow down. Pause whenever you need.',
    duration: 5,
  },
  {
    id: 'check-in',
    title: 'A moment to check in',
    description: 'A quiet prompt for listening to yourself.',
    prompt: 'Ask yourself: what would feel kind and comfortable right now?',
    shortPrompt: 'What would feel kind and comfortable right now?',
    duration: 2,
  },
]

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [stage, setStage] = useState(1)
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false)
  const [personalizationEnabled, setPersonalizationEnabled] = useState(false)
  const [previewSeconds, setPreviewSeconds] = useState(45)
  const [previewStatus, setPreviewStatus] = useState<TimerStatus>('idle')
  const [selectedCardId, setSelectedCardId] = useState(soloCards[0].id)
  const [soloSeconds, setSoloSeconds] = useState(soloCards[0].duration * 60)
  const [soloStatus, setSoloStatus] = useState<TimerStatus>('idle')
  const [inviteCreated, setInviteCreated] = useState(false)
  const [inviteConsent, setInviteConsent] = useState(false)
  const [recipientPreview, setRecipientPreview] = useState(false)
  const [inviteMessage, setInviteMessage] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [reflection, setReflection] = useState('')
  const [notice, setNotice] = useState('')
  const dialogRef = useRef<HTMLElement | null>(null)

  const selectedCard = soloCards.find((card) => card.id === selectedCardId) ?? soloCards[0]

  function pauseActiveTimers() {
    setPreviewStatus((status) => status === 'running' ? 'paused' : status)
    setSoloStatus((status) => status === 'running' ? 'paused' : status)
  }

  function openPrivacyDetails() {
    pauseActiveTimers()
    setScreen('onboarding')
    setStage(2)
  }

  useEffect(() => {
    if (previewStatus !== 'running' || screen !== 'onboarding' || stage !== 1) return
    const interval = window.setInterval(() => {
      setPreviewSeconds((seconds) => {
        if (seconds <= 1) {
          setPreviewStatus('complete')
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [previewStatus, screen, stage])

  useEffect(() => {
    if (soloStatus !== 'running' || screen !== 'solo') return
    const interval = window.setInterval(() => {
      setSoloSeconds((seconds) => {
        if (seconds <= 1) {
          setSoloStatus('complete')
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [soloStatus, screen])

  useEffect(() => {
    if (!showDeleteDialog) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.querySelector<HTMLElement>('button:not(:disabled)')?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowDeleteDialog(false)
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled)')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [showDeleteDialog])

  function enterSolo() {
    pauseActiveTimers()
    if (!ageConfirmed) {
      setScreen('onboarding')
      setStage(1)
      return
    }
    setScreen('solo')
    setStage(3)
    setSoloStatus('idle')
    setNotice('')
  }

  function selectSoloCard(cardId: string) {
    const card = soloCards.find((item) => item.id === cardId)
    if (!card) return
    setSelectedCardId(card.id)
    setSoloSeconds(card.duration * 60)
    setSoloStatus('idle')
    setReflection('')
  }

  function resetPreview() {
    setPreviewSeconds(45)
    setPreviewStatus('idle')
  }

  function clearDemoData() {
    setPersonalizationEnabled(false)
    setPrivacyAcknowledged(false)
    setInviteCreated(false)
    setInviteConsent(false)
    setRecipientPreview(false)
    setInviteMessage('')
    setInviteLink('')
    setShowDeleteDialog(false)
    setNotice('This prototype’s in-memory choices have been cleared.')
  }

  async function createDemoInvite(useShareSheet = false) {
    if (!inviteConsent) return
    const token = window.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    const link = `${window.location.origin}${window.location.pathname}#demo-invite/${token}`
    setInviteCreated(true)
    setInviteLink(link)
    setRecipientPreview(false)
    if (useShareSheet && navigator.share) {
      try {
        await navigator.share({
          title: 'A gME2 demo invitation',
          text: 'This is a non-redeemable preview link. It does not reveal preferences or start a session.',
          url: link,
        })
        setInviteMessage('Share sheet closed. No real invitation was sent by this prototype.')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
        setInviteMessage('The share sheet could not be opened. The non-redeemable demo link is shown below.')
      }
      return
    }
    if (useShareSheet) setInviteMessage('Sharing is not available in this browser. Use the non-redeemable demo link below.')
    try {
      await navigator.clipboard.writeText(link)
      if (!useShareSheet) setInviteMessage('Demo link copied. It is not redeemable and starts no session.')
    } catch {
      setInviteMessage('Demo link created, but could not be copied automatically. Select the link below to copy it manually.')
    }
  }

  const stages = [
    { number: 1, label: 'Experience' },
    { number: 2, label: 'Privacy' },
    { number: 3, label: 'Your choice' },
  ]

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="gME2 home" onClick={(event) => {
          event.preventDefault()
          pauseActiveTimers()
          setScreen('onboarding')
          setStage(1)
        }}>
          <span className="wordmark-mark">g</span>ME<span className="wordmark-two">2</span>
        </a>
        <div className="topbar-right">
          <span className="topbar-caption">INTIMACY, AT YOUR PACE</span>
          <span className="age-chip">18+</span>
        </div>
      </header>

      {screen === 'onboarding' ? (
        <>
          <section className="intro">
            <div>
              <p className="eyebrow"><span /> A MORE CONSIDERED WAY TO CONNECT</p>
              <h1>Make room for<br /><em>what feels right.</em></h1>
            </div>
            <p className="intro-description">Gentle prompts and guided moments for your own wellbeing. Start with yourself; share with someone only if and when you want to.</p>
          </section>

          <nav className="stepper" aria-label="Onboarding progress">
            {stages.map((item) => (
              <div className={`step ${stage === item.number ? 'active' : ''} ${stage > item.number ? 'complete' : ''}`} key={item.number} aria-current={stage === item.number ? 'step' : undefined}>
                <span className="step-number">{stage > item.number ? '✓' : `0${item.number}`}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <section className="content-panel" aria-live="polite">
            {stage === 1 && (
              <div className="stage-layout">
                <div className="stage-copy">
                  <p className="eyebrow">01 / EXPERIENCE</p>
                  <h2>Try a small moment.<br />No account needed.</h2>
                  <p className="body-copy">Explore one complete sample card and timer before deciding whether this is for you. This preview is not a real session and nothing is saved.</p>
                  <label className="check-row age-check">
                    <input type="checkbox" checked={ageConfirmed} onChange={(event) => {
                      const confirmed = event.target.checked
                      setAgeConfirmed(confirmed)
                      if (!confirmed) setPreviewStatus((status) => status === 'running' ? 'paused' : status)
                    }} />
                    <span>I confirm that I am 18 or older.</span>
                  </label>
                  <p className="fine-print">This is an eligibility confirmation, not identity verification. We do not ask for your date of birth or identity documents.</p>
                </div>
                <article className="sample-card" aria-label="Sample card: Arrive in the moment">
                  <div className="sample-card-top"><span>PREVIEW CARD · 01 OF 01</span><span className="sample-spark" aria-hidden="true">✳</span></div>
                  <p className="card-kicker">A MOMENT FOR YOU</p>
                  <h3>Arrive in<br /><em>the moment.</em></h3>
                  <p className="sample-prompt">Let your shoulders soften. Take one comfortable breath, then notice how you feel.</p>
                  <div className="timer-row">
                    <span className="timer" aria-label={`Time remaining ${formatTime(previewSeconds)}`} aria-live="off">{formatTime(previewSeconds)}</span>
                    <span className="timer-caption">SAMPLE TIMER</span>
                  </div>
                  {previewStatus === 'complete' ? (
                    <div className="timer-message" role="status">That was your sample. <button className="text-button" type="button" onClick={resetPreview}>Try it again</button></div>
                  ) : (
                    <div className="timer-controls">
                      <button className="button button-primary button-small" type="button" disabled={!ageConfirmed || previewStatus === 'running'} onClick={() => setPreviewStatus('running')}>
                        {previewStatus === 'paused' ? 'Resume' : previewStatus === 'running' ? 'In progress' : 'Start sample'}
                      </button>
                      {previewStatus !== 'idle' && (
                        <button className="button button-quiet button-small" type="button" onClick={() => previewStatus === 'running' ? setPreviewStatus('paused') : resetPreview()}>
                          {previewStatus === 'running' ? 'Pause' : 'Start over'}
                        </button>
                      )}
                    </div>
                  )}
                  {!ageConfirmed && <p className="inline-hint">Confirm you are 18+ to start the preview.</p>}
                  <p className="sample-footnote">A sample only · Not saved · No account</p>
                </article>
                <div className="stage-actions">
                  <p className="fine-print">Without an account, you can still explore solo cards, use the timer and change your settings.</p>
                  <div className="button-row">
                    <button className="button button-quiet" type="button" disabled={!ageConfirmed} onClick={enterSolo}>Skip to solo</button>
                    <button className="button button-primary" type="button" disabled={!ageConfirmed} onClick={openPrivacyDetails}>Continue <span aria-hidden="true">→</span></button>
                  </div>
                </div>
              </div>
            )}

            {stage === 2 && (
              <div className="stage-layout privacy-layout">
                <div className="stage-copy">
                  <p className="eyebrow">02 / PRIVACY</p>
                  <h2>Know what happens<br />before you choose.</h2>
                  <p className="body-copy">This is a front-end prototype with no account, analytics, AI, microphone, notification or partner-invitation service connected.</p>
                  <div className="prototype-notice"><span className="status-dot" /> Prototype status · no app backend connected</div>
                  <p className="fine-print">The website host may receive standard connection data when this page loads. A production privacy notice must describe its actual infrastructure and retention practices.</p>
                </div>
                <div className="privacy-panel">
                  <div className="privacy-panel-heading">
                    <div><p className="card-kicker">YOUR DATA, IN THIS PREVIEW</p><h3>What exists right now?</h3></div>
                    <span className="status-pill">IN THIS TAB</span>
                  </div>
                  <div className="data-row"><span className="data-icon" aria-hidden="true">◌</span><div><strong>Your choices</strong><p>Only held temporarily in this page’s memory.</p></div><span className="data-location">LOCAL</span></div>
                  <div className="data-row"><span className="data-icon" aria-hidden="true">↗</span><div><strong>Sent by the app</strong><p>No preferences or session activity are sent to an app server in this prototype.</p></div><span className="data-location">NONE</span></div>
                  <div className="data-row"><span className="data-icon" aria-hidden="true">⊘</span><div><strong>Not collected here</strong><p>No account, intimate history, free text, voice recording, or AI prompt.</p></div><span className="data-location">NONE</span></div>
                  <details className="storage-details">
                    <summary>What is stored, and how do I clear it?</summary>
                    <div className="details-copy">
                      <p>This prototype does not persist your choices. They reset when you reload or leave the page. Use the control below to clear the temporary choices now.</p>
                      <button className="button button-outline button-small" type="button" onClick={() => setShowDeleteDialog(true)}>Clear preview choices</button>
                    </div>
                  </details>
                  <details className="storage-details">
                    <summary>AI, audio and third parties</summary>
                    <div className="details-copy"><p>AI coaching, audio input, push notifications and third-party integrations are not connected in this preview. They would need separate, specific explanations and controls before use.</p></div>
                  </details>
                  <label className="check-row privacy-check">
                    <input type="checkbox" checked={personalizationEnabled} onChange={(event) => setPersonalizationEnabled(event.target.checked)} />
                    <span><strong>Use shorter prompts</strong><small>Optional. Shortens the on-screen guidance in solo mode. Applies only in this tab; off by default and not saved.</small></span>
                  </label>
                </div>
                <div className="stage-actions">
                  <label className="check-row acknowledge-check">
                    <input type="checkbox" checked={privacyAcknowledged} onChange={(event) => setPrivacyAcknowledged(event.target.checked)} />
                    <span>I understand how this prototype handles my choices.</span>
                  </label>
                  <div className="button-row">
                    <button className="button button-quiet" type="button" onClick={() => setStage(1)}>← Back</button>
                    <button className="button button-primary" type="button" disabled={!privacyAcknowledged || !ageConfirmed} onClick={() => setStage(3)}>Continue <span aria-hidden="true">→</span></button>
                  </div>
                  {!ageConfirmed && <p className="fine-print age-required-hint">Confirm that you are 18 or older on the first step before continuing.</p>}
                </div>
              </div>
            )}

            {stage === 3 && (
              <div className="stage-layout connection-layout">
                <div className="stage-copy">
                  <p className="eyebrow">03 / YOUR CHOICE</p>
                  <h2>Keep it yours.<br />Invite only if you want.</h2>
                  <p className="body-copy">Solo is a complete way to use gME2—not a preview. Your preferences and activity are never included in an invitation.</p>
                  <div className="choice-cards">
                    <button className="choice-card solo-choice" type="button" onClick={enterSolo}>
                      <span className="choice-icon" aria-hidden="true">↗</span><strong>Try solo first</strong><span>Open the full solo card library, timer and controls.</span>
                    </button>
                    <div className="choice-card invite-choice">
                      <span className="choice-icon" aria-hidden="true">＋</span><strong>Explore a partner invite</strong><span>Optional. Both people must agree before a shared session.</span>
                      <label className="check-row invite-consent">
                        <input type="checkbox" checked={inviteConsent} onChange={(event) => setInviteConsent(event.target.checked)} />
                        <span>I want to preview making a demo invitation.</span>
                      </label>
                      {!inviteCreated ? (
                        <div className="invite-buttons">
                          <button className="button button-outline button-small" type="button" disabled={!inviteConsent} onClick={() => createDemoInvite()}>Create demo link</button>
                          <button className="button button-quiet button-small" type="button" disabled={!inviteConsent} onClick={() => createDemoInvite(true)}>Create &amp; share</button>
                        </div>
                      ) : (
                        <>
                          <div className="demo-invite" role="status">
                            <span className="demo-tag">DEMO ONLY · NOT REDEEMABLE</span>
                            <p>{inviteMessage}</p>
                            <input aria-label="Non-redeemable demo invitation link" readOnly value={inviteLink} onFocus={(event) => event.currentTarget.select()} />
                            <div className="invite-buttons">
                              <button className="button button-outline button-small" type="button" onClick={() => setRecipientPreview(true)}>Preview recipient screen</button>
                              <button className="button button-quiet button-small" type="button" onClick={() => {
                                setInviteCreated(false)
                                setInviteConsent(false)
                                setRecipientPreview(false)
                                setInviteLink('')
                                setInviteMessage('')
                                setNotice('Demo invitation cancelled in this tab.')
                              }}>Cancel demo</button>
                            </div>
                          </div>
                          {recipientPreview && (
                            <div className="recipient-preview">
                              <p className="card-kicker">RECIPIENT PREVIEW</p>
                              <strong>You’ve been invited to explore together.</strong>
                              <p>This demo link shares no preferences and does not start a session. In the real product, you would see full details and choose whether to accept.</p>
                              <div className="invite-buttons">
                                <button className="button button-primary button-small" type="button" onClick={() => setInviteMessage('Demo accepted in this tab only. No shared session was started.')}>Accept demo</button>
                                <button className="button button-quiet button-small" type="button" onClick={() => setInviteMessage('Demo declined in this tab only.')}>Decline</button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <p className="fine-print invite-caveat">A redeemable link, QR code, revocation and recipient acceptance require a secure backend and are not connected here.</p>
                    </div>
                  </div>
                </div>
                <div className="autonomy-note">
                  <span className="autonomy-mark" aria-hidden="true">✳</span>
                  <div><strong>Your yes is always yours to give.</strong><p>Opening an invite never starts a session. Each person chooses independently, and either can leave at any time.</p></div>
                </div>
                <div className="stage-actions">
                  <button className="button button-quiet" type="button" onClick={openPrivacyDetails}>← Back</button>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="solo-screen" aria-labelledby="solo-heading">
          <div className="solo-heading-row">
            <div><p className="eyebrow"><span /> SOLO SPACE</p><h1 id="solo-heading">A moment, <em>for you.</em></h1></div>
            <button className="button button-quiet" type="button" onClick={() => {
              pauseActiveTimers()
              setScreen('onboarding')
            }}>← Onboarding</button>
          </div>
          <div className="solo-grid">
            <section className="library-panel" aria-labelledby="library-title">
              <p className="card-kicker">YOUR CARD LIBRARY</p><h2 id="library-title">Choose what feels right.</h2>
              <div className="solo-card-list" role="group" aria-label="Solo cards">
                {soloCards.map((card, index) => (
                  <button className={`solo-library-card ${selectedCardId === card.id ? 'selected' : ''}`} type="button" key={card.id} aria-pressed={selectedCardId === card.id} disabled={soloStatus === 'running'} onClick={() => selectSoloCard(card.id)}>
                    <span className="library-card-index">0{index + 1}</span><span className="library-card-copy"><strong>{card.title}</strong><small>{card.description}</small></span><span className="library-card-time">{card.duration} MIN</span>
                  </button>
                ))}
              </div>
              {soloStatus === 'running' && <p className="fine-print library-note">Pause the timer before choosing a different card.</p>}
              <div className="solo-guidance"><p className="card-kicker">A GENTLE PROMPT</p><p>{personalizationEnabled ? selectedCard.shortPrompt : selectedCard.prompt}</p></div>
            </section>
            <section className="solo-timer-panel" aria-label="Guided timer">
              {soloStatus === 'complete' ? (
                <div className="completion-state">
                  <span className="completion-symbol" aria-hidden="true">✳</span><p className="card-kicker">SESSION COMPLETE</p><h2>Thank yourself<br />for showing up.</h2>
                  <p className="body-copy">That moment was yours. Nothing in this prototype was saved.</p>
                  <p className="card-kicker reflection-label">OPTIONAL CHECK-IN</p>
                  <div className="reflection-choices" role="group" aria-label="Optional session reflection">
                    {['Grounded', 'Curious', 'Not for me'].map((item) => <button className={`reflection-chip ${reflection === item ? 'selected' : ''}`} type="button" key={item} aria-pressed={reflection === item} onClick={() => setReflection(item)}>{item}</button>)}
                  </div>
                  <button className="button button-primary" type="button" onClick={() => selectSoloCard(selectedCardId)}>Choose another moment</button>
                </div>
              ) : (
                <>
                  <p className="card-kicker">{soloStatus === 'paused' ? 'PAUSED · TAKE YOUR TIME' : 'GO AT YOUR OWN PACE'}</p>
                  <div className="solo-countdown" aria-label={`Time remaining ${formatTime(soloSeconds)}`}>{formatTime(soloSeconds)}</div>
                  <p className="solo-timer-label">{selectedCard.duration} minute{selectedCard.duration === 1 ? '' : 's'} · {selectedCard.title}</p>
                  <div className="timer-progress" role="progressbar" aria-label="Session progress" aria-valuemin={0} aria-valuemax={selectedCard.duration * 60} aria-valuenow={selectedCard.duration * 60 - soloSeconds}>
                    <span style={{ width: `${((selectedCard.duration * 60 - soloSeconds) / (selectedCard.duration * 60)) * 100}%` }} />
                  </div>
                  <div className="solo-control-row">
                    <button className="button button-primary" type="button" onClick={() => setSoloStatus(soloStatus === 'running' ? 'paused' : 'running')}>{soloStatus === 'running' ? 'Pause' : soloStatus === 'paused' ? 'Resume' : 'Begin session'}</button>
                    <button className="button button-outline" type="button" disabled={soloStatus === 'idle'} onClick={() => {
                      setSoloStatus('idle')
                      setSoloSeconds(selectedCard.duration * 60)
                      setNotice('Session stopped. You can begin again whenever you like.')
                    }}>Stop</button>
                    <button className="button button-quiet" type="button" disabled={soloStatus === 'idle'} onClick={() => {
                      const currentIndex = soloCards.findIndex((card) => card.id === selectedCardId)
                      selectSoloCard(soloCards[(currentIndex + 1) % soloCards.length].id)
                    }}>Skip</button>
                  </div>
                  <p className="solo-safety">Pause, stop or skip whenever you want. No progress is lost.</p>
                </>
              )}
            </section>
          </div>
          <div className="solo-bottom-row">
            <p className="solo-disclosure"><span className="status-dot" /> Prototype · Choices reset on reload · No account or app server connected</p>
            <button className="button button-quiet" type="button" onClick={() => setShowDeleteDialog(true)}>Privacy &amp; clear choices</button>
          </div>
        </section>
      )}

      {notice && <p className="toast" role="status">{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></p>}

      {showDeleteDialog && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowDeleteDialog(false)
        }}>
          <section className="dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-copy">
            <p className="eyebrow">CLEAR PREVIEW DATA</p><h2 id="delete-title">Clear your choices?</h2>
            <p className="body-copy" id="delete-copy">This resets the temporary personalization choice and demo invitation in this page. No saved session history exists in this prototype.</p>
            <div className="button-row">
              <button className="button button-quiet" type="button" onClick={() => setShowDeleteDialog(false)}>Keep choices</button>
              <button className="button button-primary" type="button" onClick={clearDemoData}>Clear choices</button>
            </div>
          </section>
        </div>
      )}

      <footer className="footer">
        <span>gME2 <span className="footer-divider">/</span> TAKE IT AT YOUR PACE</span>
        <button type="button" onClick={() => {
          openPrivacyDetails()
        }}>Privacy details</button>
      </footer>
    </main>
  )
}

export default App
