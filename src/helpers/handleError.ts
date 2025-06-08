import Alert from 'assets/icons/Alert'
import { toast } from 'react-toastify'

export default function ({
  e,
  toastMessage,
}: {
  e: unknown
  toastMessage?: string
}) {
  console.error(e)
  if (toastMessage) toast.error(toastMessage, { icon: Alert() })
  console.error([toastMessage, e])
}
