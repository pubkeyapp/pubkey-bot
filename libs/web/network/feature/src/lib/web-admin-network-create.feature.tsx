import { Button, Group } from '@mantine/core'
import { AdminCreateNetworkInput } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-bot/web/ui/core'
import { showNotificationError } from '@pubkey-bot/web/ui/notifications'
import { useAdminFindManyNetwork } from '@pubkey-bot/web/network/data-access'
import { AdminUiCreateNetworkForm } from '@pubkey-bot/web/network/ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminNetworkCreateFeature() {
  const navigate = useNavigate()
  const { createNetwork } = useAdminFindManyNetwork()

  async function submit(input: AdminCreateNetworkInput) {
    return createNetwork(input)
      .then((res) => navigate(`/admin/networks/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })
  }

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Network">
      <UiCard>
        <AdminUiCreateNetworkForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateNetworkForm>
      </UiCard>
    </UiAdminPage>
  )
}
