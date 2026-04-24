import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const domains = [
  {
    name: 'Checkout friction',
    metric: '47',
    metricLabel: 'evidence items',
    change: '+8',
    changePositive: true,
    sparkline: [30, 35, 32, 38, 36, 42, 47],
    months: [
      { label: 'Aug', value: 30 },
      { label: 'Sep', value: 35 },
      { label: 'Oct', value: 32 },
      { label: 'Nov', value: 38 },
      { label: 'Dec', value: 36 },
      { label: 'Jan', value: 42 },
      { label: 'Feb', value: 47 },
    ],
    target: 72,
    targetLabel: '72%',
    lastUpdated: 'Mar 2026',
  },
  {
    name: 'Activation drop-off',
    metric: '68',
    metricLabel: 'evidence items',
    change: '+12',
    changePositive: true,
    sparkline: [40, 45, 50, 52, 58, 63, 68],
    months: [
      { label: 'Aug', value: 40 },
      { label: 'Sep', value: 45 },
      { label: 'Oct', value: 50 },
      { label: 'Nov', value: 52 },
      { label: 'Dec', value: 58 },
      { label: 'Jan', value: 63 },
      { label: 'Feb', value: 68 },
    ],
    target: 85,
    targetLabel: '85%',
    lastUpdated: 'Mar 2026',
  },
  {
    name: 'Mid-market churn',
    metric: '23',
    metricLabel: 'evidence items',
    change: '-3',
    changePositive: false,
    sparkline: [28, 26, 30, 27, 25, 24, 23],
    months: [
      { label: 'Aug', value: 28 },
      { label: 'Sep', value: 26 },
      { label: 'Oct', value: 30 },
      { label: 'Nov', value: 27 },
      { label: 'Dec', value: 25 },
      { label: 'Jan', value: 24 },
      { label: 'Feb', value: 23 },
    ],
    target: 48,
    targetLabel: '48%',
    lastUpdated: 'Feb 2026',
  },
  {
    name: 'Pricing elasticity',
    metric: '9',
    metricLabel: 'evidence items',
    change: '+2',
    changePositive: true,
    sparkline: [3, 4, 5, 5, 6, 7, 9],
    months: [
      { label: 'Aug', value: 3 },
      { label: 'Sep', value: 4 },
      { label: 'Oct', value: 5 },
      { label: 'Nov', value: 5 },
      { label: 'Dec', value: 6 },
      { label: 'Jan', value: 7 },
      { label: 'Feb', value: 9 },
    ],
    target: 25,
    targetLabel: '25%',
    lastUpdated: 'Jan 2026',
  },
]

const spring = { type: 'spring' as const, stiffness: 260, damping: 26 }

// Isometric tilt — shared by all cards
const TILT_X = 45
const TILT_Y = -12
const TILT_Z = 18

export default function PortfolioCards() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [animateData, setAnimateData] = useState(false)

  useEffect(() => {
    if (selected !== null) {
      setAnimateData(false)
      const t = setTimeout(() => setAnimateData(true), 80)
      return () => clearTimeout(t)
    }
  }, [selected])

  const handleSelect = useCallback((i: number) => {
    setSelected(i)
  }, [])

  const active = selected !== null ? domains[selected] : null

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: 500 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false)
        setSelected(null)
      }}
    >
      {/* Invisible hover zones */}
      {expanded && (
        <div
          className="absolute"
          style={{
            width: 320,
            height: domains.length * 42 + 200,
            left: '28%',
            top: '50%',
            transform: `translate(-50%, -40%) rotateX(${TILT_X}deg) rotateY(${TILT_Y}deg) rotateZ(${TILT_Z}deg)`,
            transformStyle: 'preserve-3d',
            zIndex: 50,
          }}
        >
          {domains.map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => handleSelect(i)}
              style={{
                height: 42,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}

      {/* Card stack — perspective container */}
      <div
        className="absolute"
        style={{
          width: 320,
          height: 220,
          left: '28%',
          top: '50%',
          transform: 'translate(-50%, -40%)',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {domains.map((domain, i) => {
          const isSelected = selected === i
          const total = domains.length

          // All cards share the same isometric angle
          // They cascade downward, each peeking below the one above
          let y = 0
          let scale = 1
          let z = total - i

          if (!expanded) {
            // Closed: tight stack, slight peek
            y = i * 10
            scale = 1 - i * 0.01
          } else if (isSelected) {
            // Selected: lifts up from its position
            y = i * 42 - 8
            scale = 1.02
            z = total + 10
          } else {
            // Expanded: cascaded with clear gaps
            y = i * 42
            scale = 1 - i * 0.005
          }

          return (
            <motion.div
              key={domain.name}
              className="absolute top-0 left-0 rounded-[14px]"
              style={{
                width: 320,
                height: 220,
                background: isSelected
                  ? 'rgba(35, 35, 35, 0.95)'
                  : 'rgba(20, 20, 20, 0.9)',
                border: isSelected
                  ? '1px solid rgba(255,255,255,0.12)'
                  : '1px solid rgba(255,255,255,0.05)',
                transformStyle: 'preserve-3d',
                zIndex: z,
                pointerEvents: 'none',
                // The isometric tilt is on each card
                rotateX: TILT_X,
                rotateY: TILT_Y,
                rotateZ: TILT_Z,
              }}
              animate={{ y, scale }}
              transition={spring}
            >
              {/* Card label — bottom-left */}
              <div className="absolute bottom-5 left-6">
                <span
                  className="font-mono uppercase tracking-[0.08em]"
                  style={{
                    fontSize: 12,
                    color: isSelected
                      ? 'rgba(255,255,255,0.45)'
                      : expanded
                        ? 'rgba(255,255,255,0.18)'
                        : 'rgba(255,255,255,0.08)',
                    transition: 'color 0.15s',
                  }}
                >
                  {domain.name}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Data popover — floats to the right */}
      <AnimatePresence>
        {active && selected !== null && (
          <motion.div
            key={active.name}
            className="absolute rounded-[14px] overflow-hidden"
            style={{
              width: 260,
              right: '2%',
              top: '8%',
              background: 'rgba(15, 15, 15, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              zIndex: 100,
            }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div className="p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.06em] text-white/40">
                  {active.name}
                </span>
                <span
                  className="text-[9px] font-mono px-[6px] py-[2px] rounded-[4px]"
                  style={{
                    background: active.changePositive
                      ? 'rgba(134,239,172,0.15)'
                      : 'rgba(252,165,165,0.15)',
                    color: active.changePositive
                      ? 'var(--color-acc-mid)'
                      : 'var(--color-red-mid)',
                  }}
                >
                  {active.change}
                </span>
              </div>

              <motion.div
                className="text-[36px] font-light tracking-[-0.03em] leading-none mb-1 tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: animateData ? 1 : 0 }}
                transition={{ delay: 0.05 }}
              >
                {active.metric}
              </motion.div>
              <div className="text-[10px] text-white/30 mb-4">{active.metricLabel}</div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: animateData ? 1 : 0 }}
                transition={{ delay: 0.1 }}
              >
                <Sparkline data={active.sparkline} />
              </motion.div>

              <div className="flex flex-col gap-[5px] mb-4">
                {active.months.map((m, mi) => {
                  const max = Math.max(...active.months.map((d) => d.value))
                  return (
                    <div key={m.label} className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-white/30 w-[28px]">{m.label}</span>
                      <div className="flex-1 h-[4px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-white/25"
                          initial={{ width: 0 }}
                          animate={{ width: animateData ? `${(m.value / max) * 100}%` : 0 }}
                          transition={{ delay: 0.15 + mi * 0.04, duration: 0.4, ease: [0, 0, 0.2, 1] }}
                        />
                      </div>
                      <motion.span
                        className="text-[9px] font-mono text-white/30 w-[20px] text-right tabular-nums"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animateData ? 1 : 0 }}
                        transition={{ delay: 0.2 + mi * 0.04 }}
                      >
                        {m.value}
                      </motion.span>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.05em] text-white/30">Target</span>
                <motion.span
                  className="text-[9px] font-mono text-white/50 tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animateData ? 1 : 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {active.targetLabel}
                </motion.span>
              </div>
              <div className="h-[4px] bg-white/5 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full bg-white/30"
                  initial={{ width: 0 }}
                  animate={{ width: animateData ? `${active.target}%` : 0 }}
                  transition={{ delay: 0.45, duration: 0.5, ease: [0, 0, 0.2, 1] }}
                />
              </div>

              <div className="text-[8px] font-mono text-white/15 uppercase tracking-[0.05em]">
                Last updated · {active.lastUpdated}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 200
  const h = 40
  const pad = 4

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: pad + (1 - (v - min) / range) * (h - pad * 2),
  }))

  const d = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')
  const last = points[points.length - 1]

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
      <path d={d} fill="none" stroke="var(--color-acc-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last.x} cy={last.y} r="3" fill="var(--color-acc-mid)" opacity="0.8" />
    </svg>
  )
}
