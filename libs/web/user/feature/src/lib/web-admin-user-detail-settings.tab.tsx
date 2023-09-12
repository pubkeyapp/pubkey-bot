import { UiAlert, UiCard } from '@pubkey-bot/web/ui/core'
import { useAdminUser } from '@pubkey-bot/web/user/data-access'
import { AdminUiUpdateUserForm } from '@pubkey-bot/web/user/ui'

export function WebAdminUserDetailSettingsTab({ userId }: { userId: string }) {
  const { user, updateUser } = useAdminUser(userId)

  return (
    <UiCard>
      {user ? <AdminUiUpdateUserForm user={user} submit={updateUser} /> : <UiAlert message="User not found." />}
    </UiCard>
  )
}
