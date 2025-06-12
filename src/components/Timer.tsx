import dayjs from 'dayjs'
import useCountDown from 'helpers/hooks/userCountDown'
import { formatDuration } from 'helpers/time/time'
import { useEffect, useState } from 'react'
import { ClassNameProp } from 'types/Props'
import DotsLoader from './DotsLoad'

export default function ({
  diffTime,
  step,
  format = 'HH:mm:ss',
  className,
}: {
  diffTime: number
  step?: number
  format?: string
} & ClassNameProp) {
  const [time, setTime] = useState(0)
  useCountDown(setTime, step)

  useEffect(() => {
    if (diffTime === undefined || time !== 0) return

    const now = dayjs().valueOf()
    const difference = Math.abs(diffTime - now) / 1000
    setTime(Math.ceil(difference))
  }, [time, diffTime])

  return (
    <div
      className={`font-accent rounded-3xl px-3 py-2 text-sm font-semibold opacity-50 ${className}`}
    >
      <span className="flex flex-col items-center">
        {diffTime ? formatDuration(time, format) : <DotsLoader />}
      </span>
    </div>
  )
}
