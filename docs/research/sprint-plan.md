# CoupleEdger — 7-Day Research Sprint

> Execute this before starting the build to validate market fit and technical feasibility.

## Days 1–2: Competitor Deep-Dive

### Task: edgeritual.app Session Archaeology
- [ ] Open https://edgeritual.app/tools/edging-timer in Chrome
- [ ] Open DevTools → Network → start a 5-minute session
- [ ] Screenshot and document:
  - Exact phase transition UI (stroke → edge → rest)
  - Audio cue timing and content
  - Visual mode transitions
  - Edge counter interaction
- [ ] Open https://edgeritual.app/session → trace the **full session state machine**
- [ ] Read the source (View Page Source) — note:
  - Framework (likely Svelte-based on the HTML structure)
  - How Web Speech API is invoked (language selector, cadence)
  - How Web Audio is initialized
- [ ] **Deliverable**: `docs/research/edgeritual-analysis.md` with annotated screenshots + extracted state machine

### Task: App Store Policy Investigation
- [ ] Read Apple App Store Review Guidelines Section 1.1.4 (Sexual/pornographic content)
- [ ] Read Google Play Inappropriate Content policy (latest 2025 version)
- [ ] Find **3 recent cases** (2024–2025) of adult couple apps being banned:
  - Kinker Google Play removal (documented on kinker.ovh)
  - Naughty Game for Couples (documented on intimatecouplegame.com)
  - Any 3rd case via search: `"adult app banned play store 2025"`
- [ ] Document exact policy language cited in removal
- [ ] **Deliverable**: `docs/research/app-store-policy.md` with quoted policy + removal case studies

## Days 3–4: Kink Community Content Study

### Task: Edging Card Language Patterns
- [ ] Join r/edging (read-only browse) — search for "task generator", "JOI", "punishment"
- [ ] Join r/JOI — read top posts for instruction language patterns
- [ ] Browse itch.io NSFW JOI games — play Heat Control, Edge Fap Roulette
- [ ] Document 20 card texts for each type:
  - **EDGE cards** (how to tease without finishing) — 5 per intensity level (1,2,3,4,5)
  - **COMMAND cards** (direct instructions) — 5 per intensity
  - **PUNISHMENT cards** (consequences) — 5 per intensity
  - **REWARD cards** (permission/permission to finish) — 5 per intensity
- [ ] Extract common language patterns:
  - "Don't you dare cum until I say so" (dominant tone)
  - "I want to see you... (beg/edge/try)" (teasing)
  - "Such a good boy/girl/pet" (praise)
  - "You'll thank me later" (anticipation)
- [ ] **Deliverable**: `docs/research/content-patterns.md` with 80 sample card texts + language pattern analysis

### Task: Physical Game Decompilation
- [ ] Watch "You're Gonna…" unboxing/playthrough on YouTube
- [ ] Document the EDGE/TREMBLE/LET GO card ratio and sample 10 of each
- [ ] Document the secret timer mechanic — how does the giver set it? How does the receiver see it?
- [ ] **Deliverable**: `docs/research/physical-game-analysis.md`

## Day 5: Technical Feasibility Sprint

### Task: Browser API Test Matrix
On **each** browser/device:
| Browser | Device | Test |
|---------|--------|------|
| Chrome latest | macOS | Web Speech: `speechSynthesis.getVoices()` count + quality? |
| Chrome latest | macOS | Web Audio: latency of synth click vs `setInterval`? |
| Safari 18 | macOS | Web Speech: voices available? quality? |
| Safari 18 | iPad | Vibration API: `navigator.vibrate()` works? |
| Chrome latest | Pixel 8 | Vibration + Wake Lock + Web Bluetooth? |
| Safari iOS 18 | iPhone 16 | **Web Bluetooth**: blocked? |
| Chrome latest | Windows | All APIs working? |

- [ ] Test `navigator.bluetooth.requestDevice()` on iOS Safari → expect FAIL
- [ ] Test `SpeechSynthesisUtterance` latency across browsers
- [ ] Test `requestAnimationFrame` drift over 30s simulated session
- [ ] **Deliverable**: `docs/research/browser-api-test.md` with pass/fail matrix

### Task: PWA Performance Test
- [ ] Build minimal Vite PWA with timer + 3 visual modes
- [ ] Test:
  - Install to home screen on iOS → works offline?
  - Background tab: does timer keep running? (`requestAnimationFrame` pause?)
  - `AudioContext.resume()` after user gesture
- [ ] **Deliverable**: Working prototype branch `research/pwa-test`

## Day 6: Market Sizing & Positioning

### Task: Competitor Pricing Analysis
- [ ] Spicer: $6.99/mo, $59.99/yr, $109.99 lifetime
- [ ] Desire: freemium with coin packs
- [ ] Foreplay: freemium, vibrator integration
- [ ] edgeritual.app: free, donations
- [ ] You're Gonna…: $34 physical
- [ ] Twosome: $39.95 physical
- [ ] What's the pricing gap? (No **free** couple-focused digital edging game)
- [ ] **Deliverable**: `docs/research/pricing-analysis.md` with gap identification

### Task: Community Demand Signals
- [ ] Search Reddit: `"couple edging app"`, `"remote edging game"`, `"two player edging"`
- [ ] Count posts asking for edging games for couples
- [ ] What features do people **desperately want** that don't exist?
- [ ] **Deliverable**: `docs/research/community-demand.md` with top 10 feature requests

## Day 7: Synthesis & MVP Pivot

### Task: Competitive Advantage Matrix
- [ ] Map your 10 proposed features against 5 competitors
- [ ] Identify your **unique combination**: Couple-first + Edging-focused + PWA + Timer precision + Voice coach + Aftercare
- [ ] **Deliverable**: `docs/research/mvp-positioning.md` with positioning statement + feature gap table

### Task: Final Card Deck Spec
- [ ] Based on language patterns, write 20 core EDGE cards
- [ ] Define the **exact card type ratio**: 30% EDGE, 20% TEASE, 20% COMMAND, 15% PUNISHMENT, 10% REWARD, 5% WILDCARD
- [ ] Define **intensity scaling rules**: How does intensity 3 differ from intensity 1 in each card type?
- [ ] **Deliverable**: `src/data/coreDeck.json` with 20 validated cards

---

## Pre-Build Go/No-Go Checklist

- [ ] Age verification mechanism designed (DOB + checkbox)
- [ ] Legal copy drafted (ToS, Privacy, 18+ disclaimer)
- [ ] Card type system validated against kink community patterns
- [ ] 20 core cards written with correct tone/voice
- [ ] Browser API matrix complete (know your PWA limits)
- [ ] Competitive advantage clearly identified and defensible
- [ ] PWA prototype passes offline install + timer precision tests
- [ ] Content moderation strategy defined (text-only UGC only)
- [ ] Aftercare system design documented
- [ ] Safeword implementation specified

### Decision Gate:
If **all 10** items above are checked → proceed to Phase 2 MVP build  
If any are missing → complete before building