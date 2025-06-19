import { richRektContractData } from 'helpers/api/contract'
import calculateTimeout from 'helpers/time/calculateTimeout'
import { useEffect, useState } from 'react'
import type { EthAddressString } from 'types/Blockchain'
import { useReadContract } from 'wagmi'

export function usePlayer(address: string) {
  const [loading, setLoading] = useState(true)
  const {
    data: player,
    refetch,
    status,
  } = useReadContract({
    ...richRektContractData,
    functionName: 'getPlayer',
    args: [address as EthAddressString],
  })
  const { data, status: cooldownStatus } = useReadContract({
    ...richRektContractData,
    functionName: 'playCooldownHours',
  })
  const { data: hasPendingRequest } = useReadContract({
    ...richRektContractData,
    functionName: 'hasPendingRequest',
    args: [address as EthAddressString],
  })

  useEffect(() => {
    setLoading(status !== 'success' && cooldownStatus !== 'success')
  }, [cooldownStatus, status])

  const lastPlayed = player ? Number(player[0]) * 1000 : 0

  return {
    loading,
    setLoading,

    hasPendingRequest,
    endTime: loading ? null : calculateTimeout(lastPlayed, Number(data)),
    canPlay: loading
      ? false
      : calculateTimeout(lastPlayed, Number(data)) < Date.now(),
    lastPlayed,
    points: player?.[1],
    referrer: player?.[2],
    refetchPlayer: refetch,
  }
}
