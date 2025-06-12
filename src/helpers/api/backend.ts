import env from 'helpers/env'
import axios from 'redaxios'
import { EthAddressString } from 'types/Blockchain'

const backend = axios.create({ baseURL: env.VITE_BACKEND_URL })

export function settleGame(body: { address: string; signature: string }) {
  return backend.post<{ reward: number }>('/game/settle', body)
}

type LeaderboardUser = {
  position?: number // only for current user, others are sorted
  balance: number
  fcUsername: string | undefined
  fcPfpLink: string | undefined
  address: string
}

export function getLeaderboard(params: {
  address: EthAddressString | undefined
}) {
  return backend.get<{ top: LeaderboardUser[]; user: LeaderboardUser | null }>(
    '/game/leaderboard',
    { params }
  )
}
