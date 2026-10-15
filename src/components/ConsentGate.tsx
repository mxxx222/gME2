import { useState } from 'react'
import { motion } from 'framer-motion'
import Disclaimer from './Disclaimer'

interface ConsentGateProps {
  onEnter: () => void
}

export default function ConsentGate({ onEnter }: ConsentGateProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <motion.div
      className="consent-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="consent-card">
        <div className="consent-header">
          <span className="consent-eyebrow">18+ ONLY</span>
          <h1 className="consent-title">Edging Tease &amp; Control</h1>
          <p className="consent-subtitle">
            A browser-based edging tutorial &amp; session app for couples.
            Slow teasing, edge control, hand grip techniques, and testicle
            stimulation.
          </p>
        </div>

        <Disclaimer />

        <label className="consent-check">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I am 18 or older, I consent, and I agree to the safety reminders above.</span>
        </label>

        <button
          className="consent-button"
          type="button"
          disabled={!agreed}
          onClick={onEnter}
        >
          Enter the App
        </button>
      </div>
    </motion.div>
  )
}