import { Switch, Table, Text } from '@mantine/core'
import { useManagerGetBotRoles } from '@pubkey-bot/web/bot/data-access'
import { DiscordUiRoleColor } from '@pubkey-bot/web/bot/ui'
import { UiAlert, UiCard, UiDebug, UiLoader, UiStack } from '@pubkey-bot/web/ui/core'

export function WebAdminUiBotServerRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const query = useManagerGetBotRoles({ botId, serverId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.items?.length) {
    return <UiAlert message="Not roles found." />
  }

  const items = query.data.items

  return (
    <UiStack>
      <UiCard p={0}>
        <UiStack>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th align="right">Managed</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Text size="xl">
                      <DiscordUiRoleColor color={item.color}>{item.name}</DiscordUiRoleColor>
                    </Text>
                  </td>
                  <td align="right">
                    <Switch size="xl" checked={item.managed} onLabel="Yes" offLabel="No" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </UiStack>
      </UiCard>
      <UiDebug data={items} open />
    </UiStack>
  )
}
