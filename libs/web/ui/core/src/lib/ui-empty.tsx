import { rem, Text } from '@mantine/core'
import { ComponentType, ReactNode } from 'react'
import { UiCard } from './ui-card'
import { UiStack } from './ui-stack'

export function UiEmpty({
  children,
  icon: Icon,
  title,
}: {
  children: ReactNode
  icon: ComponentType<{ size: number | string; stroke: number }>
  title: ReactNode
}) {
  return (
    <UiCard py="xl">
      <UiStack my="xs" spacing="xl" align="center">
        <Icon size={rem('4em')} stroke={1.5} />
        <Text size="xl" weight={700}>
          {title}
        </Text>
        {children}
      </UiStack>
    </UiCard>
  )
}
