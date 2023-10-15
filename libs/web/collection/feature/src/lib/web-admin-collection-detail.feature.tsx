import { Group } from '@mantine/core'
import { useAdminFindOneCollection } from '@pubkey-bot/web/collection/data-access'
import { WebUiCollectionAvatar } from '@pubkey-bot/web/collection/ui'
import { UiAdminPage, UiBack, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useParams } from 'react-router-dom'
import { WebAdminCollectionDetailSettingsTab } from './web-admin-collection-detail-settings.tab'

export function WebAdminCollectionDetailFeature() {
  const { collectionId } = useParams<{ collectionId: string }>() as { collectionId: string }
  const { query, collection } = useAdminFindOneCollection(collectionId)

  return (
    <UiAdminPage
      leftAction={<UiBack />}
      title={
        <Group spacing="xs">
          <WebUiCollectionAvatar collection={collection} size={36} />
          {collection?.name ?? '...'}
        </Group>
      }
    >
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
