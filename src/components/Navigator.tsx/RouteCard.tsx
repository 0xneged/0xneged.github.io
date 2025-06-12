import { cn } from 'helpers/cn'
import hapticFeedback from 'helpers/haptic'
import { NavLink } from 'react-router'
import { JSX } from 'react/jsx-runtime'

export default function RouteCard({
  href,
  text,
  icon,
}: {
  href: string
  text: string
  icon?: JSX.Element
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          isActive ? 'text-alt' : 'text-accent',
          'flex h-20 w-full items-center justify-center gap-1 rounded-t-md p-2 transition-all hover:text-white'
        )
      }
      onClick={hapticFeedback}
      title={text}
      viewTransition
    >
      <span>{icon}</span>
    </NavLink>
  )
}
