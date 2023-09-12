import { Button, Group, Select } from '@mantine/core'
import { UserRole, UserStatus } from '@pubkey-bot/sdk'
import { UiAdminPage, UiAlert, UiBack, UiLoader, UiPagination, UiSearchField } from '@pubkey-bot/web/ui/core'
import { useAdminFindManyUser } from '@pubkey-bot/web/user/data-access'
import { AdminUiUserTable, userRoleOptions, userStatusOptions } from '@pubkey-bot/web/user/ui'
import { Link } from 'react-router-dom'

export function WebAdminUserListFeature() {
  const { deleteUser, pagination, query, role, setRole, setSearch, setStatus, status } = useAdminFindManyUser()

  return (
    <UiAdminPage
      title="Users"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search user" setSearch={setSearch} />
        <Select
          value={role?.toString() ?? ''}
          onChange={(role) => {
            pagination.setPage(1)
            setRole(role === '' ? undefined : (role as UserRole))
          }}
          data={[{ value: '', label: 'Filter by role' }, ...userRoleOptions()]}
        />
        <Select
          value={status?.toString() ?? ''}
          onChange={(status) => {
            pagination.setPage(1)
            setStatus(status === '' ? undefined : (status as UserStatus))
          }}
          data={[{ value: '', label: 'Filter by status' }, ...userStatusOptions()]}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.paging?.data?.length ? (
        <AdminUiUserTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          users={query?.data?.paging?.data ?? []}
        />
      ) : (
        <UiAlert message="User not found" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
