import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { Network } from '@pubkey-bot/sdk'
import { UiGroup } from '@pubkey-bot/web/ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminNetworkTableProps {
  networks: Network[]
  deleteNetwork: (network: Network) => void
}

export function AdminUiNetworkTable({ deleteNetwork, networks = [] }: AdminNetworkTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            render: (item) => {
              const link = `/admin/networks/${item.id}`
              return (
                <UiGroup position="left" spacing={4} align="baseline">
                  <Anchor component={Link} to={link} size="sm" weight={500}>
                    {item.name}
                  </Anchor>
                </UiGroup>
              )
            },
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="brand" component={Link} to={`/admin/networks/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteNetwork(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={networks}
      />
    </ScrollArea>
  )
}
