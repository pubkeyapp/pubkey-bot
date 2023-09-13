import { Button, Group } from '@mantine/core'
import { Bot } from '@pubkey-bot/sdk'
import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiDebugModal } from '@pubkey-bot/web/ui/core'

export function AdminUiBotCommands({ bot }: { bot: Bot }) {
  const { startBot, starting, stopBot, stopping } = useAdminFindOneBot({ botId: bot.id })

  return (
    <Group spacing="xs">
      <UiDebugModal data={bot} />
      <Button size="xs" disabled={bot.started ?? true} loading={starting} onClick={() => startBot()}>
        Start
      </Button>
      <Button size="xs" disabled={!bot.started ?? true} loading={stopping} onClick={() => stopBot()}>
        Stop
      </Button>
      <Button
        size="xs"
        component="a"
        href={bot.developersUrl}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!bot.developersUrl}
      >
        Manage
      </Button>
      <Button
        size="xs"
        component="a"
        href={bot.inviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!bot.inviteUrl}
      >
        Invite
      </Button>
    </Group>
  )
}
