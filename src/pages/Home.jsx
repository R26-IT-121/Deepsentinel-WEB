import { Link } from 'react-router-dom'
import ArchitectureDiagram from '../components/ArchitectureDiagram'

const PIPELINE_STEPS = [
  {
    num: '01',
    title: 'Transaction Arrives',
    desc: 'A PaySim or real-time transaction is submitted to the DeepSentinel FastAPI orchestrator.',
    icon: '📥',
    color: 'border-slate-600',
  },
  {
    num: '02',
    title: 'Parallel Model Scoring',
    desc: 'Three specialized models score the transaction simultaneously via async HTTP calls.',
    icon: '🔀',
    color: 'border-purple-600',
    sub: [
      { label: 'GNN (Member 2)', detail: 'Detects mule ring topology' },
      { label: 'VAE (Member 1)', detail: 'Flags behavioral anomalies' },
      { label: 'TCN (Member 3)', detail: 'Measures timing burstiness' },
    ],
  },
  {
    num: '03',
    title: 'Ensemble Fusion',
    desc: 'A calibrated Logistic Regression meta-classifier fuses the three scores into a single Fraud Confidence Score (0–1). Missing models are handled with a confidence penalty.',
    icon: '⚖️',
    color: 'border-green-600',
  },
  {
    num: '04',
    title: 'FATF Typology Retrieval',
    desc: 'The fused risk profile is converted to a semantic query and matched against 10 FATF fraud typologies stored in a local ChromaDB vector database using cosine similarity.',
    icon: '🔍',
    color: 'border-blue-600',
  },
  {
    num: '05',
    title: 'LLM Forensic Report',
    desc: 'A Chain-of-Evidence prompt forces the LLM (Gemini / Llama 3) to write a 5-section forensic report citing only the retrieved FATF typology and the actual numeric scores — no hallucination.',
    icon: '📋',
    color: 'border-red-600',
  },
  {
    num: '06',
    title: 'Investigator Dashboard',
    desc: 'The AML investigator sees per-modality risk gauges, the fraud classification, the matched FATF typology, and the full forensic report — everything needed to authorize a SAR filing.',
    icon: '🖥️',
    color: 'border-cyan-600',
  },
]

const TEAM = [
  {
    num: 1,
    id: 'IT22217936',
    name: 'Ewaduge S.B',
    component: 'Edge-Enhanced GraphSAGE',
    tagline: 'Detects mule rings and hub-and-spoke laundering networks',
    score_field: 'relational_risk_score',
    tech: 'PyTorch Geometric · NetworkX',
    color: 'purple',
    status: 'Stage 1 + 2 trained ✓',
  },
  {
    num: 2,
    id: 'IT22109194',
    name: 'Wijesinghe L.P.D.B',
    component: 'Stratified VAE + DSAA',
    tagline: 'Flags behavioral anomalies per transaction type',
    score_field: 'behavioral_risk_score',
    tech: 'TensorFlow/Keras',
    color: 'orange',
    status: 'Technical spec ready',
  },
  {
    num: 3,
    id: 'IT22237972',
    name: 'Pathirana P.K.V',
    component: 'TSCFD Temporal CNN',
    tagline: 'Detects automated fraud scripts via timing burstiness',
    score_field: 'temporal_risk_score',
    tech: 'TensorFlow/Keras',
    color: 'blue',
    status: 'Technical spec ready',
  },
  {
    num: 4,
    id: 'IT22192882',
    name: 'Vidanaarachchi T.M',
    component: 'Fusion Engine + Generative Explainability',
    tagline: 'Fuses all signals → RAG → LLM forensic report → Dashboard',
    score_field: 'fraud_confidence_score',
    tech: 'scikit-learn · ChromaDB · Gemini · FastAPI',
    color: 'green',
    status: 'Fusion + RAG + LLM built ✓',
    self: true,
  },
]

const BORDER = { purple: 'border-purple-500/50', orange: 'border-orange-500/50', blue: 'border-blue-500/50', green: 'border-green-500/50' }
const BADGE  = { purple: 'bg-purple-900/40 text-purple-300', orange: 'bg-orange-900/40 text-orange-300', blue: 'bg-blue-900/40 text-blue-300', green: 'bg-green-900/40 text-green-300' }
const STATUS_COLOR = { purple: 'text-purple-400', orange: 'text-orange-400', blue: 'text-blue-400', green: 'text-green-400' }

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-20">

      {/* ── HERO ── */}
      <section className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/60 text-blue-300 text-xs px-4 py-1.5 rounded-full font-medium">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          R26-IT-121 · SLIIT · Supervisor: Mrs. Anjalie Gamage · 2026
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Deep<span className="text-blue-400">Sentinel</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A cloud-native multi-modal AI platform that detects organized financial crime
          and <span className="text-white font-medium">automatically generates audit-traceable forensic reports</span> — solving
          the AI "black-box" problem in banking compliance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/analyzer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-2.5 rounded-lg transition-colors text-sm"
          >
            Open Transaction Analyzer →
          </Link>
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            API Swagger Docs ↗
          </a>
        </div>

        {/* Key stats */}
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          {[
            { n: '3',     label: 'Detection Modalities' },
            { n: '10',    label: 'FATF Typologies in KB' },
            { n: '0.988', label: 'Meta-Classifier F1' },
            { n: '5',     label: 'Pipeline Stages' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-blue-400 font-mono">{s.n}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">System Architecture</h2>
          <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded">Member 4 scope highlighted</span>
        </div>
        <div className="bg-sentinel-800 border border-slate-700 rounded-2xl p-4 overflow-hidden">
          <ArchitectureDiagram />
        </div>
        <p className="text-xs text-slate-500 text-center">
          Dashed box = Member 4's scope (IT22192882). Upstream models connect via FastAPI REST contracts.
        </p>
      </section>

      {/* ── PIPELINE ── */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">How the Pipeline Works</h2>
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-7 top-10 bottom-10 w-px bg-slate-700 hidden sm:block" />
          <div className="space-y-4">
            {PIPELINE_STEPS.map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl border-2 ${step.color} bg-sentinel-800 flex flex-col items-center justify-center z-10`}>
                  <span className="text-xl leading-none">{step.icon}</span>
                  <span className="text-xs font-mono text-slate-500 mt-0.5">{step.num}</span>
                </div>
                <div className="flex-1 bg-sentinel-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors">
                  <p className="font-semibold text-slate-100">{step.title}</p>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                  {step.sub && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {step.sub.map(s => (
                        <span key={s.label} className="text-xs bg-sentinel-900 border border-slate-700 text-slate-400 px-2.5 py-1 rounded-lg">
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

      {/* ── TEAM ── */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white">Research Team</h2>
          <p className="text-sm text-slate-500 mt-1">Each member's component feeds one score into the fusion engine.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {TEAM.map(m => (
            <div key={m.id} className={`bg-sentinel-800 border rounded-xl p-5 space-y-3 ${BORDER[m.color]} ${m.self ? 'ring-1 ring-blue-500/40' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold font-mono ${STATUS_COLOR[m.color]}`}>M{m.num}</span>
                    <span className="font-semibold text-slate-100">{m.name}</span>
                    {m.self && <span className="text-xs bg-blue-900/50 border border-blue-700 text-blue-300 px-2 py-0.5 rounded-full">You</span>}
                  </div>
                  <p className="text-xs text-slate-500 font-mono">{m.id}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${BADGE[m.color]}`}>{m.status}</span>
              </div>

              <div>
                <p className="font-medium text-sm text-slate-200">{m.component}</p>
                <p className="text-xs text-slate-500 mt-0.5">{m.tagline}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-600">{m.tech}</span>
                <code className="bg-sentinel-900 border border-slate-700 text-slate-400 px-2 py-0.5 rounded">{m.score_field}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESEARCH CONTEXT ── */}
      <section className="bg-sentinel-800 border border-slate-700 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Why This Matters — The Research Gap</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-semibold text-red-400">The Problem</p>
            <p className="text-slate-400 leading-relaxed">Deep learning fraud models are "black boxes" — they output a risk score but no explanation. AML investigators cannot file a SAR or freeze accounts based on a number alone.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-yellow-400">Prior Work Falls Short</p>
            <p className="text-slate-400 leading-relaxed">SHAP/LIME give numeric feature weights, not legal narratives. Existing LLM forensic tools process text documents only — they're disconnected from deep learning risk vectors and prone to hallucination.</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-green-400">DeepSentinel's Contribution</p>
            <p className="text-slate-400 leading-relaxed">Typology-Grounded RAG architecture: the LLM is forced to anchor every claim to a retrieved FATF typology and a specific numerical score — making forensic reports legally admissible and fully traceable.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <div className="flex items-center gap-2 bg-blue-950/60 border border-blue-800/40 rounded-lg px-4 py-2">
            <span className="text-xl">🏛️</span>
            <div>
              <p className="text-xs font-semibold text-blue-300">SDG 16</p>
              <p className="text-xs text-slate-500">Peace, Justice & Strong Institutions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-800/40 rounded-lg px-4 py-2">
            <span className="text-xl">🏗️</span>
            <div>
              <p className="text-xs font-semibold text-purple-300">SDG 9</p>
              <p className="text-xs text-slate-500">Industry, Innovation & Infrastructure</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
