import { Link } from 'react-router-dom'
import ArchitectureDiagram from '../components/ArchitectureDiagram'

const PIPELINE_STEPS = [
  {
    num: '01',
    title: 'Transaction Arrives',
    desc: 'A PaySim or real-time transaction is submitted to the DeepSentinel FastAPI orchestrator.',
    icon: '📥',
    accent: 'from-slate-500 to-slate-400',
    border: 'border-slate-700',
  },
  {
    num: '02',
    title: 'Parallel Model Scoring',
    desc: 'Three specialized deep learning models score the transaction simultaneously via async HTTP calls.',
    icon: '🔀',
    accent: 'from-purple-500 to-violet-400',
    border: 'border-purple-700/50',
    sub: [
      { label: 'Edge-Enhanced GraphSAGE', detail: 'Detects mule ring topology' },
      { label: 'Stratified VAE + DSAA', detail: 'Flags behavioral anomalies' },
      { label: 'TSCFD Temporal CNN', detail: 'Measures timing burstiness' },
    ],
  },
  {
    num: '03',
    title: 'Ensemble Fusion',
    desc: 'A calibrated Logistic Regression meta-classifier fuses the three scores into a single Fraud Confidence Score. Missing models are handled with a confidence penalty.',
    icon: '⚖️',
    accent: 'from-green-500 to-emerald-400',
    border: 'border-green-700/50',
  },
  {
    num: '04',
    title: 'FATF Typology Retrieval',
    desc: 'The fused risk profile is converted to a semantic query and matched against 10 FATF fraud typologies stored in a local ChromaDB vector database using cosine similarity.',
    icon: '🔍',
    accent: 'from-blue-500 to-cyan-400',
    border: 'border-blue-700/50',
  },
  {
    num: '05',
    title: 'LLM Forensic Report',
    desc: 'A Chain-of-Evidence prompt forces the LLM to write a 5-section forensic report citing only the retrieved FATF typology and the actual numeric scores — no hallucination.',
    icon: '📋',
    accent: 'from-red-500 to-rose-400',
    border: 'border-red-700/50',
  },
  {
    num: '06',
    title: 'Investigator Dashboard',
    desc: 'The AML investigator sees per-modality risk gauges, the fraud classification, the matched FATF typology, and the full forensic report — everything needed to authorize a SAR filing.',
    icon: '🖥️',
    accent: 'from-cyan-500 to-teal-400',
    border: 'border-cyan-700/50',
  },
]

const STATS = [
  { n: '3', label: 'Detection Modalities' },
  { n: '10', label: 'FATF Typologies' },
  { n: '0.988', label: 'Meta-Classifier F1' },
  { n: '5', label: 'Pipeline Stages' },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">

      {/* ── HERO ── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full font-medium">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          AI-Powered Anti-Money Laundering Platform
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          <span className="text-white">Deep</span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Sentinel</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A cloud-native multi-modal AI platform that detects organized financial crime
          and <span className="text-white font-medium">automatically generates audit-traceable forensic reports</span> —
          solving the AI black-box problem in banking compliance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/analyzer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm"
          >
            Open Analyzer →
          </Link>
          <Link
            to="/about"
            className="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            Meet the Team
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-10 pt-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-blue-400 font-mono">{s.n}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">System Architecture</h2>
          <p className="text-slate-500 text-sm">End-to-end pipeline from raw transaction to forensic report.</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">How the Pipeline Works</h2>
          <p className="text-slate-500 text-sm">Six stages from transaction ingestion to investigator-ready report.</p>
        </div>
        <div className="relative">
          <div className="absolute left-7 top-8 bottom-8 w-px bg-slate-800 hidden sm:block" />
          <div className="space-y-3">
            {PIPELINE_STEPS.map((step) => (
              <div key={step.num} className="flex gap-4 items-start group">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl border ${step.border} bg-[#0d1117] flex flex-col items-center justify-center z-10 transition-colors`}>
                  <span className="text-lg leading-none">{step.icon}</span>
                  <span className="text-xs font-mono text-slate-600 mt-0.5">{step.num}</span>
                </div>
                <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-slate-700 hover:bg-slate-900/70 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.accent}`} />
                    <p className="font-semibold text-slate-100 text-sm">{step.title}</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  {step.sub && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {step.sub.map(s => (
                        <span key={s.label} className="text-xs bg-[#0d1117] border border-slate-800 text-slate-400 px-2.5 py-1 rounded-lg">
                          <span className="text-slate-300 font-medium">{s.label}</span>
                          <span className="ml-1 text-slate-600">— {s.detail}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH GAP ── */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">The Research Gap We're Solving</h2>
          <p className="text-slate-500 text-sm">Confirmed absent across 427 papers in the ScienceDirect 2025 fraud detection survey.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <p className="font-semibold text-red-400">The Problem</p>
            </div>
            <p className="text-slate-500 leading-relaxed">Deep learning fraud models output a risk score but no explanation. AML investigators cannot file a SAR based on a number alone — they need a legally traceable narrative.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <p className="font-semibold text-amber-400">Why Existing Tools Fail</p>
            </div>
            <p className="text-slate-500 leading-relaxed">SHAP/LIME produce numeric feature weights — not legal narratives. Plain LLM forensic tools hallucinate facts that courts reject. Neither is legally admissible.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <p className="font-semibold text-green-400">Our Contribution</p>
            </div>
            <p className="text-slate-500 leading-relaxed">Typology-Grounded RAG: the LLM is forced to anchor every claim to a retrieved FATF typology and a specific numerical score — making forensic reports legally admissible.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
            <span>🏛️</span>
            <div>
              <p className="text-xs font-semibold text-blue-300">SDG 16</p>
              <p className="text-xs text-slate-500">Peace, Justice & Strong Institutions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg px-4 py-2">
            <span>🏗️</span>
            <div>
              <p className="text-xs font-semibold text-purple-300">SDG 9</p>
              <p className="text-xs text-slate-500">Industry, Innovation & Infrastructure</p>
            </div>
          </div>
          <Link
            to="/about"
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg px-4 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors ml-auto"
          >
            Meet the research team →
          </Link>
        </div>
      </section>

    </div>
  )
}
