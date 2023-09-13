import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiAlert } from '@pubkey-bot/web/ui/core'
import { WebAdminUiBotServers } from './web-admin-ui-bot-servers'

export function WebAdminBotDetailServersTab({ botId }: { botId: string }) {
  const { bot } = useAdminFindOneBot({ botId })

  return bot?.started ? (
    bot ? (
      <WebAdminUiBotServers bot={bot} />
    ) : (
      <UiAlert message="Bot not found." />
    )
  ) : (
    <UiAlert message="Bot not started." />
  )
}
