import Leaderboard from 'pages/Leaderboard'
import MainPage from 'pages/Main'
import { Route, Routes, useLocation } from 'react-router'

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<MainPage />} />
      <Route path="leaderboard" element={<Leaderboard />} />
    </Routes>
  )
}
