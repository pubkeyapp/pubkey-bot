import { AdminCreateBotInput, AdminFindManyBotInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'

import { useUiPagination } from '@pubkey-bot/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyBot(props?: Partial<AdminFindManyBotInput>) {
  const sdk = useWebSdk()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyBotInput = { page, limit, search }
  const query = useQuery(['admin', 'find-many-bot', input], () =>
    sdk.adminFindManyBot({ input }).then((res) => res.data),
  )
  const total = query.data?.paging?.meta?.totalCount ?? 0

  return {
    createBot: (input: AdminCreateBotInput) =>
      sdk
        .adminCreateBot({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`Bot  created`)
            return res.created
          } else {
            showNotificationError(`Bot not created`)
          }
          return undefined
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteBot: (botId: string) =>
      sdk.adminDeleteBot({ botId }).then(() => {
        showNotificationSuccess('Bot deleted')
        return query.refetch()
      }),
    query,
    setSearch,
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
  }
}
