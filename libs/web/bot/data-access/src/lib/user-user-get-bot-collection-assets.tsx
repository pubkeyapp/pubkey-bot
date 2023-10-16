import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function userUserGetBotCollectionAssets({ botId }: { botId: string }) {
  const sdk = useWebSdk()

  const query = useQuery({
    queryKey: ['user', 'get-bot-collection-assets', botId],
    queryFn: () => sdk.userGetBotCollectionAssets({ botId }).then((res) => res.data),
    retry: 0,
    staleTime: 0,
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
