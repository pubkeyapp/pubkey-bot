import { AdminUpdateBotInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindOneBot({ botId }: { botId: string }) {
  const sdk = useWebSdk()
  const [starting, setStarting] = useState(false)
  const [stopping, setStopping] = useState(false)
  const query = useQuery(
    ['admin', 'find-one-bot', botId],
    () => sdk.adminFindOneBot({ botId }).then((res) => res.data),
    { retry: 0 },
  )
  const bot = query.data?.item ?? undefined

  return {
    bot,
    query,
    starting,
    stopping,
    leaveServer: async (serverId: string) =>
      sdk
        .managerLeaveBotServer({ botId, serverId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.left) {
              showNotificationSuccess('Bot left server')
            } else {
              showNotificationError('Bot did not leave server')
            }
            await query.refetch()
            return true
          }
          showNotificationError('Error leaving server')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
    startBot: async () => {
      setStarting(true)
      return sdk
        .managerStartBot({ botId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.started) {
              showNotificationSuccess('Bot started')
            } else {
              showNotificationError('Bot not started')
            }
            await query.refetch()
            return true
          }
          showNotificationError('Error starting bot')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        })
        .finally(() => setStarting(false))
    },
    stopBot: async () => {
      setStopping(true)
      return sdk
        .managerStopBot({ botId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            if (res.stopped) {
              showNotificationSuccess('Bot stopped')
            } else {
              showNotificationError('Bot not stopped')
            }
            await query.refetch()
            return true
          }
          showNotificationError('Error stopping bot')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        })
        .finally(() => setStopping(false))
    },
    updateBot: async (input: AdminUpdateBotInput) =>
      sdk
        .adminUpdateBot({ botId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Bot updated')
            await query.refetch()
            return true
          }
          showNotificationError('Bot not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
