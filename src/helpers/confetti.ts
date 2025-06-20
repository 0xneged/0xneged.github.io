import { readAtom } from 'helpers/atoms/atomStore'
import jsConfettiAtom from 'helpers/atoms/jsConfettiAtom'

export const successConfetti = () =>
  readAtom(jsConfettiAtom).addConfetti({ emojis: ['💸', '🤑'] })

export const failConfetti = () =>
  readAtom(jsConfettiAtom).addConfetti({ emojis: ['😓', '📉', '🥀'] })
