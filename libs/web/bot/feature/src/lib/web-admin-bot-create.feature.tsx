import { Button, Group } from '@mantine/core'
import { AdminCreateBotInput } from '@pubkey-bot/sdk'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-bot/web/ui/core'
import { showNotificationError } from '@pubkey-bot/web/ui/notifications'
import { useAdminFindManyBot } from '@pubkey-bot/web/bot/data-access'
import { AdminUiCreateBotForm } from '@pubkey-bot/web/bot/ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminBotCreateFeature() {
  const navigate = useNavigate()
  const { createBot } = useAdminFindManyBot()

  async function submit(input: AdminCreateBotInput) {
    return createBot(input)
      .then((res) => {
        if (res) {
          navigate(`/admin/bots/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })
  }

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Bot">
      <UiCard>
        <AdminUiCreateBotForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateBotForm>
      </UiCard>
    </UiAdminPage>
  )
}
