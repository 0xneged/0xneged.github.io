import { useQuery } from '@tanstack/react-query'
import ConnectButton from 'components/ConnectButton'
import DotsLoader from 'components/DotsLoad'
import { getLeaderboard } from 'helpers/api/backend'
import { cn } from 'helpers/cn'
import getUserLink from 'helpers/getUserLink'
import roundNumber from 'helpers/roundNumber'
import { EthAddressString } from 'types/Blockchain'
import { useAccount } from 'wagmi'

function LeaderboardInner({ address }: { address: EthAddressString }) {
  const { status, data } = useQuery({
    queryKey: ['leaderboard', address],
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
      <div className="overflow-y-scroll text-lg text-white">
        {lb.top.map((user, index) => (
          <li
            key={user.address + index}
            className={cn(
              'px-4',
              index + 1 === lb.user?.position ? 'bg-accent-pale text-alt' : ''
            )}
          >
            <span className="inline-flex w-full items-center justify-between gap-2">
              <span>#{index + 1}</span>
              <a
                href={getUserLink({
                  address: user.address,
                  fcUsername: user.fcUsername,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-40 truncate"
              >
                {user.fcUsername || user.address}
              </a>
              <span>{roundNumber(user.balance)} $RR</span>
            </span>
          </li>
        ))}
        <li className="h-28 w-full" />
      </div>
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
