import { Link } from 'react-router-dom';
import { BookOpen, Search, Sparkles, ArrowRight, Clock, TrendingUp, Shield, Users, Lightbulb } from 'lucide-react';
import { guidesData } from '../data/guidesData';

const Guides = () => {
  const guides = guidesData;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Domain Management Guides & Resources
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Learn everything you need to know about domain names, from choosing the perfect name to protecting your online identity. 
                Expert insights and practical tips to help you succeed online.
              </p>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <div
                    key={guide.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                  >
                    <div className={`bg-gradient-to-r ${guide.color} p-6`}>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-3">
                        {guide.category}
                      </span>
                      <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                        {guide.title}
                      </h2>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {guide.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {guide.readTime}
                        </div>
                        <Link
                          to={`/guides/${guide.id}`}
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Tips & Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Essential information to help you make informed domain decisions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <Lightbulb className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Quick Tips</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Keep it short and memorable</li>
                  <li>• Avoid hyphens and numbers</li>
                  <li>• Check social media availability</li>
                  <li>• Think long-term</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Value Factors</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Shorter is better</li>
                  <li>• .com commands premium</li>
                  <li>• Brandability matters</li>
                  <li>• Keywords can help</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <Shield className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Enable domain lock</li>
                  <li>• Use strong passwords</li>
                  <li>• Enable 2FA</li>
                  <li>• Monitor expiration</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6">
                <Users className="h-8 w-8 text-pink-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Best Practices</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Research thoroughly</li>
                  <li>• Test pronunciation</li>
                  <li>• Check trademarks</li>
                  <li>• Register variations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Perfect Domain?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Use our powerful tools to check availability, get suggestions, and estimate values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/check"
                className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                Check Domain Availability
              </Link>
              <Link
                to="/suggestions"
                className="inline-flex items-center px-8 py-3 bg-white/10 text-white border-2 border-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Get Domain Suggestions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Guides;
