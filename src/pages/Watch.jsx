import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const sanitizeUrl = (url) => {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
  } catch (error) {
    return ''
  }
  return ''
}

const Watch = () => {
  const [searchParams] = useSearchParams()

  const data = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries())
    const videoUrl = sanitizeUrl(params.video_url)
    return {
      videoUrl,
      homeUrl: sanitizeUrl(params.home) || '/',
      animeTitle: params.title || params.anime || '',
      episodeNumber: params.episode || '',
      seasonNumber: params.season || '',
      serverLabel: params.server || params.server_label || '',
    }
  }, [searchParams])

  useEffect(() => {
    const navEntries = typeof performance.getEntriesByType === 'function'
      ? performance.getEntriesByType('navigation')
      : []
    const navigation = navEntries.length ? navEntries[0] : null
    const legacyReload = typeof performance.navigation !== 'undefined'
      && performance.navigation.type === 1
    const isReload = (navigation && navigation.type === 'reload') || legacyReload

    if (isReload && data.homeUrl) {
      window.location.replace(data.homeUrl)
    }
  }, [data.homeUrl])

  if (!data.videoUrl) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <div className="text-4xl">⚠️</div>
          <h1 className="text-2xl font-semibold">Invalid Watch Link</h1>
          <p className="text-slate-400">
            We couldn&apos;t find a valid video link. Please return to the main site and try launching the episode again.
          </p>
          <a
            href={data.homeUrl || '/'}
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-400 transition"
          >
            Back to 7Anime
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900/70 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <a href={data.homeUrl} className="text-xl font-semibold text-sky-300 tracking-tight">
            🌐 Domain Toolkit
          </a>
          <a
            href={data.homeUrl}
            className="text-slate-300 hover:text-white transition inline-flex items-center gap-2"
          >
            ← Back to 7Anime
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="rounded-2xl border border-sky-900/60 bg-sky-900/10 p-4 text-sm text-slate-200 flex gap-3">
          <span className="text-sky-300 text-lg">⚠️</span>
          <p>
            Refreshing this page will take you back to the homepage. Use the 7Anime episode list to pick another server if needed.
          </p>
        </div>

        <section className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="relative w-full pb-[56.25%] bg-black">
            <iframe
              src={data.videoUrl}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0 h-full w-full border-none"
              title={data.animeTitle || 'Episode player'}
            />
          </div>
        </section>

        {(data.animeTitle || data.episodeNumber || data.seasonNumber || data.serverLabel) && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            {data.animeTitle && (
              <h1 className="text-2xl font-semibold text-white">
                {data.animeTitle}
              </h1>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              {data.episodeNumber && (
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  Episode {data.episodeNumber}
                </span>
              )}
              {data.seasonNumber && (
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  Season {data.seasonNumber}
                </span>
              )}
              {data.serverLabel && (
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  Server: {data.serverLabel}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm">
              You&apos;re watching this episode through our dedicated player on Domain Toolkit. Close this tab to return
              to 7Anime or choose another server.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default Watch

