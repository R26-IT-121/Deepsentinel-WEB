import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#080c14]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-800/60 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
                DS
              </div>
              <span className="text-slate-500 text-sm font-medium">DeepSentinel</span>
            </div>
            <p className="text-xs text-slate-600 text-center">
              Multi-Modal AI Platform for Explainable Financial Fraud Detection · SLIIT · 2026
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <a href="https://deepsent-api-production.up.railway.app/health" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">
                API Status
              </a>
              <a href="https://deepsent-api-production.up.railway.app/docs" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">
                API Docs
              </a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
