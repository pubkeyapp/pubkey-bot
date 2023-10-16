import { AdminCreateCollectionInput, AdminFindManyCollectionInput } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'

import { useUiPagination } from '@pubkey-bot/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyCollection(props?: Partial<AdminFindManyCollectionInput>) {
  const sdk = useWebSdk()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyCollectionInput = { page, limit, search }
  const query = useQuery(['admin', 'find-many-collection', input], () =>
    sdk.adminFindManyCollection({ input }).then((res) => res.data),
  )
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging?.data ?? []

  return {
    items,
    createCollection: (input: AdminCreateCollectionInput) =>
      sdk
        .adminCreateCollection({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`Collection  created`)
          } else {
            showNotificationError(`Collection not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteCollection: (collectionId: string) =>
      sdk.adminDeleteCollection({ collectionId }).then(() => {
        showNotificationSuccess('Collection deleted')
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
