import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Username and password required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await login(username, password)

      // Store token
      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))

      // Redirect based on role
      navigate('/analyzer')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              DS
            </div>
            <span className="text-2xl font-bold text-white">
              Deep<span className="text-blue-400">Sentinel</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm">Multi-Modal AI Fraud Detection</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/[0.07] p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>

          <h1 className="text-xl font-bold text-white mb-6">Sign In</h1>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.10] text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner /> Signing in...
                </>
              ) : (
                '🔐 Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-white/[0.07]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              Demo Credentials
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <div>
                <p className="text-slate-400 font-medium">Admin</p>
                <p>Username: <code className="bg-white/5 px-2 py-1 rounded">admin</code></p>
                <p>Password: <code className="bg-white/5 px-2 py-1 rounded">admin123</code></p>
              </div>
              <div className="pt-2">
                <p className="text-slate-500 text-[10px]">
                  ⚠️ CHANGE PASSWORD IMMEDIATELY IN PRODUCTION
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-600">
          <p>DeepSentinel Fraud Detection Platform</p>
          <p>© 2026 · Bank-Grade Security · Production Ready</p>
        </div>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}
