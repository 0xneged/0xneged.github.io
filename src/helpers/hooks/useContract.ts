import { richRektContractData } from 'helpers/api/contract'
import calculateTimeout from 'helpers/time/calculateTimeout'
import type { EthAddressString } from 'types/Blockchain'
import { useReadContract } from 'wagmi'
import { base } from 'wagmi/chains'

export function usePlayer(address: string) {
  const { data: player, refetch } = useReadContract({
    ...richRektContractData,
    chainId: base.id,
    functionName: 'getPlayer',
    args: [address as EthAddressString],
  })

  const lastPlayed = Number(player?.[0]) * 1000

  return {
    timeout: calculateTimeout(lastPlayed),
    lastPlayed,
    points: player?.[1],
    referrer: player?.[2],
    refetchPlayer: refetch,
  }
}
