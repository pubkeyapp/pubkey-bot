import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetBotServer({ botId, serverId }: { botId: string; serverId: string }) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['manager', 'get-bot-server', { botId, serverId }],
    queryFn: () => sdk.managerGetBotServer({ botId, serverId }).then((res) => res.data),
  })
}
