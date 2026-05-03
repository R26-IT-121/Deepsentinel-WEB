import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Overview' },
  { to: '/analyzer', label: 'Analyzer' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            DS
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Deep<span className="text-blue-400">Sentinel</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === l.to
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://deepsent-api-production.up.railway.app/docs"
            target="_blank"
            rel="noreferrer"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all"
          >
            API Docs ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-slate-800 px-6 py-4 space-y-1 bg-[#080c14]">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
