import {
  signMessage,
  switchChain,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core'
import ConnectButton from 'components/ConnectButton'
import DotsLoader from 'components/DotsLoad'
import FeelingLuckyBlock from 'components/FeelingLuckyBlock'
import RoundButton from 'components/RoundButton'
import Timer from 'components/Timer'
import { settleGame } from 'helpers/api/backend'
import { richRektContractData } from 'helpers/api/contract'
import nullAddress from 'helpers/blockchain/nullAddress'
import { failConfetti, successConfetti } from 'helpers/confetti'
import handleError from 'helpers/handleError'
import useAnimatedLongPress from 'helpers/hooks/useAnimatedLongPress'
import { usePlayer } from 'helpers/hooks/useContract'
import { invalidateQuery, queryKeys } from 'helpers/queryClient'
import { config } from 'helpers/wagmiConnector'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { EthAddressString } from 'types/Blockchain'
import { useAccount, useReadContract } from 'wagmi'
import { base } from 'wagmi/chains'

function MainInner({
  address,
  refAddress,
}: {
  address: EthAddressString
  refAddress: string | null
}) {
  const [playing, setPlaying] = useState(false)
  const { endTime, refetchPlayer, loading, canPlay } = usePlayer(address)
  const { data: hasPendingRequest } = useReadContract({
    ...richRektContractData,
    chainId: base.id,
    functionName: 'hasPendingRequest',
    args: [address],
  })

  const handleGame = useCallback(async () => {
    try {
      setPlaying(true)
      await switchChain(config, { chainId: base.id })
      if (!hasPendingRequest) {
        const ref = refAddress ? refAddress : nullAddress

        const hash = await writeContract(config, {
          ...richRektContractData,
          chainId: base.id,
          functionName: 'requestPlay',
          args: [ref as EthAddressString],
        })
        await waitForTransactionReceipt(config, { hash })
      }
      const signature = await signMessage(config, {
        message: `Oh, random, may I be a winner`,
        account: address,
      })

      const {
        data: { reward },
      } = await settleGame({ address, signature })

      await refetchPlayer()
      setTimeout(() => invalidateQuery(queryKeys.leaderboard))

      if (reward < 100) {
        toast.warn(`REKT! Your reward is ${reward}`)
        await failConfetti()
      } else {
        toast.success(`RICH! Your reward is ${reward}`)
        await successConfetti()
      }
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to play :(' })
    } finally {
      setPlaying(false)
    }
  }, [address, hasPendingRequest, refAddress, refetchPlayer])

  const { longPressHandler, pressProgress } = useAnimatedLongPress({
    callback: handleGame,
    disabled: loading,
  })

  if (loading) return <DotsLoader />

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
          {playing ? (
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
        <FeelingLuckyBlock />
      </>
    )

  return (
    <>
      <RoundButton
        style={{
          filter: `drop-shadow(0 0.75rem rem 0 #1b1758)`,
          transform: `translateY(0.75rem) rotateX(25deg)`,
          opacity: 0.5,
        }}
      >
        <p>Wait</p>
      </RoundButton>

      <h2 className="text-alt text-center font-serif text-2xl font-semibold">
        Play again in {endTime ? <Timer endTime={endTime} /> : <DotsLoader />}
      </h2>
    </>
  )
}

export default function MainPage() {
  const { isConnected, address } = useAccount()
  const params = new URLSearchParams(window.location.search)
  const refAddress = params.get('ref')

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
        <MainInner address={address} refAddress={refAddress} />
      ) : (
        <>
          <ConnectButton />
          <FeelingLuckyBlock />
        </>
      )}
    </div>
  )
}
