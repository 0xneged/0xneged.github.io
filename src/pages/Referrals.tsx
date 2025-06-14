import { useQuery } from '@tanstack/react-query'
import ConnectButton from 'components/ConnectButton'
import DotsLoader from 'components/DotsLoad'
import ShareRefButton from 'components/ShareRefButton'
import { getRefs } from 'helpers/api/backend'
import getUserLink from 'helpers/fcLinkOpen'
import { EthAddressString } from 'types/Blockchain'
import { useAccount } from 'wagmi'

function ReferralsInner({ address }: { address: EthAddressString }) {
  const { data, status } = useQuery({
    queryKey: ['referrals', address],
    queryFn: () => getRefs({ address }),
  })

  if (status !== 'success')
    return (
      <p className="text-accent-bright font-serif text-3xl">
        Loading referrals
        <DotsLoader />
      </p>
    )

  const refUsers = data.data.refUsers

  return (
    <div className="flex flex-col gap-y-2">
      {refUsers.length ? (
        <ul className="flex flex-col overflow-y-scroll">
          {refUsers.map((user) => (
            <li key={user.address}>
              <a
                href={getUserLink({
                  address: user.address,
                  fcUsername: user.fcUsername,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate"
              >
                {user.fcUsername || user.address}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center font-serif">No refs yet!</p>
      )}

      <ShareRefButton address={address} />
    </div>
  )
}

export default function Referrals() {
  const { address } = useAccount()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 overflow-y-auto">
      {address ? <ReferralsInner address={address} /> : <ConnectButton />}
    </div>
  )
}
