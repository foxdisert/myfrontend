import { useEffect } from 'react';
import { secureConsole } from '../utils/secureLogging';

const SeoUpdater = () => {
  useEffect(() => {
    const updateSeoTags = async () => {
      try {
        // Fetch SEO settings from your backend
        const response = await fetch('https://my-backend-r7gr.onrender.com/api/seo/meta-tags');
        if (response.ok) {
          const seoSettings = await response.json();
          
          // Update title
          if (seoSettings.title) {
            document.title = seoSettings.title;
          }
          
          // Update description
          const descMeta = document.querySelector('meta[name="description"]');
          if (descMeta && seoSettings.description) {
            descMeta.setAttribute('content', seoSettings.description);
          }
          
          // Update keywords
          const keywordsMeta = document.querySelector('meta[name="keywords"]');
          if (keywordsMeta && seoSettings.keywords) {
            keywordsMeta.setAttribute('content', seoSettings.keywords);
          }
          
          // Update author
          const authorMeta = document.querySelector('meta[name="author"]');
          if (authorMeta && seoSettings.author) {
            authorMeta.setAttribute('content', seoSettings.author);
          }
          
          // Update Open Graph tags
          const ogTitleMeta = document.querySelector('meta[property="og:title"]');
          if (ogTitleMeta && seoSettings.ogTitle) {
            ogTitleMeta.setAttribute('content', seoSettings.ogTitle);
          }
          
          const ogDescMeta = document.querySelector('meta[property="og:description"]');
          if (ogDescMeta && seoSettings.ogDescription) {
            ogDescMeta.setAttribute('content', seoSettings.ogDescription);
          }
          
          secureConsole.log('✅ SEO tags updated from database');
        }
      } catch (error) {
        secureConsole.error('❌ Error updating SEO tags:', error);
      }
    };
    
    // Update SEO tags when component mounts
    updateSeoTags();
    
    // Set up interval to check for updates (every 30 seconds)
    const interval = setInterval(updateSeoTags, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return null; // This component doesn't render anything
};

export default SeoUpdater;
