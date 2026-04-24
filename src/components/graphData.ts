// Hierarchical knowledge graph data for the adaptive-model animation.
// Ported from /Users/shaunpower/Downloads/hierarchical hero animation/graph-data.js

export type NodeType =
  | 'problem'
  | 'claim'
  | 'evidence'
  | 'assumption'
  | 'decision'
  | 'outcome'
  | 'mechanism'

export type NodeKind = 'anchor' | 'satellite' | 'dust'

export type GraphNode = {
  id: string
  type: NodeType
  label: string
  x: number
  y: number
  z: number
  depth: number
  domain: string
  kind: NodeKind
  scope?: string
  confidence?: number
}

export type GraphEdge = {
  from: string
  to: string
  kind: 'supports' | 'contains' | 'contradiction' | 'influence' | 'evidence'
  label?: string
}

export type DomainDef = {
  id: string
  label: string
  type: NodeType
  children: Array<{
    id: string
    type: NodeType
    label: string
    scope?: string
    confidence?: number
    parentId?: string
  }>
}

const DOMAINS: DomainDef[] = [
  {
    id: 'checkout',
    label: 'Checkout friction',
    type: 'problem',
    children: [
      { id: 'c1', type: 'claim', label: 'Drop-off concentrated at payment step' },
      { id: 'c2', type: 'claim', label: 'Mobile users abandon 2.3× more' },
      { id: 'm1', type: 'mechanism', label: 'Cognitive load at card entry' },
      { id: 'e1', type: 'evidence', label: 'Funnel analysis Q1 · n=18k', scope: 'US · mid-market', confidence: 0.82, parentId: 'c1' },
      { id: 'e2', type: 'evidence', label: 'Usability study · 12 sessions', scope: 'iOS · SMB', confidence: 0.54, parentId: 'c2' },
      { id: 'a1', type: 'assumption', label: 'Pricing elasticity holds', confidence: 0.3 },
      { id: 'd1', type: 'decision', label: 'Ship one-tap autofill · v2.1' },
      { id: 'o1', type: 'outcome', label: '+7.4% conversion · 30d', parentId: 'd1' },
    ],
  },
  {
    id: 'churn',
    label: 'Mid-market churn',
    type: 'problem',
    children: [
      { id: 'ch_c1', type: 'claim', label: 'Annual contracts churn at renewal' },
      { id: 'ch_c2', type: 'claim', label: 'Feature adoption predicts retention' },
      { id: 'ch_m1', type: 'mechanism', label: 'Champion turnover' },
      { id: 'ch_e1', type: 'evidence', label: 'Cohort analysis · 2024 renewals', scope: '$50–250k ACV', confidence: 0.88, parentId: 'ch_c1' },
      { id: 'ch_e2', type: 'evidence', label: 'CSM interviews · 22 accounts', scope: 'EMEA', confidence: 0.61, parentId: 'ch_c2' },
      { id: 'ch_e3', type: 'evidence', label: 'Product telemetry · 6mo', scope: 'all segments', confidence: 0.79, parentId: 'ch_c2' },
      { id: 'ch_a1', type: 'assumption', label: 'Exec sponsor still engaged', confidence: 0.42 },
      { id: 'ch_d1', type: 'decision', label: 'Invest in champion enablement' },
    ],
  },
  {
    id: 'activation',
    label: 'Activation drop-off',
    type: 'problem',
    children: [
      { id: 'ac_c1', type: 'claim', label: 'Day-1 setup predicts 30d retention' },
      { id: 'ac_c2', type: 'claim', label: 'Integrations accelerate time-to-value' },
      { id: 'ac_m1', type: 'mechanism', label: 'First-value lag' },
      { id: 'ac_e1', type: 'evidence', label: 'Activation funnel · Q3', scope: 'self-serve', confidence: 0.91, parentId: 'ac_c1' },
      { id: 'ac_e2', type: 'evidence', label: 'A/B test · onboarding v4', scope: 'new signups', confidence: 0.73, parentId: 'ac_c1' },
      { id: 'ac_a1', type: 'assumption', label: 'Users want depth over speed', confidence: 0.35 },
      { id: 'ac_d1', type: 'decision', label: 'Default to template-first flow' },
      { id: 'ac_o1', type: 'outcome', label: 'Activation +18% · 14d', parentId: 'ac_d1' },
    ],
  },
  {
    id: 'expansion',
    label: 'Mid-market expansion',
    type: 'problem',
    children: [
      { id: 'ex_c1', type: 'claim', label: 'Platform teams drive seat growth' },
      { id: 'ex_c2', type: 'claim', label: 'Security review gates deals' },
      { id: 'ex_m1', type: 'mechanism', label: 'Viral loop through shared workspaces' },
      { id: 'ex_e1', type: 'evidence', label: 'Expansion cohort · 2025', scope: 'enterprise', confidence: 0.76, parentId: 'ex_c1' },
      { id: 'ex_e2', type: 'evidence', label: 'Deal desk review · 40 deals', scope: '$100k+ ACV', confidence: 0.68, parentId: 'ex_c2' },
      { id: 'ex_a1', type: 'assumption', label: 'SOC 2 Type II sufficient', confidence: 0.55 },
      { id: 'ex_d1', type: 'decision', label: 'Prioritize SSO & audit logs' },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing architecture',
    type: 'problem',
    children: [
      { id: 'pr_c1', type: 'claim', label: 'Seat-based caps growth' },
      { id: 'pr_c2', type: 'claim', label: 'Usage pricing lifts NRR' },
      { id: 'pr_m1', type: 'mechanism', label: 'Value-unit alignment' },
      { id: 'pr_e1', type: 'evidence', label: 'NRR analysis · usage peers', scope: 'benchmarks', confidence: 0.64, parentId: 'pr_c2' },
      { id: 'pr_e2', type: 'evidence', label: 'Win/loss · 2025 H1', scope: 'mid-market', confidence: 0.58, parentId: 'pr_c1' },
      { id: 'pr_a1', type: 'assumption', label: 'Buyers accept variable cost', confidence: 0.28 },
      { id: 'pr_d1', type: 'decision', label: 'Pilot hybrid pricing · Q4' },
    ],
  },
]

const CONTRADICTIONS: Array<{ a: string; b: string; label: string }> = [
  { a: 'e1', b: 'ac_e2', label: 'Scope conflict · US vs global' },
  { a: 'ch_e2', b: 'ch_e3', label: 'Qualitative ≠ telemetry' },
  { a: 'a1', b: 'pr_a1', label: 'Assumption collision' },
]

const CROSS_LINKS: Array<{ a: string; b: string; kind: GraphEdge['kind'] }> = [
  { a: 'd1', b: 'ac_d1', kind: 'influence' },
  { a: 'ch_d1', b: 'ex_d1', kind: 'influence' },
  { a: 'pr_d1', b: 'ex_c1', kind: 'evidence' },
]

export type BuiltGraph = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  contradictions: GraphEdge[]
  cross: GraphEdge[]
  byId: Record<string, GraphNode>
  domains: DomainDef[]
}

export function buildGraph(density: number): BuiltGraph {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const byId: Record<string, GraphNode> = {}

  const rDomain = 340
  DOMAINS.forEach((domain, di) => {
    const theta = (di / DOMAINS.length) * Math.PI * 2
    const ax = Math.cos(theta) * rDomain
    const az = Math.sin(theta) * rDomain
    const ay = 0

    const anchor: GraphNode = {
      id: domain.id,
      type: domain.type,
      label: domain.label,
      x: ax,
      y: ay,
      z: az,
      depth: 0,
      domain: domain.id,
      kind: 'anchor',
    }
    nodes.push(anchor)
    byId[domain.id] = anchor

    const children = domain.children.slice(
      0,
      Math.max(4, Math.round(domain.children.length * density))
    )
    children.forEach((c, ci) => {
      const phi = (ci / children.length) * Math.PI * 2
      const tier = c.type === 'claim' || c.type === 'mechanism' ? 1 : c.type === 'decision' ? 1 : 2
      const rLocal = 70 + tier * 60
      const yOff =
        c.type === 'decision'
          ? 45
          : c.type === 'outcome'
          ? 75
          : ci % 2 === 0
          ? 20
          : -20
      const pull = 1 - (rLocal / 600) * 0.15
      const nx = ax * pull + Math.cos(phi) * rLocal
      const nz = az * pull + Math.sin(phi) * rLocal
      const ny = ay + yOff + Math.sin(phi * 2 + di) * 18

      const node: GraphNode = {
        id: c.id,
        type: c.type,
        label: c.label,
        scope: c.scope,
        confidence: c.confidence,
        x: nx,
        y: ny,
        z: nz,
        depth: tier,
        domain: domain.id,
        kind: 'satellite',
      }
      nodes.push(node)
      byId[c.id] = node

      const parent = c.parentId ? byId[c.parentId] : anchor
      if (parent) {
        edges.push({ from: parent.id, to: node.id, kind: c.parentId ? 'supports' : 'contains' })
      }
    })

    const extras = Math.max(0, Math.round(6 * density))
    for (let k = 0; k < extras; k++) {
      const phi = Math.random() * Math.PI * 2
      const rLocal = 160 + Math.random() * 80
      const nx = ax + Math.cos(phi) * rLocal
      const nz = az + Math.sin(phi) * rLocal
      const ny = ay + (Math.random() - 0.5) * 90
      const types: NodeType[] = ['evidence', 'evidence', 'assumption', 'claim']
      const t = types[Math.floor(Math.random() * types.length)]
      const id = `${domain.id}_x${k}`
      const node: GraphNode = {
        id,
        type: t,
        label: '',
        x: nx,
        y: ny,
        z: nz,
        depth: 3,
        domain: domain.id,
        kind: 'dust',
      }
      nodes.push(node)
      byId[id] = node
      const candidates = nodes.filter((n) => n.domain === domain.id && n.kind !== 'dust' && n.id !== id)
      if (candidates.length) {
        const p = candidates[Math.floor(Math.random() * candidates.length)]
        edges.push({ from: p.id, to: id, kind: 'supports' })
      }
    }
  })

  const contradictions = CONTRADICTIONS.filter((c) => byId[c.a] && byId[c.b]).map(
    (c) => ({ from: c.a, to: c.b, label: c.label, kind: 'contradiction' as const })
  )
  const cross = CROSS_LINKS.filter((c) => byId[c.a] && byId[c.b]).map((c) => ({
    from: c.a,
    to: c.b,
    kind: c.kind,
  }))

  return { nodes, edges, contradictions, cross, byId, domains: DOMAINS }
}
