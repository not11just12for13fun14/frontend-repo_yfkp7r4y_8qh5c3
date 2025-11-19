import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Soft gradient overlay to improve text contrast (doesn't block interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/90" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Beautiful Budget Planner
          </h1>
          <p className="mt-4 text-slate-200/90 text-lg sm:text-xl">
            Plan simply. Track clearly. Feel in control. A minimalist finance hub for your daily money flow.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#add" className="inline-flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-semibold transition-colors shadow-lg shadow-blue-500/20">
              Add a Transaction
            </a>
            <a href="#summary" className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white px-5 py-3 font-semibold backdrop-blur-md border border-white/20 transition-colors">
              View Summary
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
