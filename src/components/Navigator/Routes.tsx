import sdk, { FrameNotificationDetails } from '@farcaster/frame-sdk'
import { setNotifications } from 'helpers/api/backend'
import hapticFeedback from 'helpers/haptic'
import Leaderboard from 'pages/Leaderboard'
import MainPage from 'pages/Main'
import Referrals from 'pages/Referrals'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useAccount } from 'wagmi'
import ProtectedRoute from './ProtectedRoute'

export default function AnimatedRoutes() {
  const { isConnected, status, address } = useAccount()
  const location = useLocation()

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
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<MainPage />} />
      <Route element={<ProtectedRoute isAllowed={isConnected} />}>
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="refs" element={<Referrals />} />
      </Route>
    </Routes>
  )
}
