import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Settings from './pages/Settings'
import Users from './pages/Users'
import AuditLog from './pages/AuditLog'
import Account from './pages/Account'
import About from './pages/About'
import FAQ from './pages/FAQ'

function Shell() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-sentinel-950">
      {isAuthenticated && <Navbar />}

      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
            />

            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/analyzer" element={<ProtectedRoute><Analyzer /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />

            <Route
              path="/settings"
              element={
                <ProtectedRoute capability="canManageAlerts">
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute capability="canManageUsers">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit-log"
              element={
                <ProtectedRoute capability="canViewAuditLog">
                  <AuditLog />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {isAuthenticated && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Shell />
      </AuthProvider>
    </BrowserRouter>
  )
}
