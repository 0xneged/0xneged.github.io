import { sdk } from '@farcaster/frame-sdk'
import env from './env'

const { viewProfile, openUrl, composeCast } = sdk.actions

export default function fcLinkOpen({
  address,
  fid,
}: {
  address: string
  fid?: number | undefined
}) {
  if (fid) return viewProfile({ fid })
  return openUrl(`https://basescan.org/address/${address}`)
}

export function sharePost(address: string, text = 'get Rich or get Rekt') {
  console.table({ toShare: `${env.VITE_APP_URL}/main?ref=${address}` })
  void composeCast({
    text,
    embeds: [encodeURI(`${env.VITE_APP_URL}/main?ref=${address}`)],
  })
}
