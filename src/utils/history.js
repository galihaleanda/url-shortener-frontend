const KEY = 'snip_history'
const MAX = 10

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function addToHistory(item) {
  const history = getHistory().filter(x => x.code !== item.code)
  history.unshift(item)
  localStorage.setItem(KEY, JSON.stringify(history.slice(0, MAX)))
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}
