import { useEffect, useRef, useState } from 'react'
import { challenges, type Challenge } from '../data/challenges'
import { completeChallengeDay, getNextIncompleteDay, isChallengeComplete } from '../lib/challengeProgress'
import './ChallengeHub.css'

type ChallengeHubProps = {
  hidden: boolean
  onExit: () => void
  onEnterSolo: () => void
}

type View = 'catalog' | 'detail' | 'activity' | 'complete' | 'badge'
type Template = 'editorial' | 'playful' | 'cinematic'

const templates: { id: Template; label: string; description: string }[] = [
  { id: 'editorial', label: 'Minimal editorial', description: 'Quiet typography and generous space.' },
  { id: 'playful', label: 'Warm and playful', description: 'Soft shapes and a lighter palette.' },
  { id: 'cinematic', label: 'Premium and cinematic', description: 'A calm, atmospheric gradient.' },
]

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

async function renderBadge(
  challenge: Challenge,
  completionDate: string,
  template: Template,
  showAttribution: boolean,
) {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1350
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Image creation is unavailable in this browser.')

  const palettes: Record<Template, { background: string; ink: string; accent: string; border: string }> = {
    editorial: { background: '#f2eee8', ink: '#252129', accent: '#785d88', border: '#d6c9b8' },
    playful: { background: '#f6e9df', ink: '#2d2629', accent: '#a05a61', border: '#e0bdb1' },
    cinematic: { background: '#191721', ink: '#f3edf4', accent: '#d7b9ff', border: '#574966' },
  }
  const palette = palettes[template]
  context.fillStyle = palette.background
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = palette.border
  context.lineWidth = 2
  drawRoundedRect(context, 48, 48, 984, 1254, 28)
  context.stroke()
  context.fillStyle = palette.accent
  context.beginPath()
  context.arc(540, 390, 84, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = palette.background
  context.font = '56px Georgia, serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('✳', 540, 393)
  context.fillStyle = palette.accent
  context.font = '600 24px system-ui, sans-serif'
  context.letterSpacing = '5px'
  context.fillText('A MOMENT, MARKED', 540, 580)
  context.fillStyle = palette.ink
  context.font = '400 58px Georgia, serif'
  context.letterSpacing = '0px'
  const titleWords = challenge.title.split(' ')
  let line = ''
  const lines: string[] = []
  titleWords.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word
    if (context.measureText(candidate).width > 820 && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  })
  if (line) lines.push(line)
  lines.slice(0, 2).forEach((titleLine, index) => {
    context.fillText(titleLine, 540, 710 + index * 77)
  })
  context.fillStyle = palette.ink
  context.font = '500 27px system-ui, sans-serif'
  context.fillText('7 days of intentional connection', 540, 910)
  context.fillStyle = palette.accent
  context.font = '400 25px system-ui, sans-serif'
  context.fillText(completionDate, 540, 975)
  if (showAttribution) {
    context.fillStyle = palette.ink
    context.font = '500 22px system-ui, sans-serif'
    context.fillText('gME2', 540, 1192)
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result)
      else reject(new Error('The badge image could not be created.'))
    }, 'image/png')
  })
  return new File([blob], 'gme2-challenge-badge.png', { type: 'image/png' })
}

function getCompletionLabel(doneCount: number) {
  return `${doneCount} of 7 activities complete`
}

export default function ChallengeHub({ hidden, onExit, onEnterSolo }: ChallengeHubProps) {
  const screenRef = useRef<HTMLElement | null>(null)
  const [view, setView] = useState<View>('catalog')
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null)
  const [completedDays, setCompletedDays] = useState<Record<string, number[]>>({})
  const [completionDates, setCompletionDates] = useState<Record<string, string>>({})
  const [reflections, setReflections] = useState<Record<string, string>>({})
  const [activeDay, setActiveDay] = useState(0)
  const [badgeDate, setBadgeDate] = useState('')
  const [template, setTemplate] = useState<Template>('editorial')
  const [showAttribution, setShowAttribution] = useState(false)
  const [shareError, setShareError] = useState('')
  const [clearConfirm, setClearConfirm] = useState(false)
  const [notice, setNotice] = useState('')

  const activeChallenge = challenges.find((item) => item.id === activeChallengeId) ?? null
  const doneDays = activeChallenge ? completedDays[activeChallenge.id] ?? [] : []
  const activityKey = activeChallenge ? `${activeChallenge.id}:${activeDay}` : ''
  const doneCount = doneDays.length
  const challengeComplete = activeChallenge ? isChallengeComplete(doneDays, activeChallenge.days.length) : false

  useEffect(() => {
    if (hidden) return
    screenRef.current?.querySelector<HTMLElement>('.challenge-focus-heading')?.focus()
  }, [hidden, view, activeDay])

  function startChallenge(challenge: Challenge) {
    setActiveChallengeId(challenge.id)
    const done = completedDays[challenge.id] ?? []
    const firstUnfinished = getNextIncompleteDay(done, challenge.days.length)
    if (firstUnfinished >= 0) {
      setActiveDay(firstUnfinished)
      setView('activity')
    } else {
      setActiveDay(6)
      setView('complete')
    }
    setNotice('')
  }

  function openChallenge(challenge: Challenge) {
    setActiveChallengeId(challenge.id)
    setView('detail')
    setNotice('')
  }

  function completeActivity() {
    if (!activeChallenge) return
    const nextDone = completeChallengeDay(completedDays[activeChallenge.id] ?? [], activeDay, activeChallenge.days.length)
    setCompletedDays((current) => ({ ...current, [activeChallenge.id]: nextDone }))
    setReflections((current) => {
      const next = { ...current }
      delete next[activityKey]
      return next
    })
    if (isChallengeComplete(nextDone, activeChallenge.days.length)) {
      setCompletionDates((current) => ({ ...current, [activeChallenge.id]: new Date().toISOString() }))
      setView('complete')
      return
    }
    const nextDay = getNextIncompleteDay(nextDone, activeChallenge.days.length)
    setActiveDay(nextDay)
    setView('activity')
  }

  function selectActivity(day: number) {
    if (!activeChallenge || day < 0 || day >= activeChallenge.days.length) return
    setReflections((current) => {
      const next = { ...current }
      delete next[activityKey]
      return next
    })
    setActiveDay(day)
  }

  function continueFromCompletedActivity() {
    if (!activeChallenge) return
    const nextDay = getNextIncompleteDay(doneDays, activeChallenge.days.length)
    if (nextDay === -1) {
      setView('complete')
      return
    }
    selectActivity(nextDay)
  }

  function leaveChallenge() {
    setView(activeChallenge ? 'detail' : 'catalog')
    setReflections({})
  }

  function previewBadge() {
    if (!activeChallenge || !challengeComplete) return
    const completedAt = completionDates[activeChallenge.id]
    setBadgeDate(formatDate(completedAt ? new Date(completedAt) : new Date()))
    setShareError('')
    setView('badge')
  }

  async function shareBadge() {
    if (!activeChallenge || !badgeDate) return
    setShareError('')
    setNotice('')
    try {
      const file = await renderBadge(activeChallenge, badgeDate, template, showAttribution)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'A completed challenge' })
        setNotice('The share sheet closed. This app cannot confirm whether another app shared the image.')
        return
      }
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.download = file.name
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setNotice('Badge image downloaded. Choose where to share it yourself.')
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setNotice('Sharing cancelled. Your badge is still available.')
        return
      }
      setShareError(error instanceof Error ? error.message : 'The badge image could not be shared.')
    }
  }

  function clearProgress() {
    setCompletedDays({})
    setCompletionDates({})
    setReflections({})
    setActiveChallengeId(null)
    setActiveDay(0)
    setBadgeDate('')
    setClearConfirm(false)
    setView('catalog')
    setNotice('Challenge progress in this tab has been cleared.')
  }

  const stageIndex = view === 'catalog' ? 0 : view === 'detail' ? 1 : view === 'activity' ? 2 : 3

  return (
    <section className="challenge-screen" ref={screenRef} hidden={hidden} aria-labelledby="challenge-heading">
      <div className="challenge-page-heading">
        <div>
          <p className="eyebrow"><span /> PRIVATE PROGRESS · OPTIONAL SHARING</p>
          <h1 id="challenge-heading">Small steps,<br /><em>closer connection.</em></h1>
          <p className="challenge-intro">Short, nonsexual prompts for noticing, listening, and appreciating. Do them alone or together; skip, pause, or come back whenever you like.</p>
        </div>
        <button className="button button-quiet" type="button" onClick={onExit}>← Back to gME2</button>
      </div>

      <nav className="challenge-stepper" aria-label="Challenge progress">
        {['Choose', 'Understand', 'Take a moment', 'Celebrate'].map((label, index) => (
          <div className={`step ${stageIndex === index ? 'active' : ''} ${stageIndex > index ? 'complete' : ''}`} key={label} aria-current={stageIndex === index ? 'step' : undefined}>
            <span className="step-number">{stageIndex > index ? '✓' : `0${index + 1}`}</span><span>{label}</span>
          </div>
        ))}
      </nav>

      {view === 'catalog' && (
        <div className="challenge-catalog">
          <div className="challenge-section-heading">
            <div><p className="card-kicker">START WITH ONE WEEK</p><h2 className="challenge-focus-heading" tabIndex={-1}>Choose what feels useful.</h2></div>
            <span className="challenge-rule">No streaks · No deadlines · No sharing required</span>
          </div>
          <div className="challenge-grid">
            {challenges.map((challenge, index) => {
              const count = completedDays[challenge.id]?.length ?? 0
              return (
                <article className={`challenge-tile challenge-tone-${index + 1}`} key={challenge.id}>
                  <p className="card-kicker">{challenge.theme}</p>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.summary}</p>
                  <div className="challenge-tile-meta"><span>7 activities</span><span>About 5 min each</span></div>
                  {count > 0 && <p className="challenge-progress-copy">{getCompletionLabel(count)}</p>}
                  <button className="button button-outline" type="button" onClick={() => openChallenge(challenge)}>{count ? 'Continue' : 'Explore challenge'} <span aria-hidden="true">→</span></button>
                </article>
              )
            })}
          </div>
          <div className="challenge-privacy-note">
            <span className="status-dot" />
            <p><strong>Your progress stays in this tab.</strong> This prototype does not save challenge activity to a server or across reloads. Reflections are optional and never included in a badge.</p>
            <button className="text-button" type="button" onClick={() => setClearConfirm(true)} disabled={doneCount === 0 && Object.keys(completedDays).length === 0}>Clear progress</button>
          </div>
          {clearConfirm && (
            <div className="challenge-confirm" role="group" aria-label="Confirm clearing challenge progress">
              <p>Clear all challenge progress and private check-ins from this tab?</p>
              <button className="button button-quiet button-small" type="button" onClick={() => setClearConfirm(false)}>Keep it</button>
              <button className="button button-outline button-small" type="button" onClick={clearProgress}>Clear progress</button>
            </div>
          )}
        </div>
      )}

      {view === 'detail' && activeChallenge && (
        <div className="challenge-detail">
          <div className="challenge-detail-main">
            <p className="card-kicker">{activeChallenge.theme} · 7 ACTIVITIES</p>
            <h2 className="challenge-focus-heading" tabIndex={-1}>{activeChallenge.title}</h2>
            <p className="body-copy">{activeChallenge.purpose}</p>
            <div className="challenge-facts">
              <div><span>TIME</span><strong>About 5 minutes per activity</strong></div>
              <div><span>FORMAT</span><strong>One prompt and an optional private check-in</strong></div>
              <div><span>PACE</span><strong>Any order, any day, no streaks</strong></div>
              <div><span>COMPLETE WHEN</span><strong>Choose “Complete activity” on all 7 prompts</strong></div>
            </div>
            <div className="challenge-actions">
              <button className="button button-primary" type="button" onClick={() => startChallenge(activeChallenge)}>{doneCount ? 'Continue challenge' : 'Start solo'} <span aria-hidden="true">→</span></button>
              <button className="button button-quiet" type="button" onClick={() => setView('catalog')}>← All challenges</button>
            </div>
            <p className="fine-print">You may pause or stop without losing completed activities. A missed day has no effect. This prototype has no synced partner participation or invitation service.</p>
          </div>
          <aside className="challenge-preview-panel">
            <p className="card-kicker">WHAT TO EXPECT</p>
            <div className="challenge-preview-mark" aria-hidden="true">✳</div>
            <p>One thoughtful prompt at a time. Share a response only if you choose; pass, skip, or keep it private.</p>
            <span className="challenge-badge-label">ACHIEVEMENT</span>
            <strong>{activeChallenge.badge}</strong>
          </aside>
        </div>
      )}

      {view === 'activity' && activeChallenge && (
        <div className="challenge-activity-layout">
          <section className="activity-card" aria-labelledby="activity-title">
            <div className="activity-card-top">
              <div><p className="card-kicker">{activeChallenge.title.toUpperCase()}</p><span className="activity-day">ACTIVITY {activeDay + 1} OF 7</span></div>
              <button className="button button-quiet button-small" type="button" onClick={leaveChallenge}>Pause for now</button>
            </div>
            <div className="activity-progress" role="progressbar" aria-label={getCompletionLabel(doneCount)} aria-valuemin={0} aria-valuemax={7} aria-valuenow={doneCount}>
              <span style={{ width: `${(doneCount / 7) * 100}%` }} />
            </div>
            <nav className="activity-picker" aria-label="Choose an activity">
              {activeChallenge.days.map((day, index) => {
                const isDone = doneDays.includes(index)
                return (
                  <button
                    className={`activity-picker-button ${activeDay === index ? 'selected' : ''} ${isDone ? 'completed' : ''}`}
                    type="button"
                    key={day.title}
                    aria-current={activeDay === index ? 'step' : undefined}
                    aria-label={`Activity ${index + 1}: ${day.title}${isDone ? ', completed' : ''}`}
                    onClick={() => selectActivity(index)}
                  >
                    {isDone ? '✓' : index + 1}
                  </button>
                )
              })}
            </nav>
            <h2 className="challenge-focus-heading" id="activity-title" tabIndex={-1}>{activeChallenge.days[activeDay].title}</h2>
            <p className="activity-prompt">{activeChallenge.days[activeDay].prompt}</p>
            <div className="activity-reflection">
              <p className="card-kicker">PRIVATE CHECK-IN · OPTIONAL</p>
              <p>{activeChallenge.days[activeDay].reflection}</p>
              <div className="reflection-choices" role="group" aria-label="Optional private check-in">
                {['Noticed', 'Still thinking'].map((answer) => (
                  <button className={`reflection-chip ${reflections[activityKey] === answer ? 'selected' : ''}`} type="button" key={answer} aria-pressed={reflections[activityKey] === answer} onClick={() => setReflections((current) => ({ ...current, [activityKey]: answer }))}>{answer}</button>
                ))}
                <button className="reflection-chip" type="button" aria-pressed={!reflections[activityKey]} onClick={() => setReflections((current) => {
                  const next = { ...current }
                  delete next[activityKey]
                  return next
                })}>Skip</button>
              </div>
              <p className="fine-print">No free-text response. This choice is held only while the card is open, cleared when you leave it, and not part of challenge completion.</p>
            </div>
            <div className="activity-actions">
              <button className="button button-primary" type="button" onClick={doneDays.includes(activeDay) ? continueFromCompletedActivity : completeActivity}>{doneDays.includes(activeDay) ? 'Continue to an unfinished activity' : 'Complete activity'} <span aria-hidden="true">→</span></button>
              <button className="button button-quiet" type="button" onClick={leaveChallenge}>Leave without completing</button>
            </div>
          </section>
          <aside className="activity-safety">
            <p className="card-kicker">YOUR PACE, YOUR CHOICE</p>
            <h3>Pass is always okay.</h3>
            <p>These prompts are invitations, not tests. You can stop here, come back later, or choose another activity. No progress is removed for taking a break.</p>
          </aside>
        </div>
      )}

      {view === 'complete' && activeChallenge && (
        <div className="challenge-completion">
          <span className="completion-symbol" aria-hidden="true">✳</span>
          <p className="eyebrow">SEVEN MOMENTS, AT YOUR PACE</p>
          <h2 className="challenge-focus-heading" tabIndex={-1}>You made room<br />for connection.</h2>
          <p className="body-copy">{activeChallenge.title} is complete. The badge is yours whether or not you share it.</p>
          <div className="completion-badge"><span aria-hidden="true">✳</span><div><small>ACHIEVEMENT UNLOCKED</small><strong>{activeChallenge.badge}</strong><span>7 activities · {activeChallenge.title}</span></div></div>
          <div className="challenge-actions">
            <button className="button button-primary" type="button" onClick={previewBadge}>Preview share badge</button>
            <button className="button button-outline" type="button" onClick={() => setView('catalog')}>Explore another challenge</button>
            <button className="button button-quiet" type="button" onClick={onEnterSolo}>Return to Solo</button>
            <button className="button button-quiet" type="button" onClick={onExit}>Return to gME2</button>
          </div>
          <p className="fine-print">Public sharing is optional. The preview contains only the challenge name, seven-day duration, and completion date. The date appears only if you choose to preview a badge.</p>
        </div>
      )}

      {view === 'badge' && activeChallenge && (
        <div className="badge-share-layout">
          <div className="badge-preview-column">
            <p className="card-kicker">PREVIEW · NOTHING SHARED YET</p>
            <div className={`share-badge badge-${template}`} role="img" aria-label={`${activeChallenge.title}, 7 days of intentional connection, completed ${badgeDate}${showAttribution ? ', gME2' : ''}`}>
              <div className="share-badge-icon" aria-hidden="true">✳</div>
              <p>A MOMENT, MARKED</p>
              <h2>{activeChallenge.title}</h2>
              <strong>7 days of intentional connection</strong>
              <span>{badgeDate}</span>
              {showAttribution && <small>gME2</small>}
            </div>
            <p className="fine-print">Only the challenge name, 7-day duration, and completion date appear. No partner, card, reflection, or session details are included.</p>
          </div>
          <div className="badge-options">
            <p className="card-kicker">MAKE IT YOURS</p>
            <h2 className="challenge-focus-heading" tabIndex={-1}>Choose a look.</h2>
            <div className="template-options" role="group" aria-label="Badge design">
              {templates.map((item) => (
                <button className={`template-option ${template === item.id ? 'selected' : ''}`} type="button" key={item.id} aria-pressed={template === item.id} onClick={() => setTemplate(item.id)}>
                  <span className={`template-swatch swatch-${item.id}`} aria-hidden="true" /><span><strong>{item.label}</strong><small>{item.description}</small></span>
                </button>
              ))}
            </div>
            <label className="check-row badge-attribution">
              <input type="checkbox" checked={showAttribution} onChange={(event) => setShowAttribution(event.target.checked)} />
              <span><strong>Include gME2 attribution</strong><small>Optional. Off by default.</small></span>
            </label>
            <div className="badge-actions">
              <button className="button button-primary" type="button" onClick={shareBadge}>Share or download image</button>
              <button className="button button-quiet" type="button" onClick={() => setView('complete')}>← Back to achievement</button>
            </div>
            {shareError && <p className="share-error" role="alert">{shareError}</p>}
            <p className="fine-print">Your device may offer a share sheet. This app cannot see where you share it or confirm that it was posted. Cancel without losing your badge.</p>
          </div>
        </div>
      )}

      {notice && <p className="challenge-toast" role="status">{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></p>}
    </section>
  )
}
