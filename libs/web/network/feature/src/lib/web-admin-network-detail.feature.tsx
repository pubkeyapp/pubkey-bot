import { UiBack, UiAdminPage, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneNetwork } from '@pubkey-bot/web/network/data-access'
import { useParams } from 'react-router-dom'
import { WebAdminNetworkDetailSettingsTab } from './web-admin-network-detail-settings.tab'

export function WebAdminNetworkDetailFeature() {
  const { networkId } = useParams<{ networkId: string }>() as { networkId: string }
  const { query, network } = useAdminFindOneNetwork(networkId)

  return (
    <UiAdminPage leftAction={<UiBack />} title={network?.name ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : network ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminNetworkDetailSettingsTab networkId={networkId} />,
              },
            ]}
          />
        ) : (
          <UiError message="Network not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
