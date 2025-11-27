const WatchPlayerSection = ({ data }) => {
  if (!data?.videoUrl) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
                Premium episode player
              </p>
              <h2 className="text-2xl font-semibold">
                {data.animeTitle || 'Now Playing'}
              </h2>
              <p className="text-sm text-slate-400">
                Refreshing this page will return you to 7Anime.
              </p>
            </div>
            <a
              href={data.homeUrl || '/'}
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-slate-400 transition"
            >
              ← Back to 7Anime
            </a>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-black relative overflow-hidden">
            <div className="pb-[56.25%] w-full relative">
              <iframe
                src={data.videoUrl}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 h-full w-full border-0"
                title={data.animeTitle || 'Episode player'}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            {data.episodeNumber && (
              <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1">
                Episode {data.episodeNumber}
              </span>
            )}
            {data.seasonNumber && (
              <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1">
                Season {data.seasonNumber}
              </span>
            )}
            {data.serverLabel && (
              <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1">
                Server: {data.serverLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WatchPlayerSection

