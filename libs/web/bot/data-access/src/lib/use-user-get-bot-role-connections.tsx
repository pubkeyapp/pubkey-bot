import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetBotRoleConnections({ botId }: { botId: string }) {
  const sdk = useWebSdk()

  const query = useQuery({
    queryKey: ['user', 'get-bot-role-connections', botId],
    queryFn: () => sdk.userGetBotRoleConnections({ botId }).then((res) => res.data),
    retry: 0,
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
