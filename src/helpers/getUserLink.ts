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
