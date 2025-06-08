import { richRektContractData } from 'helpers/api/contract'
import { EthAddressString } from 'types/Blockchain'
import { useReadContract } from 'wagmi'

export function usePlayer(address: string) {
  const { data: player } = useReadContract({
    ...richRektContractData,
    functionName: 'getPlayer',
    args: [address as EthAddressString],
  })

  return {
    lastPlayed: Number(player?.[0]) * 1000,
    points: player?.[1],
    referrer: player?.[2],
  }
}
