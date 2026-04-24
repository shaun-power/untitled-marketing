// Static "agent query, deconstructed" diagram: ASK → CALL → ANSWER.
// Replaces the animated ClaudeTerminal — one reading path, scannable in 5s.

export default function AgentQueryDiagram() {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="rounded-[12px] p-6 relative bg-wh"
        style={{
          border: '1px solid color-mix(in srgb, var(--color-g100) 70%, transparent)',
          boxShadow: '0 1px 0 color-mix(in srgb, var(--color-g100) 50%, transparent)',
        }}
      >
        <div
          className="grid gap-5 relative max-[960px]:gap-8 max-[720px]:grid-cols-1"
          style={{ gridTemplateColumns: '1fr 1fr 1.7fr' }}
        >
          <AskColumn />
          <CallColumn />
          <AnswerColumn />
        </div>
      </div>

      <DifferentiatorRow />
    </div>
  )
}

/* ─── Column 1 · ASK ─────────────────────────────────────────────────── */

function AskColumn() {
  return (
    <div className="flex flex-col relative">
      <ColumnLabel num="①" label="Ask" />
      <div
        className="rounded-[10px] p-4 flex gap-3 items-start"
        style={{
          background: 'var(--color-g50)',
          border: '1px solid color-mix(in srgb, var(--color-g100) 70%, transparent)',
        }}
      >
        <span
          className="font-mono text-[12px] shrink-0 mt-[2px]"
          style={{ color: 'var(--color-g400)' }}
        >
          &gt;
        </span>
        <div className="text-[13.5px] leading-[1.5] text-bk">
          What do we know about{' '}
          <span className="font-medium">checkout friction in enterprise</span>? Recommend next quarter's bet.
        </div>
      </div>
      <ColumnFoot>an agent (Claude, internal copilot, workflow bot…)</ColumnFoot>

      {/* arrow → call */}
      <Arrow side="right" />
    </div>
  )
}

/* ─── Column 2 · CALL ────────────────────────────────────────────────── */

function CallColumn() {
  return (
    <div className="flex flex-col relative">
      <ColumnLabel num="②" label="Call" />
      <div
        className="rounded-[10px] font-mono overflow-hidden"
        style={{
          background: '#0F1416',
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: 11.5,
          lineHeight: 1.7,
        }}
      >
        <div
          className="px-3 py-[6px] text-[10px] tracking-[0.06em]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          mcp · signal
        </div>
        <div className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.72)' }}>
          <div>
            <span style={{ color: 'rgba(180,220,255,0.85)' }}>signal</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>.</span>
            <span style={{ color: 'rgba(180,220,255,0.95)' }}>query</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>({'{'}</span>
          </div>
          <Arg k="domain" v={`"checkout-friction"`} />
          <Arg k="segment" v={`"enterprise"`} />
          <Arg k="fresh" v={`"<30d"`} />
          <div style={{ color: 'rgba(255,255,255,0.44)' }}>
            {'  '}include: <span style={{ color: 'rgba(190,230,255,0.92)' }}>[</span>
          </div>
          <div style={{ paddingLeft: 16, color: 'rgba(103,232,249,0.85)' }}>
            problems, contradictions,
          </div>
          <div style={{ paddingLeft: 16, color: 'rgba(103,232,249,0.85)' }}>
            evidence, scope_gaps
          </div>
          <div style={{ color: 'rgba(255,255,255,0.44)' }}>
            {'  '}<span style={{ color: 'rgba(190,230,255,0.92)' }}>]</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>{'})'}</div>
        </div>
        <div
          className="px-4 py-[6px] text-[10px] flex items-center gap-2"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <span style={{ color: 'rgba(140,230,170,0.9)' }}>→</span>
          typed result
        </div>
      </div>
      <ColumnFoot>a single tool call, typed at every edge</ColumnFoot>

      {/* arrow → answer */}
      <Arrow side="right" />
    </div>
  )
}

function Arg({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ color: 'rgba(255,255,255,0.44)' }}>
      {'  '}
      <span style={{ color: 'rgba(200,200,210,0.85)' }}>{k}</span>
      <span>:{' '}</span>
      <span style={{ color: 'rgba(103,232,249,0.95)' }}>{v}</span>
      <span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>
    </div>
  )
}

/* ─── Column 3 · ANSWER (payoff) ────────────────────────────────────── */

function AnswerColumn() {
  return (
    <div className="flex flex-col relative">
      <ColumnLabel num="③" label="Answer" />
      <div
        className="rounded-[10px] p-4 flex flex-col gap-3"
        style={{
          background: 'var(--color-wh)',
          border: '1px solid color-mix(in srgb, var(--color-g100) 70%, transparent)',
        }}
      >
        <StatsStrip />
        <PrimaryClaim />
        <Banner tone="amb" label="Scope gap">
          24% lift observed on <strong className="text-bk">SMB</strong> — enterprise UNTESTED. Result may not generalise.
        </Banner>
        <Banner tone="red" label="Contradiction">
          SSO-cost finding conflicts with <strong className="text-bk">2025-Q3 SMB research</strong>.
        </Banner>
        <RecommendedBet />
      </div>
      <ColumnFoot>typed evidence — scoped, cited, contradiction-aware</ColumnFoot>
    </div>
  )
}

function StatsStrip() {
  const stats = [
    { v: '3', k: 'problems' },
    { v: '18', k: 'evidence' },
    { v: '2', k: 'contradictions', tone: 'red' as const },
    { v: '1', k: 'scope-gap', tone: 'amb' as const },
  ]
  return (
    <div className="grid grid-cols-4 gap-[6px]">
      {stats.map((s) => (
        <div
          key={s.k}
          className="rounded-[6px] px-[8px] py-[6px]"
          style={{
            background: 'var(--color-g50)',
            border: '1px solid color-mix(in srgb, var(--color-g100) 70%, transparent)',
          }}
        >
          <div
            className="text-[17px] font-light tabular-nums leading-none"
            style={{
              color:
                s.tone === 'red'
                  ? 'var(--color-red)'
                  : s.tone === 'amb'
                  ? 'var(--color-amb)'
                  : 'var(--color-bk)',
            }}
          >
            {s.v}
          </div>
          <div className="text-[9px] font-mono text-g400 uppercase tracking-[0.06em] mt-[3px]">
            {s.k}
          </div>
        </div>
      ))}
    </div>
  )
}

function PrimaryClaim() {
  return (
    <div
      className="rounded-[8px] p-3"
      style={{
        background: 'var(--color-wh)',
        border: '1px solid color-mix(in srgb, var(--color-g100) 70%, transparent)',
      }}
    >
      <div className="flex items-center justify-between mb-[6px]">
        <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-g400">
          Primary claim
        </div>
        <span
          className="px-[7px] py-[1px] rounded-full text-[9.5px] font-mono"
          style={{
            background: 'var(--color-acc-light)',
            color: 'var(--color-acc)',
            border: '1px solid color-mix(in srgb, var(--color-acc-mid) 60%, transparent)',
          }}
        >
          tested
        </span>
      </div>
      <div className="text-[13.5px] font-medium text-bk leading-[1.35] mb-[8px]">
        Form complexity at PO step
      </div>
      <div className="flex items-center gap-[10px] font-mono text-[10.5px] text-g500 flex-wrap">
        <span>n = 2,812</span>
        <span className="text-g300">·</span>
        <span>conf 0.82</span>
        <span className="text-g300">·</span>
        <div className="flex items-center gap-[3px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="block"
              style={{
                width: 8,
                height: 4,
                borderRadius: 1,
                background: i < 4 ? 'var(--color-acc-mid)' : 'var(--color-g100)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Banner({
  tone,
  label,
  children,
}: {
  tone: 'amb' | 'red'
  label: string
  children: React.ReactNode
}) {
  const palette =
    tone === 'red'
      ? {
          bg: 'color-mix(in srgb, var(--color-red) 6%, transparent)',
          border: 'color-mix(in srgb, var(--color-red) 35%, transparent)',
          accent: 'var(--color-red)',
          glyph: '⚠',
        }
      : {
          bg: 'color-mix(in srgb, var(--color-amb) 8%, transparent)',
          border: 'color-mix(in srgb, var(--color-amb) 35%, transparent)',
          accent: 'var(--color-amb)',
          glyph: '⤷',
        }
  return (
    <div
      className="rounded-[8px] px-3 py-[10px] flex gap-[10px] items-start"
      style={{ background: palette.bg, border: `1px solid ${palette.border}`, borderLeftWidth: 3 }}
    >
      <span className="text-[13px] shrink-0 leading-[1]" style={{ color: palette.accent, marginTop: 1 }}>
        {palette.glyph}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-mono uppercase tracking-[0.1em] mb-[3px]"
          style={{ color: palette.accent }}
        >
          {label}
        </div>
        <div className="text-[12.5px] text-g600 leading-[1.45]">{children}</div>
      </div>
    </div>
  )
}

function RecommendedBet() {
  return (
    <div
      className="rounded-[8px] p-[14px]"
      style={{
        background: 'color-mix(in srgb, var(--color-acc) 7%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-acc) 30%, transparent)',
      }}
    >
      <div className="flex items-center gap-[6px] text-[10px] font-mono uppercase tracking-[0.1em] text-acc mb-[6px]">
        <span>▸</span>
        <span>Recommended bet</span>
      </div>
      <div className="font-mono text-[13.5px] font-medium text-bk mb-[4px]">
        enterprise-checkout-v2
      </div>
      <div className="text-[12px] text-g500 leading-[1.5]">
        Scope to accounts with <strong className="text-bk">ACV &gt; $250k</strong>. Gate on{' '}
        <strong className="text-bk">exp-v3</strong> across 3+ enterprise customers before rollout.
        Flag SSO contradiction for human review.
      </div>
    </div>
  )
}

/* ─── shared bits ────────────────────────────────────────────────────── */

function ColumnLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="inline-flex items-center justify-center rounded-full text-[10px] font-mono"
        style={{
          width: 18,
          height: 18,
          background: 'var(--color-acc-subtle)',
          color: 'var(--color-acc)',
          border: '1px solid color-mix(in srgb, var(--color-acc-mid) 50%, transparent)',
        }}
      >
        {num}
      </span>
      <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-g500">{label}</span>
    </div>
  )
}

function ColumnFoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] text-g400 leading-[1.4] mt-3 max-w-[90%]">{children}</div>
  )
}

/**
 * Arrow glyph positioned on the right edge of a column, centred vertically on
 * the primary content block. Hidden at narrow widths where columns stack.
 */
function Arrow({ side }: { side: 'right' }) {
  void side
  return (
    <div
      aria-hidden
      className="absolute max-[720px]:hidden"
      style={{
        top: 44, // aligns ~ with the top of the content card
        right: -18,
        width: 26,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        color: 'var(--color-g300)',
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          flex: 1,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-g300) 80%, transparent))',
        }}
      />
      <span style={{ transform: 'translateY(-1px)' }}>▶</span>
    </div>
  )
}

/* ─── Differentiator row (below the diagram) ─────────────────────────── */

function DifferentiatorRow() {
  const items = [
    {
      label: 'Scoped',
      body:
        'Every answer narrows to the segment, time window, and warrant level the agent asked for. No global averages.',
    },
    {
      label: 'Grounded',
      body:
        'Each claim cites its source and sample size. The agent can always show its work — no black-box summaries.',
    },
    {
      label: 'Contradiction-aware',
      body:
        'Flags conflicting evidence across domains. The gaps surface before a decision depends on them.',
    },
  ]
  return (
    <div className="grid grid-cols-3 gap-[1px] rounded-[10px] overflow-hidden bg-g100 border border-g100/50 max-md:grid-cols-1">
      {items.map((it) => (
        <div key={it.label} className="bg-wh p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-acc mb-2">
            {it.label}
          </div>
          <div className="text-[13px] text-g600 leading-[1.55]">{it.body}</div>
        </div>
      ))}
    </div>
  )
}
