import { useMiniApp } from '@neynar/react'
import MiniApp from 'components/App/MiniApp'
import DotsLoader from 'components/DotsLoad'
import { useEffect, useState } from 'react'
import WebPromo from './WebPromo'

export default function App() {
  const { isInMiniApp, isSDKLoaded } = useMiniApp()

  const [loading, setLoading] = useState(true)
  const [isMiniApp, setIsMiniApp] = useState(false)

  useEffect(() => {
    if (!isSDKLoaded) return

    const checkApp = async () => {
      setIsMiniApp(await isInMiniApp())
      setLoading(false)
    }

    void checkApp()
  }, [isInMiniApp, isSDKLoaded])

  return (
    <div className="relative mx-auto flex h-dvh w-dvw max-w-prose flex-col overflow-hidden">
      {loading ? (
        <p className="text-accent-bright font-serif text-3xl">
          Loading
          <DotsLoader />
        </p>
      ) : isMiniApp ? (
        <MiniApp />
      ) : (
        <WebPromo />
      )}
    </div>
  )
}
