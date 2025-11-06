
import { Globe, Shield, Zap, Users, Award, Heart, CheckCircle, BarChart3, Lock, Clock } from 'lucide-react';

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Domain Toolkit</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to simplify domain management and help businesses, developers, and entrepreneurs 
              find the perfect domain names for their projects.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Domain Toolkit was born from a personal frustration. As entrepreneurs ourselves, we've spent countless hours searching for the perfect domain name, only to find that most tools were either too expensive, too slow, or simply didn't provide the insights we needed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In 2020, after yet another frustrating domain search experience, we decided to build something better. We wanted to create a platform that would make domain discovery not just easier, but actually enjoyable. A tool that would help entrepreneurs, developers, and businesses find their perfect online identity without the headaches.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                What started as a weekend project quickly grew into something more meaningful. We realized that finding the right domain name is often the first step in bringing an idea to life, and we wanted to make that step as smooth as possible. Today, Domain Toolkit serves thousands of users worldwide, helping them find, evaluate, and manage their domains with confidence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is simple: we believe that every great idea deserves a great domain name, and we're here to help you find it. Whether you're launching a startup, building a personal brand, or expanding your business online, we're committed to providing the tools and resources you need to succeed.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">User-First Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every feature we build starts with understanding what our users actually need. We listen, we learn, and we iterate based on real feedback from people using our tools every day.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency & Trust</h3>
                <p className="text-gray-700 leading-relaxed">
                  We believe in being upfront about how our tools work, what data we collect, and how we use it. Trust is earned through transparency, and we're committed to maintaining yours.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Innovation</h3>
                <p className="text-gray-700 leading-relaxed">
                  The domain industry is constantly evolving, and so are we. We're always exploring new ways to make domain management easier, faster, and more insightful for our users.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Domain Availability Checking</h3>
                <p className="text-gray-600">
                  Instantly check if your desired domain is available for registration with real-time results from GoDaddy API.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Domain Value Estimation</h3>
                <p className="text-gray-600">
                  Get professional domain appraisal and value estimation based on multiple factors including TLD, length, and market trends.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Domain Suggestions</h3>
                <p className="text-gray-600">
                  Generate creative domain name suggestions based on your keywords, industry, and preferences.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Domain Combination Tools</h3>
                <p className="text-gray-600">
                  Create unique domain combinations from prefixes, suffixes, and TLDs to find the perfect match.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User Account Management</h3>
                <p className="text-gray-600">
                  Save your favorite domains, track your searches, and manage your domain portfolio in one place.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Enterprise-grade security and reliability to protect your domain research and personal information.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Get instant domain availability results and suggestions in seconds, not minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Built with enterprise-grade security and reliability to protect your domain research.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Focused</h3>
              <p className="text-gray-600">
                Designed with real users in mind, making complex domain operations simple and intuitive.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">
                Enterprise-level tools that professionals trust for their domain management needs.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion-Driven</h3>
              <p className="text-gray-600">
                Created by domain enthusiasts who understand the importance of finding the perfect name.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Serving users worldwide with comprehensive domain management solutions.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Domain Toolkit?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Businesses</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We understand that your domain name is often the first impression customers have of your brand. That's why we've built tools specifically designed to help businesses find domains that not only represent their brand but also drive results.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Find the perfect domain that represents your brand identity</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Professional domain valuation to make informed purchasing decisions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Secure and reliable domain management tools you can trust</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Comprehensive guides and resources to help you succeed</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Developers</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Built by developers, for developers. We know you need fast, reliable tools that integrate seamlessly into your workflow. Our platform is designed with technical users in mind, offering powerful features without unnecessary complexity.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>API access for seamless integration into your applications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Bulk domain checking capabilities for efficient research</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Developer-friendly documentation and code examples</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Scalable solutions that grow with your projects</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Everyone</h3>
              <p className="text-gray-700 leading-relaxed">
                Whether you're a first-time domain buyer or a seasoned professional, Domain Toolkit is designed to be accessible and useful. Our free tools are available to everyone, and we're constantly adding new features based on user feedback. We believe that finding the perfect domain shouldn't require a technical background or a large budget - it should be simple, fast, and enjoyable.
              </p>
            </div>
          </div>

          {/* Technology & Partners */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Technology & Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">GoDaddy API Integration</h3>
                <p className="text-gray-600">
                  Powered by GoDaddy's comprehensive domain database for accurate availability and pricing information.
                </p>
              </div>
              <div>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                <p className="text-gray-600">
                  Built with modern security practices including HTTPS, data encryption, and secure authentication.
                </p>
              </div>
              <div>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">High Performance</h3>
                <p className="text-gray-600">
                  Optimized for speed with modern web technologies and efficient algorithms for fast domain checking.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users who trust Domain Toolkit for their domain management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/check"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Check Domain Availability
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 border border-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors duration-200"
              >
                <Clock className="h-5 w-5 mr-2" />
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
