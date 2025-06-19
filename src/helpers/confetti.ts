import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

export const successConfetti = () =>
  jsConfetti.addConfetti({
    emojis: ['💸'],
  })

export const failConfetti = () => jsConfetti.addConfetti({ emojis: ['📉'] })
