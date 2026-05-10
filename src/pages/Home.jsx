import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🕸️',
    title: 'Multi-Modal Detection',
    desc: 'Three specialized deep learning models — Graph Neural Network, Behavioral VAE, and Temporal CNN — analyse every transaction simultaneously across three independent dimensions of fraud.',
    accent: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/20',
    tag: 'GNN + VAE + TCN',
  },
  {
    icon: '🔍',
    title: 'FATF Typology Retrieval',
    desc: 'The fused risk profile is semantically matched against 10 documented financial crime typologies from the Financial Action Task Force using a local ChromaDB vector database.',
    accent: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20',
    tag: 'RAG · ChromaDB',
  },
  {
    icon: '📋',
    title: 'Grounded Forensic Reports',
    desc: 'A Chain-of-Evidence prompt constrains the LLM to cite only retrieved FATF definitions and actual model scores — producing legally admissible reports with zero hallucination.',
    accent: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/20',
    tag: 'Gemini 2.0 Flash',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Submit a Transaction',
    desc: 'Select a fraud scenario or enter a real PaySim transaction. The orchestrator dispatches it to all three models in parallel.',
  },
  {
    n: '02',
    title: 'Fuse & Retrieve',
    desc: 'A Logistic Regression meta-classifier fuses the three scores. The risk profile is matched against FATF typologies via cosine similarity.',
  },
  {
    n: '03',
    title: 'Receive a Forensic Report',
    desc: 'The LLM generates a 5-section audit-traceable report — Executive Summary, Evidence Analysis, Typology Grounding, Confidence Assessment, and Recommendation.',
  },
]

const STATS = [
  { n: '3', label: 'Detection Modalities' },
  { n: '10', label: 'FATF Typologies' },
  { n: '0.988', label: 'Classifier F1 Score' },
  { n: '427', label: 'Papers Surveyed — Gap Confirmed' },
]

export default function Home() {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-6 py-24">
        {/* Ambient glow background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            AI-Powered Anti-Money Laundering · SLIIT Research Project · 2026
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-white">Detect Fraud.</span>
            <br />
            <span className="gradient-text">Explain It Legally.</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            DeepSentinel is a multi-modal AI platform that combines Graph, Behavioral, and Temporal
            deep learning with a RAG-grounded LLM to generate{' '}
            <span className="text-slate-200 font-medium">audit-traceable forensic reports</span>{' '}
            that compliance investigators can actually use.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/analyzer"
              className="group bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 text-sm flex items-center gap-2"
            >
              Open Analyzer
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              to="/about"
              className="border border-white/10 hover:border-white/20 text-slate-400 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-all text-sm"
            >
              Meet the Team
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-10 pt-8 border-t border-white/5">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold gradient-text font-mono">{s.n}</p>
                <p className="text-xs text-slate-500 mt-1 max-w-[120px] leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Three Layers, One Report</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Each layer solves a different piece of the forensic puzzle. Together they produce something
            no existing system offers.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className={`relative card card-hover p-6 space-y-4 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} pointer-events-none`} />
              <div className="relative">
                <div className={`inline-flex items-center gap-2 text-xs font-mono border ${f.border} bg-black/20 px-2.5 py-1 rounded-lg text-slate-400 mb-4`}>
                  {f.tag}
                </div>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">From Transaction to Report in 3 Steps</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            The entire pipeline runs in under 10 seconds — from raw transaction data to a
            court-ready forensic narrative.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
              )}
              <div className="card card-hover p-6 h-full space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-bold flex items-center justify-center font-mono">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative card overflow-hidden p-10 text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/5 pointer-events-none" />
          <div className="relative space-y-4">
            <h2 className="text-3xl font-bold text-white">See It in Action</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Run any of 6 fraud scenarios through the live pipeline. The Fusion Engine, RAG
              retrieval, and LLM report are all real and deployed.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/analyzer"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm"
              >
                Open Transaction Analyzer →
              </Link>
              <Link
                to="/faq"
                className="border border-white/10 hover:border-white/20 text-slate-400 hover:text-white px-6 py-3 rounded-xl transition-all text-sm"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
