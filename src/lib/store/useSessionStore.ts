import { create } from "zustand";
import type { SessionConfig, SafetyState, Card } from "@/lib/types";

export interface SessionState {
  config: SessionConfig;
  currentCard: Card | null;
  safetyState: SafetyState;
  isSessionActive: boolean;
  isAgeVerified: boolean;
  selectedDeck: string;
  sessionStartTime: number | null;
  elapsedSession: number;

  setConfig: (_config: Partial<SessionConfig>) => void;
  setCurrentCard: (_card: Card | null) => void;
  setSafetyState: (_state: SafetyState) => void;
  startSession: () => void;
  endSession: () => void;
  setAgeVerified: (_verified: boolean) => void;
  setSelectedDeck: (_deck: string) => void;
  tick: (_elapsed: number) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  config: {
    duration: 600,
    intensity: 3,
    language: "en-US",
    enableHaptics: true,
    enableVoice: true,
    includeProstate: false,
    multiPeak: false,
  },
  currentCard: null,
  safetyState: "green",
  isSessionActive: false,
  isAgeVerified: false,
  selectedDeck: "core",
  sessionStartTime: null,
  elapsedSession: 0,

  setConfig: (config) =>
    set((_state) => ({
      config: { ..._state.config, ...config },
    })),

  setCurrentCard: (card) => set({ currentCard: card }),

  setSafetyState: (safetyState) => set({ safetyState }),

  startSession: () =>
    set({
      isSessionActive: true,
      sessionStartTime: Date.now(),
      elapsedSession: 0,
    }),

  endSession: () =>
    set({
      isSessionActive: false,
      sessionStartTime: null,
      currentCard: null,
    }),

  setAgeVerified: (verified) => set({ isAgeVerified: verified }),

  setSelectedDeck: (deck) => set({ selectedDeck: deck }),

  tick: (elapsed) => set({ elapsedSession: elapsed }),

  reset: () =>
    set({
      currentCard: null,
      safetyState: "green",
      isSessionActive: false,
      sessionStartTime: null,
      elapsedSession: 0,
    }),
}));