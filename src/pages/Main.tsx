import TransitionWrapper from 'components/TransitionWrapper'

export default function MainPage() {
  return (
    <TransitionWrapper className="overflow-auto">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 overflow-y-auto pb-4 md:py-8">
        Rich or rekt?
      </div>
    </TransitionWrapper>
  )
}
