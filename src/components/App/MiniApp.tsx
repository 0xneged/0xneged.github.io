import AnimatedRoutes from 'components/AnimatedRoutes'
import LiquidMenu from 'components/LiquidMenu'
import { ToastContainer } from 'react-toastify'

export default function MiniApp() {
  return (
    <>
      <AnimatedRoutes />
      <LiquidMenu />
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
