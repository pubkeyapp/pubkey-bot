import { Avatar, Button, Group, Text } from '@mantine/core'
import { DiscordServer } from '@pubkey-bot/sdk'
import { useAdminFindOneBot, useManagerGetBotServer } from '@pubkey-bot/web/bot/data-access'
import { UiAlert, UiDebug, UiLoader, UiPageHeader, UiStack } from '@pubkey-bot/web/ui/core'
import { useNavigate, useParams } from 'react-router-dom'

export function WebAdminUiBotServer({ botId }: { botId: string }) {
  const { serverId } = useParams() as { serverId: string }
  const navigate = useNavigate()
  const query = useManagerGetBotServer({ botId, serverId })
  const { leaveServer } = useAdminFindOneBot({ botId })

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.item) {
    return <UiAlert message="Bot not found." />
  }

  const item: DiscordServer = query.data.item

  return (
    <UiStack>
      <UiPageHeader
        title={
          <Group>
            <Avatar src={item.icon} size="lg" alt={item.name} />
            <Text size="xl" weight={700}>
              {item.name}
            </Text>
          </Group>
        }
        actions={
          <Button
            size="xs"
            color="red"
            variant="outline"
            onClick={() => {
              if (!window.confirm('Are you sure you want to leave this server?')) {
                return
              }
              return leaveServer(item.id).then(() => navigate('..'))
            }}
          >
            Leave Server
          </Button>
        }
      />
      <UiDebug data={item} open />
    </UiStack>
  )
}
