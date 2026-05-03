import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sentinel-950">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-800 text-center py-6 text-xs text-slate-600 mt-10">
          DeepSentinel · R26-IT-121 · SLIIT · 2026 &nbsp;|&nbsp; Supervisor: Mrs. Anjalie Gamage
        </footer>
      </div>
    </BrowserRouter>
  )
}
