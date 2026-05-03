import { Link } from 'react-router-dom'
import ArchitectureDiagram from '../components/ArchitectureDiagram'

const TEAM = [
  {
    id: 'IT22217936',
    name: 'Ewaduge S.B',
    component: 'Edge-Enhanced GraphSAGE',
    role: 'Network Topology Intelligence',
    output: 'relational_risk_score + Suspicious Subgraph',
    tech: 'PyTorch Geometric · NetworkX · FastAPI',
    color: 'purple',
  },
  {
    id: 'IT22109194',
    name: 'Wijesinghe L.P.D.B',
    component: 'Stratified VAE + DSAA',
    role: 'Behavioral Anomaly Detection',
    output: 'behavioral_risk_score + Anomaly Fingerprints',
    tech: 'TensorFlow/Keras · FastAPI',
    color: 'orange',
  },
  {
    id: 'IT22237972',
    name: 'Pathirana P.K.V',
    component: 'TSCFD Temporal CNN',
    role: 'Temporal Rhythm Analysis',
    output: 'temporal_risk_score + Burstiness',
    tech: 'TensorFlow/Keras · FastAPI',
    color: 'blue',
  },
  {
    id: 'IT22192882',
    name: 'Vidanaarachchi T.M',
    component: 'Fusion Engine + Generative Explainability',
    role: 'Orchestration · RAG · LLM Forensics',
    output: 'Fraud Confidence Score + Forensic Report',
    tech: 'scikit-learn · ChromaDB · Gemini · FastAPI',
    color: 'green',
    self: true,
  },
]

const COLOR_MAP = {
  purple: { border: 'border-purple-500/40', badge: 'bg-purple-900/50 text-purple-300', dot: 'bg-purple-500' },
  orange: { border: 'border-orange-500/40', badge: 'bg-orange-900/50 text-orange-300', dot: 'bg-orange-500' },
  blue:   { border: 'border-blue-500/40',   badge: 'bg-blue-900/50 text-blue-300',   dot: 'bg-blue-500' },
  green:  { border: 'border-green-500/40',  badge: 'bg-green-900/50 text-green-300',  dot: 'bg-green-500' },
}

const PIPELINE = [
  { step: '01', label: 'Transaction Ingestion', desc: 'PaySim or real-time transaction data arrives via FastAPI' },
  { step: '02', label: 'Parallel Async Scoring', desc: 'GNN, VAE, and TCN modules score independently via async HTTP calls' },
  { step: '03', label: 'Ensemble Fusion', desc: 'Logistic Regression meta-classifier fuses 3 scores into one Fraud Confidence Score' },
  { step: '04', label: 'RAG Typology Retrieval', desc: 'Cosine similarity search matches risk profile to FATF fraud typology in ChromaDB' },
  { step: '05', label: 'LLM Forensic Reporting', desc: 'Chain-of-Evidence prompt forces Gemini to cite only retrieved FATF facts + numeric scores' },
  { step: '06', label: 'Investigator Dashboard', desc: 'Per-modality gauges, risk classification, and full forensic report rendered for the AML investigator' },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/50 text-blue-300 text-xs px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Group Project R26-IT-121 · SLIIT · Supervisor: Mrs. Anjalie Gamage
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight leading-tight">
          DeepSentinel
        </h1>
        <p className="text-lg text-blue-400 font-medium">
          A Cloud-Native Multi-Modal AI Platform for Explainable Financial Fraud Detection
        </p>
        <p className="max-w-2xl mx-auto text-slate-400 leading-relaxed">
          DeepSentinel fuses signals from Graph Neural Networks, Variational Autoencoders, and Temporal CNNs
          through a Logistic Regression ensemble, then uses a RAG-grounded LLM to generate
          audit-traceable forensic investigation reports — eliminating the AI "black-box" problem in banking.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            to="/analyzer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Launch Analyzer →
          </Link>
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-slate-100 font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            API Docs
          </a>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100">System Architecture</h2>
        <div className="bg-sentinel-800 border border-slate-700 rounded-xl p-4">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Pipeline Steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100">End-to-End Pipeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PIPELINE.map((p) => (
            <div key={p.step} className="bg-sentinel-800 border border-slate-700 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-blue-500 text-lg font-bold">{p.step}</span>
                <span className="font-semibold text-slate-200 text-sm">{p.label}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Research Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEAM.map((m) => {
            const c = COLOR_MAP[m.color]
            return (
              <div
                key={m.id}
                className={`bg-sentinel-800 border rounded-xl p-5 space-y-3 ${c.border} ${
                  m.self ? 'ring-1 ring-blue-500/30' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-100">{m.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{m.id}</p>
                  </div>
                  {m.self && (
                    <span className="text-xs bg-blue-900/60 border border-blue-700 text-blue-300 px-2 py-0.5 rounded-full">
                      Member 4 · You
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-200">{m.component}</p>
                  <p className={`text-xs mt-0.5 px-2 py-0.5 rounded inline-block ${c.badge}`}>{m.role}</p>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-500">Output → <span className="font-mono text-slate-400">{m.output}</span></p>
                  <p className="text-slate-600">{m.tech}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="bg-sentinel-800 border border-slate-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-bold text-slate-100">SDG Alignment</h2>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-blue-900/30 border border-blue-700/40 rounded-lg px-4 py-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <p className="font-semibold text-blue-300 text-sm">SDG 16</p>
              <p className="text-slate-400 text-xs">Peace, Justice & Strong Institutions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-purple-900/30 border border-purple-700/40 rounded-lg px-4 py-2">
            <span className="text-2xl">🏗️</span>
            <div>
              <p className="font-semibold text-purple-300 text-sm">SDG 9</p>
              <p className="text-slate-400 text-xs">Industry, Innovation & Infrastructure</p>
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          By providing transparent, audit-traceable AI forensic reports grounded in FATF typologies,
          DeepSentinel equips regulatory bodies and AML investigators with legally defensible evidence
          to disrupt organized financial crime and protect vulnerable populations from illicit fund flows.
        </p>
      </section>
    </div>
  )
}
