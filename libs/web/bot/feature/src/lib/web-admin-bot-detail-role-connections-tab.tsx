import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiAlert } from '@pubkey-bot/web/ui/core'
import { WebAdminUiBotRoleConnections } from './web-admin-ui-bot-role-connections'

export function WebAdminBotDetailRoleConnectionsTab({ botId }: { botId: string }) {
  const { bot } = useAdminFindOneBot({ botId })

  return bot ? (
    bot?.started ? (
      <WebAdminUiBotRoleConnections bot={bot} />
    ) : (
      <UiAlert message="Bot not started." />
    )
  ) : (
    <UiAlert message="Bot not found." />
  )
}
