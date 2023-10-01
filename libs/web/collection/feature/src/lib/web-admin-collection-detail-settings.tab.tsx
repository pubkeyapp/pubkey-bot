import { UiAlert, UiCard } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneCollection } from '@pubkey-bot/web/collection/data-access'
import { AdminUiUpdateCollectionForm } from '@pubkey-bot/web/collection/ui'

export function WebAdminCollectionDetailSettingsTab({ collectionId }: { collectionId: string }) {
  const { collection, updateCollection } = useAdminFindOneCollection(collectionId)

  return (
    <UiCard>
      {collection ? (
        <AdminUiUpdateCollectionForm collection={collection} submit={updateCollection} />
      ) : (
        <UiAlert message="Collection not found." />
      )}
    </UiCard>
  )
}
