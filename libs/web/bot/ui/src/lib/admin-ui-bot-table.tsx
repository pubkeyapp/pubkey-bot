import { ActionIcon, Anchor, Avatar, Group, ScrollArea } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { UiGroup } from '@pubkey-bot/web/ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminBotTableProps {
  bots: Bot[]
  deleteBot: (bot: Bot) => void
}

export function AdminUiBotTable({ deleteBot, bots = [] }: AdminBotTableProps) {
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
              const link = `/admin/bots/${item.id}`
              return (
                <UiGroup position="left" spacing={'xs'} align="center">
                  <Avatar src={item.avatarUrl} alt={item.name} size="md" radius="sm" />
                  <Anchor component={Link} to={link} size="lg" weight={500}>
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
                <ActionIcon color="brand" component={Link} to={`/admin/bots/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteBot(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={bots}
      />
    </ScrollArea>
  )
}
