import { Link } from 'react-router-dom';
import { BookOpen, Search, DollarSign, Sparkles, CheckCircle, ArrowRight, Clock, TrendingUp, Shield, Users, Lightbulb, Target, Globe } from 'lucide-react';

const Guides = () => {
  const guides = [
    {
      id: 1,
      title: "How to Choose the Perfect Domain Name for Your Business",
      category: "Domain Selection",
      readTime: "8 min read",
      excerpt: "Discover the essential factors to consider when selecting a domain name that represents your brand and drives success.",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      content: `
        <h2>Introduction</h2>
        <p>Choosing the right domain name is one of the most critical decisions you'll make for your online presence. Your domain name is often the first impression visitors have of your brand, and it can significantly impact your SEO, brand recognition, and overall success.</p>
        
        <h2>Key Factors to Consider</h2>
        <h3>1. Keep It Short and Memorable</h3>
        <p>Short domain names are easier to remember, type, and share. Aim for 6-14 characters if possible. Avoid hyphens and numbers that can confuse users or make your domain harder to communicate verbally.</p>
        
        <h3>2. Make It Brandable</h3>
        <p>Your domain should reflect your brand identity. Consider how it sounds when spoken aloud, whether it's easy to spell, and if it conveys the right message about your business.</p>
        
        <h3>3. Choose the Right TLD</h3>
        <p>While .com is still the gold standard, don't overlook other TLDs like .io for tech companies, .co for startups, or industry-specific extensions like .tech or .app. The key is choosing something that fits your brand and is available.</p>
        
        <h3>4. Consider SEO Implications</h3>
        <p>While exact-match domains aren't as crucial as they once were, including relevant keywords can still help. However, prioritize brandability over keyword stuffing.</p>
        
        <h3>5. Check Availability Early</h3>
        <p>Before falling in love with a domain name, check its availability across multiple TLDs. Also check social media handles to ensure consistency across platforms.</p>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Choosing a domain that's too long or complicated</li>
          <li>Using hyphens or numbers unnecessarily</li>
          <li>Ignoring trademark conflicts</li>
          <li>Not checking social media availability</li>
          <li>Settling for a domain that doesn't match your brand</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Take your time when choosing a domain name. It's a long-term investment in your brand's online identity. Use our domain checker tool to explore options and find the perfect match for your business.</p>
      `
    },
    {
      id: 2,
      title: "Understanding Domain Value: What Makes a Domain Expensive?",
      category: "Domain Valuation",
      readTime: "10 min read",
      excerpt: "Learn about the factors that determine domain value and how to evaluate domains for investment or purchase.",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      content: `
        <h2>Introduction</h2>
        <p>Domain values can range from a few dollars to millions. Understanding what makes a domain valuable is crucial whether you're buying, selling, or investing in domains.</p>
        
        <h2>Primary Value Factors</h2>
        <h3>1. Length</h3>
        <p>Shorter domains are generally more valuable. Single-word domains or very short combinations command premium prices because they're memorable and easy to type.</p>
        
        <h3>2. TLD (Top-Level Domain)</h3>
        <p>.com domains are typically the most valuable, followed by .net, .org, and country-specific TLDs. Newer TLDs like .io or .ai can also be valuable in specific contexts.</p>
        
        <h3>3. Keywords</h3>
        <p>Domains containing high-value keywords relevant to profitable industries (finance, tech, health) can be worth significantly more. However, brandability often trumps keyword value.</p>
        
        <h3>4. Brandability</h3>
        <p>A domain that sounds like a brand name, is easy to pronounce, and memorable often commands higher prices than keyword-rich but awkward-sounding domains.</p>
        
        <h3>5. Traffic and Backlinks</h3>
        <p>Established domains with existing traffic, backlinks, and SEO value are worth more than new domains. This is especially true for expired domains with a history.</p>
        
        <h3>6. Market Demand</h3>
        <p>Domains in hot industries or trending niches can see their values increase rapidly. Tech, finance, and healthcare domains often command premium prices.</p>
        
        <h2>How to Evaluate Domain Value</h2>
        <p>Use our domain estimation tool to get an initial valuation based on length, TLD, and other factors. However, remember that:</p>
        <ul>
          <li>Market value can vary significantly</li>
          <li>Emotional value and brand fit matter</li>
          <li>Professional appraisals may be needed for high-value domains</li>
          <li>Comparable sales provide the best reference</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Domain valuation is both an art and a science. While tools can provide estimates, the final value depends on what a buyer is willing to pay. Use our estimation tool as a starting point, but consider all factors when making decisions.</p>
      `
    },
    {
      id: 3,
      title: "Domain Name Best Practices: A Complete Guide",
      category: "Best Practices",
      readTime: "12 min read",
      excerpt: "Master the art of domain selection with proven best practices used by successful businesses worldwide.",
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
      content: `
        <h2>Introduction</h2>
        <p>Following domain name best practices can make the difference between a successful online presence and one that struggles to gain traction. This comprehensive guide covers everything you need to know.</p>
        
        <h2>Best Practices for Domain Selection</h2>
        <h3>1. Research Thoroughly</h3>
        <p>Before committing to a domain, research competitors, check trademark databases, and verify social media handle availability. This prevents legal issues and ensures brand consistency.</p>
        
        <h3>2. Think Long-Term</h3>
        <p>Your domain name should grow with your business. Avoid overly specific names that might limit future expansion. Consider how your business might evolve.</p>
        
        <h3>3. Test Pronunciation</h3>
        <p>Say your domain name out loud to friends and colleagues. If they can't spell it after hearing it, consider alternatives. Word-of-mouth marketing relies on easy pronunciation.</p>
        
        <h3>4. Avoid Trends</h3>
        <p>While trendy words might seem appealing, they can date quickly. Choose timeless names that will remain relevant years from now.</p>
        
        <h3>5. Check for Negative Connotations</h3>
        <p>Research your domain in different languages and cultures to avoid unintended meanings or associations that could harm your brand.</p>
        
        <h2>Technical Considerations</h2>
        <h3>Domain Registration</h3>
        <ul>
          <li>Register for multiple years to show commitment</li>
          <li>Enable privacy protection</li>
          <li>Set up auto-renewal to prevent accidental expiration</li>
          <li>Keep registration information updated</li>
        </ul>
        
        <h3>DNS and Hosting</h3>
        <p>Choose reliable DNS providers and hosting services. Fast DNS resolution improves site speed, which impacts SEO and user experience.</p>
        
        <h2>SEO Best Practices</h2>
        <p>While domain names aren't as critical for SEO as they once were, they still matter:</p>
        <ul>
          <li>Include relevant keywords when natural</li>
          <li>Keep it concise and readable</li>
          <li>Avoid keyword stuffing</li>
          <li>Focus on user experience over exact-match domains</li>
        </ul>
        
        <h2>Protecting Your Domain</h2>
        <p>Once you've chosen your domain:</p>
        <ul>
          <li>Register variations and common misspellings</li>
          <li>Secure social media handles</li>
          <li>Set up email forwarding</li>
          <li>Monitor for trademark violations</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Following these best practices will help you choose a domain name that serves your business well for years to come. Use our tools to check availability, get suggestions, and estimate values as you make your decision.</p>
      `
    },
    {
      id: 4,
      title: "How to Generate Creative Domain Name Ideas",
      category: "Domain Generation",
      readTime: "7 min read",
      excerpt: "Struggling to come up with domain name ideas? Learn proven techniques for generating creative and memorable domain names.",
      icon: Sparkles,
      color: "from-pink-500 to-pink-600",
      content: `
        <h2>Introduction</h2>
        <p>Coming up with the perfect domain name can be challenging. This guide shares creative techniques and tools to help you generate domain name ideas that stand out.</p>
        
        <h2>Creative Techniques</h2>
        <h3>1. Word Combination</h3>
        <p>Combine two relevant words to create something unique. For example, "TechFlow" or "CloudSync". Use our domain combiner tool to experiment with different combinations.</p>
        
        <h3>2. Use Prefixes and Suffixes</h3>
        <p>Add prefixes like "my", "get", "try", or suffixes like "ly", "ify", "app" to create brandable names. Examples: "GetFit", "Simplify", "Taskify".</p>
        
        <h3>3. Portmanteau</h3>
        <p>Blend two words together, like "Netflix" (Internet + Flicks) or "Microsoft" (Microcomputer + Software). This creates memorable, unique names.</p>
        
        <h3>4. Use Metaphors</h3>
        <p>Think about what your business does and find metaphors. A project management tool might use "Bridge" or "Nexus" to convey connection.</p>
        
        <h3>5. Invented Words</h3>
        <p>Sometimes the best domains are completely made up but sound brandable. Think "Google" or "Yahoo". These are memorable because they're unique.</p>
        
        <h2>Using Our Tools</h2>
        <p>Our domain suggestion and combiner tools can help spark ideas:</p>
        <ul>
          <li>Enter keywords related to your business</li>
          <li>Try different TLD combinations</li>
          <li>Experiment with prefixes and suffixes</li>
          <li>Check availability in real-time</li>
        </ul>
        
        <h2>Brainstorming Tips</h2>
        <ul>
          <li>Write down 50-100 ideas without filtering</li>
          <li>Sleep on it and revisit with fresh eyes</li>
          <li>Get feedback from potential customers</li>
          <li>Test pronunciation and spelling</li>
          <li>Check for domain availability before committing</li>
        </ul>
        
        <h2>Common Patterns</h2>
        <p>Successful domain names often follow these patterns:</p>
        <ul>
          <li>Action + Noun: "Dropbox", "Shopify"</li>
          <li>Adjective + Noun: "FastMail", "BigCommerce"</li>
          <li>Noun + Verb: "MailChimp", "Basecamp"</li>
          <li>Made-up words: "Flickr", "Tumblr"</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Generating creative domain names takes practice and experimentation. Use our tools to explore possibilities, check availability, and find the perfect name for your project.</p>
      `
    },
    {
      id: 5,
      title: "Domain Security: Protecting Your Online Identity",
      category: "Security",
      readTime: "9 min read",
      excerpt: "Learn essential security practices to protect your domain from theft, expiration, and unauthorized access.",
      icon: Shield,
      color: "from-red-500 to-red-600",
      content: `
        <h2>Introduction</h2>
        <p>Your domain name is a valuable asset that needs protection. Domain theft, expiration, and unauthorized transfers can devastate your online presence. This guide covers essential security practices.</p>
        
        <h2>Essential Security Measures</h2>
        <h3>1. Enable Domain Lock</h3>
        <p>Domain lock (also called registrar lock) prevents unauthorized transfers. Keep this enabled unless you're actively transferring your domain.</p>
        
        <h3>2. Use Strong Passwords</h3>
        <p>Your registrar account password should be unique and strong. Use a password manager to generate and store complex passwords.</p>
        
        <h3>3. Enable Two-Factor Authentication</h3>
        <p>Add an extra layer of security with 2FA. Even if someone gets your password, they can't access your account without your authentication device.</p>
        
        <h3>4. Enable Privacy Protection</h3>
        <p>Domain privacy protection (WHOIS privacy) hides your personal information from public databases, reducing spam and potential security risks.</p>
        
        <h3>5. Monitor Expiration Dates</h3>
        <p>Set up auto-renewal and calendar reminders well before expiration. Losing a domain due to expiration is easily preventable.</p>
        
        <h2>Protecting Against Domain Theft</h2>
        <p>Domain theft is a serious threat. Protect yourself by:</p>
        <ul>
          <li>Never sharing account credentials</li>
          <li>Using secure email accounts</li>
          <li>Monitoring for unauthorized changes</li>
          <li>Keeping contact information updated</li>
          <li>Using reputable registrars</li>
        </ul>
        
        <h2>Email Security</h2>
        <p>Your registrar email is a critical security point:</p>
        <ul>
          <li>Use a dedicated, secure email for domain management</li>
          <li>Enable 2FA on your email account</li>
          <li>Monitor for suspicious activity</li>
          <li>Never use public or shared email accounts</li>
        </ul>
        
        <h2>Regular Security Audits</h2>
        <p>Periodically review your domain security:</p>
        <ul>
          <li>Check WHOIS information accuracy</li>
          <li>Review authorized users and access</li>
          <li>Verify domain lock status</li>
          <li>Update passwords regularly</li>
          <li>Review DNS settings for unauthorized changes</li>
        </ul>
        
        <h2>What to Do If Compromised</h2>
        <p>If you suspect unauthorized access:</p>
        <ol>
          <li>Immediately change all passwords</li>
          <li>Enable domain lock</li>
          <li>Contact your registrar's security team</li>
          <li>Review DNS and email settings</li>
          <li>Monitor for suspicious activity</li>
        </ol>
        
        <h2>Conclusion</h2>
        <p>Domain security requires ongoing attention. Implement these practices from day one and regularly review your security posture. Your domain is too valuable to leave unprotected.</p>
      `
    },
    {
      id: 6,
      title: "Understanding TLDs: Which Domain Extension Should You Choose?",
      category: "Domain Basics",
      readTime: "6 min read",
      excerpt: "Navigate the world of top-level domains and learn which extensions work best for different types of businesses.",
      icon: Globe,
      color: "from-indigo-500 to-indigo-600",
      content: `
        <h2>Introduction</h2>
        <p>With hundreds of top-level domains (TLDs) available, choosing the right extension can be confusing. This guide helps you understand your options and make the best choice.</p>
        
        <h2>Popular TLD Categories</h2>
        <h3>1. Generic TLDs (.com, .net, .org)</h3>
        <p>.com remains the most trusted and recognizable extension. .net is good for tech companies, while .org is ideal for nonprofits and organizations.</p>
        
        <h3>2. Country Code TLDs (.us, .uk, .ca)</h3>
        <p>Country-specific TLDs signal local presence and can help with local SEO. They're essential if you primarily serve a specific country.</p>
        
        <h3>3. New Generic TLDs (.tech, .app, .io)</h3>
        <p>Newer extensions offer more availability and can be highly brandable. .io is popular with tech startups, .app for applications, and .tech for technology companies.</p>
        
        <h3>4. Industry-Specific TLDs</h3>
        <p>Extensions like .finance, .health, .education target specific industries and can improve relevance and trust in those sectors.</p>
        
        <h2>Factors to Consider</h2>
        <h3>Availability</h3>
        <p>If your ideal .com isn't available, newer TLDs offer more options. However, consider registering multiple extensions to protect your brand.</p>
        
        <h3>Brand Fit</h3>
        <p>Choose an extension that fits your brand identity. A creative agency might use .design, while a tech company might prefer .io or .tech.</p>
        
        <h3>Trust and Recognition</h3>
        <p>.com domains are still the most trusted. If you can't get a .com, consider registering it later and redirecting, or use a highly brandable alternative.</p>
        
        <h3>SEO Impact</h3>
        <p>While TLD choice has minimal direct SEO impact, country-specific TLDs can help with local search rankings. Focus on user trust and brandability.</p>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Prioritize .com if available</li>
          <li>Consider registering multiple extensions</li>
          <li>Match TLD to your industry when appropriate</li>
          <li>Think about international expansion</li>
          <li>Ensure the TLD doesn't create confusion</li>
        </ul>
        
        <h2>Common Mistakes</h2>
        <ul>
          <li>Choosing obscure TLDs that confuse users</li>
          <li>Ignoring .com alternatives when unavailable</li>
          <li>Not considering future expansion</li>
          <li>Overlooking country-specific TLDs for local businesses</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>The right TLD depends on your brand, industry, and goals. While .com is ideal, don't overlook other options that might better fit your brand. Use our domain checker to explore availability across different extensions.</p>
      `
    }
  ];

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

