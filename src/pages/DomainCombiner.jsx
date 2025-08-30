import { useState } from 'react';

import { Plus, Sparkles, Copy, RefreshCw, Star, Heart, ExternalLink } from 'lucide-react';
import { domainAPI } from '../services/api';

const DomainCombiner = () => {
  const [prefixes, setPrefixes] = useState(['tech', 'digital', 'smart']);
  const [suffixes, setSuffixes] = useState(['hub', 'pro', 'io']);
  const [keywords, setKeywords] = useState(['app', 'web', 'cloud']);
  const [tlds, setTlds] = useState(['.com', '.net', '.io', '.app']);
  const [combinations, setCombinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [newPrefix, setNewPrefix] = useState('');
  const [newSuffix, setNewSuffix] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newTld, setNewTld] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState({});
  const [checkingAvailability, setCheckingAvailability] = useState({});
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const commonPrefixes = [
    'tech', 'digital', 'smart', 'next', 'future', 'modern', 'global', 'world', 'my', 'get', 'go', 'pro', 'super', 'mega', 'ultra', 'hyper', 'cyber', 'neo', 'zen', 'pure'
  ];

  const commonSuffixes = [
    'hub', 'pro', 'io', 'app', 'web', 'cloud', 'tech', 'digital', 'smart', 'now', 'today', 'here', 'there', 'up', 'out', 'in', 'on', 'at', 'by', 'for'
  ];

  const commonKeywords = [
    'app', 'web', 'cloud', 'mobile', 'online', 'digital', 'tech', 'data', 'ai', 'ml', 'blockchain', 'crypto', 'fintech', 'health', 'fitness', 'food', 'travel', 'shop', 'store', 'market'
  ];

  const commonTlds = [
    '.com', '.net', '.org', '.io', '.app', '.dev', '.tech', '.digital', '.cloud', '.ai', '.ml', '.crypto', '.nft', '.web3', '.co', '.me', '.us', '.uk', '.de', '.fr'
  ];

  const generateCombinations = async () => {
    setLoading(true);
    
    try {
      const response = await domainAPI.combine({
        prefixes: prefixes.filter(p => p.trim()),
        suffixes: suffixes.filter(s => s.trim()),
        keywords: keywords.filter(k => k.trim()),
        tlds: tlds.filter(t => t.trim())
      });
      
      setCombinations(response.data || []);
    } catch (error) {
      console.error('Error generating combinations:', error);
      // Fallback to local generation if API fails
      generateLocalCombinations();
    } finally {
      setLoading(false);
    }
  };

  const generateLocalCombinations = () => {
    const results = [];
    const maxCombinations = 50; // Limit to prevent too many results
    
    for (let i = 0; i < Math.min(maxCombinations, prefixes.length * suffixes.length * keywords.length * tlds.length); i++) {
      const prefix = prefixes[i % prefixes.length];
      const suffix = suffixes[Math.floor(i / prefixes.length) % suffixes.length];
      const keyword = keywords[Math.floor(i / (prefixes.length * suffixes.length)) % keywords.length];
      const tld = tlds[Math.floor(i / (prefixes.length * suffixes.length * keywords.length)) % tlds.length];
      
      const domain = `${prefix}${suffix}${keyword}${tld}`;
      
      // Generate more realistic pricing based on domain characteristics
      let basePrice = 0;
      
      // Base price by TLD
      if (tld === '.com') basePrice = 12.99;
      else if (tld === '.net') basePrice = 14.99;
      else if (tld === '.org') basePrice = 13.99;
      else if (tld === '.io') basePrice = 29.99;
      else if (tld === '.co') basePrice = 19.99;
      else if (tld === '.tech') basePrice = 24.99;
      else if (tld === '.app') basePrice = 19.99;
      else if (tld === '.dev') basePrice = 14.99;
      else if (tld === '.ai') basePrice = 39.99;
      else if (tld === '.cloud') basePrice = 34.99;
      else basePrice = 15.99;
      
      // Adjust price based on domain length (shorter = more valuable)
      const lengthMultiplier = Math.max(0.8, 1.2 - (domain.length * 0.02));
      
      // Generate quality score based on domain characteristics
      let score = 50; // Base score
      
      // Score based on domain length (shorter = better)
      if (domain.length <= 10) score += 20;
      else if (domain.length <= 15) score += 10;
      
      // Score based on TLD popularity
      if (tld === '.com') score += 15;
      else if (tld === '.net') score += 12;
      else if (tld === '.org') score += 10;
      else if (tld === '.io') score += 18;
      else if (tld === '.co') score += 14;
      else if (tld === '.ai') score += 20;
      else if (tld === '.cloud') score += 16;
      
      // Score based on keyword quality
      const premiumKeywords = ['tech', 'digital', 'cloud', 'ai', 'smart', 'future', 'pro', 'hub', 'lab', 'studio'];
      const hasPremiumKeyword = premiumKeywords.some(keyword => 
        domain.toLowerCase().includes(keyword)
      );
      if (hasPremiumKeyword) score += 15;
      
      // Ensure score is within 0-100 range
      score = Math.min(100, Math.max(0, score));
      
      // Calculate final price
      const estimatedPrice = Math.round((basePrice * lengthMultiplier) * 100) / 100;
      
      // Calculate domain value estimate (not just price, but potential market value)
      let domainValue = 0;
      
      // Base value calculation based on score and characteristics
      if (score >= 90) domainValue = 5000; // Premium domains
      else if (score >= 80) domainValue = 2500; // High-value domains
      else if (score >= 70) domainValue = 1000; // Good domains
      else if (score >= 60) domainValue = 500;  // Average domains
      else if (score >= 50) domainValue = 250;  // Basic domains
      else domainValue = 100; // Low-value domains
      
      // Adjust value based on TLD
      if (tld === '.com') domainValue *= 1.5;
      else if (tld === '.io') domainValue *= 1.3;
      else if (tld === '.ai') domainValue *= 1.4;
      else if (tld === '.tech') domainValue *= 1.2;
      
      // Adjust value based on domain length
      if (domain.length <= 8) domainValue *= 2.0;
      else if (domain.length <= 10) domainValue *= 1.5;
      else if (domain.length <= 12) domainValue *= 1.2;
      
      // Adjust value based on keyword combinations
      const hasMultiplePremiumKeywords = premiumKeywords.filter(keyword => 
        domain.toLowerCase().includes(keyword)
      ).length;
      if (hasMultiplePremiumKeywords >= 2) domainValue *= 1.3;
      
      // Ensure reasonable value range
      domainValue = Math.min(domainValue, 10000);
      domainValue = Math.max(domainValue, 50);
      
      results.push({
        domain,
        score: score,
        category: getRandomCategory(),
        estimated_price: estimatedPrice,
        domain_value: Math.round(domainValue),
        length: domain.length,
        extension: tld.substring(1)
      });
    }
    
    setCombinations(results);
  };

  const getRandomCategory = () => {
    const categories = ['business', 'tech', 'creative', 'brand', 'keyword'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const addPrefix = () => {
    if (newPrefix.trim() && !prefixes.includes(newPrefix.trim())) {
      setPrefixes([...prefixes, newPrefix.trim()]);
      setNewPrefix('');
    }
  };

  const addSuffix = () => {
    if (newSuffix.trim() && !suffixes.includes(newSuffix.trim())) {
      setSuffixes([...suffixes, newSuffix.trim()]);
      setNewSuffix('');
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const addTld = () => {
    if (newTld.trim() && !tlds.includes(newTld.trim())) {
      setTlds([...tlds, newTld.trim()]);
      setNewTld('');
    }
  };

  const removePrefix = (index) => {
    setPrefixes(prefixes.filter((_, i) => i !== index));
  };

  const removeSuffix = (index) => {
    setSuffixes(suffixes.filter((_, i) => i !== index));
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const removeTld = (index) => {
    setTlds(tlds.filter((_, i) => i !== index));
  };

  const toggleFavorite = (domain) => {
    if (favorites.includes(domain)) {
      setFavorites(favorites.filter(f => f !== domain));
    } else {
      setFavorites([...favorites, domain]);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const checkDomainAvailability = async (domain) => {
    if (availabilityStatus[domain]) return; // Already checked
    
    setCheckingAvailability(prev => ({ ...prev, [domain]: true }));
    
    try {
      // Use real GoDaddy API for domain availability
      const response = await domainAPI.checkAvailability(domain);
      
      console.log(`🔍 Checking availability for ${domain}:`, response);
      
      // Extract availability from the API response
      const available = response && (response.available === true || response.available === 'true');
      const price = response?.price || null;
      const currency = response?.currency || 'USD';
      const period = response?.period || 1;
      
      setAvailabilityStatus(prev => ({
        ...prev,
        [domain]: {
          available: available,
          price: price,
          currency: currency,
          period: period,
          checked: true,
          status: available ? 'Available' : 'Taken'
        }
      }));
    } catch (error) {
      console.error('Error checking availability:', error);
      
      // Fallback to mock data if API fails (for development/testing)
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Using fallback mock availability for ${domain}`);
        const isAvailable = Math.random() > 0.3; // 70% chance of being available
        const price = isAvailable ? Math.floor(Math.random() * 100) + 10 : null;
        
        setAvailabilityStatus(prev => ({
          ...prev,
          [domain]: {
            available: isAvailable,
            price: price,
            currency: 'USD',
            period: 1,
            checked: true,
            status: isAvailable ? 'Available' : 'Taken',
            mock: true
          }
        }));
      } else {
        setAvailabilityStatus(prev => ({
          ...prev,
          [domain]: {
            available: false,
            price: null,
            currency: 'USD',
            period: 1,
            checked: true,
            status: 'Unknown',
            error: 'Failed to check availability'
          }
        }));
      }
    } finally {
      setCheckingAvailability(prev => ({ ...prev, [domain]: false }));
    }
  };

  const getAvailabilityBadge = (domain) => {
    const status = availabilityStatus[domain];
    
    if (!status || !status.checked) {
      return (
        <button
          onClick={() => checkDomainAvailability(domain)}
          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          Check Availability
        </button>
      );
    }
    
    if (status.error) {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full">
          Error
        </span>
      );
    }
    
    if (status.available) {
      return (
        <div className="flex flex-col items-center space-y-1">
          <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
            Available
          </span>
          {status.price && (
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200">
              ${status.price.toFixed(2)}
            </span>
          )}
          {status.mock && (
            <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded border border-yellow-200">
              Mock Data
            </span>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center space-y-1">
          <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
            Taken
          </span>
          {status.mock && (
            <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded border border-yellow-200">
              Mock Data
            </span>
          )}
        </div>
      );
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Domain Combiner
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate creative domain name combinations using prefixes, suffixes, and keywords. 
              Create unique domain ideas for your next project.
            </p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
              <p className="text-sm text-blue-700">
                🔍 <span className="font-medium">Real-time availability checking</span> via GoDaddy API • 
                💰 <span className="font-medium">Live pricing</span> from domain registrar • 
                ⚡ <span className="font-medium">Instant results</span> for all generated domains
              </p>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-8 bg-gradient-to-br from-white to-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Configure Your Combinations</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Prefixes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Prefixes</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newPrefix}
                      onChange={(e) => setNewPrefix(e.target.value)}
                      placeholder="Add new prefix..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                    />
                    <button
                      onClick={addPrefix}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prefixes.map((prefix, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {prefix}
                        <button
                          onClick={() => removePrefix(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Quick add:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {commonPrefixes.slice(0, 10).map((prefix) => (
                        <button
                          key={prefix}
                          onClick={() => !prefixes.includes(prefix) && setPrefixes([...prefixes, prefix])}
                          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors duration-200"
                        >
                          {prefix}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suffixes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Suffixes</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newSuffix}
                      onChange={(e) => setNewSuffix(e.target.value)}
                      placeholder="Add new suffix..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                    />
                    <button
                      onClick={addSuffix}
                      className="px-4 py-3 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suffixes.map((suffix, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {suffix}
                        <button
                          onClick={() => removeSuffix(index)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Quick add:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {commonSuffixes.slice(0, 10).map((suffix) => (
                        <button
                          key={suffix}
                          onClick={() => !suffixes.includes(suffix) && setSuffixes([...suffixes, suffix])}
                          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors duration-200"
                        >
                          {suffix}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Keywords</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Add new keyword..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                    />
                    <button
                      onClick={addKeyword}
                      className="px-4 py-3 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                      >
                        {keyword}
                        <button
                          onClick={() => removeKeyword(index)}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* TLDs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Top Level Domains</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newTld}
                      onChange={(e) => setNewTld(e.target.value)}
                      placeholder="Add new TLD..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                    />
                    <button
                      onClick={addTld}
                      className="px-4 py-3 bg-orange-600 text-white rounded-r-md hover:bg-orange-700 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tlds.map((tld, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                      >
                        {tld}
                        <button
                          onClick={() => removeTld(index)}
                          className="ml-2 text-orange-600 hover:text-orange-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8 text-center">
              <button
                onClick={generateCombinations}
                disabled={loading || prefixes.length === 0 || suffixes.length === 0 || keywords.length === 0 || tlds.length === 0}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-6 w-6 mr-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6 mr-3" />
                    Generate Combinations
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Note */}
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Domain Availability Checking:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Click "Check Availability" on any domain to verify if it's available for registration</li>
                  <li>• Use "Check All Availability" to check all generated domains at once</li>
                  <li>• Available domains show registration prices, taken domains are marked accordingly</li>
                  <li>• Filter to show only available domains using the checkbox above</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Results */}
          {combinations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Generated Combinations ({combinations.length})
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      // Check availability for all unchecked domains
                      combinations.forEach(combo => {
                        if (!availabilityStatus[combo.domain]?.checked) {
                          checkDomainAvailability(combo.domain);
                        }
                      });
                    }}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 flex items-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check All Availability
                  </button>
                  <button
                    onClick={generateCombinations}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Availability Summary */}
              {combinations.length > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-800">Availability Summary</h3>
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={showOnlyAvailable}
                          onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-blue-700">Show only available domains</span>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {combinations.length}
                      </div>
                      <div className="text-sm text-blue-700">Total Domains</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {Object.values(availabilityStatus).filter(status => status?.checked && status?.available).length}
                      </div>
                      <div className="text-sm text-green-700">Available</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {Object.values(availabilityStatus).filter(status => status?.checked && !status?.available).length}
                      </div>
                      <div className="text-sm text-red-700">Taken</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">
                        {combinations.length - Object.values(availabilityStatus).filter(status => status?.checked).length}
                      </div>
                      <div className="text-sm text-gray-700">Unchecked</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Domain Value Summary */}
              {combinations.length > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Domain Value Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        ${combinations.reduce((sum, combo) => sum + (combo.domain_value || 0), 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700">Total Estimated Value</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">
                        ${Math.round(combinations.reduce((sum, combo) => sum + (combo.domain_value || 0), 0) / combinations.length).toLocaleString()}
                      </div>
                      <div className="text-sm text-emerald-700">Average Domain Value</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${combinations.reduce((sum, combo) => sum + (combo.estimated_price || 0), 0).toFixed(2)}
                      </div>
                      <div className="text-sm text-blue-700">Total Registration Cost</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        ${(combinations.reduce((sum, combo) => sum + (combo.domain_value || 0), 0) - combinations.reduce((sum, combo) => sum + (combo.estimated_price || 0), 0)).toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-700">Net Value Potential</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(showOnlyAvailable 
                  ? combinations.filter(combo => availabilityStatus[combo.domain]?.checked && availabilityStatus[combo.domain]?.available)
                  : combinations
                ).map((combo, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white hover:border-blue-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-mono text-xl font-semibold text-gray-900 break-all">
                        {combo.domain}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(combo.score)}`}>
                        Score: {combo.score}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span> {combo.category}
                        </span>
                        {getAvailabilityBadge(combo.domain)}
                      </div>
                      
                      {availabilityStatus[combo.domain]?.checked && availabilityStatus[combo.domain]?.available && availabilityStatus[combo.domain]?.price && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-800">GoDaddy Price:</span>
                            <span className="text-lg font-bold text-green-600">
                              ${availabilityStatus[combo.domain].price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-green-700">
                            <span>Currency: {availabilityStatus[combo.domain].currency || 'USD'}</span>
                            <span>Period: {availabilityStatus[combo.domain].period || 1} year(s)</span>
                          </div>
                          {availabilityStatus[combo.domain].mock && (
                            <div className="mt-2 p-1 bg-yellow-100 border border-yellow-200 rounded text-xs text-yellow-700 text-center">
                              Mock Data (API unavailable)
                            </div>
                          )}
                        </div>
                      )}
                      
                      {combo.domain_value && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-800">Domain Value Estimate:</span>
                            <span className="text-lg font-bold text-blue-600">
                              ${combo.domain_value.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-blue-600 mt-1">
                            Market value based on TLD, length, and quality factors
                          </div>
                        </div>
                      )}
                      
                      {combo.estimated_price && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-800">Registration Cost:</span>
                            <span className="text-lg font-bold text-gray-600">
                              ${combo.estimated_price.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Annual registration fee
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => copyToClipboard(combo.domain)}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                        title="Copy domain name"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </button>
                      <button
                        onClick={() => toggleFavorite(combo.domain)}
                        className={`px-4 py-3 text-sm rounded-lg transition-colors duration-200 flex items-center justify-center ${
                          favorites.includes(combo.domain)
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={favorites.includes(combo.domain) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => window.open(`https://godaddy.com/domainsearch/find?domainToCheck=${combo.domain}`, '_blank')}
                        className="px-4 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        title="Check availability"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 bg-gradient-to-br from-white to-gray-50">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Star className="h-6 w-6 mr-3 text-yellow-500" />
                Your Favorites ({favorites.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((domain, index) => (
                  <div
                    key={index}
                    className="border-2 border-yellow-200 rounded-xl p-6 bg-yellow-50 hover:bg-yellow-100 transition-colors duration-300"
                  >
                    <h3 className="font-mono text-xl font-semibold text-gray-900 mb-4 break-all">
                      {domain}
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => copyToClipboard(domain)}
                        className="flex-1 px-4 py-3 bg-yellow-100 text-yellow-800 text-sm rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => toggleFavorite(domain)}
                        className="px-4 py-3 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DomainCombiner;
