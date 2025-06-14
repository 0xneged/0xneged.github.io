import RoundButton from 'components/RoundButton'
import env from 'helpers/env'

export default function WebPromo() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <a href={env.VITE_APP_ADDRESS}>
        <RoundButton>Open in farcaster</RoundButton>
      </a>
    </div>
  )
}
