import { sharePost } from 'helpers/fcLinkOpen'
import { AlertDialog } from 'radix-ui'
import { Dispatch, SetStateAction } from 'react'

type DialogInfo = {
  address?: string
  description?: string
  open: boolean
}

export default function Dialog({
  address,
  description,
  open,
  setOpen,
}: DialogInfo & {
  setOpen: Dispatch<SetStateAction<DialogInfo>>
}) {
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(openState) =>
        setOpen((prev) => ({ ...prev, open: openState }))
      }
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="absolute inset-0 h-dvh w-dvw bg-black opacity-50"
          onClick={() => setOpen((prev) => ({ ...prev, open: false }))}
        />
        <AlertDialog.Content className="bg-alt-bright selection:bg-accent absolute inset-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-2 rounded-md p-6">
          <div className="flex w-full flex-col">
            <AlertDialog.Title className="text-left text-2xl font-bold">
              Share a post
            </AlertDialog.Title>
            <AlertDialog.Description className="text-left text-xl">
              "{description}"
            </AlertDialog.Description>
          </div>
          <div className="flex gap-x-2">
            <AlertDialog.Cancel className="bg-accent-pale hover:bg-accent cursor-pointer rounded-md px-2 py-2 text-center transition-colors">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={() =>
                address ? void sharePost(address, description) : null
              }
              className="bg-accent-bright hover:bg-accent cursor-pointer rounded-md px-6 py-2 text-center font-semibold transition-colors"
            >
              Share
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
