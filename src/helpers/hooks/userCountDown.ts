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

export function useCountDownEndTime({
  endTime,
  step = 1,
  format = 'HH:mm:ss',
}: {
  endTime: number
  step?: number
  format?: string
}) {
  const [time, setTime] = useState(endTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev ? prev - step : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [setTime, step])

  return { time, formatted: dayjs({ seconds: time }).format(format) }
}
