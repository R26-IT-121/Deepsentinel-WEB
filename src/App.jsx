import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setAuthToken, getCurrentUser } from './services/api'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Settings from './pages/Settings'
import About from './pages/About'
import FAQ from './pages/FAQ'

function ProtectedRoute({ element, isAuthenticated, isLoading }) {
  if (isLoading) return <div className="min-h-screen bg-[#06091a] flex items-center justify-center"><p className="text-white">Loading...</p></div>
  return isAuthenticated ? element : <Navigate to="/login" />
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user already logged in
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthToken(null)
    setIsAuthenticated(false)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#06091a]">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <main>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/analyzer" /> : <Login />} />
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/analyzer" element={<ProtectedRoute element={<Analyzer />} isAuthenticated={isAuthenticated} isLoading={isLoading} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings />} isAuthenticated={isAuthenticated} isLoading={isLoading} />} />
            <Route path="/about" element={<ProtectedRoute element={<About />} isAuthenticated={isAuthenticated} isLoading={isLoading} />} />
            <Route path="/faq" element={<ProtectedRoute element={<FAQ />} isAuthenticated={isAuthenticated} isLoading={isLoading} />} />
          </Routes>
        </main>

        <footer className="border-t border-white/[0.06] mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

              {/* Brand */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                    DS
                  </div>
                  <span className="font-semibold text-white">DeepSentinel</span>
                </div>
                <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                  Multi-Modal AI Platform for Explainable Financial Fraud Detection.
                  SLIIT Final Year Research Project 2026.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-600">
                <div className="space-y-2">
                  <p className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Platform</p>
                  <div className="space-y-1.5">
                    <a href="/" className="block hover:text-slate-400 transition-colors">Overview</a>
                    <a href="/analyzer" className="block hover:text-slate-400 transition-colors">Analyzer</a>
                    <a href="/faq" className="block hover:text-slate-400 transition-colors">FAQ</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Developers</p>
                  <div className="space-y-1.5">
                    <a href="https://deepsent-api-production.up.railway.app/docs" target="_blank" rel="noreferrer" className="block hover:text-slate-400 transition-colors">API Docs ↗</a>
                    <a href="https://deepsent-api-production.up.railway.app/health" target="_blank" rel="noreferrer" className="block hover:text-slate-400 transition-colors">API Status ↗</a>
                    <a href="https://github.com/R26-IT-121" target="_blank" rel="noreferrer" className="block hover:text-slate-400 transition-colors">GitHub ↗</a>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Research</p>
                  <div className="space-y-1.5">
                    <a href="/about" className="block hover:text-slate-400 transition-colors">The Team</a>
                    <span className="block text-slate-700">FATF Typologies</span>
                    <span className="block text-slate-700">SDG 16 · SDG 9</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-700">
              <p>© 2026 DeepSentinel · SLIIT · All rights reserved.</p>
              <p>Built with FastAPI · ChromaDB · Gemini · React</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
