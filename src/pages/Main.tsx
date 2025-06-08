import RoundButton from 'components/RoundButton'
import { useLongPress } from 'use-long-press'
import { useAccount, useConnect } from 'wagmi'

export default function MainPage() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const longPressHandler = useLongPress(() => {
    console.log('long press')
  })

  return (
    <div className="flex h-full w-full flex-col items-center justify-between overflow-y-auto pb-4 md:py-8">
      <h1
        className="text-accent text-center font-serif text-6xl"
        style={{
          WebkitTextStrokeWidth: '1.5px',
          WebkitTextStrokeColor: 'var(--color-accent-bright)',
        }}
      >
        <p>RICH</p>
        <p className="text-3xl">OR</p>
        <p>REKT</p>
      </h1>
      {isConnected ? (
        <RoundButton
          {...longPressHandler()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <p>HOLD</p>
          <p>ME</p>
        </RoundButton>
      ) : (
        <RoundButton onClick={() => connect({ connector: connectors[0] })}>
          Connect
        </RoundButton>
      )}
      <h2 className="text-alt text-center font-serif text-2xl">
        <p>Feelin' lucky</p>
        <p>today?</p>
      </h2>
    </div>
  )
}
