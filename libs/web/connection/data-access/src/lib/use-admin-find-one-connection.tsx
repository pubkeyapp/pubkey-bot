import { AdminUpdateConnectionInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneConnection(connectionId: string) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'find-one-connection', connectionId],
    () => sdk.adminFindOneConnection({ connectionId }).then((res) => res.data),
    { retry: 0 },
  )
  const connection = query.data?.item ?? undefined

  return {
    connection,
    query,
    updateConnection: async (input: AdminUpdateConnectionInput) =>
      sdk
        .adminUpdateConnection({ connectionId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Connection updated')
            await query.refetch()
            return true
          }
          showNotificationError('Connection not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
