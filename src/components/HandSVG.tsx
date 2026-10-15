import { motion } from 'framer-motion'

interface HandSVGProps {
  pressure: number
  highlight: boolean
}

export default function HandSVG({ pressure = 0.5, highlight = false }: HandSVGProps) {
  const pressureIntensity = pressure * 0.45
  const pressureEllipse1 = 20 + pressure * 5
  const pressureEllipse2 = 18 + pressure * 4
  const pressureEllipse1Y = 10 + pressure * 3
  const pressureEllipse2Y = 9 + pressure * 3
  const fillOpacityCircle = 0.18 + pressure * 0.9
  const fillOpacityEllipse = pressure * 0.35

  return (
    <motion.svg
      viewBox="0 0 512 512"
      className="hand-diagram"
      role="img"
      aria-label="Ball Tease Grip hand technique illustration"
      width="100%"
      height="100%"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 0.7 + pressure * 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="heatGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a43b8" />
          <stop offset="0.5" stopColor="#9335ea" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2d2b3" />
          <stop offset="1" stopColor="#d7a880" />
        </linearGradient>
        <style>{`
          .hand-pressure { fill: #d4ff56; }
          .finger-label-text { fill: #d4ff56; font-family: monospace; font-weight: bold; }
          .hand-target { fill: url(#heatGrad); }
        `}</style>
      </defs>

      <motion.circle
        className="hand-target"
        cx="256"
        cy="270"
        r={72 + pressure * 128}
        fillOpacity={fillOpacityCircle}
        animate={{ r: 72 + pressure * 128, fillOpacity: fillOpacityCircle }}
        transition={{ duration: 0.4 }}
      />

      <ellipse cx="256" cy="268" rx="38" ry="18" fill="#2b2b2b" fillOpacity={0.55} />

      <g className="hand-hand">
        <motion.path
          d="M256 60 C 230 90, 200 150, 180 230"
          stroke="url(#skinGrad)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ stroke: highlight ? '#fff' : '#fff' }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M256 60 C 270 80, 295 130, 310 220"
          stroke="url(#skinGrad)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ stroke: highlight ? '#fff' : '#fff' }}
          transition={{ duration: 0.3 }}
        />
        <path d="M256 60 L 200 130" stroke="#f2d2b3" strokeWidth="6" />
        <path d="M256 60 L 295 125" stroke="#f2d2b3" strokeWidth="6" />
        <motion.path
          d="M180 230 C 190 260, 195 300, 195 340 C 195 390, 210 440, 235 455"
          stroke="#f2d2b3"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          animate={{ stroke: highlight ? '#ffeebb' : '#f2d2b3' }}
        />
        <motion.path
          d="M310 220 C 305 250, 300 300, 300 340 C 300 390, 285 440, 262 455"
          stroke="#e0bb95"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          animate={{ stroke: highlight ? '#ffeebb' : '#e0bb95' }}
        />
        <path d="M235 455 Q 256 450 262 445" stroke="#f2d2b3" strokeWidth="5" fill="none" />
        <path d="M262 445 C 275 410, 280 360, 280 320" stroke="#e0bb95" strokeWidth="6" />
      </g>

      <circle cx="256" cy="410" r="28" fill="#1e1e1e" fillOpacity="0.4" stroke="#444" strokeWidth="2" />
      <ellipse cx="256" cy="395" rx="38" ry="12" fill="#1e1e1e" fillOpacity="0.3" />

      {['thumb', 'index', 'middle', 'ring', 'palm'].map((label, i) => {
        const pts = [
          { x: 210, y: 200 },
          { x: 225, y: 195 },
          { x: 250, y: 260 },
          { x: 240, y: 270 },
          { x: 250, y: 390 },
        ]
        const p = pts[i]
        return (
          <g key={label} className="finger-label">
            <circle cx={p.x} cy={p.y} r={14} fillOpacity="0.35" />
            <line x1={p.x} y1={p.y} x2={p.x + 16} y2={p.y + 16} stroke="#d4ff56" strokeWidth="1" />
            <text x={p.x + 22} y={p.y + 10} className="finger-label-text" fontSize="10">
              {label.toUpperCase()}
            </text>
          </g>
        )
      })}

      <motion.circle
        className="hand-pressure"
        cx="256"
        cy="272"
        r={36}
        fillOpacity={pressureIntensity}
        animate={{ r: 36 + pressure * 12, fillOpacity: pressureIntensity }}
        transition={{ duration: 0.4 }}
      />

      <motion.ellipse
        cx="236"
        cy="268"
        rx={pressureEllipse1}
        ry={pressureEllipse1Y}
        fillOpacity={fillOpacityEllipse}
        animate={{ rx: pressureEllipse1, ry: pressureEllipse1Y, fillOpacity: fillOpacityEllipse }}
        transition={{ duration: 0.4 }}
      />

      <motion.ellipse
        cx="276"
        cy="270"
        rx={pressureEllipse2}
        ry={pressureEllipse2Y}
        fillOpacity={fillOpacityEllipse}
        animate={{ rx: pressureEllipse2, ry: pressureEllipse2Y, fillOpacity: fillOpacityEllipse }}
        transition={{ duration: 0.4 }}
      />

      <circle cx="276" cy="236" r="14" fill="#d4ff56" fillOpacity="0.6" />
      <path d="M 270 240 C 282 236, 298 240, 298 252 C 298 260, 290 266, 280 266" fill="#d4ff56" fillOpacity="0.6" />
    </motion.svg>
  )
}