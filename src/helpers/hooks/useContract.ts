import { richRektContractData } from 'helpers/api/contract'
import calculateTimeout from 'helpers/time/calculateTimeout'
import { useEffect, useState } from 'react'
import type { EthAddressString } from 'types/Blockchain'
import { useReadContract } from 'wagmi'
import { base } from 'wagmi/chains'

export function usePlayer(address: string) {
  const [loading, setLoading] = useState(true)
  const {
    data: player,
    refetch,
    status,
  } = useReadContract({
    ...richRektContractData,
    chainId: base.id,
    functionName: 'getPlayer',
    args: [address as EthAddressString],
  })

  useEffect(() => {
    setLoading(status !== 'success')
  }, [status])

  const lastPlayed = player ? Number(player[0]) * 1000 : 0

  return {
    loading,
    setLoading,

    endTime: loading ? null : calculateTimeout(lastPlayed),
    canPlay: loading ? false : calculateTimeout(lastPlayed) < Date.now(),
    lastPlayed,
    points: player?.[1],
    referrer: player?.[2],
    refetchPlayer: refetch,
  }
}
