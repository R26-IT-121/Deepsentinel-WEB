import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROLE_LABELS, useAuth } from '../context/AuthContext'
import { Badge, cx } from './ui'

const ROLE_TONE = {
  admin: 'admin',
  risk_manager: 'manager',
  analyst: 'analyst',
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Navigation is filtered by capability, so a user is never shown a link that
  // would refuse them.
  const links = [
    { to: '/', label: 'Overview' },
    { to: '/analyzer', label: 'Analyzer' },
    auth.canManageAlerts && { to: '/settings', label: 'Settings' },
    auth.canManageUsers && { to: '/users', label: 'Users' },
    auth.canViewAuditLog && { to: '/audit-log', label: 'Audit Log' },
    { to: '/about', label: 'About' },
  ].filter(Boolean)

  useEffect(() => {
    setMobileOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // Close the user menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const handleSignOut = async () => {
    await auth.signOut()
    navigate('/login', { replace: true })
  }

  const initials = (auth.user?.full_name || auth.user?.username || '?')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <nav
      className="sticky top-0 z-50 border-b border-subtle"
      style={{ background: 'rgba(6,9,26,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-500/30">
            DS
          </div>
          <span className="hidden text-base font-semibold tracking-tight text-white sm:block">
            Deep<span className="text-blue-400">Sentinel</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={pathname === l.to ? 'page' : undefined}
              className={cx(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === l.to
                  ? 'bg-surface-overlay text-white'
                  : 'text-slate-400 hover:bg-surface-raised hover:text-slate-100',
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-surface-raised"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-[11px] font-semibold text-white">
                {initials}
              </span>
              <span className="max-w-[10rem] truncate text-sm text-slate-300">
                {auth.user?.full_name || auth.user?.username}
              </span>
              <span className="text-[10px] text-slate-600">▼</span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-64 animate-slide-up overflow-hidden rounded-xl border border-subtle shadow-2xl"
                style={{ background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(16px)' }}
              >
                <div className="border-b border-subtle p-4">
                  <p className="truncate text-sm font-medium text-white">
                    {auth.user?.full_name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{auth.user?.email}</p>
                  <Badge tone={ROLE_TONE[auth.role]} className="mt-2">
                    {ROLE_LABELS[auth.role] ?? auth.role}
                  </Badge>
                </div>
                <div className="p-1.5">
                  <Link
                    to="/account"
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-surface-raised hover:text-white"
                  >
                    Account &amp; password
                  </Link>
                  <button
                    onClick={handleSignOut}
                    role="menuitem"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-surface-raised hover:text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="space-y-1 border-t border-subtle px-4 py-3 md:hidden"
          style={{ background: 'rgba(6,9,26,0.98)' }}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cx(
                'block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                pathname === l.to
                  ? 'bg-surface-overlay text-white'
                  : 'text-slate-400 hover:bg-surface-raised hover:text-white',
              )}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-3 space-y-1 border-t border-subtle pt-3">
            <div className="px-4 py-2">
              <p className="truncate text-sm text-white">{auth.user?.full_name}</p>
              <Badge tone={ROLE_TONE[auth.role]} className="mt-1.5">
                {ROLE_LABELS[auth.role] ?? auth.role}
              </Badge>
            </div>
            <Link
              to="/account"
              className="block rounded-xl px-4 py-2.5 text-sm text-slate-400 hover:bg-surface-raised hover:text-white"
            >
              Account &amp; password
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
