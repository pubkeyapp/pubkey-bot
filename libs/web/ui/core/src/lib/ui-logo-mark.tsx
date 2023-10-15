import { Image, useMantineTheme } from '@mantine/core'

export function UiLogoMark({ size }: { size?: number }) {
  const { colorScheme } = useMantineTheme()

  if (colorScheme === 'dark') {
    return <Image height={size} src="/assets/pubkey-link-logo-white.png" />
  }
  return <Image height={size} src="/assets/pubkey-link-logo-black.png" />
}
