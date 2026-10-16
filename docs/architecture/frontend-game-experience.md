# Frontend game experience specification

**Status:** initial implementation with connected solo-session configuration. Solo sessions and challenge progress remain anonymous and in memory. This document does not select a backend or add persistence.

### Implementation progress

Solo setup now selects an existing activity, reviews its fixed duration and prompt, then starts from an immutable session configuration. Users may pause and return to setup; returning to the session is explicit, and changing the next activity does not alter the paused session. Hidden-tab transitions pause without automatically resuming. Challenge completion offers a direct return to Solo. Navigation changes move focus to the new screen heading, and primary controls use larger touch targets. Adjustable duration ranges remain undefined and are not offered.

The Playwright browser journey covers setup through completion, keyboard selection and focus, hidden-tab pause, reload behavior, and narrow/desktop viewport overflow checks. These checks do not establish timer drift below a measured threshold or replace assistive-technology testing.

## 1. Audit: current experience and behavior

### Repository evidence

- The app is a React 19 / TypeScript / Vite SPA. [App.tsx](../../src/App.tsx) owns onboarding, solo activity, timers, demo invitations, notices, and the clear-choices dialog. [ChallengeHub.tsx](../../src/components/ChallengeHub.tsx) owns challenge navigation, progress, check-ins, and badge export. There is no router or state-management library.
- [challenges.ts](../../src/data/challenges.ts) defines three collections—Intentional Moments, Better Conversations, and Everyday Appreciation—with seven nonsexual, low-pressure prompts each.
- [challengeProgress.ts](../../src/lib/challengeProgress.ts) normalizes progress, completes activities idempotently, finds the first incomplete activity, and determines completion. [challengeProgress.test.mjs](../../test/challengeProgress.test.mjs) covers these rules.
- Styling is in [index.css](../../src/index.css), [App.css](../../src/App.css), and [ChallengeHub.css](../../src/components/ChallengeHub.css). The existing identity is a dark plum-black canvas, cream text, lilac accents, muted mint success, sans-serif UI type, Georgia display accents, and monospaced labels. Layouts currently collapse at 760px and 480px; reduced-motion overrides exist.
- `npm run lint`, `npm test`, `npm run test:browser`, and `npm run build` cover static checks, pure logic, the browser journey, and production compilation.
- Git was clean on `main` tracking `origin/main` at audit time. The backend proposal is [backend-plan.md](./backend-plan.md); keep it separate from this frontend proposal.

### Current journey and rules to preserve

1. **Experience preview:** onboarding starts at Experience. The sample is a 45-second preview, explicitly not a real session or saved data. The user must self-attest as 18+ to start it, skip to solo, or continue. Unchecking 18+ pauses a running preview.
2. **Privacy and choice:** continuing opens Privacy. The optional shorter-prompt preference is in memory and off by default; privacy acknowledgement is required to continue to Your choice. Solo entry is also available directly from the first stage after age attestation.
3. **Solo:** choose one of three cards (two, five, and two minutes), review its prompt and fixed duration, then explicitly start. The active session snapshots its activity, prompt, and duration. Pause/resume is explicit; stop returns to setup; returning to setup pauses and retains the session until the user resumes or discards it. Completion offers an optional categorical check-in and restart. Choices are not saved across reloads.
4. **Challenge entry:** the header's Challenges action requires both age attestation and privacy acknowledgement. The catalog presents all three collections; progress is visible while the challenge component remains mounted in this page and is lost on reload.
5. **Challenge selection and activity:** Explore opens a collection overview; Start/Continue opens its first incomplete activity. Activities may be chosen in any order. Completing an activity marks it once and moves to the first unfinished activity. A completed activity can be revisited without duplicating completion. The optional categorical check-in has no free-text input and is cleared when changing cards, leaving, or completing.
6. **Pause and exit:** Pause for now / Leave without completing returns to that collection's detail view without removing completed activities. Leaving the challenge hub returns to onboarding. There are no streaks, deadlines, or reminders.
7. **Completion and badge:** all seven activities unlock a completion screen. Badge preview is opt-in; its image includes the challenge name, duration, and requested completion date, with optional attribution off by default. Export/share is local to the browser/device and the app cannot confirm external sharing. Catalog controls can clear all challenge progress after confirmation.
8. **Partner invitation:** the onboarding choice is a consent-gated simulation. Its link is non-redeemable, and accept/decline only changes local preview text; no partner session or service exists.
9. **Privacy and clearing:** app choices are temporary in-memory state; there is no account, app API, analytics, or durable progress. The onboarding clear dialog covers some app/demo choices; challenge progress has its own clear confirmation.

The sample and solo timers use the shared deadline-based reducer, with `performance.now()` for elapsed-time calculations. The UI refresh cadence does not determine elapsed time. Both pause on hidden-tab changes and in-app navigation; resuming always requires an explicit action. The challenge activities do **not** have timers; do not add one merely to make the experience feel more game-like.

## 2. Experience design

### Product feel and gameplay loop

Use an **elegant, intimate, editorial** direction with restrained cinematic depth—not a conventional game HUD, streak economy, or high-energy reward loop. Keep the adult-only disclosure and nonsexual, wellness-oriented copy plain and visible. The primary reward is a sense of completion and an optional, private-by-default badge; never imply that a partner owes participation or that an activity is a test.

**Core loop:** discover a useful collection or solo card → understand its purpose, duration, and privacy → choose a prompt → do it at one's own pace → optionally check in or pass → mark complete / finish the timer → receive calm confirmation → continue, revisit, or leave. No score, deadline, streak, forced disclosure, or partner dependency.

### Navigation and screen flow

- **First visit:** retain the three-stage Experience → Privacy → Your choice trust flow, sample preview, 18+ self-attestation, and explicit privacy acknowledgement. Keep solo access anonymous.
- **Returning within the page:** provide a compact persistent header with the gME2 home action and two clear destinations: **Solo** and **Challenges**. Keep Privacy details reachable without making the experience feel like a settings maze. Do not add account navigation until an account flow is actually approved and built.
- **Solo:** activity setup → review of the selected prompt and fixed length → active session → completion/check-in → restart or return to setup. A paused session remains separate from later setup edits.
- **Challenges:** collection catalog → collection overview → activity → completion feedback / next incomplete activity → optional badge preview → catalog or exit.
- Use buttons for state transitions, not fake links. Preserve a clear return path on every detail, activity, badge, and dialog state. The header/home action should confirm before discarding an active timer or pause it consistently.

### Challenge discovery, selection, execution, and progression

- Show all three existing collections with theme, concise purpose, seven-activity count, estimated time, and progress when available. Do not rank by popularity or imply urgency.
- The overview explains the seven prompts, flexible ordering, approximate time, private optional check-in, no-account status, and how completion works. Primary action is Start / Continue; secondary action is Back to collections.
- Present one activity at a time with its title, prompt, optional check-in, progress, and clear Pass / Leave controls. Retain the current any-order activity picker, but clearly label completed and current items and avoid implying calendar days.
- Mark an activity complete only after the explicit Complete activity action. Skip/leave never completes it. Continue chooses the first incomplete item; revisiting a completed item leaves completion unchanged.
- At seven completed items, show a warm, concise completion moment and badge preview action. Offer “Explore another” and “Return to Solo” as equal, non-coercive exits.
- Replaying an already completed collection opens the completion state and badge again. A deliberate **Restart challenge** may be offered only behind a clear confirmation that says it clears that collection's progress; do not silently reset or add repeat-completion rewards.
- Clear-all remains a separate, confirmed action. Canceling a clear or leaving a screen preserves progress. Check-ins remain optional and are not required for completion or included in badges.

### Timer states and exit behavior

Keep timing scoped to sample and solo sessions, with explicit **idle → running → paused → complete** states. Running exposes Pause; paused exposes Resume and Start over; a running or paused session can Stop with a clear reset-to-idle outcome; complete offers a new session. Skip selects the next solo card and resets its timer.

For the redesigned timer, base displayed remaining time on a deadline/elapsed-time calculation rather than the number of interval callbacks, so throttled tabs do not silently extend a session. Pause when leaving the solo surface or when the document becomes hidden; resuming is always an explicit user action. Completion should announce once and never auto-navigate. A canceled session does not count as challenge progress. The 45-second onboarding sample remains clearly identified as a preview.

## 3. Visual system and responsive direction

- **Typography:** system sans-serif for controls and readable body copy; a restrained serif accent for selected display headings/prompts; monospaced type only for short labels, timer digits, and metadata. Keep body copy comfortably readable and avoid all-caps paragraphs.
- **Color and surfaces:** extend the existing tokens (`#111013` background, cream text, lilac action/accent, muted mint success, subtle white borders). Use layered plum surfaces sparingly to establish hierarchy. Reserve mint for success, not interactive affordances. Check every text/surface pairing for WCAG contrast.
- **Cards:** one consistent rounded-corner, thin-border surface treatment. Distinguish collection cards with small theme accents, not three unrelated palettes. Give activity prompts generous line length and spacing. Badge variants remain optional export styling, not a separate UI identity.
- **Buttons and iconography:** one high-emphasis lilac primary action, quiet text action for safe exits, and outline/destructive treatment for reset. Use existing simple decorative marks only as decoration (`aria-hidden`); pair icons with visible text labels.
- **Spacing:** use a consistent 4px base scale (4/8/12/16/24/32/48) and align headings, controls, and card edges across screens.
- **Motion:** brief, non-essential transitions only; never make progress or timer state understandable only through animation. Honor `prefers-reduced-motion` everywhere.
- **Responsive behavior:** single-column flow on narrow screens; stack paired panels before they become cramped. Support 320 CSS-pixel width without horizontal scrolling, retain readable prompt widths on desktop, and keep primary actions reachable without obscuring content.

## 4. Component and state boundaries

### Proposed component composition

- `AppShell` / `PrimaryNavigation`: shared layout, route/screen destination, and visible privacy/18+ context.
- `OnboardingFlow`, `AgeAttestation`, `PrivacyAcknowledgement`, `ConsentNotice`: trust and consent presentation, with consent state passed in explicitly.
- `SoloLibrary`, `ActivityCard`, `SessionTimer`, `SessionCompletion`: solo card presentation and timer controls.
- `ChallengeCatalog`, `ChallengeCard`, `ChallengeOverview`, `ChallengeActivity`, `ProgressIndicator`, `ChallengeCompletion`, `BadgePreview`: challenge and achievement presentation.
- `ConfirmationDialog`, `StatusNotice`, `EmptyState`, `ErrorState`: reusable focus-safe feedback, confirmation, and non-silent failure treatment.

Keep reusable components presentational where practical. Put transitions and validation in small feature-level hooks/reducers or the existing pure domain helpers; avoid a global state library for this app's current scope.

### State and future API seam

1. **Temporary UI state:** open screen/dialog, focus return target, currently selected card, animation state, and transient notice.
2. **In-memory gameplay state:** timer status/remaining time, selected collection/activity, completed activity IDs, and temporary categorical check-ins. Keep anonymous usage fully functional; explicitly disclose when reload clears in-memory progress.
3. **Challenge domain:** challenge definitions remain content data; progress rules remain pure functions independent of React and any server.
4. **Future authenticated progress:** expose a small typed progress repository/adapter (load, mark complete, clear, and loading/error states) behind the challenge feature. The initial adapter is in-memory. A future API adapter can replace it without changing cards/screens. No endpoints or authentication design are specified here.
5. **Future partner sharing:** keep invitations behind an independent capability boundary. The current UI remains explicitly simulated until a separate backend/consent design exists; never present a demo link as redeemable or treat one person's consent as another's.

Do not persist private check-ins, reflection text, timer telemetry, or partner-visible activity by default. Any later persistence or sharing requires its own explicit product, privacy, and consent decision. Do not automatically import anonymous progress into an account.

## 5. Acceptance criteria

- **Mobile:** at 320 CSS px and above, no horizontal page scrolling or clipped controls; collection cards and paired content stack cleanly; controls have at least 44×44 CSS-pixel hit areas; primary and exit actions remain visible and understandable.
- **Desktop:** at 1024 CSS px and above, content uses a readable centered max-width, collection cards form a balanced grid, and activity prompt plus optional context remain visually distinct.
- **Keyboard and assistive technology:** every action is keyboard-operable; focus is visible and not obscured; screen changes move focus to the new heading; dialogs trap focus, close with Escape, and restore focus; progress has an accessible name and current/max values; icon-only controls have accessible names; state and errors are announced without announcing every timer tick.
- **Contrast and motion:** normal text meets WCAG 2.2 AA 4.5:1 contrast (large text at least 3:1); focus indicator is visibly distinct; reduced-motion mode removes nonessential transitions/animation without hiding state.
- **Timer correctness:** displayed remaining time is derived from a monotonic deadline, not callback count; pause freezes remaining time; resume continues from it; stop/restart resets to the selected duration; hidden-tab transitions pause; completion occurs once at zero and does not auto-advance.
- **Challenge progression:** completion is explicit, idempotent, and valid only for an in-range activity; selection order does not change the next-incomplete rule; revisits do not double-count; leaving/canceling preserves completed activities; only all seven completed activities unlock the badge.
- **Completion and privacy:** completion has a non-blocking announcement and opt-in badge preview; badge output contains only approved fields and attribution remains off by default; no account is needed; no check-in is required, auto-shared, or included in progress/badge output; clearing requires confirmation and cancel preserves state.
- **Behavior preservation:** 18+ self-attestation still gates preview/solo/challenge access as currently specified; privacy acknowledgement still gates challenge access; sample preview, three solo cards and durations, all 21 prompts, optional check-ins, badge export, and demo-only invitation remain available. The invitation is labeled simulated/non-redeemable.
- **Automated coverage:** pure Node tests cover timer transitions, progress normalization/idempotency, arbitrary-order completion, catalog ID stability, and fixed session configuration validation. Playwright covers the connected browser journey, keyboard selection/focus, hidden-tab pause, reload behavior, and 320/390/1280px overflow checks. Device and screen-reader verification remains manual.

## 6. Follow-up implementation plan

1. **Verify accessibility and usability:** manually exercise screen-reader announcements, reduced motion, focus visibility, and touch targets across real devices; automated browser coverage does not replace these checks.
2. **Refine component boundaries:** extract setup/review/session presentation and navigation feedback from `App.tsx` only where it reduces complexity without duplicating session state or timer ownership.
3. **Tune the visual system:** validate contrast against WCAG 2.2 AA and refine responsive spacing while retaining the current plum, cream, lilac, and mint identity and “At your pace.”
4. **Decide adjustable timing:** if user-configurable durations are desired, define and approve valid bounds before exposing controls; preserve the current fixed, catalog-provided durations until then.
5. **Prepare future persistence only after approval:** use a typed adapter against an agreed backend contract. Keep anonymous in-memory mode intact; do not invent endpoints or migrate anonymous state implicitly.
