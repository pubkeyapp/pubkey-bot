import { UiBack, UiAdminPage, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneConnection } from '@pubkey-bot/web/connection/data-access'
import { useParams } from 'react-router-dom'
import { WebAdminConnectionDetailSettingsTab } from './web-admin-connection-detail-settings.tab'

export function WebAdminConnectionDetailFeature() {
  const { connectionId } = useParams<{ connectionId: string }>() as { connectionId: string }
  const { query, connection } = useAdminFindOneConnection(connectionId)

  return (
    <UiAdminPage leftAction={<UiBack />} title={connection?.key ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : connection ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminConnectionDetailSettingsTab connectionId={connectionId} />,
              },
            ]}
          />
        ) : (
          <UiError message="Connection not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
