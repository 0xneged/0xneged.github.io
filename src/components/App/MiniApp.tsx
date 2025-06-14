import Navigator from 'components/Navigator/Navigator'
import Routes from 'components/Navigator/Routes'
import { ToastContainer } from 'react-toastify'

export default function MiniApp() {
  return (
    <>
      <Routes />
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
