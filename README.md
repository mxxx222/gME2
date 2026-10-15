# gME2

A responsive, solo-first prototype for an adult intimacy and relationship wellbeing experience. It includes a trust-first onboarding flow, solo cards and timer, and a private, optional challenge experience with badge preview and local image export.

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
npm test
npm run build
```

The production build is written to `dist/`. To preview it locally, run `npm run preview` after building.

## Prototype boundaries

- The 18+ check is a self-attestation, not identity or age verification.
- The three 7-activity challenges (Intentional Moments, Better Conversations, and Everyday Appreciation) are frontend-only. Progress and optional categorical check-ins remain in page memory and reset when the page reloads or closes. There are no streaks, deadlines, or automatic reminders.
- Challenge activities are designed to work solo or as optional conversation prompts. Partner synchronization, invitations, secure referral attribution, and challenge landing pages are not connected.
- Completed challenges unlock a private badge. Its optional share preview contains only the challenge name, seven-day duration, and completion date; the date is shown only after the user requests a preview. Optional product attribution is off by default. PNG export uses the browser canvas; supported browsers may offer the native share sheet. The app cannot confirm a share completed in another app.
- Challenge activity progress is covered by the built-in Node.js test runner (`npm test`); it needs no extra test dependency.
- This frontend has no connected account, app backend, analytics, AI, microphone, notification, or partner-invitation service. The onboarding partner link remains a non-redeemable demo.
- A deployed site host may receive standard connection data. Production privacy copy must be verified against the actual hosting, storage, analytics, AI, and partner-session architecture before release.
- This prototype is not a substitute for legal review or production privacy and security controls.
