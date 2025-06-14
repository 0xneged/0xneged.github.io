import { QueryClient } from '@tanstack/react-query'

export const queryKeys = {
  leaderboard: (address: string) => ['leaderboard', address],
}

export function invalidateQuery(key: string[]) {
  return new QueryClient().invalidateQueries({
    queryKey: key,
  })
}

export default new QueryClient()
