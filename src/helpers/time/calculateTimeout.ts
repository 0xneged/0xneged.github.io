const oneDay = 1000 * 60 * 60 * 24

export default function calculateTimeout(lastPlayed: number) {
  const ms = lastPlayed + oneDay - Date.now()
  const seconds = Math.abs(Math.round(ms / 1000))
  return seconds
}
