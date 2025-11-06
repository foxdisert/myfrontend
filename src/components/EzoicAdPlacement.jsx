import { useEffect } from 'react';

/**
 * Ezoic Ad Placement Component
 * 
 * Usage:
 * <EzoicAdPlacement placementId={101} />
 * 
 * For multiple placements on the same page:
 * <EzoicAdPlacement placementIds={[101, 102, 103]} />
 * 
 * @param {number|number[]} placementId - Single placement ID or array of placement IDs
 * @param {number[]} placementIds - Alternative prop name for multiple placements
 * @param {string} className - Additional CSS classes for the container
 */
const EzoicAdPlacement = ({ 
  placementId, 
  placementIds, 
  className = '' 
}) => {
  useEffect(() => {
    // Ensure ezstandalone is available
    if (typeof window !== 'undefined' && window.ezstandalone && window.ezstandalone.cmd) {
      // Determine which placement IDs to use
      const ids = placementIds || (placementId ? [placementId] : []);
      
      if (ids.length > 0) {
        // Call showAds with all placement IDs (more efficient than multiple calls)
        window.ezstandalone.cmd.push(function() {
          window.ezstandalone.showAds(...ids);
        });
      }
    }
  }, [placementId, placementIds]);

  // Determine which placement IDs to render
  const ids = placementIds || (placementId ? [placementId] : []);
  
  if (ids.length === 0) {
    console.warn('EzoicAdPlacement: No placement ID provided');
    return null;
  }

  return (
    <>
      {ids.map((id) => (
        <div 
          key={id}
          id={`ezoic-pub-ad-placeholder-${id}`}
          className={className}
        />
      ))}
    </>
  );
};

export default EzoicAdPlacement;

