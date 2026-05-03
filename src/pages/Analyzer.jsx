import { useState } from 'react'
import { analyzeScenario, analyzeTransaction } from '../services/api'
import ScoreGauge from '../components/ScoreGauge'
import ModalityBar from '../components/ModalityBar'
import RiskBadge from '../components/RiskBadge'
import ForensicReport from '../components/ForensicReport'

const SCENARIOS = [
  {
    value: 'mule_network',
    label: 'Mule Network',
    icon: '🕸️',
    desc: 'Multiple fresh accounts funneling funds to a central hub — hub-and-spoke laundering.',
    expect: 'High GNN score, moderate behavioral',
  },
  {
    value: 'layering',
    label: 'Layering',
    icon: '🔀',
    desc: 'Rapid multi-hop TRANSFER chain to obscure the origin of funds.',
    expect: 'High across all three modalities',
  },
  {
    value: 'smurfing',
    label: 'Smurfing',
    icon: '🐡',
    desc: 'Many small transactions deliberately kept below reporting thresholds.',
    expect: 'High temporal (regular timing), moderate graph',
  },
  {
    value: 'account_takeover',
    label: 'Account Takeover',
    icon: '🔓',
    desc: 'Normal account suddenly draining its balance into a new destination.',
    expect: 'High behavioral VAE, low GNN',
  },
  {
    value: 'velocity_fraud',
    label: 'Velocity Fraud',
    icon: '⚡',
    desc: 'Mechanically regular high-frequency transfers — automated bot activity.',
    expect: 'Very high temporal (burstiness near 0)',
  },
  {
    value: 'legitimate',
    label: 'Legitimate',
    icon: '✅',
    desc: 'Normal customer transaction — all three models should return low scores.',
    expect: 'All scores below 0.25',
  },
]

const TX_TYPES = ['TRANSFER', 'CASH_OUT', 'CASH_IN', 'PAYMENT', 'DEBIT']

const DEFAULT_TX = {
  step: 206,
  type: 'TRANSFER',
  amount: 181234.56,
  nameOrig: 'C1231006815',
  nameDest: 'C987654321',
  oldbalanceOrg: 181234.56,
  newbalanceOrig: 0.0,
  oldbalanceDest: 0.0,
  newbalanceDest: 181234.56,
  isFlaggedFraud: 0,
}

const MODALITY_META = {
  graph: {
    label: 'Graph Neural Network (GNN)',
    member: 'Member 2 — Ewaduge',
    component: 'Edge-Enhanced GraphSAGE',
    detects: 'Mule rings, hub-and-spoke topology',
    icon: '🕸️',
  },
  behavioral: {
    label: 'Behavioral VAE',
    member: 'Member 1 — Wijesinghe',
    component: 'Stratified VAE + DSAA',
    detects: 'Anomalous amounts, balance patterns, drain ratio',
    icon: '📊',
  },
  temporal: {
    label: 'Temporal CNN',
    member: 'Member 3 — Pathirana',
    component: 'TSCFD — System-Context TCN',
    detects: 'Mechanically regular timing, burstiness near zero',
    icon: '⏱️',
  },
}

function PipelineStep({ num, title, active, done }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${done ? 'text-green-400' : active ? 'text-blue-400' : 'text-slate-600'}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${done ? 'bg-green-900/60 border-green-600' : active ? 'bg-blue-900/60 border-blue-600 animate-pulse' : 'bg-sentinel-800 border-slate-700'}`}>
        {done ? '✓' : num}
      </div>
      <span className="hidden sm:inline">{title}</span>
    </div>
  )
}

export default function Analyzer() {
  const [mode, setMode] = useState('scenario')
  const [scenario, setScenario] = useState('mule_network')
  const [tx, setTx] = useState(DEFAULT_TX)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeStep, setActiveStep] = useState(0)

  const runAnalysis = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setActiveStep(1)

    try {
      await new Promise(r => setTimeout(r, 300))
      setActiveStep(2)
      await new Promise(r => setTimeout(r, 400))
      setActiveStep(3)

      const data = mode === 'scenario'
        ? await analyzeScenario(scenario)
        : await analyzeTransaction(tx)

      setActiveStep(4)
      await new Promise(r => setTimeout(r, 200))
      setActiveStep(5)
      setResult(data)
    } catch (e) {
      setError(e.response?.data?.detail || e.message || 'Backend unreachable.')
      setActiveStep(0)
    } finally {
      setLoading(false)
    }
  }

  const pipelineSteps = [
    { num: 1, title: 'Submit' },
    { num: 2, title: 'Score' },
    { num: 3, title: 'Fuse' },
    { num: 4, title: 'Retrieve' },
    { num: 5, title: 'Report' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

      {/* ── Header ── */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">Transaction Analyzer</h1>
        <p className="text-slate-400 text-sm">
          Run any transaction through the full 5-stage DeepSentinel pipeline and receive a forensic investigation report.
        </p>
      </div>

      {/* ── Mock mode banner ── */}
      <div className="bg-amber-950/40 border border-amber-700/50 rounded-xl px-4 py-3 flex items-start gap-3">
        <span className="text-amber-400 text-lg flex-shrink-0">⚠️</span>
        <div className="text-sm">
          <p className="font-semibold text-amber-300">Demo Mode — Simulated Upstream Scores</p>
          <p className="text-amber-700 mt-0.5">
            Members 1, 2 &amp; 3 FastAPI endpoints are not yet deployed. Scores for GNN, VAE, and TCN are
            generated by <code className="bg-amber-900/40 px-1 rounded text-amber-400">backend/mock_scores.py</code> using
            scenario-based probability ranges. The Fusion Engine, RAG retrieval, and LLM report are all <span className="text-amber-300 font-medium">real and live</span>.
          </p>
        </div>
      </div>

      {/* ── Pipeline progress ── */}
      {(loading || result) && (
        <div className="bg-sentinel-800 border border-slate-700 rounded-xl px-5 py-3">
          <div className="flex items-center gap-1 sm:gap-3">
            {pipelineSteps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-1 sm:gap-2">
                <PipelineStep num={s.num} title={s.title} active={activeStep === s.num} done={activeStep > s.num || (result && activeStep >= s.num)} />
                {i < pipelineSteps.length - 1 && (
                  <div className={`hidden sm:block h-px flex-1 w-8 ${activeStep > s.num ? 'bg-green-700' : 'bg-slate-700'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Input panel ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-sentinel-800">
            {[
              { v: 'scenario', label: '🎭  Scenario Mode' },
              { v: 'transaction', label: '📋  Transaction' },
            ].map(m => (
              <button
                key={m.v}
                onClick={() => setMode(m.v)}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${mode === m.v ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === 'scenario' ? (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider px-1">
                Select a fraud scenario to simulate
              </p>
              {SCENARIOS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setScenario(s.value)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    scenario === s.value
                      ? 'border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/20'
                      : 'border-slate-700 bg-sentinel-800 hover:border-slate-500 hover:bg-sentinel-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.icon}</span>
                    <span className="font-semibold text-sm text-slate-100">{s.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 ml-6">{s.desc}</p>
                  <p className="text-xs text-slate-600 mt-0.5 ml-6">
                    Expected: <span className="text-slate-500">{s.expect}</span>
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-sentinel-800 border border-slate-700 rounded-xl p-4 space-y-3">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">PaySim Transaction Fields</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: 'step', l: 'Step (1–744)', t: 'number', s: '1' },
                  { k: 'type', l: 'Type' },
                  { k: 'amount', l: 'Amount', t: 'number', s: '0.01' },
                  { k: 'nameOrig', l: 'Sender' },
                  { k: 'nameDest', l: 'Receiver' },
                  { k: 'oldbalanceOrg', l: 'Old Bal (Orig)', t: 'number', s: '0.01' },
                  { k: 'newbalanceOrig', l: 'New Bal (Orig)', t: 'number', s: '0.01' },
                  { k: 'oldbalanceDest', l: 'Old Bal (Dest)', t: 'number', s: '0.01' },
                  { k: 'newbalanceDest', l: 'New Bal (Dest)', t: 'number', s: '0.01' },
                ].map(f => (
                  <div key={f.k} className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">{f.l}</label>
                    {f.k === 'type' ? (
                      <select
                        value={tx.type}
                        onChange={e => setTx(p => ({ ...p, type: e.target.value }))}
                        className="bg-sentinel-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                      >
                        {TX_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    ) : (
                      <input
                        type={f.t || 'text'}
                        step={f.s}
                        value={tx[f.k]}
                        onChange={e => setTx(p => ({
                          ...p,
                          [f.k]: f.t === 'number' ? parseFloat(e.target.value) || 0 : e.target.value,
                        }))}
                        className="bg-sentinel-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <><span className="animate-spin text-base">⟳</span> Running pipeline…</> : '▶  Run DeepSentinel Pipeline'}
          </button>

          {error && (
            <div className="bg-red-950/40 border border-red-700/60 text-red-300 rounded-xl p-3.5 space-y-1.5 text-sm">
              <p className="font-semibold">Pipeline Error</p>
              <p className="text-red-400 text-xs">{error}</p>
              <p className="text-slate-600 text-xs pt-1">
                Start the backend first:
                <code className="block mt-1 bg-sentinel-900 text-slate-400 px-2 py-1 rounded text-xs">
                  python -m uvicorn backend.main:app --reload --port 8000
                </code>
              </p>
            </div>
          )}
        </div>

        {/* ── Results panel ── */}
        <div className="lg:col-span-3 space-y-4">

          {!result && !loading && (
            <div className="h-72 flex flex-col items-center justify-center gap-3 text-slate-700 border border-dashed border-slate-800 rounded-2xl">
              <span className="text-5xl">🔍</span>
              <p className="font-medium text-slate-600">Select a scenario and run the pipeline</p>
              <p className="text-xs">Results will appear here</p>
            </div>
          )}

          {result && (
            <>
              {/* ── STAGE 1+2+3: Transaction + Scores ── */}
              <div className="bg-sentinel-800 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Stage 1–3 · Transaction → Scores → Fusion</p>
                    <p className="font-mono text-xs text-slate-400 mt-0.5">{result.transaction_id}</p>
                    {result.mock_scenario && (
                      <p className="text-xs text-amber-500 mt-0.5">
                        Scenario: <span className="font-semibold">{result.mock_scenario}</span>
                        <span className="ml-1 text-slate-600">(mock scores)</span>
                      </p>
                    )}
                  </div>
                  <RiskBadge classification={result.classification} large />
                </div>

                <div className="p-5 flex flex-col sm:flex-row gap-6 items-center">
                  {/* Fused gauge */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <ScoreGauge score={result.fraud_confidence_score} label="Fraud Confidence" size={136} />
                    <p className="text-xs text-slate-500 text-center max-w-[120px] leading-tight">
                      Fused from all 3 modalities via Logistic Regression
                    </p>
                  </div>

                  {/* Modality bars */}
                  <div className="flex-1 space-y-5 w-full">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      Per-Modality Scores
                      <span className="ml-2 font-normal text-slate-600">({result.modalities_used} of 3 available)</span>
                    </p>
                    {(['graph', 'behavioral', 'temporal']).map(key => {
                      const meta = MODALITY_META[key]
                      return (
                        <div key={key} className="space-y-1.5">
                          <ModalityBar
                            label={meta.label}
                            score={result[`${key}_score`]}
                            available={result[`${key}_available`]}
                            icon={meta.icon}
                          />
                          <p className="text-xs text-slate-600 ml-6">
                            {meta.member} · {meta.component}
                            {!result[`${key}_available`] && ' — score imputed to 0.5 with penalty'}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ── STAGE 4: FATF Retrieval ── */}
              <div className="bg-sentinel-800 border border-slate-700 rounded-2xl p-5">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">
                  Stage 4 · RAG Retrieval — FATF Typology Match
                </p>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-slate-100">{result.retrieval.typology_name}</p>
                    <p className="text-xs text-slate-500 max-w-sm">
                      The fused risk profile was converted to a semantic query and matched against 10
                      FATF typologies in ChromaDB using cosine similarity.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      <code className="bg-sentinel-900 border border-slate-700 text-slate-400 text-xs px-2 py-0.5 rounded">
                        {result.retrieval.typology_id}
                      </code>
                      <span className="text-xs text-slate-500">Stage: {result.retrieval.stage}</span>
                      <RiskBadge classification={result.retrieval.risk_level} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-3xl font-bold font-mono text-blue-400">
                      {(result.retrieval.similarity_score * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">cosine similarity</p>
                    <p className="text-xs text-slate-600 mt-1">RAG retrieval score</p>
                  </div>
                </div>
              </div>

              {/* ── STAGE 5: LLM Report ── */}
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 px-1">
                  Stage 5 · LLM Forensic Report — Chain-of-Evidence Grounded Output
                </p>
                <ForensicReport report={result.forensic_report} loading={loading} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
