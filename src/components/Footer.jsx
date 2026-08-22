import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-subtle">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
                DS
              </div>
              <span className="font-semibold text-white">DeepSentinel</span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-slate-600">
              Multi-modal AI platform for explainable financial fraud detection.
              SLIIT Final Year Research Project 2026.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 text-xs text-slate-600">
            <div className="space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Platform
              </p>
              <div className="space-y-1.5">
                <Link to="/" className="block transition-colors hover:text-slate-400">Overview</Link>
                <Link to="/analyzer" className="block transition-colors hover:text-slate-400">Analyzer</Link>
                <Link to="/faq" className="block transition-colors hover:text-slate-400">FAQ</Link>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Developers
              </p>
              <div className="space-y-1.5">
                <a href={`${API_BASE}/docs`} target="_blank" rel="noreferrer" className="block transition-colors hover:text-slate-400">
                  API Docs ↗
                </a>
                <a href={`${API_BASE}/health`} target="_blank" rel="noreferrer" className="block transition-colors hover:text-slate-400">
                  API Status ↗
                </a>
                <a href="https://github.com/LEXES7/R26-IT-121" target="_blank" rel="noreferrer" className="block transition-colors hover:text-slate-400">
                  GitHub ↗
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Research
              </p>
              <div className="space-y-1.5">
                <Link to="/about" className="block transition-colors hover:text-slate-400">The Team</Link>
                <span className="block text-slate-700">FATF Typologies</span>
                <span className="block text-slate-700">SDG 16 · SDG 9</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-subtle pt-6 text-[11px] text-slate-700 sm:flex-row">
          <p>© 2026 DeepSentinel · SLIIT · All rights reserved.</p>
          <p>FastAPI · PostgreSQL · ChromaDB · Gemini · React</p>
        </div>
      </div>
    </footer>
  )
}
