import { useEffect, useRef } from 'react'

/**
 * Lightweight AdSense component that injects the required script (if needed)
 * and renders a single ad slot. Usage:
 *
 * <AdSenseAd adSlot="4370431362" />
 */
const AdSenseAd = ({
  adClient = 'ca-pub-1450069219301394',
  adSlot = '4370431362',
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = ''
}) => {
  const adRef = useRef(null)
  const scriptId = 'adsbygoogle-js'

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scriptAlreadyPresent = document.getElementById(scriptId)
    if (!scriptAlreadyPresent) {
      const script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }
  }, [adClient, scriptId])

  useEffect(() => {
    if (!adRef.current || typeof window === 'undefined') return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.warn('AdSenseAd: unable to load ad slot', error)
    }
  }, [adSlot, adClient, adFormat, fullWidthResponsive])

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      ></ins>
    </div>
  )
}

export default AdSenseAd

