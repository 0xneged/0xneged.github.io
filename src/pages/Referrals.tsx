import { useQuery } from '@tanstack/react-query'
import ConnectButton from 'components/ConnectButton'
import DotsLoader from 'components/DotsLoad'
import ShareRefButton from 'components/ShareRefButton'
import UserList from 'components/UserList'
import { getRefs } from 'helpers/api/backend'
import env from 'helpers/env'
import fcLinkOpen from 'helpers/fcLinkOpen'
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
    <div className="flex w-full flex-col gap-y-2">
      {refUsers.length ? (
        <UserList list={refUsers.sort((a, b) => b.balance - a.balance)} />
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

      <a
        className="text-alt cursor-pointer justify-self-end text-center font-serif text-sm"
        onClick={() => fcLinkOpen({ address: env.VITE_CONTRACT_ADDRESS })}
      >
        CA:
        {env.VITE_CONTRACT_ADDRESS}
      </a>
    </div>
  )
}
