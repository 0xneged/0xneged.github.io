import hapticFeedback, { holdHaptic } from 'helpers/haptic'
import { useState } from 'react'
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

  const longPressHandler = useLongPress(
    () => {
      if (disabled) return
      callback()
    },
    {
      threshold,
      onStart: () => {
        void hapticFeedback()
      },
      onFinish: () => {
        void holdHaptic()
        setPressProgress(1)
      },
      onCancel: () => {
        setPressProgress(0)
      },
    }
  )

  return { pressProgress, longPressHandler, threshold }
}
