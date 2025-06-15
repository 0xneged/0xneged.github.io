import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const queryKeys = {
  leaderboard: ['leaderboard'],
}

export function invalidateQuery(key: string[]) {
  return queryClient.invalidateQueries({
    queryKey: key,
  })
}

export default queryClient
