import { useState, useEffect } from 'react';

import { Search, Filter, Star, ExternalLink, Eye, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { domainAPI } from '../services/api';
import AdSenseAd from '../components/AdSenseAd';

const DomainSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'business', name: 'Business' },
    { id: 'tech', name: 'Technology' },
    { id: 'creative', name: 'Creative' },
    { id: 'brand', name: 'Brandable' },
    { id: 'keyword', name: 'Keyword Rich' }
  ];

  const sortOptions = [
    { value: 'score', label: 'Score (High to Low)' },
    { value: 'length', label: 'Length (Short to Long)' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'price', label: 'Price (Low to High)' }
  ];

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    filterAndSortSuggestions();
  }, [suggestions, searchTerm, selectedCategory, sortBy]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await domainAPI.getPublicSuggestions(50); // Load more suggestions for better variety
      console.log('Suggestions API response:', response);

      // Handle both response formats: direct array or wrapped in data property
      const suggestionsData = Array.isArray(response) ? response : (response?.data || []);
      console.log('Processed suggestions data:', suggestionsData);

      // Ensure consistent ordering by sorting by score first, then by domain name
      const sortedSuggestions = suggestionsData.sort((a, b) => {
        // First sort by score (highest first)
        if ((b.score || 0) !== (a.score || 0)) {
          return (b.score || 0) - (a.score || 0);
        }
        // Then sort alphabetically by domain name for consistency
        return a.domain.localeCompare(b.domain);
      });

      setSuggestions(sortedSuggestions);
      console.log(`Loaded ${sortedSuggestions.length} suggestions with consistent ordering`);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortSuggestions = () => {
    let filtered = [...suggestions];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(suggestion =>
        suggestion.domain.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (suggestion.description && suggestion.description.toLowerCase().includes(searchTerm.toLowerCase().trim()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(suggestion =>
        suggestion.category === selectedCategory
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return (b.score || 0) - (a.score || 0);
        case 'length':
          return a.domain.length - b.domain.length;
        case 'alphabetical':
          return a.domain.localeCompare(b.domain);
        case 'price':
          return (a.price || a.estimated_price || 0) - (b.price || b.estimated_price || 0);
        default:
          return 0;
      }
    });

    setFilteredSuggestions(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('score');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-blue-600 bg-blue-100';
    if (score >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading domain suggestions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Domain Suggestions
              </h1>
              <button
                onClick={fetchSuggestions}
                disabled={loading}
                className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                title="Refresh suggestions"
              >
                <RefreshCw className={`h-6 w-6 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Discover hand-picked domain names across various categories.
              Our curated collection includes business, tech, creative, and brandable domains.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
              <p className="text-sm text-blue-800">
                💡 <strong>Estimated Price:</strong> Smart pricing calculated using our domain valuation algorithm based on length, TLD, score, and brandability factors.
              </p>
            </div>
          </div>

          {/* Google AdSense Ad (Suggestions - Header) */}
          <div className="py-4">
            <AdSenseAd adSlot="4370431362" className="max-w-4xl mx-auto" />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search domains or descriptions..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {searchTerm || selectedCategory !== 'all' ? (
                  <span>Filtered results: {filteredSuggestions.length} of {suggestions.length} suggestions</span>
                ) : (
                  <span>Showing all {suggestions.length} suggestions</span>
                )}
              </div>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Show All
                </button>
              )}
            </div>
          </div>

          {/* Google AdSense Ad (Suggestions - Filters) */}
          <div className="py-4">
            <AdSenseAd adSlot="4370431362" className="max-w-4xl mx-auto" />
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'all' ? (
                  <span>Showing <strong>{filteredSuggestions.length}</strong> of <strong>{suggestions.length}</strong> suggestions</span>
                ) : (
                  <span>Showing all <strong>{suggestions.length}</strong> suggestions</span>
                )}
              </p>
              {suggestions.length > 0 && (
                <div className="text-sm text-gray-500">
                  <span>Sorted by: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Suggestions Grid */}
          {filteredSuggestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Domain Name and Status */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {suggestion.domain}
                      </h3>
                      <div className="flex flex-col items-end space-y-1">
                        {/* Availability Status */}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${suggestion.status === 'Available'
                          ? 'text-green-600 bg-green-100'
                          : 'text-red-600 bg-red-100'
                          }`}>
                          {suggestion.status || 'Unknown'}
                        </div>
                        {/* Score */}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(suggestion.score)}`}>
                          Score: {suggestion.score || 'N/A'}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {suggestion.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {suggestion.description}
                      </p>
                    )}

                    {/* Key Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Estimated Price */}
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-green-600 font-medium mb-1">Estimated Price</div>
                        <div className="text-lg font-bold text-green-700">
                          ${(() => {
                            const price = suggestion.estimation_price || suggestion.price || 0;
                            if (price > 1000) return (price / 10000).toFixed(2);
                            return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2);
                          })()}
                        </div>
                      </div>

                      {/* Domain Length */}
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs text-blue-600 font-medium mb-1">Length</div>
                        <div className="text-lg font-bold text-blue-700">
                          {suggestion.length || suggestion.domain.length} chars
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-2 mb-4 text-sm text-gray-500">
                      {suggestion.category &&
                        suggestion.category !== 'CSV Upload' &&
                        suggestion.category !== 'Generated' && (
                          <div className="flex items-center">
                            <span className="font-medium">Category:</span>
                            <span className="ml-2 capitalize">{suggestion.category}</span>
                          </div>
                        )}
                      {suggestion.extension && (
                        <div className="flex items-center">
                          <span className="font-medium">Extension:</span>
                          <span className="ml-2">.{suggestion.extension}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(`https://godaddy.com/domainsearch/find?domainToCheck=${suggestion.domain}`, '_blank')}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Check Availability
                      </button>
                      <button
                        onClick={() => window.open(`https://whois.com/whois/${suggestion.domain}`, '_blank')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
                        title="View WHOIS info"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find more domain suggestions.
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredSuggestions.length > 0 && filteredSuggestions.length < suggestions.length && (
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200">
                Load More Suggestions
              </button>
            </div>
          )}

          {/* Educational Content - Domain Naming & Branding Strategies */}
          <section className="py-16 bg-gradient-to-br from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Domain Naming Strategies */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Star className="h-6 w-6 mr-3" />
                    Professional Domain Naming Strategies for Your Brand
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    Choosing the perfect domain name is crucial for building a strong brand identity and online presence.
                    A well-crafted domain name improves brand recognition, boosts SEO performance, and enhances your digital
                    marketing efforts across social media platforms and search engines.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg border-2 border-blue-200 shadow-sm">
                      <h3 className="font-bold text-lg text-blue-900 mb-3">🎯 Business Domains</h3>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Use industry-specific keywords for local SEO</li>
                        <li>• Include location for service-based businesses</li>
                        <li>• Keep it professional and pronunciation-friendly</li>
                        <li>• Match your business name for brand consistency</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border-2 border-purple-200 shadow-sm">
                      <h3 className="font-bold text-lg text-purple-900 mb-3">💡 Startup Domains</h3>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li>• Create unique, brandable names that stand out</li>
                        <li>• Consider .io, .ai, or new TLDs for tech companies</li>
                        <li>• Ensure social media handle availability</li>
                        <li>• Make it memorable for word-of-mouth marketing</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg border-2 border-green-200 shadow-sm">
                      <h3 className="font-bold text-lg text-green-900 mb-3">🚀 E-commerce Domains</h3>
                      <ul className="space-y-2 text-green-800 text-sm">
                        <li>• Describe products or niche for instant clarity</li>
                        <li>• Stick with .com for maximum customer trust</li>
                        <li>• Avoid numbers and hyphens for better recalls</li>
                        <li>• Consider exact match domains for SEO benefits</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 rounded">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-900 mb-1">Brand Identity Tip</h4>
                        <p className="text-orange-800 text-sm">
                          Your domain name is often the first impression customers have of your business. Invest time in creating
                          a name that reflects your values, resonates with your target audience, and supports long-term brand
                          building and content marketing strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domain Name Generators & Tools */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-700 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Sparkles className="h-6 w-6 mr-3" />
                    Essential Tools for Domain Research & Branding
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    Leverage professional tools and resources to create the perfect domain name for your small business,
                    online store, or digital marketing agency. These tools help with brainstorming, availability checking,
                    and trademark verification.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg border-2 border-blue-200 shadow-sm">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Domain Research Tools</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">NameMesh:</strong>
                            <span className="text-gray-700"> Generate creative domain combinations with SEO keywords</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">LeanDomainSearch:</strong>
                            <span className="text-gray-700"> Find available .com domains instantly for your business</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">Domainr:</strong>
                            <span className="text-gray-700"> Discover creative domain hacks and new TLD options</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">USPTO Trademark Search:</strong>
                            <span className="text-gray-700"> Verify trademark availability before registration</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-lg border-2 border-purple-200 shadow-sm">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Branding & Marketing Resources</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">Logo Makers:</strong>
                            <span className="text-gray-700"> Canva, Looka, and Tailor Brands for professional logos</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">Social Media Checker:</strong>
                            <span className="text-gray-700"> Namechk and KnowEm for username availability</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">SEO Analysis:</strong>
                            <span className="text-gray-700"> Ahrefs and SEMrush for keyword research and competition</span>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <strong className="text-gray-900">Business Plan Templates:</strong>
                            <span className="text-gray-700"> LivePlan and Bizplan for startup planning</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Complete Brand Launch Checklist:</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>
                        <p className="font-semibold text-green-800 mb-2">✓ Domain Registration:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Purchase primary .com domain</li>
                          <li>• Secure alternative TLDs (.net, .org)</li>
                          <li>• Enable domain privacy protection</li>
                          <li>• Set up professional email hosting</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 mb-2">✓ Brand Development:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Design professional logo and color scheme</li>
                          <li>• Secure social media usernames</li>
                          <li>• Create brand style guide and guidelines</li>
                          <li>• Register business name and trademarks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Google AdSense Ad (Suggestions - Bottom) */}
          <div className="py-6">
            <AdSenseAd adSlot="4370431362" className="max-w-4xl mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DomainSuggestions;
