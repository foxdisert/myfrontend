import { useEffect } from 'react'
import { ShieldAlert, RefreshCcw, Crown } from 'lucide-react'
import { useAdblockDetector } from '../hooks/useAdblockDetector'

const getIsPremiumUser = () => {
  if (typeof window === 'undefined') return false
  if (window.isPremiumUser === true) return true
  return Boolean(localStorage.getItem('mydntk-premium'))
}

const AntiAdblockOverlay = () => {
  const isPremium = getIsPremiumUser()
  const isDisabled =
    typeof window !== 'undefined' && (window.__disableAntiAdblock === true || isPremium)

  const { isDetected, isLoading, retry } = useAdblockDetector({ disabled: isDisabled })

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (isDetected && !isLoading) {
      document.body.classList.add('adblock-detected', 'overflow-hidden')
    } else {
      document.body.classList.remove('adblock-detected', 'overflow-hidden')
    }

    return () => {
      document.body.classList.remove('adblock-detected', 'overflow-hidden')
    }
  }, [isDetected, isLoading])

  if (isDisabled || isLoading || !isDetected) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/90 backdrop-blur">
      <div className="mx-4 w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ad Blocker Detected</h2>
          <p className="mt-2 text-base text-gray-600">
            Ads keep MYDNTK&apos;s domain tools free for everyone. Please disable your ad blocker or
            whitelist our site to continue.
          </p>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={retry}
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            I disabled my ad blocker
          </button>
          <a
            href="/register"
            className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            <Crown className="mr-2 h-5 w-5 text-yellow-500" />
            Upgrade to Premium (No Ads)
          </a>
        </div>
        <p className="text-xs text-gray-500">
          Need help?{' '}
          <a href="/guides" className="font-semibold text-blue-600 hover:underline">
            View whitelisting instructions
          </a>
        </p>
      </div>
    </div>
  )
}

export default AntiAdblockOverlay


