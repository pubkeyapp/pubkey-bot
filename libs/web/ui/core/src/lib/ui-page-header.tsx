import { Group, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { UiCard } from './ui-card'
import { UiGroup } from './ui-group'

export function UiPageHeader({
  children,
  title,
  actions,
}: {
  children?: ReactNode
  title: ReactNode
  actions?: ReactNode
}) {
  return (
    <UiCard>
      <UiGroup>
        {typeof title === 'string' ? (
          <Text size="xl" weight={700}>
            {title}
          </Text>
        ) : (
          title
        )}
        <Group>{actions}</Group>
      </UiGroup>
      {children}
    </UiCard>
  )
}
