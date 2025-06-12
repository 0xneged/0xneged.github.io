import { useQuery } from '@tanstack/react-query'
import ConnectButton from 'components/ConnectButton'
import { getRefs } from 'helpers/api/backend'
import { EthAddressString } from 'types/Blockchain'
import { useAccount } from 'wagmi'

function ReferralsInner({ address }: { address: EthAddressString }) {
  const { data, status } = useQuery({
    queryKey: ['referrals', address],
    queryFn: () => getRefs({ address }),
  })

  if (status !== 'success') return <p>Loading...</p>

  return (
    <ul className="flex flex-col">
      {data.data.refUsers.map((user) => (
        <li key={user.address}>{user.fcUsername || user.address}</li>
      ))}
    </ul>
  )
}

export default function Referrals() {
  const { address } = useAccount()

  return (
    <div className="flex h-full w-full items-center justify-center">
      {address ? <ReferralsInner address={address} /> : <ConnectButton />}

      <button>Share ref</button>
    </div>
  )
}
