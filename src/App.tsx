import AnimatedRoutes from 'components/AnimatedRoutes'
import Navigator from 'components/Navigator.tsx'

export default function App() {
  return (
    <div className="relative mx-auto flex h-dvh w-dvw max-w-prose flex-col overflow-hidden">
      <AnimatedRoutes />
      <Navigator />
    </div>
  )
}
