const API_BASE = ''

/**
 * Shorten a URL
 * POST /shorten  { url, expired_at }
 */
export async function shortenUrl(url, expiredAt) {
  const body = { url }
  if (expiredAt) body.expired_at = expiredAt // ISO 8601 string

  const res = await fetch(`${API_BASE}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `Server error: ${res.status}`)

  const code = data.short_code
  const shortUrl = `http://localhost:8080/${code}`

  return {
    short_code: code,
    shortUrl,
    short_url: shortUrl,
    expires_at: data.expires_at,
  }
}

/**
 * Fetch analytics
 * GET /analytics/:code
 */
export async function fetchAnalytics(code) {
  const res = await fetch(`${API_BASE}/analytics/${code}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `Not found (${res.status})`)

  return {
    short_code: code,
    short_url: `http://localhost:8080/${code}`,
    original_url: data.original_url,
    click_count: data.click_count ?? 0,
    created_at: data.created_at ?? null,
    expires_at: data.expires_at ?? null,
  }
}