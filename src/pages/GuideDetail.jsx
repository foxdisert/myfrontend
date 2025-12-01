import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Share2, CheckCircle } from 'lucide-react';
import { guidesData } from '../data/guidesData';
import PageAdBreak from '../components/PageAdBreak';

const GuideDetail = () => {
  const { id } = useParams();
  const guideId = parseInt(id);
  
  const guide = guidesData.find(g => g.id === guideId);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const Icon = guide.icon;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${guide.color} text-white py-16`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/guides"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Guides
            </Link>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full">
                {guide.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {guide.title}
            </h1>
            
            <div className="flex items-center text-white/90 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span>{guide.readTime}</span>
            </div>
          </div>
        </div>

        <PageAdBreak variant="light" containerWidth="max-w-4xl" />

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
            <div 
              className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:text-gray-700 prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-ul:list-disc prose-ul:ml-6 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />
          </article>

          <PageAdBreak variant="contrast" containerWidth="max-w-4xl" className="mt-8" />

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Domain?</h3>
            <p className="text-gray-700 mb-6">
              Now that you've learned about {guide.category.toLowerCase()}, use our tools to put this knowledge into practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/check"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Check Domain Availability
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View All Guides
              </Link>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <span>Found this guide helpful?</span>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: guide.title,
                    text: guide.excerpt,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share this guide
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideDetail;

