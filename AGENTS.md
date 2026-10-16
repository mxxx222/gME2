# Repository instructions

## Product and privacy boundaries

- Treat this as an anonymous, solo-first relationship and intimacy wellbeing prototype. Preserve “At your pace,” the consent-first onboarding, self-attested 18+ gate, privacy acknowledgement, solo activity flow, and optional challenges.
- Keep solo session configuration, timer state, challenge progress, and categorical check-ins in memory. Do not add browser persistence, account-backed progress, analytics, partner synchronization, or activity-data network requests without separate approval.
- Do not add explicit activity content or imply that the demo invitation, partner sharing, or backend provides functionality that is not implemented.
- Challenge activities are optional and do not use the solo timer. Preserve stable challenge/activity identifiers and existing completion rules.

## Technical conventions

- Use the existing React, TypeScript, Vite, and CSS setup. Do not add a state-management or UI framework without demonstrated need.
- Keep the shared deadline-based timer authoritative; calculate elapsed time from its monotonic deadline, pause on hidden-tab transitions, and require explicit resume.
- Keep presentation, temporary UI state, pure domain helpers, and generic backend health/migration code separate. Do not invent product API endpoints.
- Follow existing file naming, formatting, accessibility, responsive layout, keyboard, and reduced-motion patterns. Prefer pure helpers for domain rules and focused tests for behavior.

## Verification

Run the narrowest relevant checks, then the project suite for meaningful changes:

```sh
npm run lint
npm test
npm run test:server
npm run typecheck:server
npm run test:browser
npm run build
```

For database migration changes, use `npm run test:db` only with a dedicated local test database. The integration test targets loopback `TEST_DATABASE_URL` at the `gme2_test` database and creates/drops its own uniquely named temporary database. Do not use shared or production databases.
