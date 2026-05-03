import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'Ewaduge S.B',
    role: 'Graph Neural Network Engineer',
    component: 'Edge-Enhanced GraphSAGE',
    tagline: 'Detects mule rings and hub-and-spoke laundering networks via graph topology analysis.',
    tech: ['PyTorch Geometric', 'NetworkX', 'Python'],
    color: 'purple',
    icon: '🕸️',
  },
  {
    name: 'Wijesinghe L.P.D.B',
    role: 'Behavioral Anomaly Researcher',
    component: 'Stratified VAE + DSAA',
    tagline: 'Flags behavioral anomalies per transaction type using variational autoencoders.',
    tech: ['TensorFlow', 'Keras', 'Python'],
    color: 'orange',
    icon: '📊',
  },
  {
    name: 'Pathirana P.K.V',
    role: 'Temporal Pattern Analyst',
    component: 'TSCFD Temporal CNN',
    tagline: 'Detects automated fraud scripts via timing burstiness and velocity signatures.',
    tech: ['TensorFlow', 'Keras', 'Python'],
    color: 'blue',
    icon: '⏱️',
  },
  {
    name: 'Vidanaarachchi T.M',
    role: 'Fusion & Explainability Engineer',
    component: 'Ensemble Fusion + RAG Forensics',
    tagline: 'Fuses all signals into a unified score and generates grounded forensic reports via RAG.',
    tech: ['scikit-learn', 'ChromaDB', 'Gemini', 'FastAPI', 'React'],
    color: 'green',
    icon: '⚖️',
    highlight: true,
  },
]

const ACCENT = {
  purple: { border: 'border-purple-700/40', bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-400' },
  orange: { border: 'border-orange-700/40', bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-400' },
  blue: { border: 'border-blue-700/40', bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  green: { border: 'border-green-700/40', bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400' },
}

const TECH_STACK = [
  { layer: 'API Layer', items: ['FastAPI', 'uvicorn', 'httpx', 'Pydantic'] },
  { layer: 'ML / Fusion', items: ['scikit-learn', 'NumPy', 'joblib'] },
  { layer: 'RAG / Vector', items: ['ChromaDB', 'sentence-transformers', 'all-MiniLM-L6-v2'] },
  { layer: 'LLM', items: ['Gemini 2.0 Flash', 'Google AI Studio', 'Chain-of-Evidence Prompting'] },
  { layer: 'Frontend', items: ['React 19', 'Vite 5', 'Tailwind CSS 3', 'Axios'] },
  { layer: 'Infrastructure', items: ['Railway (backend)', 'Vercel (frontend)', 'GitHub Actions'] },
]

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">

      {/* ── HERO ── */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full font-medium">
          SLIIT · Final Year Group Project · 2026
        </div>
        <h1 className="text-4xl font-bold text-white">The Team Behind DeepSentinel</h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Four researchers combining expertise in graph neural networks, behavioral AI,
          temporal pattern recognition, and generative explainability to build a
          legally-admissible fraud detection platform.
        </p>
      </section>

      {/* ── TEAM CARDS ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-white">Research Team</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {TEAM.map((m) => {
            const a = ACCENT[m.color]
            return (
              <div
                key={m.name}
                className={`bg-slate-900/60 border ${a.border} rounded-2xl p-6 space-y-4 ${m.highlight ? 'ring-1 ring-blue-500/20' : ''} hover:bg-slate-900/80 transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-white">{m.name}</p>
                      {m.highlight && (
                        <span className="text-xs bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                          This component
                        </span>
                      )}
                    </div>
                    <p className={`text-xs font-medium mt-0.5 ${a.text}`}>{m.role}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">{m.component}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {m.tech.map(t => (
                    <span key={t} className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-white">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACK.map((layer) => (
            <div key={layer.layer} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{layer.layer}</p>
              <div className="flex flex-wrap gap-1.5">
                {layer.items.map(item => (
                  <span key={item} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESEARCH CONTEXT ── */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-5">
        <h2 className="text-xl font-bold text-white">Research Context</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-400 leading-relaxed">
          <div className="space-y-3">
            <p>
              DeepSentinel addresses a critical gap confirmed in a <span className="text-slate-200">427-paper ScienceDirect 2025 survey</span> — no existing system combines a multi-modal deep learning fraud ensemble with a RAG layer that grounds an LLM's forensic narrative in a structured fraud typology knowledge base.
            </p>
            <p>
              The platform introduces a <span className="text-slate-200">Typology-Grounded LLM Forensic Analyst</span> — an architecture where the LLM retrieves matching FATF fraud typologies before generating any narrative, ensuring every claim is traceable to either a model output or a regulatory definition.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              The novelty is the <span className="text-slate-200">integration</span>: multi-modal deep learning (GNN + VAE + TCN) feeding a stacking ensemble, whose output drives a semantic RAG query against a FATF knowledge base, whose retrieved context constrains a Chain-of-Evidence LLM prompt.
            </p>
            <p>
              This combination has been independently confirmed absent in three peer-reviewed surveys (ScienceDirect 2025, arXiv April 2025, ScienceDirect January 2026), establishing defensible academic novelty.
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-3">
          <Link
            to="/analyzer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            Try the Analyzer →
          </Link>
          <a
            href="https://deepsent-api-production.up.railway.app/docs"
            target="_blank"
            rel="noreferrer"
            className="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            API Documentation ↗
          </a>
        </div>
      </section>

    </div>
  )
}
