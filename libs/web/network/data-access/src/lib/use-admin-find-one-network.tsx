import { AdminUpdateNetworkInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneNetwork(networkId: string) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'find-one-network', networkId],
    () => sdk.adminFindOneNetwork({ networkId }).then((res) => res.data),
    { retry: 0 },
  )
  const network = query.data?.item ?? undefined

  return {
    network,
    query,
    updateNetwork: async (input: AdminUpdateNetworkInput) =>
      sdk
        .adminUpdateNetwork({ networkId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Network updated')
            await query.refetch()
            return true
          }
          showNotificationError('Network not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
