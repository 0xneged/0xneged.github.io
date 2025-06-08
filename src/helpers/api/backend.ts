import env from 'helpers/env'
import axios from 'redaxios'

const backend = axios.create({ baseURL: env.VITE_BACKEND_URL })

export function settleGame(body: { address: string; signature: string }) {
  return backend.post('/game/settle', body)
}

export function getLeaderboard(body: { address: string }) {
  return backend.get('/leaderboard', { params: body })
}
