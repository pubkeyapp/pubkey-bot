import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetBotServers({ botId }: { botId: string }) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['manager', 'get-bot-servers', { botId }],
    queryFn: () => sdk.managerGetBotServers({ botId }).then((res) => res.data),
  })
}
