export default function ProductLayers() {
  return (
    <section className="max-w-[1120px] mx-auto px-10 pb-[148px]" id="product">
      <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-g300 mb-4">
        The promise
      </div>
      <h2 className="text-[clamp(27px,3.4vw,38px)] font-normal leading-[1.14] tracking-[-0.025em] max-w-[640px] mb-5">
        Decide faster.{' '}
        <em className="italic font-light text-g400">Decide with more confidence.</em>
      </h2>
      <p className="text-[16px] text-g500 max-w-[560px] mb-11 leading-[1.6]">
        Every strategic decision sits on the same two axes: how fast you can make it, and how confident you are when you do. Most teams trade one for the other. Signal moves both — by putting opportunities, bets, and the evidence behind them into one structured model that humans and agents share.
      </p>

      <div className="grid grid-cols-2 gap-px bg-g100 border border-g100/50 rounded-[10px] overflow-hidden mb-[72px] max-md:grid-cols-1">
        <div className="bg-wh p-9">
          <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-acc mb-[18px]">
            → Faster
          </div>
          <div className="text-[24px] font-medium tracking-[-0.02em] leading-[1.2] mb-4" style={{ textWrap: 'balance' }}>
            From "let me pull that together" to an answer in the room.
          </div>
          <p className="text-[14px] text-g500 leading-[1.6]">
            The evidence for every live bet is already structured, scoped, and linked to source. No deck archaeology. No "who owns this?" Slack threads. No rebuilding context every planning cycle.
          </p>
        </div>
        <div className="bg-wh p-9">
          <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-acc mb-[18px]">
            ↑ With more confidence
          </div>
          <div className="text-[24px] font-medium tracking-[-0.02em] leading-[1.2] mb-4" style={{ textWrap: 'balance' }}>
            Every claim carries its scope, its freshness, and what it contradicts.
          </div>
          <p className="text-[14px] text-g500 leading-[1.6]">
            You stop debating whose memory is right. Stale evidence flags itself. Contradictions surface in scope. The gap between "we tested it" and "we tested it <em>there</em>" becomes visible — before a decision depends on missing it.
          </p>
        </div>
      </div>

      <BeforeAfter />
    </section>
  )
}

function BeforeAfter() {
  const before = [
    'Evidence scattered across decks, repos, and Slack',
    'Every cycle re-levels context from scratch',
    'Claims that no one can source or scope',
    'Stale assumptions surface only after a bet fails',
    'Agents reason on whatever they can find',
  ]
  const after = [
    'One structured substrate — opportunities, bets, evidence',
    'Context is already compiled. Decisions start there',
    'Every claim carries scope, source, and freshness',
    'Contradictions and stale bets flag themselves',
    'Agents query the same model your team decides on',
  ]

  return (
    <div className="grid grid-cols-2 gap-px bg-g100 border border-g100/50 rounded-[10px] overflow-hidden max-md:grid-cols-1">
      <div className="bg-wh p-9">
        <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-g300 mb-5">
          Without a decision substrate
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
          {before.map((item) => (
            <li key={item} className="flex gap-3 text-[14px] text-g400 leading-[1.5]">
              <span className="font-mono text-g300 shrink-0">—</span>
              <span className="line-through decoration-g300/60 decoration-[1px]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-wh p-9">
        <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-acc mb-5">
          With Signal
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
          {after.map((item) => (
            <li key={item} className="flex gap-3 text-[14px] text-bk leading-[1.5]">
              <span className="text-acc font-medium shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
