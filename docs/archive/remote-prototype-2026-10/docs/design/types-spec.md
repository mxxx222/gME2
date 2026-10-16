# CoupleEdger — Type System & Card Deck Specification

> TypeScript-first definitions for the edging session engine and card system.

## Core Types

```typescript
// src/lib/types/card.ts

export type CardType =
  | "EDGE"       // Tease instructions (how to approach without finishing)
  | "TEASE"      // Sensory build-up activities
  | "COMMAND"    // Direct instruction to partner
  | "PUNISHMENT" // Consequence for breaking rules
  | "REWARD"     // Permission / reward card
  | "WILDCARD";  // Custom / surprise card

export type Intensity = 1 | 2 | 3 | 4 | 5;

export type Role = "giver" | "receiver" | "both";

export type SafewordLevel = "green" | "yellow" | "red";

// ========================
// INCLUSIVE ZONE SYSTEM
// Based on transgender health research - anatomy-neutral design
// ========================

export type BodyZone =
  // Universal areas
  | "INNER_THIGHS" | "NECK" | "SCALP" | "ARMS" | "BACK"
  // Anatomy-specific but phrased neutrally
  | "PERINEUM" | "BREAST_TISSUE" | "GENITAL_EXTERNAL" | "GENITAL_INTERNAL"
  // User-defined
  | "CUSTOM_ZONE";

export type SensationTag =
  | "LIGHT_TOUCH" | "PRESSURE" | "WARMTH"
  | "RHYTHMIC" | "GENTLE" | "FIRMLY"
  | "TACTILE" | "AUDITORY" | "TEMPERATURE";

export type PaceTag =
  | "SLOW" | "STEADY" | "VARIABLE" | "PAUSE"
  | "SYNC_WITH_BREATH" | "USER_PACED"
  | "SURPRISE" | "STILLNESS";

export type InclusionPreference =
  | "always"     // Always included
  | "auto"       // Included automatically
  | "ask"        // Ask before including
  | "never";     // Never included

export type ComfortCheck =
  | "comfortable" | "reduce_intensity" | "pause"
  | "stop" | "change_zone" | "too_much"
  | "too_cold" | "too_hot" | "just_right"
  | "yellow" | "red" | "beg" | "submit";

export type SessionMode = "wave" | "lock" | "switch";

export interface ZoneConfig {
  zoneId: BodyZone;
  displayName: string;         // Customizable by user
  included: InclusionPreference;
  preferredSensation: SensationTag[];
  preferredPace: PaceTag[];
  lastUsedIntensity: Intensity;
}

export interface LanguagePreferences {
  anatomicalLabels: "anatomical" | "user_defined" | "clinical";
  customZoneName: string | null;  // User-defined zone label
  customTermOverrides: Record<string, string>;
}

export interface ComfortSettings {
  checkFrequency: "never" | "every_phase" | "custom";
  autoSuggestPause: boolean;
  autoSuggestEnd: boolean;
  customCheckLabels: Record<string, string>;
}

export interface InclusiveEdgingCard {
  id: string;
  type: CardType;
  intensity: Intensity;
  name: string;
  zoneTags: BodyZone[];
  sensationTags: SensationTag[];
  paceTags: PaceTag[];
  text: {
    giverPerspective?: string;    // Instructions for giver
    receiverPerspective?: string; // Instructions for receiver
    neutral: string;             // Default text (both roles)
  };
  receiverRole: Role;
  duration: { min: number; max: number };
  inclusion: InclusionPreference;
  comfortChecks: ComfortCheck[];
  requiresConfirmation?: boolean; // For sensitive zones
  safety?: boolean;               // Emergency stop available
  switchesRoles?: boolean;          // Switch giver/receiver
  languageOptions?: {
    anatomical: string;
    custom?: boolean;
  };
}

export interface Preset {
  id: string;
  name: string;
  stroke: number;   // seconds
  edge: number;     // seconds
  rest: number;     // seconds
  cycles: number;   // repeat count
  edgeTarget?: number; // for denial mode
  bpm: number;      // default stroke BPM
  description: string;
  color: string; // CSS color for visual mode
}

export interface SessionConfig {
  mode: SessionMode;                       // "wave" | "lock" | "switch"
  preset: Preset;
  safeword: SafewordLevel;
  roles: { giver: string; receiver: string };
  intensity: Intensity;
  zones: ZoneConfig[];
  language: LanguagePreferences;
  comfort: ComfortSettings;
  includeAftercare: boolean;
  toyControl: boolean;
  customCards: string[];
   // Inclusive mode overrides
  hormoneTherapy: boolean;
  customZoneNames: boolean;
}

// ========================
// KEGEL TIMER INTEGRATION
// Based on systematic reviews (2024) - awareness over delay
// ========================

export type KegelCardType =
  | "HOLD_RELEASE"      // Build awareness: contract → release → rest
  | "RHYTHM_SYNC"         // Sync contractions to timer pace
  | "EDGE_AWARENESS"      // Pelvic-floor response at arousal peaks
  | "RELAXATION_RESET"    // Make release a deliberate skill
  | "ADAPTIVE_SYNC";      // User-chosen action per phase, adapts to feedback

export type PelvicFloorAction =
  | "USER_CHOICE"
  | "CONTRACT"
  | "RELEASE"
  | "RELAX"
  | "CONTRACT_OR_RELEASE"
  | "NO_ACTION";

export interface KegelPhase {
  name: "BUILD" | "HOLD" | "EDGE" | "RECOVERY" | "CHECK_IN";
  durationSeconds: number;
  pelvicFloorAction: PelvicFloorAction;
}

export interface KegelTimerCard {
  cardId: KegelCardType;
  phases: KegelPhase[];
  comfortCheckEnabled: boolean;
  fatigueCheckEnabled: boolean;
  painResponse: "STOP_SESSION";    // Never auto-continue on pain
  userCanSkipPhase: boolean;
  medicalClaims: false;            // Never claim universal efficacy
  relaxationOnlyMode: boolean;     // For overactive pelvic floor
}

export interface KegelState {
  active: boolean;
  currentCard: KegelTimerCard | null;
  currentPhase: KegelPhase | null;
  phaseProgress: number;           // 0-1 within phase
  contractionCount: number;
  releaseCount: number;
  fatigueReported: boolean;
  comfortReports: Array<"comfortable" | "tense" | "fatigued" | "pain">;
}

// ========================
// MULTI-PEAK MODE (Ejaculatory Control & Multiple Orgasms)
// ========================

export type MultiPeakCardType =
  | "RECOGNIZE_EDGE"
  | "PC_CONTRACT_RELEASE"
  | "EDGE_RESET"
  | "MULTI_PEAK_RECOVERY"
  | "CHOOSE_YOUR_PEAK";

export type OrgasmEventType = "orgasm" | "ejaculation" | "orgasm_without_ejaculation" | "multiple";

export interface MultiPeakPhase {
  name: "SETTLE" | "BUILD" | "PAUSE_RESET" | "RECOVERY" | "CHOOSE_PEAK";
  durationSeconds: number;
  objective: string;
  pcMuscleCue?: "GENTLE_CONTRACT" | "RELEASE" | "NONE";
}

export interface MultiPeakTimerCard {
  cardId: MultiPeakCardType;
  phases: MultiPeakPhase[];
  comfortCheckEnabled: boolean;
  fatigueCheckEnabled: boolean;
  painResponse: "STOP_SESSION";
  userCanSkipPhase: boolean;
  medicalClaims: false;
  tracks: {
    orgasms: number;
    ejaculations: number;
    peaks: number;
  };
}

export interface MultiPeakState {
  active: boolean;
  currentCard: MultiPeakTimerCard | null;
  currentPhase: MultiPeakPhase | null;
  phaseProgress: number;
  peaksCompleted: number;
  totalPeaksTarget?: number;      // user-set or undefined
  lastEvent?: OrgasmEventType;
  recoveryActive: boolean;
  recoveryEndsAt?: number;        // timestamp
  pcMuscleAwareness: "CONTRACT" | "RELEASE" | "NONE";
}

export interface SessionState {

export type AnatomyRequirement =
  | "none"           // Universal — all anatomies
  | "prostate_optional"  // External only, prostate-aware description available
  | "prostate_required"  // Internal stimulation, requires prostate + safety screen
  | "user_defined";       // User-chosen zone

export interface ProstateAwareCard extends InclusiveEdgingCard {
  sensateLevel: 1 | 2 | 3 | 4 | 5;
  anatomyRequired: AnatomyRequirement;
  requiresConfirmation: boolean;      // true for sensitive zones
  requiresSafetyScreen: boolean;       // true for internal stimulation
  safetyNote: string;
  zoneTags: BodyZone[];
  sensationTags: SensationTag[];
  paceTags: PaceTag[];
  inclusion: InclusionPreference;
  comfortChecks: ComfortCheck[];
}

export interface BodyMap {
  userId: string;
  zones: ZoneConfig[];
  customZoneNames: Record<string, string>;
  anatomyConfirmed: Record<AnatomyRequirement, boolean>;
  safetyAcknowledged: boolean;
}

export interface SessionState {
  phase: "negotiation" | "warmup" | "stroke" | "edge" | "rest" | "resolution" | "aftercare";
  cycleIndex: number;
  totalCycles: number;
  elapsed: number;
  edgesLogged: number;
  voiceEnabled: boolean;
  hapticEnabled: boolean;
  visualMode: "pulse" | "flash" | "breath";
  bpm: number;
  activeCard: InclusiveEdgingCard | null;
  secretDuration: number | null;
  // Inclusive state
  currentRole: "giver" | "receiver";
  partnerProfiles: Array<{
    id: string;
    name: string;
    zones: ZoneConfig[];
    preferences: LanguagePreferences;
  }>;
}
```
```

// ========================
// ASYNC LDR MODE (Long-Distance Asynchronous Command Cards)
// ========================

export type AsyncLDRCardType =
  | "INTRO"
  | "PACE_SETUP"
  | "AWARENESS_PROMPT"
  | "INTERACTIVE_CHOICE"
  | "CONSENT_CHECKPOINT"
  | "SESSION_CLOSE";

export type AsyncSessionStateType =
  | "DRAFT"
  | "INVITED"
  | "ACCEPTED"
  | "ACTIVE"
  | "PAUSED"
  | "STOPPED"
  | "COMPLETED"
  | "EXPIRED";

export type AsyncPhase =
  | "INVITATION"
  | "PACE_SELECTION"
  | "AWARENESS"
  | "INTERACTIVE"
  | "CONSENT_CHECK"
  | "COMPLETION";

export interface AsyncLDRCard {
  cardId: string;
  asyncType: AsyncLDRCardType;
  asyncPhase: AsyncPhase;
  text: string;
  duration: { min: number; max: number };
  languageOptions: { anatomical: string; custom?: boolean };
  inclusion: "always" | "ask" | "never";
  comfortChecks: string[];
  asyncPhase: AsyncPhase;
  requiresExplicitAccept?: boolean;
  requiresResponse?: boolean;
  blocksNextCard?: boolean;
  endsSession?: boolean;
  aftercare?: boolean;
  safety?: boolean;
  safetyNote?: string;
}

export interface AsyncSessionConfig {
  senderId: string;
  recipientId: string;
  sessionTemplateId: string;
  cardSequence: string[];
  intervalSeconds: number;
  timingMode: "recipient_paced" | "fixed_interval" | "variable_interval" | "sender_prepared" | "pause_resume" | "scheduled";
  sessionExpiration: number;
  shareProgress: boolean;
  recipientCanModify: boolean;
  consentConfirmed: boolean;
}

export interface AsyncSessionState {
  sessionId: string;
  state: AsyncSessionStateType;
  senderId: string;
  recipientId: string;
  config: AsyncSessionConfig;
  currentCardIndex: number;
  sessionStartTime: number | null;
  pauseStartTime: number | null;
  pauseDuration: number;
  lastInteraction: number;
  expiresAt: number;
  progressShared: boolean;
  completionData?: {
    completedAt: number;
    cardsCompleted: number;
    feedback?: string;
    shareProgress: boolean;
  };
}

}
}

// ========================
// LOCAL AI VOICE COACH
// On-device LLM + TTS + preference learning
// ========================

export type VoiceProfileId =
  | "CALM_GUIDE"
  | "DIRECT_COACH"
  | "PLAYFUL_TEASE"
  | "PRAISE_PARTNER"
  | "FORMAL_DIRECTOR";

export type VoiceProfileSetting = {
  voiceProfileId: VoiceProfileId;
  language: string;
  tone: "calm" | "confident" | "playful" | "warm" | "formal";
  directness: 1 | 2 | 3 | 4 | 5;
  playfulness: 1 | 2 | 3 | 4 | 5;
  encouragement: 1 | 2 | 3 | 4 | 5;
  verbosity: 1 | 2 | 3 | 4 | 5;
  speechRate: number;          // 0.5 - 1.5
  pauseLength: "short" | "medium" | "long";
  checkInFrequency: "low" | "medium" | "high";
  userCanChangeProfile: boolean;
};

export type VoiceFeedbackType =
  | "HELPFUL"
  | "TOO_MUCH_TALKING"
  | "TOO_FORMAL"
  | "TOO_PLAYFUL"
  | "TOO_FAST"
  | "TOO_SLOW"
  | "MORE_CHECK_INS"
  | "FEWER_CHECK_INS";

export interface VoiceCoachPreferences {
  currentProfile: VoiceProfileId;
  profiles: Record<VoiceProfileId, VoiceProfileSetting>;
  feedbackHistory: Array<{
    timestamp: number;
    profile: VoiceProfileId;
    feedback: VoiceFeedbackType;
  }>;
  ttsEngine: "native" | "piper" | "kokoro";
  voiceLanguage: string;
  speechRate: number;
  autoPlay: boolean;
  fallbackToPrewritten: boolean;
}

export interface VoiceCoachState {
  active: boolean;
  currentProfile: VoiceProfileId;
  isPlaying: boolean;
  currentInstruction: string | null;
  queuedInstructions: string[];
  ttsEngine: "native" | "piper" | "kokoro";
  lastFeedback: VoiceFeedbackType | null;
}

export interface VoiceCoachInstruction {
  cardType: string;
  spokenText: string;
  requiresUserResponse: boolean;
  allowedActions: string[];
  timerChange: { action: "maintain" | "adjust_bpm" | "pause" | "resume"; value?: number } | null;
  voiceStyle: VoiceProfileId;
  priority: "normal" | "high" | "safety";
}

export interface SessionState {
```

```json
// src/data/coreDeck.json
[
  {
    "id": "edge-001",
    "type": "EDGE",
    "intensity": 1,
    "text": "Use your fingers to trace circles on their clit. Start slow, speed up as they beg.",
    "receiverRole": "receiver",
    "duration": { "min": 60, "max": 120 },
    "tags": ["clitoral", "teasing", "hands-only"],
    "consequence": "Draw a PUNISHMENT card and perform it without protest."
  },
  {
    "id": "command-001",
    "type": "COMMAND",
    "intensity": 2,
    "text": "Get on your knees. No hands on their body yet — just eye contact and a slow smile.",
    "receiverRole": "both",
    "duration": { "min": 30, "max": 45 },
    "tags": ["kneeling", "eye-contact", "dominant"]
  },
  {
    "id": "punishment-001",
    "type": "PUNISHMENT",
    "intensity": 3,
    "text": "You came too close without permission. Lick their toes for 30 seconds while they watch.",
    "receiverRole": "receiver",
    "duration": { "min": 30, "max": 30 },
    "tags": ["denial", "humiliation", "feet"]
  }
]
```

## Preset Definitions

```typescript
// src/lib/timer/presets.ts
import { Preset } from "../types/card";

export const PRESETS: Preset[] = [
  {
    id: "warmup",
    name: "Warm-up",
    stroke: 90,
    edge: 30,
    rest: 60,
    cycles: 4,
    bpm: 60,
    description: "Gentle build-up for beginners. Focus on breath and sensation.",
    color: "#4A90D9",
  },
  {
    id: "steady",
    name: "Steady",
    stroke: 60,
    edge: 30,
    rest: 45,
    cycles: 6,
    bpm: 70,
    description: "Standard edging rhythm. Good for regular practice.",
    color: "#50C878",
  },
  {
    id: "denial",
    name: "Denial",
    stroke: 45,
    edge: 30,
    rest: 20,
    cycles: 8,
    edgeTarget: 10,
    bpm: 80,
    description: "Short rests, many edges. Session ends denied.",
    color: "#8A2BE2",
  },
  {
    id: "marathon",
    name: "Marathon",
    stroke: 120,
    edge: 60,
    rest: 90,
    cycles: 10,
    bpm: 55,
    description: "Extended cycles for endurance and deep trance.",
    color: "#FF4500",
  },
  {
    id: "ruin",
    name: "Ruin",
    stroke: 90,
    edge: 45,
    rest: 15,
    cycles: 5,
    bpm: 75,
    description: "Edge heavy, built for ruined orgasm finish.",
    color: "#DC143C",
  },
];
```

## Session Flow State Machine

```typescript
// src/lib/types/session.ts
export type SessionPhase =
  | "negotiation"  // Consent, roles, safeword, intensity
  | "warmup"       // Breathing orb, low BPM
  | "stroke"       // Active stimulation phase
  | "edge"         // Hold at brink, voice cues
  | "rest"         // Back off, recover
  | "resolution"   // Orgasm / Denial / Ruin outcome
  | "aftercare";   // Debrief, cuddle timer, rating

export interface PhaseConfig {
  phase: SessionPhase;
  duration: number;      // phase duration in seconds (0 = manual)
  nextPhase: SessionPhase;
  canSkip: boolean;
  voiceCues: string[];
  hapticPattern: number[];
  visualState: "breath" | "flash" | "pulse" | "static";
}
```

## Zustand Store

```typescript
// src/lib/store/sessionStore.ts
import { create } from "zustand";
import { SessionState, SessionConfig, SessionPhase } from "../types/session";

interface SessionStore extends SessionState {
  config: SessionConfig | null;
  setPhase: (phase: SessionPhase) => void;
  setConfig: (config: SessionConfig) => void;
  logEdge: () => void;
  setRPM: (bpm: number) => void;
  setVisualMode: (mode: "pulse" | "flash" | "breath") => void;
  reset: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  phase: "negotiation",
  cycleIndex: 0,
  totalCycles: 0,
  elapsed: 0,
  edgesLogged: 0,
  voiceEnabled: true,
  hapticEnabled: true,
  visualMode: "pulse",
  bpm: 70,
  activeCard: null,
  secretDuration: null,
  config: null,

  setPhase: (phase) => set({ phase }),
  setConfig: (config) => set({ config }),
  logEdge: () => set((state) => ({ edgesLogged: state.edgesLogged + 1 })),
  setBPM: (bpm) => set({ bpm }),
  setVisualMode: (mode) => set({ visualMode: mode }),
  reset: () => set({
    phase: "negotiation",
    cycleIndex: 0,
    elapsed: 0,
    edgesLogged: 0,
    activeCard: null,
    secretDuration: null,
  }),
}));
```