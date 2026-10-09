# gME2

A responsive starter shell for a mature-audience interactive-fiction game. The current screen is a non-explicit story launcher with chapter selection, an 18+ content notice, and a working session-start state.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Development

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm run lint
npm run build
```

The production build is written to `dist/`. To preview it locally, run `npm run preview` after building.

## Project notes

- Built with React, TypeScript, and Vite.
- Chapter descriptions and interface copy are starter content; replace them with the game's final narrative and rating disclosures before release.
- The 18+ notice is informational and is not a verified age gate.
