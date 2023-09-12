import { Badge, Text } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

export function UiVerifiedBadge() {
  const icon = (
    <Text display="flex">
      <IconCheck size={16} />
    </Text>
  )
  return <Badge leftSection={icon}>Verified</Badge>
}
