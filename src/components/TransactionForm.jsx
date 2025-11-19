import { useState } from 'react'

const initial = {
  type: 'expense',
  amount: '',
  category: '',
  note: '',
  date: new Date().toISOString().slice(0, 10),
}

function TransactionForm({ onAdded }) {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setForm(initial)
      onAdded?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="add" className="max-w-4xl mx-auto px-6">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-800">Quick Add</h2>
        <p className="text-slate-500 text-sm mb-4">Log an expense or income in a few seconds.</p>
        <form onSubmit={submit} className="grid sm:grid-cols-6 gap-3">
          <select name="type" value={form.type} onChange={handleChange} className="sm:col-span-2 rounded-xl border-slate-300 px-3 py-2">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input type="number" step="0.01" min="0" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="sm:col-span-2 rounded-xl border-slate-300 px-3 py-2" />
          <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="sm:col-span-2 rounded-xl border-slate-300 px-3 py-2" />
          <input type="text" name="note" value={form.note} onChange={handleChange} placeholder="Note" className="sm:col-span-3 rounded-xl border-slate-300 px-3 py-2" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="sm:col-span-2 rounded-xl border-slate-300 px-3 py-2" />
          <button disabled={loading} className="sm:col-span-1 rounded-xl bg-blue-600 text-white font-semibold px-4 py-2 hover:bg-blue-700 transition-colors">
            {loading ? 'Saving...' : 'Save'}
          </button>
          {error && <p className="sm:col-span-6 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  )
}

export default TransactionForm
