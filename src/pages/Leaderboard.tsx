import { useQuery } from '@tanstack/react-query'
import ConnectButton from 'components/ConnectButton'
import DotsLoader from 'components/DotsLoad'
import UserList from 'components/UserList'
import { getLeaderboard } from 'helpers/api/backend'
import { queryKeys } from 'helpers/queryClient'
import { EthAddressString } from 'types/Blockchain'
import { useAccount } from 'wagmi'

function LeaderboardInner({ address }: { address: EthAddressString }) {
  const { status, data } = useQuery({
    queryKey: queryKeys.leaderboard(address),
    queryFn: () => getLeaderboard({ address }),
  })

  if (status !== 'success')
    return (
      <p className="text-accent-bright font-serif text-3xl">
        Loading leaderboard
        <DotsLoader />
      </p>
    )

  const lb = data.data

  return (
    <ul className="relative flex h-full w-full flex-col overflow-y-auto">
      <li className="bg-accent-pale text-alt flex items-center justify-between gap-2 p-2 font-serif">
        <span className="font-serif font-bold">Leaderboard</span>
        <span className="inline-flex gap-x-8">
          <span>Balance: {lb.user?.balance} $RR</span>
          <span>Position: #{Number(lb.user?.position) + 1}</span>
        </span>
      </li>
      <UserList
        list={lb.top}
        currentClassName={(index) =>
          index === lb.user?.position ? 'bg-accent-pale text-alt' : ''
        }
      />
    </ul>
  )
}

export default function Leaderboard() {
  const { address } = useAccount()

  return (
    <div className="flex h-full w-full items-center justify-center overflow-y-auto">
      {address ? <LeaderboardInner address={address} /> : <ConnectButton />}
    </div>
  )
}
