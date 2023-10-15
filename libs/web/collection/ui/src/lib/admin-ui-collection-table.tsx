import { ActionIcon, Anchor, Badge, Code, Group, ScrollArea, Stack } from '@mantine/core'
import { Collection } from '@pubkey-bot/sdk'
import { UiGroup } from '@pubkey-bot/web/ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { WebUiCollectionAvatar } from './web-ui-collection-avatar'

interface AdminCollectionTableProps {
  collections: Collection[]
  deleteCollection: (collection: Collection) => void
}

export function AdminUiCollectionTable({ deleteCollection, collections = [] }: AdminCollectionTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'collection',
            render: (item) => (
              <Group spacing="xs">
                <WebUiCollectionAvatar collection={item} size={92} />
                <Stack spacing="xs">
                  <Anchor component={Link} to={`${item.id}`} size="xl">
                    {item.name}
                  </Anchor>
                  <Group>
                    <Code color="brand">{item.account}</Code>
                  </Group>
                  <Group>
                    <Badge size="sm" color="brand">
                      {item.network}
                    </Badge>
                  </Group>
                </Stack>
              </Group>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="brand" component={Link} to={`/admin/collections/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteCollection(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={collections}
      />
    </ScrollArea>
  )
}
