import { Avatar, Group } from '@mantine/core'
import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiAdminPage, UiBack, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useParams } from 'react-router-dom'
import { AdminUiBotCommands } from './admin-ui-bot-commands'
import { WebAdminBotDetailOverviewTab } from './web-admin-bot-detail-overview.tab'
import { WebAdminBotDetailServersTab } from './web-admin-bot-detail-servers.tab'
import { WebAdminBotDetailSettingsTab } from './web-admin-bot-detail-settings.tab'

export function WebAdminBotDetailFeature() {
  const { botId } = useParams<{ botId: string }>() as { botId: string }
  const { query, bot } = useAdminFindOneBot({ botId })

  return (
    <UiAdminPage
      leftAction={<UiBack />}
      title={
        bot ? (
          <Group spacing="sm">
            <Avatar src={bot?.avatarUrl} />
            {bot?.name}
          </Group>
        ) : (
          '...'
        )
      }
      rightAction={bot ? <AdminUiBotCommands bot={bot} /> : null}
    >
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : bot ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'overview',
                label: 'Overview',
                component: <WebAdminBotDetailOverviewTab botId={botId} />,
              },
              {
                value: 'servers',
                label: 'Servers',
                component: <WebAdminBotDetailServersTab botId={botId} />,
              },
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminBotDetailSettingsTab botId={botId} />,
              },
            ]}
          />
        ) : (
          <UiError message="Bot not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
