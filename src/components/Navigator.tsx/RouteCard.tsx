import { cn } from 'helpers/cn'
import { NavLink } from 'react-router'

export default function RouteCard({
  href,
  text,
}: {
  href: string
  text: string
  icon?: string
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          isActive ? 'bg-black text-white' : '',
          isActive ? 'flex-3' : 'flex-1',
          'active:bg-accent dark:border-white-pale flex h-32 w-full flex-col items-center justify-center gap-1 border-r-2 border-black p-2 transition-all sm:h-auto sm:border-r-0 sm:border-b-2'
        )
      }
      viewTransition
    >
      <span className="-rotate-45">
        <span>{text}</span>
      </span>
    </NavLink>
  )
}
