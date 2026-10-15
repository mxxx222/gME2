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

## Local API and database

The local TypeScript API currently exposes only liveness and database-readiness endpoints. It has no account, authentication, or progress routes.

1. Copy `.env.example` to `.env` and replace the placeholder password with a local random value. The file is ignored by Git.
2. Start the isolated PostgreSQL 17 development container; its initialization also creates a separate disposable `gme2_test` database:

   ```sh
   docker compose -p gme2-local-backend up -d postgres
   ```

3. Apply the versioned migrations explicitly, then build and start the API:

   ```sh
   npm run db:migrate
   npm run build:server
   npm run start:server
   ```

4. In a separate terminal, run `npm run dev`. Vite proxies `/api` to the local API on port 3001.

The database is exposed only on loopback port 54329. If Docker is unavailable, point `DATABASE_URL` and `TEST_DATABASE_URL` in `.env` at separate local PostgreSQL databases named `gme2_dev` and `gme2_test`; the test role must have `CREATEDB` permission. `npm run test:db` creates and drops a uniquely named temporary database inside `gme2_test`. `docker compose -p gme2-local-backend down` stops the container and retains its named development volume.

Migrations are never run at API startup. The initial migration creates only the empty `app` schema; its explicit down migration drops that schema and naturally fails if it contains objects. Do not edit an applied migration or run rollback against data you need to keep.

## Quality checks

```sh
npm run lint
npm test
npm run test:server
npm run typecheck:server
npm run test:db
npm run build
```

The production build is written to `dist/`. To preview it locally, run `npm run preview` after building.

## Prototype boundaries

- The repository-backed architecture assessment and implementation sequence are in [docs/architecture/backend-plan.md](docs/architecture/backend-plan.md). The local API/database foundation is implemented, but there is no account system, progress persistence, or production deployment.
- The frontend game experience proposal and implementation status are in [docs/architecture/frontend-game-experience.md](docs/architecture/frontend-game-experience.md). The redesign is in progress.
- The 18+ check is a self-attestation, not identity or age verification.
- The three 7-activity challenges (Intentional Moments, Better Conversations, and Everyday Appreciation) are frontend-only. Progress and optional categorical check-ins remain in page memory and reset when the page reloads or closes. There are no streaks, deadlines, or automatic reminders.
- Solo sessions use the selected activity's existing fixed duration (2 or 5 minutes). Review the activity and timing before starting; adjustable duration bounds have not been defined. An in-progress session can be paused and returned to explicitly, and configuration changes do not alter its captured activity, prompt, or duration.
- The browser journey suite runs with `npm run test:browser`; install its Chromium browser once with `npx playwright install chromium`.
- Challenge activities are designed to work solo or as optional conversation prompts. Partner synchronization, invitations, secure referral attribution, and challenge landing pages are not connected.
- Completed challenges unlock a private badge. Its optional share preview contains only the challenge name, seven-day duration, and completion date; the date is shown only after the user requests a preview. Optional product attribution is off by default. PNG export uses the browser canvas; supported browsers may offer the native share sheet. The app cannot confirm a share completed in another app.
- Challenge activity progress is covered by the built-in Node.js test runner (`npm test`); it needs no extra test dependency.
- The app has no connected account, progress persistence, analytics, AI, microphone, notification, or partner-invitation service. The onboarding partner link remains a non-redeemable demo. The local backend foundation has health endpoints only.
- A deployed site host may receive standard connection data. Production privacy copy must be verified against the actual hosting, storage, analytics, AI, and partner-session architecture before release.
- This prototype is not a substitute for legal review or production privacy and security controls.
