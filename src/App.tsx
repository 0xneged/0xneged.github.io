import { sdk } from '@farcaster/frame-sdk'
import AnimatedRoutes from 'components/AnimatedRoutes'
import Navigator from 'components/Navigator.tsx'
import Overlay from 'components/Overlay'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

export default function App() {
  useEffect(() => {
    void sdk.actions.ready()
  }, [])

  return (
    <div className="relative mx-auto flex h-dvh w-dvw max-w-prose flex-col overflow-hidden">
      <Overlay />

      <AnimatedRoutes />
      <Navigator />

      <ToastContainer
        draggable
        position="top-center"
        pauseOnHover
        pauseOnFocusLoss
        closeOnClick
        closeButton={false}
        autoClose={3000}
        theme="dark"
        // toastClassName="!bg-tertiary !rounded-xl !w-[96dvw] !ml-[2dvw] md:!w-full md:!ml-auto !max-w-prose !shadow-super !top-4 !font-semibold"
        draggableDirection="x"
        hideProgressBar
        limit={3}
        stacked
      />
    </div>
  )
}
