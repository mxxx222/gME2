# CoupleEdger — Conventions

## Stack
- React 18 + Vite + TypeScript
- Zustand for global state
- Zustand + TypeScript for type safety

## Code Style
- **No comments in code** (content in cards/data only)
- **No emojis** in code (allowed in marketing/docs)
- **Strict TS**: `noImplicitAny`, `strictNullChecks`
- **Component order**: Props interface → Hook usage → Return JSX

## File Naming
```
src/
├── lib/           # Core logic (timer, audio, store, types)
├── components/    # Reusable UI
├── pages/         # Routed views
└── data/          # Static data (card decks)
```

Components: `PascalCase.tsx`  
Hooks: `useThing.ts`  
Utils: `thingUtils.ts`  
Types: `thing.ts`

## CSS
- Tailwind CSS (no external stylesheets)
- OLED dark theme (`#000000` background)
- `prefers-reduced-motion` support
- `--phase-stroke`, `--phase-edge`, `--phase-rest` color variables

## Timer
NEVER use `setInterval`. ALWAYS use:
```ts
const requestRef = useRef<number>();
const animate = (time: number) => {
  requestRef.current = requestAnimationFrame(animate);
};
```

## PWA
- Workbox via `vite-plugin-pwa`
- Offline-first
- Age gate bypasses SPA on `/age-gate.html`
- `window.matchMedia('(display-mode: standalone)')` detection

## Testing
- Vitest for unit tests
- @testing-library/react for integration
- Test files: `*.test.{ts,tsx}`
- Mock `window.speechSynthesis`, `navigator.vibrate`, `navigator.bluetooth`

## Commits
Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`
No automated commits — always review before committing.

## CI Commands (add to package.json scripts)
```json
{
  "typecheck": "tsc --noEmit",
  "lint": "eslint src --ext .ts,.tsx",
  "lint:fix": "eslint src --ext .ts,.tsx --fix",
  "test": "vitest run",
  "test:watch": "vitest watch"
}
