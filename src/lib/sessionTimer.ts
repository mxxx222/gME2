export type TimerStatus = 'idle' | 'running' | 'paused' | 'complete'

export type SessionTimerState = {
  status: TimerStatus
  durationMs: number
  remainingMs: number
  deadlineMs: number | null
}

export type SessionTimerAction =
  | { type: 'start'; nowMs: number }
  | { type: 'pause'; nowMs: number }
  | { type: 'resume'; nowMs: number }
  | { type: 'stop' }
  | { type: 'reset'; durationMs?: number }
  | { type: 'tick'; nowMs: number }

function validateDuration(durationMs: number) {
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    throw new RangeError('Timer duration must be a positive finite number.')
  }
}

export function createSessionTimer(durationMs: number): SessionTimerState {
  validateDuration(durationMs)
  return {
    status: 'idle',
    durationMs,
    remainingMs: durationMs,
    deadlineMs: null,
  }
}

export function getRemainingMs(state: SessionTimerState, nowMs: number) {
  if (state.status !== 'running' || state.deadlineMs === null) {
    return state.remainingMs
  }
  return Math.max(0, state.deadlineMs - nowMs)
}

export function getRemainingSeconds(state: SessionTimerState, nowMs: number) {
  return Math.ceil(getRemainingMs(state, nowMs) / 1000)
}

export function sessionTimerReducer(
  state: SessionTimerState,
  action: SessionTimerAction,
): SessionTimerState {
  switch (action.type) {
    case 'start':
      if (state.status !== 'idle') return state
      return {
        ...state,
        status: 'running',
        deadlineMs: action.nowMs + state.remainingMs,
      }
    case 'pause': {
      if (state.status !== 'running') return state
      const remainingMs = getRemainingMs(state, action.nowMs)
      if (remainingMs === 0) {
        return { ...state, status: 'complete', remainingMs: 0, deadlineMs: null }
      }
      return { ...state, status: 'paused', remainingMs, deadlineMs: null }
    }
    case 'resume':
      if (state.status !== 'paused' || state.remainingMs === 0) return state
      return {
        ...state,
        status: 'running',
        deadlineMs: action.nowMs + state.remainingMs,
      }
    case 'stop':
      return createSessionTimer(state.durationMs)
    case 'reset':
      return createSessionTimer(action.durationMs ?? state.durationMs)
    case 'tick': {
      if (state.status !== 'running') return state
      const remainingMs = getRemainingMs(state, action.nowMs)
      if (remainingMs === 0) {
        return { ...state, status: 'complete', remainingMs: 0, deadlineMs: null }
      }
      return { ...state, remainingMs }
    }
  }
}
