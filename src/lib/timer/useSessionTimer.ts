import { useState, useRef, useEffect } from "react";
import type { TimerState, TimerPhase } from "@/lib/types";
import { audioManager } from "@/lib/audio";

const STROKE_DURATION = 180;
const EDGE_DURATION = 240;
const REST_DURATION = 120;

const PHASE_DURATIONS: Record<TimerPhase, number> = {
  stroke: STROKE_DURATION,
  edge: EDGE_DURATION,
  rest: REST_DURATION,
  idle: 0,
};

export function useSessionTimer() {
  const [state, setState] = useState<TimerState>({
    phase: "idle",
    elapsedSeconds: 0,
    remainingSeconds: 0,
    isActive: false,
    beatInterval: 0,
    startTime: null,
    accumulatedTime: 0,
  });

  const rafId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const lastUpdate = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      audioManager.close();
      startTime.current = null;
    };
  }, []);

  const tick = (timestamp: number) => {
    if (!state.isActive || state.startTime === null) return;

    const totalElapsed = (timestamp - state.startTime) / 1000;

    const currentPhase = state.phase;
    const phaseDuration = PHASE_DURATIONS[currentPhase];
    const phaseElapsed = totalElapsed;

    if (phaseElapsed >= phaseDuration && phaseDuration > 0) {
      const nextPhase = getNextPhase(currentPhase);
      if (nextPhase === "idle") {
        setState((prev) => ({
          ...prev,
          isActive: false,
          phase: "idle",
          elapsedSeconds: prev.elapsedSeconds,
          remainingSeconds: 0,
        }));
        audioManager.playEdgeWarning();
        return;
      }

      const newTime = timestamp - state.startTime;
      const timeIntoNextPhase = newTime - phaseDuration * 1000;

      setState({
        phase: nextPhase,
        elapsedSeconds: 0,
        remainingSeconds: PHASE_DURATIONS[nextPhase] || 0,
        isActive: true,
        beatInterval: getBeatInterval(nextPhase),
        startTime: timestamp - timeIntoNextPhase,
        accumulatedTime: timeIntoNextPhase / 1000,
      });

      audioManager.playBeep(
        nextPhase === "edge" ? 880 : 220,
        0.3,
        nextPhase === "edge" ? "sine" : "sine"
      );
    } else {
      setState((prev) => ({
        ...prev,
        elapsedSeconds: Math.floor(totalElapsed),
        remainingSeconds: Math.max(0, phaseDuration - totalElapsed),
      }));
    }

    lastUpdate.current = timestamp;
    rafId.current = requestAnimationFrame(tick);
  };

  function getNextPhase(current: TimerPhase): TimerPhase {
    switch (current) {
      case "stroke":
        return "edge";
      case "edge":
        return "rest";
      case "rest":
        return "idle";
      default:
        return "idle";
    }
  }

  function getBeatInterval(phase: TimerPhase): number {
    switch (phase) {
      case "stroke":
        return 0.8;
      case "edge":
        return 0.5;
      case "rest":
        return 4;
      default:
        return 0;
    }
  }

  const start = () => {
    if (state.isActive) return;

    audioManager.init();
    const now = performance.now();
    startTime.current = now;

    setState({
      phase: "stroke",
      elapsedSeconds: 0,
      remainingSeconds: STROKE_DURATION,
      isActive: true,
      beatInterval: 0.8,
      startTime: now,
      accumulatedTime: 0,
    });

    audioManager.playBeep(440, 0.2, "sine");
    rafId.current = requestAnimationFrame(tick);
  };

  const pause = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setState((prev) => ({
      ...prev,
      isActive: false,
      accumulatedTime: prev.elapsedSeconds + prev.accumulatedTime,
    }));
    audioManager.playBeep(300, 0.2, "sine");
  };

  const resume = () => {
    if (state.isActive || state.phase === "idle") return;

    audioManager.init();
    const now = performance.now();
    startTime.current = now;

    setState((prev) => ({
      ...prev,
      isActive: true,
      startTime: now,
    }));

    audioManager.playBeep(440, 0.2, "sine");
    rafId.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setState({
      phase: "idle",
      elapsedSeconds: 0,
      remainingSeconds: 0,
      isActive: false,
      beatInterval: 0,
      startTime: null,
      accumulatedTime: 0,
    });
    audioManager.playBeep(200, 0.2, "sine");
  };

  const setPhase = (phase: TimerPhase) => {
    if (state.isActive) return;

    setState((prev) => ({
      ...prev,
      phase: phase,
      elapsedSeconds: 0,
      remainingSeconds: phase === "idle" ? 0 : PHASE_DURATIONS[phase],
      beatInterval: getBeatInterval(phase),
      startTime: null,
    }));
  };

  const getCurrentPhase = (): TimerPhase => state.phase;

  const getElapsedSeconds = (): number => state.elapsedSeconds;

  const getRemainingSeconds = (): number => state.remainingSeconds;

  return {
    phase: state.phase,
    elapsedSeconds: state.elapsedSeconds,
    remainingSeconds: state.remainingSeconds,
    isActive: state.isActive,
    beatInterval: state.beatInterval,
    start,
    pause,
    resume,
    reset,
    setPhase,
    getCurrentPhase,
    getElapsedSeconds,
    getRemainingSeconds,
  };
}