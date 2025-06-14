import { sharePost } from 'helpers/fcLinkOpen'

export default function ({ address }: { address: string }) {
  return (
    <a
      onClick={() => void sharePost(address)}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-accent-bright hover:bg-accent mx-2 cursor-pointer rounded-full px-4 py-2 text-center transition-colors"
    >
      Share ref
    </a>
  )
}
