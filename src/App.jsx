import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import './utils/secureLogging' // Import secure logging to override console in production
import Home from './pages/Home'
import DomainChecker from './pages/DomainChecker'
import DomainSuggestions from './pages/DomainSuggestions'
import DomainEstimation from './pages/DomainEstimation'
import DomainCombiner from './pages/DomainCombiner'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Guides from './pages/Guides'
import GuideDetail from './pages/GuideDetail'
import Sitemap from './components/Sitemap'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/check" element={<DomainChecker />} />
          <Route path="/suggestions" element={<DomainSuggestions />} />
          <Route path="/estimation" element={<DomainEstimation />} />
          <Route path="/combiner" element={<DomainCombiner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/sitemap" element={<Sitemap />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
