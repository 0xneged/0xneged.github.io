import sdk from '@farcaster/frame-sdk'
import WelcomeDialog from 'components/Dialog/WelcomeDialog'
import Navigator from 'components/Navigator/Navigator'
import Routes from 'components/Navigator/Routes'
import hapticFeedback from 'helpers/haptic'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useAccount } from 'wagmi'

export default function MiniApp() {
  const { isConnected, status } = useAccount()

  useEffect(() => {
    console.log(['status', status])
    if (status === 'reconnecting') return

    const startMiniApp = async () => {
      await sdk.actions.ready()
      await hapticFeedback()
      await sdk.actions.addMiniApp()
    }

    void startMiniApp()
  }, [status])

  return (
    <>
      {isConnected ? <WelcomeDialog /> : null}
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
