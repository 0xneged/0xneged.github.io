import Leaderboard from 'pages/Leaderboard'
import MainPage from 'pages/Main'
import Referrals from 'pages/Referrals'
import { Route, Routes, useLocation } from 'react-router'
import ProtectedRoute from './ProtectedRoute'

export default function AnimatedRoutes({
  isConnected,
}: {
  isConnected: boolean
}) {
  const location = useLocation()

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
