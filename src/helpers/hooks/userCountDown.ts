import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function useCountDown(initialDiff = 0, step = 1) {
  const [time, setTime] = useState(initialDiff)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])

  return { time, setTime }
}

const calcDiff = (endTime: number) =>
  Math.max(0, Math.floor((endTime - Date.now()) / 1000))

export function useCountDownEndTime({
  endTime,
  format = 'HH:mm:ss',
}: {
  endTime: number
  format?: string
}) {
  const [remaining, setRemaining] = useState<number>(calcDiff(endTime))

  useEffect(() => {
    const updateRemaining = () => {
      setRemaining(calcDiff(endTime))
    }

    updateRemaining()

    const interval = setInterval(updateRemaining, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [endTime])

  return {
    remaining,
    formatted: dayjs(remaining * 1000).format(format),
  }
}
