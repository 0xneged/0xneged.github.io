import { sdk } from '@farcaster/frame-sdk'
import AnimatedRoutes from 'components/AnimatedRoutes'
import Navigator from 'components/Navigator.tsx'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    void sdk.actions.ready()
  }, [])

  return (
    <div className="relative mx-auto flex h-dvh w-dvw max-w-prose flex-col overflow-hidden">
      <AnimatedRoutes />
      <Navigator />
    </div>
  )
}
