import { Avatar, Group } from '@mantine/core'
import { useAdminFindOneBot } from '@pubkey-bot/web/bot/data-access'
import { UiAdminPage, UiBack, UiError, UiLoader, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useParams } from 'react-router-dom'
import { AdminUiBotCommands } from './admin-ui-bot-commands'
import { WebAdminBotDetailRoleConnectionsTab } from './web-admin-bot-detail-role-connections-tab'
import { WebAdminBotDetailOverviewTab } from './web-admin-bot-detail-overview.tab'
import { WebAdminBotDetailServersTab } from './web-admin-bot-detail-servers.tab'
import { WebAdminBotDetailSettingsTab } from './web-admin-bot-detail-settings.tab'

export function WebAdminBotDetailFeature() {
  const { botId } = useParams<{ botId: string }>() as { botId: string }
  const { query, bot } = useAdminFindOneBot({ botId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!bot) {
    return <UiError message="Bot not found." />
  }

  return (
    <UiAdminPage
      leftAction={<UiBack />}
      title={
        <Group spacing="sm">
          <Avatar src={bot?.avatarUrl} />
          {bot?.name}
        </Group>
      }
      rightAction={bot ? <AdminUiBotCommands bot={bot} /> : null}
    >
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
            value: 'role-connections',
            label: 'Role Connections',
            component: <WebAdminBotDetailRoleConnectionsTab botId={botId} />,
          },
          {
            value: 'settings',
            label: 'Settings',
            component: <WebAdminBotDetailSettingsTab botId={botId} />,
          },
        ]}
      />
    </UiAdminPage>
  )
}
