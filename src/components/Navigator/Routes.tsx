import sdk from '@farcaster/frame-sdk'
import hapticFeedback from 'helpers/haptic'
import Leaderboard from 'pages/Leaderboard'
import MainPage from 'pages/Main'
import Referrals from 'pages/Referrals'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useAccount } from 'wagmi'
import ProtectedRoute from './ProtectedRoute'

export default function AnimatedRoutes() {
  const { isConnected, status } = useAccount()
  const location = useLocation()

  useEffect(() => {
    if (status === 'reconnecting') return

    const startMiniApp = async () => {
      await sdk.actions.ready()
      await hapticFeedback()
      const { notificationDetails } = await sdk.actions.addMiniApp()
      const token = notificationDetails?.token
    }

    void startMiniApp()
  }, [status])

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
