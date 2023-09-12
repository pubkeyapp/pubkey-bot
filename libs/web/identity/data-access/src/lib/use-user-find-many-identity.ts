import { Identity, IdentityProvider } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useUserIdentities() {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['user', 'identities'],
    queryFn: () => sdk.userFindManyIdentity().then((res) => res?.data),
  })

  const grouped: { provider: IdentityProvider; items: Identity[] }[] = useMemo(() => {
    if (!query.data) {
      return []
    }
    const items = query.data?.items ?? []
    return items.reduce((acc, item) => {
      const existing = acc.find((x) => x.provider === item.provider)
      if (existing) {
        existing.items.push(item)
      } else {
        acc.push({ provider: item.provider, items: [item] })
      }
      return acc
    }, [] as { provider: IdentityProvider; items: Identity[] }[])
  }, [query.data])

  const items = query.data?.items ?? []

  const discordIdentity = items.find((x) => x.provider === IdentityProvider.Discord)

  return {
    query,
    grouped,
    items,
    expiredDiscord: discordIdentity?.expired ?? false,
    hasDiscord: !!discordIdentity,
    hasSolana: items.some((x) => x.provider === IdentityProvider.Solana),
    deleteIdentity(identityId: string) {
      if (!window.confirm('Are you sure?')) {
        return
      }
      sdk
        .userDeleteIdentity({ identityId })
        .then((res) => {
          showNotificationSuccess('Identity deleted')
        })
        .catch((res) => {
          showNotificationError('Error deleting identity')
        })
        .finally(() => query.refetch())
    },
  }
}
