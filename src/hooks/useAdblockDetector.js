import { useEffect, useState } from 'react'

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))

const runBaitTest = async () => {
  if (!isBrowser()) return false

  const bait = document.createElement('div')
  bait.className = 'adsbox ad-banner advertisement adsbygoogle'
  bait.style.cssText = 'width:1px;height:1px;position:absolute;left:-999px;top:-999px;'

  document.body.appendChild(bait)
  await wait(120)

  const hidden =
    !bait ||
    bait.offsetHeight === 0 ||
    bait.offsetParent === null ||
    bait.style.display === 'none' ||
    window.getComputedStyle(bait).display === 'none'

  bait.remove()
  return hidden
}

const runAdsScriptTest = () =>
  new Promise(resolve => {
    if (!isBrowser()) {
      resolve(false)
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

    let finished = false
    const cleanup = () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }

    const finalize = result => {
      if (finished) return
      finished = true
      cleanup()
      resolve(result)
    }

    script.onload = () => finalize(false)
    script.onerror = () => finalize(true)
    document.body.appendChild(script)

    setTimeout(() => {
      if (!finished) {
        const blocked = typeof window.adsbygoogle === 'undefined'
        finalize(blocked)
      }
    }, 1500)
  })

export const useAdblockDetector = ({ disabled = false } = {}) => {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({
    isLoading: !disabled,
    isDetected: false
  })

  useEffect(() => {
    if (disabled || !isBrowser()) {
      setState({ isLoading: false, isDetected: false })
      return
    }

    let cancelled = false

    const detect = async () => {
      setState(prev => ({ ...prev, isLoading: true }))

      try {
        const [baitResult, scriptResult] = await Promise.all([runBaitTest(), runAdsScriptTest()])
        if (!cancelled) {
          setState({
            isLoading: false,
            isDetected: Boolean(baitResult || scriptResult)
          })
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            isLoading: false,
            isDetected: false
          })
        }
      }
    }

    detect()

    return () => {
      cancelled = true
    }
  }, [attempt, disabled])

  return {
    ...state,
    retry: () => setAttempt(prev => prev + 1)
  }
}


