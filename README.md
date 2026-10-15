# gME2

A responsive, solo-first onboarding prototype for an adult intimacy and relationship wellbeing experience. It demonstrates an interactive sample card and timer, a plain-language privacy explainer, and an optional partner-invitation preview.

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

## Prototype boundaries

- The 18+ check is a self-attestation, not identity or age verification.
- This frontend has no connected account, app backend, analytics, AI, microphone, notification, or partner-invitation service. Choices exist in page memory and reset when the page reloads or closes.
- The partner link is explicitly a non-redeemable demo. QR generation, secure token expiry and revocation, recipient acceptance, and shared sessions need a backend before they can be represented as real functionality.
- A deployed site host may receive standard connection data. Production privacy copy must be verified against the actual hosting, storage, analytics, AI, and partner-session architecture before release.
- This prototype is not a substitute for legal review or production privacy and security controls.
