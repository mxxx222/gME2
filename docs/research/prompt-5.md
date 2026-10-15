# Research Prompt 5: Browser API Support Matrix

> **Task**: Test and document browser API support for the PWA tech stack.  
> **Deliverable**: `docs/research/browser-api-matrix.md`

## Objective
Create a definitive test matrix of **browser API support** across desktop and mobile for the CoupleEdger PWA stack. Identify critical gaps (especially iOS) that affect MVP feature prioritization.

## Instructions

1. **Test environments**:
   - Chrome latest (macOS)
   - Firefox latest (macOS)
   - Safari 18 (macOS)
   - Safari iOS 18 (iPhone 15/16)
   - Chrome latest (Android)
   - Chrome on Windows 11
   - Edge latest (Windows)
   - Samsung Internet (Android)

2. **For each environment, verify**:

   ### Web Audio API
   - AudioContext creation and resume after user gesture
   - Oscillator types (sine, square, sawtooth, triangle)
   - Gain scheduling precision (latency < 10ms for tick sounds)
   - `audioContext.currentTime` precision

   ### Web Speech API
   - `speechSynthesis.getVoices()` count per language
   - Voice quality (iOS native voice vs browser synth)
   - `SpeechSynthesisUtterance` properties (rate, pitch, volume, lang)
   - Multi-utterance queuing (voice coach patterns)

   ### Vibration API
   - `navigator.vibrate(pattern)` works
   - Pattern format `[duration, pause, duration]` correctness
   - Maximum pattern length
   - Behavior in PWA vs inline browser

   ### Web Bluetooth API
   - `navigator.bluetooth` exists
   - `requestDevice()` available
   - GATT connection to a Lovense toy (or test device)
   - Write to characteristic

   ### Screen Wake Lock API
   - `navigator.wakeLock.request("screen")` available
   - Prevents screen dimming during session
   - Background tab behavior

   ### Web Share API
   - `navigator.share()` available
   - Share session codes, card texts
   - File sharing (session exports)

   ### Page Visibility API
   - `document.visibilityState` changes
   - Background tab `requestAnimationFrame` behavior
   - AudioContext suspension when backgrounded

   ### IndexedDB
   - Storage quota available
   - Transaction performance
   - `navigator.storage.estimate()` support

   ### Install Prompt / PWA
   - `beforeinstallprompt` event fires
   - "Add to Home Screen" works
   - Offline functionality (service worker)
   - Display mode detection (`standalone` vs `browser`)
   - Splash screen + theme color

3. **Specific iOS Safari tests** (most critical):
   - Web Bluetooth: confirmed non-functional
   - Web Speech: does `getVoices()` return voices? Are they TTS-only?
   - Vibration: requires user gesture? Does it work in PWA?
   - AudioContext: must be resumed on `touchend` / `click`
   - IndexedDB: any quota limitations?

4. **Document workarounds**:
   - Web Bluetooth fallback: "Connect manually via native app"
   - Vibration fallback: visual-only cues
   - Voice fallback: visual text cues on screen
   - Background tab: use Web Worker + BroadcastChannel for session sync

## Output Format
A comprehensive matrix + narrative:
1. **API Support Matrix** (table: API × Browser/Device → Supported/Partial/Unsupported)
2. **Critical Gaps**: What doesn't work (especially iOS Safari)
3. **Workaround Strategies**: For each gap, how to handle it
4. **MVP Feature Prioritization**: Based on API support, rank features:
   - Tier 1 (works everywhere): Timer, visual modes, breath pacer
   - Tier 2 (works on some): Voice coach, haptics, wake lock
   - Tier 3 (progressive enhancement): Web Bluetooth toys, push notifications
   - Tier 4 (iOS fallback only): Manual modes, visual-only cues
5. **Testing harness**: Minimal Vite test project to verify APIs in new environments