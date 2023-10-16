import { Button, Group } from '@mantine/core'
import { AdminCreateConnectionInput } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-bot/web/ui/core'
import { showNotificationError } from '@pubkey-bot/web/ui/notifications'
import { useAdminFindManyConnection } from '@pubkey-bot/web/connection/data-access'
import { AdminUiCreateConnectionForm } from '@pubkey-bot/web/connection/ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminConnectionCreateFeature() {
  const navigate = useNavigate()
  const { createConnection } = useAdminFindManyConnection({ botId: '' })

  async function submit(input: AdminCreateConnectionInput) {
    return createConnection(input)
      .then((res) => navigate(`/admin/connections/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })
  }

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Connection">
      <UiCard>
        <AdminUiCreateConnectionForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateConnectionForm>
      </UiCard>
    </UiAdminPage>
  )
}
