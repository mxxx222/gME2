# Research Prompt 4: App Store Policy & PWA Strategy

> **Task**: Research app store policies for adult content and PWA alternatives.
> **Deliverable**: `docs/research/app-store-policy.md`

## Objective
Understand exactly what **Apple App Store** and **Google Play** allow for adult couple apps, and document viable **distribution strategies** (especially PWA).

## Instructions

1. Use webfetch on these URLs:
   - https://developer.apple.com/app-store/review/guidelines/ (Section 1.1.4)
   - https://support.google.com/googleplay/android-developer/answer/9878810 (Inappropriate Content)
   - https://support.google.com/googleplay/android-developer/answer/14594990 (April 2024 policy update)
   - https://support.google.com/googleplay/android-developer/answer/12923226 (UGC sexual content)
   - https://www.apple.com/legal/app-store/transparency/2025/ (removal statistics)
   - https://www.reuters.com/technology/apple-raises-concern-over-first-porn-app-iphone-under-eu-rules-2025-02-04/
   - https://kinker.ovh/ (Google Play ban + PWA pivot)
   - https://www.intimatecouplegame.com/faq (Google Play removal, web pivot)

2. Document **exact policy language** for:
   - Apple: Guideline 1.1.4 (Overtly sexual or pornographic material)
   - Apple: Age rating categories (17+, 18+, Unrated)
   - Google: Sexual content prohibition
   - Google: "Incidental sexual content" requirements (4 rules)

3. Find and analyze **5 recent removal cases** (2023-2025):
   - Kinker (Google Play) — what was the stated reason?
   - Naughty Game for Couples (Google Play) — what happened to purchases?
   - Any other adult couple app removed (Spicer? Desire? Foreplay on Android?)
   - Apple removals under Guideline 1.1.4 — find specific app names + reasons
   - EU DMA / AltStore impact on iOS

4. Document **survival strategies**:
   - PWA: How edgeritual.app, Kinker.ovh, YourGonna.com work around stores
   - Sideloading: Spicer's Android strategy (download from website)
   - Facade versioning: How to frame explicit content as "lifestyle wellness"
   - Content hiding: 2-click filters, age-gating, opt-in toggles
   - iOS Safari limitations: No Web Bluetooth, haptics via user gesture, Web Speech availability

5. Test **PWA technical limits**:
   - What works offline on iOS Safari vs Android Chrome?
   - Background tab behavior (timer persistence)
   - "Add to Home Screen" reliability and UX
   - Push notifications for PWA (iOS support status)
   - Web Bluetooth on iOS (confirmed non-functional)

6. Document **compliance requirements**:
   - Age verification (DOB + checkbox minimum)
   - Privacy policy (must exist, must be accessible)
   - No illegal content (obviously)
   - Reporting mechanisms (for UGC apps)
   - Data minimization (important for consent)

## Output Format
A structured report with:
1. **Policy summary table**: Apple App Store vs Google Play, exact language quoted
2. **Removal case studies**: 5 cases with product background, removal reason, aftermath
3. **PWA strategy matrix**: What works, what doesn't, on each platform
4. **Compliance checklist**: 15 items for the CoupleEdger PWA
5. **Go-to-market recommendation**: PWA-first with facade store option later
6. **Risk assessment**: Probability of store rejection if you try native later