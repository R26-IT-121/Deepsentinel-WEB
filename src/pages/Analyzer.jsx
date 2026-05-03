import { useState } from 'react'
import { analyzeScenario, analyzeTransaction } from '../services/api'
import ScoreGauge from '../components/ScoreGauge'
import ModalityBar from '../components/ModalityBar'
import RiskBadge from '../components/RiskBadge'
import ForensicReport from '../components/ForensicReport'

const SCENARIOS = [
  { value: 'mule_network',    label: '🕸️  Mule Network (Hub-and-Spoke)',   desc: 'Multiple accounts funneling funds into a central mule node' },
  { value: 'layering',        label: '🔀  Layering',                        desc: 'Rapid multi-hop transfers to obscure the origin of funds' },
  { value: 'smurfing',        label: '🐡  Smurfing',                        desc: 'High-volume micro-transactions below reporting thresholds' },
  { value: 'account_takeover',label: '🔓  Account Takeover',               desc: 'Unusual behavioral deviation suggesting compromised account' },
  { value: 'velocity_fraud',  label: '⚡  Velocity Fraud',                 desc: 'Mechanically regular high-frequency transfers — bot activity' },
  { value: 'legitimate',      label: '✅  Legitimate Transaction',          desc: 'Normal customer transaction with low fraud probability' },
]

const TX_TYPES = ['TRANSFER', 'CASH_OUT', 'CASH_IN', 'PAYMENT', 'DEBIT']

const DEFAULT_TX = {
  step: 206, type: 'TRANSFER', amount: 181234.56,
  nameOrig: 'C1231006815', nameDest: 'C987654321',
  oldbalanceOrg: 181234.56, newbalanceOrig: 0.0,
  oldbalanceDest: 0.0, newbalanceDest: 181234.56,
  isFlaggedFraud: 0,
}

export default function Analyzer() {
  const [mode, setMode] = useState('scenario')
  const [scenario, setScenario] = useState('mule_network')
  const [tx, setTx] = useState(DEFAULT_TX)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runAnalysis = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = mode === 'scenario'
        ? await analyzeScenario(scenario)
        : await analyzeTransaction(tx)
      setResult(data)
    } catch (e) {
      setError(e.response?.data?.detail || e.message || 'Backend unreachable. Start the server first.')
    } finally {
      setLoading(false)
    }
  }

  const txField = (key, label, type = 'text', step) => (
    <div key={key} className="flex flex-col gap-1">
      <label className="text-xs text-slate-400 font-medium">{label}</label>
      {key === 'type' ? (
        <select
          value={tx[key]}
          onChange={(e) => setTx(prev => ({ ...prev, [key]: e.target.value }))}
          className="bg-sentinel-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        >
          {TX_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      ) : (
        <input
          type={type}
          step={step}
          value={tx[key]}
          onChange={(e) => setTx(prev => ({
            ...prev,
            [key]: type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value,
          }))}
          className="bg-sentinel-900 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
      )}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Transaction Analyzer</h1>
        <p className="text-slate-400 mt-1">
          Submit a transaction through the full DeepSentinel pipeline — mock scoring → fusion → RAG → forensic report.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mode toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            {['scenario', 'transaction'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-medium transition-colors capitalize ${
                  mode === m
                    ? 'bg-blue-600 text-white'
                    : 'bg-sentinel-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {m === 'scenario' ? '🎭 Scenario Mode' : '📋 Transaction Mode'}
              </button>
            ))}
          </div>

          {mode === 'scenario' ? (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Select Fraud Scenario</p>
              {SCENARIOS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setScenario(s.value)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    scenario === s.value
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-slate-700 bg-sentinel-800 hover:border-slate-500'
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-200">{s.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-sentinel-800 border border-slate-700 rounded-xl p-4 space-y-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">PaySim Transaction Fields</p>
              <div className="grid grid-cols-2 gap-3">
                {txField('step', 'Step (1–744)', 'number', 1)}
                {txField('type', 'Type')}
                {txField('amount', 'Amount', 'number', 0.01)}
                {txField('nameOrig', 'Sender Account')}
                {txField('nameDest', 'Receiver Account')}
                {txField('oldbalanceOrg', 'Old Balance (Orig)', 'number', 0.01)}
                {txField('newbalanceOrig', 'New Balance (Orig)', 'number', 0.01)}
                {txField('oldbalanceDest', 'Old Balance (Dest)', 'number', 0.01)}
                {txField('newbalanceDest', 'New Balance (Dest)', 'number', 0.01)}
              </div>
            </div>
          )}

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⟳</span> Running Pipeline…
              </>
            ) : (
              '▶  Run Analysis'
            )}
          </button>

          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-300 rounded-lg p-3 text-sm">
              <p className="font-semibold">Error</p>
              <p className="mt-0.5 text-red-400">{error}</p>
              <p className="mt-2 text-xs text-slate-500">
                Make sure the backend is running: <br />
                <code className="text-slate-400">python -m uvicorn backend.main:app --reload --port 8000</code>
              </p>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-5">
          {!result && !loading && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-600 border border-slate-800 rounded-xl bg-sentinel-900/50">
              <span className="text-4xl mb-3">🔍</span>
              <p className="font-medium">Select a scenario and run the analysis</p>
              <p className="text-sm mt-1">Results will appear here</p>
            </div>
          )}

          {result && (
            <>
              {/* Transaction ID + scenario */}
              <div className="bg-sentinel-800 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Transaction ID</p>
                    <p className="font-mono text-sm text-slate-300">{result.transaction_id}</p>
                    {result.mock_scenario && (
                      <p className="text-xs text-blue-400 mt-0.5">
                        Scenario: <span className="font-semibold">{result.mock_scenario}</span>
                        <span className="ml-2 text-slate-500">(mock data)</span>
                      </p>
                    )}
                  </div>
                  <RiskBadge classification={result.classification} large />
                </div>
              </div>

              {/* Main gauge + modalities */}
              <div className="bg-sentinel-800 border border-slate-700 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <ScoreGauge
                      score={result.fraud_confidence_score}
                      label="Fraud Confidence"
                      sublabel="Fused Score"
                      size={140}
                    />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Per-Modality Scores ({result.modalities_used}/3 available)
                    </p>
                    <ModalityBar
                      label="Graph Neural Network"
                      score={result.graph_score}
                      available={result.graph_available}
                      icon="🕸️"
                    />
                    <ModalityBar
                      label="Behavioral VAE"
                      score={result.behavioral_score}
                      available={result.behavioral_available}
                      icon="📊"
                    />
                    <ModalityBar
                      label="Temporal CNN"
                      score={result.temporal_score}
                      available={result.temporal_available}
                      icon="⏱️"
                    />
                  </div>
                </div>
              </div>

              {/* FATF Retrieval */}
              <div className="bg-sentinel-800 border border-slate-700 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                  FATF Typology Match
                </p>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-100">{result.retrieval.typology_name}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                        {result.retrieval.typology_id}
                      </span>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                        Stage: {result.retrieval.stage}
                      </span>
                      <RiskBadge classification={result.retrieval.risk_level} />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-blue-400">
                      {(result.retrieval.similarity_score * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-slate-500">cosine similarity</p>
                  </div>
                </div>
              </div>

              {/* Forensic Report */}
              <ForensicReport
                report={result.forensic_report}
                loading={loading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
