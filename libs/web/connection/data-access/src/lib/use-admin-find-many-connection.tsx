import { AdminCreateConnectionInput, AdminFindManyConnectionInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'

import { useUiPagination } from '@pubkey-bot/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyConnection({
  botId,
  ...props
}: Partial<AdminFindManyConnectionInput> & { botId: string }) {
  const sdk = useWebSdk()
  const [limit, setLimit] = useState(props.limit ?? 10)
  const [page, setPage] = useState(props.page ?? 1)

  const input: AdminFindManyConnectionInput = { page, limit, botId }
  const query = useQuery(['admin', 'find-many-connection', input], () =>
    sdk.adminFindManyConnection({ input }).then((res) => res.data),
  )
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging?.data ?? []
  return {
    createConnection: (input: AdminCreateConnectionInput) =>
      sdk
        .adminCreateConnection({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`Connection  created`)
          } else {
            showNotificationError(`Connection not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteConnection: (connectionId: string) =>
      sdk.adminDeleteConnection({ connectionId }).then(() => {
        showNotificationSuccess('Connection deleted')
        return query.refetch()
      }),
    items,
    query,
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
  }
}
