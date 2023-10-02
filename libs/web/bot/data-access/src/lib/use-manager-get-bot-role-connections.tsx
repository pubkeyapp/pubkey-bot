import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetBotRoleConnections({ botId }: { botId: string }) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['manager', 'get-bot-roles-connections', { botId }],
    queryFn: () => sdk.managerGetBotRoleConnections({ botId }).then((res) => res.data),
  })
}
