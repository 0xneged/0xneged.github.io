export default function getUserLink({
  address,
  fcUsername,
}: {
  address: string
  fcUsername: string | undefined
}) {
  if (fcUsername) return `https://farcaster.xyz/${fcUsername}`
  return `https://basescan.org/address/${address}`
}

export function getShareFarcaster(address: string) {
  return encodeURI(
    `https://farcaster.xyz/~/compose?text=get Rich or get Rekt&embeds[]=https://0xneged.github.io?ref=${address}`
  )
}
