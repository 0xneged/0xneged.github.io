import { useCountDownEndTime } from 'helpers/hooks/userCountDown'
import { ClassNameProp } from 'types/Props'

export default function ({
  endTime,
  format = 'HH:mm:ss',
  className,
}: {
  endTime: number
  step?: number
  format?: string
} & ClassNameProp) {
  const { formatted } = useCountDownEndTime({ endTime, format })

  return (
    <div
      className={`font-accent rounded-3xl px-3 py-2 text-sm font-semibold opacity-50 ${className}`}
    >
      <span className="flex flex-col items-center">{formatted}</span>
    </div>
  )
}
