import sdk from '@farcaster/frame-sdk'

export async function holdHaptic() {
  await sdk.haptics.selectionChanged()
}

export const notificationHaptic = sdk.haptics.notificationOccurred

export default async function hapticFeedback(
  type: 'light' | 'medium' | 'heavy' = 'light'
) {
  await sdk.haptics.impactOccurred(type)
}
