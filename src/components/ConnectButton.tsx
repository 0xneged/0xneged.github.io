import { useConnect } from 'wagmi'
import RoundButton from './RoundButton'

export default function ConnectButton() {
  const { connect, connectors } = useConnect()

  return (
    <RoundButton onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </RoundButton>
  )
}
