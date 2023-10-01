import { AdminUpdateCollectionInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneCollection(collectionId: string) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'find-one-collection', collectionId],
    () => sdk.adminFindOneCollection({ collectionId }).then((res) => res.data),
    { retry: 0 },
  )
  const collection = query.data?.item ?? undefined

  return {
    collection,
    query,
    updateCollection: async (input: AdminUpdateCollectionInput) =>
      sdk
        .adminUpdateCollection({ collectionId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Collection updated')
            await query.refetch()
            return true
          }
          showNotificationError('Collection not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
