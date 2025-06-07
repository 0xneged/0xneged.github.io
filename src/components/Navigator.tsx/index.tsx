import { useAutoAnimate } from '@formkit/auto-animate/react'
import RouteCard from './RouteCard'
import House from 'assets/icons/House'
import Trophy from 'assets/icons/Trophy'

const routes = [
  {
    href: '/',
    text: 'Main',
    icon: <House />,
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
