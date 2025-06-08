import { useEffect, useRef, useState } from 'react'
import { useLongPress } from 'use-long-press'

const threshold = 700

export default function useAnimatedLongPress({
  callback,
  disabled,
}: {
  callback: () => void
  disabled?: boolean | undefined
}) {
  const [pressProgress, setPressProgress] = useState(0)
  const pressStartTime = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  const updateShadow = (timestamp: number) => {
    if (!pressStartTime.current) {
      pressStartTime.current = timestamp
    }

    const elapsed = timestamp - pressStartTime.current
    const progress = Math.min(elapsed / threshold, 1)
    setPressProgress(progress)

    if (progress < 1) {
      animationFrameId.current = requestAnimationFrame(updateShadow)
    }
  }

  const longPressHandler = useLongPress(
    () => {
      if (disabled) return
      callback()
      setPressProgress(0)
    },
    {
      threshold,
      onStart: () => {
        if (disabled) return
        pressStartTime.current = 0
        const id = requestAnimationFrame(updateShadow)
        animationFrameId.current = id
      },
      onFinish: () => {
        if (disabled) return
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
        }
        setPressProgress(0)
      },
      onCancel: () => {
        if (disabled) return
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
        }
        setPressProgress(0)
      },
    }
  )

  useEffect(() => {
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return { pressProgress, longPressHandler, threshold }
}
