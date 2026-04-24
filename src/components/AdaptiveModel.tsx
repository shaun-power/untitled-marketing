import AdaptiveGraph from './AdaptiveGraph'

const sources = [
  { name: 'Experiment results', fresh: 'live', delay: 0 },
  { name: 'Research repos', fresh: '2h', delay: 0.3 },
  { name: 'Support tickets', fresh: 'live', delay: 0.6 },
  { name: 'Product telemetry', fresh: 'live', delay: 0.9 },
  { name: 'Slack decisions', fresh: '10m', delay: 1.2 },
  { name: 'Planning docs', fresh: '1d', delay: 1.5 },
]

const consumers = [
  { name: 'PMs deciding', sub: 'What to ship, for whom, with what evidence', glyph: '◐' },
  { name: 'Agents reasoning', sub: 'Claude, internal copilots, workflow bots', glyph: '●' },
  { name: 'Leadership review', sub: 'Portfolio visibility, no deck archaeology', glyph: '◑' },
]

export default function AdaptiveModel() {
  return (
    <section id="model" className="max-w-[1120px] mx-auto px-10 pb-[148px]">
      <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-g300 mb-4">
        The architecture
      </div>
      <h2 className="text-[clamp(27px,3.4vw,38px)] font-normal leading-[1.14] tracking-[-0.025em] max-w-[640px] mb-5">
        An adaptive model of your business.{' '}
        <em className="italic font-light text-g400">Always on, always current.</em>
      </h2>
      <p className="text-[16px] text-g500 max-w-[560px] mb-11 leading-[1.6]">
        Insight doesn't pile up in docs anymore. It's extracted, structured, and merged into a living knowledge graph — the source of truth for your strategy. Humans and agents both operate on it. Both keep it sharp. The model adapts as the business moves.
      </p>

      <div
        className="grid border border-g100/50 rounded-[10px] overflow-hidden bg-wh max-md:grid-cols-1"
        style={{ gridTemplateColumns: '1fr 1.3fr 1fr' }}
      >
        {/* 01 — Ingest */}
        <div className="p-7 border-r border-g100/50 max-md:border-r-0 max-md:border-b">
          <div className="text-[10px] font-mono text-g300 uppercase tracking-[0.1em] mb-[6px]">
            01 · Ingest
          </div>
          <div className="text-[15px] font-medium mb-1 tracking-[-0.01em]">
            Automatic &amp; continuous
          </div>
          <div className="text-[12px] text-g400 leading-[1.5] mb-5">
            Every source your team already works in — feeding the graph the moment it changes.
          </div>
          <div className="flex flex-col gap-2">
            {sources.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-[10px] font-mono text-[11px] text-g500 px-[10px] py-[7px] bg-g50 rounded-[6px] border border-g100/60"
              >
                <span
                  className="ingest-pulse w-[6px] h-[6px] rounded-full shrink-0"
                  style={{ background: 'var(--color-acc)', animationDelay: `${s.delay}s` }}
                />
                <span className="flex-1 text-g600">{s.name}</span>
                <span className="text-[9px] text-g300">{s.fresh}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 02 — Knowledge graph */}
        <div className="p-7 bg-g50 border-r border-g100/50 flex flex-col max-md:border-r-0 max-md:border-b">
          <div className="text-[10px] font-mono text-g300 uppercase tracking-[0.1em] mb-[6px]">
            02 · Knowledge graph
          </div>
          <div className="text-[15px] font-medium mb-1 tracking-[-0.01em]">The source of truth</div>
          <div className="text-[12px] text-g400 leading-[1.5] mb-4">
            Problems, evidence, bets, contradictions — typed, scoped, linked. One shared model.
          </div>
          <div className="flex-1 min-h-[360px] relative">
            <AdaptiveGraph />
          </div>
        </div>

        {/* 03 — Operate */}
        <div className="p-7">
          <div className="text-[10px] font-mono text-g300 uppercase tracking-[0.1em] mb-[6px]">
            03 · Operate
          </div>
          <div className="text-[15px] font-medium mb-1 tracking-[-0.01em]">
            Humans &amp; agents, same model
          </div>
          <div className="text-[12px] text-g400 leading-[1.5] mb-5">
            Every decision compiled against the graph. Every review sharpens it back.
          </div>
          <div className="flex flex-col gap-[10px]">
            {consumers.map((c) => (
              <div key={c.name} className="px-[14px] py-3 border border-g100/60 rounded-[6px]">
                <div className="flex items-center gap-2 mb-[2px]">
                  <span className="text-acc text-[10px]">{c.glyph}</span>
                  <span className="text-[13px] font-medium">{c.name}</span>
                </div>
                <div className="text-[11px] text-g400 leading-[1.45] pl-[18px]">{c.sub}</div>
              </div>
            ))}
          </div>
          <div
            className="font-mono mt-[18px] px-[14px] py-[10px] rounded-[6px] text-[10.5px] text-g600 leading-[1.5]"
            style={{ background: 'color-mix(in srgb, var(--color-acc) 8%, transparent)' }}
          >
            ↻ Every decision and every review makes the model sharper.
          </div>
        </div>
      </div>
    </section>
  )
}
