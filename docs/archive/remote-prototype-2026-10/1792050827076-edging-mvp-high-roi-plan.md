# Edging Tease & Control MVP — Highest ROI Plan

**Goal**: Build a browser-based interactive edging tutorial & session app for BG couples focused on slow teasing, edge control, hand grip techniques, and testicle stimulation — solving the biggest content gap in the market.

**Constraints**: Browser-only (no app store), 18+ with consent gate, couple-sync enabled, lightweight tech stack (React + Tailwind + Canvas/SVG), MVP in <4 weeks.

---

## Core Decisions

| Decision | Rationale |
|---|---|
| **Feature scope** | MVP = 1 technique screen (Ball Tease Grip) + 3-wave session builder + progress tracker. All other techniques & AI prompts are post-MPA extensions. |
| **Tech stack** | React 19 + TypeScript + Vite + TailwindCSS + Framer Motion + Lucide Icons + PixiJS for hand SVG illustrations. Avoids Unity/Godot (too heavy) and app stores (strict on adult content). |
| **Monetization** | One-time web app purchase ($39) + optional technique-pack DLCs ($12 each). No subscription needed for MVP. |
| **Validation** | Test with real couple (the coder + partner) first, then open beta in r/sex & r/Edging subreddits. |
| **Differentiators** | Illustrated hand-grip library + testicle stimulation curriculum + 3-wave protocol + couple real-time sync. No existing app combines all 3. |

---

## MVP Feature List (Ordered by ROI)

1. **18+ Consent Gate + Age verification** (legal requirement, every screen)
2. **Ball Tease Grip Technique** (first technique, illustrated with SVG hand model, pressure sliders, timer, practice mode)
3. **3-Wave Edging Session Builder** (dynamic calculator, arousal 1-10 visualizer, Controller/Receiver role assign, timer per wave)
4. **Session History & Rating** (localStorage, basic stats: duration, edges reached, satisfaction)
5. **Couple Share Link** (simple URL hash → both partners see same session timer/state)
6. **Disclaimer & Safety Reminders** (on every screen: consent, safe word, communication)

**Deferred to v1.0**:
- All other hand grip techniques (20+ from AI Prompt 1)
- Testicle stimulation curriculum (AI Prompt 2)
- 4-core arousal control interactive demos (AI Prompt 4)
- Session intelligence dashboard (AI Prompt 5)
- Multi-technique mode, user-generated protocols, paid DLC packs

---

## Tech Stack (confirmed working)

- `react`, `react-dom` (v19.2.8) — already in `package.json`
- `tailwindcss`, `postcss`, `autoprefixer` — installed & config generated
- `framer-motion` — for smooth timers/progress bar animations
- `lucide-react` — icon set (play, pause, stop, settings)
- `pixi.js` — 2D Canvas for hand technique SVG illustrations (lightweight, no WebGL boilerplate)
- `vite` — dev server + HMR + build (v8.3.4, confirmed working)
- `oxlint` — linting (runs in CI)

**All installed and `npm run build` passes clean.**

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| App stores reject adult/adjacent content | Browser-only distribution (Gumroad/vercel, no Play/App Store) |
| Users expect video not illustrations | Use SVG + CSS animation; can swap to embedded MP4 later if needed |
| LDR couple sync unreliable | Start with URL-hash sync; add WebRTC optional in v1.0 only if needed |
| Low conversion to paid DLC | Free MVP first, collect email via "unlock all techniques" CTA, then offer DLC |
| Performance overhead with many SVGs | Pixi.js batching + lazy-load only visible technique cards |

---

## Validation Plan (Next 7 Days)

- [ ] Day 1: Run `npm run dev`, open http://localhost:5173/technique/ball-tease, test with partner, collect 3 feedback points (clarity, arousal visual, timer accuracy)
- [ ] Day 2: Fix UX based on feedback, add breathing cue audio, refine pressure slider labels
- [ ] Day 3: Run lint + build, commit `feat: Ball Tease Grip MVP screen`
- [ ] Day 4: Post in r/sex & r/Edging asking for beta testers, gather 5 signups
- [ ] Day 5: Release free MVP to beta, track sessions, record improvement suggestions
- [ ] Day 6: Prioritize next technique or couple-sync feature based on beta data
- [ ] Day 7: Commit `chore: beta feedback incorporated + v0.2 roadmap`

---

## Success Metrics (post-MVP)

- ≥30 free beta signups in first week
- ≥80% of beta users complete the full 3-wave session
- ≥4/5 rating on "clarity of hand technique instructions"
- ≥2 paid DLC purchases if offered (validates price point)
- Positive qualitative feedback on "helps us edge better together"

---

## Next Immediate Step

Run `npm run dev`, test the Ball Tease Grip screen with your partner, and report back 3 actionable feedback items. Once confirmed, I will commit the MVP and push to GitHub.