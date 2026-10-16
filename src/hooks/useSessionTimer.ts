import { useEffect, useReducer } from 'react'
import {
  createSessionTimer,
  sessionTimerReducer,
} from '../lib/sessionTimer'

export function useSessionTimer(durationSeconds: number) {
  const [timer, dispatch] = useReducer(
    sessionTimerReducer,
    durationSeconds * 1000,
    createSessionTimer,
  )

  useEffect(() => {
    if (timer.status !== 'running') return
    const interval = window.setInterval(() => {
      dispatch({ type: 'tick', nowMs: performance.now() })
    }, 250)
    return () => window.clearInterval(interval)
  }, [timer.status, timer.deadlineMs])

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.visibilityState === 'hidden') {
        dispatch({ type: 'pause', nowMs: performance.now() })
      }
    }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden)
  }, [])

  return { timer, dispatch }
}
