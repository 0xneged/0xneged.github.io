import { getShareFarcaster } from 'helpers/getUserLink'

export default function ({ address }: { address: string }) {
  return (
    <a
      href={getShareFarcaster(address)}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-accent-bright hover:bg-accent cursor-pointer rounded-full px-4 py-2 transition-colors"
    >
      Share ref
    </a>
  )
}
