export const sanitizeUrl = (url) => {
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

export const parseWatchParams = (searchParams) => {
  if (!searchParams) {
    return {
      videoUrl: '',
      homeUrl: '/',
      animeTitle: '',
      episodeNumber: '',
      seasonNumber: '',
      serverLabel: ''
    }
  }

  const entries =
    typeof searchParams.get === 'function'
      ? Array.from(searchParams.entries())
      : Object.entries(searchParams)

  const params = Object.fromEntries(entries)
  const videoUrl = sanitizeUrl(params.video_url)

  return {
    videoUrl,
    homeUrl: sanitizeUrl(params.home) || '/',
    animeTitle: params.title || params.anime || '',
    episodeNumber: params.episode || '',
    seasonNumber: params.season || '',
    serverLabel: params.server || params.server_label || ''
  }
}

export const isReloadNavigation = () => {
  const navEntries =
    typeof performance.getEntriesByType === 'function'
      ? performance.getEntriesByType('navigation')
      : []
  const navigation = navEntries.length ? navEntries[0] : null
  const legacyReload =
    typeof performance.navigation !== 'undefined' &&
    performance.navigation.type === 1

  return (navigation && navigation.type === 'reload') || legacyReload
}

