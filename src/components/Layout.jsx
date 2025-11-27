import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from './Header'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import SeoUpdater from './SeoUpdater'

const Layout = ({ children }) => {
  const { loading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const isWatchPage = location.pathname.startsWith('/watch')

  useEffect(() => {
    // Set loading to false when auth context loading is complete
    if (!loading) {
      setIsLoading(false)
    }
  }, [loading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading Domain Toolkit...</p>
        </div>
      </div>
    )
  }

  if (isWatchPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <SeoUpdater />
        {children}
        <CookieConsent />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SeoUpdater />
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default Layout
