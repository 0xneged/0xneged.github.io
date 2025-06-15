import { bool, cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_APP_URL: str({
    default: 'https://farcaster.xyz/miniapps/GssDfbsn-NXF/rich-or-rekt',
  }),
  VITE_BACKEND_URL: str(),
  VITE_CONTRACT_ADDRESS: str(),
  DEV: bool({ default: import.meta.env.DEV }),
})
