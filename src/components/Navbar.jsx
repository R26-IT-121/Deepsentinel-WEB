import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Platform Overview' },
    { to: '/analyzer', label: 'Transaction Analyzer' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-sentinel-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            DS
          </div>
          <span className="font-bold text-slate-100 tracking-tight">DeepSentinel</span>
          <span className="hidden sm:inline text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">
            R26-IT-121
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-sentinel-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
