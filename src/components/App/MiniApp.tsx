import sdk, { FrameNotificationDetails } from '@farcaster/frame-sdk'
import Navigator from 'components/Navigator/Navigator'
import Routes from 'components/Navigator/Routes'
import { setNotifications } from 'helpers/api/backend'
import hapticFeedback from 'helpers/haptic'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useAccount } from 'wagmi'

export default function MiniApp() {
  const { isConnected, status, address } = useAccount()

  useEffect(() => {
    if (status === 'reconnecting') return

    const startMiniApp = async () => {
      await sdk.actions.ready()
      await hapticFeedback()
      await sdk.actions.addMiniApp()
    }

    void startMiniApp()
  }, [status])

  useEffect(() => {
    if (!address) return

    const setupNotifications = async ({
      notificationDetails,
    }: {
      notificationDetails?: FrameNotificationDetails | undefined
    }) => {
      if (!notificationDetails) return

      const { token, url } = notificationDetails
      await setNotifications({
        token,
        address,
        url,
      })
    }

    sdk.on('frameAdded', setupNotifications)
    sdk.on('notificationsEnabled', setupNotifications)

    return () => {
      sdk.off('frameAdded', setupNotifications)
      sdk.off('notificationsEnabled', setupNotifications)
    }
  }, [address])

  return (
    <>
      <Routes isConnected={isConnected} />
      <Navigator />
      <ToastContainer
        draggable
        position="top-center"
        pauseOnHover
        pauseOnFocusLoss
        closeOnClick
        closeButton={false}
        autoClose={3000}
        theme="light"
        toastClassName="!w-screen !ml-[18.5dvw] !font-semibold"
        draggableDirection="x"
        hideProgressBar
        limit={3}
        stacked
      />
    </>
  )
}
