import { useEffect, useState } from 'react'
import { motion, useTransform, MotionValue } from 'framer-motion'
import PixelBlast from './PixelBlast'

interface DitherPathProps {
  scrollYProgress: MotionValue<number>
}

export default function DitherPath({ scrollYProgress }: DitherPathProps) {
  const [pageHeight, setPageHeight] = useState(6000)

  useEffect(() => {
    const measure = () => setPageHeight(document.documentElement.scrollHeight)
    measure()
    const timer = setTimeout(measure, 500)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const pathLength = useTransform(scrollYProgress, [0, 0.92], [0, 1])
  const pathD = buildNetworkPath(pageHeight)

  return (
    <div
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ height: pageHeight, zIndex: 0 }}
    >
      <svg
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        viewBox={`0 0 1440 ${pageHeight}`}
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="mask-soften">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <mask id="dither-river-mask">
            <rect width="100%" height="100%" fill="black" />

            {/* Soft outer diffusion — light blur, narrow */}
            <motion.path
              d={pathD}
              stroke="white"
              strokeWidth="120"
              strokeLinecap="round"
              fill="none"
              opacity="0.12"
              filter="url(#mask-soften)"
              style={{ pathLength }}
            />

            {/* Core string — no blur, sharp */}
            <motion.path
              d={pathD}
              stroke="white"
              strokeWidth="50"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
              style={{ pathLength }}
            />

            {/* Junction nodes */}
            {getNodes(pageHeight).map((node, i) => (
              <motion.circle
                key={i}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="white"
                filter="url(#mask-soften)"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [Math.max(0, node.scrollAt - 0.03), node.scrollAt],
                    [0, 0.25]
                  ),
                }}
              />
            ))}
          </mask>
        </defs>
      </svg>

      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: pageHeight,
          mask: 'url(#dither-river-mask)',
          WebkitMask: 'url(#dither-river-mask)',
        }}
      >
        <PixelBlast
          pixelSize={3}
          color="#d6d3d1"
          patternScale={2}
          patternDensity={0.9}
          edgeFade={0}
          speed={0.3}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
        />
      </div>
    </div>
  )
}

function buildNetworkPath(totalHeight: number): string {
  const cx = 1000
  const amplitude = 180
  const segments: string[] = []

  segments.push(`M ${cx} 0`)

  const steps = Math.floor(totalHeight / 400)
  for (let i = 0; i < steps; i++) {
    const y1 = i * 400 + 100
    const y2 = i * 400 + 300
    const yEnd = (i + 1) * 400
    const xOffset = Math.sin(i * 0.8) * amplitude
    const xOffset2 = Math.sin((i + 0.5) * 0.8) * amplitude * 0.7

    segments.push(
      `C ${cx + xOffset * 0.3} ${y1}, ${cx + xOffset} ${y2}, ${cx + xOffset2} ${yEnd}`
    )
  }

  return segments.join(' ')
}

function getNodes(totalHeight: number) {
  const cx = 1000
  const steps = Math.floor(totalHeight / 400)
  const nodes: Array<{ x: number; y: number; r: number; scrollAt: number }> = []

  for (let i = 1; i < steps; i++) {
    const y = i * 400
    const xOffset = Math.sin((i - 0.5) * 0.8) * 180 * 0.7
    nodes.push({
      x: cx + xOffset,
      y,
      r: 50 + (i % 3) * 15,
      scrollAt: (y / totalHeight) * 0.92,
    })
  }

  return nodes
}
