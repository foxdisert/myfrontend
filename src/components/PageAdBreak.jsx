import AdSenseAd from './AdSenseAd'

const variantStyles = {
  light: 'bg-white',
  subtle: 'bg-gray-50',
  muted: 'bg-gray-100',
  contrast: 'bg-gray-900/5',
  transparent: 'bg-transparent',
  dark: 'bg-slate-900/40'
}

/**
 * Shared wrapper for inline AdSense placements so every page can
 * drop in a consistently styled ad block without repeating markup.
 */
const PageAdBreak = ({
  variant = 'light',
  containerWidth = 'max-w-6xl',
  className = '',
  adClassName = 'max-w-full',
  ...adProps
}) => {
  const backgroundClass = variantStyles[variant] || variantStyles.light
  const { className: adsenseClassName, ...restAdProps } = adProps

  return (
    <section className={`py-6 ${backgroundClass} ${className}`.trim()}>
      <div className={`${containerWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
        <AdSenseAd
          {...restAdProps}
          className={`w-full mx-auto ${adClassName} ${adsenseClassName || ''}`.trim()}
        />
      </div>
    </section>
  )
}

export default PageAdBreak


