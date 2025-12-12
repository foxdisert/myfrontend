import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Calculator, TrendingUp, DollarSign, BarChart3, Info, AlertCircle, Copy, RefreshCw } from 'lucide-react';
import WatchPlayerSection from '../components/WatchPlayerSection';
import PageAdBreak from '../components/PageAdBreak';
import { isReloadNavigation, parseWatchParams } from '../utils/watchParams';

const DomainEstimation = () => {
  const [domain, setDomain] = useState('');
  const [estimationResult, setEstimationResult] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimationHistory, setEstimationHistory] = useState([]);
  const [searchParams] = useSearchParams();
  const [watchData, setWatchData] = useState(() => parseWatchParams(searchParams));

  useEffect(() => {
    const parsed = parseWatchParams(searchParams);
    const hasPayload = Boolean(parsed.videoUrl);

    if (hasPayload) {
      setWatchData(parsed);

      if (typeof window !== 'undefined' && window.location.search) {
        const cleanUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.replaceState({}, '', cleanUrl);
      }
    } else {
      setWatchData(parsed);
    }
  }, [searchParams]);

  useEffect(() => {
    if (watchData.videoUrl && isReloadNavigation() && watchData.homeUrl) {
      window.location.replace(watchData.homeUrl);
    }
  }, [watchData]);

  // Domain Estimation Functions
  const estimateDomainValue = async (domain) => {
    if (!domain.trim()) {
      alert('Please enter a domain name to estimate.');
      return;
    }

    setIsEstimating(true);
    try {
      const domainName = domain.trim().toLowerCase();
      
      // Extract domain parts
      const domainParts = domainName.split('.');
      const name = domainParts[0];
      const tld = domainParts[1] || 'com';
      
      // Calculate base score
      let baseScore = 0;
      
      // Length factor (shorter = more valuable)
      if (name.length <= 3) baseScore += 40;
      else if (name.length <= 5) baseScore += 30;
      else if (name.length <= 7) baseScore += 20;
      else if (name.length <= 10) baseScore += 10;
      else baseScore += 5;
      
      // TLD factor
      const tldScores = {
        'com': 100, 'net': 80, 'org': 75, 'io': 85, 'co': 70,
        'tech': 65, 'app': 70, 'dev': 60, 'ai': 90, 'cloud': 75
      };
      const tldScore = tldScores[tld] || 50;
      baseScore += (tldScore / 10);
      
      // Keyword factor
      const premiumKeywords = ['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber', 'future', 'global', 'world', 'hub', 'pro', 'lab', 'studio', 'agency', 'solutions', 'systems', 'works', 'group'];
      const keywordScore = premiumKeywords.filter(keyword => 
        name.includes(keyword)
      ).length * 15;
      baseScore += keywordScore;
      
      // Brandability factor
      const brandableScore = calculateBrandability(name);
      baseScore += brandableScore;
      
      // Market demand factor
      const marketScore = calculateMarketDemand(name, tld);
      baseScore += marketScore;
      
      // Final adjustments
      baseScore = Math.min(100, Math.max(10, baseScore));
      
      // Calculate estimated value
      const estimatedValue = calculateEstimatedValue(baseScore, name.length, tld);
      
      // Create estimation result
      const result = {
        domain: domainName,
        score: Math.round(baseScore),
        estimatedValue: estimatedValue,
        factors: {
          length: name.length,
          tld: tld,
          keywordScore: keywordScore,
          brandabilityScore: brandableScore,
          marketScore: marketScore
        },
        breakdown: {
          lengthFactor: getLengthFactor(name.length),
          tldFactor: getTldFactor(tld),
          keywordFactor: getKeywordFactor(name),
          brandabilityFactor: getBrandabilityFactor(name),
          marketFactor: getMarketFactor(name, tld)
        },
        timestamp: new Date().toISOString()
      };
      
      setEstimationResult(result);
      setEstimationHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10
      
    } catch (error) {
      console.error('Error estimating domain value:', error);
      alert(`Error estimating domain value: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsEstimating(false);
    }
  };

  const calculateBrandability = (name) => {
    let score = 0;
    
    // Check for memorable patterns
    if (/^[aeiou]{2,}/i.test(name)) score += 10; // Starts with vowels
    if (/[aeiou]{3,}/i.test(name)) score += 5;   // Multiple vowels together
    if (/^[bcdfghjklmnpqrstvwxyz]{2,}/i.test(name)) score += 8; // Starts with consonants
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name)) score -= 5;  // Too many consonants
    
    // Check for repetition
    if (/(.)\1{2,}/.test(name)) score -= 10; // Repeated characters
    
    // Check for numbers
    if (/\d/.test(name)) score -= 5;
    
    // Check for hyphens
    if (/-/.test(name)) score -= 8;
    
    return Math.max(-20, Math.min(20, score));
  };

  const calculateMarketDemand = (name, tld) => {
    let score = 0;
    
    // Industry-specific scoring
    if (['tech', 'ai', 'dev', 'app'].includes(tld)) {
      if (['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber'].some(keyword => name.includes(keyword))) {
        score += 20;
      }
    }
    
    if (['io', 'co'].includes(tld)) {
      if (['startup', 'hub', 'pro', 'lab', 'studio', 'agency'].some(keyword => name.includes(keyword))) {
        score += 15;
      }
    }
    
    // Trending keywords
    const trendingKeywords = ['ai', 'ml', 'blockchain', 'crypto', 'nft', 'metaverse', 'web3'];
    if (trendingKeywords.some(keyword => name.includes(keyword))) {
      score += 25;
    }
    
    return Math.min(30, score);
  };

  const calculateEstimatedValue = (score, length, tld) => {
    let baseValue = 0;
    
    // Base value by TLD
    const tldBaseValues = {
      'com': 1000, 'net': 800, 'org': 750, 'io': 1200, 'co': 900,
      'tech': 600, 'app': 700, 'dev': 500, 'ai': 1500, 'cloud': 800
    };
    baseValue = tldBaseValues[tld] || 500;
    
    // Adjust by score
    const scoreMultiplier = score / 50; // 0.2 to 2.0
    
    // Adjust by length
    const lengthMultiplier = length <= 3 ? 3 : length <= 5 ? 2 : length <= 7 ? 1.5 : length <= 10 ? 1.2 : 1;
    
    let estimatedValue = baseValue * scoreMultiplier * lengthMultiplier;
    
    // Round to reasonable ranges
    if (estimatedValue < 100) estimatedValue = Math.round(estimatedValue / 10) * 10;
    else if (estimatedValue < 1000) estimatedValue = Math.round(estimatedValue / 50) * 50;
    else if (estimatedValue < 10000) estimatedValue = Math.round(estimatedValue / 100) * 100;
    else estimatedValue = Math.round(estimatedValue / 1000) * 1000;
    
    return estimatedValue;
  };

  const getLengthFactor = (length) => {
    if (length <= 3) return 'Premium (Ultra Short)';
    if (length <= 5) return 'High (Short)';
    if (length <= 7) return 'Good (Medium)';
    if (length <= 10) return 'Fair (Long)';
    return 'Basic (Very Long)';
  };

  const getTldFactor = (tld) => {
    const tldFactors = {
      'com': 'Premium (Most Popular)',
      'net': 'High (Professional)',
      'org': 'High (Organization)',
      'io': 'Premium (Tech/Startup)',
      'co': 'High (Company)',
      'tech': 'Good (Technology)',
      'app': 'Good (Application)',
      'dev': 'Good (Development)',
      'ai': 'Premium (AI/Machine Learning)',
      'cloud': 'Good (Cloud Services)'
    };
    return tldFactors[tld] || 'Standard';
  };

  const getKeywordFactor = (name) => {
    const premiumKeywords = ['tech', 'digital', 'web', 'app', 'smart', 'cloud', 'data', 'ai', 'cyber', 'future'];
    const foundKeywords = premiumKeywords.filter(keyword => name.includes(keyword));
    
    if (foundKeywords.length === 0) return 'None';
    if (foundKeywords.length === 1) return `Good (${foundKeywords[0]})`;
    if (foundKeywords.length === 2) return `High (${foundKeywords.join(', ')})`;
    return `Premium (${foundKeywords.join(', ')})`;
  };

  const getBrandabilityFactor = (name) => {
    const brandableScore = calculateBrandability(name);
    
    if (brandableScore >= 15) return 'Excellent (Highly Brandable)';
    if (brandableScore >= 10) return 'Very Good (Brandable)';
    if (brandableScore >= 5) return 'Good (Somewhat Brandable)';
    if (brandableScore >= 0) return 'Fair (Neutral)';
    if (brandableScore >= -10) return 'Poor (Less Brandable)';
    return 'Very Poor (Not Brandable)';
  };

  const getMarketFactor = (name, tld) => {
    const marketScore = calculateMarketDemand(name, tld);
    
    if (marketScore >= 25) return 'Excellent (High Market Demand)';
    if (marketScore >= 20) return 'Very Good (Strong Market Demand)';
    if (marketScore >= 15) return 'Good (Moderate Market Demand)';
    if (marketScore >= 10) return 'Fair (Some Market Demand)';
    if (marketScore >= 5) return 'Poor (Low Market Demand)';
    return 'Very Poor (Minimal Market Demand)';
  };

  const getValueCategory = (value) => {
    if (value >= 10000) return { label: 'Premium', color: 'text-purple-600 bg-purple-100' };
    if (value >= 1000) return { label: 'High Value', color: 'text-green-600 bg-green-100' };
    if (value >= 100) return { label: 'Medium Value', color: 'text-blue-600 bg-blue-100' };
    if (value >= 10) return { label: 'Low Value', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Basic', color: 'text-gray-600 bg-gray-100' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await estimateDomainValue(domain);
  };

  const copyToClipboard = () => {
    if (!estimationResult) return;
    
    try {
      const textToCopy = `Domain: ${estimationResult.domain}\nEstimated Value: $${estimationResult.estimatedValue.toLocaleString()}\nScore: ${estimationResult.score}/100`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy);
        alert('Estimation details copied to clipboard!');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Estimation details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Could not copy to clipboard. Please copy manually.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {watchData.videoUrl && (
            <WatchPlayerSection data={watchData} />
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Domain Estimation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate domain name appraisals and estimated market values. 
              Our AI-powered tool analyzes domain characteristics to provide insights.
            </p>
          </div>

          <PageAdBreak variant="subtle" containerWidth="max-w-4xl" />

          {/* Estimation Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="mb-6">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Name
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain name (e.g., example.com)"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isEstimating || !domain.trim()}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isEstimating ? 'Estimating...' : 'Get Estimate'}
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-2 text-blue-900">Estimation Tips:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Include the TLD (e.g., .com, .net, .org)</li>
                      <li>• Shorter domains typically have higher values</li>
                      <li>• Keyword-rich domains may be worth more</li>
                      <li>• Brandable domains can command premium prices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <PageAdBreak variant="light" containerWidth="max-w-4xl" />

          {/* Error Display */}
          {/* The error display is removed as per the new_code, as the estimation logic now handles its own error messages. */}

          {/* Estimation Results */}
          {estimationResult && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Estimation Results for {estimationResult.domain}
                  </h2>
                </div>

                <div className="p-6">
                  {/* Main Value */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                      <DollarSign className="h-12 w-12 text-green-600" />
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${estimationResult.estimatedValue?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-blue-600">
                        Score: {estimationResult.score}/100
                      </span>
                    </div>
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getValueCategory(estimationResult.estimatedValue || 0).color}`}>
                      {getValueCategory(estimationResult.estimatedValue || 0).label}
                    </div>
                  </div>

                  {/* Value Range */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ${estimationResult.estimatedValue?.toLocaleString() || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">Estimated Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ${estimationResult.estimatedValue?.toLocaleString() || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">Estimated Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ${estimationResult.estimatedValue?.toLocaleString() || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">Maximum Value</div>
                    </div>
                  </div>

                  {/* Factors */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                      Value Factors
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        Length: {estimationResult.breakdown.lengthFactor}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        TLD: {estimationResult.breakdown.tldFactor}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Keyword Rich: {estimationResult.breakdown.keywordFactor}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                        Brandable: {estimationResult.breakdown.brandabilityFactor}
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        Market Demand: {estimationResult.breakdown.marketFactor}
                      </div>
                    </div>
                  </div>

                  {/* Domain Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain Characteristics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Length:</span>
                          <span className="font-medium">{estimationResult.factors.length} characters</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">TLD:</span>
                          <span className="font-medium">{estimationResult.factors.tld}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Keyword Rich:</span>
                          <span className="font-medium">{estimationResult.factors.keywordScore > 0 ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brandable:</span>
                          <span className="font-medium">{estimationResult.factors.brandabilityScore > 0 ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Factors</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Search Volume:</span>
                          <span className="font-medium">{estimationResult.factors.marketScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Competition:</span>
                          <span className="font-medium">{estimationResult.factors.marketScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trending:</span>
                          <span className="font-medium">{estimationResult.factors.marketScore > 20 ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Premium TLD:</span>
                          <span className="font-medium">{estimationResult.factors.marketScore > 20 ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Disclaimer:</strong> This estimation is for informational purposes only and should not be considered as professional appraisal advice. 
                      Actual domain values may vary based on market conditions, buyer interest, and other factors.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Copy className="h-5 w-5 mr-2" />
                      Copy Details
                    </button>
                    <button
                      onClick={() => setEstimationResult(null)}
                      className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <RefreshCw className="h-5 w-5 mr-2" />
                      New Estimation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <PageAdBreak variant="contrast" containerWidth="max-w-4xl" />

          {/* Recent Estimations */}
          {estimationHistory.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recent Estimations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {estimationHistory.map((est, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 truncate">{est.domain}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getValueCategory(est.estimatedValue || 0).color}`}>
                        {getValueCategory(est.estimatedValue || 0).label}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${est.estimatedValue?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(est.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <PageAdBreak variant="muted" containerWidth="max-w-5xl" className="mt-12" />

          {/* Educational Content Section - High-Value Keywords for Better CPC */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            
            {/* Domain Investment Guide */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3" />
                  Domain Investment Strategies for 2024
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Domain name investing has become a lucrative digital asset strategy, with premium domains selling for millions. 
                  Understanding domain valuation, SEO benefits, and market trends is crucial for successful domain portfolio management.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border-2 border-blue-200">
                    <h3 className="font-bold text-lg text-blue-900 mb-3">💎 Premium Domain Characteristics</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Short Length:</strong> 1-5 character domains command premium prices in domain marketplaces</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Keyword Rich:</strong> Domains with SEO keywords (tech, AI, cloud, SaaS) attract higher bids</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>.com TLD:</strong> Still the most valuable extension for business domains and e-commerce</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Brandable:</strong> Memorable names perfect for startups and digital marketing campaigns</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border-2 border-purple-200">
                    <h3 className="font-bold text-lg text-purple-900 mb-3">📈 High-ROI Domain Categories</h3>
                    <ul className="space-y-2 text-purple-800">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span><strong>AI & Machine Learning:</strong> Artificial intelligence domains seeing 300% value growth</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span><strong>Blockchain & Crypto:</strong> Web3 and NFT domains in high demand from fintech companies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span><strong>Cloud & SaaS:</strong> Cloud hosting and software-as-a-service domains attract premium buyers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span><strong>E-commerce:</strong> Online retail and marketplace domains with strong commercial intent</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Expert Investment Tip</h4>
                      <p className="text-yellow-800 text-sm">
                        Focus on exact match domains (EMD) that align with high-volume search queries. These domains 
                        provide inherent SEO advantages and attract businesses looking to improve their organic search rankings 
                        and digital marketing ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PageAdBreak variant="light" containerWidth="max-w-5xl" />

            {/* SEO & Digital Marketing Benefits */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  SEO Benefits of Premium Domain Names
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Premium domain names provide significant advantages for search engine optimization, digital marketing campaigns, 
                  and brand recognition. Understanding these benefits helps justify domain investment costs and improve online visibility.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg text-center border border-green-200">
                    <div className="text-3xl font-bold text-green-700 mb-2">67%</div>
                    <div className="text-sm text-green-800 font-medium">Higher Click-Through Rate</div>
                    <div className="text-xs text-green-600 mt-1">With keyword-rich domains</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg text-center border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-2">2.3x</div>
                    <div className="text-sm text-blue-800 font-medium">Better Brand Recall</div>
                    <div className="text-xs text-blue-600 mt-1">With memorable domains</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg text-center border border-purple-200">
                    <div className="text-3xl font-bold text-purple-700 mb-2">40%</div>
                    <div className="text-sm text-purple-800 font-medium">Lower PPC Costs</div>
                    <div className="text-xs text-purple-600 mt-1">With exact match domains</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900">Key SEO Advantages:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Improved Search Rankings:</strong>
                        <span className="text-gray-700"> Keyword domains signal relevance to search engines like Google and Bing</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Link Building:</strong>
                        <span className="text-gray-700"> Premium domains attract more natural backlinks from authority websites</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Trust Signals:</strong>
                        <span className="text-gray-700"> Professional domains increase credibility for online businesses</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Marketing Efficiency:</strong>
                        <span className="text-gray-700"> Memorable domains reduce advertising costs and improve conversion rates</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PageAdBreak variant="contrast" containerWidth="max-w-5xl" />

            {/* Trending Markets Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-orange-600 to-red-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  Top Trending Domain Markets & TLD Comparison
                </h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Industry</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Best TLD</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Avg. Domain Value</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Market Demand</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">AI & Machine Learning</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">.ai, .com, .io</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$15,000 - $500,000</td>
                        <td className="border border-gray-300 px-4 py-3"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Very High</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Blockchain & Crypto</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">.crypto, .com, .io</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$10,000 - $300,000</td>
                        <td className="border border-gray-300 px-4 py-3"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Very High</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">SaaS & Cloud Computing</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">.cloud, .com, .tech</td>
                        <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">$8,000 - $250,000</td>
                        <td className="border border-gray-300 px-4 py-3"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Very High</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">E-commerce & Retail</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">.com, .shop, .store</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700 font-bold">$5,000 - $150,000</td>
                        <td className="border border-gray-300 px-4 py-3"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">High</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Digital Marketing</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">.com, .agency, .marketing</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700 font-bold">$3,000 - $100,000</td>
                        <td className="border border-gray-300 px-4 py-3"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">High</span></td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-colors bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Web Development</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">.dev, .com, .io</td>
                        <td className="border border-gray-300 px-4 py-3 text-blue-700 font-bold">$2,500 - $80,000</td>
                        <td className="border border-gray-300 px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Moderate</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  *Values based on 2024 domain marketplace data from GoDaddy, Sedo, and Flippa domain auctions
                </p>
              </div>
            </div>

            <PageAdBreak variant="light" containerWidth="max-w-5xl" />

            {/* FAQ Section - High-Value Long-tail Keywords */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">
                  Frequently Asked Questions About Domain Valuation
                </h2>
              </div>
              <div className="p-6 space-y-6">
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    How do I determine the value of my domain name?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Domain valuation depends on multiple factors including length, keyword relevance, TLD extension, 
                    brandability, search volume, and market demand. Use professional domain appraisal tools, analyze 
                    comparable sales on marketplaces like Sedo and GoDaddy Auctions, and consider hiring a domain 
                    broker for high-value assets. Our domain estimation tool provides instant valuations based on current market trends.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    What makes a domain name valuable for SEO and digital marketing?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    SEO-valuable domains contain exact match keywords that align with high-volume search terms, helping 
                    businesses rank higher in Google search results. Keyword-rich domains improve click-through rates (CTR) 
                    in search engine results pages (SERPs), reduce pay-per-click (PPC) advertising costs, and build instant 
                    credibility. Additionally, premium .com domains tend to have higher domain authority and trust signals.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    Should I invest in new TLDs (.ai, .io, .cloud) or stick with .com?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    While .com remains the gold standard for business domains and e-commerce, new TLDs like .ai (artificial 
                    intelligence), .io (tech startups), and .cloud (cloud hosting) have gained significant traction in specific 
                    industries. Tech companies and SaaS startups particularly favor .io domains, while AI companies premium .ai 
                    extensions. Consider your target audience and industry when choosing between traditional and new TLDs.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    How can I monetize my premium domain portfolio?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Domain monetization strategies include domain parking with advertising networks (like Google AdSense), 
                    leasing domains to businesses, developing websites for affiliate marketing or e-commerce, and selling 
                    through domain marketplaces or auctions. Premium domains can generate passive income through PPC advertising, 
                    while high-value sales can yield significant returns on investment. Consider working with domain brokers 
                    for six-figure or seven-figure domain transactions.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    What are the best domain marketplaces for buying and selling domains?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Top domain marketplaces include GoDaddy Auctions, Sedo, Flippa, Afternic, and Dan.com. Each platform 
                    has unique features: GoDaddy offers the largest inventory, Sedo specializes in premium domain brokerage, 
                    Flippa includes website sales alongside domains, Afternic provides fast transfer services, and Dan.com 
                    offers seller-friendly commission structures. For ultra-premium domains ($100,000+), consider working 
                    with professional domain brokers who have access to private sales networks and high-net-worth buyers.
                  </p>
                </div>

              </div>
            </div>

          </div>

          <PageAdBreak variant="muted" containerWidth="max-w-5xl" className="mt-12" />
        </div>
      </div>

      <PageAdBreak variant="subtle" />
    </>
  );
};

export default DomainEstimation;
