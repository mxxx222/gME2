# 🎮 CoupleEdger — NSFW Edging Game for Couples (React/Vite PWA)

> **Project Type**: Adult-oriented (18+) Progressive Web App for couples  
> **Stack**: React 18 + Vite + TypeScript + Workbox PWA  
> **Status**: ⏸️ Pre-Build — Research Complete  
> **Risk Profile**: App Store/Google Play policy risk → **PWA-first** strategy  
> **Last Updated**: 2026-10-15

---

## 📋 Project Tree (Obsidian Canvas Ready)

```
couple-edger/
├── README.md                    # This file — project master map
├── AGENTS.md                    # Claude Code / agent instructions
├── CLAUDE.md                    # Project conventions
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── manifest.json
│   ├── icons/                   # PWA icons
│   └── age-gate.html            # Legal landing before app loads
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── lib/
│   │   ├── timer/               # Core timer engine
│   │   │   ├── useSessionTimer.ts
│   │   │   ├── useBreathPacer.ts
│   │   │   └── presets.ts
│   │   ├── audio/
│   │   │   ├── synthSounds.ts   # Web Audio API tick sounds
│   │   │   └── voiceCoach.ts    # Web Speech API coach
│   │   ├── haptics/
│   │   │   └── useHaptics.ts    # Vibration patterns
│   │   ├── visuals/
│   │   │   ├── PulseRing.tsx
│   │   │   ├── RadialFlash.tsx
│   │   │   └── BreathingOrb.tsx
│   │   ├── store/
│   │   │   ├── sessionStore.ts  # Zustand
│   │   │   └── cardDeckStore.ts
│   │   └── types/
│   │       ├── card.ts          # Card type definitions
│   │       ├── session.ts       # Session type definitions
│   │       └── game.ts          # Game mode types
│   ├── pages/
│   │   ├── AgeGate.tsx
│   │   ├── Negotiation.tsx      # Consent + role setup
│   │   ├── Session.tsx          # Active play (timer + cards)
│   │   ├── Resolution.tsx       # Orgasm/Denial/Ruin outcome
│   │   ├── Aftercare.tsx        # Debrief + cuddle timer
│   │   ├── Library.tsx          # Card deck browser
│   │   ├── Stats.tsx            # Session history + streaks
│   │   └── Settings.tsx         # Presets, pacer, audio prefs
│   ├── components/
│   │   ├── ui/
│   │   ├── session/
│   │   │   ├── SessionHeader.tsx
│   │   │   ├── PhaseIndicator.tsx
│   │   │   └── EdgeCounter.tsx
│   │   ├── cards/
│   │   │   ├── CardDisplay.tsx
│   │   │   ├── CardTypeBadge.tsx
│   │   │   └── SecretTimer.tsx    # Giver-only timer view
│   │   └── two-player/
│   │       ├── RoleSelector.tsx
│   │       ├── DeviceSync.tsx     # WebRTC/WebSocket sync
│   │       └── ToyControl.tsx     # Web Bluetooth (progressive)
│   ├── data/
│   │   ├── coreDeck.json          # 50-100 core cards
│   │   ├── themedPacks/           # Femdom, Newbie, Sensory, etc.
│   │   └── challenges.json        # 7/14/30-day programs
│   └── hooks/
│       └── usePWA.ts            # Install prompt + offline
├── tests/
│   ├── unit/
│   │   ├── timer.test.ts
│   │   ├── card.test.ts
│   │   └── pacer.test.ts
│   └── integration/
│       └── session.test.tsx
├── .kilo/
│   ├── command/
│   │   ├── build.md
│   │   ├── test.md
│   │   ├── typecheck.md
│   │   └── lint.md
│   └── agent/
│       └── builder.md
├── docs/
│   ├── research/
│   │   ├── market-analysis.md
│   │   ├── mechanics-deep-dive.md
│   │   ├── app-store-policy.md
│   │   └── competitors.md
│   └── design/
│       ├── ux-flow.md
│       └── ui-specs.md
└── output/couple-edger/          # Build output
```

---

## ✅ Phase 1 — Pre-Build Checklist

- [ ] **Age verification**: Design age-gate flow (DOB check + checkbox)  
- [ ] **Legal copy**: Terms of Service, Privacy Policy, 18+ disclaimer  
- [ ] **Content guidelines**: Kink-safe, RACK, SSC framework documented  
- [ ] **Safeword system**: Implement Red/Yellow/Green (safe/ caution/ go)  
- [ ] **TypeScript type system**: Card, Session, Preset, Role types finalized  
- [ ] **PWA manifest**: Icons, theme color, display mode  
- [ ] **Web Audio synth**: 6 tick sounds working (click, tick, wood, beep, heartbeat, whoosh)  
- [ ] **Web Speech**: Voice coach voices working in browser  
- [ ] **Vibration API**: Haptics working on Android/mobile  

## 🐣 Phase 2 — MVP Build (6–8 Weeks)

### Week 1–2: PWA Shell
- [ ] Vite + React + TS + Tailwind setup  
- [ ] Workbox PWA config (offline, install prompt)  
- [ ] Age gate landing page  
- [ ] Routing (TanStack Router or React Router)  
- [ ] Theme: OLED-dark (PWA + low-stim friendly)  
- [ ] Accessibility: reduced motion toggle, font sizes  

### Week 2–3: Timer Engine Core
- [ ] `useSessionTimer` — 3-phase (stroke/edge/rest), `requestAnimationFrame` precision  
- [ ] Presets: Warm-up, Steady, Denial, Marathon, Ruin (configurable durations)  
- [ ] Pause/resume, skip phase, emergency stop  
- [ ] Edge counter (tap to log)  
- [ ] Phase transition cues (visual + audio + haptic)  
- [ ] Duration config UI  

### Week 3–4: Pacer + Audio + Haptics
- [ ] BPM slider (45–150), tap-tempo lock  
- [ ] 6 synth sounds via Web Audio API  
- [ ] Visual modes: Pulse Ring (default), Radial Flash, Breathing Orb  
- [ ] Voice coach via Web Speech API (7 languages, 15–120s cadence)  
- [ ] Haptic patterns on phase change + every tick  
- [ ] Auto-sync pacer to session preset  

### Week 4–5: Card Deck System
- [ ] Card type system (EDGE / TEASE / COMMAND / PUNISHMENT / REWARD / WILDCARD)  
- [ ] 50 core cards authored (10 per type × 5 intensities)  
- [ ] Intensity scaling (1–5) → preset adjustments  
- [ ] Secret timer UI (giver sets random range, receiver can't see)  
- [ ] Consequence flow (if receiver fails → PUNISHMENT card drawn)  
- [ ] Card shuffling + draw mechanic  

### Week 5–6: Session Flow
- [ ] Negotiation: consent checklist, intensity level, role selection (giver/receiver/switch), safeword setup  
- [ ] Warmup phase (breathing orb, low BPM)  
- [ ] Cycle loop: Stroke → Edge → Rest → [REPEAT N times]  
- [ ] Resolution:  
  - Denial mode → stop at edge target, "denied" screen  
  - Ruin mode → voice cues at PONR, "ruined" screen  
  - Release mode → "Let Go" card, timed orgasm window  
- [ ] Aftercare: debrief prompts, cuddle timer, session rating  
- [ ] Session log (local storage): duration, edges, outcome, rating  

### Week 6–7: Two-Device Sync (Same Room)
- [ ] Session code generation (4-digit + QR)  
- [ ] WebRTC signaling (simple WebSocket server) or local network discovery  
- [ ] Shared timer state (drift-corrected)  
- [ ] Role-based UI: Giver sees secret timer + controls pace, Receiver sees countdown only  
- [ ] Pass-and-play fallback (same device)  

### Week 7–8: Polishing & Polish
- [ ] Dark/OLED theme optimization  
- [ ] "Add to Home Screen" prompt (beforeinstallprompt)  
- [ ] Web Share API + QR code for session codes  
- [ ] Error boundaries, loading states  
- [ ] E2E tests: timer precision, card flow, session lifecycle  
- [ ] Mobile responsiveness (iOS Safari quirks, Android Chrome)  
- [ ] Reduced motion / accessibility audit  

## 🚀 Phase 3 — Post-MVP Roadmap

### Remote/Internet Features
- [ ] WebSocket relay server for long-distance session sync  
- [ ] Text chat embedded in session (encrypted relay)  
- [ ] Voice call integration (WebRTC)  
- [ ] **Web Bluetooth**: Toy control (Lovense via GATT) — Android/desktop only, progressive enhancement on iOS  

### Content Expansion
- [ ] Community deck submission (moderated, text-only UGC)  
- [ ] Themed packs: Femdom, Sensory Deprivation, Rope Play, Newbie, Impact, Pet Play  
- [ ] AI daily challenge (algorithmic 3-card + preset combo)  
- [ ] Custom card editor (save to local storage)  

### Monetization
- [ ] Free core + premium packs ($1.99–$4.99 each)  
- [ ] Subscription tier ($4.99/mo): unlimited packs, custom decks, advanced stats, priority support  
- [ ] Affiliate links (toy recommendations — Lovense, We-Vibe, etc.)  
- [ ] Patreon integration for early access to themed packs  

### Native Store (Later — Requires Facade Versioning)
- [ ] Capacitor wrapper for TestFlight / Google Play Console (Internal Testing)  
- [ ] "Lifestyle intimacy" framing to pass review  
- [ ] Explicit content hidden behind in-app toggle (default-off)  
- [ ] User-generated content removed (text-only, moderated)

---

## 🔬 Top 5 Research Prompts (Before Building)

### 1. **Edging physiology deep-dive**
> Research the physiological phases of edging: (1) **Plateau phase** (arousal build, heart rate/breathing changes), (2) **Point of No Return (PONR)** detection markers, (3) **Resolution phase** differences between orgasm vs denial vs ruin. What BPM ranges and breath patterns are optimal for extending the plateau? What are the documented physical risks of prolonged edging (e.g., _limb numbness_, _Temporary Extinction of Orgasm_ / TEO)? Include peer-reviewed sources from *Archives of Sexual Behavior*, *Journal of Sexual Medicine*, or *Psychology of Consciousness*. Focus on how a timer-based app can cue these phases.

### 2. **Competitor mechanics dissection**
> Analyze **edgeritual.app** (Edge), **CanICum.com**, **Faptronome**, and **Heat Control** (itch.io) in detail. For each: what timer phase logic do they use (stroke/edge/rest ratios by preset), how do they handle denial vs release vs ruin, what audio cues do they employ, what visual feedback patterns exist. Screenshot the `/session` page of edgeritual.app and trace the **exact state transitions** and UI patterns. Identify 3 mechanics from each competitor that your MVP should copy or improve upon.

### 3. **Kink community content patterns**
> Research how kink communities structure **command cards** and **denial/challenge systems**. Look at: You're Gonna… card game (EDGE/TREMBLE/LET GO), Valery Joi's JOI tasks, CoupleCommand coin-toss mechanics, and Reddit's r/edging and r/JOI communities. What language patterns do dominant/mistress types use in instructions? What are common "fail states" and punishments? What intensity progressions exist (beginner → advanced)? Compile 20 example card texts per type (EDGE, COMMAND, PUNISHMENT, REWARD) with intensity ratings 1–5.

### 4. **PWA technical constraints & capabilities**
> Document the exact browser API support matrix for your PWA stack: Web Audio API (synthesis quality, latency), Web Speech API (SSML support, voice availability per OS/browser), Vibration API (pattern support, iOS limitations), Web Bluetooth (GATT profile for Lovense toys, iOS Web Bluetooth status), Web Share API, IndexedDB quotas, Screen Wake Lock API, Page Visibility API for background tab handling. Test on iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari. Note which APIs are iOS-only-limited (no Web Bluetooth on iOS Safari, haptics require user gesture).

### 5. **App store policy risk assessment**
> Research the **latest Apple App Store Review Guidelines** (Section 1.1.4) and **Google Play Inappropriate Content policy** (2024/2025 updates). Find 5 recent cases of adult couple apps being banned/removed in 2024–2025 (Kinker, Naughty Game, any others). Document the exact policy language used. Research the **alternative app store** landscape in the EU (AltStore, Epic's store) and whether iOS PWA has any distribution limits. What framing strategies work for borderline content ("lifestyle intimacy", "sexual wellness")? Identify the exact threshold language that triggers "graphic sexual content" rejection.

---

## 📊 Competitor Comparison Matrix

| Feature | Your MVP | edgeritual.app | Spicer | Desire | You're Gonna… |
|---------|----------|----------------|--------|--------|---------------|
| **Couple-first** | ✅ Planned | ❌ Solo | ✅ Yes | ✅ Yes | ✅ Physical |
| **Edging focus** | ✅ Core | ✅ Core | ❌ Broad | ❌ Broad | ✅ Cards |
| **Timer precision** | ✅ rAF | ✅ rAF | ❌ Basic | ❌ Basic | Physical |
| **BPM pacer** | ✅ Planned | ✅ Full | ❌ No | ❌ No | ❌ No |
| **Voice coach** | ✅ Planned | ✅ Full | ❌ No | ❌ No | ❌ No |
| **Haptics** | ✅ Planned | ✅ Full | ❌ No | ❌ No | ❌ No |
| **Card decks** | ✅ Full | ❌ Presets | ✅ Questions | ✅ Dares | ✅ Physical |
| **Two-player sync** | ✅ Planned | ⚠️ Roadmap | ✅ Yes | ✅ Yes | ✅ Pass-and-play |
| **PWA** | ✅ Yes | ✅ Yes | ❌ Native | ❌ Native | ❌ Physical |
| **Toy integration** | 🔵 Future | ❌ No | ❌ No | ❌ No | ❌ No |
| **Aftercare** | ✅ Planned | ❌ No | ❌ No | ❌ No | ❌ No |

✅ Full feature · ⚠️ Partial · ❌ Missing · 🔵 Roadmap

---

## 🏗️ Claude Code / Agent Builder Instructions

These commands can be added to `.kilo/command/` and used with Claude Code or Kilo agents:

- `npm run dev` — Start Vite dev server (localhost:5173)
- `npm run build` — Production build + PWA assets
- `npm run preview` — Serve production build locally
- `npm run typecheck` — TypeScript type checking
- `npm run lint` — ESLint on src/
- `npm run test` — Run unit + integration tests
- `npm run test:watch` — Watch mode
- `npm run lint:fix` — Auto-fix lint issues

---

## 📈 Success Metrics (MVP Definition)

- **Session initiation rate**: % of users who complete negotiation and start a session  
- **Session completion rate**: % of sessions that reach Resolution phase  
- **Edge count per session**: Average edges logged (denial mode target)  
- **Return rate (7-day)**: % of users who return within a week  
- **Aftercare engagement**: % who rate session / set cuddle timer  
- **Install conversion**: % of PWA visitors who install / add to home screen  
- **Crash-free sessions**: >99.5%  
- **Timer accuracy**: Drift < 100ms over 30-minute session

---

## ⚠️ Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| App store rejection | High (if store version attempted) | Critical | Stay PWA-first; facade-version for stores later |
| Timer drift / precision issues | Low | High (core feature) | Use `requestAnimationFrame` + `performance.now()`, test on all browsers |
| Voice TTS quality on mobile | Medium | Medium | Test on iOS/Android browsers; provide text fallback |
| Content moderation liability | Low (no UGC in MVP) | Critical | Text-only UGC only, human-moderated, flagged keywords |
| iOS Safari API gaps (Web Bluetooth) | Low | Medium | Progressive enhancement; manual control fallback on iOS |
| User safety (prolonged edging injury) | Low | Critical | Built-in max session timer, safety warnings, aftercare prompts |

---

## 📚 Research Artifacts (Linked)

- [[docs/research/market-analysis]]
- [[docs/research/mechanics-deep-dive]]
- [[docs/research/app-store-policy]]
- [[docs/research/competitors]]
- [[docs/design/ux-flow]]
- [[docs/design/ui-specs]]