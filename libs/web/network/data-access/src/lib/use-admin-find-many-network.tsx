import { AdminCreateNetworkInput, AdminFindManyNetworkInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'

import { useUiPagination } from '@pubkey-bot/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyNetwork(props?: Partial<AdminFindManyNetworkInput>) {
  const sdk = useWebSdk()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyNetworkInput = { page, limit, search }
  const query = useQuery(['admin', 'find-many-network', input], () =>
    sdk.adminFindManyNetwork({ input }).then((res) => res.data),
  )
  const total = query.data?.paging?.meta?.totalCount ?? 0

  return {
    createNetwork: (input: AdminCreateNetworkInput) =>
      sdk
        .adminCreateNetwork({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`Network  created`)
          } else {
            showNotificationError(`Network not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteNetwork: (networkId: string) =>
      sdk.adminDeleteNetwork({ networkId }).then(() => {
        showNotificationSuccess('Network deleted')
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
