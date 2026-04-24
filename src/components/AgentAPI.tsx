import AgentQueryDiagram from './AgentQueryDiagram'

export default function AgentAPI() {
  return (
    <section className="max-w-[1120px] mx-auto px-10 pb-[148px]" id="agents">
      <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-g300 mb-4">
        For AI agents
      </div>
      <h2 className="text-[clamp(27px,3.4vw,38px)] font-normal leading-[1.14] tracking-[-0.025em] max-w-[700px] mb-5">
        Your agents get structured answers.{' '}
        <em className="italic font-light text-g400">Not a pile of docs to summarize.</em>
      </h2>
      <p className="text-[16px] text-g500 max-w-[620px] mb-11 leading-[1.6]">
        Signal returns typed evidence through a single MCP call — scoped, cited, and contradiction-aware. Your agents stop guessing from document chunks and start working from grounded claims.
      </p>

      <AgentQueryDiagram />
    </section>
  )
}
