import TransitionWrapper from 'components/TransitionWrapper'
import { useAccount, useConnect } from 'wagmi'

function ConnectMenu() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()

  if (isConnected) {
    return (
      <>
        <div>You're connected!</div>
        <div>Address: {address}</div>
      </>
    )
  }

  return (
    <button
      type="button"
      onMouseOver={() => {
        connect({ connector: connectors[0] })
      }}
      className="cursor-pointer"
    >
      Connect
    </button>
  )
}

export default function MainPage() {
  return (
    <TransitionWrapper className="overflow-auto">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 overflow-y-auto pb-4 md:py-8">
        <ConnectMenu />
      </div>
    </TransitionWrapper>
  )
}
