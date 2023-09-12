import { modals } from '@mantine/modals'
import { AdminCreateIdentityInput, AdminFindManyIdentityInput, Identity, IdentityProvider } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminIdentities({ ownerId, provider }: { ownerId?: string; provider?: IdentityProvider }) {
  const sdk = useWebSdk()

  const [input] = useState<AdminFindManyIdentityInput>({
    ownerId: ownerId,
    provider: provider,
  })

  const query = useQuery(['admin', 'identities', 'find', input], () =>
    sdk.adminFindManyIdentity({ input }).then((res) => res.data),
  )

  return {
    createIdentity: async (input: AdminCreateIdentityInput) => {
      if (!ownerId) {
        showNotificationError('No owner ID')
        return false
      }
      try {
        const res = await sdk.adminCreateIdentity({ input: { ...input, ownerId } })

        if (res) {
          showNotificationSuccess('Identity created')
          modals.closeAll()
          await query.refetch()
          return true
        }
        showNotificationError('Error creating identity')
        return false
      } catch (err) {
        showNotificationError(`${err}`)
        return false
      }
    },
    deleteIdentity: (identity: Identity) => {
      return sdk.adminDeleteIdentity({ identityId: identity.id }).then(async (res) => {
        if (res) {
          showNotificationSuccess('Identity deleted')
          await query.refetch()
          return true
        }
        showNotificationError('Error deleting identity')
        return false
      })
    },
    identities: query.data?.items ?? [],
    query,
  }
}
