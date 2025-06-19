import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const queryKeys = {
  leaderboard: (address: string) => ['leaderboard', address],
}

export function invalidateQuery(key: string[]) {
  return queryClient.invalidateQueries({
    queryKey: key,
  })
}

export default queryClient
