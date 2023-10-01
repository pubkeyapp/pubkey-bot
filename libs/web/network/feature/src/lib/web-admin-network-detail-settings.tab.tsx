import { UiAlert, UiCard } from '@pubkey-bot/web/ui/core'
import { useAdminFindOneNetwork } from '@pubkey-bot/web/network/data-access'
import { AdminUiUpdateNetworkForm } from '@pubkey-bot/web/network/ui'

export function WebAdminNetworkDetailSettingsTab({ networkId }: { networkId: string }) {
  const { network, updateNetwork } = useAdminFindOneNetwork(networkId)

  return (
    <UiCard>
      {network ? (
        <AdminUiUpdateNetworkForm network={network} submit={updateNetwork} />
      ) : (
        <UiAlert message="Network not found." />
      )}
    </UiCard>
  )
}
