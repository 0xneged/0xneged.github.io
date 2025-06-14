import { sdk } from '@farcaster/frame-sdk'

const { viewProfile, openUrl, composeCast } = sdk.actions

export default function fcLinkOpen({
  address,
  fid,
}: {
  address: string
  fid: number | undefined
}) {
  if (fid) return viewProfile({ fid })
  return openUrl(`https://basescan.org/address/${address}`)
}

export function sharePost(address: string) {
  void composeCast({
    text: 'get Rich or get Rekt',
    embeds: [`https://0xneged.github.io/${address}`],
  })
}
