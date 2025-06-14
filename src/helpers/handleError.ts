import Alert from 'assets/icons/Alert'
import { toast } from 'react-toastify'
import { notificationHaptic } from './haptic'

export default function ({
  e,
  toastMessage,
}: {
  e: unknown
  toastMessage?: string
}) {
  void notificationHaptic('error')
  console.error(e)
  if (toastMessage) toast.error(toastMessage, { icon: Alert() })
  console.error([toastMessage, e])
}
