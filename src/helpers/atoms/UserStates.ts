import { atomWithStorage } from 'jotai/utils'
import { storeVersion } from './atomStore'

export const didOnboardAtom = atomWithStorage(
  'didOnboard' + storeVersion,
  false,
  undefined,
  { getOnInit: true }
)
