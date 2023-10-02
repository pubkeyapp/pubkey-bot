import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetBotRoles({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['manager', 'get-bot-roles', { botId, serverId }],
    queryFn: () => sdk.managerGetBotRoles({ botId, serverId }).then((res) => res.data),
  })
}
