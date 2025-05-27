import { useAutoAnimate } from '@formkit/auto-animate/react'
import RouteCard from './RouteCard'

const routes = [
  {
    href: '/',
    text: 'Main',
  },
  {
    href: '/leaderboard',
    text: 'Leaderboard',
  },
]

export default function Navigator() {
  const [parent] = useAutoAnimate()

  return (
    <nav
      className="flex h-32 w-full flex-row items-center border-t-2 sm:h-full"
      ref={parent}
    >
      {routes.map((props) => (
        <RouteCard key={props.text + props.href} {...props} />
      ))}
    </nav>
  )
}
