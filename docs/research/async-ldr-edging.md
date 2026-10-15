---
tags: [research, async-ldr, long-distance, asynchronous, consent, timer-mode, mvp]
---

# Async LDR Edging Research & Product Architecture

> **Source**: LDR digital intimacy studies + sexting/consent research + community discussions  
> **Key Finding**: Sender prepares sequence, recipient controls pace locally — async command cards  
> **Status**: ✅ Ready for MVP (Phase 1: Link-based async sessions)  

---

## 🎯 Core Product Concept

> **Asynchronous Command Cards for LDR Couples**
> 
> One partner prepares a timed sequence → Sends private link → Recipient opens when ready → Experiences cards locally with timer → Pauses/stops at will → Closes session

**Key Distinction**: Sender controls *planned sequence*, recipient controls *participation, timing, termination*. Every session voluntary, recipient can stop without sender permission.

---

## 🧬 Research Foundations

### Digital Intimacy in LDRs
| Finding | Product Implication |
|---------|-------------------|
| Responsive texting → relationship satisfaction | Optional progress acknowledgments |
| Sexting frequency ≠ closeness | Quality > message count |
| Digital sexual communication risks coercion | Explicit, revocable consent |
| Asynchronous = different schedules | Recipient chooses when to begin |

### Consent Architecture (2026 Review)
- Consent must be *functional*, not just onboarding disclaimer
- Digital interactions create specific consent interpretation challenges
- Make consent *explicit within the digital experience itself*

---

## 🏗️ Core Mechanic: Async Command Cards

### Sender Prepares → Sends Link → Recipient Accepts → Local Timer → Recipient Controls

```
Step 1: Sender prepares session template
  → Cards, order, intervals, expiration, permitted activities
  → Generates private link

Step 2: Recipient reviews invitation
  → Sees sender, category, duration, safety controls
  → Must explicitly ACCEPT before session begins

Step 3: Recipient starts locally
  → Device shows first card + local timer
  → Sender doesn't need to stay connected

Step 4: Recipient controls experience
  → Pause | Skip | Slow Down | Stop | Finish
  → Can stop WITHOUT sender permission

Step 5: Session closes
  → Private completion screen
  → Sender gets acknowledgment ONLY if recipient agrees
```

### 6-Card MVP Sequence
| Card | Phase | Key Feature |
|------|-------|-------------|
| 1. Intro | INVITATION | Accept/Decline/Save |
| 2. Pace Setup | PACE_SELECTION | Relaxed/Playful/Structured/Unpredictable |
| 3. Awareness | AWARENESS | 30-60s check-in |
| 4. Choice | INTERACTIVE | Follow/Alternative/Skip |
| 5. Check-in | CONSENT_CHECK | Yes/Slow/Pause/Finish (blocks next) |
| 6. Close | COMPLETION | Finish/Send Ack/Write Message |

---

## ⏱️ Timing Modes (6 Options)

| Mode | Behavior | Use Case |
|------|----------|----------|
| Recipient-paced | Manual advance | Maximum flexibility |
| Fixed interval | Auto-advance after set time | Structured sessions |
| Variable interval | Random within range | Anticipation |
| Sender-prepared | Sender defines, recipient starts | Async partner-led |
| Pause-resume | Freezes on pause | Interrupted sessions |
| Scheduled invitation | Notify at chosen time | Coordinated LDR |

---

## 🛡️ Consent State Machine (Critical)

```
DRAFT → INVITED → ACCEPTED → ACTIVE → PAUSED/STOPPED/COMPLETED/EXPIRED
                    ↓
              Safety rules:
              - RED always stops immediately
              - No auto-restart after pause
              - Queued commands cleared on stop
              - Recipient can stop WITHOUT sender permission
```

---

## ⏱️ Timer Implementation (Timestamp-Based)

```typescript
// No setInterval! Use timestamp calculation:
session_start = recipient_start_timestamp
card_due_time = session_start + cumulative_delay

when_app_resumes:
  load_session()
  if stopped → show_end
  else if paused → show_paused
  else if now >= card_due_time → show_card
  else → show_remaining_time

// Mobile-safe: no background tab dependency
```

---

## 🛡️ Privacy & Security (Minimum Requirements)

- High-entropy invitation tokens, revocable, time-limited
- No intimate content in URLs or push notifications
- Explicit start action required
- Sender never sees real-time countdown or activity
- Minimize stored history, provide deletion controls
- No intimate data for ads/analytics

---

## 🧪 Psychological Effects to Test

| Potential Benefit | Potential Risk | Product Response |
|------------------|----------------|------------------|
| Anticipation | Anxiety about next message | Timing boundaries |
| Feeling connected | Feeling monitored | Optional progress sharing |
| Structured interaction | Pressure to finish | Skip/early completion |
| Playful instructions | Consent confusion | Separate roleplay from safety |
| Flexible async | Inappropriate notifications | Discrete, optional |

---

## 🚀 MVP Roadmap (3 Phases)

| Phase | Features | Timeline |
|-------|----------|----------|
| **Phase 1** | Session builder, link, acceptance, local timer, 6 cards, pause/skip/stop, private completion, expiration | **MVP** |
| **Phase 2** | Scheduled invites, reminders, templates, timing ranges, completion ack, saved templates | v1.1 |
| **Phase 3** | Unpredictable timing, custom sequences, separate prefs, shared history, native apps | v2.0 |

---

## 🔗 Integration Points

| Component | Integration |
|-----------|-------------|
| **Timer Modes** | Add "Async LDR" as 5th mode alongside Wave/Lock/Switch/Multi-Peak |
| **Consent** | Reuse RED/YELLOW/GREEN + state machine |
| **Kegel/Sensate** | Optional cards in async sequence |
| **Privacy** | Reuse token system, consent flow |
| **Tracking** | Separate async session logging |

---

## 📋 MVP Settings (From Research)

```typescript
const ASYNC_LDR_MVP = {
  cardIntervals: [30, 60, 120, 300], // seconds
  sessionLength: [5, 10, 15, 20],    // minutes
  timingVariability: "fixed" | "variable",
  pause: "unlimited",
  expiration: "sender-selected",
  lateDelivery: "never_compress",    // never auto-catch-up
};
```

---

## 📋 Cards Already Implemented (6 cards in `asyncLDRDeck.json`)

| ID | Type | Phase | Duration |
|----|------|-------|----------|
| `async-01-intro` | COMMAND | INVITATION | 0 (manual) |
| `async-02-set-pace` | COMMAND | PACE_SELECTION | 0 (manual) |
| `async-03-awareness` | TEASE | AWARENESS | 30-60s |
| `async-04-choice` | COMMAND | INTERACTIVE | 0 (manual) |
| `async-05-check-in` | COMMAND | CONSENT_CHECK | 0 (blocks next) |
| `async-06-close` | REWARD | COMPLETION | 0 (manual) |

---

## 🔗 Cross-References

- [[inclusive-timer-design]] — Add as 5th timer mode
- [[inclusive-edging-design]] — Consent architecture
- [[multi-peak-mode]] — Optional cards in sequence
- [[inclusive-edging-design]] — Kegel/sensate integration
- [[types-spec]] — Async types defined

---

## 🏷️ Tags
`research`, `async-ldr`, `long-distance`, `asynchronous`, `consent`, `timer-mode`, `mvp`