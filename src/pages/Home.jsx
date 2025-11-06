import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Globe, BarChart3, Sparkles, CheckCircle, Clock, Star, ArrowRight, Zap, Shield, Users, Info } from 'lucide-react'
import { domainAPI } from '../services/api'
import { secureConsole } from '../utils/secureLogging'
import EzoicAdPlacement from '../components/EzoicAdPlacement'

const Home = () => {
  const [domain, setDomain] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(true)

  // Domain Estimation Functions for Suggestions
  const calculateEstimatedValue = (domain, score = 0) => {
    if (!domain) return 0;
    
    try {
      const domainName = domain.toLowerCase();
      const domainParts = domainName.split('.');
      const name = domainParts[0];
      const tld = domainParts[1] || 'com';
      
      // Base value by TLD
      const tldBaseValues = {
        'com': 1000, 'net': 800, 'org': 750, 'io': 1200, 'co': 900,
        'tech': 600, 'app': 700, 'dev': 500, 'ai': 1500, 'cloud': 800
      };
      let baseValue = tldBaseValues[tld] || 500;
      
      // Adjust by length (shorter = more valuable)
      let lengthMultiplier = 1;
      if (name.length <= 3) lengthMultiplier = 3;
      else if (name.length <= 5) lengthMultiplier = 2;
      else if (name.length <= 7) lengthMultiplier = 1.5;
      else if (name.length <= 10) lengthMultiplier = 1.2;
      else lengthMultiplier = 1;
      
      // Adjust by score if available
      let scoreMultiplier = 1;
      if (score && score > 0) {
        scoreMultiplier = 0.8 + (score / 100) * 0.4; // 0.8 to 1.2
      }
      
      // Calculate estimated value
      let estimatedValue = baseValue * lengthMultiplier * scoreMultiplier;
      
      // Round to reasonable ranges
      if (estimatedValue < 100) estimatedValue = Math.round(estimatedValue / 10) * 10;
      else if (estimatedValue < 1000) estimatedValue = Math.round(estimatedValue / 50) * 50;
      else if (estimatedValue < 10000) estimatedValue = Math.round(estimatedValue / 100) * 100;
      else estimatedValue = Math.round(estimatedValue / 1000) * 1000;
      
      return estimatedValue;
    } catch (error) {
      console.error('Error calculating estimated value:', error);
      return 0;
    }
  };



  useEffect(() => {
    loadSuggestions()
  }, [])

  const loadSuggestions = async () => {
    try {
      secureConsole.log('Loading suggestions...');
      setLoadingSuggestions(true);
      
      const data = await domainAPI.getPublicSuggestions(6);
      secureConsole.log('Suggestions loaded successfully');
      
      if (data && Array.isArray(data)) {
        setSuggestions(data);
        secureConsole.log(`Loaded ${data.length} suggestions`);
      } else {
        secureConsole.warn('Invalid suggestions data format');
        setSuggestions([]);
      }
    } catch (error) {
      secureConsole.error('Failed to load suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
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
    } catch (error) {
      setCheckResult({ error: error.response?.data?.error || 'Failed to check domain' })
    } finally {
      setIsChecking(false)
    }
  }

  const features = [
    {
      icon: Search,
      title: 'Domain Availability Checker',
      description: 'Instantly check if your desired domain is available for registration.',
      href: '/check',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      icon: Sparkles,
      title: 'Smart Domain Suggestions',
      description: 'Get creative domain suggestions based on your keywords and preferences.',
      href: '/suggestions',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      icon: BarChart3,
      title: 'Domain Value Estimation',
      description: 'Professional domain appraisal and value estimation powered by GoDaddy.',
      href: '/estimation',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      icon: Sparkles,
      title: 'Domain Name Combiner',
      description: 'Generate unique domain combinations from prefixes, suffixes, and TLDs.',
      href: '/combiner',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    }
  ]

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Users, color: 'text-blue-600' },
    { label: 'Domains Checked', value: '1M+', icon: Search, color: 'text-green-600' },
    { label: 'Success Rate', value: '99.9%', icon: Shield, color: 'text-purple-600' },
    { label: 'Response Time', value: '<100ms', icon: Zap, color: 'text-orange-600' }
  ]

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-ocean text-white py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Professional Domain
                <span className="block text-white">
                  Management Toolkit
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Check availability, get smart suggestions, estimate values, and generate creative domain combinations. 
                Powered by GoDaddy API for accurate results.
              </p>
            </div>
            
            {/* Domain Checker */}
            <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <form onSubmit={handleDomainCheck} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter your domain name..."
                    className="input-glass w-full text-lg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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

              {/* Check Result */}
              {checkResult && (
                <div className="mt-8 animate-slide-up">
                  <div className="glass-card p-6 text-left">
                    {checkResult.error ? (
                      <div className="text-red-200 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                          <span className="text-red-200 text-xl">❌</span>
                        </div>
                        <span className="text-lg">{checkResult.error}</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-white">{checkResult.domain}</span>
                          <span className={`badge ${checkResult.available ? 'badge-success' : 'badge-danger'}`}>
                            {checkResult.available ? 'Available' : 'Taken'}
                          </span>
                        </div>
                        {checkResult.available && checkResult.price && (
                          <div className="text-primary-100 text-lg">
                            Price: ${(() => {
                              const price = checkResult.price;
                              if (price > 1000) return (price / 10000).toFixed(2);
                              return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
                            })()} {checkResult.currency} per {checkResult.period} year(s)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ezoic Ad Placement - Top Banner */}
        {/* Replace 101 with your actual Ezoic placement ID from dashboard */}
        <section className="py-4 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EzoicAdPlacement placementId={101} className="text-center" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={stat.label} 
                    className="text-center animate-fade-in hover-lift"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px'
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl animate-float opacity-30"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full blur-2xl animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-100 rounded-full blur-2xl animate-float opacity-30" style={{ animationDelay: '4s' }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-fade-in">
              {/* Enhanced Title with Better Typography */}
              <div className="mb-6">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  Everything You Need for
                  <span className="block text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Domain Management
                  </span>
                </h2>
              </div>
              
              {/* Enhanced Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Our comprehensive toolkit provides all the tools you need to find, evaluate, and manage your domains effectively.
              </p>
              
              {/* Decorative Elements */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={feature.title}
                    to={feature.href}
                    className="group animate-fade-in hover-lift"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-gray-200 group-hover:-translate-y-2 h-full">
                      {/* Gradient Background Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Icon Container with Enhanced Styling */}
                      <div className="relative p-8 text-center h-full flex flex-col justify-between">
                        <div>
                          <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.bgColor} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                            <Icon className={`h-10 w-10 text-white drop-shadow-sm`} />
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                          </div>
                          
                          {/* Content */}
                          <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gradient transition-all duration-300 leading-tight">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                            {feature.description}
                          </p>
                        </div>
                        
                        {/* Enhanced CTA Button */}
                        <div className="flex items-center justify-center text-gray-700 group-hover:text-blue-600 transition-all duration-300">
                          <span className="font-semibold text-sm uppercase tracking-wide">Learn More</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                      
                      {/* Bottom Accent Line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                      
                      {/* Corner Decoration */}
                      <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100`}></div>
                      
                      {/* Hover Border Effect */}
                      <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-opacity-20 transition-all duration-500`} style={{
                        background: `linear-gradient(45deg, transparent, transparent) padding-box, linear-gradient(45deg, ${feature.color.replace('from-', '').replace('to-', '')}) border-box`
                      }}></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Suggestions Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Featured Domain
                <span className="block text-gradient">Suggestions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover valuable domains that might be perfect for your next project.
              </p>
              
            </div>

            {loadingSuggestions ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : suggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={suggestion.id} 
                    className="card hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {suggestion.domain}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-warning-500 fill-current" />
                        <span className="text-sm font-bold text-gray-700">
                          {suggestion.score || 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Estimated Price:</span>
                          <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-xs">i</span>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-blue-600">
                          ${(() => {
                            const price = suggestion.estimation_price || suggestion.price || 0;
                            if (price > 1000) return (price / 10000).toFixed(2);
                            return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
                          })()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`badge ${
                          suggestion.status?.toLowerCase().includes('available') ? 'badge-success' :
                          suggestion.status?.toLowerCase().includes('soon') ? 'badge-warning' :
                          'badge-primary'
                        }`}>
                          {suggestion.status || 'Unknown'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Extension:</span>
                        <span className="text-sm font-medium text-gray-700">
                          {suggestion.extension || suggestion.tld || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Length: {suggestion.length || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Suggestions Available</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We're currently working on adding domain suggestions. Check back soon or use our domain generator to create your own!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/generator"
                    className="btn-primary px-6 py-3 font-medium hover:scale-105"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Domains
                  </Link>
                  <Link
                    to="/check"
                    className="btn-outline px-6 py-3 font-medium hover:scale-105"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Check Availability
                  </Link>
                </div>
              </div>
            )}

            <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-2 text-blue-800">
                  <Info className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">
                    Estimated prices are calculated based on domain length, TLD popularity, and quality score. 
                    Actual market values may vary.
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <Link
                to="/suggestions"
                className="btn-primary text-lg px-10 py-4 text-lg font-semibold hover:scale-105"
              >
                View All Suggestions
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Helpful Tips Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Expert Tips for Domain Success
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Learn from industry experts and make informed decisions about your domain name
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Keep It Short & Memorable</h3>
                <p className="text-gray-700 leading-relaxed">
                  Shorter domain names are easier to remember, type, and share. Aim for 6-14 characters and avoid hyphens or numbers that can confuse users.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose the Right TLD</h3>
                <p className="text-gray-700 leading-relaxed">
                  While .com is the gold standard, don't overlook other TLDs like .io for tech companies or .co for startups. The key is choosing something that fits your brand.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Make It Brandable</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your domain should reflect your brand identity. Consider how it sounds when spoken aloud and whether it conveys the right message about your business.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Check Availability Early</h3>
                <p className="text-gray-700 leading-relaxed">
                  Before falling in love with a domain name, check its availability across multiple TLDs. Also verify social media handles to ensure consistency across platforms.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">5</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Consider SEO Implications</h3>
                <p className="text-gray-700 leading-relaxed">
                  While exact-match domains aren't as crucial as they once were, including relevant keywords can still help. However, prioritize brandability over keyword stuffing.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border border-teal-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">6</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Protect Your Investment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once you've chosen your domain, register variations and common misspellings. Enable domain lock, use strong passwords, and set up auto-renewal to protect your investment.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/guides"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Info className="h-5 w-5 mr-2" />
                Explore Our Complete Guides
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Thousands Trust Domain Toolkit
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've helped businesses, developers, and entrepreneurs find the perfect domain names since our launch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Lightning Fast Results</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our platform uses GoDaddy's powerful API to provide instant domain availability checks. No more waiting minutes for results - get answers in seconds.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you're checking a single domain or researching multiple options, our optimized infrastructure ensures you get the information you need when you need it.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Accurate & Reliable</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Powered by GoDaddy's comprehensive domain database, our results are accurate and up-to-date. We verify availability across hundreds of TLDs in real-time.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our domain estimation tool uses advanced algorithms considering length, TLD popularity, keyword value, and market trends to provide reliable value estimates.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">User-Focused Design</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We've designed every feature with real users in mind. From intuitive domain checking to smart suggestions, our tools make complex domain operations simple.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Save your favorite domains, track your searches, and manage your domain portfolio all in one place. Our dashboard gives you complete control over your domain research.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Expert Resources</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond tools, we provide comprehensive guides and resources to help you make informed decisions. Learn from industry experts and stay updated with best practices.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our blog covers everything from choosing the perfect domain to protecting your online identity. Access valuable insights that help you succeed in your domain journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-mesh text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Find Your
                <span className="block text-white">Perfect Domain?</span>
              </h2>
              <p className="text-xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who trust our toolkit for their domain management needs. Start your journey today with our free tools and expert resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link to="/register" className="btn-glass text-lg px-10 py-4 text-lg font-semibold hover:scale-105">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link to="/guides" className="btn-outline text-white border-white hover:bg-white hover:text-primary-700 text-lg px-10 py-4 text-lg font-semibold hover:scale-105">
                Read Our Guides
              </Link>
              <Link to="/about" className="btn-outline text-white border-white hover:bg-white hover:text-primary-700 text-lg px-10 py-4 text-lg font-semibold hover:scale-105">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
