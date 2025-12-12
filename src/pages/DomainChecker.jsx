import { useState, useEffect } from 'react'

import { Search, Globe, Clock, Star, CheckCircle, XCircle, AlertCircle, ArrowRight, Zap, TrendingUp, Heart } from 'lucide-react'
import { domainAPI, userAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import AdSenseAd from '../components/AdSenseAd'

// Helper function to format prices consistently
const formatPrice = (price) => {
  if (price === null || price === undefined) return '0.00';

  // Convert to number if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  // Check if it's a valid number
  if (isNaN(numPrice)) return '0.00';

  // If the price is very large (like 106900), it might be in cents
  // But based on the user's feedback, 106900 should actually be $10.69
  // So we need to divide by 10000 instead of 100
  if (numPrice > 1000) {
    return (numPrice / 10000).toFixed(2);
  }

  // Otherwise, just format to 2 decimal places
  return numPrice.toFixed(2);
};

const DomainChecker = () => {
  const { user } = useAuth()
  const [domain, setDomain] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState(null)
  const [recentChecks, setRecentChecks] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loadingFavorites, setLoadingFavorites] = useState(false)

  useEffect(() => {
    loadRecentChecks()
    loadSuggestions()
    if (user) {
      loadFavorites()
    }
  }, [user])

  // Reload data when user changes
  useEffect(() => {
    if (user) {
      loadRecentChecks()
      loadFavorites()
    }
  }, [user])

  const loadFavorites = async () => {
    try {
      setLoadingFavorites(true)
      const data = await userAPI.getFavorites()
      setFavorites(data.data || data || [])
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setLoadingFavorites(false)
    }
  }

  const addToFavorites = async (domain) => {
    if (!user) {
      alert('Please log in to add domains to favorites')
      return
    }

    try {
      await userAPI.addFavorite(domain)
      await loadFavorites() // Reload favorites
      alert(`${domain} added to favorites!`)
    } catch (error) {
      console.error('Failed to add to favorites:', error)
      alert('Failed to add to favorites. Please try again.')
    }
  }

  const removeFromFavorites = async (domainId) => {
    try {
      await userAPI.removeFavorite(domainId)
      await loadFavorites() // Reload favorites
      alert('Domain removed from favorites!')
    } catch (error) {
      console.error('Failed to remove from favorites:', error)
      alert('Failed to remove from favorites. Please try again.')
    }
  }

  const isFavorite = (domain) => {
    return favorites.some(fav => fav.domain === domain)
  }

  const loadRecentChecks = async () => {
    try {
      if (user) {
        const data = await userAPI.getChecks(10) // Get last 10 checks
        setRecentChecks(data.data || data || [])
      } else {
        setRecentChecks([])
      }
    } catch (error) {
      console.error('Failed to load recent checks:', error)
      setRecentChecks([])
    }
  }

  const loadSuggestions = async () => {
    try {
      const data = await domainAPI.getPublicSuggestions(3)
      setSuggestions(data)
    } catch (error) {
      console.error('Failed to load suggestions:', error)
    }
  }

  const handleDomainCheck = async (e) => {
    e.preventDefault()
    if (!domain.trim()) return

    setIsChecking(true)
    setCheckResult(null)

    try {
      const result = await domainAPI.checkAvailability(domain.trim())
      setCheckResult(result)

      // Save to user's account if logged in
      if (user) {
        try {
          await userAPI.recordCheck({
            domain: domain.trim(),
            status: result.available ? 'available' : 'taken',
            price: result.available ? result.price : null,
            currency: result.available ? result.currency : null,
            period: result.available ? result.period : null
          })
          console.log('Domain check saved to user account')
        } catch (error) {
          console.error('Failed to save domain check:', error)
        }
      }

      // Add to recent checks
      setRecentChecks(prev => [result, ...prev.slice(0, 9)])
    } catch (error) {
      setCheckResult({ error: error.response?.data?.error || 'Failed to check domain' })
    } finally {
      setIsChecking(false)
    }
  }

  const tips = [
    {
      icon: Globe,
      title: 'Choose Memorable Names',
      description: 'Select domains that are easy to remember and type.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Keep It Short',
      description: 'Shorter domains are easier to remember and less prone to typos.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Consider Keywords',
      description: 'Include relevant keywords that describe your business or service.',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-ocean text-white py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Domain
                <span className="block text-white">Availability Checker</span>
              </h1>
              <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Instantly check if your desired domain is available for registration.
                Get real-time results, pricing, and registration options.
              </p>
            </div>

            {/* Domain Checker Form */}
            <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <form onSubmit={handleDomainCheck} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter your domain name (e.g., example.com)"
                    className="input-glass w-full text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Globe className="h-5 w-5 text-white/50" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isChecking || !domain.trim()}
                  className="btn-glass text-lg px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {isChecking ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Checking...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="h-5 w-5" />
                      <span>Check Domain</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Google AdSense Ad (Checker - Above Results) */}
        <section className="py-4 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdSenseAd adSlot="4370431362" className="max-w-4xl mx-auto" />
          </div>
        </section>

        {/* Check Result Section */}
        {checkResult && (
          <section className="py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-slide-up">
                <div className="glass-card p-8 text-center">
                  {checkResult.error ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="h-10 w-10 text-red-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-red-600 mb-2">Check Failed</h2>
                      <p className="text-red-500 text-lg">{checkResult.error}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${checkResult.available ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                        {checkResult.available ? (
                          <CheckCircle className="h-10 w-10 text-green-500" />
                        ) : (
                          <XCircle className="h-10 w-10 text-red-500" />
                        )}
                      </div>

                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {checkResult.domain}
                      </h2>

                      <div className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-6">
                        {checkResult.available ? (
                          <span className="badge-success text-lg px-6 py-3">
                            Available for Registration
                          </span>
                        ) : (
                          <span className="badge-danger text-lg px-6 py-3">
                            Already Taken
                          </span>
                        )}
                      </div>

                      {checkResult.available && checkResult.price && (
                        <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-2xl">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-gradient mb-1">
                                ${formatPrice(checkResult.price)}
                              </div>
                              <div className="text-gray-600">Price</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                {checkResult.currency}
                              </div>
                              <div className="text-gray-600">Currency</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                {checkResult.period}
                              </div>
                              <div className="text-gray-600">Years</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Favorites Button */}
                      {user && (
                        <div className="flex justify-center space-x-4">
                          {isFavorite(checkResult.domain) ? (
                            <button
                              onClick={() => {
                                const favorite = favorites.find(fav => fav.domain === checkResult.domain)
                                if (favorite) {
                                  removeFromFavorites(favorite.id)
                                }
                              }}
                              className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 text-red-600 border border-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                            >
                              <Heart className="h-5 w-5 fill-current" />
                              <span>Remove from Favorites</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => addToFavorites(checkResult.domain)}
                              className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
                            >
                              <Heart className="h-5 w-5" />
                              <span>Add to Favorites</span>
                            </button>
                          )}

                          {checkResult.available && (
                            <button className="btn-primary text-lg px-6 py-3 font-semibold hover:scale-105">
                              Register This Domain
                              <ArrowRight className="h-5 w-5 ml-2" />
                            </button>
                          )}
                        </div>
                      )}

                      {!user && (
                        <div className="mt-6">
                          <p className="text-gray-600 mb-4">Sign in to save domains to favorites and track your checks!</p>
                          {checkResult.available && (
                            <button className="btn-primary text-lg px-8 py-3 font-semibold hover:scale-105">
                              Register This Domain
                              <ArrowRight className="h-5 w-5 ml-2" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tips Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Domain Selection
                <span className="block text-gradient">Tips & Best Practices</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Make informed decisions when choosing your domain name with these expert tips.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tips.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <div
                    key={tip.title}
                    className="card text-center animate-fade-in hover-lift"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${tip.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{tip.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Google AdSense Ad (Checker - Mid Content) */}
        <section className="py-4 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdSenseAd adSlot="4370431362" className="max-w-4xl mx-auto" />
          </div>
        </section>

        {/* Recent Checks Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Recent Domain
                <span className="block text-gradient">Checks</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Track your recent domain availability checks and results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentChecks.map((check, index) => (
                <div
                  key={index}
                  className="card animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {check.domain}
                    </h3>
                    <span className={`badge ${check.available ? 'badge-success' : 'badge-danger'}`}>
                      {check.available ? 'Available' : 'Taken'}
                    </span>
                  </div>

                  {check.available && check.price && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Price:</span>
                        <span className="text-lg font-bold text-blue-600">
                          ${formatPrice(check.price)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Just now</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {recentChecks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">No recent checks yet. Start by checking a domain above!</p>
              </div>
            )}
          </div>
        </section>

        {/* User Favorites Section */}
        {user && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Your Favorite
                  <span className="block text-gradient">Domains</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Your saved domains and favorites for easy access.
                </p>
              </div>

              {loadingFavorites ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading your favorites...</p>
                </div>
              ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((favorite, index) => (
                    <div
                      key={favorite.id}
                      className="card animate-fade-in hover-lift"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {favorite.domain}
                        </h3>
                        <button
                          onClick={() => removeFromFavorites(favorite.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Remove from favorites"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>

                      <div className="text-sm text-gray-500 mb-4">
                        Added on {new Date(favorite.created_at).toLocaleDateString()}
                      </div>

                      <button
                        onClick={() => {
                          setDomain(favorite.domain)
                          // Scroll to top to show the domain checker
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="w-full btn-primary hover:scale-105"
                      >
                        Check Again
                        <Search className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">No favorites yet. Start checking domains and add them to your favorites!</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Featured Suggestions */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Featured Domain
                <span className="block text-gradient">Suggestions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover valuable domains that might be perfect for your next project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  className="card animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {suggestion.domain}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-gray-700">
                        {suggestion.score || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                      <span className="text-sm font-medium text-gray-600">Estimated Price:</span>
                      <span className="text-xl font-bold text-blue-600">
                        ${formatPrice(suggestion.estimation_price || suggestion.price || 0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`badge ${suggestion.status?.toLowerCase().includes('available') ? 'badge-success' :
                          suggestion.status?.toLowerCase().includes('soon') ? 'badge-warning' :
                            'badge-primary'
                        }`}>
                        {suggestion.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDomain(suggestion.domain)
                      // Scroll to top to show the domain checker
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="w-full btn-primary hover:scale-105"
                  >
                    Check Availability
                    <Search className="h-4 w-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Content - Domain Registration & Hosting */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Domain Registration Guide */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Globe className="h-6 w-6 mr-3" />
                  Complete Domain Registration Guide 2024
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Registering a domain name is the first step in establishing your online presence. Whether you're launching
                  an e-commerce website, business blog, or personal portfolio, choosing the right domain registrar and hosting
                  provider is crucial for long-term success and search engine optimization.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg border-2 border-blue-200 shadow-sm">
                    <h3 className="font-bold text-lg text-blue-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                      Top Domain Registrars
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>GoDaddy:</strong> World's largest domain registrar with 24/7 customer support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Namecheap:</strong> Affordable pricing and free WHOIS privacy protection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Google Domains:</strong> Simple interface with transparent pricing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Cloudflare:</strong> Competitive pricing with built-in CDN and security</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-5 rounded-lg border-2 border-green-200 shadow-sm">
                    <h3 className="font-bold text-lg text-green-900 mb-3 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-green-600" />
                      Registration Best Practices
                    </h3>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Enable Auto-Renewal:</strong> Prevent domain expiration and loss</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Privacy Protection:</strong> Hide personal information from WHOIS databases</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>DNS Management:</strong> Configure DNS records for email and website hosting</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>SSL Certificate:</strong> Secure your website with HTTPS encryption</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Pro Tip for Website Owners</h4>
                      <p className="text-yellow-800 text-sm">
                        Bundle your domain registration with web hosting services like Bluehost, SiteGround, or HostGator
                        for better pricing. Most hosting providers offer free domain registration for the first year with
                        their WordPress hosting or website builder packages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Web Hosting Comparison */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-purple-600 to-pink-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  Web Hosting Providers Comparison
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  After registering your domain, you'll need reliable web hosting to launch your website. Compare top hosting
                  providers for WordPress hosting, cloud hosting, VPS hosting, and dedicated servers.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Hosting Provider</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Starting Price</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Best For</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Key Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Bluehost</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$2.95/mo</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">WordPress Hosting</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">Free domain, SSL, WordPress optimized</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">SiteGround</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$3.99/mo</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">E-commerce Sites</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">Managed WooCommerce, daily backups</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">HostGator</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$2.75/mo</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Small Businesses</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">Unlimited bandwidth, website builder</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">A2 Hosting</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$2.99/mo</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">High Performance</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">Turbo servers, SSD storage, CDN</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">DreamHost</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$2.59/mo</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Developers</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">SSH access, staging sites, Git</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  *Promotional pricing shown. Prices may vary based on renewal terms and hosting package selected.
                </p>
              </div>
            </div>

            {/* Website Builder Options */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3" />
                  Website Builders vs. Traditional Hosting
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Choosing between a website builder and traditional web hosting depends on your technical skills, budget,
                  and business requirements. Website builders like Wix, Squarespace, and Shopify offer all-in-one solutions
                  with drag-and-drop interfaces, while traditional hosting gives you more control and flexibility.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center border border-green-200 shadow-sm">
                    <div className="text-3xl font-bold text-green-700 mb-2">Wix</div>
                    <div className="text-sm text-green-800 font-medium mb-2">Best for Beginners</div>
                    <div className="text-xs text-green-600">Drag-and-drop builder, 800+ templates, e-commerce</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center border border-blue-200 shadow-sm">
                    <div className="text-3xl font-bold text-blue-700 mb-2">Squarespace</div>
                    <div className="text-sm text-blue-800 font-medium mb-2">Best for Creatives</div>
                    <div className="text-xs text-blue-600">Beautiful templates, portfolio sites, blogging</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center border border-purple-200 shadow-sm">
                    <div className="text-3xl font-bold text-purple-700 mb-2">Shopify</div>
                    <div className="text-sm text-purple-800 font-medium mb-2">Best for E-commerce</div>
                    <div className="text-xs text-purple-600">Online stores, payment processing, inventory</div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">Choosing the Right Solution:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">✓ Choose Website Builder If:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• No coding or technical knowledge required</li>
                        <li>• Need website launched quickly (hours not days)</li>
                        <li>• Want all-in-one solution (hosting + builder)</li>
                        <li>• Budget-friendly monthly plans ($10-$30/month)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">✓ Choose Traditional Hosting If:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Need full control over website code and design</li>
                        <li>• Want to use WordPress, Joomla, or custom CMS</li>
                        <li>• Require advanced SEO optimization capabilities</li>
                        <li>• Planning complex integrations or custom development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Google AdSense Ad (Checker - Bottom) */}
        <section className="py-6 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdSenseAd adSlot="4370431362" className="max-w-4xl mx-auto" />
          </div>
        </section>
      </div>
    </>
  )
}

export default DomainChecker