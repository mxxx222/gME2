# 🎮 CoupleEdger — Obsidian Project Map (TODO Ready)

> **18+ NSFW PWA for couples exploring edging together**  
> **Stack**: React 18 + Vite + TypeScript + Zustand + Workbox PWA  
> **Status**: ⏸️ Pre-Build — 7-Day Research Sprint  

> **HOW TO USE IN OBSIDIAN**:  
> Link each TODO checkbox to its task file. Use backlinks to track progress.  
> `[[ ]]` = incomplete task, `[[x]]` = complete task.

---

## 🗺️ Master Project TODO Map

### [[Phase 1: Research Sprint (7 Days)]]
- [ ] R1.1: Competitor deep-dive — edgeritual.app session archaeology
- [ ] R1.2: App store policy investigation (Apple + Google)
- [ ] R1.3: Kink community content language patterns
- [ ] R1.4: Browser API support matrix (desktop + mobile)
- [ ] R1.4.1: iOS Safari constraints (Bluetooth, haptics, speech)
- [ ] R1.5: 5 recent adult app store removal case studies
- [ ] R1.6: Gap analysis → 10 MVP feature ideas
- [ ] R1.7: Final go/no-go decision checkpoint

### [[Phase 2: PWA Shell]]
- [ ] P2.1: Install dependencies (`npm install`)
- [ ] P2.2: Verify Vite + React + TS dev server
- [ ] P2.3: Age gate works (no localStorage = redirect)
- [ ] P2.4: PWA manifest + service worker (offline test)
- [ ] P2.5: Theme + CSS variables (OLED dark, reduced motion)
- [ ] P2.6: Routing (negotiation, session, aftercare, stats, settings)

### [[Phase 3: Timer Engine]]
- [ ] P3.1: `usePreciseTimer` with `requestAnimationFrame` (drift < 100ms/30min)
- [ ] P3.2: 3-phase state machine (stroke → edge → rest → repeat)
- [ ] P3.3: 5 presets (Warm-up/Steady/Denial/Marathon/Ruin)
- [ ] P3.4: Phase transition cues (visual + haptic + audio)
- [ ] P3.5: Edge counter (tap-to-log)
- [ ] P3.6: Emergency stop button (always visible)
- [ ] P3.7: Timer tests pass

### [[Phase 4: Audio + Visual + Haptics]]
- [ ] P4.1: Web Audio — 6 tick sounds (click/tick/wood/beep/heartbeat/whoosh)
- [ ] P4.2: Web Speech voice coach (7 languages, phase-specific cues)
- [ ] P4.3: 3 visual modes (pulse ring / radial flash / breathing orb)
- [ ] P4.4: Vibration API patterns (tick, phase change, warning)
- [ ] P4.5: BPM slider (45–150 BPM) + tap-tempo lock
- [ ] P4.6: Screen wake lock during session
- [ ] P4.7: Cross-browser audio test

### [[Phase 5: Card Deck System]]
- [ ] P5.1: TypeScript `EdgingCard` type system finalized
- [ ] P5.2: `coreDeck.json` — 100 cards (all 5 intensities × 5 types)
- [ ] P5.3: Card display component (type badge, intensity, role)
- [ ] P5.4: Secret timer UI (giver sees duration, receiver sees only "go/no-go")
- [ ] P5.5: Consequence flow (failed card → punishment)
- [ ] P5.6: Card shuffling + draw mechanic

### [[Phase 6: Session Flow]]
- [ ] P6.1: Negotiation screen (consent checklist, roles, safeword, intensity)
- [ ] P6.2: Warmup phase (breathing orb, low BPM)
- [ ] P6.3: Cycle loop with card draws at phase transitions
- [ ] P6.4: Resolution phase (denial/ruin/release outcomes)
- [ ] P6.5: Aftercare screen (debrief prompts, cuddle timer, session rating)
- [ ] P6.6: Full session integration test

### [[Phase 7: Two-Player Sync]]
- [ ] P7.1: Session code generation (QR + 4-digit)
- [ ] P7.2: WebSocket signaling server (or Socket.io)
- [ ] P7.3: Shared timer state (drift-corrected)
- [ ] P7.4: Role-based UI (giver: secret timer + controls; receiver: countdown only)
- [ ] P7.5: Pass-and-play fallback (same device)
- [ ] P7.6: Sync disconnect handling

### [[Phase 8: Polish + PWA Optimization]]
- [ ] P8.1: Mobile responsiveness (iOS + Android quirks)
- [ ] P8.2: Reduced motion compliance (motion sickness)
- [ ] P8.3: Offline mode (timer works without network)
- [ ] P8.4: "Add to Home Screen" prompt optimization
- [ ] P8.5: Performance audit (Lighthouse 95+ score)
- [ ] P8.6: Accessibility audit (WCAG AA)
- [ ] P8.7: Error boundaries + loading states

### [[Phase 9: Testing]]
- [ ] T1: Timer precision tests (drift < 100ms over 30 min)
- [ ] T2: State machine transition tests (all phase paths)
- [ ] T3: Card filtering tests (by type, intensity, role)
- [ ] T4: Session lifecycle integration test
- [ ] T5: PWA offline test (no network)
- [ ] T6: Age gate test (localStorage bypass attempt)
- [ ] T7: Cross-browser compatibility (Chrome/Firefox/Safari/Edge)

### [[Phase 10: Documentation + Launch Prep]]
- [ ] D1: README (project overview, install, usage)
- [ ] D2: CLAUDE.md (agent guidelines)
- [ ] D3: Legal (ToS, Privacy Policy, 18+ disclaimer)
- [ ] D4: Deployment guide (Vercel/Netlify/CF Pages)
- [ ] D5: Beta release notes
- [ ] D6: Content moderation plan (if UGC added)

### [[Phase 11: Post-MVP Roadmap]]
- [ ] F1: Web Bluetooth toy integration (Progressive Web)
- [ ] F2: AI daily challenge generator
- [ ] F3: Community deck (text-only, moderated)
- [ ] F4: Native store versions (facade "wellness" branding)
- [ ] F5: Custom card editor
- [ ] F6: Analytics (consent-based, opt-in only)

---

## 📋 Weekly Sprint Boards

### Sprint 1 (Days 1–7): Research Sprint
```dataview
TASK FROM "docs/research/sprint-plan"
WHERE week = "1"
```

### Sprint 2 (Days 8–14): PWA Shell + Timer
```dataview
TASK FROM "" 
WHERE (P2 OR P3)
```

### Sprint 3 (Days 15–21): Audio + Cards + Session
```dataview
TASK FROM ""
WHERE (P4 OR P5 OR P6)
```

### Sprint 4 (Days 22–28): Sync + Polish
```dataview
TASK WHERE (P7 OR P8 OR T1 OR T2 OR T3 OR T4)
```

---

## 🎯 Milestone Checkpoints

- [ ] **MVP Freeze**: All Phase 2–6 complete + tests passing → `[[MVP Definition]]`
- [ ] **Beta Release**: Phase 2–8 complete + legal docs → `[[Beta Release]]`  
- [ ] **Public Launch**: All phases + documentation → `[[Public Launch]]`

---

## 📊 Metrics Dashboard (Dataview)  
*(Track in Obsidian with Dataview plugin)*

```dataview
TABLE status, assignee FROM "CoupleEdger"
WHERE contains(tags, "mvp")
SORT file.name
```

---

## 🔗 Linked Files

### Project Core
- [[README]]
- [[CLAUDE]]
- [[AGENTS]]
- [[docs/index]]

### Research Sprint
- [[docs/research/sprint-plan]]
- [[docs/research/prompt-1]] — Edging-specific games
- [[docs/research/prompt-2]] — Broad couple games  
- [[docs/research/prompt-3]] — Mechanics & UX
- [[docs/research/prompt-4]] — App store policies
- [[docs/research/prompt-5]] — Browser API matrix

### Technical Specs
- [[docs/design/types-spec]]
- [[docs/design/tech-spec]]
- [[src/data/coreDeck]]

### Kilo Commands
- [[build]]
- [[typecheck]]
- [[lint]]
- [[test]]

> **Tag convention**: `mvp`, `research`, `phase-1`...`phase-11`, `testing`, `legal`, `roadmap`