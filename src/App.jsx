import Hero from './components/Hero'
import TransactionForm from './components/TransactionForm'
import Summary from './components/Summary'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-100">
      <Hero />

      <main className="relative -mt-16 space-y-10 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <TransactionForm onAdded={() => { /* Summary will provide refresh button; simple version keeps form isolated */ }} />
            </div>
            <div className="hidden sm:block" />
          </div>
        </div>

        <Summary />
      </main>

      <footer className="border-t border-white/10 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm flex items-center justify-between">
          <p>Budget Planner • Stay on track with a calm, minimalist flow</p>
          <a href="/test" className="underline hover:text-white">System Check</a>
        </div>
      </footer>
    </div>
  )
}

export default App
