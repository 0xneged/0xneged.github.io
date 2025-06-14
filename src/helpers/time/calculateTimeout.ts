const oneDay = 1000 * 60 * 60 * 24

export default function calculateTimeout(lastPlayed: number) {
  return lastPlayed + oneDay
}
