# CoupleEdger — Technical Implementation Notes

> Key implementation details for the React/Vite PWA edging engine.

## Timer Precision (Critical)

```typescript
// DON'T use setInterval — drifts over long sessions
// DO use requestAnimationFrame + performance.now()

export function usePreciseTimer(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const endTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (!previousTimeRef.current) previousTimeRef.current = time;
    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;

    if (endTimeRef.current) {
      const remaining = Math.max(0, endTimeRef.current - (time / 1000));
      setTimeLeft(remaining);
      if (remaining > 0) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Phase complete
        onPhaseComplete();
      }
    }
  };

  // For 30-minute sessions: drift < 100ms
  // requestAnimationFrame fires ~60fps, time is monotonic
}
```

## Three-Phase Timer Engine

```typescript
export class SessionEngine {
  private phase: SessionPhase = "warmup";
  private startTime: number;
  private phaseDuration: number; // seconds
  private elapsed: number = 0;

  getPhaseProgress(): number {
    return Math.min(1, this.elapsed / this.phaseDuration);
  }

  getPhaseColor(): string {
    const progress = this.getPhaseProgress();
    if (this.phase === "stroke") {
      return `hsl(${200 + progress * 60}, 80%, 50%)`;  // blue → yellow
    }
    if (this.phase === "edge") {
      return `hsl(${0 + progress * 60}, 80%, ${60 - progress * 20}%)`;  // yellow → red
    }
    if (this.phase === "rest") {
      return `hsl(${200}, 80%, ${50 + progress * 20}%)`;  // blue lightening
    }
    return "#4A90D9";
  }

  // Phase transitions with easing for smooth visual feedback
  transitionPhase() {
    // Emit event for UI update
    // Schedule haptic pulse
    // Schedule voice cue
  }
}
```

## Web Audio — Tick Sounds

```typescript
// Synthesize 6 tick sounds with Web Audio API
// No MP3 files needed — zero download, instant playback

const createTickSound = (type: "click" | "tick" | "wood" | "beep" | "heartbeat" | "whoosh") => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  switch (type) {
    case "click":
      osc.type = "square";
      osc.frequency.value = 100;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.01);
      break;
    case "heartbeat":
      // Two quick pulses
      break;
    case "whoosh":
      osc.type = "sawtooth";
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      break;
  }

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
};
```

## Web Speech API — Voice Coach

```typescript
export class VoiceCoach {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    // Voices load asynchronously on some browsers
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
    this.voices = this.synth.getVoices();
  }

  whisper(text: string, lang: string = "en-US", rate: number = 0.9) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = this.voices.find(v => v.lang === lang) || this.voices[0];
    utter.rate = rate;
    utter.volume = 0.6; // whisper-quiet
    this.synth.speak(utter);
  }

  // Phase-specific cues
  getPhaseCues(phase: SessionPhase, progress: number): string[] {
    if (phase === "edge" && progress > 0.8) return ["You're close... hold... hold..."];
    if (phase === "edge" && progress > 0.5) return ["Getting warmer... don't rush..."];
    if (phase === "rest") return ["Back off... breathe... let it fade..."];
    if (phase === "stroke") return ["Build it up... deeper..."];
    return [];
  }
}
```

## Vibration API — Haptic Patterns

```typescript
// Pattern: [duration, pause, duration, pause, ...]
export const HAPTIC_PATTERNS = {
  phase_change: [50, 50, 50],
  tick_beat: [30, 70],
  edge_warning: [200, 50, 200],
  phase_complete: [500],
  denial_achieved: [100, 50, 100, 50, 100],
};

export const triggerHaptic = (pattern: number[]) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
};
```

## Visual Modes (Canvas/SVG)

### Pulse Ring (Default)
```tsx
// Animated ring that pulses at BPM
// Outer ring = full cycle, inner ring = phase progress
const PulseRing = ({ bpm, phaseProgress, phase }: PulseRingProps) => {
  const beat = use BeatAnimation(bpm); // 0..1 oscillating
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      {/* Background ring */}
      <circle cx="150" cy="150" r={radius} fill="transparent" stroke="#333" strokeWidth="4" />
      {/* Phase progress */}
      <circle
        cx="150" cy="150"
        r={radius - 10}
        fill="transparent"
        stroke={getPhaseColor(phase)}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - phaseProgress)}
        transform="rotate(-90 150 150)"
      />
      {/* BPM pulse */}
      <circle
        cx="150" cy="150"
        r={radius + 15 + beat * 10}
        fill="transparent"
        stroke={getPhaseColor(phase)}
        strokeWidth="2"
        opacity={0.5 + beat * 0.5}
      />
    </svg>
  );
};
```

### Breathing Orb (Trance / Aftercare)
```tsx
// 4-7 breathing cycle: 4s in, 7s out
const BreathingOrb = ({ phase }: { phase: SessionPhase }) => {
  const breathCycle = 11; // 4 inhale + 7 exhale
  const elapsed = useSessionElapsed();
  const cycleProgress = (elapsed % breathCycle) / breathCycle;
  const size = phase === "rest" || phase === "aftercare"
    ? 120 + Math.sin(cycleProgress * 2 * Math.PI) * 20
    : 120;

  return (
    <div
      className="breathing-orb"
      style={{
        width: size,
        height: size,
        backgroundColor: getPhaseColor(phase),
        animation: `pulse ${breathCycle}s ease-in-out infinite`,
      }}
    />
  );
};
```

### Radial Flash
```tsx
// Full-screen radial gradient flash at BPM tick
const RadialFlash = ({ isActive, phase }: { isActive: boolean; phase: SessionPhase }) => {
  if (!isActive) return null;
  return (
    <div
      className="radial-flash"
      style={{
        background: `radial-gradient(
          circle at center,
          ${getPhaseColor(phase)} 0%,
          transparent 70%
        )`,
      }}
    />
  );
};
```

## PWA Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: { cacheName: "images" },
          },
        ],
      },
      manifest: {
        name: "CoupleEdger — Edging Game for Couples",
        short_name: "CoupleEdger",
        description: "An 18+ intimacy app for couples exploring edging together.",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        constraints: {
          landscape: {
            fullscreen: "yes"},
        },
      },
    }),
  ],
});
```

## Age Gate Landing

```html
<!-- public/age-gate.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Age Verification</title>
  <meta http-equiv="Cache-Control" content="no-store">
  <style>
    body { margin: 0; background: #000; color: #fff; font-family: monospace; }
    .container { max-width: 400px; margin: 50vh auto; text-align: center; transform: translateY(-50%); }
    input { width: 80px; padding: 8px; text-align: center; }
    button { margin-top: 20px; padding: 12px 24px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>AGE VERIFICATION</h1>
    <p>This application contains sexually explicit content for adults 18+ only.</p>
    <p>Enter your birth year:</p>
    <input type="number" id="year" min="1900" max="2026" />
    <br/>
    <label><input type="checkbox" id="consent" /> I am 18+ and consent to view adult content</label>
    <br/>
    <button id="enter">Enter</button>
  </div>
  <script>
    document.getElementById("enter").onclick = function() {
      const year = parseInt(document.getElementById("year").value);
      const consent = document.getElementById("consent").checked;
      if (year && new Date().getFullYear() - year >= 18 && consent) {
        localStorage.setItem("ageVerified", "true");
        window.location.href = "/?from=gated";
      }
      // If verification fails, reload to reset
      if (!consent) alert("You must consent to proceed.");
      if (!year || new Date().getFullYear() - year < 18) alert("You must be 18+.");
    };
  </script>
</body>
</html>
```

Then in `src/main.tsx`, redirect to age-gate if not verified:

```typescript
if (!localStorage.getItem("ageVerified")) {
  window.location.href = "/age-gate.html";
}
```

## Web Bluetooth — Toy Integration (Progressive Enhancement)

```typescript
// Only works on Chrome/Android/Desktop (NOT iOS Safari)
// Use as progressive enhancement

interface LovenseToy {
  name: string;
  address: string;
  characteristics: Map<string, BluetoothRemoteGATTCharacteristic>;
}

class ToyController {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private service: BluetoothRemoteGATTService | null = null;

  async connect() {
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["0000fff0-0000-1000-8000-00805f9b34fb"] }]
      });

      this.server = await this.device.gatt!.connect();
      this.service = await this.server.getPrimaryService("0000fff0-0000-1000-8000-00805f9b34fb");

      const writeChar = await this.service.getCharacteristic("0000fff1-0000-1000-8000-00805f9b34fb");
      // Map BPM to vibration pattern
      this.syncToBPM(70);
    } catch (error) {
      console.warn("Bluetooth unavailable or denied — falling back to manual mode");
    }
  }

  syncToBPM(bpm: number) {
    if (!this.service) return;
    // Convert BPM to vibration pattern
    // Edge vibrate → rest → Edge vibrate = one beat
    const interval = 60000 / bpm; // ms per beat
    const pattern: [string, number][] = [
      ["vibrate", 100],
      ["pause", interval - 100],
    ];
    // Send to characteristic...
  }
}
```

## Two-Player Sync — WebSocket Signaling

```typescript
// Simple signaling server using ws (for WebRTC data channel)
// OR use Socket.io for simplicity in MVP

import { io } from "socket.io-client";

class SessionSync {
  private socket: Socket;
  private sessionId: string;

  constructor(sessionId: string) {
    this.socket = io("https://sync.coupleedger.com");
    this.sessionId = sessionId;
    this.join();
  }

  join() {
    this.socket.emit("join-session", { sessionId: this.sessionId });
  }

  broadcast(state: SessionState) {
    this.socket.emit("sync-state", { sessionId: this.sessionId, state });
  }

  onRemoteChange(callback: (state: SessionState) => void) {
    this.socket.on("state-update", callback);
  }
}
```

## Testing Strategy

```typescript
// tests/unit/timer.test.ts
describe("SessionEngine", () => {
  test("Phase transitions fire at correct intervals", () => {
    const engine = new SessionEngine({ stroke: 10, edge: 5, rest: 5, cycles: 2 });
    engine.start();

    // Mock time progression
    jest.advanceTimersByTime(10000);
    expect(engine.phase).toBe("edge");

    jest.advanceTimersByTime(5000);
    expect(engine.phase).toBe("rest");

    jest.advanceTimersByTime(5000);
    expect(engine.phase).toBe("stroke");
  });

  test("Drift remains < 100ms over 30 minutes", () => {
    // Use requestAnimationFrame mock
    const engine = new SessionEngine({ stroke: 60, edge: 30, rest: 45, cycles: 20 });
    // Simulate 30 minutes of real time
    // Assert elapsed time accuracy
  });
});
```

## Browser Compatibility Matrix

| API | Chrome | Firefox | Safari (macOS) | Safari (iOS) | Edge | Status |
|-----|--------|---------|----------------|--------------|------|--------|
| Web Audio | ✅ 30+ | ✅ 25+ | ✅ 13+ | ✅ 13+ | ✅ | Full |
| Web Speech | ✅ | ✅ | ✅ 13+ | ✅ 13+ | ✅ | Full |
| Vibration | ✅ | ✅ | ❌ | ✅ 13+ | ✅ | iOS Safari partial |
| Web Bluetooth | ✅ 56+ | ❌ | ❌ | ❌ | ✅ | iOS/Safari unsupported |
| Web Share | ✅ | ✅ 71+ | ✅ 12.1+ | ✅ 12.1+ | ✅ | Full |
| Screen Wake Lock | ✅ 85+ | ✅ 85+ | ✅ 16+ | ✅ 16+ | ✅ | Full |
| IndexedDB | ✅ | ✅ | ✅ | ✅ | ✅ | Full |
| `prefers-reduced-motion` | ✅ | ✅ | ✅ | ✅ | ✅ | Full |
