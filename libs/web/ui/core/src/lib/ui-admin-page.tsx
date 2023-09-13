import { Box, Flex, Group, Title } from '@mantine/core'
import { ReactNode } from 'react'
import { UiContainer } from './ui-container'
import { UiGroup } from './ui-group'
import { UiStack } from './ui-stack'

export function UiAdminPage({
  children,
  leftAction,
  rightAction,
  title,
}: {
  children: ReactNode
  leftAction?: ReactNode
  rightAction?: ReactNode
  title?: ReactNode
}) {
  return (
    <UiContainer size="xl" h="100%">
      <Flex direction="column" justify="space-between" h="100%">
        <Box mb="lg">
          <UiGroup>
            <Group>
              {leftAction ? leftAction : null}
              <Title order={2}>{title ?? ''}</Title>
            </Group>
            {rightAction ? <Group>{rightAction}</Group> : null}
          </UiGroup>
        </Box>
        <UiStack my="xs" spacing="xl" sx={{ flexGrow: 1 }}>
          {children}
        </UiStack>
      </Flex>
    </UiContainer>
  )
}
