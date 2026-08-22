import { useState } from 'react'

const TRANSACTION_TYPES = [
  'CASH_IN',
  'CASH_OUT',
  'DEBIT',
  'PAYMENT',
  'TRANSFER',
]

export default function TransactionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    step: 1,
    type: 'TRANSFER',
    amount: 1000,
    nameOrig: 'C' + Math.random().toString().slice(2, 11),
    nameDest: 'C' + Math.random().toString().slice(2, 11),
    oldbalanceOrg: 10000,
    newbalanceOrig: 9000,
    oldbalanceDest: 5000,
    newbalanceDest: 6000,
    isFlaggedFraud: 0,
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (formData.amount <= 0) newErrors.amount = 'Amount must be positive'
    if (!formData.nameOrig?.trim()) newErrors.nameOrig = 'Sender name required'
    if (!formData.nameDest?.trim()) newErrors.nameDest = 'Recipient name required'
    if (formData.oldbalanceOrg < 0) newErrors.oldbalanceOrg = 'Cannot be negative'
    if (formData.oldbalanceDest < 0) newErrors.oldbalanceDest = 'Cannot be negative'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        transaction_id: `TX_${Date.now()}`,
        ...formData,
        step: parseInt(formData.step),
        amount: parseFloat(formData.amount),
        oldbalanceOrg: parseFloat(formData.oldbalanceOrg),
        newbalanceOrig: parseFloat(formData.newbalanceOrig),
        oldbalanceDest: parseFloat(formData.oldbalanceDest),
        newbalanceDest: parseFloat(formData.newbalanceDest),
      })
    }
  }

  const handleGenerateRandom = () => {
    setFormData(prev => ({
      ...prev,
      step: Math.floor(Math.random() * 744) + 1,
      amount: Math.floor(Math.random() * 100000) + 100,
      nameOrig: 'C' + Math.random().toString().slice(2, 11),
      nameDest: 'C' + Math.random().toString().slice(2, 11),
      oldbalanceOrg: Math.floor(Math.random() * 50000),
      oldbalanceDest: Math.floor(Math.random() * 50000),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Transaction Type & Amount */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Transaction Type
          </label>
          <select
            value={formData.type}
            onChange={e => handleChange('type', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {TRANSACTION_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Amount ({errors.amount && <span className="text-red-400">{errors.amount}</span>})
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={e => handleChange('amount', e.target.value)}
            step="0.01"
            min="0"
            className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 ${
              errors.amount
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-white/[0.10] focus:ring-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Sender & Recipient */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Sender Account ({errors.nameOrig && <span className="text-red-400">{errors.nameOrig}</span>})
          </label>
          <input
            type="text"
            value={formData.nameOrig}
            onChange={e => handleChange('nameOrig', e.target.value)}
            placeholder="e.g., C123456789"
            maxLength="11"
            className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border text-white text-sm placeholder-slate-600 font-mono focus:outline-none focus:ring-1 ${
              errors.nameOrig
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-white/[0.10] focus:ring-blue-500'
            }`}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Recipient Account ({errors.nameDest && <span className="text-red-400">{errors.nameDest}</span>})
          </label>
          <input
            type="text"
            value={formData.nameDest}
            onChange={e => handleChange('nameDest', e.target.value)}
            placeholder="e.g., C987654321"
            maxLength="11"
            className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border text-white text-sm placeholder-slate-600 font-mono focus:outline-none focus:ring-1 ${
              errors.nameDest
                ? 'border-red-500/50 focus:ring-red-500'
                : 'border-white/[0.10] focus:ring-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Balances */}
      <div className="space-y-3 p-4 rounded-lg bg-white/[0.01] border border-white/[0.07]">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Account Balances</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-600 mb-1">Old Balance (Sender)</label>
            <input
              type="number"
              value={formData.oldbalanceOrg}
              onChange={e => handleChange('oldbalanceOrg', e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">New Balance (Sender)</label>
            <input
              type="number"
              value={formData.newbalanceOrig}
              onChange={e => handleChange('newbalanceOrig', e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Old Balance (Recipient)</label>
            <input
              type="number"
              value={formData.oldbalanceDest}
              onChange={e => handleChange('oldbalanceDest', e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">New Balance (Recipient)</label>
            <input
              type="number"
              value={formData.newbalanceDest}
              onChange={e => handleChange('newbalanceDest', e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Step */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Time Step (1-744 hours)
        </label>
        <input
          type="number"
          value={formData.step}
          onChange={e => handleChange('step', e.target.value)}
          min="1"
          max="744"
          className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="text-[10px] text-slate-700 mt-1">Transaction sequence number in the dataset</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <>⏳ Analyzing…</> : <>▶ Analyze Transaction</>}
        </button>
        <button
          type="button"
          onClick={handleGenerateRandom}
          className="px-4 py-3 rounded-lg bg-white/5 border border-white/[0.10] text-slate-300 hover:text-white hover:border-white/[0.20] transition-all"
          title="Generate random test transaction"
        >
          🎲
        </button>
      </div>
    </form>
  )
}
