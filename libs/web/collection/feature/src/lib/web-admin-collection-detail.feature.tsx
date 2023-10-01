import { UiBack, UiAdminPage, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneCollection } from '@pubkey-bot/web/collection/data-access'
import { useParams } from 'react-router-dom'
import { WebAdminCollectionDetailSettingsTab } from './web-admin-collection-detail-settings.tab'

export function WebAdminCollectionDetailFeature() {
  const { collectionId } = useParams<{ collectionId: string }>() as { collectionId: string }
  const { query, collection } = useAdminFindOneCollection(collectionId)

  return (
    <UiAdminPage leftAction={<UiBack />} title={collection?.name ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : collection ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminCollectionDetailSettingsTab collectionId={collectionId} />,
              },
            ]}
          />
        ) : (
          <UiError message="Collection not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
