import { Box, Group } from '@mantine/core'
import { UiFull, UiLogoMark, UiStack } from '@pubkey-bot/web/ui/core'
import { ReactNode } from 'react'

export function AuthUiPage({ children }: { children: ReactNode }) {
  return (
    <UiFull>
      <Box miw={400} p="lg">
        <UiStack spacing={48}>
          <Group position="center">
            <UiLogoMark size={72} />
          </Group>
          {children}
        </UiStack>
      </Box>
    </UiFull>
  )
}
