import { useEffect, useState, useMemo } from 'react'

function currency(n) {
  if (typeof n !== 'number') return n
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

function Summary() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/transactions?limit=100`)
      const data = await res.json()
      setItems(data.items || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const totals = useMemo(() => {
    const income = items.filter(i => i.type === 'income').reduce((s, i) => s + Number(i.amount || 0), 0)
    const expenses = items.filter(i => i.type === 'expense').reduce((s, i) => s + Number(i.amount || 0), 0)
    const balance = income - expenses
    const byCat = {}
    items.forEach(i => {
      const key = i.category || 'Uncategorized'
      byCat[key] = (byCat[key] || 0) + Number(i.amount || 0) * (i.type === 'expense' ? 1 : -1)
    })
    const catList = Object.entries(byCat).map(([k, v]) => ({ category: k, amount: v }))
    catList.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
    return { income, expenses, balance, catList }
  }, [items])

  return (
    <section id="summary" className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow border border-slate-200">
          <p className="text-slate-500">Income</p>
          <p className="text-3xl font-bold text-emerald-600">{currency(totals.income)}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow border border-slate-200">
          <p className="text-slate-500">Expenses</p>
          <p className="text-3xl font-bold text-rose-600">{currency(totals.expenses)}</p>
        </div>
        <div className={`rounded-2xl p-6 shadow border border-slate-200 ${totals.balance >= 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
          <p className="text-slate-600">Balance</p>
          <p className={`text-3xl font-bold ${totals.balance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{currency(totals.balance)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">Recent</h3>
          <div className="divide-y">
            {loading ? (
              <p className="text-slate-500">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-slate-500">No transactions yet.</p>
            ) : (
              items.slice(0, 8).map(i => (
                <div key={i.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{i.note || i.category || (i.type === 'income' ? 'Income' : 'Expense')}</p>
                    <p className="text-xs text-slate-500">{new Date(i.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`font-semibold ${i.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {i.type === 'income' ? '+' : '-'}{currency(Number(i.amount))}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow border border-slate-200">
          <h3 className="text-lg font-semibold mb-4">By Category</h3>
          <div className="space-y-3">
            {totals.catList.length === 0 ? (
              <p className="text-slate-500">No data yet.</p>
            ) : (
              totals.catList.map((c) => (
                <div key={c.category} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{c.category}</p>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${c.amount >= 0 ? 'bg-emerald-400' : 'bg-rose-400'}`} style={{ width: `${Math.min(100, Math.abs(c.amount) / Math.max(1, Math.abs(totals.expenses)) * 100)}%` }} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-700">{currency(Math.abs(c.amount))}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button onClick={load} className="rounded-xl bg-slate-900 text-white px-4 py-2 font-semibold hover:bg-slate-800">Refresh</button>
      </div>
    </section>
  )
}

export default Summary
