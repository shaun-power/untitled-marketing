import { useEffect, useRef } from 'react'
import { buildGraph, type BuiltGraph, type GraphNode } from './graphData'

// Bounded 3D knowledge-graph canvas — ported from the Trellis hero engine,
// trimmed for a container-sized panel. Starts the animation on scroll-into-view.

// Accent tuned to the cyan palette (#0e7490 / #67e8f9).
const ACCENT = 'oklch(0.64 0.12 210)'
const ACCENT_MID = 'oklch(0.82 0.12 210)'
const INK = 'oklch(0.22 0.018 255)'
const PAPER = 'oklch(0.98 0.005 100)'

type Projected = { sx: number; sy: number; z: number; scale: number }

export default function AdaptiveGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    type Waypoint = { nodeId: string; dwell: number; orbit: number }
    const state = {
      graph: null as BuiltGraph | null,
      camYaw: 0,
      camPitch: -0.18,
      camDist: 820,
      camTarget: { x: 0, y: 0, z: 0 },
      tourIdx: 0,
      tourT: 0,
      tourDwell: 3.4,
      t0: performance.now(),
      lastT: performance.now(),
      now: performance.now(),
      revealed: new Map<string, number>(),
      focusedId: null as string | null,
      ditherPattern: null as CanvasPattern | null,
      running: false,
      tour: null as Waypoint[] | null,
    }

    const buildGraphLocal = () => {
      state.graph = buildGraph(0.9)
      state.graph.nodes.forEach((n) => {
        if (n.kind === 'anchor') state.revealed.set(n.id, 0)
      })
    }

    const makeDither = (density: number, size: number): CanvasPattern | null => {
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const g = c.getContext('2d')
      if (!g) return null
      g.fillStyle = INK
      const dotCount = Math.floor(size * size * density * 0.6)
      for (let i = 0; i < dotCount; i++) {
        g.fillRect(Math.floor(Math.random() * size), Math.floor(Math.random() * size), 1, 1)
      }
      return ctx.createPattern(c, 'repeat')
    }

    const project = (p: { x: number; y: number; z: number }): Projected => {
      const cy = Math.cos(state.camYaw)
      const sy = Math.sin(state.camYaw)
      const cp = Math.cos(state.camPitch)
      const sp = Math.sin(state.camPitch)
      let x = p.x - state.camTarget.x
      let y = p.y - state.camTarget.y
      let z = p.z - state.camTarget.z
      const xr = cy * x + sy * z
      const zr = -sy * x + cy * z
      x = xr
      z = zr
      const yr = cp * y - sp * z
      const zr2 = sp * y + cp * z
      y = yr
      z = zr2
      z += state.camDist
      const f = Math.max(420, W * 0.85)
      const inv = 1 / Math.max(0.01, z)
      return { sx: W / 2 + x * f * inv, sy: H / 2 - y * f * inv, z, scale: f * inv }
    }

    const tourWaypoints = (): Waypoint[] => {
      if (state.tour) return state.tour
      const out: Waypoint[] = []
      state.graph!.domains.forEach((d) => {
        const anchor = state.graph!.byId[d.id]
        if (!anchor) return
        out.push({ nodeId: d.id, dwell: 1.0, orbit: 0.6 })
        const kids = state
          .graph!.nodes.filter(
            (n) =>
              n.domain === d.id &&
              n.kind === 'satellite' &&
              ['claim', 'decision', 'evidence'].includes(n.type)
          )
          .slice(0, 2)
        kids.forEach((k) => out.push({ nodeId: k.id, dwell: 0.8, orbit: 0.3 }))
      })
      state.tour = out
      return out
    }

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const hashId = (s: string) => {
      let h = 0
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
      return Math.abs(h)
    }

    const updateCamera = (dt: number) => {
      const g = state.graph!
      const wps = tourWaypoints()
      const dwell = (wps[state.tourIdx]?.dwell || 1) * state.tourDwell
      state.tourT += dt / dwell
      if (state.tourT >= 1) {
        state.tourT = 0
        state.tourIdx = (state.tourIdx + 1) % wps.length
      }

      const to = wps[state.tourIdx]
      const from = wps[(state.tourIdx - 1 + wps.length) % wps.length]
      const fn = g.byId[from.nodeId]
      const tn = g.byId[to.nodeId]
      if (!fn || !tn) return
      const tt = easeInOut(state.tourT)
      state.camTarget.x = lerp(fn.x, tn.x, tt)
      state.camTarget.y = lerp(fn.y, tn.y, tt)
      state.camTarget.z = lerp(fn.z, tn.z, tt)
      const baseYaw = Math.atan2(tn.x, tn.z) + Math.PI
      state.camYaw = baseYaw + Math.sin(state.now * 0.0005) * (to.orbit || 0.4) + tt * 0.3
      state.camPitch = -0.2 + Math.sin(state.now * 0.00025) * 0.05
      const depth = tn.depth || 0
      state.camDist = lerp(680, 500 - depth * 30, tt)
      state.focusedId = to.nodeId

      if (tt > 0.35) {
        if (!state.revealed.has(to.nodeId)) state.revealed.set(to.nodeId, state.now)
        g.edges.forEach((e) => {
          if (e.from === to.nodeId && !state.revealed.has(e.to)) {
            const stag = (hashId(e.to) % 10) * 0.03
            if (tt > 0.4 + stag) state.revealed.set(e.to, state.now)
          }
        })
        g.nodes.forEach((n) => {
          if (state.revealed.has(n.id)) return
          const d = Math.hypot(n.x - tn.x, n.y - tn.y, n.z - tn.z)
          if (d < 130 + tt * 100) state.revealed.set(n.id, state.now)
        })
      }
    }

    const fadeFor = (p: Projected) => {
      if (p.z < 50) return 0
      return clamp(1 - (p.z - 320) / 1600, 0.18, 1)
    }
    const revealProgress = (id: string) => {
      const r = state.revealed.get(id)
      if (r == null) return 0
      return clamp((state.now - r) / 1000 / 0.8, 0, 1)
    }

    const drawBackground = () => {
      const steps = 7
      ctx.save()
      for (let axis = 0; axis < 2; axis++) {
        for (let i = -steps; i <= steps; i++) {
          const a =
            axis === 1
              ? { x: i * 220, y: 0, z: -2000 }
              : { x: -2000, y: 0, z: i * 220 }
          const b =
            axis === 1
              ? { x: i * 220, y: 0, z: 2000 }
              : { x: 2000, y: 0, z: i * 220 }
          const pa = project(a)
          const pb = project(b)
          if (pa.z < 50 && pb.z < 50) continue
          ctx.strokeStyle = 'oklch(0.22 0.018 255 / 0.04)'
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(pa.sx, pa.sy)
          ctx.lineTo(pb.sx, pb.sy)
          ctx.stroke()
        }
      }
      ctx.restore()
    }

    const drawJagged = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1
      const dy = y2 - y1
      const len = Math.hypot(dx, dy)
      const segs = Math.max(4, Math.floor(len / 14))
      const nx = -dy / len
      const ny = dx / len
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      for (let i = 1; i < segs; i++) {
        const t = i / segs
        const j = (i % 2 === 0 ? 1 : -1) * 3
        ctx.lineTo(x1 + dx * t + nx * j, y1 + dy * t + ny * j)
      }
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    const drawEdges = () => {
      const g = state.graph!
      const list: Array<{ from: string; to: string; kind: string }> = []
      g.edges.forEach((e) => list.push({ ...e, kind: e.kind || 'supports' }))
      g.cross.forEach((e) => list.push({ ...e, kind: e.kind || 'influence' }))
      g.contradictions.forEach((e) => list.push({ from: e.from, to: e.to, kind: 'contradiction' }))

      list.forEach((e) => {
        const a = g.byId[e.from]
        const b = g.byId[e.to]
        if (!a || !b) return
        const ra = revealProgress(a.id)
        const rb = revealProgress(b.id)
        if (ra <= 0 || rb <= 0) return
        const pa = project(a)
        const pb = project(b)
        if (pa.z < 50 || pb.z < 50) return
        const alpha = Math.min(fadeFor(pa), fadeFor(pb)) * Math.min(ra, rb)
        if (alpha < 0.02) return

        ctx.save()
        if (e.kind === 'contradiction') {
          ctx.strokeStyle = `oklch(0.58 0.16 25 / ${alpha * 1.0})`
          ctx.lineWidth = 1.25
          drawJagged(pa.sx, pa.sy, pb.sx, pb.sy)
        } else if (e.kind === 'influence') {
          ctx.strokeStyle = `oklch(0.22 0.018 255 / ${alpha * 0.32})`
          ctx.lineWidth = 0.8
          ctx.setLineDash([3, 4])
          ctx.beginPath()
          ctx.moveTo(pa.sx, pa.sy)
          ctx.lineTo(pb.sx, pb.sy)
          ctx.stroke()
          ctx.setLineDash([])
        } else {
          ctx.strokeStyle = `oklch(0.22 0.018 255 / ${alpha * 0.55})`
          ctx.lineWidth = a.kind === 'anchor' || b.kind === 'anchor' ? 1.05 : 0.75
          ctx.beginPath()
          ctx.moveTo(pa.sx, pa.sy)
          const mx = (pa.sx + pb.sx) / 2
          const my = (pa.sy + pb.sy) / 2 + Math.sin((hashId(e.from + e.to) % 100) / 16) * 5
          ctx.quadraticCurveTo(mx, my, pb.sx, pb.sy)
          ctx.stroke()
        }
        ctx.restore()
      })
    }

    const drawGlyph = (
      n: GraphNode,
      p: Projected,
      size: number,
      alpha: number,
      isFocus: boolean,
      rev: number
    ) => {
      const ink = `oklch(0.22 0.018 255 / ${alpha})`
      const inkFill = `oklch(0.22 0.018 255 / ${alpha * 0.92})`
      const accFill = `oklch(0.64 0.12 210 / ${alpha})`
      const s = size * (0.4 + 0.6 * easeOutCubic(rev))
      ctx.save()
      ctx.translate(p.sx, p.sy)

      if (isFocus) {
        ctx.strokeStyle = `oklch(0.64 0.12 210 / ${alpha * 0.5})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.arc(0, 0, s + 10, 0, Math.PI * 2)
        ctx.stroke()
        ctx.strokeStyle = `oklch(0.64 0.12 210 / ${alpha * 0.22})`
        ctx.beginPath()
        ctx.arc(0, 0, s + 18 + Math.sin(state.now * 0.004) * 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      switch (n.type) {
        case 'problem': {
          const r = s * 1.4
          ctx.strokeStyle = ink
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.arc(0, 0, r, 0, Math.PI * 2)
          ctx.stroke()
          if (state.ditherPattern) {
            ctx.globalAlpha = alpha * 0.7
            ctx.fillStyle = state.ditherPattern
            ctx.beginPath()
            ctx.arc(0, 0, r - 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1
          }
          ctx.fillStyle = ink
          ctx.beginPath()
          ctx.arc(0, 0, 1.5, 0, Math.PI * 2)
          ctx.fill()
          break
        }
        case 'claim': {
          ctx.fillStyle = inkFill
          ctx.beginPath()
          ctx.arc(0, 0, s * 0.95, 0, Math.PI * 2)
          ctx.fill()
          break
        }
        case 'mechanism': {
          const r = s
          ctx.strokeStyle = ink
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.arc(0, 0, r, 0, Math.PI * 2)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(-r * 1.3, 0)
          ctx.lineTo(r * 1.3, 0)
          ctx.stroke()
          break
        }
        case 'evidence': {
          const r = s * 0.9
          if (state.ditherPattern) {
            ctx.globalAlpha = alpha * 0.85
            ctx.fillStyle = state.ditherPattern
            ctx.fillRect(-r, -r, r * 2, r * 2)
            ctx.globalAlpha = 1
          }
          ctx.strokeStyle = ink
          ctx.lineWidth = 1.1
          ctx.strokeRect(-r, -r, r * 2, r * 2)
          break
        }
        case 'assumption': {
          const r = s * 1.15
          ctx.strokeStyle = ink
          ctx.lineWidth = 1.1
          ctx.setLineDash([2.5, 2.5])
          ctx.beginPath()
          ctx.moveTo(0, -r)
          ctx.lineTo(r, 0)
          ctx.lineTo(0, r)
          ctx.lineTo(-r, 0)
          ctx.closePath()
          ctx.stroke()
          ctx.setLineDash([])
          break
        }
        case 'decision': {
          const r = s * 1.1
          ctx.fillStyle = isFocus ? accFill : inkFill
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2
            const x = Math.cos(a) * r
            const y = Math.sin(a) * r
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
          break
        }
        case 'outcome': {
          const r = s * 1.15
          ctx.fillStyle = accFill
          ctx.beginPath()
          ctx.moveTo(0, -r)
          ctx.lineTo(r * 0.9, r * 0.75)
          ctx.lineTo(-r * 0.9, r * 0.75)
          ctx.closePath()
          ctx.fill()
          break
        }
        default:
          ctx.fillStyle = inkFill
          ctx.beginPath()
          ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2)
          ctx.fill()
      }
      ctx.restore()
    }

    const drawLabel = (n: GraphNode, p: Projected, alpha: number, isFocus: boolean) => {
      if (!n.label) return
      const showAlways = n.kind === 'anchor' || n.type === 'decision' || n.type === 'outcome'
      const isFamily = state.graph!.edges.some((e) => e.from === state.focusedId && e.to === n.id)
      if (!showAlways && !isFamily && !isFocus) return
      const la = alpha * (isFocus ? 1 : isFamily ? 0.85 : 0.7)
      if (la < 0.1) return

      ctx.save()
      const size = n.kind === 'anchor' ? 10.5 : 9
      const weight = n.kind === 'anchor' ? 600 : 400
      const family = n.kind === 'anchor' ? 'Inter Tight' : 'JetBrains Mono'
      ctx.font = `${weight} ${size}px ${family}, sans-serif`
      const m = ctx.measureText(n.label)
      const padX = 5
      const padY = 3
      const boxW = m.width + padX * 2
      const boxH = size + padY * 2
      const ox = 11
      const oy = n.kind === 'anchor' ? -6 : 10
      const bx = p.sx + ox
      const by = p.sy + oy - boxH / 2

      ctx.strokeStyle = `oklch(0.22 0.018 255 / ${la * 0.5})`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(p.sx + 3, p.sy)
      ctx.lineTo(bx, by + boxH / 2)
      ctx.stroke()

      ctx.fillStyle = `oklch(0.98 0.005 100 / ${la * 0.88})`
      ctx.fillRect(bx, by, boxW, boxH)
      ctx.fillStyle = `oklch(0.22 0.018 255 / ${la})`
      ctx.textBaseline = 'middle'
      ctx.fillText(n.label, bx + padX, by + boxH / 2)
      ctx.restore()
    }

    const drawNodes = () => {
      const g = state.graph!
      const projected = g.nodes
        .map((n) => ({ n, p: project(n) }))
        .filter((o) => o.p.z > 50)
        .sort((a, b) => b.p.z - a.p.z)

      projected.forEach(({ n, p }) => {
        const rev = revealProgress(n.id)
        if (rev <= 0) return
        const alpha = fadeFor(p) * rev
        if (alpha < 0.02) return
        const isFocus = state.focusedId === n.id
        const base = n.kind === 'anchor' ? 7.8 : n.kind === 'dust' ? 2.1 : 4.5
        drawGlyph(n, p, base * p.scale * 1.6, alpha, isFocus, rev)
      })
      projected.forEach(({ n, p }) => {
        const rev = revealProgress(n.id)
        if (rev <= 0.4) return
        drawLabel(n, p, fadeFor(p) * rev, state.focusedId === n.id)
      })
    }

    const loop = () => {
      if (!state.running) return
      const now = performance.now()
      const dt = Math.min(0.06, (now - state.lastT) / 1000)
      state.lastT = now
      state.now = now
      ctx.clearRect(0, 0, W, H)
      if (state.graph) {
        updateCamera(dt)
        drawBackground()
        drawEdges()
        drawNodes()
      }
      requestAnimationFrame(loop)
    }

    const start = () => {
      if (state.running) return
      if (!state.graph) buildGraphLocal()
      if (!state.graph) return
      state.ditherPattern = makeDither(0.35, 4)
      state.running = true
      state.lastT = performance.now()
      requestAnimationFrame(loop)
    }
    const stop = () => {
      state.running = false
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? start() : stop()))
      },
      { threshold: 0.2 }
    )
    io.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  // ACCENT / ACCENT_MID / PAPER are defined for future extension; silence the unused-var lint.
  void ACCENT
  void ACCENT_MID
  void PAPER

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ background: 'transparent' }}
    />
  )
}
