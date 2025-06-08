import { cn } from 'helpers/cn'
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
          isActive ? 'flex-3' : 'flex-1',
          isActive ? 'text-alt bg-accent-bright' : 'text-accent-pale',
          'flex h-20 w-full items-center justify-center gap-1 rounded-t-md p-2 transition-all'
        )
      }
      title={text}
      viewTransition
    >
      <span>{icon}</span>
    </NavLink>
  )
}
