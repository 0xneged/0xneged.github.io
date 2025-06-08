import { useAutoAnimate } from '@formkit/auto-animate/react'
import House from 'assets/icons/House'
import Referral from 'assets/icons/Referral'
import Trophy from 'assets/icons/Trophy'
import RouteCard from './RouteCard'

const routes = [
  {
    href: '/',
    text: 'Main',
    icon: <House />,
  },
  {
    href: '/refs',
    text: 'Referrals',
    icon: <Referral />,
  },
  {
    href: '/leaderboard',
    text: 'Leaderboard',
    icon: <Trophy />,
  },
]

export default function Navigator() {
  const [parent] = useAutoAnimate()

  return (
    <nav className="flex h-16 w-full flex-row items-center" ref={parent}>
      {routes.map((props) => (
        <RouteCard key={props.text + props.href} {...props} />
      ))}
    </nav>
  )
}
