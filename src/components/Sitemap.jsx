import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, ExternalLink, Globe, BookOpen, Search, BarChart3, Sparkles, Info, Mail, Shield } from 'lucide-react';

const Sitemap = () => {
  const pages = [
    {
      url: '/',
      title: 'Home',
      priority: '1.0',
      changefreq: 'daily',
      icon: Globe,
      description: 'Professional Domain Management Toolkit homepage'
    },
    {
      url: '/check',
      title: 'Domain Checker',
      priority: '0.9',
      changefreq: 'weekly',
      icon: Search,
      description: 'Check domain availability instantly'
    },
    {
      url: '/suggestions',
      title: 'Domain Suggestions',
      priority: '0.9',
      changefreq: 'weekly',
      icon: Sparkles,
      description: 'Get smart domain name suggestions'
    },
    {
      url: '/estimation',
      title: 'Domain Estimation',
      priority: '0.9',
      changefreq: 'weekly',
      icon: BarChart3,
      description: 'Professional domain value estimation'
    },
    {
      url: '/combiner',
      title: 'Domain Combiner',
      priority: '0.9',
      changefreq: 'weekly',
      icon: Sparkles,
      description: 'Generate creative domain combinations'
    },
    {
      url: '/guides',
      title: 'Guides & Resources',
      priority: '0.9',
      changefreq: 'weekly',
      icon: BookOpen,
      description: 'Comprehensive domain management guides'
    },
    {
      url: '/about',
      title: 'About Us',
      priority: '0.7',
      changefreq: 'monthly',
      icon: Info,
      description: 'Learn about Domain Toolkit'
    },
    {
      url: '/contact',
      title: 'Contact',
      priority: '0.7',
      changefreq: 'monthly',
      icon: Mail,
      description: 'Get in touch with our team'
    },
    {
      url: '/privacy',
      title: 'Privacy Policy',
      priority: '0.5',
      changefreq: 'monthly',
      icon: Shield,
      description: 'Our privacy policy and data practices'
    },
    {
      url: '/terms',
      title: 'Terms of Service',
      priority: '0.5',
      changefreq: 'monthly',
      icon: FileText,
      description: 'Terms and conditions of use'
    },
    {
      url: '/register',
      title: 'Register',
      priority: '0.4',
      changefreq: 'monthly',
      icon: Globe,
      description: 'Create a free account'
    },
    {
      url: '/login',
      title: 'Login',
      priority: '0.3',
      changefreq: 'monthly',
      icon: Globe,
      description: 'Sign in to your account'
    }
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>https://mydntk.com${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
  <!-- Individual Guide Pages -->
  <url>
    <loc>https://mydntk.com/guides/1</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mydntk.com/guides/2</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mydntk.com/guides/3</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mydntk.com/guides/4</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mydntk.com/guides/5</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mydntk.com/guides/6</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    // Create and download sitemap
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Website Sitemap</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete list of all pages on Domain Toolkit. This sitemap helps search engines 
            and AdSense understand your site structure for better indexing and visibility.
          </p>
        </div>

        {/* Sitemap Info */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">XML Sitemap</h2>
              <p className="text-gray-600">
                Your sitemap.xml file has been automatically downloaded. You can also access it directly at:
              </p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View XML Sitemap
            </a>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              SEO Benefits
            </h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Helps search engines discover and index all your pages</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Improves crawl efficiency with priority and change frequency hints</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Required for Google Search Console and AdSense approval</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Shows search engines which pages are most important</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pages List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pages.map((page, index) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.url}
                  to={page.url}
                  className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {page.title}
                      </h3>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {page.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <span className="mr-1">URL:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded">{page.url}</code>
                      </span>
                      <span>Updates: {page.changefreq}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            Next Steps for SEO & AdSense
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Submit to Google Search Console</h4>
              <ol className="text-sm text-gray-700 space-y-1 ml-4 list-decimal">
                <li>Go to Google Search Console</li>
                <li>Add your property (mydntk.com)</li>
                <li>Navigate to Sitemaps section</li>
                <li>Submit: https://mydntk.com/sitemap.xml</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Verify robots.txt</h4>
              <p className="text-sm text-gray-700 mb-2">
                Ensure your robots.txt references the sitemap:
              </p>
              <code className="block bg-white p-2 rounded text-xs text-gray-800 border border-gray-300">
                Sitemap: https://mydntk.com/sitemap.xml
              </code>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Request AdSense Review</h4>
              <p className="text-sm text-gray-700">
                After submitting your sitemap and ensuring all pages have quality content, 
                request a new AdSense review. The sitemap helps Google understand your site structure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Monitor & Update</h4>
              <p className="text-sm text-gray-700">
                Regularly update your sitemap when adding new pages. Keep the lastmod dates current 
                to help search engines know when content changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
