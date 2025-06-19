const oneHour = 60 * 60 * 1000

export default function calculateTimeout(lastPlayed: number, offset: number) {
  return lastPlayed + offset * oneHour
}
