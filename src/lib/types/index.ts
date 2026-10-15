export type CardType = "EDGE" | "TEASE" | "PUNISHMENT" | "REWARD" | "WILDCARD" | "COMMAND";
export type MultiPeakType = "RECOGNIZE_EDGE" | "PC_CONTRACT_RELEASE" | "EDGE_RESET" | "MULTI_PEAK_RECOVERY" | "CHOOSE_YOUR_PEAK";
export type DeprivationSense = "VISION" | "AUDITION" | "TACTILE" | "THERMAL";
export type DeprivationLevel = "INTRODUCTORY" | "INTERMEDIATE" | "ADVANCED";

export interface Card {
  id: string;
  type: CardType;
  intensity: number;
  sensateLevel: number;
  name: string;
  zoneTags: string[];
  sensationTags: string[];
  paceTags: string[];
  text: string;
  receiverRole: "both" | "giver" | "receiver";
  duration: {
    min: number;
    max: number;
  };
  languageOptions: {
    anatomical?: string;
    custom?: boolean;
  };
  inclusion: "always" | "auto" | "ask" | "conditional";
  comfortChecks: string[];
  requiresConfirmation?: boolean;
  safety?: boolean;
  safetyNote?: string;
  switchesRoles?: boolean;
  edgeTarget?: number;
  multiPeakType?: MultiPeakType;
  multiPeakPhases?: MultiPeakPhase[];
  deprivationType?: MultiPeakType;
  deprivationSense?: DeprivationSense;
  level?: DeprivationLevel;
  setup?: {
    required: string[];
    prohibited: string[];
  };
  phases?: DeprivationPhase[];
  dscProtocolId?: string;
}

export interface MultiPeakPhase {
  name: string;
  durationSeconds: number;
  objective: string;
  pcMuscleCue?: "GENTLE_CONTRACT" | "RELEASE" | "NONE";
  prompt?: string;
}

export interface DeprivationPhase {
  name: string;
  durationSeconds: number;
  prompt: string;
}

export interface KegelTimerCard {
  mode: "HOLD_RELEASE" | "RHYTHM_SYNC" | "EDGE_AWARENESS" | "RELAXATION_RESET" | "ADAPTIVE_SYNC";
  holdSeconds: number;
  releaseSeconds: number;
  rhythm?: number[];
}

export type TimerPhase = "stroke" | "edge" | "rest" | "idle";

export interface TimerState {
  phase: TimerPhase;
  elapsedSeconds: number;
  remainingSeconds: number;
  isActive: boolean;
  beatInterval: number;
  startTime: number | null;
  accumulatedTime: number;
}

export type SafetyState = "red" | "yellow" | "green";
export type VoiceLanguage = "en-US" | "en-GB" | "es-ES" | "fr-FR" | "de-DE" | "it-IT" | "pt-BR";

export interface VoiceSettings {
  enabled: boolean;
  language: VoiceLanguage;
  rate: number;
  pitch: number;
  volume: number;
}

export interface HapticPattern {
  pattern: number[];
  intensity: number;
}

export type AgeGateError = "under_18" | "invalid_input" | "consent_required";

export interface SessionConfig {
  duration: number;
  intensity: number;
  language: VoiceLanguage;
  enableHaptics: boolean;
  enableVoice: boolean;
  includeProstate: boolean;
  multiPeak: boolean;
  powerDynamic?: "experienced_mentor" | "academic" | "executive" | "owner_pet" | "negotiated_exchange";
}
