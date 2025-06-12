import { signMessage, switchChain, writeContract } from '@wagmi/core'
import ConnectButton from 'components/ConnectButton'
import RoundButton from 'components/RoundButton'
import Timer from 'components/Timer'
import { settleGame } from 'helpers/api/backend'
import { richRektContractData } from 'helpers/api/contract'
import handleError from 'helpers/handleError'
import useAnimatedLongPress from 'helpers/hooks/useAnimatedLongPress'
import { usePlayer } from 'helpers/hooks/useContract'
import { config } from 'helpers/wagmiConnector'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { EthAddressString } from 'types/Blockchain'
import { useAccount, useReadContract } from 'wagmi'
import { base } from 'wagmi/chains'

function MainInner({ address }: { address: EthAddressString }) {
  const [loading, setLoading] = useState(false)
  const { timeout } = usePlayer(address)
  const canPlay = timeout < 0

  const { data: hasPendingRequest } = useReadContract({
    ...richRektContractData,
    chainId: base.id,
    functionName: 'hasPendingRequest',
    args: [address as EthAddressString],
  })

  const handleGame = useCallback(async () => {
    if (!canPlay) return
    try {
      setLoading(true)
      await switchChain(config, { chainId: base.id })
      if (!hasPendingRequest) {
        await writeContract(config, {
          chainId: base.id,
          ...richRektContractData,
          functionName: 'requestPlay',
          args: [address as EthAddressString],
        })
      }
      const signature = await signMessage(config, {
        message: `Oh, random, may I be a winner`,
        account: address,
      })

      const {
        data: { reward },
      } = await settleGame({ address, signature })

      // TODO: invalidate queries or save proper states
      toast.success(`Nice, your reward is ${reward}`)
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to play :(' })
    } finally {
      setLoading(false)
    }
  }, [address, canPlay, hasPendingRequest])

  const { longPressHandler, pressProgress } = useAnimatedLongPress({
    callback: handleGame,
    disabled: loading || !canPlay,
  })

  if (canPlay)
    return (
      <>
        <RoundButton
          {...longPressHandler()}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            filter: `drop-shadow(0 ${0.75 * (1 - pressProgress)}rem 0 #1b1758)`,
            transform: `translateY(${pressProgress * 0.75}rem) rotateX(25deg)`,
          }}
        >
          {loading ? (
            <p>Playing...</p>
          ) : hasPendingRequest ? (
            <p>Hold again</p>
          ) : (
            <>
              <p>HOLD</p>
              <p>ME</p>
            </>
          )}
        </RoundButton>
        <h2 className="text-alt text-center font-serif text-2xl">
          <p>Feelin' lucky</p>
          <p>today?</p>
        </h2>
      </>
    )

  return (
    <h2 className="text-alt text-center font-serif text-2xl font-semibold">
      Play again in <Timer diffTime={timeout} />
    </h2>
  )
}

export default function MainPage() {
  const { isConnected, address } = useAccount()

  return (
    <div className="mb-32 flex h-full w-full flex-col items-center justify-between overflow-y-auto py-4">
      <h1
        className="text-accent text-center font-serif text-5xl"
        style={{
          WebkitTextStrokeWidth: '1.5px',
          WebkitTextStrokeColor: 'var(--color-accent-bright)',
        }}
      >
        <p>RICH</p>
        <p className="text-2xl">OR</p>
        <p>REKT</p>
      </h1>
      {isConnected && address ? (
        <MainInner address={address} />
      ) : (
        <ConnectButton />
      )}
    </div>
  )
}
