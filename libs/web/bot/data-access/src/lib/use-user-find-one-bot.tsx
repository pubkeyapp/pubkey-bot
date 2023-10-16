import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneBot({ botId }: { botId: string }) {
  const sdk = useWebSdk()

  const query = useQuery({
    queryKey: ['user', 'find-one-bot', botId],
    queryFn: () => sdk.userFindOneBot({ botId }).then((res) => res.data),
    retry: 0,
  })
  const bot = query.data?.item ?? undefined

  return {
    bot,
    query,
  }
}
