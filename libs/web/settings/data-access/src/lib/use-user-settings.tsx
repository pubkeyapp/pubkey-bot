import { UserUpdateUserInput } from '@pubkey-bot/sdk'
import { useWebAuth } from '@pubkey-bot/web/auth/data-access'
import { useMeQuery, useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError } from '@pubkey-bot/web/ui/notifications'
import { useUserFineOneUser } from '@pubkey-bot/web/user/data-access'

export function useUserSettings() {
  const sdk = useWebSdk()
  const meQuery = useMeQuery(sdk)
  const { user } = useWebAuth()
  const { query } = useUserFineOneUser(user?.username as string)

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUpdateUserInput) => {
      return sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await Promise.all([query.refetch(), meQuery.refetch()])
          return !!res.data
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        })
    },
  }
}
