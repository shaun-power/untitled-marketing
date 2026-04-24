import PixelBlast from './PixelBlast'

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden opacity-72">
        <PixelBlast
          pixelSize={3}
          color="#938a7f"
          patternScale={2}
          patternDensity={1.0}
          edgeFade={0.38}
          speed={0.3}
        />
      </div>

      {/* Readability wash — soft radial fade behind the text column so the dither stays visible
          around it but gets knocked back where the copy sits. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 58% 66% at 28% 48%, color-mix(in srgb, var(--color-wh) 70%, transparent) 0%, transparent 72%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle, color-mix(in srgb, var(--color-bk) 14%, transparent) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-[1120px] mx-auto px-10 w-full pt-[120px] pb-[88px]">
          <div className="inline-flex items-center gap-[6px] text-[12px] font-mono text-g600 mb-6 tracking-[0.02em]">
            <span className="w-[5px] h-[5px] bg-acc rounded-full animate-pulse" />
            Decision infrastructure · 2026
          </div>

          <h1
            className="font-medium max-w-[1040px] mb-8"
            style={{
              fontSize: 'clamp(48px, 7.8vw, 108px)',
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
              textWrap: 'balance',
            }}
          >
            The next decade won't be won by shipping more.{' '}
            <em className="italic font-light text-g400">It'll be won by deciding better.</em>
          </h1>

          <p className="text-[18px] leading-[1.5] text-g600 max-w-[620px] mb-10 font-medium">
            Signal is the decision infrastructure behind that. Every opportunity, every bet, every assumption — structured in one place. Your PMs decide on it. Your agents reason on it. Both operate on the same model.
          </p>

          <div className="flex gap-3 items-center">
            <a
              href="#"
              className="inline-flex items-center gap-[6px] px-[18px] py-[10px] bg-bk text-wh rounded-[6px] text-[13px] font-medium no-underline hover:opacity-85 active:scale-[0.97] transition-all duration-150"
            >
              Request early access →
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-[6px] px-[18px] py-[10px] bg-transparent text-bk border border-g200/60 rounded-[6px] text-[13px] no-underline hover:border-g300 hover:bg-g50 transition-all duration-150"
            >
              See how it works
            </a>
          </div>

          <div className="mt-[72px] flex gap-10 text-[12px] font-mono text-g600 flex-wrap">
            <div><span className="text-acc">●</span> One model. Humans and agents.</div>
            <div><span className="text-g500">●</span> Opportunities, bets, evidence</div>
            <div><span className="text-g500">●</span> Query it from anywhere</div>
          </div>
        </div>
      </div>
    </section>
  )
}
