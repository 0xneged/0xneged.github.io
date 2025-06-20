import { didOnboardAtom } from 'helpers/atoms/UserStates'
import { useAtom } from 'jotai'
import { AlertDialog } from 'radix-ui'

export default function Dialog() {
  const [didOnboard, setDidOnboard] = useAtom(didOnboardAtom)

  console.log(didOnboard)

  return (
    <AlertDialog.Root
      open={!didOnboard}
      onOpenChange={() => setDidOnboard(true)}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="absolute inset-0 h-dvh w-dvw bg-black opacity-50"
          onClick={() => setDidOnboard(true)}
        />
        <AlertDialog.Content className="bg-alt-bright selection:bg-accent absolute inset-1/2 flex h-fit max-h-screen w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-2 rounded-md p-6">
          <div className="flex w-full flex-col">
            <AlertDialog.Title className="text-center text-3xl font-black underline">
              Rich or Rekt!
            </AlertDialog.Title>
            <AlertDialog.Description
              className="my-2 flex flex-col gap-y-4 text-center text-xl"
              style={{ textWrap: 'balance' }}
            >
              <p>Click the button regularly — get Rich or get Rekt</p>
              <p className="text-center font-semibold">🤙 $RR 🤙</p>
              <p>Collect tokens, climb the leaderboard, and wait</p>
              <p className="font-semibold">INVITE FRIENDS TO GET REF BONUSES</p>
              <p className="text-center italic">
                Who knows — maybe you will be the next Rich 🧛
              </p>
            </AlertDialog.Description>
          </div>
          <div className="flex gap-x-2">
            <AlertDialog.Cancel className="bg-accent-pale hover:bg-accent cursor-pointer rounded-md px-2 py-2 text-center transition-colors">
              Got it!
            </AlertDialog.Cancel>
            <AlertDialog.Action className="bg-accent-bright hover:bg-accent cursor-pointer rounded-md px-6 py-2 text-center font-semibold transition-colors">
              Cool!
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
