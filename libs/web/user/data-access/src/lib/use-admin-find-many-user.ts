import { AdminCreateUserInput, AdminFindManyUserInput, UserRole, UserStatus } from '@pubkey-bot/sdk'
import { useWebSdk } from '@pubkey-bot/web/shell/data-access'

import { useUiPagination } from '@pubkey-bot/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-bot/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyUser() {
  const sdk = useWebSdk()
  const [role, setRole] = useState<UserRole | undefined>(undefined)
  const [status, setStatus] = useState<UserStatus | undefined>(undefined)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyUserInput = { limit, page, role, search, status }
  const query = useQuery(['admin', 'users', 'find', input], () =>
    sdk.adminFindManyUser({ input }).then((res) => res.data),
  )
  const total = query.data?.paging?.meta?.totalCount ?? 0

  return {
    createUser: (input: AdminCreateUserInput) =>
      sdk
        .adminCreateUser({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`User  created`)
          } else {
            showNotificationError(`User not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteUser: (userId: string) =>
      sdk.adminDeleteUser({ userId }).then(() => {
        showNotificationSuccess('User deleted')
        return query.refetch()
      }),
    query,
    role,
    setRole,
    setSearch,
    setStatus,
    status,
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
  }
}
