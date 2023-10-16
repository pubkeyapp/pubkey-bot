import { UiAlert, UiCard } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneConnection } from '@pubkey-bot/web/connection/data-access'
import { AdminUiUpdateConnectionForm } from '@pubkey-bot/web/connection/ui'

export function WebAdminConnectionDetailSettingsTab({ connectionId }: { connectionId: string }) {
  const { connection, updateConnection } = useAdminFindOneConnection(connectionId)

  return (
    <UiCard>
      {connection ? (
        <AdminUiUpdateConnectionForm connection={connection} submit={updateConnection} />
      ) : (
        <UiAlert message="Connection not found." />
      )}
    </UiCard>
  )
}
