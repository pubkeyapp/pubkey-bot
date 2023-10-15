import { Button, Group } from '@mantine/core'
import { AdminCreateCollectionInput } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-bot/web/ui/core'
import { showNotificationError } from '@pubkey-bot/web/ui/notifications'
import { useAdminFindManyCollection } from '@pubkey-bot/web/collection/data-access'
import { AdminUiCreateCollectionForm } from '@pubkey-bot/web/collection/ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminCollectionCreateFeature() {
  const navigate = useNavigate()
  const { createCollection } = useAdminFindManyCollection()

  async function submit(input: AdminCreateCollectionInput) {
    return createCollection(input)
      .then((res) => {
        if (res?.id) {
          navigate(`/admin/collections/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })
  }

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Collection">
      <UiCard>
        <AdminUiCreateCollectionForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateCollectionForm>
      </UiCard>
    </UiAdminPage>
  )
}
