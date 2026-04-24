const stats = [
  {
    value: '72%',
    description: 'of senior executives say bad strategic decisions are as frequent as good ones.',
    source: 'McKinsey',
  },
  {
    value: '47%',
    description: 'of enterprise AI users made a major decision based on hallucinated content last year.',
    source: 'Enterprise AI Survey, 2024',
  },
  {
    value: '22.5%',
    description: 'of your business data decays every year. A third of what you knew 18 months ago is wrong.',
    source: 'DemandScience',
  },
  {
    value: '19%',
    description: 'slower. Developers with AI completed tasks slower but believed they were 20% faster. Polished output masks declining rigor.',
    source: 'METR, 2025',
  },
  {
    value: '70%',
    description: 'of digital transformations still miss their objectives. The bottleneck was never output.',
    source: 'McKinsey',
  },
  {
    value: '20%',
    description: 'of enterprises report actual revenue growth from AI, despite 74% expecting it. Execution without judgment.',
    source: 'Deloitte, 2026',
  },
]

export default function ProblemStats() {
  return (
    <section className="max-w-[1120px] mx-auto px-10 py-[148px]" id="problem">
      <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-g300 mb-4">
        The problem
      </div>
      <h2 className="text-[clamp(27px,3.4vw,38px)] font-normal leading-[1.14] tracking-[-0.025em] max-w-[640px] mb-5">
        Shipping is commoditizing.{' '}
        <em className="italic font-light text-g400">Deciding what to ship isn't.</em>
      </h2>
      <p className="text-[16px] text-g500 max-w-[540px] mb-6 leading-[1.6]">
        AI has collapsed the cost of building. Engineering velocity is no longer the bottleneck — and it's about to stop being the differentiator. What separates companies now is upstream of the code: what to bet on, for whom, and why.
      </p>
      <p className="text-[16px] text-g400 max-w-[540px] mb-11 leading-[1.6]">
        And that work has gotten <em className="italic font-light">slower</em>. There's no shared model of what your business knows to be true — evidence is scattered across decks, research repos, experiments, and Slack. Every cycle starts with a week of re-levelling context. Decisions stall. Teams misalign. Leaders default to gut.
      </p>

      <div className="grid grid-cols-3 gap-px bg-g100 border border-g100/50 rounded-[10px] overflow-hidden max-md:grid-cols-1">
        {stats.map((stat) => (
          <div key={stat.value} className="bg-wh p-7">
            <div className="text-[38px] font-light tracking-[-0.03em] leading-none mb-3 tabular-nums">
              {stat.value}
            </div>
            <div className="text-[13px] text-g500 leading-[1.45] mb-[10px]">
              {stat.description}
            </div>
            <div className="text-[10px] font-mono text-g300">{stat.source}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
