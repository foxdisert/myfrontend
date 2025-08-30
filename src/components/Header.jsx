import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X, Search, Globe, BarChart3, Sparkles, User, LogOut, ChevronDown, Home, Shield, Settings } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserDropdownOpen])

  const navigation = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'Check Domain', href: '/check', icon: Search },
    { name: 'Suggestions', href: '/suggestions', icon: Sparkles },
    { name: 'Estimation', href: '/estimation', icon: BarChart3 },
    { name: 'Combiner', href: '/combiner', icon: Sparkles },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white shadow-xl border-b border-gray-100' 
        : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Domain Toolkit
                </span>
                <span className={`text-xs font-medium transition-all duration-300 ${
                  scrolled ? 'text-gray-500' : 'text-white/80'
                }`}>
                  Professional Domain Management
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive(item.href)
                      ? scrolled 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'bg-white/20 text-white'
                      : scrolled 
                        ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                        : 'text-white hover:text-white hover:bg-white/20'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 transition-all duration-300 ${
                      isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transform -translate-x-1/2"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Dropdown */}
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                      <div className="text-xs text-gray-500">User</div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                      isUserDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-[9998]" 
                        onClick={() => setIsUserDropdownOpen(false)}
                      />
                      
                      {/* Dropdown Content */}
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[9999] animate-slide-down">
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {user?.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                              <div className="text-xs text-gray-500">{user?.email}</div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
                          >
                            <Home className="h-4 w-4" />
                            <span className="text-sm font-medium">Dashboard</span>
                          </Link>

                          <Link
                            to="/profile"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
                          >
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">Profile</span>
                          </Link>

                          <Link
                            to="/settings"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
                          >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm font-medium">Settings</span>
                          </Link>

                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                            >
                              <Shield className="h-4 w-4" />
                              <span className="text-sm font-medium">Admin Panel</span>
                            </Link>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-2"></div>

                        {/* Logout */}
                        <div className="px-4 py-2">
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsUserDropdownOpen(false)
                            }}
                            className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"
                          >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                    scrolled 
                      ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                scrolled 
                  ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 border-t border-white/20">
            {navigation.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive(item.href)
                      ? 'text-white bg-white/20' 
                      : 'text-white hover:text-white hover:bg-white/20'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
            
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/20"
                  >
                    <Crown className="h-5 w-5" />
                    <span className="text-sm font-medium">Admin</span>
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/20"
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/20"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/20"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-red-500/20"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            )}
            
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/20"
                >
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600"
                >
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
