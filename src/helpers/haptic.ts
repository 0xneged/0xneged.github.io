import sdk from '@farcaster/frame-sdk'

export default async function hapticFeedback() {
  await sdk.haptics.impactOccurred('light')
}
