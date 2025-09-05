import { useEffect, useState } from 'react';

const AdBanner = ({ 
  adSlot = '1234567890', 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  className = '',
  style = {}
}) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    // Check if AdSense is loaded
    if (window.adsbygoogle) {
      setIsAdLoaded(true);
    } else {
      // Load AdSense script if not already loaded
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      
      script.onload = () => {
        setIsAdLoaded(true);
      };
    }
  }, []);

  useEffect(() => {
    if (isAdLoaded && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [isAdLoaded]);

  return (
    <div className={`ad-banner ${className}`} style={style}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
      
      {/* Fallback content for when ads are not loaded */}
      {!isAdLoaded && (
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm">Advertisement</p>
          <p className="text-gray-400 text-xs mt-1">Ad will load here</p>
        </div>
      )}
    </div>
  );
};

export default AdBanner;
