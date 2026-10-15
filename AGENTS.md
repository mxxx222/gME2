# CoupleEdger Agent Instructions

## Project Context
This is an 18+ NSFW Progressive Web App for couples exploring edging together.
Built with React 18 + Vite + TypeScript.

## Conventions
- TypeScript strict mode: all code must typecheck
- Component naming: PascalCase (e.g., `SessionTimer.tsx`)
- File naming: kebab-case for dirs, PascalCase for components, camelCase for hooks/utils
- State: Zustand for global state, useState/useRef for local component state
- Timer precision: ALWAYS use `requestAnimationFrame` + `performance.now()`, NEVER `setInterval`
- All audio: Web Audio API (synthesized, no asset files)
- All voice: Web Speech API (client-side TTS)
- All haptics: `navigator.vibrate()` with pattern arrays
- PWA: offline-first, installable, age-gated entry

## Commands

### Development
```bash
npm run dev          # Vite dev server at localhost:5173
npm run build        # Production build + PWA assets
npm run preview      # Serve production build locally
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint
npm run test         # All tests
npm run test:watch   # Watch mode
```

### Code Agent Behavior
1. Before editing existing patterns, READ the file first
2. Match existing code style exactly (no comments, no emojis unless in content)
3. Write tests for all timer functions and state transitions
4. If a test fails, fix the root cause — not the test
5. Run `npm run typecheck` before committing any change
6. Run `npm run lint` and fix issues

## Safety & Compliance
- No user-generated media (text-only UGC if added later)
- All content must support RACK/SSC principles
- Safeword system (Red/Yellow/Green) always available
- Age verification gate on app entry
- No tracking/analytics without explicit consent
- Content must be 18+ and kink-safe

## File Structure Priority
1. `src/lib/types/` — type definitions first
2. `src/lib/timer/` — session engine
3. `src/lib/audio/` — Web Audio + Web Speech
4. `src/lib/store/` — Zustand stores
5. `src/components/` — UI components
6. `src/pages/` — routed page components
7. `src/data/` — card decks (JSON)

## Testing Strategy
- Unit: timer precision, state machine transitions, card filtering
- Integration: full session flow (negotiation → resolution → aftercare)
- E2E: PWA install, offline mode, two-player sync

## Pull Request Checklist
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All tests pass (unit + integration)
- [ ] PWA build includes manifest + service worker
- [ ] Age gate works in development and production
- [ ] Timer accuracy verified (drift < 100ms)
- [ ] Voice coach works on Chrome/Safari
- [ ] Visual modes cycle correctly