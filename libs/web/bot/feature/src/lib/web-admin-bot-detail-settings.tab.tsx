import { UiAlert, UiCard } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { AdminUiUpdateBotForm } from '@pubkey-bot/web/bot/ui'

export function WebAdminBotDetailSettingsTab({ botId }: { botId: string }) {
  const { bot, updateBot } = useAdminFindOneBot({ botId })

  return (
    <UiCard>
      {bot ? <AdminUiUpdateBotForm bot={bot} submit={updateBot} /> : <UiAlert message="Bot not found." />}
    </UiCard>
  )
}
