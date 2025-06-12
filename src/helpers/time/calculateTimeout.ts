export default function calculateTimeout(lastPlayed: number) {
  const oneDay = 1000 * 60 * 60 * 24
  return Number(lastPlayed) + oneDay
}
