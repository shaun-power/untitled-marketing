export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 backdrop-blur-[16px] saturate-[1.2] bg-wh/82 border-b border-g100/50">
      <div className="max-w-[1120px] mx-auto px-10 h-[54px] flex items-center justify-between">
        <div className="font-medium text-[16px] tracking-[-0.02em] flex items-center gap-[8px]">
          <LogoMark />
          Signal
        </div>
        <div className="flex gap-7 items-center max-md:hidden">
          <a href="#product" className="text-[13px] text-g400 no-underline hover:text-bk transition-colors duration-150">Product</a>
          <a href="#how" className="text-[13px] text-g400 no-underline hover:text-bk transition-colors duration-150">How it works</a>
          <a href="#agents" className="text-[13px] text-g400 no-underline hover:text-bk transition-colors duration-150">For agents</a>
          <a href="#" className="text-[12px] px-[14px] py-[6px] border border-bk/50 rounded-[5px] text-bk no-underline hover:bg-bk hover:text-wh transition-all duration-150">
            Request early access
          </a>
        </div>
      </div>
    </nav>
  )
}

function LogoMark() {
  return (
    <div className="w-[18px] h-[18px] grid grid-cols-3 grid-rows-3 gap-[1.5px]">
      {[0.05, 0.18, 0.05, 0.18, 1, 0.18, 0.05, 0.18, 0.05].map((opacity, i) => (
        <span
          key={i}
          className="rounded-[1px]"
          style={{
            background: i === 4 ? 'var(--color-acc)' : 'var(--color-bk)',
            opacity,
          }}
        />
      ))}
    </div>
  )
}
