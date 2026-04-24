const steps = [
  {
    num: '01',
    title: 'Connect your existing sources',
    description:
      'Research repos, planning docs, experiments, analytics, Slack, support, release systems. It hooks into the tools you already use. Permissions carry over.',
  },
  {
    num: '02',
    title: 'Structure into opportunities and bets',
    description:
      'The system extracts problems, claims, and relationships — then maps them to the opportunities and bets your team is running. Scope, confidence, and source stay attached.',
  },
  {
    num: '03',
    title: 'Humans and agents operate on it',
    description:
      'Your PMs use it to decide what to build next. Your agents query it to reason. The same structured substrate, one source of truth for both.',
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-[1120px] mx-auto px-10 pb-[148px]" id="how">
      <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-g300 mb-4">
        How it works
      </div>
      <h2 className="text-[clamp(27px,3.4vw,38px)] font-normal leading-[1.14] tracking-[-0.025em] max-w-[640px] mb-5">
        Built for humans and agents{' '}
        <em className="italic font-light text-g400">to operate on the same model</em>.
      </h2>
      <p className="text-[16px] text-g500 max-w-[560px] mb-11 leading-[1.6]">
        PMs compile the strategic picture. Agents extract and propose structure. You review and decide. The substrate gets richer every cycle — and every decision made on it reinforces the next.
      </p>

      <div className="grid grid-cols-3 gap-px bg-g100 border border-g100/50 rounded-[10px] overflow-hidden max-md:grid-cols-1">
        {steps.map((step) => (
          <div key={step.num} className="bg-wh p-8">
            <div className="text-[11px] font-mono text-g300 mb-3">{step.num}</div>
            <div className="text-[15px] font-medium mb-2">{step.title}</div>
            <div className="text-[13px] text-g500 leading-[1.5]">{step.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
