import { cn } from 'helpers/cn'
import fcLinkOpen from 'helpers/fcLinkOpen'
import roundNumber from 'helpers/roundNumber'
import truncate from 'helpers/truncate'
import { ClassName } from 'types/Props'
import User from 'types/User'

export default function UserList({
  list,
  currentClassName,
}: {
  list: User[]
  currentClassName?: (index: number) => ClassName
}) {
  return (
    <ul className="w-full overflow-y-scroll text-lg text-white">
      {list.map((user, index) => (
        <li
          key={user.addresses[0] + index}
          className={cn('px-4', currentClassName?.(index))}
        >
          <span className="inline-flex w-full items-center justify-between gap-2">
            <span>#{index}</span>
            <a
              onClick={() =>
                void fcLinkOpen({ address: user.addresses[0], fid: user.fid })
              }
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-40 cursor-pointer"
            >
              {truncate({ fullString: user.fcUsername || user.addresses[0] })}
            </a>
            <span>{roundNumber(user.balance)} $RR</span>
          </span>
        </li>
      ))}
      <li className="h-28 w-full" />
    </ul>
  )
}
