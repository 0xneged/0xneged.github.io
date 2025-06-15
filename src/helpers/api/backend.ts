import env from 'helpers/env'
import axios from 'redaxios'
import { EthAddressString } from 'types/Blockchain'
import User from 'types/User'

const backend = axios.create({ baseURL: env.VITE_BACKEND_URL })

export function settleGame(body: { address: string; signature: string }) {
  return backend.post<{ reward: number }>('/game/settle', body)
}

type LeaderboardUser = User & {
  position?: number // only for current user, others are sorted
}

export function getLeaderboard(params: {
  address: EthAddressString | undefined
}) {
  return backend.get<{ top: LeaderboardUser[]; user: LeaderboardUser | null }>(
    '/game/leaderboard',
    { params }
  )
}

export function getRefs(params: { address: EthAddressString }) {
  return backend.get<{ refUsers: User[] }>('/game/refs', { params })
}

export function setNotifications({
  token,
  url,
  address,
}: {
  token: string
  url: string
  address: string
}) {
  return backend.post('/user/set-notifications', {
    token,
    url,
    address,
  })
}
