import { Identity } from '@pubkey-bot/sdk'
import { UiDebugModal } from '@pubkey-bot/web/ui/core'
import { ActionIcon, Group, ScrollArea, Stack, Text } from '@mantine/core'

import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

interface AdminIdentityTableProps {
  identities: Identity[]
  deleteIdentity: (identity: Identity) => void
}

export function IdentityUiAdminTable({ deleteIdentity, identities = [] }: AdminIdentityTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'identity',
            render: (item) => {
              return (
                <Group spacing="sm" p={4}>
                  <Stack spacing={1}>
                    <Text size="sm" weight={500}>
                      {item.providerId}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {item.provider}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <UiDebugModal data={item} />
                <ActionIcon color="red" onClick={() => deleteIdentity(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={identities}
      />
    </ScrollArea>
  )
}
