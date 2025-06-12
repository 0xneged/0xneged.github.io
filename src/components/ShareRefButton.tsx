import share from 'helpers/share'
import { useCallback } from 'react'

export default function ({ address }: { address: string }) {
  const shareRef = useCallback(async () => {
    const url = document.location.origin + '?ref=' + address
    await share(url)
  }, [address])

  return (
    <button
      onClick={shareRef}
      className="bg-accent-bright hover:bg-accent cursor-pointer rounded-full px-4 py-2 transition-colors"
    >
      Share ref
    </button>
  )
}
