import { bool, cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_BACKEND_URL: str(),
  VITE_CONTRACT_ADDRESS: str(),
  DEV: bool({ default: import.meta.env.DEV }),
})
