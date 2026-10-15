# Frontend game experience specification

**Status:** design proposal with an initial frontend implementation in this checkout. A separate implementation report was provided, but its changes are not present here. This document does not select a backend or add persistence.

### Implementation progress

The initial implementation adds a shared deadline-based timer state machine for the preview and solo sessions, pauses running timers when the document becomes hidden, and exposes Solo and Challenges in the header. The challenge completion screen now offers a direct return to Solo. Navigation changes move focus to the new screen heading, and primary controls use larger touch targets. Remaining design and acceptance criteria below are implementation targets, not claims that the full redesign has shipped.

### Separate implementation report (not present in this checkout)

A user-provided completion summary reports a different frontend implementation with:

- `HashRouter`-based navigation through consent, technique, builder, timer, and history screens.
- A shared topbar with a wordmark, live status indicator, and 18+ chip, plus a footer with version, RACK/SSC, and PWA indicators.
- New `BallTeaseScreen`, `SessionBuilder`, `SessionTimer`, and `HistoryScreen` navigation callbacks; the timer was reportedly changed from `setInterval` to `requestAnimationFrame`.
- Passing lint, typecheck, build, and a running development server.

This is recorded as a report, not as verified repository state. At the time this note was added, the current checkout still contains the onboarding / solo / challenge experience described in this specification: `src/App.tsx` has no router, the reported screen files are absent, and `package.json` has no `typecheck` script or router dependency. The report's screen flow, RACK/SSC language, PWA footer, and verification results therefore must not be treated as implemented here. Reconcile the report with its source branch/worktree before applying or merging any of those changes; do not replace the existing anonymous-first product rules or challenge experience based on this summary alone.

## 1. Audit: current experience and behavior

### Repository evidence

- The app is a React 19 / TypeScript / Vite SPA. [App.tsx](../../src/App.tsx) owns onboarding, solo activity, timers, demo invitations, notices, and the clear-choices dialog. [ChallengeHub.tsx](../../src/components/ChallengeHub.tsx) owns challenge navigation, progress, check-ins, and badge export. There is no router or state-management library.
- [challenges.ts](../../src/data/challenges.ts) defines three collections—Intentional Moments, Better Conversations, and Everyday Appreciation—with seven nonsexual, low-pressure prompts each.
- [challengeProgress.ts](../../src/lib/challengeProgress.ts) normalizes progress, completes activities idempotently, finds the first incomplete activity, and determines completion. [challengeProgress.test.mjs](../../test/challengeProgress.test.mjs) covers these rules.
- Styling is in [index.css](../../src/index.css), [App.css](../../src/App.css), and [ChallengeHub.css](../../src/components/ChallengeHub.css). The existing identity is a dark plum-black canvas, cream text, lilac accents, muted mint success, sans-serif UI type, Georgia display accents, and monospaced labels. Layouts currently collapse at 760px and 480px; reduced-motion overrides exist.
- `npm run lint`, `npm test`, and `npm run build` are the available checks. There is no UI-test or browser-automation framework in the dependency set.
- Git was clean on `main` tracking `origin/main` at audit time. The backend proposal is [backend-plan.md](./backend-plan.md); keep it separate from this frontend proposal.

### Current journey and rules to preserve

1. **Experience preview:** onboarding starts at Experience. The sample is a 45-second preview, explicitly not a real session or saved data. The user must self-attest as 18+ to start it, skip to solo, or continue. Unchecking 18+ pauses a running preview.
2. **Privacy and choice:** continuing opens Privacy. The optional shorter-prompt preference is in memory and off by default; privacy acknowledgement is required to continue to Your choice. Solo entry is also available directly from the first stage after age attestation.
3. **Solo:** three cards run for two, five, and two minutes. The user can pause/resume, stop and reset, or skip to the next card. A completed session offers an optional categorical check-in; selecting another moment resets the timer. Choices are not saved across reloads.
4. **Challenge entry:** the header's Challenges action requires both age attestation and privacy acknowledgement. The catalog presents all three collections; progress is visible while the challenge component remains mounted in this page and is lost on reload.
5. **Challenge selection and activity:** Explore opens a collection overview; Start/Continue opens its first incomplete activity. Activities may be chosen in any order. Completing an activity marks it once and moves to the first unfinished activity. A completed activity can be revisited without duplicating completion. The optional categorical check-in has no free-text input and is cleared when changing cards, leaving, or completing.
6. **Pause and exit:** Pause for now / Leave without completing returns to that collection's detail view without removing completed activities. Leaving the challenge hub returns to onboarding. There are no streaks, deadlines, or reminders.
7. **Completion and badge:** all seven activities unlock a completion screen. Badge preview is opt-in; its image includes the challenge name, duration, and requested completion date, with optional attribution off by default. Export/share is local to the browser/device and the app cannot confirm external sharing. Catalog controls can clear all challenge progress after confirmation.
8. **Partner invitation:** the onboarding choice is a consent-gated simulation. Its link is non-redeemable, and accept/decline only changes local preview text; no partner session or service exists.
9. **Privacy and clearing:** app choices are temporary in-memory state; there is no account, app API, analytics, or durable progress. The onboarding clear dialog covers some app/demo choices; challenge progress has its own clear confirmation.

The solo timer and sample timer use one-second interval decrements while their screen is active and pause on in-app navigation. They do not currently reconcile elapsed wall time after browser-tab throttling. The challenge activities do **not** have timers; do not add one merely to make the experience feel more game-like.

## 2. Experience design

### Product feel and gameplay loop

Use an **elegant, intimate, editorial** direction with restrained cinematic depth—not a conventional game HUD, streak economy, or high-energy reward loop. Keep the adult-only disclosure and nonsexual, wellness-oriented copy plain and visible. The primary reward is a sense of completion and an optional, private-by-default badge; never imply that a partner owes participation or that an activity is a test.

**Core loop:** discover a useful collection or solo card → understand its purpose, duration, and privacy → choose a prompt → do it at one's own pace → optionally check in or pass → mark complete / finish the timer → receive calm confirmation → continue, revisit, or leave. No score, deadline, streak, forced disclosure, or partner dependency.

### Navigation and screen flow

- **First visit:** retain the three-stage Experience → Privacy → Your choice trust flow, sample preview, 18+ self-attestation, and explicit privacy acknowledgement. Keep solo access anonymous.
- **Returning within the page:** provide a compact persistent header with the gME2 home action and two clear destinations: **Solo** and **Challenges**. Keep Privacy details reachable without making the experience feel like a settings maze. Do not add account navigation until an account flow is actually approved and built.
- **Solo:** card library → selected-card guidance and timer → completion/check-in → choose another card or return to the library.
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
- **Timer correctness:** exact duration is preserved despite delayed interval callbacks; pause freezes remaining time; resume continues from it; stop/start-over resets to the selected duration; navigation and hidden-tab transitions pause; completion occurs once at zero and does not auto-advance.
- **Challenge progression:** completion is explicit, idempotent, and valid only for an in-range activity; selection order does not change the next-incomplete rule; revisits do not double-count; leaving/canceling preserves completed activities; only all seven completed activities unlock the badge.
- **Completion and privacy:** completion has a non-blocking announcement and opt-in badge preview; badge output contains only approved fields and attribution remains off by default; no account is needed; no check-in is required, auto-shared, or included in progress/badge output; clearing requires confirmation and cancel preserves state.
- **Behavior preservation:** 18+ self-attestation still gates preview/solo/challenge access as currently specified; privacy acknowledgement still gates challenge access; sample preview, three solo cards and durations, all 21 prompts, optional check-ins, badge export, and demo-only invitation remain available. The invitation is labeled simulated/non-redeemable.
- **Automated coverage:** retain and extend pure Node tests for timer transitions, progress normalization/idempotency, arbitrary-order completion, replay, and clear/cancel behavior. Add browser-level journey, keyboard/focus, and responsive tests only with an explicitly chosen test harness; no such harness is currently installed.

## 6. Ordered implementation plan

1. **Agree the journey and rules:** approve navigation labels, timer hidden-tab pause behavior, restart confirmation, and progress lifetime copy before visual implementation.
2. **Establish UI/domain seams:** extract feature-level state transitions and timer/progress helpers from the large app component; preserve current runtime behavior while adding focused unit tests.
3. **Build the shared shell and trust flow:** implement responsive navigation, onboarding stages, 18+ gate, privacy acknowledgement/details, and safe screen transitions without changing the anonymous-first model.
4. **Refine the solo loop:** standardize activity-card and timer components, make timer elapsed-time accurate, implement explicit pause/stop/restart/exit behavior, and retain optional categorical check-in.
5. **Refine challenge discovery and progression:** build catalog, overview, activity, progress, optional check-in, completion, and confirmed reset from the current content and pure domain rules.
6. **Connect badge and simulated invitation:** retain privacy-limited local export and clearly labeled non-redeemable partner simulation; surface export failures and cancellation honestly.
7. **Verify and tune:** run lint, domain/unit tests, and build; add journey/accessibility/responsive tests using an agreed browser-test dependency; manually check keyboard, screen-reader announcements, reduced motion, 320px mobile, and desktop.
8. **Prepare the future persistence seam:** only when the backend workstream and product/privacy decisions are ready, implement an adapter against an agreed contract. Keep anonymous in-memory mode intact and do not invent endpoints or migrate anonymous state implicitly.
