export default function CTA() {
  return (
    <section className="pt-20 pb-30 text-center max-w-[1120px] mx-auto px-10">
      <h2
        className="font-medium mb-[18px]"
        style={{
          fontSize: 'clamp(32px, 4.4vw, 56px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          textWrap: 'balance',
        }}
      >
        Ready for a single pane of glass{' '}
        <em className="italic font-light text-g400">for your strategy?</em>
      </h2>
      <p className="text-[16px] text-g400 mb-10 max-w-[560px] mx-auto">
        We're partnering with a small number of product teams to build this together — one decision workflow at a time. If your PMs spend weeks rebuilding strategy from scratch every quarter, let's talk.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a
          href="#"
          className="inline-flex items-center gap-[6px] px-[18px] py-[10px] bg-bk text-wh rounded-[6px] text-[13px] font-medium no-underline hover:opacity-85 active:scale-[0.97] transition-all duration-150"
        >
          Request early access →
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-[6px] px-[18px] py-[10px] bg-transparent text-bk border border-g200/60 rounded-[6px] text-[13px] no-underline hover:border-g300 hover:bg-g50 transition-all duration-150"
        >
          Read the thesis
        </a>
      </div>
    </section>
  )
}
